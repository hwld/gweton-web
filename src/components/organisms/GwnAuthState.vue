<template>
  <div>
    <div v-if="user.uid">
      <v-btn text @click="logout" color="red">ログアウト</v-btn>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "GwnAuthState",

  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("uploadData");
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ path: "/login" });
        });
    }
  }
};
</script>

<style scoped>
</style>