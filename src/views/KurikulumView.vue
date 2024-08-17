<template>
  <v-container fluid>
    <MenuTitle
      msg="Menu | Kurikulum"
      class="text-subtitle-1 font-weight-medium"
    />

    <v-data-table
      :headers="headers"
      :items="dataKurikulum"
      :items-per-page="5"
      class="elevation-5 mt-4"
    >
      <template v-slot:item.no="{ index }"> {{ index + 1 }} </template>

      <!-- <template v-slot:item.linkKurikulum="{ item }">
        <v-btn
          prepend-icon="mdi mdi-file-document-arrow-right"
          @click="viewPdf(item.linkKurikulum)"
          density="comfortable"
          variant="outlined"
          color="green"
        >
          <template v-slot:prepend>
            <v-icon color="red"></v-icon>
          </template>

          Baca
        </v-btn>
      </template> -->
      <template v-slot:item.linkKurikulum="{ item }">
        <v-btn
          @click="viewPdf(item.linkKurikulum)"
          density="comfortable"
          variant="outlined"
          color="green"
        >
          <img :src="iconSvg" width="17px" class="me-2" />
          Baca
        </v-btn>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Data Kurikulum</v-toolbar-title>
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
                <span class="text-h5">Form Kurikulum</span>
              </v-card-title>

              <v-card-text>
                <v-container class="py-4">
                  <v-form ref="form">
                    <v-text-field
                      v-model="forms.namaKurikulum"
                      label="Nama Kurikulum"
                    ></v-text-field>
                    <v-text-field
                      v-model="forms.tahun"
                      label="Tahun"
                    ></v-text-field>
                    <v-file-input
                      v-model="forms.linkKurikulum"
                      label="File Kurikulum"
                      chips
                      show-size
                    ></v-file-input>
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

          <!-- modal view pdf -->
          <v-dialog v-model="dialogPdf" max-width="85%">
            <v-card class="pa-5 rounded-lg">
              <!-- <v-card-title class="text-h5 text-center"
                >File Kurikulum</v-card-title
              > -->
              <v-card-text>
                <embed
                  :src="pdfUrl"
                  type="application/pdf"
                  width="100%"
                  height="600px"
                />
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  variant="elevated"
                  @click="closePdf"
                  elevation="4"
                  >Tutup</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.aksi="{ item }">
        <!-- <v-btn
          density="comfortable"
          icon="mdi mdi-eye"
          color="primary"
          class="mx-2"
          @click="viewPdf(item.linkKurikulum)"
        ></v-btn> -->
        <v-btn
          density="comfortable"
          icon="mdi mdi-delete"
          color="error"
          class="mx-2"
          @click="deleteItem(item.idKurikulum)"
        >
        </v-btn>
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
import iconSvg from "../assets/pdfsvg.svg";

const dataKurikulum = ref([]);
const snackbar = ref(false);
const textSnackbar = ref("");
const timeout = ref(2000);
const colorSnackbar = ref("green-lighten-1");
const dialogPdf = ref(false);
const pdfUrl = ref("");

const forms = ref({
  namaKurikulum: "",
  tahun: "",
  linkKurikulum: null,
});

const deleteId = ref("");
// dialog
const dialogDelete = ref(false);
const dialog = ref(false);

function close() {
  dialog.value = false;
}

function closeDelete() {
  dialogDelete.value = false;
}

function closePdf() {
  dialogPdf.value = false;
}

function viewPdf(link) {
  pdfUrl.value = `http://localhost:3000/uploads/${link}`;
  dialogPdf.value = true;
}

const headers = ref([
  {
    title: "No",
    align: "start",
    sortable: false,
    key: "no",
    value: "id",
  },
  {
    title: "Nama",
    align: "start",
    sortable: false,
    key: "namaKurikulum",
  },
  {
    title: "Tahun",
    sortable: false,
    key: "tahun",
  },
  {
    title: "File Kurikulum",
    sortable: false,
    align: "center",
    key: "linkKurikulum",
  },
  {
    title: "Aksi",
    align: "center",
    key: "aksi",
    sortable: false,
  },
]);

const loadData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/dokkur");
    const data = response.data;
    dataKurikulum.value = data;
    // console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const save = async () => {
  console.log(forms.value.linkKurikulum);

  try {
    const formData = new FormData();
    formData.append("namaKurikulum", forms.value.namaKurikulum);
    formData.append("tahun", forms.value.tahun);
    formData.append("linkKurikulum", forms.value.linkKurikulum[0]);

    const response = await axios.post(
      "http://localhost:3000/dokkur",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);
    if (response.status === 201) {
      forms.value.namaKurikulum = "";
      forms.value.tahun = "";
      forms.value.linkKurikulum = null;
      loadData();
      dialog.value = false;
      snackbar.value = true;
      textSnackbar.value = "Data berhasil disimpan";
    } else {
      snackbar.value = true;
      textSnackbar.value = "Data gagal disimpan";
    }
  } catch (error) {
    console.error("Error menyimpan data ", error);
  }
};

// mengambil data id untuk dihapus
const deleteItem = (id) => {
  deleteId.value = id;
  dialogDelete.value = true;
};

// fungsi untuk confirm hapus data
const deleteItemConfirm = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/dokkur/${deleteId.value}`
    );
    if (response.status === 200) {
      // console.log("Data deleted successfully:", response.data);
      loadData(); // Reload data after deletion
      dialogDelete.value = false;
      textSnackbar.value = "Data Berhasil Dihapus";
      snackbar.value = true;
      colorSnackbar.value = "green-lighten-1";
    } else {
      console.error("Error deleting data:", response.data);
    }
  } catch (error) {
    console.log("Error delete Data", error);
  }
};

onMounted(() => {
  loadData();
});
</script>
