<template>
    <v-container>
        <v-row justify="center" class="my-5 hidden-print-only">
            <v-btn :loading="loading" :disabled="!farmer" color="warning" depressed @click="createPDF" rounded
                   class="mb-5 hidden-print-only">
                <v-icon left>mdi-file-pdf</v-icon>
                Print/Download
            </v-btn>
        </v-row>
        <AgreementContent v-if="!loading && farmer" :farmer="farmer"/>
    </v-container>
</template>

<script>
import AgreementContent from '@/views/Farmer/AgreementContent'

export default {
    name: 'Agreement',
    components: {AgreementContent},
    data() {
        return {
            loading: true,
            farmer: null
        }
    },
    methods: {
        createPDF() {
            const doc = document.getElementById('doc')
            window.print()
        }
    },
    created() {
        this.loading = true
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

</style>
