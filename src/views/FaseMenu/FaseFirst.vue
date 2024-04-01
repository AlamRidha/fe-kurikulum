<template>
    <v-container fluid>
        <h1>Fase {{ $route.params.idFase }}</h1>
        <h3>Pilih Semester</h3>
        <v-container class="">
            <v-row>
                <v-col cols="auto" v-for="i in semester">
                    <v-card class="mx-auto" max-width="500" width="200" elevation="8" prepend-icon="mdi-account"
                        :title="i.namaSemester"
                        @click="console.log('helo ini fase ' + $route.params.idFase + ' di ' + i.namaSemester)">
                        <v-card-item>
                            <v-btn size="small" class="bg-success"
                                :to="`/fase/${$route.params.idFase}/semester/${i.idSemester}/mata-pelajaran`">Pilih</v-btn>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';

const semester = ref([
    { idSemester: 1, namaSemester: 'Semester 1', },
    { idSemester: 2, namaSemester: 'Semester 2', },

])

</script>