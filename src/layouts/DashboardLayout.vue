<template>
  <v-layout>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title
        >Aplikasi Penyusunan Rencana Pembelajaran & Kurikulum</v-app-bar-title
      >
      <v-spacer></v-spacer>
      <p class="me-8 text-h6">Hi, {{ nameUser }}</p>
    </v-app-bar>

    <v-navigation-drawer :width="250" v-model="drawer" class="pt-5">
      <v-list-item>
        <p>Selamat Datang</p>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item to="/fase" title="Fase" class="my-8">
        <template v-slot:prepend>
          <v-icon icon="mdi mdi-town-hall" />
        </template>
      </v-list-item>
      <v-list-item to="/kurikulum" title="Kurikulum" class="my-8">
        <template v-slot:prepend>
          <v-icon icon="mdi mdi-file-document" />
        </template>
      </v-list-item>
      <v-list-item to="/administrasiguru" title="Buku Guru" class="my-8">
        <template v-slot:prepend>
          <v-icon icon="mdi mdi-book-open-variant" />
        </template>
      </v-list-item>
      <v-list-item to="/datalistguru" title="Daftar Guru" class="my-8">
        <template v-slot:prepend>
          <v-icon icon="mdi mdi-account-card" />
        </template>
      </v-list-item>
      <v-list-item
        to="/profilpelajarpancasila"
        title="Profil Pelajar"
        class="my-8"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi mdi-bag-personal" />
        </template>
      </v-list-item>
      <v-list-item to="/evaluasi" title="Hasil Evaluasi" class="my-8">
        <template v-slot:prepend>
          <v-icon icon="mdi mdi-marker" />
        </template>
      </v-list-item>
      <v-list-item title="Logout" class="my-8" @click="logout">
        <template v-slot:prepend>
          <v-icon icon="mdi mdi-logout" />
        </template>
      </v-list-item>
    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script setup>
import { RouterView } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "../stores/useAuthStore";

const userStore = useAuthStore();
const nameUser = userStore.user.nameUser;
const drawer = ref(null);

function logout() {
  userStore.logout();
  // console.log(userStore.user.nameUser)
}
</script>
