import GwnMainPage from "@/components/templates/GwnMainPage.vue";

export default [
  {
    path: "/home",
    component: GwnMainPage
  },
  {
    path: "*",
    redirect: "/home"
  }
];
