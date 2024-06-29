<template>
    <v-container fluid>
        <MenuTitle msg="Menu | Kurikulum Tujuan Pembelajaran" class="text-subtitle-1 font-weight-medium " />

        <v-data-table :headers="headers" :items="tujuan_pembelajaran" :items-per-page="5" class="elevation-5 mt-4">
            <template v-slot:item.no="{ index }">
                {{ index + 1 }} </template>

            <template v-slot:item.tujuan_pembelajaran="{ item }">
                <span class="d-inline-block text-truncate text-left" style="max-width: 600px;">{{
            item.tujuan_pembelajaran }}
                </span> </template>

            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Data Tujuan Pembelajaran</v-toolbar-title>
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
                            <v-btn class="mb-2" variant="outlined" color="primary" dark v-bind="props"
                                prepend-icon="mdi mdi-plus">
                                Tambah Data
                            </v-btn>
                        </template>
                        <v-card class="py-3 px-2">
                            <v-card-title>
                                <span class="text-h5">Form Tujuan Pembelajaran</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container class="py-4">
                                    <v-form ref="form">
                                        <v-select v-model="forms.elemen_capaian" :items="elemenList"
                                            label="Elemen Capaian Pembelajaran"></v-select>
                                        <textarea name="tujuan_pembelajaran" cols="65" rows="10"
                                            v-model="forms.tujuan_pembelajaran" label="Tujuan Pembelajaran"
                                            placeholder="Tujuan Pembelajaran"
                                            class="border-sm elevation-2 pa-2"></textarea>
                                        <!-- <v-text-field v-model="forms.tujuan_pembelajaran"
                                            label="Tujuan Pembelajaran"></v-text-field> -->

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
                                <span class="text-h5">Edit Data Tujuan Pembelajaran</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container class="py-4">
                                    <v-form ref="form">
                                        <v-select v-model="formsEdit.elemen_capaian" :items="elemenList"
                                            label="Elemen Capaian Pembelajaran"></v-select>
                                        <textarea name="tujuan_pembelajaran" cols="65" rows="10"
                                            v-model="formsEdit.tujuan_pembelajaran" label="Tujuan Pembelajaran"
                                            placeholder="Tujuan Pembelajaran"
                                            class="border-sm elevation-2 pa-2"></textarea>
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
                                <span class="text-h5">Detail Tujuan Pembelajaran</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container class="py-4">
                                    <v-row align="start" class="ms-2">
                                        <!-- Elemen Capaian Pembelajaran -->
                                        <v-col cols="3">
                                            <v-sheet>
                                                Elemen Capaian Pembelajaran
                                            </v-sheet>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-sheet class="pa-1 ">
                                                :
                                            </v-sheet>
                                        </v-col>
                                        <v-col cols="8">
                                            <v-sheet class="pa-1 text-justify">
                                                {{ dataShow.elemen_capaian }}
                                            </v-sheet>
                                        </v-col>

                                        <!--  tujuan pembelajaran -->
                                        <v-col cols="3">
                                            <v-sheet>
                                                Tujuan Pembelajaran
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
                                                    v-html="formattedText(dataShow.tujuan_pembelajaran)"></div>
                                            </v-sheet>
                                        </v-col>

                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="error" variant="text" @click="closeShow" elevation="4">
                                    Tutup
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-btn density="comfortable" icon="mdi mdi-eye-outline" color="cyan-accent-4" class="mx-2"
                    @click="showItem(item.idTp)"></v-btn>
                <v-btn density="comfortable" icon="mdi mdi-pen" color="success" class="mx-2"
                    @click="editItem(item.idTp)"></v-btn>
                <v-btn density="comfortable" icon="mdi mdi-delete" color="error" class="mx-2"
                    @click="deleteItem(item.idTp)"></v-btn>
            </template>

        </v-data-table>
    </v-container>
</template>

<script setup>
import MenuTitle from '../../components/MenuTitle.vue';
import { ref, onMounted } from 'vue';
import axios from "axios";
import { useRoute } from 'vue-router';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { formattedText } from '../../helper/index';

const route = useRoute()
const idMp = route.params.idMp
const namaMp = ref("")

const tujuan_pembelajaran = ref([])
const capaian_pembelajaran = ref([])
const elemenList = ref([]);

const forms = ref({
    elemen_capaian: "",
    tujuan_pembelajaran: "",
})

const formsEdit = ref({
    idTp: "",
    elemen_capaian: "",
    tujuan_pembelajaran: "",
})

