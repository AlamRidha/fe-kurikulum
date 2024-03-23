import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import Faseview from "../views/FaseView.vue";
import ListGuruView from "../views/ListGuruView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/logout",
      name: "logout",
      component: LoginView,
    },
    {
      path: "/fase",
      name: "fase",
      component: Faseview,
    },
    {
      path: "/listguru",
      name: "listguru",
      component: ListGuruView,
    },
  ],
});

export default router;
