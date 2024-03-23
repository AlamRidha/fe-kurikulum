<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="5">
                <v-card class="pa-10 mt-12" elevation="8">
                    <v-card-title>Login</v-card-title>
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
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const forms = ref({
    nip: "",
    password: "",
})

const show = ref(false)

const router = useRouter();

const rules = [
    value => {
        if (value) return true

        return "You must enter this field"
    }
]

function submitData() {
    alert(JSON.stringify(forms.value))
    router.push('/'); // Redirect to home page
}

</script>