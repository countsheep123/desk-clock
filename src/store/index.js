import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDark: false,
    lang: ""
  },
  mutations: {
    setDarkMode(state, current) {
      state.isDark = current;
    },
    setLang(state, lang) {
      state.lang = lang;
    }
  },
  actions: {},
  modules: {}
});
