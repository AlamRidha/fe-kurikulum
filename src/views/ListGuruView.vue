<template>
    <DashboardLayout>
        <v-container fluid>
            <MenuTitle msg="Menu | List Guru" class="text-subtitle-1 font-weight-medium" />
            <div class="d-flex flex-row-reverse mb-3">
                <v-dialog max-width="500">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn v-bind="activatorProps" color="deep-orange" text="Open Dialog" variant="flat"
                            prepend-icon="mdi mdi-plus">Tambah
                            Data</v-btn>
                    </template>

                    <template v-slot:default="{ isActive }">
                        <v-card>
                            <v-card-title>Form Tambah Data Guru</v-card-title>
                            <v-card-text>
                                <v-form validate-on="submit lazy" @submit.prevent="submitData">
                                    <v-text-field v-model="forms.userName" label="Nama Guru"></v-text-field>
                                    <v-text-field v-model="forms.nip" label="NIP "></v-text-field>
                                    <v-text-field v-model="forms.password" label="Password"></v-text-field>
                                    <v-text-field v-model="forms.nohp" label="No Handphone"></v-text-field>
                                    <v-btn class="mt-2 mb-5 bg-success" text="Tambah Data Guru" type="submit"
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

            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">
                            Nama
                        </th>
                        <th class="text-left">
                            NIP
                        </th>
                        <th class="text-left">
                            No Hp
                        </th>
                        <th class="text-left">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Tes</td>
                        <td>Data</td>
                        <td>0813284848</td>
                        <td>
                            <v-btn density="comfortable" icon="mdi mdi-pen" color="success" class="mx-2"></v-btn>
                            <v-btn density="comfortable" icon="mdi mdi-delete" color="error" class="mx-2"></v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-container>
    </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '../layouts/DashboardLayout.vue';
import MenuTitle from "../components/MenuTitle.vue"
import { ref } from "vue"

const forms = ref({
    userName: "",
    nip: "",
    password: "",
    nohp: ""
})

function submitData() {
    alert(JSON.stringify(forms.value))
}

</script>