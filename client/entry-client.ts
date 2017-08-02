import {createApp} from './Application'

const {app, router} = createApp();

router.onReady(() => {
    app.$mount('#app');
});