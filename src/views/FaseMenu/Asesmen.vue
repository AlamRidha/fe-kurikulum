<template>
    <v-container fluid>
        <MenuTitle msg="Menu | Kurikulum Asesmen" class="text-subtitle-1 font-weight-medium " />

        <v-data-table :headers="headers" :items="asesmen" :items-per-page="5" class="elevation-5 mt-4">
            <template v-slot:item.no="{ index }">
                {{ index + 1 }} </template>

            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Data Asesmen</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

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
                                <span class="text-h5">Form Asesmen</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container class="py-4">
                                    <v-form ref="form">
                                        <v-select v-model="forms.namaBab" :items="bab_modul"
                                            label="Nama Bab"></v-select>
                                        <v-text-field v-model="forms.jenisAsesmen" label="Jenis Asesmen"></v-text-field>
                                        <v-textarea name="Bentuk Asesmen" v-model="forms.bentukAsesmen"
                                            label="Bentuk Asesmen" bg-color="grey-lighten-2"></v-textarea>
                                        <v-textarea name="keterangan" v-model="forms.keterangan" label="Keterangan"
                                            bg-color="grey-lighten-2"></v-textarea>
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
                                <span class="text-h5">Edit Data Asesmen</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container class="py-4">
                                    <v-form ref="form">
                                        <v-select v-model="formsEdit.namaBab" :items="bab_modul"
                                            label="Nama Bab"></v-select>
                                        <v-text-field v-model="formsEdit.jenisAsesmen"
                                            label="Jenis Asesmen"></v-text-field>
                                        <v-textarea name="Bentuk Asesmen" v-model="formsEdit.bentukAsesmen"
                                            label="Bentuk Asesmen" bg-color="grey-lighten-2"></v-textarea>
                                        <v-textarea name="keterangan" v-model="formsEdit.keterangan" label="Keterangan"
                                            bg-color="grey-lighten-2"></v-textarea>
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
                                <span class="text-h5">Detail Asesmen</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container class="py-4">
                                    <v-row align="start" class="ms-2">
                                        <!-- Nama Bab -->
                                        <v-col cols="3">
                                            <v-sheet>
                                                Nama Bab
                                            </v-sheet>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-sheet class="pa-1 ">
                                                :
                                            </v-sheet>
                                        </v-col>
                                        <v-col cols="8">
                                            <v-sheet class="pa-1 text-justify">
                                                {{ dataShow.namaBab }}
                                            </v-sheet>
                                        </v-col>

                                        <!-- JenisAsesmen -->
                                        <v-col cols="3">
                                            <v-sheet>
                                                JenisAsesmen
                                            </v-sheet>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-sheet class="pa-1 ">
                                                :
                                            </v-sheet>
                                        </v-col>
                                        <v-col cols="8">
                                            <v-sheet class="pa-1 text-justify">
                                                {{ dataShow.jenisAsesmen }}
                                            </v-sheet>
                                        </v-col>


                                        <!-- Bentuk Asesmen -->
                                        <v-col cols="3">
                                            <v-sheet>
                                                Bentuk Asesmen
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
                                                    v-html="formattedText(dataShow.bentukAsesmen)">
                                                </div>

                                            </v-sheet>
                                        </v-col>

                                        <!--  Keterangan -->
                                        <v-col cols="3">
                                            <v-sheet>
                                                Keterangan
                                            </v-sheet>
                                        </v-col>
                                        <v-col cols="1">
                                            <v-sheet class="pa-1 ">
                                                :
                                            </v-sheet>
                                        </v-col>
                                        <v-col cols="8">
                                            <v-sheet class="pa-1 text-justify">
                                                <div class="text-justify" v-html="formattedText(dataShow.keterangan)">
                                                </div>

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
                    @click="showItem(item.idAsesmen)"></v-btn>
                <v-btn density="comfortable" icon="mdi mdi-pen" color="success" class="mx-2"
                    @click="editItem(item.idAsesmen)"></v-btn>
                <v-btn density="comfortable" icon="mdi mdi-delete" color="error" class="mx-2"
                    @click="deleteItem(item.idAsesmen)"></v-btn>
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from "axios";
import { formattedText } from '../../helper/index';

