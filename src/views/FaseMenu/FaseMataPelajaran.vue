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

    <v-row class="d-flex flex-row-reverse mb-2 me-7">
      <v-dialog v-model="dialog" max-width="650px">
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            dark
            v-bind="props"
            prepend-icon="mdi mdi-plus"
            variant="tonal"
            elevation="2"
            v-if="roleUser === 'admin'"
          >
            Tambah Data
          </v-btn>
        </template>
        <v-card class="py-3 px-2">
          <v-card-title>
            <span class="text-h5">Form Mata Pelajaran</span>
          </v-card-title>

          <v-card-text>
            <v-container class="py-4">
              <v-form ref="form" v-model="isFormValid">
                <v-text-field
                  label="Nama Mata Pelajaran"
                  class="mb-3"
                  v-model="forms.namaMataPelajaran"
                ></v-text-field>
                <v-text-field
                  label="Tahun Ajaran"
                  class="mb-3"
                  v-model="forms.tahunAjaran"
                ></v-text-field>
              </v-form>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" variant="text" @click="close" elevation="4">
              Batal
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="save"
              elevation="4"
            >
              Simpan
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

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

    <!-- snackbar -->
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :color="colorSnackbar"
      rounded="pill"
      width="200"
    >
      <p class="text-center">{{ textSnackbar }}</p>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import MenuTitle from "../../components/MenuTitle.vue";
import imageSrc from "@/assets/img/gambar5.jpg";
import { useAuthStore } from "../../stores/useAuthStore";

// role user
const userStore = useAuthStore();
const roleUser = userStore.user.bidangMataPelajaran.toLowerCase();

// ambil parameter id
const route = useRoute();
const idSemester = route.params.idSemester;
const idFase = route.params.idFase;
const mataPelajaran = ref([]);

const dialog = ref(false);
const isFormValid = ref(false);

const snackbar = ref(false);
const textSnackbar = ref("");
const colorSnackbar = ref("green-lighten-1");
const timeout = ref(2000);

const forms = ref({
  namaMataPelajaran: "",
  tahunAjaran: "",
});

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

// function cekParams() {
//   console.log("Fase : " + idFase + " Semester : " + idSemester);
// }

const close = () => {
  dialog.value = false;
};

const save = async () => {
  // console.log(forms.value);
  console.log(idSemester);
  try {
    const newData = {
      namaMataPelajaran: forms.value.namaMataPelajaran,
      tahunAjaran: forms.value.tahunAjaran,
    };
    const response = await axios.post(
      `http://localhost:3000/fase/semester/${idSemester}/mp`,
      newData
    );

    if (response.status === 201) {
      forms.value.namaMataPelajaran = "";
      forms.value.tahunAjaran = "";
      dialog.value = false;
      loadData();
      textSnackbar.value = "Data Berhasil Disimpan";
      snackbar.value = true;
      colorSnackbar.value = "green-lighten-1";
    } else {
      console.error("Error respone data ", response.data);
    }
  } catch (error) {
    console.error("Error save data mata pelajaran", error);
  }
};

onMounted(() => {
  loadData();
});
</script>
