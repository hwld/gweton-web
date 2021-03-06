import store from "../store";

export const authorizeToken = (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.getUserUid) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
};
