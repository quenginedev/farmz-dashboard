<template>
    <v-container>
        <v-card>
            <v-card-title class="primary white--text">
                Farmer Registration
            </v-card-title>
            <v-stepper v-model="step">
                <v-stepper-header>
                    <v-stepper-step
                        :complete="step > 1"
                        step="1"
                    >
                        Personal Details
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                        :complete="step > 2"
                        step="2"
                    >
                        Status Details
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                        :complete="step > 3"
                        step="3"
                    >
                        Farm Details
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                        :complete="step > 4"
                        step="4"
                    >
                        Contact Details
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card>
                            <v-card-text>
                                <v-row justify="center">
                                    <v-col cols="12" sm="8" md="4" align-self="center">
                                        <v-row justify="center">
                                            <v-card @click="takePicture" height="200" width="200" rounded="pill">
                                                <div class="text-center mb-5" v-if="!form.picture">
                                                    <v-icon size="120" color="primary" class="mt-7">mdi-camera</v-icon>
                                                    <p>Take Picture</p>
                                                </div>
                                                <v-img aspect-ratio="1" v-else alt="profile pic" :src="form.picture"/>
                                            </v-card>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="form.full_name" label="Full name" filled
                                                      rounded></v-text-field>
                                        <v-menu
                                            max-width="320"
                                            rounded="xl"
                                            v-model="show.date_of_birth"
                                            :close-on-click="false"
                                            :close-on-content-click="false"
                                        >
                                            <template v-slot:activator="{on}">
                                                <v-text-field @click="show.date_of_birth = true" readonly v-model="form.date_of_birth" label="Age" filled rounded></v-text-field>
                                            </template>
                                            <v-card>
                                                <v-date-picker full-width v-model="form.date_of_birth"/>
                                                <v-card-actions>
                                                    <v-btn @click="show.date_of_birth = false" rounded block color="primary" :disabled="!form.date_of_birth">Continue</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-menu>
                                        <v-select v-model="form.gender" label="Gender" filled rounded :items="[
                                            {text: 'Male', value: 'male'},
                                            {text: 'Female', value: 'female'},
                                        ]"/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-select v-model="form.lang" label="Main speaking langudate_of_birth" rounded
                                                  :items="[
                                                      'English',
                                                      'Twi',
                                                      'Ga',
                                                      'Other'
                                                  ]"
                                                  filled/>
                                        <v-text-field v-model="form.community" label="Community" filled
                                                      rounded></v-text-field>
                                        <v-select v-model="form.region"
                                                  :items="options.regions"
                                                  item-value="_id"
                                                  item-text="region"
                                                  label="Region" filled
                                                      rounded></v-select>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                                <v-btn @click="step++" x-large color="primary" rounded>
                                    Next
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-select v-model="form.household_status" rounded filled
                                                  :items="[
                                                      'Household Status Head',
                                                      'Household Status Support',
                                                  ]"
                                                  label="House hold status"/>
                                        <v-text-field v-model.number="form.dependents_number" type="number" rounded filled
                                                      label="Number of dependents"/>
                                        <v-select v-model="form.marital_status" rounded filled
                                                  label="Marital status"
                                                  :items="['Married', 'Single', 'Divorced', 'Widow', 'Widower']"
                                        />
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <v-select v-model="form.employment_status" rounded filled
                                                  :items="options.employment_status"
                                                  label="Employment Status"/>

                                        <v-select
                                            v-model="form.educational_level" rounded filled
                                            :items="options.educational_level"
                                            label="Educational Level"/>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions class="justify-space-between">
                                <v-btn @click="step--" depressed x-large rounded>Back</v-btn>
                                <v-btn @click="step++" x-large rounded color="primary">Next</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-card>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model.number="form.yrs_farming" type="number"
                                                      label="Years in farming" rounded
                                                      filled/>
                                        <v-text-field v-model="form.source_income" label="Other source of income"
                                                      rounded filled/>
                                        <v-text-field v-model.number="form.farms" type="number"
                                                      label="Number of Farms" rounded filled/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-for="(location, index) in form.farm_location"
                                            :key="index"
                                            v-model="form.farm_location[index]"
                                            label="Farm location"
                                            rounded filled>
                                            <v-icon color="primary" :disabled="!location"
                                                    v-if="form.farm_location.length - 1 === index"
                                                    slot="append" @click="form.farm_location.push('')">mdi-plus
                                            </v-icon>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-select
                                            v-model="form.trainee_status" label="Trainee status"
                                            :items="['Owner', 'Worker']"
                                            rounded
                                            filled/>
                                        <v-select v-model="form.level_training"
                                                  :items="[1,2,3,4]"
                                                  rounded
                                                  label="Level of training"
                                                  filled/>
                                        <v-text-field v-model="form.buying_company" label="Cocoa buying company" rounded
                                                      filled/>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions class="justify-space-between">
                                <v-btn @click="step--" depressed rounded x-large>Back</v-btn>
                                <v-btn @click="step++" rounded x-large color="primary">Next</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-content>
                    <v-stepper-content step="4">
                        <v-card>
                            <v-card-text>
                                <v-row justify="center">
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="form.phone" label="Phone number" rounded filled/>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="form.momo" label="Momo number" rounded filled/>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions class="justify-space-between">
                                <v-btn @click="step--" depressed rounded x-large>Back</v-btn>
                                <v-btn @click="saveForm" :loading="loading" rounded x-large color="primary">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-card>
        {{form.date_of_birth}}
    </v-container>
</template>

<script>
import {Plugins, CameraResultType} from '@capacitor/core'
import {defineCustomElements} from '@ionic/pwa-elements/loader'

const {Camera} = Plugins

export default {
    name: 'AddFarmer',
    data: () => ({
        step: 1,
        loading: true,
        show: { date_of_birth: false },
        options: {
            regions: [],
            employment_status: [
                {value: 'artisan', text: 'Artisan'},
                {value: 'farming', text: 'Farming'},
                {value: 'others', text: 'Others'}
            ],
            educational_level: [
                {value: 'primary', text: 'Primary'},
                {value: 'jhs', text: 'JHS'},
                {value: 'shs/vocational', text: 'SHS/Vocational'},
                {value: 'tertiary', text: 'Tertiary'},
                {value: 'none', text: 'None'}
            ]
        },
        form: {
            picture: '',
            farm_location: ['']
        }
    }),
    methods: {
        saveForm() {
            this.loading = true
            this.$axios.post('/farmer', this.form)
                .then(res => {
                    console.log('saved farmer', res.data)
                    this.$router.push({name: 'farmers'})
                }).catch(err => {
                console.error(err)
            }).finally(() => {
                this.loading = false
            })
        },
        async takePicture() {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.DataUrl
            })

            this.form.picture = image.dataUrl
        }
    },

    mounted() {
        defineCustomElements(window)
        this.loading = true
        this.$axios.get('/region')
            .then(res => {
                this.options.regions = res.data
            }).finally(() => {
            this.loading = false
        })
    }
}
</script>

<style scoped>

</style>
