<template>
    <v-layout>
        <v-app-bar>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-app-bar-title>Perangkat Penyusunan Kurikulum Merdeka</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-btn variant="outlined">
                <RouterLink to="/logout" style="text-decoration: none;">Logout</RouterLink>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer :width="250" v-model="drawer" class="pt-5">
            <v-list-item>
                <p>Hi, {{ userStore.user }}</p>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item to="/fase" title="Fase" class="my-8">
                <template v-slot:prepend>
                    <v-icon icon="mdi mdi-town-hall" />
                </template>
            </v-list-item>
            <v-list-item to="/administrasiguru" title="Administrasi Guru" class="my-8">
                <template v-slot:prepend>
                    <v-icon icon="mdi mdi-book" />
                </template>
            </v-list-item>
            <v-list-item to="/datalistguru" title="List Guru" class="my-8">
                <template v-slot:prepend>
                    <v-icon icon="mdi mdi-account-card" />
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
import { RouterView } from 'vue-router';
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/useAuthStore';

const userStore = useAuthStore();
// const nameUser = userStore.user.nameUser
// const nameUser = computed(() => userStore.user ? userStore.user.nameUser : 'User')
const drawer = ref(null)

function logout() {
    userStore.logout()
}
</script>