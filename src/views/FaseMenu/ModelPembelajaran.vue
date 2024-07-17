<template>
  <v-container fluid>
    <MenuTitle
      msg="Menu | Kurikulum Modul Pembelajaran"
      class="text-subtitle-1 font-weight-medium"
    />

    <v-data-table
      :headers="headers"
      :items="modul_pembelajaran"
      :items-per-page="5"
      class="elevation-5 mt-4"
    >
      <template v-slot:item.no="{ index }"> {{ index + 1 }} </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Data Modul Pembelajaran</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <!-- modal tambah -->
          <v-dialog v-model="dialog" max-width="550px">
            <template v-slot:activator="{ props }">
              <v-btn
                class="mb-2"
                color="primary"
                variant="outlined"
                dark
                v-bind="props"
                prepend-icon="mdi mdi-plus"
              >
                Tambah Data
              </v-btn>
            </template>
            <v-card class="py-3 px-2">
              <v-card-title>
                <span class="text-h5">Form Modul Pembelajaran</span>
              </v-card-title>

              <v-card-text>
                <v-container class="py-4">
                  <v-form ref="form" v-model="isFormValid">
                    <v-text-field
                      v-model="forms.tahun_penyusunan"
                      label="Tahun Penyusunan"
                      :rules="textRules('Tahun Penyusunan')"
                    ></v-text-field>
                    <v-text-field
                      v-model="forms.bab"
                      label="Bab"
                      :rules="textRules('Bab')"
                    ></v-text-field>
                    <v-text-field
                      v-model="forms.tema"
                      label="Tema"
                      :rules="textRules('Tema')"
                    ></v-text-field>
                    <v-text-field
                      v-model="forms.alokasi_waktu"
                      label="Alokasi Waktu"
                      :rules="textRules('Alokasi Waktu')"
                    ></v-text-field>
                    <v-text-field
                      v-model="forms.kompetensi_awal"
                      label="Kompetensi Awal"
                      :rules="textRules('Kompetensi Awal')"
                    ></v-text-field>
                    <v-combobox
                      v-model="forms.profil_pancasila"
                      :items="namaDimensi"
                      label="Pilih Profil Pancasila"
                      multiple
                      chips
                    ></v-combobox>
                    <!-- <v-text-field v-model="forms.profil_pancasila"
                                            label="Profil Pancasila"></v-text-field> -->
                    <v-text-field
                      v-model="forms.sarana_prasarana"
                      label="Sarana dan Prasarana"
                      :rules="textRules('Sarana dan Prasarana')"
                    ></v-text-field>
                    <v-text-field
                      v-model="forms.model_pembelajaran"
                      label="Model Pembelajaran"
                      :rules="textRules('Model Pembelajaran')"
                    ></v-text-field>
                    <v-text-field
                      v-model="forms.tujuan_bab"
                      label="Tujuan Bab"
                      :rules="textRules('Tujuan Bab')"
                    ></v-text-field>
                    <!-- <v-select v-model="forms.deskripsi_cp" :items="deskripsiCapaian"
                                            label="Deskripsi Capaian Pembelajaran"></v-select> -->
                    <v-text-field
                      v-model="forms.deskripsi_cp"
                      label="Deskripsi Capaian Pembelajaran"
                      :rules="textRules('Deskripsi Capaian Pembelajaran')"
                    ></v-text-field>
                    <v-text-field
                      v-model="forms.pemahaman"
                      label="Pemahaman"
                      :rules="textRules('Pemahaman')"
                    ></v-text-field>
                    <v-textarea
                      v-model="forms.kegiatan_pembelajaran"
                      label="Kegiatan Pembelajaran"
                      :rules="textRules('Kegiatan Pembelajaran')"
                      class="rounded-xl"
                      bg-color="grey-lighten-2"
                    ></v-textarea>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  variant="text"
                  @click="close"
                  elevation="4"
                >
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

          <!-- modal edit -->
          <v-dialog v-model="dialogEdit" max-width="650px">
            <v-card class="py-3 px-2">
              <v-card-title>
                <span class="text-h5">Edit Modul Pembelajaran</span>
              </v-card-title>

              <v-card-text>
                <v-container class="py-4">
                  <v-form ref="form">
                    <v-text-field
                      v-model="formsEdit.tahun_penyusunan"
                      label="Tahun Penyusunan"
                    ></v-text-field>
                    <v-text-field
                      v-model="formsEdit.bab"
                      label="Bab"
                    ></v-text-field>
                    <v-text-field
                      v-model="formsEdit.tema"
                      label="Tema"
                    ></v-text-field>
                    <v-text-field
                      v-model="formsEdit.alokasi_waktu"
                      label="Alokasi Waktu"
                    ></v-text-field>
                    <v-text-field
                      v-model="formsEdit.kompetensi_awal"
                      label="Kompetensi Awal"
                    ></v-text-field>
                    <!-- <v-text-field v-model="formsEdit.profil_pancasila"
                                            label="Profil Pancasila"></v-text-field> -->
                    <v-combobox
                      v-model="formsEdit.profil_pancasila"
                      :items="namaDimensi"
                      label="Pilih Profil Pancasila"
                      multiple
                      chips
                    ></v-combobox>
                    <v-text-field
                      v-model="formsEdit.sarana_prasarana"
                      label="Sarana dan Prasarana"
                    ></v-text-field>
                    <v-text-field
                      v-model="formsEdit.model_pembelajaran"
                      label="Model Pembelajaran"
                    ></v-text-field>
                    <v-text-field
                      v-model="formsEdit.tujuan_bab"
                      label="Tujuan Bab"
                    ></v-text-field>
                    <v-text-field
                      v-model="formsEdit.deskripsi_cp"
                      label="Deskripsi Capaian Pembelajaran"
                    ></v-text-field>
                    <v-text-field
                      v-model="formsEdit.pemahaman"
                      label="Pemahaman"
                    ></v-text-field>
                    <v-textarea
                      v-model="formsEdit.kegiatan_pembelajaran"
                      name="Kegiatan Pembelajaran"
                      label="Kegiatan Pembelajaran"
                      bg-color="grey-lighten-2"
                    ></v-textarea>
                    <!-- <textarea v-model="formsEdit.kegiatan_pembelajaran" cols="62" rows="10"
                                            name="Kegiatan Pembelajaran" label="Kegiatan Pembelajaran"
                                            placeholder="Kegiatan Pembelajaran"
                                            class="border-sm elevation-2 pa-3"></textarea> -->
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  variant="text"
                  @click="closeEdit"
                  elevation="4"
                >
                  Batal
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="updateData"
                  elevation="4"
                >
                  Simpan Data
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- modal hapus -->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card class="pa-5 rounded-lg">
              <v-card-title class="text-h5 text-center"
                >Apakah anda yakin <br />
                ingin menghapus data ini?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  variant="elevated"
                  @click="closeDelete"
                  elevation="4"
                  >Batal</v-btn
                >
                <v-btn
                  color="blue-darken-1"
                  variant="outlined"
                  @click="deleteItemConfirm"
                  elevation="4"
                  >Hapus Data</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- modal show -->
          <v-dialog v-model="dialogShow" max-width="1200px">
            <v-card>
              <v-card-item>
                <v-card-title>
                  <span class="text-h5">Detail Modul Pembelajaran</span>
                </v-card-title>
              </v-card-item>
              <v-card-text>
                <v-container class="py-1">
                  <v-card-title class="font-weight-bold">
                    Informasi Umum
                  </v-card-title>

                  <v-card-subtitle>
                    A. Identitas Modul Pembelajaran
                  </v-card-subtitle>

                  <v-row align="start" class="ms-2">
                    <!-- instansi -->
                    <v-col cols="4">
                      <v-sheet class="pa-1"> Instansi </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.instansi }}
                      </v-sheet>
                    </v-col>

                    <!-- Tahun Penyusunan -->
                    <v-col cols="4">
                      <v-sheet class="pa-1"> Tahun Penyusunan </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.tahun_penyusunan }}
                      </v-sheet>
                    </v-col>

                    <!-- Mata Pelajaran -->
                    <v-col cols="4">
                      <v-sheet class="pa-1"> Mata Pelajaran </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.mata_pelajaran }}
                      </v-sheet>
                    </v-col>

                    <!-- Bab -->
                    <v-col cols="4">
                      <v-sheet class="pa-1"> Bab </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.bab }}
                      </v-sheet>
                    </v-col>

                    <!-- Tema -->
                    <v-col cols="4">
                      <v-sheet class="pa-1"> Tema </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.tema }}
                      </v-sheet>
                    </v-col>

                    <!-- Alokasi Waktu -->
                    <v-col cols="4">
                      <v-sheet class="pa-1"> Alokasi Waktu </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.alokasi_waktu }}
                      </v-sheet>
                    </v-col>

                    <!-- Kompetensi Awal -->
                    <v-col cols="4">
                      <v-sheet class="pa-1"> Kompetensi Awal </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.kompetensi_awal }}
                      </v-sheet>
                    </v-col>

                    <!-- Profil Pancasila -->
                    <v-col cols="4">
                      <v-sheet class="pa-1"> Profil Pancasila </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.profil_pancasila }}
                      </v-sheet>
                    </v-col>

                    <!-- Sarana Prasarana -->
                    <v-col cols="4">
                      <v-sheet class="pa-1"> Sarana dan Prasarana </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.sarana_prasarana }}
                      </v-sheet>
                    </v-col>

                    <!-- Model Pembelajaran -->
                    <v-col cols="4">
                      <v-sheet class="pa-1"> Model Pembelajaran </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.model_pembelajaran }}
                      </v-sheet>
                    </v-col>
                  </v-row>

                  <v-card-title class="font-weight-bold">
                    Komponen Inti
                  </v-card-title>

                  <v-card-subtitle>
                    B. Tujuan Kegiatan Pembelajaran
                  </v-card-subtitle>

                  <v-row align="start" class="ms-2">
                    <!-- Tujuan Bab -->
                    <v-col cols="4">
                      <v-sheet class="pa-1"> Tujuan Bab </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.tujuan_bab }}
                      </v-sheet>
                    </v-col>

                    <!-- Deskripsi Capaian Pembelajaran -->
                    <v-col cols="4">
                      <v-sheet class="pa-1">
                        Deskripsi Capaian Pembelajaran
                      </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.deskripsi_cp }}
                      </v-sheet>
                    </v-col>

                    <!-- Pemahaman -->
                    <v-col cols="4">
                      <v-sheet class="pa-1"> Pemahaman </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.pemahaman }}
                      </v-sheet>
                    </v-col>

                    <!-- Kegiatan Pembelajaran -->
                    <v-col cols="4">
                      <v-sheet class="pa-1"> Kegiatan Pembelajaran </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        <!-- {{ dataShow.kegiatan_pembelajaran }} -->
                        <div
                          class="text-justify"
                          v-html="formattedText(dataShow.kegiatan_pembelajaran)"
                        ></div>
                      </v-sheet>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  variant="text"
                  @click="closeShow"
                  elevation="4"
                  class="mb-3 rounded-lg"
                  prepend-icon="mdi-close-circle-outline"
                >
                  <template v-slot:prepend>
                    <v-icon color="error"></v-icon>
                  </template>
                  Tutup
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-btn
          density="comfortable"
          icon="mdi mdi-eye-outline"
          color="cyan-accent-4"
          class="mx-2"
          @click="showItem(item.idModul)"
        ></v-btn>
        <v-btn
          density="comfortable"
          icon="mdi mdi-pen"
          color="success"
          class="mx-2"
          @click="editItem(item.idModul)"
        ></v-btn>
        <v-btn
          density="comfortable"
          icon="mdi mdi-delete"
          color="error"
          class="mx-2"
          @click="deleteItem(item.idModul)"
        ></v-btn>
      </template>
    </v-data-table>
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
import MenuTitle from "../../components/MenuTitle.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { formattedText } from "../../helper/index";
import { textRules } from "../../helper/index";
import { useRoute } from "vue-router";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const isFormValid = ref(false);