const route = useRoute()
const idMp = route.params.idMp
const snackbar = ref(false);
const textSnackbar = ref("");
const timeout = ref(2000);

const asesmen = ref([])
const bab_modul = ref([])


const forms = ref({
    namaBab: "",
    jenisAsesmen: "",
    bentukAsesmen: "",
    keterangan: ""
})

const formsEdit = ref({
    idAsesmen: "",
    namaBab: "",
    jenisAsesmen: "",
    bentukAsesmen: "",
    keterangan: ""
})

const dataShow = ref({
    idAsesmen: "",
    namaBab: "",
    jenisAsesmen: "",
    bentukAsesmen: "",
    keterangan: ""
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
        title: 'Nama Bab',
        align: 'center',
        sortable: false,
        key: 'namaBab',
    },
    {
        title: 'Jenis Asesmen',
        align: 'center',
        sortable: false,
        key: 'jenisAsesmen',
    },
    {
        title: 'Bentuk Asesmen',
        align: 'center',
        sortable: false,
        key: 'bentukAsesmen'
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

const loadData = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/kurikulum/${idMp}/asesmen/`)
        const data = response.data
        asesmen.value = data
        console.log(data)
    } catch (error) {
        console.error("Error Load data ", error)
    }
}

// save data
const save = async () => {
    try {
        const newData = {
            namaBab: forms.value.namaBab,
            jenisAsesmen: forms.value.jenisAsesmen,
            bentukAsesmen: forms.value.bentukAsesmen,
            keterangan: forms.value.keterangan
        }

        const response = await axios.post(`http://localhost:3000/kurikulum/${idMp}/asesmen`, newData)
        if (response.status === 201) {
            forms.value.namaBab = ""
            forms.value.jenisAsesmen = ""
            forms.value.bentukAsesmen = ""
            forms.value.keterangan = ""
            dialog.value = false
            loadData()
            textSnackbar.value = "Data Berhasil Disimpan";
            snackbar.value = true;
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
        const response = await axios.delete(`http://localhost:3000/kurikulum/asesmen/${deleteId.value}`)
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

// ambil data untuk edit
const editItem = async (id) => {
    dialogEdit.value = true;
    // console.log(id)

    try {
        const response = await axios.get(`http://localhost:3000/kurikulum/asesmen/${id}`)
        const data = response.data
        console.log(data)
        formsEdit.value = {
            idAsesmen: data.idAsesmen,
            namaBab: data.namaBab,
            jenisAsesmen: data.jenisAsesmen,
            bentukAsesmen: data.bentukAsesmen,
            keterangan: data.keterangan
        }
    } catch (error) {
        console.error("Error get data", error)
    }
}


const updateData = async () => {
    try {
        const updateData = {
            namaBab: formsEdit.value.namaBab,
            jenisAsesmen: formsEdit.value.jenisAsesmen,
            bentukAsesmen: formsEdit.value.bentukAsesmen,
            keterangan: formsEdit.value.keterangan
        }

        const response = await axios.put(`http://localhost:3000/kurikulum/asesmen/${formsEdit.value.idAsesmen}`, updateData)
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

const showItem = async (id) => {
    dialogShow.value = true;
    try {
        const response = await axios.get(`http://localhost:3000/kurikulum/asesmen/${id}`)
        const data = response.data
        dataShow.value = {
            idAsesmen: data.idAsesmen,
            namaBab: data.namaBab,
            jenisAsesmen: data.jenisAsesmen,
            bentukAsesmen: data.bentukAsesmen,
            keterangan: data.keterangan
        }
    } catch (error) {
        console.error("Error get data", error)
    }
}

const getModul = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/kurikulum/${idMp}/modul_pembelajaran`)
        const data = response.data
        // modul_pembelajaran.value = data
        const extractedData = data.map(item => item.bab)
        bab_modul.value = extractedData

        console.log("Data Bab ", extractedData)
    } catch (error) {
        console.error("Error get data", error)
    }
}

onMounted(() => {
    loadData()
    getModul()
})
</script>