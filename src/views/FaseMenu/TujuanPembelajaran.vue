<template>
  <v-container fluid>
    <MenuTitle
      msg="Menu | Kurikulum Tujuan Pembelajaran"
      class="text-subtitle-1 font-weight-medium"
    />

    <v-data-table
      :headers="headers"
      :items="tujuan_pembelajaran"
      :items-per-page="5"
      class="elevation-5 mt-4"
    >
      <template v-slot:item="{ item, index }">
        <tr
          v-for="(data_tujuan, tpIndex) in item.tujuan_pembelajaran"
          :key="tpIndex"
        >
          <td v-if="tpIndex === 0" :rowspan="item.tujuan_pembelajaran.length">
            {{ index + 1 }}
          </td>
          <td v-if="tpIndex === 0" :rowspan="item.tujuan_pembelajaran.length">
            {{ item.elemen_capaian }}
          </td>
          <!-- <td>{{ data_tujuan.tujuan }}</td> -->
          <td>
            <span
              class="d-inline-block text-truncate text-left"
              style="max-width: 600px"
            >
              {{ data_tujuan.tujuan_pembelajaran }}
            </span>
          </td>
          <td>
            <v-btn
              density="comfortable"
              icon="mdi mdi-eye-outline"
              color="cyan-accent-4"
              class="mx-2"
              @click="showItem(data_tujuan.idTp)"
            ></v-btn>
            <v-btn
              density="comfortable"
              icon="mdi mdi-pen"
              color="success"
              class="mx-2"
              @click="editItem(data_tujuan.idTp)"
            ></v-btn>
            <v-btn
              density="comfortable"
              icon="mdi mdi-delete"
              color="error"
              class="mx-2"
              @click="deleteItem(data_tujuan.idTp)"
            ></v-btn>
          </td>
        </tr>
      </template>

      <!-- <template v-slot:item="{ item }">
                <tr v-for="(x, index) in item.tujuan_pembelajaran" :key="index">
                    <td v-if="index === 0" :rowspan="item.tujuan_pembelajaran.length">{{ item.elemen_capaian }}</td>
                    <td>{{ x }}</td>
                </tr>
            </template> -->

      <!-- <template v-slot:item.tujuan_pembelajaran="{ item }">
                <span class="d-inline-block text-truncate text-left" style="max-width: 100px;">{{
            item.tujuan_pembelajaran }}
                </span> </template> -->

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Data Tujuan Pembelajaran</v-toolbar-title>
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
                <span class="text-h5">Form Tujuan Pembelajaran</span>
              </v-card-title>

              <v-card-text>
                <v-container class="py-4">
                  <v-form ref="form" v-model="isFormValid">
                    <v-select
                      v-model="forms.elemen_capaian"
                      :items="elemenList"
                      label="Elemen Capaian Pembelajaran"
                      :rules="textRules('Elemen Capaian Pembelajaran')"
                    ></v-select>
                    <v-textarea
                      name="tujuan_pembelajaran"
                      v-model="forms.tujuan_pembelajaran"
                      label="Tujuan Pembelajaran"
                      class="rounded-xl"
                      bg-color="grey-lighten-2"
                      :rules="textRules('Tujuan Pembelajaran')"
                    ></v-textarea>
                    <!-- <v-text-field v-model="forms.tujuan_pembelajaran"
                                            label="Tujuan Pembelajaran"></v-text-field> -->
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
                <span class="text-h5">Edit Data Tujuan Pembelajaran</span>
              </v-card-title>

              <v-card-text>
                <v-container class="py-4">
                  <v-form ref="form">
                    <v-select
                      v-model="formsEdit.elemen_capaian"
                      :items="elemenList"
                      label="Elemen Capaian Pembelajaran"
                    ></v-select>
                    <v-textarea
                      name="tujuan_pembelajaran"
                      v-model="formsEdit.tujuan_pembelajaran"
                      label="Tujuan Pembelajaran"
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

          <!-- modal show -->
          <v-dialog v-model="dialogShow" max-width="900px">
            <v-card class="py-3 px-2">
              <v-card-title>
                <span class="text-h5">Detail Tujuan Pembelajaran</span>
              </v-card-title>

              <v-card-text>
                <v-container class="py-4">
                  <v-row align="start" class="ms-2">
                    <!-- Elemen Capaian Pembelajaran -->
                    <v-col cols="3">
                      <v-sheet> Elemen Capaian Pembelajaran </v-sheet>
                    </v-col>
                    <v-col cols="1">
                      <v-sheet class="pa-1"> : </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        {{ dataShow.elemen_capaian }}
                      </v-sheet>
                    </v-col>

                    <!--  tujuan pembelajaran -->
                    <v-col cols="3">
                      <v-sheet> Tujuan Pembelajaran </v-sheet>
                    </v-col>
                    <v-col cols="1">
                      <v-sheet class="pa-1"> : </v-sheet>
                    </v-col>
                    <v-col cols="8">
                      <v-sheet class="pa-1 text-justify">
                        <div
                          class="text-justify"
                          v-html="formattedText(dataShow.tujuan_pembelajaran)"
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

      <!-- <template v-slot:item.actions="{ item }">
                <v-btn density="comfortable" icon="mdi mdi-eye-outline" color="cyan-accent-4" class="mx-2"
                    @click="showItem(item.idTp)"></v-btn>
                <v-btn density="comfortable" icon="mdi mdi-pen" color="success" class="mx-2"
                    @click="editItem(item.idTp)"></v-btn>
                <v-btn density="comfortable" icon="mdi mdi-delete" color="error" class="mx-2"
                    @click="deleteItem(item.idTp)"></v-btn>
            </template> -->
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
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { formattedText } from "../../helper/index";
import { textRules } from "../../helper/index";

