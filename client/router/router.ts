import * as Vue from 'vue'
import * as Router from 'vue-router'
import Posts from '../pages/Posts.vue';
import Tags from '../pages/Tags.vue';

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {path: '/posts/:page(\\d+)?', component: Posts},
            {path: '/tags', component: Tags},
            {path: '/', redirect: '/posts'}
        ]
    })
}