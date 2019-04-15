<template>
  <header>
    <h4>John Grund</h4>
    <nav>
      <div>
        <router-link to="/">/about</router-link><br>
        <router-link to="/comics">/comics</router-link>
      </div>
      <div>
        <router-link to="/illustrations">/illustrations</router-link><br>
        <router-link to="/storyboarding">/storyboarding</router-link>
      </div>
      <div>
        <router-link to="/misc">/misc</router-link><br>
        <router-link to="/contact">/contact</router-link>
      </div>
    </nav>
    <div class="followWrapper">
      <span class="follow" :class="{ showSocial }" @click="toggleSocial">Follow Me</span>
      <div :class="['socialLinks', { hideLinks: !showSocial }]">
        <a target="__blank" href="https://www.instagram.com/john__grund/">instagram,</a>
        <a target="__blank" href="http://jgrund17.tumblr.com/">tumblr,</a>
        <a target="__blank" href="https://soundcloud.com/jgrund-19829311">soundcloud</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      showSocial: false
    }
  },
  methods: {
    toggleSocial() {
      this.showSocial = !this.showSocial;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: auto;
}
nav {
  display: flex;
}
nav > div {
  padding: 0 1rem;
}
h4 {
  margin: 0;
  font-weight: normal;
  font-size: 2rem;
}
a {
  text-decoration: none;
  color: #000;
  position: relative;
}
.hideLinks {
  visibility: hidden;
}
.socialLinks {
  display: flex;
}
.socialLinks > a {
  margin-right: .1rem;
}
.follow:hover, a:hover {
  color: var(--blue)
}
.router-link-exact-active {
  color: var(--blue)
}
.router-link-exact-active:hover {
  cursor: default;
}
.router-link-exact-active:before {
  content: "~";
  position: absolute;
  left: -10px;
  top: -2px;
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
  content: "↓";
  margin-left: .25rem;
}
.showSocial:after {
  transform: rotate(180deg);
}
@media (max-width: 1024px) {
  
  .socialLinks {
    flex-direction: column;
    font-size: .75rem;
  }
}
</style>
