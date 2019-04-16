<template>
    <section v-if="isContentLoaded">
        <h4>{{title}}</h4>
        <p>{{description}}</p> 
        <img
            v-for="page in pages"
            :key="page.id"
            :src="page.url"
            :alt="page.alt"
        >
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
    padding-top: 1rem;
    text-align: center;
}
p {
    padding-bottom: 1rem;
}
img {
    width: 100%;
}
</style>
