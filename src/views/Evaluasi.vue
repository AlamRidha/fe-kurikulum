<template>
  <v-container fluid>
    <MenuTitle
      msg="Menu | Evaluasi"
      class="text-subtitle-1 font-weight-medium"
    />
    <v-data-table
      :headers="headers"
      :items="data_evaluasi"
      :items-per-page="5"
      class="elevation-5 mt-4"
    >
      <template v-slot:item.no="{ index }"> {{ index + 1 }} </template>

      <template v-slot:item.status_evaluasi="{ item }">
        <span
          variant="flat"
          :class="
            item.status_evaluasi === 'Terlaksana'
              ? 'text-caption flat text-green-lighten-5 bg-green pa-2 rounded-pill'
              : 'text-caption flat text-red-lighten-5 bg-red pa-2 rounded-pill'
          "
        >
          {{ item.status_evaluasi }}</span
        >
      </template>

      <template v-slot:item.createdAt="{ item }">
        <p class="text-center my-2 me-2">{{ formattedDate(item.createdAt) }}</p>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Data Evaluasi</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <!-- modal tambah -->
          <v-dialog v-model="dialog" max-width="650px">
            <template v-slot:activator="{ props }">
              <v-btn
                class="mb-2"
                color="primary"
                dark
                v-bind="props"
                prepend-icon="mdi mdi-plus"
                variant="outlined"
                v-if="roleUser === 'kurikulum'"
              >
                Tambah Data
              </v-btn>
            </template>
            <v-card class="py-3 px-2">
              <v-card-title>
                <span class="text-h5">Form Evaluasi</span>
              </v-card-title>

              <v-card-text>
                <v-container class="py-4">
                  <v-form ref="form">
                    <!-- <v-text-field v-model="forms.namaKelas" label="Nama Fase"></v-text-field> -->
                    <!-- <v-text-field v-model="forms.semester" label="Semester"></v-text-field> -->
                    <v-select
                      v-model="forms.namaKelas"
                      :items="itemKelas"
                      label="Nama Kelas"
                    ></v-select>
                    <v-select
                      v-model="forms.semester"
                      :items="itemSemester"
                      label="Semester"
                    ></v-select>
                    <v-select
                      v-model="forms.mata_pelajaran"
                      :items="itemMataPelajaran"
                      label="Nama Mata Pelajaran"
                    ></v-select>

                    <!-- <v-text-field v-model="forms.mata_pelajaran"
                                            label="Nama Mata Pelajaran"></v-text-field> -->
                    <v-text-field
                      v-model="forms.jenis_evaluasi"
                      label="Jenis Evaluasi"
                    ></v-text-field>
                    <!-- <v-text-field v-model="forms.status_evaluasi"
                                            label="Status Evaluasi"></v-text-field> -->
                    <v-select
                      v-model="forms.status_evaluasi"
                      :items="itemStatus"
                      label="Status Evaluasi"
                    ></v-select>
                    <v-textarea
                      v-model="forms.masalah_evaluasi"
                      label="Masalah Evaluasi"
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
                <span class="text-h5">Edit Evaluasi </span>
              </v-card-title>

              <v-card-text>
                <v-container class="py-4">
                  <v-form ref="form">
                    <!-- <v-text-field v-model="formsEdit.namaKelas" label="Nama Fase"></v-text-field>
                                        <v-text-field v-model="formsEdit.semester" label="Semester"></v-text-field> -->
                    <v-select
                      v-model="formsEdit.namaKelas"
                      :items="itemKelas"
                      label="Nama Kelas"
                    ></v-select>
                    <v-select
                      v-model="formsEdit.semester"
                      :items="itemSemester"
                      label="Semester"
                    ></v-select>
                    <!-- <v-text-field v-model="formsEdit.mata_pelajaran"
                                            label="Nama Mata Pelajaran"></v-text-field> -->
                    <v-select
                      v-model="formsEdit.mata_pelajaran"
                      :items="itemMataPelajaran"
                      label="Nama Mata Pelajaran"
                    ></v-select>
                    <v-text-field
                      v-model="formsEdit.jenis_evaluasi"
                      label="Jenis Evaluasi"
                    ></v-text-field>
                    <!-- <v-text-field v-model="formsEdit.status_evaluasi"
                                            label="Status Evaluasi"></v-text-field> -->
                    <v-select
                      v-model="formsEdit.status_evaluasi"
                      :items="itemStatus"
                      label="Status Evaluasi"
                    ></v-select>
                    <v-textarea
                      v-model="formsEdit.masalah_evaluasi"
                      label="Masalah Evaluasi"
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

          <v-dialog v-model="dialogShow" max-width="900px">
            <v-card class="py-3 px-2">
              <v-card-title>
                <span class="text-h5">Detail Evaluasi Pembelajaran</span>
              </v-card-title>

              <v-card-text>
                <v-container class="py-4">
                  <v-row align="start" class="ms-2">
                    <!-- Nama Kelas -->
                    <v-col cols="3">
                      <v-sheet> Nama Kelas </v-sheet>
                    </v-col>
                    <v-col cols="1">
                      <v-sheet class="pa-1"> : </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.namaKelas }}
                      </v-sheet>
                    </v-col>

                    <!--  Semester -->
                    <v-col cols="3">
                      <v-sheet> Semester </v-sheet>
                    </v-col>
                    <v-col cols="1">
                      <v-sheet class="pa-1"> : </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.semester }}
                      </v-sheet>
                    </v-col>

                    <!-- Mata Pelajaran -->
                    <v-col cols="3">
                      <v-sheet> Mata Pelajaran </v-sheet>
                    </v-col>
                    <v-col cols="1">
                      <v-sheet class="pa-1"> : </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.mata_pelajaran }}
                      </v-sheet>
                    </v-col>

                    <!-- Jenis Evaluasi -->
                    <v-col cols="3">
                      <v-sheet> Jenis Evaluasi </v-sheet>
                    </v-col>
                    <v-col cols="1">
                      <v-sheet class="pa-1"> : </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.jenis_evaluasi }}
                      </v-sheet>
                    </v-col>

                    <!-- Masalah Evaluasi -->
                    <v-col cols="3">
                      <v-sheet> Masalah Evaluasi </v-sheet>
                    </v-col>
                    <v-col cols="1">
                      <v-sheet class="pa-1"> : </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        <div
                          class="text-justify"
                          v-html="formattedText(dataShow.masalah_evaluasi)"
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
                >
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
          @click="showItem(item.idEval)"
        ></v-btn>
        <v-btn
          density="comfortable"
          icon="mdi mdi-pen"
          color="success"
          class="mx-2"
          v-if="roleUser === 'kurikulum' || roleUser === 'admin'"
          @click="editItem(item.idEval)"
        ></v-btn>
        <v-btn
          density="comfortable"
          icon="mdi mdi-delete"
          color="error"
          class="mx-2"
          @click="deleteItem(item.idEval)"
          v-if="roleUser === 'kurikulum' || roleUser === 'admin'"
        ></v-btn>
      </template>
    </v-data-table>
    <!-- snackbar -->
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="blue-grey"
      rounded="pill"
      width="200"
    >
      <p class="text-center">{{ textSnackbar }}</p>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import MenuTitle from "../components/MenuTitle.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { formattedDate, formattedText } from "../helper/index";