const namaMp = ref("");
const route = useRoute();
const idMp = route.params.idMp;
const modul_pembelajaran = ref([]);
const capaian_pembelajaran = ref([]);
const deskripsiCapaian = ref([]);
const dataProfilPelajar = ref([]);
const namaDimensi = ref([]);

const snackbar = ref(false);
const textSnackbar = ref("");
const timeout = ref(2000);
const colorSnackbar = ref("green-lighten-1");

const forms = ref({
  tahun_penyusunan: "",
  bab: "",
  tema: "",
  alokasi_waktu: "",
  kompetensi_awal: "",
  profil_pancasila: [],
  sarana_prasarana: "",
  model_pembelajaran: "",
  tujuan_bab: "",
  deskripsi_cp: "",
  pemahaman: "",
  kegiatan_pembelajaran: "",
});

const formsEdit = ref({
  idModul: "",
  tahun_penyusunan: "",
  bab: "",
  tema: "",
  alokasi_waktu: "",
  kompetensi_awal: "",
  profil_pancasila: [],
  sarana_prasarana: "",
  model_pembelajaran: "",
  tujuan_bab: "",
  deskripsi_cp: "",
  pemahaman: "",
  kegiatan_pembelajaran: "",
});

const dataShow = ref({
  idModul: "",
  instansi: "",
  tahun_penyusunan: "",
  mata_pelajaran: "",
  bab: "",
  tema: "",
  alokasi_waktu: "",
  kompetensi_awal: "",
  profil_pancasila: "",
  sarana_prasarana: "",
  model_pembelajaran: "",
  tujuan_bab: "",
  deskripsi_cp: "",
  pemahaman: "",
  kegiatan_pembelajaran: "",
});

