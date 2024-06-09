<template>
    <v-container fluid>
        <MenuTitle msg="Menu | List Guru" class="text-subtitle-1 font-weight-medium " />
        <v-row class="d-flex flex-row-reverse">
            <v-col md="4">
                <v-text-field v-model="searchData" append-icon="mdi mdi-magnify" single-line
                    placeholder="Search name..." hide-details></v-text-field>
            </v-col>
        </v-row>

        <v-data-table :headers="headers" :items="filteredData" :items-per-page="5" class="elevation-5 mt-4"
            :search="searchData">
            <template v-slot:item.no="{ index }">
                {{ index + 1 }} </template>

            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Data Guru</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="550px">
                        <template v-slot:activator="{ props }">
                            <v-btn class="mb-2 bg-orange" color="white" dark v-bind="props" prepend-icon="mdi mdi-plus">
                                Tambah Data Guru
                            </v-btn>
                        </template>
                        <v-card class="py-3 px-2">
                            <v-card-title>
                                <span class="text-h5">Form Guru</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-form ref="form" v-model="isFormValid">
                                        <v-text-field v-model="forms.nameUser" label="Nama Guru"
                                            :rules="nameRules"></v-text-field>
                                        <v-text-field v-model="forms.nip" label="NIP" :rules="nipRules"></v-text-field>
                                        <v-text-field v-model="forms.password" label="Password"
                                            :rules="passwordRules"></v-text-field>
                                        <v-text-field v-model="forms.email" label="Email"
                                            :rules="emailRules"></v-text-field>
                                        <v-text-field v-model="forms.noHp" label="No Handphone"
                                            :rules="noHpRules"></v-text-field>
                                        <v-text-field v-model="forms.bidangMataPelajaran" label="Bidang Mata Pelajaran"
                                            :rules="bidangRules"></v-text-field>
                                    </v-form>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="error" variant="text" @click="close">
                                    Cancel
                                </v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="save">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-btn density="comfortable" icon="mdi mdi-pen" color="success" class="mx-2"
                    @click="editItem(item.id)"></v-btn>
                <v-btn density="comfortable" icon="mdi mdi-delete" color="error" class="mx-2"
                    @click="deleteItem(item.id)"></v-btn>
            </template>


        </v-data-table>
    </v-container>
</template>

<script setup>
import axios from "axios";
import MenuTitle from "../components/MenuTitle.vue"
import { ref, onMounted, computed } from "vue"

const forms = ref({
    nip: "",
    nameUser: "",
    password: "",
    email: "",
    noHp: "",
    bidangMataPelajaran: "",
})

// rules
const isFormValid = ref(false);
const nameRules = [v => !!v || 'Nama Guru wajib diisi'];
const nipRules = [v => !!v || 'NIP wajib diisi'];

const passwordRules = [
    v => !!v || 'Password wajib diisi',
    v => (v && v.length >= 5) || 'Password minimal 5 karakter'
];
const emailRules = [v => !!v || 'Email wajib diisi'];
const noHpRules = [
    v => !!v || 'No Handphone wajib diisi',
    v => (v && v.length <= 13) || 'No Handphone maksmimal 13 karakter'
];
const bidangRules = [v => !!v || 'Bidang Mata Pelajaran wajib diisi'];

const dialogDelete = ref(false)
const dialog = ref(false)

function close() {
    dialog.value = false
}


const headers = ref([
    {
        title: 'No',
        align: 'start',
        sortable: false,
        key: 'no',
        value: 'id',
    },
    {
        title: 'Nama Guru',
        align: 'start',
        sortable: false,
        key: 'nameUser',
    },
    {
        title: 'NIP',
        key: 'nip',
        sortable: false,
    },
    {
        title: 'Email',
        key: 'email',
        sortable: false
    },
    {
        title: 'No Handphone',
        key: 'noHp',
        sortable: false,
    },
    {
        title: 'Bidang Mata Pelajaran',
        key: 'bidangMataPelajaran',
        sortable: false,
    },
    {
        title: 'Actions',
        key: 'actions',
        sortable: false
    },
])

const searchData = ref("")

const dataUser = ref([]);

onMounted(() => {
    loadData()
})

// panggil get all data
const loadData = async () => {
    try {
        const response = await axios.get("http://localhost:3000/users")
        const data = response.data
        dataUser.value = data
        console.log(data)
    } catch (error) {
        console.log("Error get data ", error)
    }
}

const filteredData = computed(() => {
    return dataUser.value.filter((item) => {
        return (
            item.nameUser.toLowerCase().includes(searchData.value.toLowerCase()) ||
            item.nip.toLowerCase().includes(searchData.value.toLowerCase()) ||
            item.email.toLowerCase().includes(searchData.value.toLowerCase()) ||
            item.noHp.toLowerCase().includes(searchData.value.toLowerCase()) ||
            item.bidangMataPelajaran.toLowerCase().includes(searchData.value.toLowerCase())
        );
    });
});

const save = async () => {
    if (isFormValid.value) {
        try {
            const newData = {
                nip: forms.value.nip,
                nameUser: forms.value.nameUser,
                password: forms.value.password,
                email: forms.value.email,
                noHp: forms.value.noHp,
                bidangMataPelajaran: forms.value.bidangMataPelajaran,
            }
            // console.log(newData)

            const response = await axios.post("http://localhost:3000/users", newData)
            if (response.status === 200) {
                forms.value.nip = ""
                forms.value.nameUser = ""
                forms.value.password = ""
                forms.value.email = ""
                forms.value.noHp = ""
                forms.value.bidangMataPelajaran = ""
                dialog.value = false

                loadData()
            } else {
                console.error("Error save data", response.data)
            }
        } catch (error) {
            console.log("Error save data", error)
        }
    } else {
        console.log("Form tidak valid")
    }
}

</script>