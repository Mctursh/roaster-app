<template>
  <div id="app">
    <div v-if="!isAuthenticated" class="auth">
      <LoginView />
    </div>
    <div v-else>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
      <router-view />
    </div>
  </div>
</template>

<script>
import LoginView from "../src/views/LoginView.vue";
import { mapState } from "vuex";

export default {
  components: {
    LoginView,
  },
  computed: {
    ...mapState(["isAuthenticated"]),
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
