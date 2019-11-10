import GwnMainPage from "@/components/templates/GwnMainPage.vue";
import GwnMemoList from "@/components/organisms/GwnMemoList.vue";
import GwnSearchResultMemoList from "@/components/organisms/GwnSearchResultMemoList.vue";

export default [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/",
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
    redirect: "/home"
  }
];
