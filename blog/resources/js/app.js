import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'

Vue.use(VueRouter)

import App from './components/App'
import Home from './components/Home'
import Login from './components/Login'
import Articles from './components/Articles'
import Article from './components/Article'

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
        {
            path: '/articles/:id',
            name: 'articles.show',
            component: Article,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
    ],
});

const app = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    
});