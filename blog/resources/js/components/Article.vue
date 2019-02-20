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
        <article>
            {{ article.content }}
        </article>
    </div>
    <div v-if="editing && article">
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
            article: null,
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
        toggleEdit() {
            this.editing = !this.editing;
        },
        toggleEdit() {
            this.editing = !this.editing;
        },
        fetchData() {
            this.error = this.article = null;
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

