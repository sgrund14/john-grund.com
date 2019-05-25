<template>
    <Responsive :breakpoints="{
        mobile: el => el.width <= 900 - 64
    }">
        <section
            slot-scope="el"
            v-if="isContentLoaded"
        >
            <ImageModal
                :image="selectedImage"
                :isOpen="!!selectedImage"
            />
            <div
                v-for="illustration in illustrations"
                :key="illustration.title"
                class="wrapper"
                :style="{
                    width: el.is.mobile ? illustration.mobileWidth : illustration.width,
                    height: el.is.mobile ? illustration.mobileHeight : illustration.height
                }"
            >
                <img
                    v-lazy="illustration.src"
                    :alt="illustration.alt"
                    @mouseenter="() => toggleDetails(illustration.title)"
                    @mouseleave="() => toggleDetails('')"
                    @click="() => setSelectedImage(illustration)"
                >
                <div v-if="shouldShowDetails(illustration.title)" class="details">
                    <h3>{{illustration.title}}</h3>
                    <p>{{illustration.details}}</p>
                </div>
            </div>
        </section>
    </Responsive>
</template>

<script>
import Loading from '../components/Loading';
import store, { mixin } from '../stores';
import { Responsive } from 'vue-responsive-components'

export default {
    name: 'Illustrations',
    mixins: [mixin],
    components: {
        Loading,
        Responsive
    },
    beforeRouteEnter (to, from, next) {
        if (!from.name) {
            next();
        } else {
            store.dispatch('fetchPage', '/illustrations').then(next)
        }
    },
    mounted() {
        if (!this.contentLoaded) {
            this.$store.dispatch('fetchPage', '/illustrations');
        }
    },
    data() {
        return {  
            titleToShow: ''
        };
    },
    computed: {
        illustrations() {
            return this.page.illustrations.map(illustration => ({
                ...illustration,
                src: illustration.image.url,
                width: 'calc(33.33vw - 2rem)',
                height: `calc((33.33vw - 2rem) / ${illustration.image.width / illustration.image.height})`,
                mobileWidth: 'calc(50vw - 2rem)',
                mobileHeight: `calc((50vw - 2rem) / ${illustration.image.width / illustration.image.height})`
            }))
        },
        isContentLoaded() {
            return !!this.page;
        },
    },
    methods: {
        toggleDetails(titleToShow) {
            this.titleToShow = titleToShow;
        },
        shouldShowDetails(title) {
            return this.titleToShow && this.titleToShow === title
        },
    }
}
</script>

<style scoped>
section {
   -webkit-column-count: 3;
   -moz-column-count: 3;
   column-count: 3;
   -moz-column-gap: 1rem;
   -webkit-column-gap: 1rem;
   column-gap: 1rem;
}
img:hover {
    opacity: .1;
    cursor: zoom-in;
}
img {
    /* -webkit-animation: fadein .5s;
    -moz-animation: fadein .5s;
    -ms-animation: fadein .5s;
    -o-animation: fadein .5s;
    animation: fadein .5s; */
    height: 100%;
    width: 100%;
    -webkit-animation: slideIn .5s;
  -moz-animation: slideIn .5s;
  -ms-animation: slideIn .5s;
  -o-animation: slideIn .5s;
  animation: slideIn .5s;
}
/* img[lazy="loaded"] {
     -webkit-animation: fadein .5s;
    -moz-animation: fadein .5s;
    -ms-animation: fadein .5s;
    -o-animation: fadein .5s;
    animation: fadein .5s;
} */
img[lazy="loading"] {
    background-color: var(--lightgrey);
}
.wrapper {
    position: relative;
    margin-bottom: 1rem;
}
.details {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    pointer-events: none;
}
.details > h3 {
    margin-bottom: 1rem;
    text-transform: uppercase;
}
@media (max-width: 900px) {
  section {
    -webkit-column-count: 2;
   -moz-column-count: 2;
   column-count: 2;
  }
  .details > h3 {
      font-size: 1rem;
  }
  .details > p {
      font-size: .75rem;
  }
}

</style>
