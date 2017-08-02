<template>
    <div id="app">
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
            </div>
        </nav>
        <div class="container">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<style>
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.2s ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }

    .navbar-brand {
        padding-top: 10px;
    }

    .logo {
        width: 190px;
    }
</style>