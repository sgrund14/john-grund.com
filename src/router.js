import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue';
import Comics from './views/Comics.vue';
import Comic from './views/Comic.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'about',
      component: About
    },
    {
      path: '/comics',
      name: 'comics',
      component: Comics
    },
    {
      path: '/comics/:slug',
      name: 'comic page',
      component: Comic
    }
  ],
})