<template>
    <div id="app">
        <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/">ACV</a>
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
        <router-view></router-view>
    </div>
</template>