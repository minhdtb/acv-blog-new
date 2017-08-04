<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <h1>Login</h1>
                <hr>
                <form v-on:submit.prevent="submit">
                    <div v-show="error" class="alert alert-danger" role="alert">
                        <strong>Oh snap!</strong> {{ error }}
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input v-validate.disabled  data-vv-rules="required|email" type="text" class="form-control"
                               v-model="body.email" name="email" id="email" placeholder="sample@email.com"
                               data-vv-as="email">
                        <span v-show="errors.has('email')" class="alert-danger">{{ errors.first('email') }}</span>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input v-validate.disabled data-vv-rules="required" name="password" type="password"
                               class="form-control" v-model="body.password" id="password" placeholder="********">
                        <span v-show="errors.has('password')" class="alert-danger">{{ errors.first('password') }}</span>
                    </div>
                    <button class="btn btn-primary" type="submit">Login</button>
                    <hr>
                    <a href="/forgotpassword">Forgot your password?</a>
                </form>
            </div>
            <div class="col-md-4"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue, {ComponentOptions} from 'vue'

    interface LoginComponent extends Vue {
        validator: any;
        errors: any;
        body: any;
    }

    export default {
        data() {
            return {
                error: null,
                body: {
                    email: null,
                    password: null
                }
            };
        },
        methods: {
            submit() {
                console.log('aaaaaa');
                this.$validator.validateAll();
                if (!this.errors.any()) {
                    const credentials = {
                        email: this.body.email,
                        password: this.body.password
                    };
                }
            }
        }
    } as ComponentOptions<LoginComponent>
</script>

<style lang="css">
</style>