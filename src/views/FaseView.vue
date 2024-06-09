<template>
    <v-container fluid>
        <MenuTitle msg="Menu | Fase" class="text-subtitle-1 font-weight-medium" />
        <v-container class="elevation-5">
            <v-row>
                <v-col cols="12" sm="3" v-for="i in  fase ">
                    <v-sheet class="ma-2 pa-2">
                        <v-card elevation="8">
                            <v-card-item>
                                <v-card-title>{{ i.namaFase }}</v-card-title>
                                <v-card-subtitle>SDN 138 Pekanbaru</v-card-subtitle>
                                <!-- <v-img height="200px"
                                        src="https://i.pinimg.com/236x/0d/2d/f3/0d2df34a24e60fb459b4e055da86969e.jpg"></v-img> -->
                                <v-card-actions>
                                    <v-btn size="small" class="bg-success"
                                        :to="`/fase/${i.idFase}/semester`">Pilih</v-btn>
                                </v-card-actions>
                            </v-card-item>
                        </v-card>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script setup>
import MenuTitle from "../components/MenuTitle.vue"
import { ref } from 'vue'

const fase = ref([
    { idFase: 1, namaFase: 'Fase 1', },
    { idFase: 2, namaFase: 'Fase 2', },
    { idFase: 3, namaFase: 'Fase 3', },
])

</script>
