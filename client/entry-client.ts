import {createApp} from './application'

const {app, router, store} = createApp();

interface w extends Window {
    __INITIAL_STATE__: any
}

router.onReady(() => {
    store.replaceState((window as w).__INITIAL_STATE__);
    app.$mount('#app');
});