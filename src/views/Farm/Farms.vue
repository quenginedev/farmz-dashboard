<template>
    <v-container>
        <v-card>
            <v-data-table
                :headers="[
                    {align: 'center', text: 'Farmer', value: 'farmer_id'},
                    {align: 'center', text: 'Name', value: 'name'},
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
                        <v-spacer/>
                        <v-btn rounded color="primary" text>add farm</v-btn>
                    </v-toolbar>
                </template>
                <template v-slot:item.name="{item}">
                    <v-edit-dialog
                        :return-value.sync="item.name"
                        @save="updateFarmName(item._id, item.name)"
                    >
                        {{item.name}}
                        <template v-slot:input>
                            <v-text-field
                                v-model="item.name"
                                label="Edit"
                                single-line
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </template>
                <template v-slot:item.farmer_id="{item}">
                    {{ item.farmer_id.full_name }}
                </template>
                <template v-slot:item.action="{item}">
                    <v-btn :to="{name: 'farmer', params: {id: item.farmer_id._id}}" rounded color="primary">View Farmer</v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'Farms',
    data: () => ({
        farms: []
    }),
    methods:{
      async updateFarmName(id, name){
            await this.axios.put(`farm/${id}`, {name})
      },
    },
    mounted() {
        const farmer_id = this.$route.params.farmer_id
        let request
        if (farmer_id)
            request = this.$axios.get(`/farm/farmer/${this.$route.params.farmer_id}`)
        else
            request = this.$axios.get('/farm')

        request.then(res=>{

            this.farms = res.data
        })
    }
}
</script>

<style scoped>

</style>
