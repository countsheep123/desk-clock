import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    isDark: false,
    lang: "",
    config: {}
  },
  mutations: {
    setDarkMode(state, current) {
      state.isDark = current;
    },
    setLang(state, lang) {
      state.lang = lang;
    },
    setConfig(state, config) {
      state.config = config;
    }
  },
  actions: {},
  modules: {}
});
