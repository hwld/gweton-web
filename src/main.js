import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store";
import firebase from "firebase/app";
import "firebase/analytics";

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyDmOllyDPWGaRGqKGAEPm1kidR9cCyAA0w",
  authDomain: "gweton-webapp.firebaseapp.com",
  databaseURL: "https://gweton-webapp.firebaseio.com",
  projectId: "gweton-webapp",
  storageBucket: "gweton-webapp.appspot.com",
  messagingSenderId: "174891123165",
  appId: "1:174891123165:web:e9092972c0e80a4940f634",
  measurementId: "G-2YXP1PBG8V"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
