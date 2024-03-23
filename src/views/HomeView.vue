<template>
    <DashboardLayout>
        <v-container fluid>
            <RouterView />
        </v-container>
    </DashboardLayout>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { ref } from 'vue'

import { useRouter } from 'vue-router';
import DashboardLayout from '../layouts/DashboardLayout.vue';


const router = useRouter();

function submitData() {
    alert(JSON.stringify(forms.value))
}

const drawer = ref(null)
</script>
