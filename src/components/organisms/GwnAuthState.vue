<template>
  <div>
    <div v-if="!user.uid">
      <v-btn text @click="login">ログイン</v-btn>
    </div>

    <div v-else>
      <v-btn text @click="logout">ログアウト</v-btn>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

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
      alert("Hello");
    });
  },

  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },

    logout() {
      firebase.auth().signOut();
    }
  }
};
</script>

<style scoped>
</style>