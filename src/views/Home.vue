<template>
    <v-container>
        <v-row >
            <v-col cols="12" sm="4" md="3" lg="2">
                <v-card :loading="loading" :to="{name: 'farmers'}" class="text-center" rounded="lg">
                    <v-avatar tile size="120">
                        <v-img :src="require('@/assets/icons/006-farmer.svg')"/>
                    </v-avatar>
                    <v-card-title class="justify-center">
                        {{ counter.farmers }} Farmer(s)
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4" md="3" lg="2">
                <v-card :loading="loading" :to="{name: 'farms'}" class="text-center" rounded="lg">
                    <v-avatar tile size="120">
                        <v-img :src="require('@/assets/icons/005-farm.svg')"/>
                    </v-avatar>
                    <v-card-title class="justify-center">
                        {{ counter.farms }} Farm(s)
                    </v-card-title>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
    name: 'Home',
    data: () => ({
        loading: false,
        counter: {
            farmers: 0,
            farms: 0
        }
    }),
    mounted() {
        this.loading = true
        Promise.all([
            this.$axios.get('/farmer/count'),
            this.$axios.get('/farm/count')
        ])
            .then(res => {
                this.counter.farmers = res[0].data
                this.counter.farms = res[1].data
            }).catch(err => {
            console.error(err)
        }).finally(() => {
            this.loading = false
        })
    }
}
</script>
