<template>
    <v-container>
        <v-row justify="center" class="mt-11">
            <v-col cols="8">
                <v-card class="pa-5 mt-16 rounded-xl" elevation="9" height="400px">
                    <v-card-title class="text-h5">Perangkat Penyusunan Kurikulum Merdeka</v-card-title>
                    <v-card-subtitle class="text-body-1">SDN 138 Pekanbaru</v-card-subtitle>
                    <v-card-item class="pa-8">
                        <v-form @submit.prevent="submitData">
                            <v-text-field v-model="forms.nip" :rules="rules" label="NIP"
                                append-icon="mdi mdi-draw"></v-text-field>
                            <v-text-field v-model="forms.password" :rules="rules" label="Password"
                                :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show = !show"></v-text-field>
                            <v-btn class="mt-8 pa-5 rounded-pill text-button" color="success" type="submit"
                                block>Login</v-btn>
                        </v-form>
                    </v-card-item>
                </v-card>
            </v-col>
            <!-- <v-btn class="mt-2" color="success" block @click="logout">Logout</v-btn>
            <v-btn class="mt-2" color="success" block @click="ceklogin">Cek</v-btn> -->
            <iframe src="https://lottie.host/embed/70d73fed-70a2-43a8-9ab1-8d2c9958b907/4N3hPHRMNB.json"
                style="border: none;" class="ms-8"></iframe>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';

const userStore = useAuthStore();

const forms = ref({
    nip: "",
    password: "",
})

const show = ref(false)

const rules = [
    value => {
        if (value) return true
        return "Masukkan Data Terlebih Dahulu"
    }
]

async function submitData() {

    const nip = forms.value.nip
    const password = forms.value.password

    userStore.login(nip, password)

}
</script>