<template>
    <v-container fluid>
        <MenuTitle msg="Menu | Kurikulum Alur Tujuan Pembelajaran" class="text-subtitle-1 font-weight-medium " />

        <v-data-table :headers="headers" :items="alur_tujuan_pembelajaran" :items-per-page="5" class="elevation-5 mt-4">
            <template v-slot:item.no="{ index }">
                {{ index + 1 }} </template>
            <template v-slot:item.alur_tujuan_pembelajaran="{ item }">
                <span class="d-inline-block text-truncate text-left" style="max-width: 600px;">{{
            item.alur_tujuan_pembelajaran }}
                </span> </template>

            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Data Alur Tujuan Pembelajaran</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <!-- Tombol Download PDF -->
                    <v-btn class="mb-2 bg-green me-2" color="white" dark @click="downloadPDF"
                        prepend-icon="mdi mdi-file">
                        Download PDF
                    </v-btn>

                    <!-- modal tambah -->
                    <v-dialog v-model="dialog" max-width="650px">
                        <template v-slot:activator="{ props }">
                            <v-btn class="mb-2" color="primary" variant="outlined" dark v-bind="props"
                                prepend-icon="mdi mdi-plus">
                                Tambah Data
                            </v-btn>
                        </template>
                        <v-card class="py-3 px-2">
                            <v-card-title>
                                <span class="text-h5">Form Alur Tujuan Pembelajaran</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container class="py-4">
                                    <v-form ref="form">
                                        <v-text-field v-model="forms.tahap" label="Tahap"></v-text-field>
                                        <!-- <v-textarea v-model="forms.alur_tujuan_pembelajaran" class="rounded-xl"
                                            bg-color="grey-lighten-2" label="Alur Tujuan Pembelajaran"></v-textarea> -->
                                        <v-combobox v-model="forms.alur_tujuan_pembelajaran" :items="deskripsti_tp"
                                            label="Alur Tujuan Pembelajaran" multiple chips class="pe-4"></v-combobox>
                                    </v-form>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="error" variant="text" @click="close" elevation="4">
                                    Batal
                                </v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="save" elevation="4">
                                    Simpan
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <!-- modal edit -->
                    <v-dialog v-model="dialogEdit" max-width="650px">
                        <v-card class="py-3 px-2">
                            <v-card-title>
                                <span class="text-h5">Edit Data Alur Tujuan Pembelajaran</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container class="py-4">
                                    <v-form ref="form">
                                        <v-text-field v-model="formsEdit.tahap" label="Tahap"></v-text-field>
                                        <!-- <v-textarea v-model="formsEdit.alur_tujuan_pembelajaran" class="rounded-xl"
                                            bg-color="grey-lighten-2" label="Alur Tujuan Pembelajaran"></v-textarea> -->
                                        <v-combobox v-model="formsEdit.alur_tujuan_pembelajaran" :items="deskripsti_tp"
                                            label="Alur Tujuan Pembelajaran" multiple chips class="pe-4"></v-combobox>
                                    </v-form>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="error" variant="text" @click="closeEdit" elevation="4">
                                    Batal
                                </v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="updateData" elevation="4">
                                    Simpan Data
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <!-- modal hapus -->
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card class="pa-5 rounded-lg">
                            <v-card-title class="text-h5 text-center">Apakah anda yakin <br> ingin menghapus data
                                ini?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="error" variant="elevated" @click="closeDelete" elevation="4">Batal</v-btn>
                                <v-btn color="blue-darken-1" variant="outlined" @click="deleteItemConfirm"
                                    elevation="4">Hapus Data</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <!-- modal show -->
                    <v-dialog v-model="dialogShow" max-width="900px">
                        <v-card class="py-3 px-2">
                            <v-card-title>
                                <span class="text-h5">Detail Data Alur Tujuan Pembelajaran</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container class="py-4">
                                    <v-row align="start" class="ms-2">
                                        <!-- Tahap -->
                                        <v-col cols="3">
                                            <v-sheet>
                                                Tahap
                                            </v-sheet>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-sheet class="pa-1 ">
                                                :
                                            </v-sheet>
                                        </v-col>
                                        <v-col cols="8">
                                            <v-sheet class="pa-1 text-justify">
                                                {{ dataShow.tahap }}
                                            </v-sheet>
                                        </v-col>

                                        <!-- alur tujuan pembelajaran -->
                                        <v-col cols="3">
                                            <v-sheet>
                                                Alur Tujuan Pembelajaran
                                            </v-sheet>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-sheet class="pa-1 ">
                                                :
                                            </v-sheet>
                                        </v-col>
                                        <v-col cols="8">
                                            <v-sheet class="pa-1 text-justify">
                                                <div class="text-justify"
                                                    v-html="formattedText(dataShow.alur_tujuan_pembelajaran)"></div>
                                            </v-sheet>
                                        </v-col>

                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="error" prepend-icon="mdi mdi-minus-circle-outline" variant="text"
                                    @click="closeShow" elevation="4">
                                    Tutup
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-btn density="comfortable" icon="mdi mdi-eye-outline" color="cyan-accent-4" class="mx-2"
                    @click="showItem(item.idAtp)"></v-btn>
                <v-btn density="comfortable" icon="mdi mdi-pen" color="success" class="mx-2"
                    @click="editItem(item.idAtp)"></v-btn>
                <v-btn density="comfortable" icon="mdi mdi-delete" color="error" class="mx-2"
                    @click="deleteItem(item.idAtp)"></v-btn>
            </template>
        </v-data-table>

        <!-- snackbar -->
        <v-snackbar v-model="snackbar" :timeout="timeout" color="blue-grey" rounded="pill" width="200">
            <p class="text-center">{{ textSnackbar }}</p>
        </v-snackbar>
    </v-container>
