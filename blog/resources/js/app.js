import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from './components/App'
import Home from './components/Home'
import Articles from './components/Articles'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/articles',
            name: 'articles.index',
            component: Articles,
        },
    ],
});

const app = new Vue({
    el: '#app',
    components: { App },
    router,
});