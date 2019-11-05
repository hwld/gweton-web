import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation-types";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/storage";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDrawerOpen: true,
    selectedGenre: {},
    selectedMemo: {},
    genres: [
      //GenreにMemoとGenreが包含されている
    ],
    nextGenreId: 1,
    nextMemoId: 1
  },
  mutations: {
    //文字列としてダウンロードしたデータを設定する
    [types.SET_DOWNLOAD_DATA](state, strData) {
      const jsonData = JSON.parse(strData);
      state.genres = jsonData.genres;
      state.nextGenreId = jsonData.nextGenreId;
      state.nextMemoId = jsonData.nextMemoId;
    },

    //ドロワーの状態を反転させる (開く・閉じる)
    [types.INVERT_IS_DRAWER_OPEN](state) {
      state.isDrawerOpen = !state.isDrawerOpen;
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //メモ操作
    //////////////////////////////////////////////////////////////////////////////////////////////

    //選択されているジャンルから指定されたidのメモを選択する
    [types.SELECT_MEMO](state, memoId) {
      if (!state.selectedGenre.id) return;

      const memo = state.selectedGenre.memos.find(memo => memo.id === memoId);

      if (state.selectedMemo === memo) {
        state.selectedMemo = {};
        return;
      }
      state.selectedMemo = memo;
    },

    //選択されているメモの選択状態を解除する
    [types.DESELECT_MEMO](state) {
      state.selectedMemo = {};
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
      const selectedMemo = state.selectedMemo;
      selectedMemo.title = memo.title;
      selectedMemo.text = memo.text;
      selectedMemo.authorName = memo.authorName;
      selectedMemo.bookName = memo.bookName;
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //ジャンル操作
    //////////////////////////////////////////////////////////////////////////////////////////////

    //すべてのジャンルから指定されたidのジャンルを選択する
    [types.SELECT_GENRE](state, genre) {
      state.selectedGenre = genre;
    },

    //選択されているジャンルにジャンルを追加する
    [types.ADD_GENRE](state, genre) {
      genre.parentId = state.selectedGenre.id;
      genre.id = state.nextGenreId;
      genre.genres = [];
      genre.memos = [];

      if (state.selectedGenre.id != null) {
        state.selectedGenre.genres.push(genre);
      } else {
        state.genres.push(genre);
      }

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
        genre.id === state.selectedGenre.id;
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
    getIsDrawerOpen: state => {
      return state.isDrawerOpen;
    },
    getGenres: state => {
      return state.genres;
    },
    getSelectedGenre: state => {
      return state.selectedGenre;
    },
    getSelectedMemo: state => {
      return state.selectedMemo;
    },
    getNextGenreId: state => {
      return state.nextGenreId;
    },
    getNextMemoId: state => {
      return state.nextMemoId;
    }
  },
  actions: {
    downloadData({ commit }) {
      const dataRef = firebase.storage().ref("data.json");
      dataRef
        .getDownloadURL()
        .then(function(url) {
          axios.get(url).then(function(response) {
            //responseをstringからJSONに変換して、stateに代入する
            commit(types.SET_DOWNLOAD_DATA, response);
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
      const dataRef = firebase
        .storage()
        .ref()
        .child("data.json");
      const jsonData = {
        genres: getters.getGenres,
        nextGenreId: getters.getNextGenreId,
        nextMemoId: getters.getNextMemoId
      };
      const strData = JSON.stringify(jsonData);
      dataRef.putString(strData);
    }
  },
  modules: {}
});