</template>

<script setup>
import MenuTitle from '../../components/MenuTitle.vue';
import { ref, onMounted, computed } from 'vue';
import axios from "axios";
import { useRoute } from 'vue-router';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { formattedText } from '../../helper/index';

const route = useRoute()
const idMp = route.params.idMp
const alur_tujuan_pembelajaran = ref([])
const namaMp = ref("")
const tujuan_pembelajaran = ref([])
const deskripsti_tp = ref([])

const snackbar = ref(false);
const textSnackbar = ref("");
const timeout = ref(2000);


const forms = ref({
    tahap: "",
    alur_tujuan_pembelajaran: [],
})

const formsEdit = ref({
    idAtp: "",
    tahap: "",
    alur_tujuan_pembelajaran: [],
})

const dataShow = ref({
    idAtp: "",
    tahap: "",
    alur_tujuan_pembelajaran: "",
})

const headers = ref([
    {
        title: 'No',
        align: 'center',
        sortable: false,
        key: 'no',
        value: 'id',
    },
    {
        title: 'Tahap',
        align: 'center',
        sortable: false,
        key: 'tahap',
    },
    {
        title: 'Alur Tujuan Pembelajaran',
        align: 'center',
        sortable: false,
        key: 'alur_tujuan_pembelajaran',
    },
    {
        title: 'Aksi',
        align: 'center',
        key: 'actions',
        sortable: false
    },
])

const deleteId = ref('');

// dialog
const dialogDelete = ref(false)
const dialog = ref(false)
const dialogEdit = ref(false)
const dialogShow = ref(false)

function close() {
    dialog.value = false
}

function closeDelete() {
    dialogDelete.value = false
}

function closeEdit() {
    dialogEdit.value = false
}

function closeShow() {
    dialogShow.value = false;
}

// get data alur tujuan pembelajaran
const loadData = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/kurikulum/${idMp}/alur_tujuan_pembelajaran`)
        const data = response.data
        alur_tujuan_pembelajaran.value = data
        // console.log("Data alur tujuan pembelajaran", data)
    } catch (error) {
        console.error("Error get data ", error)
    }
}

// create data alur tujuan pembelajaran
const save = async () => {
    try {
        const newData = {
            tahap: forms.value.tahap,
            alur_tujuan_pembelajaran: forms.value.alur_tujuan_pembelajaran.join("\n").toString(),
        }

        // console.log(newData)

        const response = await axios.post(`http://localhost:3000/kurikulum/${idMp}/alur_tujuan_pembelajaran`, newData)
        if (response.status === 201) {
            forms.value.tahap = ""
            forms.value.alur_tujuan_pembelajaran = ""
            dialog.value = false
            loadData()
            textSnackbar.value = "Data Berhasil Disimpan";
            snackbar.value = true;
        } else {
            console.error("Error respone data ", response.data)
        }
    } catch (error) {
        console.error("Error save data ", error)
    }
}

