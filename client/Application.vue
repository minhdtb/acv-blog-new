<template>
    <div id="app" v-cloak>
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
                <router-link v-if="!isLogged()" :to="{ path: '/login' }" class="btn btn-default btn-login">
                    Login
                </router-link>
            </div>
        </nav>
        <div class="container">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script lang="ts">
    import * as Vue from "vue";
    import {ComponentOptions} from "vue/types/options";

    interface ApplicationComponent extends Vue {
    }

    export default {
        methods: {
        }
    } as ComponentOptions<ApplicationComponent>
</script>
<style lang="css">
    [v-cloak] {
        display: none;
    }

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