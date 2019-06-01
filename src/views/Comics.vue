<template>
    <section v-if="isContentLoaded" v-lazy-container="{ selector: 'img' }">
        <router-link
            v-for="comic in comics"
            :key="comic.slug"
            :to="comic.link"
        >
            <img
                :data-src="comic.src"
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
                    src: content.featured_image.url,
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
a {
    display: flex;
    align-items: center;
    transition: .3s transform ease;
}
img {
    width: 100%;
    height: calc((25vw - 1rem)/2);
    padding: .25rem;
}
img[lazy="loaded"] {
    -webkit-animation: slideIn .5s;
  -moz-animation: slideIn .5s;
  -ms-animation: slideIn .5s;
  -o-animation: slideIn .5s;
  animation: slideIn .5s;
}
img[lazy="loading"] {
    background-color: var(--lightgrey);
}
a:hover {
    /* outline: 1px solid var(--blue); */
    transform: translateY(-2.5%);
}
@media (max-width: 900px) {
    section {
        grid-template-columns: 1fr 1fr;
        grid-gap: .5rem;
    }
    img {
        height: calc((50vw - 1rem) / 2)
    }
}
</style>
