<template>
    <v-container fluid>
        <MenuTitle msg="Menu | Fase" class="text-subtitle-1 font-weight-medium" />
        <!-- crooscheck kembali apakah perlu pakai elevation atau enggak -->
        <v-container class=" mt-3 displayContainer">
            <v-row>
                <v-col cols="12" sm="4" v-for="i in fase" :key="i.idFase">
                    <v-sheet class="ma-2 pa-2">
                        <v-card elevation="8" class="cardHeight rounded-xl">
                            <v-card-item>
                                <v-card-title>{{ i.namaFase }}</v-card-title>
                                <v-card-subtitle>SDN 138 Pekanbaru</v-card-subtitle>
                                <v-img height="150px"
                                    src="https://i.pinimg.com/236x/0d/2d/f3/0d2df34a24e60fb459b4e055da86969e.jpg"></v-img>
                                <v-card-actions class="justify-end">
                                    <v-btn class="bg-success mt-5" :to="`/fase/${i.idFase}/semester`">Pilih</v-btn>
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
import axios from "axios";
import MenuTitle from "../components/MenuTitle.vue"
import { ref, onMounted, computed } from 'vue'

const fase = ref([])

const loadData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/fase')
        const data = response.data
        fase.value = data
        // console.log(data)
    } catch (error) {
        console.error("Error get data fase", error)
    }
}

onMounted(() => {
    loadData()
})


</script>


<style scoped>
.displayContainer {
    height: 500px !important;
}

.cardHeight {
    height: 300px;
}
</style>