<template>
  <v-container fluid>
    <MenuTitle
      msg="Menu | Fase | Kelas | Semester | Matapelajaran"
      class="text-subtitle-1 font-weight-medium"
    />
    <br />

    <v-btn
      icon="mdi-arrow-left-circle"
      @click="() => $router.go(-1)"
      color="primary"
    ></v-btn>

    <v-row class="mt-1">
      <v-col cols="12" sm="4" v-for="i in mataPelajaran" :key="i.idMp">
        <v-card
          class="mx-auto rounded-lg"
          width="350"
          height="250"
          elevation="8"
        >
          <v-card-item>
            <v-card-title>{{ i.namaMataPelajaran }}</v-card-title>
            <!-- <v-card-subtitle>{{ i.tahunAjaran }} /</v-card-subtitle> -->
            <v-card-subtitle
              >Tahun ajaran
              {{ formatTahunAjaran(i.tahunAjaran) }}</v-card-subtitle
            >
            <v-img height="130px" :src="imageSrc"></v-img>
            <v-card-actions class="justify-end">
              <v-btn
                size="small"
                class="bg-success rounded-xl"
                :to="`/fase/${$route.params.idFase}/kelas/${$route.params.idKelas}/semester/${$route.params.idSemester}/mata-pelajaran/${i.idMp}/rpp-mp`"
                >RPP & Kurikulum</v-btn
              >
              <!-- <v-btn size="small" class="bg-success"
                                @click="console.log('idFase', $route.params.idFase, ' idSemester ', $route.params.idSemester, ' idMataPelajarn ', i.idMp)">RPP
                                &
                                Kurikulum</v-btn> -->
            </v-card-actions>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import MenuTitle from "../../components/MenuTitle.vue";
import imageSrc from "@/assets/img/gambar5.jpg";

// ambil parameter id
const route = useRoute();
const idSemester = route.params.idSemester;
const idFase = route.params.idFase;
const mataPelajaran = ref([]);

const loadData = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/fase/semester/${idSemester}/mp`
    );
    mataPelajaran.value = response.data;
    console.log("Success get mata pelajaran data : ", response.data);
  } catch (error) {
    console.error("Error get data mata pelajaran", error);
  }
};

const formatTahunAjaran = (tahunAjaran) => {
  const nextYear = parseInt(tahunAjaran) + 1;
  return `${tahunAjaran} / ${nextYear}`;
};

function cekParams() {
  console.log("Fase : " + idFase + " Semester : " + idSemester);
}

onMounted(() => {
  loadData();
});
</script>
