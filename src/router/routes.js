import GwnLoginPage from "@/components/templates/GwnLoginPage.vue";
import GwnMainPage from "@/components/templates/GwnMainPage.vue";
import GwnSearchMemoPage from "@/components/templates/GwnSearchMemoPage";

export default [
  {
    path: "/home",
    component: GwnMainPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/search",
    component: GwnSearchMemoPage,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    component: GwnLoginPage
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "*",
    redirect: "/home"
  }
];