// ambil id alur tujuan pembelajaran
const deleteItem = (id) => {
    deleteId.value = id;
    // console.log(deleteId.value)
    dialogDelete.value = true;
}

// konfirmasi hapus data
const deleteItemConfirm = async () => {
    try {
        const response = await axios.delete(`http://localhost:3000/kurikulum/alur_tujuan_pembelajaran/${deleteId.value}`)
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
        console.error("Error delete data ", error)
    }
}

// mengambil data alur tujuan pembelajaran berdasarkan id
const editItem = async (id) => {
    dialogEdit.value = true;
    // console.log(id)

    try {
        const response = await axios.get(`http://localhost:3000/kurikulum/alur_tujuan_pembelajaran/${id}`)
        const data = response.data
        console.log(data)
        formsEdit.value = {
            idAtp: data.idAtp,
            tahap: data.tahap,
            alur_tujuan_pembelajaran: data.alur_tujuan_pembelajaran.split('\n'),
        }
    } catch (error) {
        console.error("Error get data", error)
    }
}

const updateData = async () => {
    try {
        const updateData = {
            tahap: formsEdit.value.tahap,
            alur_tujuan_pembelajaran: formsEdit.value.alur_tujuan_pembelajaran,
        }

        const response = await axios.put(`http://localhost:3000/kurikulum/alur_tujuan_pembelajaran/${formsEdit.value.idAtp}`, updateData)
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
        console.error("Error update data", error)
    }
}

const downloadPDF = () => {
    const doc = new jsPDF()

    // header table
    const headers = [['No', 'Tahap', 'Alur Tujuan Pembelajaran']]

    // Menambahkan judul besar
    const title = 'Alur Tujuan Pembelajaran';
    doc.setFontSize(18);
    doc.text(title, 78, 15);

    const mapel = namaMp.value
    doc.setFontSize(18);
    doc.text(mapel, 83, 25);

    const sekolah = "Sekolah Dasar Negeri 138 Pekanbaru"
    doc.setFontSize(18);
    doc.text(sekolah, 60, 35);

    // data tabel
    const data = alur_tujuan_pembelajaran.value.map((item, index) =>
        [index + 1, item.tahap, item.alur_tujuan_pembelajaran]
    )

    // masukkan data tabel kedalam dokumen pdf
    doc.autoTable({
        head: headers,
        body: data,
        startY: 45,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [22, 160, 133], halign: 'center' }
    });

    // Menyimpan dokumen PDF
    doc.save('alur_tujuan_pembelajaran.pdf');
}

const getMatapelajaran = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/fase/mp/${idMp}`)
        const data = response.data
        namaMp.value = data.namaMataPelajaran
        // console.log(namaMp.value)
        return data
    } catch (error) {
        console.error("Error get data", error)
    }
}


const getTujuanPembelajaran = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/kurikulum/${idMp}/tujuan_pembelajaran`)
        const data = response.data
        tujuan_pembelajaran.value = data
        deskripsti_tp.value = tujuan_pembelajaran.value.map(tp => tp.tujuan_pembelajaran);
        console.log("Data tujuan pembelajaran", deskripsti_tp.value)
    } catch (error) {
        console.error("Error response data")
    }
}


const showItem = async (id) => {
    dialogShow.value = true;
    // console.log(id)

    try {
        const response = await axios.get(`http://localhost:3000/kurikulum/alur_tujuan_pembelajaran/${id}`)
        const data = response.data
        // console.log(data)
        dataShow.value = {
            tahap: data.tahap,
            alur_tujuan_pembelajaran: data.alur_tujuan_pembelajaran,
        }
    } catch (error) {
        console.error("Error get data", error)
    }
}

onMounted(() => {
    getMatapelajaran()
    loadData()
    getTujuanPembelajaran()
})

</script>