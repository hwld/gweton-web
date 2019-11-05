<template>
  <div>
    <div v-if="!user.uid">
      <v-btn text @click="login" color="blue">ログイン</v-btn>
    </div>

    <div v-else>
      <v-btn text @click="logout" color="red">ログアウト</v-btn>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "GwnAuthState",

  data() {
    return {
      user: {}
    };
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.user = user ? user : {};
      if (user) {
        this.$store.dispatch("downloadData");
      }
    });
  },

  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },

    logout() {
      firebase.auth().signOut();
      this.$store.dispatch("uploadData");
    }
  }
};
</script>

<style scoped>
</style>