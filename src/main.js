import 'intersection-observer';
import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './stores';
import VueLazyload from 'vue-lazyload'
 
Vue.use(VueLazyload, {
  observer: true,
  observerOptions: {
    rootMargin: '0px 0px',
    threshold: .25
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
