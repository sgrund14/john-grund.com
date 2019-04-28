<template class="pageWrapper">
  <section v-if="contentLoaded">
    <div class="blurb-container" v-html="blurb" />
    <img v-lazy="image" alt="John Grund, At Work">
  </section>
  <Loading v-else/>
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
    contentLoaded() {
      return !!this.page;
    }
  }
}
</script>

<style scoped>

section {
  display: grid;
  grid-template-columns: 270px 1fr;
}
img {
  -webkit-animation: fadein .5s;
  -moz-animation: fadein .5s;
  -ms-animation: fadein .5s;
  -o-animation: fadein .5s;
  animation: fadein .5s;
  height: calc(100vh - 70px - 1rem);
  min-height: 500px;
}
.blurb-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
