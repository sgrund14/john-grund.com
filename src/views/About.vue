<template>
  <section v-if="contentLoaded">
    <img class="gif" v-lazy="image" alt="John Grund, At Work">
  </section>
</template>

<script>
import Loading from '../components/Loading';
import store, { mixin } from '../stores';

export default {
  name: 'About',
  mixins: [mixin],
  components: {
    Loading
  },
  beforeRouteEnter (to, from, next) {
    if (!from.name) {
      next();
    } else {
        store.dispatch('fetchPage', '/about').then(next)
    }
  },
  mounted() {
    if (!this.contentLoaded) {
      this.$store.dispatch('fetchPage', '/about');
    }
  },
  computed: {
    blurb() {
      return this.page.blurb;
    },
    image() {
      return this.page.gif;
    },
    instagram() {
      return this.$store.state.instagram;
    },
    contentLoaded() {
      return !!this.page;
    }
  }
}
</script>

<style scoped>
.gif {
  -webkit-animation: fadein .5s;
  -moz-animation: fadein .5s;
  -ms-animation: fadein .5s;
  -o-animation: fadein .5s;
  animation: fadein .5s;
  position: absolute;
  z-index: -300;
  bottom: 1rem;
  right: 1rem;
  width: 60%;
}
.blurb-container {
  -webkit-animation: fadein .5s;
  -moz-animation: fadein .5s;
  -ms-animation: fadein .5s;
  -o-animation: fadein .5s;
  animation: fadein .5s;
  margin-top: -1rem;
  /* position: absolute; */
  width: 270px;
  z-index: 10;
}
.blurb-container >>> p {
  padding: .75rem 0;
  font-size: .75rem;
  font-family: var(--ff-serif);
  line-height: 1.5rem;
}
.blurb-container >>> a {
  color: var(--blue);
}
.blurb-container >>> a:visited {
  color: var(--blue);
}
.ig-post {
  width: 100%;
}
/* .left-col {
  z-index: 10;
} */
@media (max-width: 1024px) {
  img {
    width: 100%;
    height: unset;
    min-height: unset;
  }
}
@media (max-width: 900px) {
  section {
    display: flex;
    flex-direction: column-reverse;
  }
  .blurb-container >>> p{
    font-size: 1.1rem;
    line-height: 1.75rem;
  }
}
</style>
