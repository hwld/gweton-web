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
      {
        id: 1,
        genreName: "CSS単位",
        memos: [
          {
            id: 1,
            title: "Em単位とは",
            text:
              "フォントサイズ設定にem単位を使うと、ユーザー設定のオーバーライドに関する問題を回避しやすくなります。1emの大きさはブラウザーのfont-sizeのデフォルト値で決まります。開発者やユーザーが変更しなければ、1emは16pxです。",
            authorName: "Asha Laxmi",
            bookName:
              "CSS初心者が混乱しがちな7つの単位の意味と違いをしっかり理解しよう"
          },
          {
            id: 2,
            title: "Rem単位とは",
            text:
              "em単位の問題は、親要素のfont-sizeに従って子要素のfont-sizeが拡大縮小するのが望ましいとは限らないことです。font-sizeの継承が、em単位の値を計算するプロセスを複雑にする場合があります.この問題はrem単位で解決します。1remの値はルート要素のfont-size値と同じです。",
            authorName: "Asha Laxmi",
            bookName:
              "CSS初心者が混乱しがちな7つの単位の意味と違いをしっかり理解しよう"
          },
          { id: 3, title: "id3のメモ" },
          { id: 4, title: "id4のメモ" },
          {
            id: 5,
            text:
              "あああああああああああああああああfffああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ"
          }
        ],
        genres: []
      },
      {
        id: 2,
        genreName: "hoge2",
        memos: [],
        genres: [
          {
            id: 3,
            genreName: "hoge2-1",
            memos: [],
            genres: [
              {
                id: 4,
                genreName: "hoge-2-1-1",
                memos: [
                  {
                    id: 6,
                    title: "うおおおおお",
                    text: "うおおおおお",
                    authorName: "うおおお",
                    bookName: "うおおお"
                  }
                ],
                genres: []
              }
            ]
          }
        ]
      },
      { id: 5, genreName: "hoge3", memos: [], genres: [] },
      { id: 6, genreName: "hoge4", memos: [], genres: [] }
    ],
    nextGenreId: 7,
    nextMemoId: 7
  },
  mutations: {
    //すべてのジャンルから指定されたidのジャンルを選択する
    [types.SELECT_GENRE](state, genre) {
      state.selectedGenre = genre;
    },

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

    //ドロワーの状態を反転させる (開く・閉じる)
    [types.INVERT_IS_DRAWER_OPEN](state) {
      state.isDrawerOpen = !state.isDrawerOpen;
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
