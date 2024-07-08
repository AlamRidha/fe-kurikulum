<template>
  <v-container fluid>
    <MenuTitle
      msg="Menu | Fase | Kelas | Semester"
      class="text-subtitle-1 font-weight-medium"
    />
    <br />

    <v-btn
      icon="mdi-arrow-left-circle"
      @click="() => $router.go(-1)"
      color="primary"
    ></v-btn>

    <h5 class="text-h5 mt-1">Pilih Semester</h5>

    <v-container class="">
      <v-row>
        <v-col cols="12" md="6" v-for="i in semester">
          <v-card
            class="mx-auto rounded-xl"
            max-width="500"
            width="300"
            height="320"
            elevation="8"
            prepend-icon="mdi-account"
            :title="i.namaSemester"
            @click="
              console.log(
                'helo ini fase ' +
                  $route.params.idFase +
                  ' dan di kelas ' +
                  $route.params.idKelas +
                  ' di ' +
                  i.namaSemester
              )
            "
          >
            <v-card-item>
              <v-img
                class="mt-2"
                height="180px"
                :src="imageSrc"
                aspect-ratio="1/1"
                cover
              ></v-img>
              <v-card-actions class="justify-end">
                <v-btn
                  class="bg-success rounded-xl mt-3"
                  :to="`/fase/${$route.params.idFase}/kelas/${$route.params.idKelas}/semester/${i.idSemester}/mata-pelajaran`"
                  >Pilih</v-btn
                >
              </v-card-actions>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import MenuTitle from "../../components/MenuTitle.vue";
import { useRoute } from "vue-router";
import imageSrc from "@/assets/img/gambar4.png";

const semester = ref([]);

// ambil parameter id
const route = useRoute();
const idKelas = route.params.idKelas;

const loadData = async () => {
  // console.log(idKelas)
  try {
    const response = await axios.get(
      `http://localhost:3000/fase/kelas/${idKelas}/semester`
    );
    semester.value = response.data;
    console.log("Success get data semester ", response.data);
  } catch (error) {
    console.error("Error get data semester", error);
  }
};

onMounted(() => {
  loadData();
});
</script>
