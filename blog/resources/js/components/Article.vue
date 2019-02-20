<template>
<div class="article">
    <div class="loading" v-if="loading">Loading</div>
    <div class="error" v-if="error">{{ error }}</div>
    <div v-if="article">
        <h2>{{ article.title }}</h2>
        <div>
            {{ article.content }}
        </div>
    </div> 
</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            loading: false,
            article: null,
            error: null,
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.error = this.article = null;
            this.loading = true;
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
</script>

