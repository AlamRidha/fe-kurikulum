import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import FaseView from "../views/FaseView.vue";
import AdministrasiGuruView from "../views/AdministrasiGuruView.vue";
import ListGuruView from "../views/ListGuruView.vue";
import ProfilPelajarPancasilaView from "../views/ProfilPelajar.vue";
import EvaluasiView from "../views/Evaluasi.vue";
import SemesterView from "../views/FaseMenu/Semester.vue";
import MataPelajaranView from "../views/FaseMenu/FaseMataPelajaran.vue";
import CapaianPembelajaranView from "../views/FaseMenu/CapaianPembelajaran.vue";
import TujuanPembelajaranView from "../views/FaseMenu/TujuanPembelajaran.vue";
import AlurTujuanPembelajaranView from "../views/FaseMenu/AlurTujuanPembelajaran.vue";
import ModelPembelajaranView from "../views/FaseMenu/ModelPembelajaran.vue";
import RppMpView from "../views/FaseMenu/RppMp.vue";
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
          component: SemesterView,
        },
        {
          path: "fase/:idFase/semester/:idSemester/mata-pelajaran",
          name: "Mapel",
          component: MataPelajaranView,
        },
        {
          path: "fase/:idFase/semester/:idSemester/mata-pelajaran/:idMp/rpp-mp",
          name: "RppMp",
          component: RppMpView,
        },
        {
          path: "fase/:idFase/semester/:idSemester/mata-pelajaran/:idMp/rpp-mp/capaian-pembelajaran",
          name: "Capaian Pembelajaran",
          component: CapaianPembelajaranView,
        },
        {
          path: "fase/:idFase/semester/:idSemester/mata-pelajaran/:idMp/rpp-mp/tujuan-pembelajaran",
          name: "Tujuan Pembelajaran",
          component: TujuanPembelajaranView,
        },
        {
          path: "fase/:idFase/semester/:idSemester/mata-pelajaran/:idMp/rpp-mp/alur_tujuan-pembelajaran",
          name: "Alur Tujuan Pembelajaran",
          component: AlurTujuanPembelajaranView,
        },
        {
          path: "fase/:idFase/semester/:idSemester/mata-pelajaran/:idMp/rpp-mp/model-pembelajaran",
          name: "Model Pembelajaran",
          component: ModelPembelajaranView,
        },
        {
          path: "/datalistguru",
          name: "Data List Guru",
          component: ListGuruView,
        },
        {
          path: "/evaluasi",
          name: "Evaluasi",
          component: EvaluasiView,
        },
        {
          path: "/profilpelajarpancasila",
          name: "Profil Pelajar Pancasila",
          component: ProfilPelajarPancasilaView,
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
