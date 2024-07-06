<template>
  <v-container fluid>
    <MenuTitle
      msg="Menu | Kurikulum Capaian Pembelajaran"
      class="text-subtitle-1 font-weight-medium"
    />

    <v-data-table
      :headers="headers"
      :items="capaian_pembelajaran"
      :items-per-page="5"
      class="elevation-5 mt-4"
    >
      <template v-slot:item.no="{ index }"> {{ index + 1 }} </template>

      <template v-slot:item.capaian_pembelajaran="{ item }">
        <p
          class="text-justify my-2 me-2 d-inline-block text-truncate"
          style="max-width: 650px"
        >
          {{ item.capaian_pembelajaran }}
        </p>
      </template>

      <template v-slot:item.elemen="{ item }">
        <p class="text-justify my-2 me-2" style="max-width: 750px">
          {{ item.elemen }}
        </p>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Data Capaian Pembelajaran</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <!-- Tombol Download PDF -->
          <v-btn
            class="mb-2 bg-green me-2"
            color="white"
            dark
            @click="downloadPDF"
            prepend-icon="mdi mdi-file"
          >
            Download PDF
          </v-btn>

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
              >
                Tambah Data
              </v-btn>
            </template>
            <v-card class="py-3 px-2">
              <v-card-title>
                <span class="text-h5">Form Capaian Pembelajaran</span>
              </v-card-title>

              <v-card-text>
                <v-container class="py-4">
                  <v-form ref="form" v-model="isFormValid">
                    <v-text-field
                      v-model="forms.elemen"
                      label="Elemen"
                      :rules="textRules('Elemen')"
                      class="mb-3"
                    ></v-text-field>
                    <v-textarea
                      v-model="forms.capaian_pembelajaran"
                      class="rounded-xl"
                      bg-color="grey-lighten-2"
                      label="Capaian Pembelajaran"
                      :rules="textRules('Capaian Pembelajaran')"
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
                <span class="text-h5">Edit Data Capaian Pembelajaran</span>
              </v-card-title>

              <v-card-text>
                <v-container class="py-4">
                  <v-form ref="form">
                    <v-text-field
                      v-model="formsEdit.elemen"
                      label="Elemen"
                    ></v-text-field>
                    <v-textarea
                      v-model="formsEdit.capaian_pembelajaran"
                      cols="65"
                      rows="10"
                      class="rounded-xl"
                      bg-color="grey-lighten-2"
                      label="Capaian Pembelajaran"
                    ></v-textarea>
                    <!-- <v-text-field v-model="formsEdit.capaian_pembelajaran"
                                            label="Capaian Pembelajaran" :style="{ height: '500px' }"></v-text-field> -->
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
          <v-dialog v-model="dialogShow" max-width="800px">
            <v-card class="py-3 px-2">
              <v-card-title>
                <span class="text-h5">Detail Data Capaian Pembelajaran</span>
              </v-card-title>

              <v-card-text>
                <v-container class="py-4">
                  <v-container class="py-4">
                    <v-row align="start" class="ms-2">
                      <!-- Elemen -->
                      <v-col cols="3">
                        <v-sheet> Elemen </v-sheet>
                      </v-col>
                      <v-col cols="1">
                        <v-sheet class="pa-1"> : </v-sheet>
                      </v-col>
                      <v-col cols="8">
                        <v-sheet class="pa-1 text-justify">
                          {{ dataShow.elemen }}
                        </v-sheet>
                      </v-col>

                      <!-- Capaian Pembelajaran -->
                      <v-col cols="3">
                        <v-sheet> Capaian Pembelajaran </v-sheet>
                      </v-col>
                      <v-col cols="1">
                        <v-sheet class="pa-1"> : </v-sheet>
                      </v-col>
                      <v-col cols="8">
                        <v-sheet class="pa-1 text-justify">
                          <div
                            class="text-justify"
                            v-html="
                              formattedText(dataShow.capaian_pembelajaran)
                            "
                          ></div>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="error"
                  prepend-icon="mdi mdi-minus-circle-outline"
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
          @click="showItem(item.idCp)"
        ></v-btn>
        <v-btn
          density="comfortable"
          icon="mdi mdi-pen"
          color="success"
          class="mx-2"
          @click="editItem(item.idCp)"
        ></v-btn>
        <v-btn
          density="comfortable"
          icon="mdi mdi-delete"
          color="error"
          class="mx-2"
          @click="deleteItem(item.idCp)"
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
import MenuTitle from "../../components/MenuTitle.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { formattedText } from "../../helper/index";
import { textRules } from "../../helper/index";

const route = useRoute();
const idMp = route.params.idMp;
const namaMp = ref("");

const capaian_pembelajaran = ref([]);
const isFormValid = ref(false);

