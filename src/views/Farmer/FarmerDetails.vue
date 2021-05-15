<template>
    <v-container>
        <v-row justify="center">
            <v-progress-circular v-if="loading" indeterminate color="primary" size="72"/>
            <v-card v-else-if="farmer" rounded="lg" class="mt-5">
                <v-row justify="center" align="center">
                    <v-col cols="12" sm="6" md="4">
                        <v-img width="650" aspect-ratio="1" :src="farmer.picture"/>
                    </v-col>
                    <v-col col="12" sm="6" md="8">
                        <v-card-title class="justify-start text-h4">
                            <span>{{ farmer.full_name }}</span>
                            <v-spacer/>
                            <v-btn :to="{name: 'agreement'}" rounded text color="red">
                                <v-icon left>mdi-file-pdf</v-icon>
                                agreement
                            </v-btn>
                        </v-card-title>
                        <v-card-text class="">
                            <p class="body-1">
                                <v-icon left>mdi-calendar</v-icon>
                                Date of birth: {{ getDate(farmer.date_of_birth) }}
                            </p>
                            <p class="body-1">
                                <v-icon left>mdi-phone</v-icon>
                                Phone number: <a class="text-decoration-none" :href="`tel:${farmer.phone}`">{{ farmer.phone }}</a>
                            </p>
                            <p class="body-1">
                                <v-icon left>mdi-gender-male-female</v-icon>
                                Gender: {{ farmer.gender }}
                            </p>
                            <p class="body-1">
                                <v-icon left>mdi-map-marker</v-icon>
                                Address: {{ farmer.community }}
                            </p>
                            <p class="body-1">
                                <v-icon left>mdi-barn</v-icon>
                                Farms:
                                <v-btn color="success" rounded text :to="{name: 'farmer-farms', params: {farmer_id: farmer._id}}">
                                    {{ farmer.farms }} <v-icon right>mdi-eye</v-icon>
                                </v-btn>
                            </p>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-divider/>
                <v-card-text>
                    <ul>
                        <li>Household status: {{ farmer.household_status }}</li>
                        <li>Number of dependents: {{ farmer.dependents_number }}</li>
                        <li>Marital status: {{ farmer.marital_status }}</li>
                        <li>Employment: {{ farmer.employment_status }}</li>
                        <li>Education: {{ farmer.educational_level }}</li>
                        <li>Years farming: {{ relativeTime(farmer.yrs_farming) }}</li>
                        <li>Income source: {{ farmer.source_income }}</li>
                        <li>Trainee status: {{ farmer.trainee_status }}</li>
                        <li>Training level: {{ farmer.level_training }}</li>
                        <li>Buying Company: {{ farmer.buying_company }}</li>
                    </ul>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default {
    name: 'FarmerDetails',
    data: () => ({
        farmer: null,
        loading: true
    }),
    methods: {
        getDate(date) {
            return dayjs(date).format('DD MMM, YYYY')
        },
        relativeTime(date) {
            return dayjs(date).fromNow(true)
        }
    },
    mounted() {
        this.$axios.get(`farmer/${this.$route.params.farmer_id}`)
            .then(res => {
                console.log(res.data)
                this.farmer = res.data
            }).finally(_ => {
            this.loading = false
        })
    }
}
</script>

<style scoped>
li {
    margin-top: 10px;
}
</style>
