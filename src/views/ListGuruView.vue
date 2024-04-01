<template>
    <v-container fluid>
        <MenuTitle msg="Menu | List Guru" class="text-subtitle-1 font-weight-medium " />
        <v-row class="d-flex flex-row-reverse">
            <v-col md="4">
                <v-text-field v-model="searchData" append-icon="mdi mdi-magnify" single-line
                    placeholder="Search name..." hide-details></v-text-field>
            </v-col>
        </v-row>

        <v-data-table :headers="headers" :items="dummyData" :items-per-page="5" class="elevation-5 mt-4"
            :search="searchData">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Data Guru</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="550px">
                        <template v-slot:activator="{ props }">
                            <v-btn class="mb-2 bg-orange" color="white" dark v-bind="props" prepend-icon="mdi mdi-plus">
                                Tambah Item
                            </v-btn>
                        </template>
                        <v-card class="py-5 px-2">
                            <v-card-title>
                                <span class="text-h5">Form Guru</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-text-field v-model="forms.userName" label="Nama Guru"></v-text-field>
                                    <v-text-field v-model="forms.nip" label="Nip"></v-text-field>
                                    <v-text-field v-model="forms.password" label="Password"></v-text-field>
                                    <v-text-field v-model="forms.nohp" label="No Handphone"></v-text-field>
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

            <!-- Searching -->
            <template v-slot:tfoot>
                <tr>
                    <td>
                        <v-text-field v-model="searchData" class="ma-2" density="compact" placeholder="Search name..."
                            hide-details></v-text-field>
                    </td>
                </tr>
            </template>

        </v-data-table>
    </v-container>
</template>

<script setup>
import MenuTitle from "../components/MenuTitle.vue"
import { ref } from "vue"

const forms = ref({
    userName: "",
    nip: "",
    password: "",
    nohp: ""
})

const dialogDelete = ref(false)
const dialog = ref(false)

function close() {
    dialog.value = false
}

function save() {
    dialog.value = false
    console.log("Data disimpan")
}

const headers = ref([
    {
        title: 'User Name',
        align: 'start',
        sortable: false,
        key: 'userName',
    },
    { title: 'NIP', key: 'nip' },
    { title: 'No Handphone', key: 'nohp' },
    { title: 'Actions', key: 'actions', sortable: false },
])

const searchData = ref("")

const dummyData = ref([
    { id: 1, userName: "Joko", nip: "12355", nohp: "12345678" },
    { id: 2, userName: "Andi", nip: "12345", nohp: "910111213" },
    { id: 3, userName: "Budi", nip: "13345", nohp: "141516171819" },
    { id: 4, userName: "Sista", nip: "212112", nohp: "77987187" },
    { id: 5, userName: "Luthfi", nip: "1122", nohp: "4545545445" },
    { id: 6, userName: "Gandi", nip: "3333", nohp: "445210047" },
    { id: 7, userName: "Dani", nip: "5488", nohp: "12414554450" },
])

function editItem(id) {
    console.log("Data diedit " + id)
    this.dialog = true
}
function deleteItem(id) {
    console.log("Data dihapus " + id)
    this.dialog = true
}

function submitData() {
    alert(JSON.stringify(forms.value))
}

</script>