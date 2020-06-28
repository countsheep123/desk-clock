import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isDark: false
  },
  mutations: {
    changeDarkMode(state, current) {
      state.isDark = current;
    }
  },
  actions: {},
  modules: {}
});
