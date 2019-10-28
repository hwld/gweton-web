import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store";
import firebase from "firebase";

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyBcy77u9wBi9WzdqDf3mtn9EoiiUee9xF0",
  authDomain: "gweton-227c6.firebaseapp.com",
  databaseURL: "https://gweton-227c6.firebaseio.com",
  projectId: "gweton-227c6",
  storageBucket: "gweton-227c6.appspot.com",
  messagingSenderId: "29125325326",
  appId: "1:29125325326:web:1a1fc68249b7d3a372c25f",
  measurementId: "G-F1X18T70GC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