import { useAuthStore } from "../stores/useAuthStore";

const userStore = useAuthStore();
const roleUser = userStore.user.bidangMataPelajaran.toLowerCase();

const data_evaluasi = ref([]);
const deleteId = ref("");

const snackbar = ref(false);
const textSnackbar = ref("");
const timeout = ref(2000);

// dialog
const dialogDelete = ref(false);
const dialog = ref(false);
const dialogEdit = ref(false);
const dialogShow = ref(false);

const itemKelas = ref([
  "Kelas 1",
  "Kelas 2",
  "Kelas 3",
  "Kelas 4",
  "Kelas 5",
  "Kelas 6",
]);
const itemSemester = ref(["Semester 1", "Semester 2"]);
const itemStatus = ref(["Belum Terlaksana", "Terlaksana"]);
const itemMataPelajaran = ref([]);

const forms = ref({
  namaKelas: "",
  semester: "",
  mata_pelajaran: "",
  jenis_evaluasi: "",
  masalah_evaluasi: "",
  status_evaluasi: "",
});

const formsEdit = ref({
  idEval: "",
  namaKelas: "",
  semester: "",
  mata_pelajaran: "",
  jenis_evaluasi: "",
  masalah_evaluasi: "",
  status_evaluasi: "",
});

const dataShow = ref({
  idEval: "",
  namaKelas: "",
  semester: "",
  mata_pelajaran: "",
  jenis_evaluasi: "",
  masalah_evaluasi: "",
  status_evaluasi: "",
});

// judul tabel
const headers = ref([
  {
    title: "No",
    align: "center",
    sortable: false,
    key: "no",
    value: "id",
  },
  {
    title: "Nama Kelas",
    align: "center",
    sortable: false,
    key: "namaKelas",
  },
  {
    title: "Semester",
    align: "center",
    sortable: false,
    key: "semester",
  },
  {
    title: "Mata Pelajaran",
    align: "center",
    sortable: false,
    key: "mata_pelajaran",
  },
  {
    title: "Jenis Evaluasi",
    align: "center",
    sortable: false,
    key: "jenis_evaluasi",
  },
  {
    title: "Status",
    align: "center",
    sortable: false,
    key: "status_evaluasi",
  },
  {
    title: "Tanggal Pembuatan",
    align: "center",
    sortable: true,
    key: "createdAt",
  },
  {
    title: "Aksi",
    align: "center",
    key: "actions",
    sortable: false,
  },
]);

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

