import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation-types";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/storage";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    selectedGenre: {},
    selectedMemo: {},
    genres: [
      //GenreにMemoとGenreが包含されている
    ],
    nextGenreId: 1,
    nextMemoId: 1,
    filterText: ""
  },
  mutations: {
    //ユーザを設定する
    [types.SET_USER](state, user) {
      state.user = user ? user : {};
    },

    //ダウンロードしたデータを設定する
    [types.SET_DOWNLOAD_DATA](state, data) {
      Object.keys(data).forEach(prop => {
        state[prop] = data[prop];
      });
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //メモ操作
    //////////////////////////////////////////////////////////////////////////////////////////////

    //メモを選択する
    [types.SELECT_MEMO](state, memo) {
      state.selectedMemo = memo ? memo : {};
    },

    //選択されているジャンルにメモを追加する
    [types.ADD_MEMO](state, memo) {
      memo.id = state.nextMemoId;
      state.nextMemoId++;
      state.selectedGenre.memos.push(memo);
    },

    //選択されているメモを選択されているジャンルから削除する
    [types.DELETE_MEMO](state) {
      const targetIndex = state.selectedGenre.memos.findIndex(
        memo => memo.id === state.selectedMemo.id
      );

      state.selectedGenre.memos.splice(targetIndex, 1);
      state.nextMemoId--;

      state.selectedMemo = {};
    },

    //選択されているメモを更新する
    [types.EDIT_MEMO](state, memo) {
      //id以外を変更する
      Object.keys(memo).forEach(prop => {
        if (prop !== "id") {
          state.selectedMemo[prop] = memo[prop];
        }
      });
    },

    ////////////////////////////////////////////////////////////////////////
    //検索
    ///////////////////////////////////////////////////////////////////////

    //メモ検索文字列を設定する
    [types.SET_FILTER_TEXT](state, text) {
      state.filterText = text;
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //ジャンル操作
    //////////////////////////////////////////////////////////////////////////////////////////////

    //ジャンルを選択する
    [types.SELECT_GENRE](state, genre) {
      state.selectedGenre = genre ? genre : {};
    },

    //選択されているジャンルにジャンルを追加する
    [types.ADD_GENRE](state, genre) {
      genre.parentId = state.selectedGenre.id;
      genre.id = state.nextGenreId;
      genre.genres = [];
      genre.memos = [];

      let targetArray = [];
      if (state.selectedGenre.id != null) {
        targetArray = state.selectedGenre.genres;
      } else {
        targetArray = state.genres;
      }

      targetArray.push(genre);

      state.nextGenreId++;
    },

    //選択されているジャンルを渡されたジャンルから削除する
    [types.DELETE_GENRE](state, parentGenre) {
      let targetArray = [];
      if (parentGenre == null) {
        targetArray = state.genres;
      } else {
        targetArray = parentGenre.genres;
      }

      let targetIndex = targetArray.findIndex(genre => {
        return genre.id === state.selectedGenre.id;
      });

      targetArray.splice(targetIndex, 1);

      state.nextGenreId--;
      state.selectedGenre = {};
    },

    //選択されているジャンルを更新する
    [types.EDIT_GENRE](state, genre) {
      //名前を更新する
      state.selectedGenre.genreName = genre.genreName;
    }
  },
  getters: {
    getUser: state => {
      return state.user;
    },

    getGenres: state => {
      return state.genres;
    },

    getSelectedGenre: state => {
      return state.selectedGenre;
    },

    getGenreById: (state, getters) => (searchId, genres = state.genres) => {
      for (const genre of genres) {
        if (genre.id === searchId) {
          return genre;
        }

        let result = getters.getGenreById(searchId, genre.genres);
        if (result != null) {
          return result;
        }
      }
    },

    getSelectedMemo: state => {
      return state.selectedMemo;
    },

    getMemoById: (state, getters) => (searchId, genres = state.genres) => {
      for (const genre of genres) {
        let memo = genre.memos.find(memo => memo.id === searchId);
        if (memo != null) return memo;

        let result = getters.getMemoById(searchId, genre.genres);
        if (result != null) {
          return result;
        }
      }
    },

    getFilterText: state => {
      return state.filterText;
    },

    getNextGenreId: state => {
      return state.nextGenreId;
    },

    getNextMemoId: state => {
      return state.nextMemoId;
    }
  },
  actions: {
    selectMemo({ commit, getters }, id) {
      commit(types.SELECT_MEMO, getters.getMemoById(id));
    },

    addMemo({ commit, dispatch }, memo) {
      commit(types.ADD_MEMO, memo);
      dispatch("uploadData");
    },

    deleteMemo({ commit, dispatch }) {
      commit(types.DELETE_MEMO);
      dispatch("uploadData");
    },

    editMemo({ commit, dispatch }, memo) {
      commit(types.EDIT_MEMO, memo);
      dispatch("uploadData");
    },

    selectGenre({ commit, getters }, id) {
      commit(types.SELECT_GENRE, getters.getGenreById(id));
    },

    addGenre({ commit, dispatch }, genre) {
      commit(types.ADD_GENRE, genre);
      dispatch("uploadData");
    },

    deleteGenre({ commit, getters, dispatch }) {
      const parentGenre = getters.getGenreById(
        getters.getSelectedGenre.parentId
      );
      commit(types.DELETE_GENRE, parentGenre);
      dispatch("uploadData");
    },

    editGenre({ commit, dispatch }, genre) {
      commit(types.EDIT_GENRE, genre);
      dispatch("uploadData");
    },

    downloadData({ commit, getters }) {
      if (getters.getUser.uid == null) {
        return;
      }

      firebase
        .storage()
        .ref(`user/${getters.getUser.uid}/data.json`)
        .getDownloadURL()
        .then(function(url) {
          axios.get(url).then(function(response) {
            commit(types.SET_DOWNLOAD_DATA, response.data);
          });
        })
        .catch(function(error) {
          switch (error.code) {
            case "storage/object-not-found":
              break;
          }
        });
    },

    uploadData({ getters }) {
      if (getters.getUser.uid == null) {
        return;
      }

      const dataRef = firebase
        .storage()
        .ref(`user/${getters.getUser.uid}/data.json`);

      const jsonData = {
        genres: getters.getGenres,
        nextGenreId: getters.getNextGenreId,
        nextMemoId: getters.getNextMemoId
      };

      const strData = JSON.stringify(jsonData);

      dataRef.putString(strData).catch(function(error) {
        window.console.log(error.serverResponse);
      });
    }
  },
  modules: {}
});
