<template>
    <DashboardLayout>
        <v-container fluid>
            <MenuTitle msg="Menu | Administrasi Guru" />
            <div class="d-flex flex-row-reverse mb-3">
                <v-dialog max-width="500">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn v-bind="activatorProps" color="deep-orange" text="Open Dialog" variant="flat"
                            prepend-icon="mdi mdi-plus">Tambah
                            Data</v-btn>
                    </template>

                    <template v-slot:default="{ isActive }">
                        <v-card>
                            <v-card-title>Form Tambah Data Buku</v-card-title>
                            <v-card-text>
                                <v-form validate-on="submit lazy" @submit.prevent="submitData">
                                    <v-text-field label="Jenis Buku" v-model="forms.jenisBuku" required></v-text-field>
                                    <v-text-field label="Link Buku" v-model="forms.linkBuku" required></v-text-field>
                                    <v-text-field label="Tahun Ajaran" v-model="forms.tahunAjaran"
                                        required></v-text-field>
                                    <v-btn class="mt-2 mb-5 bg-success" text="Tambah Data Buku" type="submit"
                                        block></v-btn>
                                </v-form>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn text="Batal" class="bg-error" @click="isActive.value = false"></v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
            </div>

            <v-data-table :headers="headers" class="elevation-5 mt-5 pa-8" :items="dataBuku" item-key="id">

                <!-- <template v-slot:item="{ item }">
                    <tr>
                        <td
                            :class="{ 'text-blue': item.jenisBuku === 1, 'text-orange': item.jenisBuku === 2, 'text-green': item.jenisBuku === 3 }">
                            {{ item.jenisBuku === 1 ? "Buku 1" : item.jenisBuku === 2 ? "Buku 2" : "Buku 3" }}</td>
                        <td>{{ item.linkBuku }}</td>
                        <td>{{ item.tahunAjaran }}</td>
                        <td>
                            <v-btn text="Hapus" color="error" small class="mx-3" @click="deteleItem(item.id)"></v-btn>
                        </td>
                    </tr>
                </template> -->

                <template v-slot:item.actions="{ item }">
                    <v-btn density="comfortable" icon="mdi mdi-delete" color="error" class="mx-2"
                        @click="deleteItem(item.id)"></v-btn>
                </template>
            </v-data-table>
        </v-container>
    </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import MenuTitle from '../components/MenuTitle.vue';
import { ref } from 'vue'


const forms = ref({
    jenisBuku: '',
    linkBuku: '',
    tahunAjaran: '',
})

const headers = ref([
    {
        title: 'Jenis Buku',
        align: 'start',
        sortable: false,
        key: 'jenisBuku',
    },
    {
        title: 'Link Buku',
        key: 'linkBuku',
        align: 'start',
        sortable: false,
    },
    {
        title: 'Tahun Ajaran',
        key: 'tahunAjaran',
        align: 'start',
        sortable: false,
    },
    { title: 'Aksi', key: 'actions', sortable: false },
])

const dataBuku = ref([
    { id: 1, jenisBuku: "Buku 1", linkBuku: "https://www.google.com", tahunAjaran: "2023/2024" },
    { id: 2, jenisBuku: "Buku 2", linkBuku: "https://www.google.com", tahunAjaran: "2023/2024" },
    { id: 3, jenisBuku: "Buku 3", linkBuku: "https://www.google.com", tahunAjaran: "2023/2024" },
    { id: 4, jenisBuku: "Buku 1", linkBuku: "https://www.google.com", tahunAjaran: "2023/2024" },
    { id: 5, jenisBuku: "Buku 2", linkBuku: "https://www.google.com", tahunAjaran: "2023/2024" },
    { id: 6, jenisBuku: "Buku 3", linkBuku: "https://www.google.com", tahunAjaran: "2023/2024" },
])

function deleteItem(id) {
    // const index = dataBuku.value.findIndex((item) => item.id === id)
    // dataBuku.value.splice(index, 1)
    console.log("Data dihapus " + id)
}

function submitData() {
    // tambahkan data ke list
    alert(JSON.stringify(forms.value))
    // dataBuku.value.push({
    //     id: dataBuku.value.length + 1,
    //     jenisBuku: forms.value.jenisBuku,
    //     linkBuku: forms.value.linkBuku,
    //     tahunAjaran: forms.value.tahunAjaran,
    // })
}
</script>