import Vue from "vue";
import Vuex from "vuex";
import * as types from "./mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDrawerOpen: true,
    selectedGenre: {},
    selectedMemo: {},
    genres: [
      //GenreにMemoとGenreが包含されている
      { id: 33, genreName: "Hoge", memos: [] },
      { id: 1, genreName: "Hoge" },
      { id: 2, genreName: "Hoge" },
      { id: 3, genreName: "Hoge" },
      { id: 4, genreName: "Hoge" },
      { id: 5, genreName: "Hoge" },
      { id: 6, genreName: "Hoge" },
      { id: 7, genreName: "Hoge" },
      { id: 8, genreName: "Hoge" },
      { id: 9, genreName: "Hoge" },
      { id: 10, genreName: "Hoge" },
      { id: 11, genreName: "Hoge" },
      { id: 12, genreName: "Hoge" },
      { id: 13, genreName: "Hoge" },
      { id: 14, genreName: "Hoge" },
      { id: 15, genreName: "Hoge" },
      { id: 16, genreName: "Hoge" },
      { id: 17, genreName: "Hoge" },
      { id: 18, genreName: "Hoge" },
      { id: 19, genreName: "Hoge" },
      { id: 20, genreName: "Hoge" },
      { id: 21, genreName: "Hoge" },
      { id: 22, genreName: "Hoge" },
      { id: 23, genreName: "Hoge" },
      { id: 24, genreName: "Hoge" },
      { id: 25, genreName: "Hoge" },
      { id: 26, genreName: "Hoge" },
      { id: 27, genreName: "Hoge" },
      { id: 28, genreName: "Hoge" },
      { id: 29, genreName: "Hoge" },
      { id: 30, genreName: "Hoge" },
      { id: 31, genreName: "Hoge" },
      { id: 32, genreName: "Hoge" }
    ],
    nextGenreId: 34,
    nextMemoId: 1
  },
  mutations: {
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
      genre.parent = state.selectedGenre;
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

    //選択されているジャンルを削除する
    [types.DELETE_GENRE](state) {
      const parentGenre = state.selectedGenre.parent;

      let targetArray = [];
      if (parentGenre.id == null) {
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
    getGenres: state => {
      return state.genres;
    },
    getSelectedGenre: state => {
      return state.selectedGenre;
    },
    getSelectedMemo: state => {
      return state.selectedMemo;
    }
  },
  actions: {},
  modules: {}
});
