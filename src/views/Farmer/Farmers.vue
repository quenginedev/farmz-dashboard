<template>
    <v-container>
        <v-card>
            <v-data-table
                class="rounded"
                :headers="headers"
                :items="farmers"
                @click:row="goToDetails"
            >
                <template v-slot:top>
                    <v-toolbar flat rounded color="primary" dark>
                        <v-toolbar-title>Farmers</v-toolbar-title>
                        <v-spacer/>
                        <v-text-field placeholder="Search" prepend-inner-icon="mdi-magnify" hide-details filled rounded
                                      dense></v-text-field>
                        <v-spacer/>
                        <v-btn text class="primary" :to="{name: 'add-farmer'}" rounded>
                            <v-icon left>mdi-plus</v-icon>
                            Add Farmer
                        </v-btn>
                        <v-btn icon>
                            <a :href="`${config.serverURL}/farmer/download`">
                                <v-icon color="white">mdi-microsoft-excel</v-icon>
                            </a>
                        </v-btn>
                    </v-toolbar>
                </template>
                <template v-slot:item.avatar="{item}">
                    <v-avatar size="72">
                        <v-img :src="item.picture"/>
                    </v-avatar>
                </template>
                <template v-slot:item.farmer_id="{item}">
                    <v-chip color="primary">
                        {{ item.farmer_id }}
                    </v-chip>
                </template>
                <template v-slot:item.phone="{item}">
                    <a :href="`tel:${item.phone}`">{{ item.phone }}</a>
                </template>
                <template v-slot:item.age="{item}">
                    <span>{{ getAge(item.date_of_birth) }}</span>
                </template>
                <template v-slot:item.farms="{item}">
                    <v-btn outlined :to="{name: 'farmer-farms', params: {farmer_id: item._id}}" color="primary" rounded
                           block>Farm
                    </v-btn>
                </template>
                <template v-slot:item.details="{item}">
                    <v-btn @click.stop="disableFarmer(item)" :loading="item.disabling" color="error" depressed rounded
                           block :outlined="!item.disabled">
                        {{item.disabled ? 'Disabled' : 'Disable'}}
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>
<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import config from '@/config'

dayjs.extend(relativeTime)
export default {
    name: 'farmers',
    data: () => ({
        disabling_farmer: false,
        headers: [
            {align: 'center', text: 'Profile Img', value: 'avatar'},
            {align: 'center', text: 'ID', value: 'farmer_id'},
            {align: 'center', text: 'Full Name', value: 'full_name'},
            {align: 'center', text: 'Age', value: 'age'},
            {align: 'center', text: 'Gender', value: 'gender'},
            {align: 'center', text: 'Community', value: 'community'},
            {align: 'center', text: 'Language', value: 'lang'},
            {align: 'center', text: 'Phone Number', value: 'phone'},
            {align: 'center', text: 'Farms', value: 'farms'},
            {align: 'center', text: 'Details', value: 'details'}
        ],
        config,
        farmers: [],
        downloading: false
    }),
    methods: {
        getAge(date) {
            return dayjs(date).fromNow(true)
        },
        goToDetails(farmer, options) {
            this.$router.push({name: 'farmer', params: {farmer_id: farmer._id}})
        },
        async disableFarmer(item) {
            item.disabling = !item.disabling
            this.$axios.put(`/farmer/${item._id}`, {disabled: !item.disabled})
            item.disabled = !item.disabled
            item.disabling = !item.disabling
        },
        async downloadFarmersCSV(){
            this.downloading = true
            console.log(await this.$axios.get('/farmer/download'))
            this.downloading = false
        }
    },
    mounted() {
        this.$axios.get('/farmer')
            .then(res => {
                this.farmers = (res.data || []).map(farmer => ({...farmer, disabling: false}))
            }).catch(err => {
            console.error(err)
        })
    }
}
</script>
