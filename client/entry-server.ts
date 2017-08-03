import {createApp} from './Application'

interface VueComponent {
    preFetch: Function;
}

export default context => {
    const {app, router, store} = createApp();

    router.push(context.url);

    const matchedComponents = router.getMatchedComponents() as [VueComponent];

    if (!matchedComponents.length) {
        return Promise.reject({code: 404})
    }

    return Promise.all(matchedComponents.map(component => {
        if (component.preFetch) {
            return component.preFetch(store)
        }
    })).then(() => {
        context.initialState = store.state;

        return app;
    });
}