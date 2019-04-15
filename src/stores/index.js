import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    api: {
      endpoint: '/.netlify/functions',
    },
    content: { },
  },
  mutations: {
    setPage (state, payload = { }) {
        Object.keys(payload).forEach(page => {
          const current = state.content[page] || {};
          const data = {
            ...current,
            ...payload[page]
          }
          Vue.set(state.content, page, data);
        });
    },
  },
  actions: {
    fetchPage ({ commit, state }, url = '') {
      // skip redundant fetches
      if (state.content[url] && state.content[url]._loaded) return
      // hit the api
      return fetch(`${state.api.endpoint}/contentstate?url=${url}`)
        .then(response => response.json())
        .then(data => commit('setPage', data))
        .catch(err => console.warn(err))
    },
  },
});

export const mixin = {
  computed: {
    page() {
        return this.$store.state.content[this.$route.path]
    },
  },
}

export default store