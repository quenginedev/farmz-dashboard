<template>
    <v-app>
        <v-snackbar app bottom rounded="pill" :color="error.color" v-model="error.show" class="text-capitalize">
            <v-icon left>mdi-alert-circle</v-icon>
            {{error.message}}
        </v-snackbar>
        <div v-if="isAuth">
            <v-app-bar app flat color="primary" dark>
                <v-icon @click="$router.go(-1)" v-if="$route.name !== 'home'" left>mdi-arrow-left</v-icon>
                <v-icon v-else left>mdi-home</v-icon>
                <v-spacer/>
                <v-btn icon>
                    <v-icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">mdi-theme-light-dark</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon @click="logout">mdi-logout-variant</v-icon>
                </v-btn>
            </v-app-bar>
            <v-main>
                <router-view/>
            </v-main>
        </div>
        <Login v-else/>
    </v-app>
</template>

<script>

import Login from '@/components/Login'
export default {
    name: 'App',
    components: {Login},
    data: () => ({
        isAuth : false,
        error: {
            color: 'red',
            show: false,
            message: 'Hello'
        }
    }),
    methods:{
        logout(auth){
            this.$firebase.auth().signOut()
        }
    },
    created() {
        this.$firebase.auth().onAuthStateChanged(user=>{
            this.isAuth = !!user
        })
        this.$root.$on('error', (message)=>{
            this.error = {
                color: 'red',
                show: true,
                message
            }
        })
    },
}
</script>
