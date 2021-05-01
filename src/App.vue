<template>
    <v-app>
        <v-app-bar app flat color="primary" dark>
            <v-icon @click="$router.go(-1)" v-if="$route.name !== 'home'" left>mdi-arrow-left</v-icon>
            <v-icon v-else left>mdi-home</v-icon>
            <v-spacer/>
            <v-icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">mdi-theme-light-dark</v-icon>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: 'App',
    created() {
        this.$vuetify.theme.dark = false
    },
    data: () => ({})
}
</script>
