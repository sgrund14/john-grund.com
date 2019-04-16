<template>
  <header>
    <section>
        <h4>John Grund</h4>
        <button @click="toggleMenu">
            <svg v-if="isMenuOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 24">
                <rect width="30" height="24" style="fill:none" />
                <line x1="3.85" y1="0.85" x2="26.15" y2="23.15" style="fill:none;stroke:#000" />
                <line x1="26.15" y1="0.85" x2="3.85" y2="23.15" style="fill:none;stroke:#000" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 24">
                <rect width="30" height="24" style="fill:none" />
                <line x1="0.63" y1="12" x2="29.38" y2="12" style="fill:none;stroke:#000" />
                <line x1="0.63" y1="22.64" x2="29.38" y2="22.64" style="fill:none;stroke:#000" />
                <line x1="0.63" y1="1.36" x2="29.38" y2="1.36" style="fill:none;stroke:#000" />
            </svg>
        </button>
    </section>
    <nav v-if="isMenuOpen">
        <div>
            <router-link to="/">/about</router-link><br>
            <router-link to="/comics">/comics</router-link><br>
            <router-link to="/illustrations">/illustrations</router-link><br>
            <router-link to="/storyboarding">/storyboarding</router-link><br>
            <router-link to="/misc">/misc</router-link><br>
            <router-link to="/contact">/contact</router-link>
        </div>
        <div>
            <a target="__blank" href="https://www.instagram.com/john__grund/">instagram</a><br>
            <a target="__blank" href="http://jgrund17.tumblr.com/">tumblr</a><br>
            <a target="__blank" href="https://soundcloud.com/jgrund-19829311">soundcloud</a>
        </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  display: grid;
  padding: .75rem 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}
section {
    display: flex;
    justify-content: space-between;
    font-size: 1.5rem;
}
svg {
    height: 1.5rem;
    width: 1.5rem;
}
nav {
    margin-top: 1rem;
}
div:nth-child(1) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}
div:nth-child(2) {
    font-size: .75rem;
}
h4 {
  margin: 0;
  font-weight: normal;
}
a {
  text-decoration: none;
  color: #000;
  position: relative;
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
  left: -15px;
  top: -1px;
}
</style>
