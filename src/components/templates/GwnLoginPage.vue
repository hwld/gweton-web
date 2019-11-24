<template>
  <v-app>
    <v-container class="fill-height">
      <v-row>
        <v-col></v-col>
        <v-col cols="8" lg="3">
          <v-card height="500">
            <v-container class="fill-height">
              <v-row></v-row>
              <v-row>
                <v-img src="/note.png" contain height="100"></v-img>
              </v-row>
              <v-row>
                <v-spacer></v-spacer>
                <v-btn outlined @click="login">ログイン</v-btn>
                <v-spacer></v-spacer>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-row rows="2"></v-row>
    </v-container>
  </v-app>
</template>

<script>
import * as types from "@/store/mutation-types";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "GwnLoginPage",
  data() {
    return {
      unsubscribe: {}
    };
  },
  created() {
    this.$vuetify.theme.dark = true;

    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.commit(types.SET_USER, user);
        this.$store.dispatch("downloadData").then(() => {
          this.$router.push({ path: "/home" });
        });
      }
    });
  },
  destroyed() {
    this.unsubscribe();
  },
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    }
  }
};
</script>

<style scoped></style>
