<template>
  <main>
    <MobileHeader v-if="el.is.mobile" />
    <Header v-else />
    <div class="content">
      <router-view />
    </div>
  </main>
</template>

<script>
import Header from './components/Header.vue'
import MobileHeader from './components/MobileHeader.vue'
import { ResponsiveMixin } from 'vue-responsive-components'

export default {
  name: 'app',
  mixins: [ResponsiveMixin],
  breakpoints: {
    mobile: el => el.width < 900
  },
  components: {
    Header,
    MobileHeader
  }
}
</script>

<style>

:root {
  --blue: #0645ad;
  --white: #fcfefc;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-feature-settings:"kern" 1;
  -ms-font-feature-settings:"kern" 1;
  -o-font-feature-settings:"kern" 1;
  -webkit-font-feature-settings:"kern" 1;
  font-feature-settings:"kern" 1;
  font-kerning: normal;
  background-color: var(--white);
}
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
main {
  font-family: 'akzidenz grotesk roman';
  max-width: 1000px;
  font-size: 1rem;
  margin: 0 auto;
}
@font-face {
  font-family: 'akzidenz grotesk black';
  src: url('assets/fonts/akzidenz-grotesk-black.woff2') format('woff2'), url('assets/fonts/akzidenz-grotesk-black.woff') format('woff');
}
@font-face {
  font-family: 'akzidenz grotesk bold';
  src: url('assets/fonts/akzidenz-grotesk-bold.woff2') format('woff2'), url('assets/fonts/akzidenz-grotesk-bold.woff') format('woff');
}
@font-face {
  font-family: 'akzidenz grotesk light';
  src: url('assets/fonts/akzidenz-grotesk-light.woff2') format('woff2'), url('assets/fonts/akzidenz-grotesk-light.woff') format('woff');
}
@font-face {
  font-family: 'akzidenz grotesk roman';
  src: url('assets/fonts/akzidenz-grotesk-roman.woff2') format('woff2'), url('assets/fonts/akzidenz-grotesk-roman.woff') format('woff');
}
button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;

    background: transparent;

    /* inherit font & color from ancestor */
    color: inherit;
    font: inherit;

    /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */
    line-height: normal;

    /* Corrects font smoothing for webkit */
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    /* Corrects inability to style clickable `input` types in iOS */
    -webkit-appearance: none;
}
button:focus {
  outline: none;
}

/* Remove excess padding and border in Firefox 4+ */
button::-moz-focus-inner {
    border: 0;
    padding: 0;
}
</style>
