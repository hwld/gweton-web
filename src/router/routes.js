import GwnMainView from "@/components/templates/GwnMainView.vue";

export default [
  {
    path: "/home",
    component: GwnMainView
  },
  {
    path: "*",
    redirect: "/home"
  }
];
