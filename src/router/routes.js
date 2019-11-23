import GwnLoginPage from "@/components/templates/GwnLoginPage.vue";
import GwnMainPage from "@/components/templates/GwnMainPage.vue";
import GwnMemoList from "@/components/organisms/GwnMemoList.vue";
import GwnSearchResultMemoList from "@/components/organisms/GwnSearchResultMemoList.vue";

export default [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: GwnLoginPage
  },
  {
    path: "/main",
    component: GwnMainPage,
    children: [
      {
        path: "home",
        component: GwnMemoList
      },
      {
        path: "search",
        //GwnMemoListと違い、選択したジャンルの子すべてを含むメモのリストを表示する
        component: GwnSearchResultMemoList
      }
    ]
  },
  {
    path: "*",
    redirect: "/login"
  }
];
