import * as Vue from 'vue'
import * as Router from 'vue-router'
import Home from '../pages/home.vue';
import Posts from '../pages/posts.vue';
import Tags from '../pages/tags.vue';
import Login from '../pages/login.vue';

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/login', component: Login
            },
            {
                path: '/', component: Home,
                children: [
                    {
                        path: 'posts/:page(\\d+)?', component: Posts
                    },
                    {
                        path: 'tags', component: Tags
                    }
                ]
            }
        ]
    })
}