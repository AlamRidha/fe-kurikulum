<template>
    <v-container fluid>
        <MenuTitle msg="Menu | Buku Guru & Siswa" />
        <v-row class="d-flex flex-row-reverse">
            <v-col md="4">
                <v-text-field v-model="searchData" append-icon="mdi mdi-magnify" single-line placeholder="Cari Buku..."
                    hide-details density="compact" class="mb-4 rounded-xl"></v-text-field>
            </v-col>
        </v-row>


        <v-data-table :headers="headers" :items="filteredData" item-key="id" class="border-md">
            <template v-slot:item.no="{ index }">
                {{ index + 1 }} </template>

            <template v-slot:item.linkBuku="{ item }">
                <v-btn :href="item.linkBuku" text color="primary" target="_blank" class="rounded-xl"
                    prepend-icon="mdi mdi-link-circle-outline" size="small">
                    <template v-slot:prepend>
                        <v-icon size="large"></v-icon>
                    </template>
                    Link Buku
                </v-btn>
            </template>

            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Data Buku</v-toolbar-title>
                    <v-divider class="mx-4 my-8" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <!-- Modal Tambah -->
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ props }">
                            <v-btn class="mb-2" color="primary" dark v-bind="props">
                                Tambah Data Buku
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="forms.namaBuku" label="Nama Buku"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="forms.linkBuku" label="Link Buku"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="cancelData">
                                    Batal
                                </v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="submitData">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <!-- Modal Edit -->
                    <v-dialog v-model="dialogEdit" max-width="500px">
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">Edit Data Buku</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="formsEdit.namaBuku" label="Nama Buku"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="formsEdit.linkBuku" label="Link Buku"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="cancelEdit">
                                    Batal
                                </v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="updateData">
                                    Update Data
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>


                    <!-- Modal Hapus -->
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card class="pa-5 rounded-lg">
                            <v-card-title class="text-h5 text-center">Apakah Anda Yakin <br> Ingin Menghapus Data
                                Buku ini?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="error" variant="elevated" @click="closeDelete">Batal</v-btn>
                                <v-btn color="blue-darken-1" variant="outlined" @click="deleteItemConfirm">Hapus
                                    Buku</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn density="comfortable" icon="mdi mdi-pen" color="secondary" class="mx-2"
                    @click="editItem(item.idBuku)"></v-btn>
                <v-btn density="comfortable" icon="mdi mdi-delete" color="error" class="mx-2"
                    @click="deleteItem(item.idBuku)"></v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>

<script setup>
import axios from 'axios';
import MenuTitle from '../components/MenuTitle.vue';
import { ref, onMounted, computed } from 'vue'

const dialog = ref(false);
const dialogEdit = ref(false);
const dialogDelete = ref(false);
const deleteId = ref('');

const forms = ref({
    idBuku: '',
    namaBuku: '',
    linkBuku: '',
})

const formsEdit = ref({
    idBuku: '',
    namaBuku: '',
    linkBuku: '',
})

const headers = ref([
    {
        title: "No",
        align: "start",
        key: "no",
    },
    {
        title: 'Nama Buku',
        align: 'start',
        key: 'namaBuku',
    },
    {
        title: 'Link Buku',
        key: 'linkBuku',
        align: 'center',
        sortable: false,
    },
    {
        title: 'Aksi',
        key: 'actions',
        sortable: false,
        align: 'center'
    },
])

const dataBuku = ref([]);

onMounted(() => {
    loadData()
})

// untuk searching data
const searchData = ref('');

const filteredData = computed(() => {
    // Filter data based on search term
    return dataBuku.value.filter(item => item.namaBuku.toLowerCase().includes(searchData.value.toLowerCase()));
});

const formTitle = ref('Tambah Data Buku');

const cancelData = () => {
    // Reset modal ketika di cancel
    forms.value = {
        idBuku: '',
        namaBuku: '',
        linkBuku: '',
    };

    // Close the modal
    dialog.value = false;
};

const cancelEdit = () => {
    dialogEdit.value = false;
}

const closeDelete = () => {
    dialogDelete.value = false;
}

// fungsi load data dengan async
const loadData = async () => {
    try {
        // panggil api get data
        const response = await axios.get('http://localhost:3000/dbuku')
        const data = response.data
        dataBuku.value = data
        // console.log(data)
    } catch (error) {
        console.log("Error get Data", error)

    }
}

// fungsi untuk menambahkan data 
const submitData = async () => {
    try {
        const newData = {
            namaBuku: forms.value.namaBuku,
            linkBuku: forms.value.linkBuku,
        }
        console.log(newData)

        // panggil api create data
        const response = await axios.post('http://localhost:3000/dbuku', newData)
        if (response.status === 200) {
            forms.value.namaBuku = ''
            forms.value.linkBuku = ''
            dialog.value = false;
            loadData()
        } else {
            console.error("Error post Data", response.data)
        }

    } catch (error) {
        console.log("Error post Data", error)
    }
}

// fungsi untuk mengedit data
const editItem = async (id) => {
    dialogEdit.value = true

    try {

        // panggil api get data by id
        const response = await axios.get(`http://localhost:3000/dbuku/${id}`)
        const data = response.data
        // Update the form fields with the fetched data
        formsEdit.value = {
            idBuku: data.idBuku,
            namaBuku: data.namaBuku,
            linkBuku: data.linkBuku,
        };
    } catch (error) {
        console.error("Error fetching data for editing:", error);
    }
}

// fungsi untuk update data
const updateData = async () => {
    try {
        const updatedData = {
            namaBuku: formsEdit.value.namaBuku,
            linkBuku: formsEdit.value.linkBuku,
        }

        // panggil api update data
        const response = await axios.put(`http://localhost:3000/dbuku/${formsEdit.value.idBuku}`, updatedData)
        if (response.status === 200) {
            console.log("Data updated successfully:", response.data);
            loadData(); // Reload data after update
            dialogEdit.value = false;
        } else {
            console.error("Error updating data:", response.data);
        }
    } catch (error) {
        console.log("Error update Data", error)
    }
}

// mengambil data id untuk dihapus
const deleteItem = (id) => {
    deleteId.value = id;
    dialogDelete.value = true;
}

// fungsi untuk confirm hapus data
const deleteItemConfirm = async () => {
    try {
        const response = await axios.delete(`http://localhost:3000/dbuku/${deleteId.value}`)
        if (response.status === 200) {
            console.log("Data deleted successfully:", response.data);
            loadData(); // Reload data after deletion
            dialogDelete.value = false;
        } else {
            console.error("Error deleting data:", response.data);
        }
    } catch (error) {
        console.log("Error delete Data", error)
    }
}

</script>