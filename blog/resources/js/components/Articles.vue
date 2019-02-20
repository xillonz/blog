<template>
<div class="articles">
    <router-link v-if="loggedIn" :to="{ name: 'articles.show', params: {id: 'new'} }">New Article</router-link>
    <p>Article List</p>

    <div class="loading" v-if="loading">Loading</div>
    <div class="error" v-if="error">{{ error }}</div>
    <ul v-if="articles">
        <li class="article-item" v-for="(article) in articles" v-bind:key="article._id">
            <router-link :to="{ name: 'articles.show', params: {id: article._id} }">{{ article.title }}</router-link>
            <div class="article-preview" v-html="article.content"></div>
        </li>
    </ul>
</div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'
export default {
    data() {
        return {
            loading: false,
            articles: null,
            error: null,
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
        fetchData() {
            this.error = this.articles = null;
            this.loading = true;
            axios
                .get('/api/articles')
                .then(response => {
                    console.log(response);
                    this.loading = false;
                    this.articles = response.data.articles;
                }).catch(error => {
                    this.loading = false;
                    this.error = error.response.data.message || error.message;
                });
        }
    }
}
</script>

