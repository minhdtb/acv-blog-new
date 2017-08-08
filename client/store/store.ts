import * as Vue from 'vue'
import * as Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            posts: [],
            user: {
                id: null,
                username: null,
                token: null
            }
        },
        actions: {
            GET_POST_LIST: ({commit}) => {
                return new Promise((resolve, reject) => {
                    axios.get('http://localhost:3000/api/posts')
                        .then(response => {
                            commit('SET_POST_LIST', response.data);
                            resolve();
                        })
                        .catch(reject)
                })
            }
        },
        mutations: {
            SET_POST_LIST(state, posts) {
                state.posts = posts;
            },
            SET_USER(state, user) {
                state.user = user;
            }
        }
    });
}