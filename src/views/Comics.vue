<template>
    <section v-if="isContentLoaded">
        <router-link
            v-for="comic in comics"
            :key="comic.slug"
            :to="comic.link"
        >
            <img
                :src="comic.image"
                :alt="comic.description"
            >
        </router-link>
    </section>
    <Loading v-else />
</template>

<script>
import store, { mixin } from '../stores';
import Loading from '../components/Loading';
export default {
    name: 'Comics',
    mixins: [mixin],
    components: {
        Loading
    },
    beforeRouteEnter (to, from, next) {
        if (!from.name) {
            next();
        } else {
            store.dispatch('fetchPage', '/comics').then(next);
        }
    },
    mounted() {
        if (!this.isContentLoaded) {
            this.$store.dispatch('fetchPage', '/comics');
        }
    },
    computed: {
        comics() {
            return this.page.pages.map(page => {
                const content = this.$store.state.content[page];
                return {
                    image: content.featured_image,
                    link: `/comics/${content.slug}`,
                    slug: content.slug,
                    description: content.decription
                }
            })
        },
        isContentLoaded() {
            return !!this.page;
        }
    },
    methods: {
        fetchComics() {
            return this.$store.dispatch('fetchPage', '/comics')
        }
    }
}
</script>

<style scoped>
section {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    padding: 1rem 0;
}
img {
    width: 100%;
    height: 100%;
    padding: .25rem;
}
a:hover {
    outline: 1px solid var(--blue);
}
@media (max-width: 900px) {
  section {
    grid-template-columns: 1fr 1fr;
    }
}
</style>
