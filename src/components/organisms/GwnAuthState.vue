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
import * as types from "@/store/mutation-types";
import "firebase/auth";

export default {
  name: "GwnAuthState",

  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.commit(types.SET_USER, user);
      this.$store.dispatch("downloadData");
    });
  },

  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },

    logout() {
      this.$store.dispatch("uploadData");
      firebase.auth().signOut();
    }
  }
};
</script>

<style scoped>
</style>