import * as Vue from 'vue'
import App from './application.vue'
import {createRouter} from './router/router'
import {createStore} from "./store/store"
import * as VeeValidate from 'vee-validate';
import * as VueCookie from 'vue-cookie';
import {sync} from 'vuex-router-sync'

Vue.use(VeeValidate);
Vue.use(VueCookie);

export function createApp() {

    const router = createRouter();
    const store = createStore();

    sync(store, router);

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });

    return {app, router, store}
}