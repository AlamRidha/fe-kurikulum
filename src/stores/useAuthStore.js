import { defineStore } from "pinia";
import Cookies from "js-cookie";
import axios from "axios";
import router from "../router";

export const useAuthStore = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    user: null,
  }),

  actions: {
    async login(nip, password) {
      const dataLogin = { nip: nip, password: password };
      try {
        const response = await axios.post(
          "http://localhost:3000/users/login",
          dataLogin
        );

        if (response.status === 200) {
          this.isLoggedIn = true;
          this.user = response.data;
          // localStorage.setItem("isLogin", true);
          // localStorage.setItem("user", JSON.stringify(response.data));
          Cookies.set("user", JSON.stringify(response.data));
          console.log("Login berhasil");
          router.push("/fase");
          return { success: true, message: "Login berhasil" };
        } else {
          console.log("Login gagal tidak ada dalam database");
          return {
            success: false,
            message: "Login gagal tidak ada dalam database",
          };
        }
      } catch (error) {
        console.log("Login error ", error);
      }
    },

    logout() {
      this.user = null;
      this.isLoggedIn = false;
      Cookies.remove("user");
      // localStorage.removeItem("isLogin");
      // localStorage.removeItem("user");
      console.log("Logout state dieksekusi", this.user);
      router.push("/login");
    },

    checkLogin() {
      const userCook = Cookies.get("user");
      if (userCook) {
        // localStorage.setItem("isLogin", true);
        this.isLoggedIn = true;
        this.user = JSON.parse(userCook);
        return true;
      } else {
        return false;
      }
    },
  },
});