const route = useRoute();
const idMp = route.params.idMp;
const namaMp = ref("");

const tujuan_pembelajaran = ref([]);
const capaian_pembelajaran = ref([]);
const elemenList = ref([]);

const snackbar = ref(false);
const textSnackbar = ref("");
const timeout = ref(2000);
const colorSnackbar = ref("green-lighten-1");

const isFormValid = ref(false);

const forms = ref({
  elemen_capaian: "",
  tujuan_pembelajaran: "",
});

const formsEdit = ref({
  idTp: "",
  elemen_capaian: "",
  tujuan_pembelajaran: "",
});

const dataShow = ref({
  idTp: "",
  elemen_capaian: "",
  tujuan_pembelajaran: "",
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
    title: "Elemen Capaian Pembelajaran",
    align: "center",
    sortable: false,
    key: "elemen_capaian",
  },
  {
    title: "Tujuan Pembelajaran",
    align: "center",
    sortable: false,
    key: "tujuan_pembelajaran",
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

// get data capaian from capaian_pembelajaran
const getCapaian = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/kurikulum/${idMp}/capaian_pembelajaran`
    );
    const data = response.data;
    capaian_pembelajaran.value = data;
    elemenList.value = capaian_pembelajaran.value.map((cp) => cp.elemen);
    // console.log("Data capaian pembelajaran", elemenList.value)
  } catch (error) {
    console.error("Error get data", error);
  }
};

// get data
const loadData = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/kurikulum/${idMp}/tujuan_pembelajaran`
    );
    const data = response.data;
    // tujuan_pembelajaran.value = data
    // console.log("Data tujuan pembelajaran", data)

    const groupedData = data.reduce((acc, item) => {
      // const { elemen_capaian, tujuan_pembelajaran } = item;
      const { elemen_capaian, tujuan_pembelajaran, idTp } = item;
      if (!acc[elemen_capaian]) {
        acc[elemen_capaian] = {
          elemen_capaian: elemen_capaian,
          tujuan_pembelajaran: [],
        };
      }
      // acc[elemen_capaian].tujuan_pembelajaran.push(tujuan_pembelajaran);
      acc[elemen_capaian].tujuan_pembelajaran.push({
        tujuan_pembelajaran: tujuan_pembelajaran,
        idTp: idTp,
      });
      return acc;
    }, {});

    const result = Object.values(groupedData);

    console.log(result);

    tujuan_pembelajaran.value = result;
    // console.log(data)
  } catch (error) {
    console.error("Error get data ", error);
  }
};

// save data
const save = async () => {
  if (isFormValid.value) {
    try {
      const newData = {
        elemen_capaian: forms.value.elemen_capaian,
        tujuan_pembelajaran: forms.value.tujuan_pembelajaran,
      };

      const response = await axios.post(
        `http://localhost:3000/kurikulum/${idMp}/tujuan_pembelajaran`,
        newData
      );
      if (response.status === 201) {
        forms.value.elemen_capaian = "";
        forms.value.tujuan_pembelajaran = "";
        dialog.value = false;
        loadData();
        textSnackbar.value = "Data Berhasil Disimpan";
        snackbar.value = true;
        colorSnackbar.value = "green-lighten-1";
      } else {
        console.log("Response error ", response.data);
      }
    } catch (error) {
      console.error("Error save data ", error);
    }
  } else {
    console.log("tdk diekskusi");
    textSnackbar.value = "Data Kosong";
    colorSnackbar.value = "red";
    snackbar.value = true;
  }
};

// ambil id tujuan
const deleteItem = (id) => {
  deleteId.value = id;
  // console.log(deleteId.value)
  dialogDelete.value = true;
};

// konfirmasi hapus data
const deleteItemConfirm = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/kurikulum/tujuan_pembelajaran/${deleteId.value}`
    );
    if (response.status === 200) {
      console.log("Data deleted successfully:", response.data);
      loadData(); // Reload data after deletion
      dialogDelete.value = false;
      textSnackbar.value = "Data Berhasil Dihapus";
      snackbar.value = true;
      colorSnackbar.value = "green-lighten-1";
    } else {
      console.error("Error response data:", response.data);
    }
  } catch (error) {
    console.error("Error delete data ", error);
  }
};

// ambil data untuk edit
const editItem = async (id) => {
  dialogEdit.value = true;
  // console.log(id)

  try {
    const response = await axios.get(
      `http://localhost:3000/kurikulum/tujuan_pembelajaran/${id}`
    );
    const data = response.data;
    console.log(data);
    formsEdit.value = {
      idTp: data.idTp,
      elemen_capaian: data.elemen_capaian,
      tujuan_pembelajaran: data.tujuan_pembelajaran,
    };
  } catch (error) {
    console.error("Error get data", error);
  }
};

