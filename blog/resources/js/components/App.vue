<template>
    <div>
        <h1>Blog</h1>

        <p>
            <router-link :to="{ name: 'home' }">Home</router-link>
            <router-link :to="{ name: 'articles.index' }">Articles</router-link>
            <router-link v-if="!loggedIn" :to="{ name: 'login' }">Log In</router-link>
            <button v-if="loggedIn" v-on:click="logout">Log Out</button>
        </p>

        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex'
    import axios from 'axios';
    export default {
        computed: {
            ...mapState([
                'loggedIn'
            ]),
        },
        mounted(){
            axios
                .get('/api/checkLogin')
                .then(response => {
                    console.log(response);
                    this.setLoggedIn(response.data);
                }).catch(error => {
                    console.log(error);
                });
        },
        methods: {
            ...mapMutations([
                'setLoggedIn'
            ]),
            logout: function() {
                axios
                .post('/api/logout')
                .then(response => {
                    console.log(response);
                    this.setLoggedIn(false);
                }).catch(error => {
                    console.log(error);
                });
                
            }
        }
    }
</script>