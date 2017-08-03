<template lang="html">

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

    function getPosts(store) {
        return store.dispatch('getPosts');
    }

    export default {
        name: 'posts',
        computed: {
            posts() {
                return this.$store.state.posts
            }
        },
        preFetch: getPosts,
        beforeMount() {
            return getPosts(this.$store)
        }
    } as ComponentOptions<PostsComponent>
</script>