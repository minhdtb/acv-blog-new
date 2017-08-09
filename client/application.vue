<template>
    <div id="app" v-cloak>
        <transition name="fade" mode="out-in" appear>
            <router-view></router-view>
        </transition>
    </div>
</template>
<style lang="css">
    [v-cloak] {
        display: none;
    }
</style>