<template>
  <v-container fluid>
    <MenuTitle
      msg="Menu | Profil Pelajar Pancasila"
      class="text-subtitle-1 font-weight-medium"
    />

    <v-data-table
      :headers="headers"
      :items="dataProfilPelajar"
      :items-per-page="6"
      class="elevation-5 mt-4"
    >
      <template v-slot:item.no="{ index }"> {{ index + 1 }} </template>

      <template v-slot:item.elemen="{ item }">
        <!-- <span class="d-inline-block text-truncate" style="max-width: 750px;">{{ item.elemen }}</span> -->
        <v-btn
          @click="showDetails(item)"
          prepend-icon="mdi mdi-eye-outline"
          variant="tonal"
          color="primary"
          class="text-none"
          >Lihat Data</v-btn
        >
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Data Profil Pelajar Pancasila</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <!-- modal tambah -->
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ props }">
              <v-btn
                class="mb-2"
                variant="outlined"
                color="primary"
                dark
                v-bind="props"
                prepend-icon="mdi mdi-plus"
              >
                Tambah Data
              </v-btn>
            </template>
            <v-card class="py-3 px-2">
              <v-card-title>
                <span class="text-h5">Form Profil Pelajar Pancasila</span>
              </v-card-title>

              <v-card-text>
                <v-container class="py-4">
                  <v-form ref="form">
                    <v-text-field
                      v-model="forms.dimensi"
                      label="Elemen"
                    ></v-text-field>
                    <textarea
                      cols="56"
                      rows="10"
                      class="border-sm elevation-2 pa-2"
                      v-model="forms.elemen"
                      label="Dimensi"
                      placeholder="Dimensi"
                    ></textarea>
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
          <v-dialog v-model="dialogEdit" max-width="600px">
            <v-card class="py-3 px-2">
              <v-card-title>
                <span class="text-h5">Edit Profil Pelajar Pancasila</span>
              </v-card-title>

              <v-card-text>
                <v-container class="py-4">
                  <v-form ref="form">
                    <v-text-field
                      v-model="formsEdit.dimensi"
                      label="Dimensi"
                    ></v-text-field>
                    <textarea
                      cols="56"
                      rows="10"
                      v-model="formsEdit.elemen"
                      class="border-sm elevation-2 pa-2"
                      label="Elemen"
                      placeholder="Dimensi"
                    ></textarea>
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
                >Apakah Anda Yakin <br />
                Ingin Menghapus Data Ini?</v-card-title
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

          <!-- modal show details -->
          <v-dialog v-model="dialogShow" max-width="600px">
            <v-card class="py-3 px-2">
              <v-card-title>
                <span class="text-h5">Detail Profil Pelajar Pancasila</span>
              </v-card-title>

              <v-card-text>
                <v-container class="py-4">
                  <v-row align="start" class="ms-2">
                    <v-col cols="3">
                      <v-sheet class="pa-1"> Dimensi </v-sheet>
                    </v-col>
                    <v-col cols="1">
                      <v-sheet class="pa-1"> : </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ detailItem.dimensi }}
                      </v-sheet>
                    </v-col>

                    <v-col cols="3">
                      <v-sheet class="pa-1"> Elemen </v-sheet>
                    </v-col>
                    <v-col cols="1">
                      <v-sheet class="pa-1"> : </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        <div
                          class="text-justify"
                          v-html="formattedText(detailItem.elemen)"
                        ></div>
                      </v-sheet>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
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

      <template v-slot:item.aksi="{ item }">
        <v-btn
          density="comfortable"
          icon="mdi mdi-pen"
          color="success"
          class="mx-2"
          @click="editItem(item.idProfil)"
        ></v-btn>
        <v-btn
          density="comfortable"
          icon="mdi mdi-delete"
          color="error"
          class="mx-2"
          @click="deleteItem(item.idProfil)"
        ></v-btn>
      </template>
    </v-data-table>
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
import MenuTitle from "../components/MenuTitle.vue";
import axios from "axios";
import { ref, onMounted } from "vue";
// panggil helper function
import { formattedText } from "../helper/index";

