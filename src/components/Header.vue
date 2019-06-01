<template>
  <header>
    <div class="title">
      <p>
        <span class="name">John Grund</span>
        <span v-if="isAboutPage && contentLoaded" class="blurb" v-html="blurb" />
      </p>
      <div v-if="isAboutPage" class="followingWrapper">
        <div :class="['socialContent', { hideSocial: !showSocial, socialPeeking: socialPeeking && !showSocial }]">
          <div class="ig-container">
            <a v-for="post in instagram" :key="post.shortcode" href="https://www.instagram.com/john__grund/" target="__blank">
              <img
                :src="post.url"
                :alt="post.caption"
                class="ig-post"
              >
            </a>
          </div>
          <div class="socialLinks">
            <a target="__blank" href="https://www.instagram.com/john__grund/">instagram,</a>
            <a target="__blank" href="http://jgrund17.tumblr.com/">tumblr,</a>
            <a target="__blank" href="https://soundcloud.com/jgrund-19829311">soundcloud</a>
          </div>
        </div>
        <span
          class="follow"
          :class="{ showSocial }"
          @click="toggleSocial"
          @mouseenter="() => togglePeeking(true)"
          @mouseleave="() => togglePeeking(false)"
        >
          Follow Him on the Web</span>
      </div>
    </div>
    <nav>
      <div>
        <router-link to="/" exact>/about</router-link>
        <router-link to="/comics">/comics</router-link>
      </div>
      <div>
        <router-link to="/illustrations">/illustrations</router-link>
        <router-link to="/storyboarding">/storyboarding</router-link>
      </div>
      <div>
        <router-link to="/misc">/misc</router-link>
        <router-link to="/contact">/contact</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import store, { mixin } from '../stores';

export default {
  name: 'Header',
  mixins: [mixin],
  data() {
    return {
      showSocial: false,
      socialPeeking: false
    }
  },
  methods: {
    toggleSocial() {
      this.showSocial = !this.showSocial;
    },
    togglePeeking(isPeeking) {
      this.socialPeeking = isPeeking;
    }
  },
  mounted() {
    this.$store.dispatch('fetchInstagram');
  },
  computed: {
    blurb() {
      return this.page.blurb.replace(/(<p[^>]+?>|<p>|<\/p>)/im, "\n");
    },
    image() {
      return this.page.gif;
    },
    instagram() {
      return this.$store.state.instagram.reverse().slice(6);
    },
    contentLoaded() {
      return !!this.page;
    },
    isAboutPage() {
      return this.$route.path === '/';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: auto;
}
.gif {
  position: absolute;
  z-index: -300;
  bottom: 0;
  right: 0;
  width: 50%;
}
.title {
  max-width: 55%;
}
.title > p {
  line-height: 3rem;
}
.name {
  font-size: 2rem;
}
.blurb {
  font-family: var(--ff-serif);
  font-size: 1.75rem;
  text-transform: none;
}
.blurb >>> p {
  margin: .5rem 0;
}
nav {
  display: flex;
  align-items: center;
  font-size: .75rem;
  height: 3rem;
}
nav > div {
  padding: 0 1rem;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
nav > div:first-child {
  padding-left: 0;
}
nav > div:last-child {
  padding-right: 0;
}
h4 {
  margin: 0;
  font-weight: normal;
  font-size: 2rem;
  min-width: 220px;
}
a {
  text-decoration: none;
  color: #000;
  position: relative;
}
.ig-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: .75rem;
  width: 455px;
  border-radius: .5rem;
  padding: .75rem;
  background-color: rgba(181, 255, 44, 0.75);
}
.ig-container > a {
  display: flex;
  align-items: center;
}
.ig-container > a > img {
  -webkit-animation: slideIn .5s;
  -moz-animation: slideIn .5s;
  -ms-animation: slideIn .5s;
  -o-animation: slideIn .5s;
  animation: slideIn .5s;
  width: 100%;
  border-radius: .25rem;
  transition: 0.3s transform ease;
}
.ig-container > a:hover > img {
  transform: translateY(calc(-.75rem /2));
}
img[lazy="loaded"] {
    -webkit-animation: slideIn .5s;
  -moz-animation: slideIn .5s;
  -ms-animation: slideIn .5s;
  -o-animation: slideIn .5s;
  animation: slideIn .5s;
}
.socialContent {
  transform: translateX(0%);
  transition: .3s transform ease;
}
.hideSocial {
  transform: translateX(calc(-100% - 2rem));
}
.socialPeeking {
  transform: translateX(-100%);
}
.socialLinks {
  display: flex;
  margin: 1rem 0;
}
.socialLinks > a {
  margin-right: .1rem;
}
.follow {
  /* color: var(--blue); */
  font-family: var(--ff-sans);
  font-size: 1rem;
  text-decoration: underline;
}
a:hover {
  color: var(--red)
}
.router-link-active {
  color: var(--red)
}
.router-link-active:before {
  content: "~";
  position: absolute;
  left: -15px;
  top: 4px;
}
.followWrapper {
  text-align: right;
}
.follow {
  user-select: none;
}
.follow:hover {
  cursor: pointer;
}
.follow:after {
  display: inline-block;
  content: "⇧";
  margin-left: .25rem;
  transform: rotate(90deg) translateY(1px);
  transition: .3s transform ease;
}
.showSocial:after {
  transform: rotate(-90deg);
}
.followingWrapper {
  position: absolute;
  bottom: 1rem;
}
@media (max-width: 1024px) {

}
</style>
