import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    api: {
      endpoint: '/.netlify/functions',
    },
    content: { },
    isLoading: false,
  },
  mutations: {
    setPage(state, payload = { }) {
        Object.keys(payload).forEach(page => {
          const current = state.content[page] || {};
          const data = {
            ...current,
            ...payload[page],
            _loaded: current._loaded || payload[page]._loaded
          }
          Vue.set(state.content, page, data);
        });
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    }
  },
  actions: {
    fetchPage({ commit, state }, url = '') {
      // skip redundant fetches
      if (state.content[url] && state.content[url]._loaded) return
      // hit the api
      commit('setIsLoading', true);
      return fetch(`${state.api.endpoint}/contentstate?url=${url}`)
        .then(response => response.json())
        .then(data => {
          commit('setPage', data);
          commit('setIsLoading', false);
        })
        .catch(err => {
          console.warn(err);
          commit('setIsLoading', false);
        })
    },
  },
});

export const mixin = {
  computed: {
    page() {
        const pageMap = {
          '/' : '/about'
        };
        return this.$store.state.content[pageMap[this.$route.path] || this.$route.path]
    },
  },
}

export default store