<template>
    <h1>Fase {{ $route.params.idFase }} dan Semester {{ $route.params.idSemester }}</h1>
    <h4>Pilih Mata Pelajaran</h4>
    <v-container class="">
        <v-row v-if="$route.params.idFase == 1">
            <v-col cols="auto" v-for="i in mataPelajaranFase1">
                <v-card class="mx-auto" max-width="500" width="400" elevation="8" prepend-icon="mdi-account"
                    :title="i.namaMataPelajaran"
                    @click="console.log('helo ini fase ' + $route.params.idFase + ' di ' + i.namaMataPelajaran)">
                    <v-card-item>
                        <v-btn size="small" class="bg-success"
                            :to="`/fase/${$route.params.idFase}/semester/${$route.params.idSemester}/mata-pelajaran/${i.idMataPelajaran}`">Pilih</v-btn>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else-if="$route.params.idFase == 2">
            <v-col cols="auto" v-for="i in mataPelajaranFase2">
                <v-card class="mx-auto" max-width="500" width="400" elevation="8" prepend-icon="mdi-account"
                    :title="i.namaMataPelajaran"
                    @click="console.log('helo ini fase ' + $route.params.idFase + ' di ' + i.namaMataPelajaran)">
                    <v-card-item>
                        <v-btn size="small" class="bg-success"
                            :to="`/fase/${$route.params.idFase}/semester/${$route.params.idSemester}/mata-pelajaran/${i.idMataPelajaran}`">Pilih</v-btn>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="auto" v-for="i in mataPelajaranFase3">
                <v-card class="mx-auto" max-width="500" width="400" elevation="8" prepend-icon="mdi-account"
                    :title="i.namaMataPelajaran"
                    @click="console.log('helo ini fase ' + $route.params.idFase + ' di ' + i.namaMataPelajaran)">
                    <v-card-item>
                        <v-btn size="small" class="bg-success"
                            :to="`/fase/${$route.params.idFase}/semester/${$route.params.idSemester}/mata-pelajaran/${i.idMataPelajaran}`">Pilih</v-btn>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const idFase = ref("")
const idSemester = ref("")


const mataPelajaranFase1 = reactive([
    { idMataPelajaran: 1, namaMataPelajaran: 'Matematika' },
    { idMataPelajaran: 2, namaMataPelajaran: 'Bahasa Indonesia' },
    { idMataPelajaran: 3, namaMataPelajaran: 'Bahasa Inggris' },
    { idMataPelajaran: 4, namaMataPelajaran: 'Pendidikan Agama Islam dan Budi Pekerti' },
    { idMataPelajaran: 5, namaMataPelajaran: 'PJOK' },
    { idMataPelajaran: 6, namaMataPelajaran: 'Pendidikan Pancasila' },
    { idMataPelajaran: 7, namaMataPelajaran: 'Pendidikan Jasmani Olahraga dan Kesehatan' },
    { idMataPelajaran: 8, namaMataPelajaran: 'Seni Musik' },
    { idMataPelajaran: 9, namaMataPelajaran: 'Seni Rupa' },
    { idMataPelajaran: 10, namaMataPelajaran: 'Seni Teater' },
    { idMataPelajaran: 11, namaMataPelajaran: 'Seni Tari' },
])

const mataPelajaranFase2 = reactive([
    { idMataPelajaran: 1, namaMataPelajaran: 'Pendidikan Pancasila' },
    { idMataPelajaran: 2, namaMataPelajaran: 'IPAS' },
    { idMataPelajaran: 3, namaMataPelajaran: 'Bahasa Indonesia' },
    { idMataPelajaran: 4, namaMataPelajaran: 'Pendidikan Agama Islam dan Budi Pekerti' },
    { idMataPelajaran: 5, namaMataPelajaran: 'Matematika' },
    { idMataPelajaran: 6, namaMataPelajaran: 'Bahasa Inggris' },
    { idMataPelajaran: 7, namaMataPelajaran: 'Pendidikan Jasmani Olahraga dan Kesehatan' },
    { idMataPelajaran: 8, namaMataPelajaran: 'Seni Musik' },
    { idMataPelajaran: 9, namaMataPelajaran: 'Seni Rupa' },
    { idMataPelajaran: 10, namaMataPelajaran: 'Seni Teater' },
    { idMataPelajaran: 11, namaMataPelajaran: 'Seni Tari' },
    { idMataPelajaran: 12, namaMataPelajaran: 'Budaya Melayu Riau' },
    { idMataPelajaran: 13, namaMataPelajaran: 'Pendidikan Lingkungan Hidup' },
])

const mataPelajaranFase3 = reactive([
    { idMataPelajaran: 1, namaMataPelajaran: 'Pendidikan Pancasila' },
    { idMataPelajaran: 2, namaMataPelajaran: 'IPAS' },
    { idMataPelajaran: 3, namaMataPelajaran: 'Bahasa Indonesia' },
    { idMataPelajaran: 4, namaMataPelajaran: 'Pendidikan Agama Islam dan Budi Pekerti' },
    { idMataPelajaran: 5, namaMataPelajaran: 'Matematika' },
    { idMataPelajaran: 6, namaMataPelajaran: 'Bahasa Inggris' },
    { idMataPelajaran: 7, namaMataPelajaran: 'Pendidikan Jasmani Olahraga dan Kesehatan' },
    { idMataPelajaran: 8, namaMataPelajaran: 'Seni Musik' },
    { idMataPelajaran: 9, namaMataPelajaran: 'Seni Rupa' },
    { idMataPelajaran: 10, namaMataPelajaran: 'Seni Teater' },
    { idMataPelajaran: 11, namaMataPelajaran: 'Seni Tari' },
    { idMataPelajaran: 12, namaMataPelajaran: 'Budaya Melayu Riau' },
    { idMataPelajaran: 13, namaMataPelajaran: 'Pendidikan Lingkungan Hidup' },
])


</script>