// get data
const loadData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/evaluasi");
    const data = response.data;
    data_evaluasi.value = data;
    console.log("Data evaluasi : ", data);
  } catch (error) {
    console.error("Error response data ", error);
  }
};
// save data
const save = async () => {
  try {
    const newData = {
      namaKelas: forms.value.namaKelas,
      semester: forms.value.semester,
      mata_pelajaran: forms.value.mata_pelajaran,
      jenis_evaluasi: forms.value.jenis_evaluasi,
      masalah_evaluasi: forms.value.masalah_evaluasi,
      status_evaluasi: forms.value.status_evaluasi,
    };

    const response = await axios.post(
      "http://localhost:3000/evaluasi",
      newData
    );
    if (response.status === 201) {
      forms.value.namaKelas = "";
      forms.value.semester = "";
      forms.value.mata_pelajaran = "";
      forms.value.jenis_evaluasi = "";
      forms.value.masalah_evaluasi = "";
      forms.value.status_evaluasi = "";

      dialog.value = false;
      loadData();
      textSnackbar.value = "Data Berhasil Disimpan";
      snackbar.value = true;
    } else {
      console.error("Error saving data ", response.data);
    }
  } catch (error) {
    console.error("Error response data ", error);
  }
};

// ambil id capaian
const deleteItem = (id) => {
  deleteId.value = id;
  // console.log(deleteId.value)
  dialogDelete.value = true;
};

// hapus data
const deleteItemConfirm = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/evaluasi/${deleteId.value}`
    );
    if (response.status === 200) {
      dialogDelete.value = false;
      loadData();
      textSnackbar.value = "Data Berhasil Dihapus";
      snackbar.value = true;
    } else {
      console.error("Error delete data ", response.data);
    }
  } catch (error) {
    console.error("Error response data ", error);
  }
};

// get id to data edit
const editItem = async (id) => {
  dialogEdit.value = true;
  try {
    const response = await axios.get(`http://localhost:3000/evaluasi/${id}`);
    const data = response.data;
    formsEdit.value = {
      idEval: data.idEval,
      namaKelas: data.namaKelas,
      semester: data.semester,
      mata_pelajaran: data.mata_pelajaran,
      jenis_evaluasi: data.jenis_evaluasi,
      masalah_evaluasi: data.masalah_evaluasi,
      status_evaluasi: data.status_evaluasi,
    };
  } catch (error) {
    console.error("Error response data ", error);
  }
};

const updateData = async () => {
  try {
    const updateData = {
      namaKelas: formsEdit.value.namaKelas,
      semester: formsEdit.value.semester,
      mata_pelajaran: formsEdit.value.mata_pelajaran,
      jenis_evaluasi: formsEdit.value.jenis_evaluasi,
      masalah_evaluasi: formsEdit.value.masalah_evaluasi,
      status_evaluasi: formsEdit.value.status_evaluasi,
    };

    const response = await axios.put(
      `http://localhost:3000/evaluasi/${formsEdit.value.idEval}`,
      updateData
    );
    if (response.status === 200) {
      console.log("Data berhasil diupdate");
      loadData();
      dialogEdit.value = false;
      textSnackbar.value = "Data Berhasil Diperbarui";
      snackbar.value = true;
    } else {
      console.error("Error update data ", response.data);
    }
  } catch (error) {
    console.error("Error response data ", error);
  }
};

const showItem = async (id) => {
  dialogShow.value = true;
  try {
    const response = await axios.get(`http://localhost:3000/evaluasi/${id}`);
    const data = response.data;
    dataShow.value = {
      idEval: data.idEval,
      namaKelas: data.namaKelas,
      semester: data.semester,
      mata_pelajaran: data.mata_pelajaran,
      jenis_evaluasi: data.jenis_evaluasi,
      masalah_evaluasi: data.masalah_evaluasi,
      status_evaluasi: data.status_evaluasi,
    };
  } catch (error) {
    console.error("Error get data", error);
  }
};

const getMataPelajaran = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/fase/semester/6/mp"
    );
    const data = response.data;
    const dataMp = data.map((item) => item.namaMataPelajaran);
    itemMataPelajaran.value = dataMp;

    // console.log("Data mata pelajaran : ", dataMp)
  } catch (error) {
    console.error("Error response data ", error);
  }
};

onMounted(() => {
  console.log(roleUser);
  loadData();
  getMataPelajaran();
});
</script>
