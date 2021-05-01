<template>
    <v-container>
        <v-row justify="center">
            <v-progress-circular v-if="loading" indeterminate color="primary" size="72"/>
            <v-card v-else-if="farmer" max-width="520" min-width="320" rounded="lg" class="mt-5">
                <v-img :src="farmer.picture"/>
                <v-card-title class="justify-start">
                    <p class="text-h4">{{ farmer.full_name }}</p>
                </v-card-title>
                <v-card-text>
                    <div class="">
                        <p class="body-1">
                            <v-icon left>mdi-calendar</v-icon>
                            Date of birth: {{ getDate(farmer.date_of_birth) }}
                        </p>
                        <p class="body-1">
                            <v-icon left>mdi-phone</v-icon>
                            Phone number: {{ farmer.phone }}
                        </p>
                        <p class="body-1">
                            <v-icon left>mdi-gender-male-female</v-icon>
                            Gender: {{ farmer.gender }}
                        </p>
                        <p class="body-1">
                            <v-icon left>mdi-map-marker</v-icon>
                            Community: {{ farmer.community }}
                        </p>
                    </div>
                    <v-divider/>
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
        relativeTime(date){
            return dayjs(date).fromNow(true)
        }
    },
    mounted() {
        this.$axios.get(`farmer/${this.$route.params.id}`)
            .then(res => {
                this.farmer = res.data
            }).finally(_ => {
            this.loading = false
        })
    }
}
</script>

<style scoped>
    li{
        margin-top: 10px;
    }
</style>