const updateData = async () => {
  try {
    const updateData = {
      elemen_capaian: formsEdit.value.elemen_capaian,
      tujuan_pembelajaran: formsEdit.value.tujuan_pembelajaran,
    };

    const response = await axios.put(
      `http://localhost:3000/kurikulum/tujuan_pembelajaran/${formsEdit.value.idTp}`,
      updateData
    );
    if (response.status === 200) {
      console.log("Data updated successfully:", response.data);
      loadData(); // Reload data after update
      dialogEdit.value = false;
      textSnackbar.value = "Data Berhasil Diperbarui";
      snackbar.value = true;
      colorSnackbar.value = "green-lighten-1";
    } else {
      console.error("Error response data:", response.data);
    }
  } catch (error) {
    console.error("Error update data", error);
  }
};

const downloadPDF = () => {
  const doc = new jsPDF();
  const tahun = new Date().getFullYear();

  let x = 0;
  let textWidth = 0;

  // menghitung lebar halaman dan lebar teks
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // menggambar garis
  const drawFooterLine = () => {
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(1);
    doc.line(10, pageHeight - 12, pageWidth - 10, pageHeight - 12);
  };

  // memberikan footer
  const addFooter = () => {
    const footerText = `SDN 138 Kota Pekanbaru ${tahun}`;
    drawFooterLine();

    doc.setFontSize(10);
    doc.setFont("helvetica", "bolditalic");
    doc.text(footerText, 10, pageHeight - 5);
  };

  // header table
  const headers = [
    ["No", "Elemen Capaian Pembelajaran", "Tujuan Pembelajaran"],
  ];

  // Menambahkan judul besar
  const title = "Tujuan Pembelajaran";
  doc.setFontSize(24);
  textWidth = doc.getTextWidth(title);
  x = (pageWidth - textWidth) / 2;
  doc.text(title, x, 15);

  const mapel = namaMp.value;
  doc.setFontSize(18);
  textWidth = doc.getTextWidth(mapel);
  x = (pageWidth - textWidth) / 2;
  doc.text(mapel, x, 25);

  const sekolah = "Sekolah Dasar Negeri 138 Pekanbaru";
  doc.setFontSize(18);
  textWidth = doc.getTextWidth(sekolah);
  x = (pageWidth - textWidth) / 2;
  doc.text(sekolah, x, 35);

  // Grupkan data berdasarkan elemen capaian
  let groupedData = {};

  tujuan_pembelajaran.value.forEach((item) => {
    if (!groupedData[item.elemen_capaian]) {
      groupedData[item.elemen_capaian] = [];
    }
    item.tujuan_pembelajaran.forEach((tp) => {
      groupedData[item.elemen_capaian].push(tp.tujuan_pembelajaran);
    });
  });

  // Buat data tabel dengan elemen capaian yang digabungkan
  let data = [];
  let index = 1;

  for (const elemenCapaian in groupedData) {
    if (groupedData.hasOwnProperty(elemenCapaian)) {
      const group = groupedData[elemenCapaian];
      let firstRow = true;

      group.forEach((tujuanPembelajaran) => {
        if (firstRow) {
          data.push([index + ". ", elemenCapaian, tujuanPembelajaran]);
          firstRow = false;
          index++;
        } else {
          data.push(["", "", tujuanPembelajaran]);
        }
      });
    }
  }

  // masukkan data tabel kedalam dokumen pdf
  doc.autoTable({
    head: headers,
    body: data,
    startY: 45,
    styles: { fontSize: 14, cellPadding: 2, overflow: "linebreak" },
    headStyles: { fillColor: [22, 160, 133], halign: "center" },
    bodyStyles: { valign: "top" },
    columnStyles: {
      0: { halign: "center" },
      1: { halign: "left", cellWidth: 40 },
      2: { halign: "left", cellWidth: "auto" },
    },
  });

  const totalPages = doc.internal.getNumberOfPages();

  // Tambahkan footer ke setiap halaman
  for (let j = 1; j <= totalPages; j++) {
    doc.setPage(j);
    addFooter();
  }

  // Menyimpan dokumen PDF
  doc.save("Tujuan Pembelajaran.pdf");
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
  // console.log(id)
  try {
    const response = await axios.get(
      `http://localhost:3000/kurikulum/tujuan_pembelajaran/${id}`
    );
    const data = response.data;
    dataShow.value = {
      idTp: data.idTp,
      elemen_capaian: data.elemen_capaian,
      tujuan_pembelajaran: data.tujuan_pembelajaran,
    };
  } catch (error) {
    console.error("Error get data", error);
  }
};

onMounted(() => {
  getMatapelajaran();
  getCapaian();
  loadData();
});
</script>
