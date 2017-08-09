<template>
    <ul>
        <li v-for="(post, index) in posts">
            <span>{{ post.title }}</span>
        </li>
    </ul>
</template>
<script lang="js">
    function getPostList(store) {
        return store.dispatch('GET_POST_LIST');
    }

    export default {
        computed: {
            posts() {
                return this.$store.state.posts
            }
        },
        preFetch: getPostList,
        beforeMount() {
            return getPostList(this.$store)
        }
    }
</script>