const headers = ref([
  {
    title: "No",
    align: "center",
    sortable: false,
    key: "no",
    value: "id",
  },
  {
    title: "Bab",
    align: "start",
    sortable: false,
    key: "bab",
  },
  {
    title: "Tema",
    align: "start",
    sortable: false,
    key: "tema",
  },
  {
    title: "Tahun Penyusunan",
    align: "center",
    sortable: false,
    key: "tahun_penyusunan",
  },
  {
    title: "Aksi",
    align: "center",
    key: "actions",
    sortable: false,
  },
]);

const deleteId = ref("");

// dialog
const dialogDelete = ref(false);
const dialog = ref(false);
const dialogEdit = ref(false);
const dialogShow = ref(false);

function close() {
  dialog.value = false;
}

function closeDelete() {
  dialogDelete.value = false;
}

function closeEdit() {
  dialogEdit.value = false;
}

function closeShow() {
  dialogShow.value = false;
}

const getCapaian = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/kurikulum/${idMp}/capaian_pembelajaran`
    );
    const data = response.data;
    capaian_pembelajaran.value = data;
    deskripsiCapaian.value = capaian_pembelajaran.value.map(
      (cp) => cp.capaian_pembelajaran
    );
    // console.log("Data capaian pembelajaran", elemenList.value)
  } catch (error) {
    console.error("Error get data", error);
  }
};

// ambil data modul pembelajaran
const loadData = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/kurikulum/${idMp}/modul_pembelajaran`
    );
    const data = response.data;
    modul_pembelajaran.value = data;
    // console.log("Data model pembela jaran ", data)
  } catch (error) {
    console.error("Error get data", error);
  }
};