const snackbar = ref(false);
const textSnackbar = ref("");
const timeout = ref(2000);

const forms = ref({
  elemen: "",
  capaian_pembelajaran: "",
});

const formsEdit = ref({
  idCp: "",
  elemen: "",
  capaian_pembelajaran: "",
});

const dataShow = ref({
  elemen: "",
  capaian_pembelajaran: "",
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
    title: "Elemen",
    align: "center",
    sortable: false,
    key: "elemen",
  },
  {
    title: "Capaian Pembelajaran",
    align: "center",
    sortable: false,
    key: "capaian_pembelajaran",
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

// get data
const loadData = async () => {
  // console.log(idMp)
  try {
    const response = await axios.get(
      `http://localhost:3000/kurikulum/${idMp}/capaian_pembelajaran`
    );
    const data = response.data;
    capaian_pembelajaran.value = data;
    console.log(capaian_pembelajaran);
  } catch (error) {
    console.error("Error get data", error);
  }
};

// simpan data
const save = async () => {
  if (isFormValid.value) {
    console.log(" diekskusi");
    try {
      const newData = {
        elemen: forms.value.elemen,
        capaian_pembelajaran: forms.value.capaian_pembelajaran,
      };

      const response = await axios.post(
        `http://localhost:3000/kurikulum/${idMp}/capaian_pembelajaran`,
        newData
      );

      if (response.status === 201) {
        forms.value.elemen = "";
        forms.value.capaian_pembelajaran = "";
        dialog.value = false;
        loadData();
        textSnackbar.value = "Data Berhasil Disimpan";
        snackbar.value = true;
      } else {
        console.error("Error respone data ", response.data);
      }
    } catch (error) {
      console.error("Error save data", error);
    }
  } else {
    console.log("tdk diekskusi");
  }
};

// ambil id capaian
const deleteItem = (id) => {
  deleteId.value = id;
  // console.log(deleteId.value)
  dialogDelete.value = true;
};

// konfirmasi hapus data
const deleteItemConfirm = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/kurikulum/capaian_pembelajaran/${deleteId.value}`
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

const editItem = async (id) => {
  dialogEdit.value = true;
  // console.log(id)

  try {
    const response = await axios.get(
      `http://localhost:3000/kurikulum/capaian_pembelajaran/${id}`
    );
    const data = response.data;
    // console.log(data)
    formsEdit.value = {
      idCp: data.idCp,
      elemen: data.elemen,
      capaian_pembelajaran: data.capaian_pembelajaran,
    };
  } catch (error) {
    console.error("Error get data", error);
  }
};

const updateData = async () => {
  try {
    const updateData = {
      elemen: formsEdit.value.elemen,
      capaian_pembelajaran: formsEdit.value.capaian_pembelajaran,
    };

    const response = await axios.put(
      `http://localhost:3000/kurikulum/capaian_pembelajaran/${formsEdit.value.idCp}`,
      updateData
    );
    if (response.status === 200) {
      console.log("Data updated successfully:", response.data);
      loadData(); // Reload data after update
      dialogEdit.value = false;
      textSnackbar.value = "Data Berhasil Diperbarui";
      snackbar.value = true;
    } else {
      console.error("Error response data:", response.data);
    }
  } catch (error) {
    console.error("Error update data", error);
  }
};

const downloadPDF = () => {
  const doc = new jsPDF();

  // header table
  const headers = [["No", "Elemen", "Capaian Pembelajaran"]];

  // Menambahkan judul besar
  const title = "Capaian Pembelajaran";
  doc.setFontSize(18);
  doc.text(title, 78, 15);

  const mapel = namaMp.value;
  doc.setFontSize(18);
  doc.text(mapel, 83, 25);

  const sekolah = "Sekolah Dasar Negeri 138 Pekanbaru";
  doc.setFontSize(18);
  doc.text(sekolah, 60, 35);

  // data tabel
  const data = capaian_pembelajaran.value.map((item, index) => [
    index + 1,
    item.elemen,
    item.capaian_pembelajaran,
  ]);

  // masukkan data tabel kedalam dokumen pdf
  doc.autoTable({
    head: headers,
    body: data,
    startY: 45,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [22, 160, 133], halign: "center" },
  });

  // Menyimpan dokumen PDF
  doc.save("capaian_pembelajaran.pdf");
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

const showItem = async (id) => {
  dialogShow.value = true;
  try {
    const response = await axios.get(
      `http://localhost:3000/kurikulum/capaian_pembelajaran/${id}`
    );
    const data = response.data;
    dataShow.value = {
      elemen: data.elemen,
      capaian_pembelajaran: data.capaian_pembelajaran,
    };
  } catch (error) {
    console.error("Error get data", error);
  }
};

onMounted(() => {
  getMatapelajaran();
  loadData();
});
</script>