const dataShow = ref({
    idTp: "",
    elemen_capaian: "",
    tujuan_pembelajaran: "",
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
        title: 'Elemen Capaian Pembelajaran',
        align: 'center',
        sortable: false,
        key: 'elemen_capaian',
    },
    {
        title: 'Tujuan Pembelajaran',
        align: 'center',
        sortable: false,
        key: 'tujuan_pembelajaran',
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

// rowspan kolom
const getRowspan = (item) => tujuan_pembelajaran.value.filter((tp) => tp.elemen_capaian === item.elemen_capaian).length;

const shouldShowRowspanCell = (item, index) => {
    const prevItem = tujuan_pembelajaran.value[index - 1];
    return !prevItem || prevItem.elemen_capaian !== item.elemen_capaian;
};

// get data capaian from capaian_pembelajaran
const getCapaian = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/kurikulum/${idMp}/capaian_pembelajaran`)
        const data = response.data
        capaian_pembelajaran.value = data
        elemenList.value = capaian_pembelajaran.value.map(cp => cp.elemen);
        // console.log("Data capaian pembelajaran", elemenList.value)
    } catch (error) {
        console.error("Error get data", error)
    }
}


// get data 
const loadData = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/kurikulum/${idMp}/tujuan_pembelajaran`)
        const data = response.data
        tujuan_pembelajaran.value = data
        // console.log("Data tujuan pembelajaran", data)
    } catch (error) {
        console.error("Error get data ", error)
    }
}

// save data
const save = async () => {
    try {
        const newData = {
            elemen_capaian: forms.value.elemen_capaian,
            tujuan_pembelajaran: forms.value.tujuan_pembelajaran,
        }

        const response = await axios.post(`http://localhost:3000/kurikulum/${idMp}/tujuan_pembelajaran`, newData)
        if (response.status === 201) {
            forms.value.elemen_capaian = ""
            forms.value.tujuan_pembelajaran = ""
            dialog.value = false
            loadData()
        } else {
            console.log("Response error ", response.data)
        }

    } catch (error) {
        console.error("Error save data ", error)
    }
}

// ambil id tujuan
const deleteItem = (id) => {
    deleteId.value = id;
    // console.log(deleteId.value)
    dialogDelete.value = true;
}

// konfirmasi hapus data
const deleteItemConfirm = async () => {
    try {
        const response = await axios.delete(`http://localhost:3000/kurikulum/tujuan_pembelajaran/${deleteId.value}`)
        if (response.status === 200) {
            console.log("Data deleted successfully:", response.data);
            loadData(); // Reload data after deletion
            dialogDelete.value = false;
        } else {
            console.error("Error response data:", response.data);
        }
    } catch (error) {
        console.error("Error delete data ", error)
    }
}

// ambil data untuk edit
const editItem = async (id) => {
    dialogEdit.value = true;
    // console.log(id)

    try {
        const response = await axios.get(`http://localhost:3000/kurikulum/tujuan_pembelajaran/${id}`)
        const data = response.data
        console.log(data)
        formsEdit.value = {
            idTp: data.idTp,
            elemen_capaian: data.elemen_capaian,
            tujuan_pembelajaran: data.tujuan_pembelajaran,
        }
    } catch (error) {
        console.error("Error get data", error)
    }
}

const updateData = async () => {
    try {
        const updateData = {
            elemen_capaian: formsEdit.value.elemen_capaian,
            tujuan_pembelajaran: formsEdit.value.tujuan_pembelajaran,
        }

        const response = await axios.put(`http://localhost:3000/kurikulum/tujuan_pembelajaran/${formsEdit.value.idTp}`, updateData)
        if (response.status === 200) {
            console.log("Data updated successfully:", response.data);
            loadData(); // Reload data after update
            dialogEdit.value = false;
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
    const headers = [['No', 'Elemen Capaian Pembelajaran', 'Tujuan Pembelajaran']]

    // Menambahkan judul besar
    const title = 'Tujuan Pembelajaran';
    doc.setFontSize(18);
    doc.text(title, 78, 15);

    const mapel = namaMp.value
    doc.setFontSize(18);
    doc.text(mapel, 83, 25);

    const sekolah = "Sekolah Dasar Negeri 138 Pekanbaru"
    doc.setFontSize(18);
    doc.text(sekolah, 60, 35);

    // data tabel
    const data = tujuan_pembelajaran.value.map((item, index) =>
        [index + 1, item.elemen_capaian, item.tujuan_pembelajaran]
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
    doc.save('tujuan_pembelajaran.pdf');
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

const showItem = async (id) => {
    dialogShow.value = true;
    try {
        const response = await axios.get(`http://localhost:3000/kurikulum/tujuan_pembelajaran/${id}`)
        const data = response.data
        dataShow.value = {
            idTp: data.idTp,
            elemen_capaian: data.elemen_capaian,
            tujuan_pembelajaran: data.tujuan_pembelajaran,
        }
    } catch (error) {
        console.error("Error get data", error)
    }
}

onMounted(() => {
    getMatapelajaran()
    getCapaian()
    loadData()
})

</script>