// simpan data modul pembelajaran
const save = async () => {
  if (isFormValid.value) {
    try {
      const newData = {
        tahun_penyusunan: forms.value.tahun_penyusunan,
        bab: forms.value.bab,
        tema: forms.value.tema,
        alokasi_waktu: forms.value.alokasi_waktu,
        kompetensi_awal: forms.value.kompetensi_awal,
        profil_pancasila: forms.value.profil_pancasila.join(". ").toString(),
        sarana_prasarana: forms.value.sarana_prasarana,
        model_pembelajaran: forms.value.model_pembelajaran,
        tujuan_bab: forms.value.tujuan_bab,
        deskripsi_cp: forms.value.deskripsi_cp,
        pemahaman: forms.value.pemahaman,
        kegiatan_pembelajaran: forms.value.kegiatan_pembelajaran,
      };
      // console.log("Data baru", newData)

      const response = await axios.post(
        `http://localhost:3000/kurikulum/${idMp}/modul_pembelajaran`,
        newData
      );
      if (response.status === 201) {
        // kosongkan form jika success
        forms.value.tahun_penyusunan = "";
        forms.value.bab = "";
        forms.value.tema = "";
        forms.value.alokasi_waktu = "";
        forms.value.kompetensi_awal = "";
        forms.value.profil_pancasila = "";
        forms.value.sarana_prasarana = "";
        forms.value.model_pembelajaran = "";
        forms.value.tujuan_bab = "";
        forms.value.deskripsi_cp = "";
        forms.value.pemahaman = "";
        forms.value.kegiatan_pembelajaran = "";

        dialog.value = false;
        loadData();
        textSnackbar.value = "Data Berhasil Disimpan";
        snackbar.value = true;
      } else {
        console.log("Error response save data model pembelajaran");
      }
    } catch (error) {
      console.error("Error save data model pembelajaran", error);
    }
  } else {
    // console.log("tdk diekskusi");
    textSnackbar.value = "Data Kosong";
    colorSnackbar.value = "red";
    snackbar.value = true;
  }
};

// ambil id modul pembelajaran
const deleteItem = (id) => {
  deleteId.value = id;
  // console.log(deleteId.value)
  dialogDelete.value = true;
};

