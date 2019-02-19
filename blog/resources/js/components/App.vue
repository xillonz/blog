<template>
    <div>
        <h1>Blog</h1>

        <p>
            <router-link :to="{ name: 'home' }">Home</router-link>
            <router-link :to="{ name: 'articles.index' }">Articles</router-link>
        </p>

        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {}
</script>