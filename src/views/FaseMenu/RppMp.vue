<template>
  <v-container fluid>
    <MenuTitle
      msg="Menu | Fase | Kelas |Semester | Kurikulum"
      class="text-subtitle-1 font-weight-medium"
    />
    <br />
    <v-btn
      icon="mdi-arrow-left-circle"
      @click="() => $router.go(-1)"
      color="primary"
    ></v-btn>
    <!-- <v-btn
      class="mt-1 rounded-xl"
      prepend-icon="mdi-arrow-left-circle"
      color="primary"
      @click="() => $router.go(-1)"
    >
      Kembali
    </v-btn> -->
    <v-row class="mt-1">
      <v-col cols="12" sm="4">
        <v-card
          class="mx-auto rounded-lg"
          width="350"
          height="250"
          elevation="8"
        >
          <v-card-item>
            <v-card-title>Capaian Pembelajaran</v-card-title>
            <v-img height="150px" :src="imageSrc"></v-img>
            <v-card-actions class="justify-end">
              <v-btn
                class="bg-success rounded-xl"
                :to="`/fase/${$route.params.idFase}/kelas/${$route.params.idKelas}/semester/${$route.params.idSemester}/mata-pelajaran/${$route.params.idMp}/rpp-mp/capaian-pembelajaran`"
                >Masuk</v-btn
              >
            </v-card-actions>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card
          class="mx-auto rounded-lg"
          width="350"
          height="250"
          elevation="8"
        >
          <v-card-item>
            <v-card-title>Tujuan Pembelajaran</v-card-title>
            <v-img height="150px" :src="imageSrc"></v-img>
            <v-card-actions class="justify-end">
              <v-btn
                class="bg-success rounded-xl"
                :to="`/fase/${$route.params.idFase}/kelas/${$route.params.idKelas}/semester/${$route.params.idSemester}/mata-pelajaran/${$route.params.idMp}/rpp-mp/tujuan-pembelajaran`"
                >Masuk</v-btn
              >
            </v-card-actions>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card
          class="mx-auto rounded-lg"
          width="350"
          height="250"
          elevation="8"
        >
          <v-card-item>
            <v-card-title>Alur Tujuan Pembelajaran</v-card-title>
            <v-img height="150px" :src="imageSrc"></v-img>
            <v-card-actions class="justify-end">
              <v-btn
                class="bg-success rounded-xl"
                :to="`/fase/${$route.params.idFase}/kelas/${$route.params.idKelas}/semester/${$route.params.idSemester}/mata-pelajaran/${$route.params.idMp}/rpp-mp/alur_tujuan-pembelajaran`"
                >Masuk</v-btn
              >
            </v-card-actions>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card
          class="mx-auto rounded-lg"
          width="350"
          height="250"
          elevation="8"
        >
          <v-card-item>
            <v-card-title>Modul Pembelajaran</v-card-title>
            <v-img height="150px" :src="imageSrc"></v-img>
            <v-card-actions class="justify-end">
              <v-btn
                class="bg-success rounded-xl"
                :to="`/fase/${$route.params.idFase}/kelas/${$route.params.idKelas}/semester/${$route.params.idSemester}/mata-pelajaran/${$route.params.idMp}/rpp-mp/model-pembelajaran`"
                >Masuk</v-btn
              >
            </v-card-actions>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card
          class="mx-auto rounded-lg"
          width="350"
          height="250"
          elevation="8"
        >
          <v-card-item>
            <v-card-title>Asesmen</v-card-title>
            <v-img height="150px" :src="imageSrc"></v-img>
            <v-card-actions class="justify-end">
              <v-btn
                class="bg-success rounded-xl"
                :to="`/fase/${$route.params.idFase}/kelas/${$route.params.idKelas}/semester/${$route.params.idSemester}/mata-pelajaran/${$route.params.idMp}/rpp-mp/asesmen`"
                >Masuk</v-btn
              >
            </v-card-actions>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import MenuTitle from "../../components/MenuTitle.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import imageSrc from "@/assets/img/gambar5.jpg";

const route = useRoute();
const idFase = route.params.idFase;
const idSemester = route.params.idSemester;
const idMp = route.params.idMp;

onMounted(() => {
  cek();
});

function cek() {
  console.log(
    "Id Fase : ",
    idFase,
    "Id Semester : ",
    idSemester,
    "Id Mp : ",
    idMp
  );
  console.log("Route params ", route.params);
}
</script>