// konfirmasi hapus data
const deleteItemConfirm = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/kurikulum/modul_pembelajaran/${deleteId.value}`
    );
    if (response.status === 200) {
      console.log("Data deleted successfully:", response.data);
      loadData(); // Reload data after deletion
      dialogDelete.value = false;
      textSnackbar.value = "Data Berhasil Dihapus";
      snackbar.value = true;
    } else {
      console.error("Error response data:", response.data);
    }
  } catch (error) {
    console.error("Error delete data ", error);
  }
};

// edit data modul pembelajaran
const editItem = async (id) => {
  dialogEdit.value = true;
  // console.log(id)

  try {
    const response = await axios.get(
      `http://localhost:3000/kurikulum/modul_pembelajaran/${id}`
    );
    const data = response.data;
    // console.log(data)
    const extractedData = data.profil_pancasila.split(". ");
    console.log(extractedData);

    formsEdit.value = {
      idModul: data.idModul,
      tahun_penyusunan: data.tahun_penyusunan,
      bab: data.bab,
      tema: data.tema,
      alokasi_waktu: data.alokasi_waktu,
      kompetensi_awal: data.kompetensi_awal,
      profil_pancasila: extractedData,
      sarana_prasarana: data.sarana_prasarana,
      model_pembelajaran: data.model_pembelajaran,
      tujuan_bab: data.tujuan_bab,
      deskripsi_cp: data.deskripsi_cp,
      pemahaman: data.pemahaman,
      kegiatan_pembelajaran: data.kegiatan_pembelajaran,
    };
  } catch (error) {
    console.error("Error get data", error);
  }
};

const updateData = async () => {
  try {
    const updateData = {
      tahun_penyusunan: formsEdit.value.tahun_penyusunan,
      bab: formsEdit.value.bab,
      tema: formsEdit.value.tema,
      alokasi_waktu: formsEdit.value.alokasi_waktu,
      kompetensi_awal: formsEdit.value.kompetensi_awal,
      // profil_pancasila: formsEdit.value.profil_pancasila
      profil_pancasila: formsEdit.value.profil_pancasila.join(". ").toString(),
      sarana_prasarana: formsEdit.value.sarana_prasarana,
      model_pembelajaran: formsEdit.value.model_pembelajaran,
      tujuan_bab: formsEdit.value.tujuan_bab,
      deskripsi_cp: formsEdit.value.deskripsi_cp,
      pemahaman: formsEdit.value.pemahaman,
      kegiatan_pembelajaran: formsEdit.value.kegiatan_pembelajaran,
    };

    const response = await axios.put(
      `http://localhost:3000/kurikulum/modul_pembelajaran/${formsEdit.value.idModul}`,
      updateData
    );
    if (response.status === 200) {
      console.log("Data updated successfully:", response.data);
      loadData(); // Reload data after update
      dialogEdit.value = false;
      textSnackbar.value = "Data Berhasil Diperbarui";
      snackbar.value = true;
    } else {
      console.error("Error response update data:", response.data);
    }
  } catch (error) {
    console.error("Error update data", error);
  }
};

const showItem = async (id) => {
  dialogShow.value = true;
  try {
    const response = await axios.get(
      `http://localhost:3000/kurikulum/modul_pembelajaran/${id}`
    );
    const response2 = await axios.get(`http://localhost:3000/fase/mp/${idMp}`);

    const data2 = response2.data;
    const data = response.data;
    dataShow.value = {
      instansi: "SDN 138 Pekanbaru",
      tahun_penyusunan: data.tahun_penyusunan,
      mata_pelajaran: data2.namaMataPelajaran,
      bab: data.bab,
      tema: data.tema,
      alokasi_waktu: data.alokasi_waktu,
      kompetensi_awal: data.kompetensi_awal,
      profil_pancasila: data.profil_pancasila,
      sarana_prasarana: data.sarana_prasarana,
      model_pembelajaran: data.model_pembelajaran,
      tujuan_bab: data.tujuan_bab,
      deskripsi_cp: data.deskripsi_cp,
      pemahaman: data.pemahaman,
      kegiatan_pembelajaran: data.kegiatan_pembelajaran,
    };
  } catch (error) {
    console.error("Error fetching item data", error);
  }
};

const getMatapelajaran = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/fase/mp/${idMp}`);
    const data = response.data;
    namaMp.value = data.namaMataPelajaran;
    // console.log(namaMp.value)
    return data;
  } catch (error) {
    console.error("Error get data", error);
  }
};

const getProfilPelajar = async () => {
  try {
    const response = await axios.get("http://localhost:3000/profilpelajar");
    const data = response.data;
    dataProfilPelajar.value = data;

    // Mengambil data dimensi dari profil pelajar
    const extractedData = data.map((item) => item.dimensi);
    namaDimensi.value = extractedData;
    // console.log("Profil Pelajar Pancasila : ", namaDimensi.value)
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getProfilPelajar();
  getMatapelajaran();
  getCapaian();
  loadData();
});
</script>
