import GwnLoginPage from "@/components/templates/GwnLoginPage.vue";
import GwnMainPage from "@/components/templates/GwnMainPage.vue";
import GwnMemoList from "@/components/organisms/GwnMemoList.vue";
import GwnSearchResultMemoList from "@/components/organisms/GwnSearchResultMemoList.vue";

export default [
  {
    path: "/",
    redirect: "/home",
    component: GwnMainPage,
    children: [
      {
        path: "home",
        component: GwnMemoList,
        meta: { requiresAuth: true }
      },
      {
        path: "search",
        //GwnMemoListと違い、選択したジャンルの子すべてを含むメモのリストを表示する
        component: GwnSearchResultMemoList,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: "/login",
    component: GwnLoginPage
  },
  {
    path: "*",
    redirect: "/home"
  }
];
