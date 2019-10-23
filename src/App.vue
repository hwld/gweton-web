<template>
  <v-app>

    <v-app-bar 
      app
      clipped-left
    >
      <v-app-bar-nav-icon  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Gweton</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon x-large="true">search</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      :width="drawerWidth"
    >
      <v-toolbar>
        <v-btn icon>
          <v-icon>playlist_add</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>delete</v-icon>
        </v-btn> 
        <v-btn icon>
          <v-icon>edit</v-icon>
        </v-btn>                           
      </v-toolbar>
      <v-treeview
        :items="items"
        activatable
        :active.sync="active"
        item-text="genreName"
        item-children="genres"
      >
      </v-treeview>
    </v-navigation-drawer>

    <v-content>
      <v-toolbar>
        <v-btn icon>
          <v-icon>post_add</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>delete</v-icon>
        </v-btn>
      </v-toolbar>

      <div v-if="!selected">ジャンルを選択してください</div>

      <v-list v-else dense>
        <v-list-item-group>
          <v-list-item
           v-for="memo in selected.memos"
           :key="memo.id"
          >
            <v-list-item-content>
              <v-container>
                <v-row >
                  <v-col>
                    <div class="memo-title">{{memo.title}}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="memo-text">{{memo.text}}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div><span class="memo-meta-data-head">書籍名:</span><span class="memo-meta-data"> {{memo.bookName}}</span></div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div><span class="memo-meta-data-head">著者名:</span><span class="memo-meta-data"> {{memo.authorName}}</span></div>
                  </v-col>
                </v-row>
              </v-container>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-content>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    drawer: null,
    active:[],
    items: [
        {id: 1, genreName: 'CSS単位', memos: [
          {id: 1, title: 'Em単位とは', text: 'フォントサイズ設定にem単位を使うと、ユーザー設定のオーバーライドに関する問題を回避しやすくなります。1emの大きさはブラウザーのfont-sizeのデフォルト値で決まります。開発者やユーザーが変更しなければ、1emは16pxです。', authorName: 'Asha Laxmi', bookName: 'CSS初心者が混乱しがちな7つの単位の意味と違いをしっかり理解しよう'},
          {id: 2, title: 'Rem単位とは', text: 'em単位の問題は、親要素のfont-sizeに従って子要素のfont-sizeが拡大縮小するのが望ましいとは限らないことです。font-sizeの継承が、em単位の値を計算するプロセスを複雑にする場合があります.この問題はrem単位で解決します。1remの値はルート要素のfont-size値と同じです。', authorName: 'Asha Laxmi', bookName: 'CSS初心者が混乱しがちな7つの単位の意味と違いをしっかり理解しよう'},
        ]},
        {id: 4, genreName: 'hoge2', genres: [{id:100, genreName: 'hoge2-1', genres:[{id:101, genreName: 'hoge-2-1-1'}]}]},
        {id: 5, genreName: 'hoge3'},
        {id: 6, genreName: 'hoge4'},
      ]
  }),

  computed: {
    drawerWidth (){
      return window.parent.screen.width * 0.3
    }, 
    selected (){
      if(!this.active.length) return undefined

      const id = this.active[0]

      return this.findItemForId(this.items, id)
    },
  },

  methods: {
    findItemForId (items, searchId){
      for(const item of items){
        if(item.id === searchId) {
          return item
        } 
        if(item.genres != null){
          let result = this.findItemForId(item.genres, searchId)
          if(result != null){
            return result
          }
        }
      }
    }
  },

  created (){
    this.$vuetify.theme.dark = true
  }
};
</script>

<style scoped>

  .memo-title{
    font-size: 1.5rem
  }

  .memo-text{
    font-size: 1.2rem
  }

  .memo-meta-data-head{
    font-size: 0.9rem;
    color: slategray;
  }

  .memo-meta-data{
    font-size: 0.9rem;
  }
</style>