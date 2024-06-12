<template>
    <v-container>
        <v-row justify="center" class="mt-11">
            <v-col cols="6" class="">
                <v-card class="pa-10 mt-16" elevation="9">
                    <v-card-title>Perangkat Penyusunan Kurikulum Merdeka</v-card-title>
                    <v-card-subtitle>Login</v-card-subtitle>
                    <v-card-item>
                        <v-form @submit.prevent="submitData">
                            <v-text-field v-model="forms.nip" :rules="rules" label="NIP"
                                append-icon="mdi mdi-draw"></v-text-field>
                            <v-text-field v-model="forms.password" :rules="rules" label="Password"
                                :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="show = !show"></v-text-field>
                            <v-btn class="mt-2" color="success" type="submit" block>Login</v-btn>
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

        return "Field ini wajib diisi"
    }
]

function submitData() {

    const nip = forms.value.nip
    const password = forms.value.password

    userStore.login(nip, password)

}
</script>