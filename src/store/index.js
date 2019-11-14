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
    genres: [],
    memos: [],
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

    //指定されたジャンルのメモを追加する
    [types.ADD_MEMO](state, memo, genreId) {
      memo.id = state.nextMemoId;
      memo.genreId = genreId;
      state.memos.push(memo);
    },

    //指定されたメモを削除する
    [types.DELETE_MEMO](state, memoId) {
      const targetMemoIndex = state.memos.findIndex(memo => memo.id === memoId);
      state.memos.splice(targetMemoIndex, 1);
    },

    //指定されたidのメモを更新する
    [types.EDIT_MEMO](state, newMemoText, memoId) {
      let targetMemoIndex = state.memos.findIndex(memo => memo.id === memoId);

      //完全なメモオブジェクトを作成
      let newMemo = {
        id: memoId,
        genreId: state.memos[targetMemoIndex].genreId,
        title: newMemoText.title,
        text: newMemoText.text,
        authorName: newMemoText.authorName,
        bookName: newMemoText.bookName
      };

      //置き換える
      state.memos.splice(targetMemoIndex, 1, newMemo);
    },

    [types.INCREMENT_NEXT_MEMO_ID](state) {
      state.nextMemoId++;
    },

    [types.DECREMENT_NEXT_MEMO_ID](state) {
      state.nextMemoId--;
    },

    [types.SET_NEXT_MEMO_ID](state, value) {
      state.nextMemoId = value;
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
      state.selectedMemo = {};
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
      state.genres.splice();
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

      state.selectedGenre = {};
      state.genres.splice();
    },

    //選択されているジャンルを更新する
    [types.EDIT_GENRE](state, genre) {
      //名前を更新する
      state.selectedGenre.genreName = genre.genreName;

      state.genres.splice();
    },

    [types.INCREMENT_NEXT_GENRE_ID](state) {
      state.nextGenreId++;
    },

    [types.DECREMENT_NEXT_GENRE_ID](state) {
      state.nextGenreId--;
    },

    [types.SET_NEXT_GENRE_ID](state, value) {
      state.nextGenreId = value;
    }
  },
  getters: {
    getUser: state => {
      return state.user;
    },

    getGenres: state => {
      return state.genres;
    },

    getMemos: state => {
      return state.memos;
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

    getNumberOfGenresAndMemos: (state, getters) => genres => {
      let numberOfGenres = 0;
      let numberOfMemos = 0;
      for (let genre of genres) {
        let childNumber = getters.getNumberOfGenresAndMemos(genre.genres);
        numberOfGenres += genre.genres.length + childNumber.numberOfGenres;
        numberOfMemos += genre.memos.length + childNumber.numberOfMemos;
      }
      return { numberOfGenres, numberOfMemos };
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
      const memo =
        getters.getSelectedMemo.id === id ? {} : getters.getMemoById(id);
      commit(types.SELECT_MEMO, memo);
    },

    addMemo({ commit, dispatch }, memo) {
      commit(types.ADD_MEMO, memo);
      commit(types.INCREMENT_NEXT_MEMO_ID);
      dispatch("uploadData");
    },

    deleteMemo({ commit, getters, dispatch }) {
      const genre = getters.getGenreById(getters.getSelectedMemo.genreId);
      commit(types.DELETE_MEMO, genre);
      dispatch("uploadData");
    },

    editMemo({ commit, dispatch }, memo) {
      commit(types.EDIT_MEMO, memo);
      dispatch("uploadData");
    },

    selectGenre({ commit, getters }, id) {
      const genre =
        getters.getSelectedGenre.id === id ? {} : getters.getGenreById(id);
      commit(types.SELECT_GENRE, genre);
    },

    addGenre({ commit, dispatch }, genre) {
      commit(types.ADD_GENRE, genre);
      commit(types.INCREMENT_NEXT_GENRE_ID);
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
        memos: getters.getMemos,
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
