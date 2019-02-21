<template>
    <div>
        <nav>
            <h1><router-link :to="{ name: 'home' }">Blog</router-link></h1>            
            <router-link class="log-link" v-if="!loggedIn" :to="{ name: 'login' }">Log In</router-link>
            <button class="log-link" v-else v-on:click="logout">Log Out</button>
            <div id="loading-bar"  v-bind:class="{ loading: loading }"></div>          
        </nav>
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
                'loggedIn',
                'loading'
            ]),
        },
        created(){
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