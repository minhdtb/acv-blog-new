<template>
    <div>
        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <router-link class="navbar-brand" to="/" exact>
                        <img class="logo" src="/public/logo.png" alt="logo">
                    </router-link>
                </div>
                <ul class="nav navbar-nav">
                    <router-link tag="li" activeClass="active" :to="{ path: '/posts' }">
                        <a>Posts</a>
                    </router-link>
                    <router-link tag="li" activeClass="active" :to="{ path: '/tags' }">
                        <a>Tags</a>
                    </router-link>
                </ul>

                <router-link v-if="!is_auth()" :to="{ path: '/login' }" class="btn btn-default btn-login">
                    Login
                </router-link>

                <a v-if="is_auth()" @click="logout()" class="btn btn-default btn-login">
                    Logout
                </a>
            </div>
        </nav>
        <div class="container">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script lang="js">
    export default {
        methods: {
            is_auth() {
                console.log('client: ' + this.$store.state.user.id);
                return !!this.$store.state.user.id;
            },
            logout() {
                this.$cookie.delete('token');
                this.$store.commit('SET_USER', {});
                this.$router.push('/');
            }
        }
    }
</script>
<style lang="css">
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.1s ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }

    .navbar-brand {
        padding-top: 10px;
    }
</style>