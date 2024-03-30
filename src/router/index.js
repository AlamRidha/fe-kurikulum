import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import FaseView from "../views/FaseView.vue";
import AdministrasiGuruView from "../views/AdministrasiGuruView.vue";
import ListGuruView from "../views/ListGuruView.vue";
import FaseFirstView from "../views/FaseMenu/FaseFirst.vue";
import MataPelajaranView from "../views/FaseMenu/FaseMataPelajaran.vue";
import MenuMataPelajaranView from "../views/FaseMenu/MataPelajaran.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: FaseView,
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
    {
      path: "/fase",
      name: "Fase",
      component: FaseView,
      children: [
        {
          path: ":idFase",
          component: FaseFirstView,
          children: [
            {
              path: "semester/:idSemester",
              component: MataPelajaranView,
              children: [
                {
                  path: "mata-pelajaran/:idMataPelajaran",
                  component: MenuMataPelajaranView,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/administrasiguru",
      name: "Administrasi Guru",
      component: AdministrasiGuruView,
    },
    {
      path: "/listguru",
      name: "List Guru",
      component: ListGuruView,
    },
  ],
});

export default router;
