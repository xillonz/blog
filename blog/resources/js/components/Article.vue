<template>
<div class="article">
    <div class="article-head">
        <div>
            <router-link :to="{ name: 'home' }">Back to Articles</router-link>
            <div class="error" v-if="error">{{ error }}</div>
        </div>
    
        <div v-if="loggedIn" class="article-controls">
            <button v-if="!editing" v-on:click="toggleEdit" class="btn btn-primary">Edit</button>
            <button v-if="editing" v-on:click="cancelEdit" class="btn cancel-btn">Cancel</button>
            <button v-if="editing" v-on:click="saveEdit" class="btn btn-primary">Save</button>
            <button v-if="editing" v-on:click="deleteArticle" class="btn btn-danger">Delete</button>
        </div>
    </div>    
    
    <div class="article-main">
        <div v-if="!editing || !loggedIn">
            <h2>{{ article.title }}</h2>
            <hr>
            <article v-html="article.content"></article>
        </div>
        <div v-if="editing && loggedIn">
            <input class="form-control" v-model="article.title" type="text" placeholder="Title">
            <wysiwyg v-if="editing" v-model="article.content" />
        </div> 
    </div>    
</div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
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
        ...mapMutations([
            'setLoading'
        ]),
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
            this.setLoading(true);
            let method = (this.$route.params.id === 'new') ? 'POST' : 'PUT';
            let url = (this.$route.params.id === 'new') ? '/api/articles' : '/api/articles/'+this.$route.params.id;
            axios({
                method: method,
                url: url,
                data: {
                    title: this.article.title,
                    content: this.article.content
                }
            }).then(response => {
                console.log(response);
                this.editing = false;
                this.setLoading(false);
            }).catch(error => {
                this.error = error.response.data.message || error.message;
                this.setLoading(false);
            });
        },
        deleteArticle() {
            this.setLoading(true);
             axios
                .delete('/api/articles/'+this.$route.params.id)
                .then(response => {
                    this.setLoading(false);
                    this.$router.push('/');
                }).catch(error => {
                    this.error = error.response.data.message || error.message;
                    this.setLoading(false);
                });
        },
        fetchData() {
            this.error = null;            

            if(this.$route.params.id === 'new'){
                this.editing = true;
            }else{
                this.setLoading(true);
                 axios
                .get('/api/articles/'+this.$route.params.id)
                .then(response => {
                    console.log(response);
                    this.setLoading(false);
                    this.article = response.data.article;
                }).catch(error => {
                    this.setLoading(false);
                    this.error = error.response.data.message || error.message;
                });
            }
           
        }
    }
}
</script>