const dataProfilPelajar = ref([]);
const snackbar = ref(false);
const textSnackbar = ref("");
const timeout = ref(2000);
const colorSnackbar = ref("green-lighten-1");

const forms = ref({
  dimensi: "",
  elemen: "",
});

const formsEdit = ref({
  idProfil: "",
  dimensi: "",
  elemen: "",
});

const detailItem = ref({
  dimensi: "",
  elemen: "",
});

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

// judul tabel
const headers = ref([
  {
    title: "No",
    align: "start",
    sortable: false,
    key: "no",
    value: "id",
  },
  {
    title: "Dimensi",
    align: "start",
    sortable: false,
    key: "dimensi",
  },
  {
    title: "Elemen",
    key: "elemen",
    sortable: false,
  },
  {
    title: "Aksi",
    align: "center",
    key: "aksi",
    sortable: false,
  },
]);

// function formattedText(text) {
//     return text.replace(/\n/g, "<br>");
// }

// get all data
const loadData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/profilpelajar");
    const data = response.data;
    dataProfilPelajar.value = data;
    // console.log(response.data)
  } catch (error) {
    console.error(error);
  }
};

// simpan data
const save = async () => {
  try {
    const newData = {
      dimensi: forms.value.dimensi,
      elemen: forms.value.elemen,
    };

    const response = await axios.post(
      "http://localhost:3000/profilpelajar",
      newData
    );
    if (response.status === 200) {
      forms.value.dimensi = "";
      forms.value.elemen = "";

      dialog.value = false;
      loadData();
      textSnackbar.value = "Data Berhasil Disimpan";
      snackbar.value = true;
      colorSnackbar.value = "green-lighten-1";
    } else {
      console.log("Error response save data", response.data);
    }
  } catch (error) {
    console.error("Error save data", error);
  }
};

// mengambil id data yang akan di edit
const editItem = async (id) => {
  dialogEdit.value = true;

  try {
    const response = await axios.get(
      `http://localhost:3000/profilpelajar/${id}`
    );
    const data = response.data;
    formsEdit.value.idProfil = data.idProfil;
    formsEdit.value.dimensi = data.dimensi;
    formsEdit.value.elemen = data.elemen;
  } catch (error) {
    console.error("Error edit data", error);
  }
};

const updateData = async () => {
  try {
    const updateData = {
      dimensi: formsEdit.value.dimensi,
      elemen: formsEdit.value.elemen,
    };

    const response = await axios.put(
      `http://localhost:3000/profilpelajar/${formsEdit.value.idProfil}`,
      updateData
    );
    if (response.status === 200) {
      dialogEdit.value = false;
      loadData();
      textSnackbar.value = "Data Berhasil Diperbarui";
      snackbar.value = true;
      colorSnackbar.value = "green-lighten-1";
    } else {
      console.log("Error response update data", response.data);
    }
  } catch (error) {
    console.error("Error update data", error);
  }
};

// mengambil data id untuk dihapus
const deleteItem = (id) => {
  deleteId.value = id;
  // console.log(deleteId.value)
  dialogDelete.value = true;
};

const deleteItemConfirm = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/profilpelajar/${deleteId.value}`
    );
    if (response.status === 200) {
      dialogDelete.value = false;
      loadData();
      textSnackbar.value = "Data Berhasil Dihapus";
      snackbar.value = true;
      colorSnackbar.value = "green-lighten-1";
    } else {
      console.log("Error response delete data", response.data);
    }
  } catch (error) {
    console.error("Error delete data", error);
  }
};

// show details
const showDetails = (item) => {
  detailItem.value.dimensi = item.dimensi;
  detailItem.value.elemen = item.elemen;
  dialogShow.value = true;
};

onMounted(() => loadData());
</script>
