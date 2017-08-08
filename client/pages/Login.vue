<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <h1>Login</h1>
                <hr>
                <form v-on:submit.prevent="submit">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input v-validate.disabled data-vv-rules="required" class="form-control"
                               v-model="username" name="username" id="username" placeholder="Username"
                               data-vv-as="username">
                        <span v-show="errors.has('username')" class="alert-danger">{{ errors.first('username') }}</span>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input v-validate.disabled data-vv-rules="required" name="password" type="password"
                               class="form-control" v-model="password" id="password" placeholder="********">
                        <span v-show="errors.has('password')" class="alert-danger">{{ errors.first('password') }}</span>
                    </div>
                    <button class="btn btn-primary">Login</button>
                    <hr>
                    <a href="#">Forgot your password?</a>
                </form>
            </div>
            <div class="col-md-4"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue, {ComponentOptions} from 'vue'
    import {login} from "../components/authen";

    interface LoginComponent extends Vue {
        $cookie: any;
        errors: any;
        username: string;
        password: string
    }

    export default {
        data() {
            return {
                error: null,
                username: null,
                password: null
            };
        },
        created() {
            if (this.$store.state.user.id) {
                this.$router.push('/');
            }
        },
        methods: {
            submit() {
                this.$validator.validateAll();
                if (!this.errors.any()) {
                    const credentials = {
                        username: this.username,
                        password: this.password
                    };

                    login(credentials).then(user => {
                        if (user && user.token) {
                            this.$cookie.set('token', user.token);
                            this.$store.commit('SET_USER', user);
                            this.$router.push('/');
                        }
                    });
                }
            }
        }
    } as ComponentOptions<LoginComponent>
</script>

<style lang="css">
</style>