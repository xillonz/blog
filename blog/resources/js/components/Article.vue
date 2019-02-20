<template>
<div class="article">
    <div class="loading" v-if="loading">Loading</div>
    <div class="error" v-if="error">{{ error }}</div>
    <div v-if="loggedIn">
        <button v-if="!editing" v-on:click="toggleEdit">Edit</button>
        <button v-if="editing" v-on:click="cancelEdit">Cancel</button>
        <button v-if="editing" v-on:click="saveEdit">Save</button>
        <button v-if="editing" v-on:click="deleteArticle">Delete</button>
    </div>
    
    <div v-if="!editing">
        <h2>{{ article.title }}</h2>
        <article v-html="article.content"></article>
    </div>
    <div v-else>
        <input v-model="article.title" type="text">
        <wysiwyg v-if="editing" v-model="article.content" />
    </div> 
</div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'
export default {
    data() {
        return {
            loading: false,
            article: {
                title: null,
                content: null
            },
            error: null,
            editing: false,
        };
    },
    computed: {
        ...mapState([
            'loggedIn'
        ]),
    },
    created() {
        this.fetchData();
    },
    methods: {
        toggleEdit() {
            this.editing = !this.editing;
        },
        cancelEdit() {
            if(this.$route.params.id === 'new'){
                this.$router.push('/')
            }else{                
                this.fetchData();
                this.editing = !this.editing;
            }
        },
        saveEdit() {
            let method = (this.$route.params.id === 'new') ? 'POST' : 'PUT';
            let url = (this.$route.params.id === 'new') ? '/api/articles' : '/api/articles/'+this.$route.params.id;
            axios({
                method: method,
                url: url,
                data: {
                    article: this.article
                }
            }).then(response => {
                console.log(response);
                this.editing = false;
            }).catch(error => {
                this.error = error.response.data.message || error.message;
            });
        },
        deleteArticle() {
             axios
                .delete('/api/articles/'+this.$route.params.id)
                .then(response => {
                    this.$router.push('/');
                }).catch(error => {
                    this.error = error.response.data.message || error.message;
                });
        },
        fetchData() {
            this.error = null;
            this.loading = true;

            if(this.$route.params.id === 'new'){
                this.loading = false;
                this.editing = true;
            }else{
                 axios
                .get('/api/articles/'+this.$route.params.id)
                .then(response => {
                    console.log(response);
                    this.loading = false;
                    this.article = response.data.article;
                }).catch(error => {
                    this.loading = false;
                    this.error = error.response.data.message || error.message;
                });
            }
           
        }
    }
}
</script>

