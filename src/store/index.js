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
    genreList: [],
    memoList: [],
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
    [types.ADD_MEMO](state, { memo, genreId }) {
      memo.id = state.nextMemoId;
      memo.genreId = genreId;
      state.memoList.push(memo);
    },

    //指定されたメモを削除する
    [types.DELETE_MEMO](state, memoId) {
      const targetMemoIndex = state.memoList.findIndex(
        memo => memo.id === memoId
      );
      state.memoList.splice(targetMemoIndex, 1);
    },

    //指定されたidのメモを更新する
    [types.EDIT_MEMO](state, { newMemo, memoId }) {
      let oldMemoIndex = state.memoList.findIndex(memo => memo.id === memoId);

      //完全なメモオブジェクトを作成
      let newCompleteMemo = {
        id: memoId,
        genreId: state.memoList[oldMemoIndex].genreId,
        title: newMemo.title,
        text: newMemo.text,
        authorName: newMemo.authorName,
        bookName: newMemo.bookName
      };

      //置き換える
      state.memoList.splice(oldMemoIndex, 1, newCompleteMemo);
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

    //指定されたジャンルにジャンルを追加する
    [types.ADD_GENRE](state, { genre, parentGenreId }) {
      genre.parentGenreId = parentGenreId;
      genre.id = state.nextGenreId;
      genre.childrenId = [];

      //parentGenreIdがnullでなければ親ジャンルに子供ジャンルのidを追加
      if (parentGenreId != null) {
        const parentGenreIndex = state.genreList.findIndex(
          genre => genre.id === parentGenreId
        );
        state.genreList[parentGenreIndex].childrenId.push(genre.id);
      }

      state.genreList.push(genre);
    },

    //指定されたジャンルを削除する
    [types.DELETE_GENRE](state, genreId) {
      let targetIndex = state.genreList.findIndex(genre => {
        return genre.id === genreId;
      });

      state.genreList.splice(targetIndex, 1);

      state.selectedGenre = {};
    },

    //選択されているジャンルを更新する
    [types.EDIT_GENRE](state, { genreId, newGenreText }) {
      let oldGenreIndex = state.genreList.findIndex(
        genre => genre.id === genreId
      );
      let oldGenre = state.genreList[oldGenreIndex];

      //完全なジャンルオブジェクトを作成
      let newGenre = {
        genreName: newGenreText.genreName,
        id: oldGenre.id,
        parentGenreId: oldGenre.parentGenreId,
        childrenId: oldGenre.childrenId
      };
      state.genreList.splice(oldGenreIndex, 1, newGenre);
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

    getGenreList: state => {
      return state.genreList;
    },

    getMemoList: state => {
      return state.memoList;
    },

    getSelectedGenre: state => {
      return state.selectedGenre;
    },

    getGenreById: (state, getters) => genreId => {
      return getters.getGenreList.find(genre => genre.id === genreId);
    },

    getGenresByParentId: (state, getters) => parentGenreId => {
      return getters.getGenreList.filter(
        genre => genre.parentGenreId === parentGenreId
      );
    },

    getSelectedMemo: state => {
      return state.selectedMemo;
    },

    getMemoById: (state, getters) => memoId => {
      return getters.getMemoList.find(memo => memo.id === memoId);
    },

    getMemosByGenreId: (state, getters) => genreId => {
      return getters.getMemoList.filter(memo => memo.genreId === genreId);
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

    addMemo({ commit, dispatch }, { memo, genreId }) {
      commit(types.ADD_MEMO, { memo, genreId });
      commit(types.INCREMENT_NEXT_MEMO_ID);
      dispatch("uploadData");
    },

    deleteMemo({ commit, dispatch }, memoId) {
      commit(types.DELETE_MEMO, memoId);
      dispatch("uploadData");
    },

    editMemo({ commit, dispatch }, { newMemo, memoId }) {
      commit(types.EDIT_MEMO, { newMemo, memoId });
      dispatch("uploadData");
    },

    selectGenre({ commit, getters }, id) {
      const genre =
        getters.getSelectedGenre.id === id ? {} : getters.getGenreById(id);
      commit(types.SELECT_GENRE, genre);
    },

    addGenre({ commit, dispatch }, { genre, parentGenreId }) {
      commit(types.ADD_GENRE, {
        genre: genre,
        parentGenreId: parentGenreId
      });
      commit(types.INCREMENT_NEXT_GENRE_ID);
      dispatch("uploadData");
    },

    deleteGenreAndMemo({ getters, commit, dispatch }, genreId) {
      //指定されたジャンルのメモを削除
      const deleteMemos = getters.getMemosByGenreId(genreId);
      deleteMemos.forEach(memo => commit(types.DELETE_MEMO, memo.id));

      //子ジャンルを削除
      const genre = getters.getGenreById(genreId);
      for (const child of genre.childrenId) {
        dispatch("deleteGenreAndMemo", child);
      }

      //指定されたジャンルを削除
      commit(types.DELETE_GENRE, genreId);

      //ファイルを更新
      dispatch("uploadData");
    },

    editGenre({ commit, dispatch }, { genre, genreId }) {
      commit(types.EDIT_GENRE, {
        newGenreText: genre,
        genreId: genreId
      });
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
        genreList: getters.getGenreList,
        memoList: getters.getMemoList,
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
