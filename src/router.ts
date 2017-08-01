import * as Vue from 'vue'
import * as Router from 'vue-router'
import Test from './components/Test.vue';

Vue.use(Router);

const Bar = {template: '<div>chào các bạn</div>'};

export function createRouter() {
    return new Router({
        routes: [
            {path: '/foo', component: Test},
            {path: '/bar', component: Bar},
            {path: '/', redirect: '/foo'}
        ]
    })
}