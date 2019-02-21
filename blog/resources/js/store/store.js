import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        loggedIn: false,
        loading: false
    },
    mutations: {
        setLoggedIn (state, data) {
            state.loggedIn = data
        },
        setLoading (state, data) {
            state.loading = data
        }
    }
})
