<template>
  <div id="app">
    <div id="main">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/calendar">Calendar</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<style>
html,
body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
