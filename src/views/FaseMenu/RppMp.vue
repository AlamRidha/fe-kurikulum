<template>
    <v-container fluid>
        <MenuTitle msg="Menu | Fase | Semester | Kurikulum" class="text-subtitle-1 font-weight-medium" />
        <v-row class="mt-2">
            <v-col cols="12" sm="4">
                <v-card class="mx-auto rounded-lg" width="350" height="250" elevation="8">
                    <v-card-item>
                        <v-card-title>Capaian Pembelajaran</v-card-title>
                        <v-img height="150px"
                            src="https://i.pinimg.com/236x/0d/2d/f3/0d2df34a24e60fb459b4e055da86969e.jpg"></v-img>
                        <v-card-actions class="justify-end">
                            <v-btn size="small" class="bg-success"
                                :to="`/fase/${$route.params.idFase}/semester/${$route.params.idSemester}/mata-pelajaran/${$route.params.idMp}/rpp-mp/capaian-pembelajaran`">Masuk</v-btn>
                        </v-card-actions>
                    </v-card-item>
                </v-card>
            </v-col>

            <v-col cols="12" sm="4">
                <v-card class="mx-auto rounded-lg" width="350" height="250" elevation="8">
                    <v-card-item>
                        <v-card-title>Tujuan Pembelajaran</v-card-title>
                        <v-img height="150px"
                            src="https://i.pinimg.com/236x/0d/2d/f3/0d2df34a24e60fb459b4e055da86969e.jpg"></v-img>
                        <v-card-actions class="justify-end">
                            <v-btn size="small" class="bg-success"
                                :to="`/fase/${$route.params.idFase}/semester/${$route.params.idSemester}/mata-pelajaran/${$route.params.idMp}/rpp-mp/tujuan-pembelajaran`">Masuk</v-btn>
                        </v-card-actions>
                    </v-card-item>
                </v-card>
            </v-col>

            <v-col cols="12" sm="4">
                <v-card class="mx-auto rounded-lg" width="350" height="250" elevation="8">
                    <v-card-item>
                        <v-card-title>Alur Tujuan Pembelajaran</v-card-title>
                        <v-img height="150px"
                            src="https://i.pinimg.com/236x/0d/2d/f3/0d2df34a24e60fb459b4e055da86969e.jpg"></v-img>
                        <v-card-actions class="justify-end">
                            <v-btn size="small" class="bg-success"
                                :to="`/fase/${$route.params.idFase}/semester/${$route.params.idSemester}/mata-pelajaran/${$route.params.idMp}/rpp-mp/alur_tujuan-pembelajaran`">Masuk</v-btn>
                        </v-card-actions>
                    </v-card-item>
                </v-card>
            </v-col>

            <v-col cols="12" sm="4">
                <v-card class="mx-auto rounded-lg" width="350" height="250" elevation="8">
                    <v-card-item>
                        <v-card-title>Model Pembelajaran</v-card-title>
                        <v-img height="150px"
                            src="https://i.pinimg.com/236x/0d/2d/f3/0d2df34a24e60fb459b4e055da86969e.jpg"></v-img>
                        <v-card-actions class="justify-end">
                            <v-btn size="small" class="bg-success">Belum Siap</v-btn>
                        </v-card-actions>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import MenuTitle from "../../components/MenuTitle.vue"
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()
const idFase = route.params.idFase
const idSemester = route.params.idSemester
const idMp = route.params.idMp


onMounted(() => {
    cek()
})

function cek() {
    console.log("Id Fase : ", idFase, "Id Semester : ", idSemester, "Id Mp : ", idMp)
    console.log('Route params ', route.params)
}
</script>