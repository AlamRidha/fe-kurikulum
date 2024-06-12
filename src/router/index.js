import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import FaseView from "../views/FaseView.vue";
import AdministrasiGuruView from "../views/AdministrasiGuruView.vue";
import ListGuruView from "../views/ListGuruView.vue";
import FaseFirstView from "../views/FaseMenu/FaseFirst.vue";
import MataPelajaranView from "../views/FaseMenu/FaseMataPelajaran.vue";
import Layout from "../layouts/DashboardLayout.vue";
import { useAuthStore } from "../stores/useAuthStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Layout,
      children: [
        {
          path: "/",
          name: "dashboard",
        },
        {
          path: "/fase",
          name: "Fase",
          component: FaseView,
        },
        {
          path: "fase/:idFase/semester",
          name: "First Face",
          component: FaseFirstView,
        },
        {
          path: "fase/:idFase/semester/:idSemester/mata-pelajaran",
          name: "Mapel",
          component: MataPelajaranView,
        },
        {
          path: "/datalistguru",
          name: "Data List Guru",
          component: ListGuruView,
        },
        {
          path: "/administrasiguru",
          name: "Administrasi Guru",
          component: AdministrasiGuruView,
        },
      ],
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/logout",
      name: "Logout",
      component: LoginView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useAuthStore();

  if (to.name !== "Login" && !userStore.checkLogin()) {
    next({ name: "Login" });
  } else {
    next();
  }
  // const isLoggedIn = localStorage.getItem("isLogin") === "true";
  // if (to.name !== "Login" && !userStore.isLoggedIn) {
  //   next({ name: "Login" });
  // } else {
  //   next();
  // if (to.name !== "Login" && !isLoggedIn) {
  //   next({ name: "Login" });
  // } else {
  //   next();
  // }
});

export default router;
