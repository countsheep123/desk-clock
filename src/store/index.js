import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({
  encodingType: "aes",
  encryptionSecret: secret
});
const secret = "desk-clock";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ],
  state: {
    isDark: false,
    lang: "",
    config: {}
  },
  getters: {
    getConfig(state) {
      return state.config;
    }
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
