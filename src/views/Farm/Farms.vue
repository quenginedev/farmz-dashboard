<template>
    <v-container>
        <v-card :loading="loading.list">
            <v-data-table
                :headers="[
                    {text: 'Farm ID', value: 'farm_id'},
                    {text: 'Farmer', value: '_farmer_id'},
                    {text: 'Name', value: 'name'},
                    {text: 'Location', value: 'location'},
                    {align: 'center', text: 'Farmer', value: 'farmer'},
                    {align: 'center', text: 'Action', value: 'action'},
                ]"
                :items="farms"
            >
                <template v-slot:top>
                    <v-toolbar flat rounded color="primary" dark>
                        <v-toolbar-title>Farms</v-toolbar-title>
                        <v-spacer/>
                        <v-text-field placeholder="Search" prepend-inner-icon="mdi-magnify" hide-details filled rounded
                                      dense/>
                        <v-spacer/>
                        <v-btn rounded color="primary" large depressed :icon="isMobile" v-if="farmer_id">
                            <v-icon left color="white">mdi-plus</v-icon>
                            <span v-if="!isMobile">
                                Create
                            </span>
                        </v-btn>
                    </v-toolbar>
                </template>
                <template v-slot:item.name="{item}">
                    {{ item.name }}
                </template>
                <template v-slot:item.location="{item}">
                    {{ item.location }}
                </template>
                <template v-slot:item._farmer_id="{item}">
                    {{ item._farmer_id.full_name }}
                </template>
                <template v-slot:item.farmer="{item}">
                    <v-btn :to="{name: 'farmer', params: {farmer_id: item._farmer_id._id}}" rounded text color="primary"
                           block>
                        <v-icon left>mdi-eye</v-icon>
                        View
                    </v-btn>
                </template>

                <template v-slot:item.action="{item}">
                    <v-btn @click="showEditable(item)" icon color="info">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn @click="showDeletable(item)" icon color="error">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="show_edit" max-width="520">
            <v-card>
                <v-card-title class="mb-4">
                    Edit Farm
                    <v-spacer/>
                    <v-icon @click="show_edit = false">mdi-close</v-icon>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="editableFarm.name" rounded filled label="Name"></v-text-field>
                    <v-text-field v-model="editableFarm.location" rounded filled label="Location"></v-text-field>
                    <v-btn @click="updateFarm" :loading="loading.updating" block color="primary" rounded large>Update
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="show_delete_alert" max-width="520" content-class="rounded-xl">
            <v-card color="warning" dark rounded="xl">
                <v-card-title>
                    Confirm Deletion
                    <v-spacer></v-spacer>
                    <v-icon @click="show_delete_alert = false">mdi-close</v-icon>
                </v-card-title>
                <v-card-text>
                    Deleting this farm is undoable. Do you wish to proceed?
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="show_delete_alert = false" text rounded large>Cancel</v-btn>
                    <v-spacer/>
                    <v-btn @click="deleteFarm" color="error" depressed rounded large>Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    name: 'Farms',
    computed: {
        isMobile() {
            return this.$vuetify.breakpoint.smAndDown
        },
        farmer_id() {
            return this.$route.params.farmer_id
        }
    },
    data: () => ({
        farms: [],
        show_edit: false,
        show_delete_alert: false,
        loading: {
            list: false,
            updating: false
        },
        editableFarm: {},
        deletable_farm_id: null
    }),
    methods: {
        fetchFarms() {
            let request
            if (this.farmer_id)
                request = this.$axios.get(`/farm/farmer/${this.farmer_id}`)
            else
                request = this.$axios.get('/farm')

            this.loading.list = true
            request
                .then(res => {
                    this.farms = res.data
                    console.log(this.farms)
                })
                .catch(this.showError)
                .finally(() => {
                    this.loading.list = false
                })
        },
        showEditable(farm) {
            this.editableFarm = {...farm}
            this.show_edit = true
        },
        closeEditable() {
            this.editableFarm = {}
            this.show_edit = false
        },
        updateFarm() {
            this.loading.updating = false
            const {id, farm} = this.farmUpdateFormat(this.editableFarm)
            this.axios.put(`farm/${id}`, farm)
                .then(() => {
                    this.closeEditable()
                    this.fetchFarms()
                })
                .catch(this.showError)
                .finally(() => {
                    this.loading.updating = false
                })
        },
        showDeletable(farm) {
            this.deletable_farm_id = farm._id
            this.show_delete_alert = true
        },
        closeDeletable() {
            this.deletable_farm_id = null
            this.show_delete_alert = false
        },
        deleteFarm() {
            this.$axios.delete(`farm/${this.deletable_farm_id}`)
                .then(() => {
                    this.closeDeletable()
                    this.fetchFarms()
                })
        },
        farmUpdateFormat(new_farm) {
            const farm = {...new_farm}
            const id = farm._id
            delete farm._id
            delete farm._farmer_id
            delete farm.__v
            return {id, farm}
        },
        showError(err) {
            this.$root.$emit('error', err.response ? err.response.data.message : err.message)
        }
    },
    created() {
        this.fetchFarms()
    }
}
</script>

<style scoped>

</style>
