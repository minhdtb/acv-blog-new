import * as Vue from 'vue'
import * as Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            posts: []
        },
        actions: {
            getPosts: ({commit}) => {
                return new Promise((resolve, reject) => {
                    axios.get('http://localhost:3000/api/posts')
                        .then(response => {
                            commit('setPosts', response.data);
                            resolve();
                        })
                        .catch(reject)
                })
            }
        },
        mutations: {
            setPosts(state, posts) {
                state.posts = posts;
            }
        }
    });
}