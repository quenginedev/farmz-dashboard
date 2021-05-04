<template>
    <v-main>
        <v-row class="fill-height bg" justify="center" align="center">
            <v-card max-width="520" min-width="350" rounded="xl">
                <form @submit.prevent="processAuth">
                    <v-card-title class="primary--text text-h3 mb-5 justify-center">
                        Login
                        <v-spacer/>
                        <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
                            <v-icon>mdi-theme-light-dark</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text class="text-center">
                        <v-text-field v-model="email" filled rounded label="Email" type="email" required/>
                        <v-text-field v-if="!is_reset" v-model="password" filled rounded label="Password"
                                      type="password" required/>
                        <v-btn :loading="loading" block color="primary" large rounded type="submit">
                            <span v-if="!is_reset">Login</span>
                            <span v-else>Reset</span>
                        </v-btn>
                        <p class="my-5">OR</p>
                        <v-btn @click="is_reset = !is_reset" block color="primary" text large rounded type="submit">
                            <span v-if="!is_reset">Reset Password</span>
                            <span v-else>Login</span>
                        </v-btn>
                    </v-card-text>
                </form>
            </v-card>
        </v-row>
    </v-main>
</template>

<script>
export default {
    name: 'Login',
    data: () => ({
        email: '',
        password: '',
        is_reset: false,
        loading: false
    }),
    methods: {
        async processAuth() {
            this.loading = true
            if (!this.is_reset)
                await this.loginUser()
            else
                await this.resetPassword()
            this.loading = false
        },
        loginUser() {
            return this.$firebase.auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .catch(this.showError)
        },
        resetPassword() {
            return this.$firebase.auth().sendPasswordResetEmail(this.email)
                .then(()=>{
                    this.is_reset = false
                })
                .catch(this.showError)
        },
        showError(err) {
            console.error(err)
            this.$root.$emit('error', err.message)
        }
    }
}
</script>

<style scoped>
.bg {
    background: linear-gradient(90deg, #81FBB8, #28C76F);
}
</style>
