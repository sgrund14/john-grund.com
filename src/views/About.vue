<template>
  <section v-if="content">
    <div class="blurb-container" v-html="blurb" />
    <img :src="image" alt="" loop="infinite">
  </section>
</template>

<script>

import { mixin } from '../stores';

export default {
  name: 'Home',
  mounted () {
    this.$store.dispatch('fetchPage', '/about')
  },
  computed: {
    blurb() {
      return this.$store.state.content['/about'].blurb;
    },
    image() {
      return this.$store.state.content['/about'].gif;
    },
    content() {
      return !!this.$store.state.content['/about'];
    }
  }
}
</script>

<style scoped>
section {
  display: grid;
  grid-template-columns: 1.5fr 4fr;
}
img {
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
  font-size: 1rem;
  font-family: 'untitled serif', Georgia, 'Times New Roman', Times, serif;
}
.blurb-container >>> a {
  color: var(--blue);
}
.blurb-container >>> a:visited {
  color: var(--blue);
}
@media (max-width: 1024px) {
  section {
    grid-template-columns: 1fr 2fr;
  }
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
}
</style>
