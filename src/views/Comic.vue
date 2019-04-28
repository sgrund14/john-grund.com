<template>
    <section v-if="isContentLoaded">
        <h4>{{title}}</h4>
        <p>{{description}}</p> 
        <img
            v-for="page in pages"
            :key="page.id"
            v-lazy="page.url"
            :alt="page.alt"
        >
        <router-link to="/comics">More Comics</router-link>
    </section> 
</template>

<script>
import store, { mixin } from '../stores';

export default {
    name: 'comic',
    mixins: [mixin],
    beforeRouteEnter (to, from, next) {
        if (!from.name) {
            next();
        } else {
            store.dispatch('fetchPage', to.path).then(next);
        }
    },
    mounted() {
        if (!this.isContentLoaded) {
            this.$store.dispatch('fetchPage', this.$route.path);
        }
    },
    computed: {
        title() {
            return this.page.title
        },
        description() {
            return this.page.description
        },
        slug() {
            return this.page.slug
        },
        pages() {
            const pages = [...this.page.chapters[0].pages];
            return pages.sort((a, b) => a.title < b.title);
        },
        isContentLoaded() {
            return !!this.page
        }
    }
}
</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    text-align: center;
}
a {
    color: black;
    padding: 1rem;
    font-size: 2rem;
}
a:hover {
    color: var(--blue);
}
h4 {
    font-family: var(--ff-serif);
    font-size: 2rem;
    padding: 1rem 0;
}
p {
    font-family: var(--ff-serif);
    padding-bottom: 2rem;
}
img {
    width: 100%;
}
img[lazy="loading"] {
    background-color: var(--lightgrey);
    height: 100vh;
}
@media (max-width: 900px) {
    h4 {
        font-size: 1.5rem;
    }
    a {
        font-size: 1.5rem;
    }
}
</style>
