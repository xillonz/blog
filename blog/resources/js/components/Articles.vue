<template>
<div class="articles">
    <router-link class="btn btn-primary" v-if="loggedIn" :to="{ name: 'articles.show', params: {id: 'new'} }">New Article</router-link>
    <div class="error" v-if="error">{{ error }}</div>
    <div class="article-list" v-if="articles">
        <router-link class="article-link" v-for="(article) in articles" v-bind:key="article._id" :to="{ name: 'articles.show', params: {id: article._id} }">
            <div class="article-card">
                <h3>{{ article.title }}</h3>
                <div class="article-preview" v-html="article.content"></div>
            </div>
        </router-link>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
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
        ...mapMutations([
            'setLoading'
        ]),
        fetchData() {
            this.error = this.articles = null;
            this.setLoading(true);
            axios
                .get('/api/articles')
                .then(response => {
                    console.log(response);
                    this.setLoading(false);
                    this.articles = response.data.articles;
                }).catch(error => {
                    this.setLoading(false);
                    this.error = error.response.data.message || error.message;
                });
        }
    }
}
</script>

