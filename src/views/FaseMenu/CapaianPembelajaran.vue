<template>
    <v-container fluid>
        <MenuTitle msg="Menu | Kurikulum Capaian Pembelajaran" class="text-subtitle-1 font-weight-medium " />

        <v-data-table :headers="headers" :items="capaian_pembelajaran" :items-per-page="5" class="elevation-5 mt-4">
            <template v-slot:item.no="{ index }">
                {{ index + 1 }} </template>

            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Data Capaian Pembelajaran</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <!-- modal tambah -->
                    <v-dialog v-model="dialog" max-width="550px">
                        <template v-slot:activator="{ props }">
                            <v-btn class="mb-2 bg-orange" color="white" dark v-bind="props" prepend-icon="mdi mdi-plus">
                                Tambah Data
                            </v-btn>
                        </template>
                        <v-card class="py-3 px-2">
                            <v-card-title>
                                <span class="text-h5">Form Capaian Pembelajaran</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container class="py-4">
                                    <v-form ref="form">
                                        <v-text-field v-model="forms.elemen" label="Elemen"></v-text-field>
                                        <v-text-field v-model="forms.capaian_pembelajaran"
                                            label="Capaian Pembelajaran"></v-text-field>
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
                                <span class="text-h5">Edit Data Capaian Pembelajaran</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container class="py-4">
                                    <v-form ref="form">
                                        <v-text-field v-model="formsEdit.elemen" label="Elemen"></v-text-field>
                                        <v-text-field v-model="formsEdit.capaian_pembelajaran"
                                            label="Capaian Pembelajaran"></v-text-field>
                                        <!-- <v-text-field v-model="formsEdit.capaian_pembelajaran"
                                            label="Capaian Pembelajaran" :style="{ height: '500px' }"></v-text-field> -->

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
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-btn density="comfortable" icon="mdi mdi-pen" color="success" class="mx-2"
                    @click="editItem(item.idCp)"></v-btn>
                <v-btn density="comfortable" icon="mdi mdi-delete" color="error" class="mx-2"
                    @click="deleteItem(item.idCp)"></v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>

<script setup>
import MenuTitle from '../../components/MenuTitle.vue';
import { ref, onMounted } from 'vue';
import axios from "axios";
import { useRoute } from 'vue-router';

const route = useRoute()
const idMp = route.params.idMp

const capaian_pembelajaran = ref([])

const forms = ref({
    elemen: "",
    capaian_pembelajaran: "",
})

const formsEdit = ref({
    idCp: "",
    elemen: "",
    capaian_pembelajaran: "",
})

// judul tabel
const headers = ref([
    {
        title: 'No',
        align: 'center',
        sortable: false,
        key: 'no',
        value: 'id',
    },
    {
        title: 'Elemen',
        align: 'center',
        sortable: false,
        key: 'elemen',
    },
    {
        title: 'Capaian Pembelajaran',
        align: 'center',
        sortable: false,
        key: 'capaian_pembelajaran',
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

function close() {
    dialog.value = false
}

function closeDelete() {
    dialogDelete.value = false
}

function closeEdit() {
    dialogEdit.value = false
}

// get data
const loadData = async () => {
    // console.log(idMp)
    try {
        const response = await axios.get(`http://localhost:3000/kurikulum/${idMp}/capaian_pembelajaran`)
        const data = response.data
        capaian_pembelajaran.value = data
        // console.log(capaian_pembelajaran)
    } catch (error) {
        console.error("Error get data", error)
    }
}

// simpan data
const save = async () => {
    try {
        const newData = {
            elemen: forms.value.elemen,
            capaian_pembelajaran: forms.value.capaian_pembelajaran,
        }

        const response = await axios.post(`http://localhost:3000/kurikulum/${idMp}/capaian_pembelajaran`, newData)

        if (response.status === 201) {
            forms.value.elemen = ""
            forms.value.capaian_pembelajaran = ""
            dialog.value = false
            loadData()
        } else {
            console.error("Error respone data ", response.data)
        }
    } catch (error) {
        console.error("Error save data", error)
    }
}

// ambil id capaian
const deleteItem = (id) => {
    deleteId.value = id;
    // console.log(deleteId.value)
    dialogDelete.value = true;
}

// konfirmasi hapus data
const deleteItemConfirm = async () => {
    try {
        const response = await axios.delete(`http://localhost:3000/kurikulum/capaian_pembelajaran/${deleteId.value}`)
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

const editItem = async (id) => {
    dialogEdit.value = true;
    // console.log(id)

    try {
        const response = await axios.get(`http://localhost:3000/kurikulum/capaian_pembelajaran/${id}`)
        const data = response.data
        // console.log(data)
        formsEdit.value = {
            idCp: data.idCp,
            elemen: data.elemen,
            capaian_pembelajaran: data.capaian_pembelajaran,
        }
    } catch (error) {
        console.error("Error get data", error)
    }
}

const updateData = async () => {
    try {
        const updateData = {
            elemen: formsEdit.value.elemen,
            capaian_pembelajaran: formsEdit.value.capaian_pembelajaran,
        }

        const response = await axios.put(`http://localhost:3000/kurikulum/capaian_pembelajaran/${formsEdit.value.idCp}`, updateData)
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

onMounted(() => {
    loadData()
})

</script>