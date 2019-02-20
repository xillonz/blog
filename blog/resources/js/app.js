import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'
import wysiwyg from "vue-wysiwyg";

Vue.use(wysiwyg, {});
Vue.use(VueRouter)

import App from './components/App'
import Login from './components/Login'
import Articles from './components/Articles'
import Article from './components/Article'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Articles
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