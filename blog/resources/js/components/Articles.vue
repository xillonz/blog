<template>
<div class="articles">
    <p>Article List</p>

    <div class="loading" v-if="loading">Loading</div>
    <div class="error" v-if="error">{{ error }}</div>
    <ul v-if="articles">
        <li v-for="(article) in articles" v-bind:key="article.id">
            {{ article.content }}
        </li>
    </ul>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            loading: false,
            articles: null,
            error: null,
        };
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

