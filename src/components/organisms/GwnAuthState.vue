<template>
  <div>
    <div v-if="userUid">
      <v-btn text @click="logout" color="red">ログアウト</v-btn>
    </div>
  </div>
</template>

<script>
import * as types from "@/store/mutation-types";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "GwnAuthState",

  computed: {
    userUid() {
      return this.$store.getters.getUserUid;
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit(types.CLEAR_USER_UID);
          this.$router.push({ path: "/login" });
        });
    }
  }
};
</script>

<style scoped>
</style>