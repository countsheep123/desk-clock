<template>
  <div id="app">
    <div id="main">
      <div id="nav">
        <router-link to="/">Time</router-link> |
        <router-link to="/calendar">Calendar</router-link> |
        <router-link to="/config">Config</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkModeMediaQuery: window.matchMedia("(prefers-color-scheme: dark)")
    };
  },
  created() {
    this.setDarkMode(this.darkModeMediaQuery);
    this.darkModeMediaQuery.addListener(this.setDarkMode);
    this.getLang();
  },
  beforeDestroy() {
    this.darkModeMediaQuery.removeListener(this.setDarkMode);
  },
  methods: {
    setDarkMode: function(e) {
      const isDark = e.matches;
      if (isDark) {
        // Dark
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
      } else {
        // Light
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
      }
      this.$store.commit("setDarkMode", isDark);
    },
    getLang: function() {
      const lang =
        (window.navigator.languages && window.navigator.languages[0]) ||
        window.navigator.language ||
        window.navigator.userLanguage ||
        window.navigator.browserLanguage;
      this.$store.commit("setLang", lang);
    }
  }
};
</script>

<style>
:root {
  --main-text: #333;
  --main-bg: #fff;
}
@media (prefers-color-scheme: dark) {
  :root {
    --main-text: #ddd;
    --main-bg: #000;
  }
}

body {
  color: var(--main-text);
  background-color: var(--main-bg);
  transition: 0.5s;
}

html,
body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

#main {
}

#nav {
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
