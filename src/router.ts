import * as Vue from 'vue'
import * as Router from 'vue-router'
import Posts from './components/Posts.vue';
import Tags from './components/Tags.vue';

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {path: '/posts', component: Posts},
            {path: '/tags', component: Tags},
            {path: '/', redirect: '/posts'}
        ]
    })
}