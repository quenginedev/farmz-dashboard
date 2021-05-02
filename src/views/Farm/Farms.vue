<template>
    <v-container>
        <v-card>
            <v-data-table
                :headers="[
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
                                      dense></v-text-field>
                        <!--                        <v-spacer/>-->
                        <!--                        <v-btn rounded color="primary" text>add farm</v-btn>-->
                    </v-toolbar>
                </template>
                <template v-slot:item.name="{item}">
                    <v-edit-dialog
                        :return-value.sync="item.name"
                        @save="updateFarmName(item._id, item.name)"
                    >
                        {{ item.name }}
                        <template v-slot:input>
                            <v-text-field
                                v-model="item.name"
                                label="Edit"
                                single-line
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>
                <template v-slot:item.location="{item}">
                    <v-edit-dialog
                        :return-value.sync="item.location"
                        @save="updateFarmLocation(item._id, item.location)"
                    >
                        {{ item.location }}
                        <template v-slot:input>
                            <v-text-field
                                v-model="item.location"
                                label="Edit"
                                single-line
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>
                <template v-slot:item._farmer_id="{item}">
                    {{ item._farmer_id.full_name }}
                </template>
                <template v-slot:item.farmer="{item}">
                    <v-btn :to="{name: 'farmer', params: {farmer_id: item._farmer_id._id}}" rounded text color="primary" block>
                        <v-icon left>mdi-eye</v-icon>
                        View
                    </v-btn>
                </template>

                <template v-slot:item.action="{item}">
                    <v-btn @click="showEdit(item)" icon color="info">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn disabled icon color="error">
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
                    <v-btn block color="primary" rounded large>Update</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    name: 'Farms',
    data: () => ({
        farms: [],
        show_edit: true,
        editableFarm: {}
    }),
    methods: {
        showEdit(farm){
            this.editableFarm = farm
            this.show_edit = true
        },
        updateFarmName(id, name) {
            this.axios.put(`farm/${id}`, {name})
                .catch(this.showError)
        },
        updateFarmLocation(id, location) {
            this.axios.put(`farm/${id}`, {location})
                .catch(this.showError)
        },
        showError(err){
            this.$root.$emit('error', err.response ? err.response.data.message : err.message)
        }
    },
    created() {
        const farmer_id = this.$route.params.farmer_id
        let request
        if (farmer_id)
            request = this.$axios.get(`/farm/farmer/${this.$route.params.farmer_id}`)
        else
            request = this.$axios.get('/farm')

        request.then(res => {
            this.farms = res.data
        })
    }
}
</script>

<style scoped>

</style>
