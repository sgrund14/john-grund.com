<template>
  <header>
    <h4>John Grund</h4>
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
    <div>
      <span class="follow" :class="{ showSocial }" @click="toggleSocial">Follow Me</span>
      <div v-if="showSocial" class="socialLinks">
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
  display: grid;
  grid-template-columns: 25% 1fr 1.3fr 1fr 25%;
  grid-column-gap: 1rem;
  padding: .75rem;
  font-size: .75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}
h4 {
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
}
a {
  text-decoration: none;
  color: #000;
  position: relative;
}
.socialLinks {
  display: flex;
  font-size: .75rem;
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
  top: -1px;
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
