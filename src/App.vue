<template>
  <main :class="{ isLoading }">
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
    mobile: el => el.width < (900 - 64)
  },
  components: {
    Header,
    MobileHeader
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
}
</script>

<style>
@keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
@-moz-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

@-webkit-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

@-ms-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}
@-o-keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
}

@keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(5%);
    }
    to   {
      opacity: 1;
      transform: translateY(0%);
    }
}
@-moz-keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(5%);
    }
    to   {
      opacity: 1;
      transform: translateY(0%);
    }
}

@-webkit-keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(5%);
    }
    to   {
      opacity: 1;
      transform: translateY(0%);
    }
}

@-ms-keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(5%);
    }
    to   {
      opacity: 1;
      transform: translateY(0%);
    }
}
@-o-keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(5%);
    }
    to   {
      opacity: 1;
      transform: translateY(0%);
    }
}


@keyframes grow {
    from {
      max-height: 0;
    }
    to   {
      max-height: 500px;
    }
}
@-moz-keyframes grow {
    from {
      max-height: 0;
    }
    to   {
      max-height: 500px;
    }
}

@-webkit-keyframes grow {
    from {
      max-height: 0;
    }
    to   {
      max-height: 500px;
    }
}

@-ms-keyframes grow {
    from {
      max-height: 0;
    }
    to   {
      max-height: 500px;
    }
}
@-o-keyframes grow {
    from {
      max-height: 0;
    }
    to   {
      max-height: 500px;
    }
}

:root {
  --red: red;
  --blue: blue;
  --white: #fff;
  --lightgrey: #f1f1f1;
  --ff-sans: 'ShastonHi320', courier, sans-serif;
  --ff-serif: 'code2001', Georgia, 'Times New Roman', Times, serif;
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
  font-family: var(--ff-sans);
  font-size: 1rem;
  padding: 0 2rem;
  min-height: 100vh;
}
.isLoading {
  cursor: progress;
}
.isLoading a:hover {
  cursor: progress
}
@font-face {
  font-family: 'akzidenz grotesk';
  font-weight: normal;
  src: url('assets/fonts/mystery1.woff') format('woff')
}
@font-face {
  font-family: 'akzidenz grotesk light';
  font-weight: lighter;
  src: url('assets/fonts/mystery2.woff2') format('woff2')
}
@font-face {
  font-family: 'untitled serif';
  src: url('assets/fonts/UntitledSerifWeb-Regular.woff2') format('woff2')
}
@font-face {
    font-family: 'Copernicus Book';
    src: url('assets/fonts/Copernicus-Book.woff2') format('woff2'),
        url('assets/fonts/Copernicus-Book.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Copernicus Book';
    src: url('assets/fonts/Copernicus-BookItalic.woff2') format('woff2'),
        url('assets/fonts/Copernicus-BookItalic.woff') format('woff');
    font-weight: normal;
    font-style: italic;
}

@font-face {
    font-family: 'ShastonHi320';
    src: url('assets/fonts/ShastonHi320.woff2') format('woff2'),
        url('assets/fonts/ShastonHi320.woff') format('woff');;
}
@font-face {
    font-family: 'code2001';
    src: url('assets/fonts/code2001.woff') format('woff');;
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
