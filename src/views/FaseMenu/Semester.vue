<template>
    <v-container fluid>
        <MenuTitle msg="Menu | Fase | Semester" class="text-subtitle-1 font-weight-medium" />
        <h5 class="text-h5">Pilih Semester</h5>

        <v-container class="">
            <v-row>
                <v-col cols="12" md="6" v-for="i in semester">
                    <v-card class="mx-auto rounded-xl" max-width="500" width="300" height="300" elevation="8"
                        prepend-icon="mdi-account" :title="i.namaSemester"
                        @click="console.log('helo ini fase ' + $route.params.idFase + ' di ' + i.namaSemester)">
                        <v-card-item>
                            <v-img height="180px"
                                src="https://i.pinimg.com/236x/0d/2d/f3/0d2df34a24e60fb459b4e055da86969e.jpg"></v-img>
                            <v-card-actions class="justify-end">
                                <v-btn size="small" class="bg-success"
                                    :to="`/fase/${$route.params.idFase}/semester/${i.idSemester}/mata-pelajaran`">Pilih</v-btn>
                            </v-card-actions>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MenuTitle from "../../components/MenuTitle.vue"
import { useRoute } from 'vue-router';

const semester = ref([])

// ambil parameter id
const route = useRoute()
const idFase = route.params.idFase

const loadData = async () => {
    // console.log(idFase)
    try {
        const response = await axios.get(`http://localhost:3000/fase/${idFase}/semester`)
        semester.value = response.data
        console.log("Success get data semester ", response.data)
    } catch (error) {
        console.error("Error get data semester", error)
    }
}

onMounted(() => {
    loadData()
})

</script>