<template>
    <ul>
        <li v-for="(post, index) in posts">
            <span>{{ post.title }}</span>
        </li>
    </ul>
</template>
<script lang="ts">
    import Vue, {ComponentOptions} from 'vue'

    interface PostsComponent extends Vue {
    }

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
    } as ComponentOptions<PostsComponent>
</script>