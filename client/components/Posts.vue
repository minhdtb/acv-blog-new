<template>
    <ul id="example-1">
        <li v-for="post in posts">
            {{ post.title }}
        </li>
    </ul>
</template>

<script lang="ts">
    import Vue, {ComponentOptions} from 'vue'
    import axios from 'axios';

    interface PostsComponent extends Vue {

        posts: [any]

        onClick (): void
    }

    export default {
        data: () => {
            return {
                posts: []
            }
        },
        created() {
            axios.get('/api/posts')
                .then(response => {
                    this.posts = response.data
                })
                .catch(e => {
                })
        }
    } as ComponentOptions<PostsComponent>
</script>