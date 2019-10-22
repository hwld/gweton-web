<template>
  <v-app>

    <v-app-bar 
      app
      color="amber darken-3"
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">Gweton</v-toolbar-title>
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
    </v-navigation-drawer>

    <v-content>
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
  }),

  computed: {
    drawerWidth: function(){
      return window.parent.screen.width * 0.3
    }
  },

  created (){
    this.$vuetify.theme.dark = true
  }
};
</script>
