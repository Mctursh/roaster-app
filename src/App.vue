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


<style lang="scss" >
// @import "~@/assets/scss/vendors/bootstrap-vue/index";
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

* {
  margin: 0;
  padding: 0;
}
.d-flex {
  display: flex !important;

  &.justify-content-center {
    justify-content: center;
  }

  &.align-items-center {
    align-content: center;
  }

  &.flex-column {
    flex-direction: column;
  }
}

.fs {
  &-10 {
    font-size: 10px;
  }
  &-12 {
    font-size: 12px;
  }
  &-13 {
    font-size: 13px;
  }
  &-15 {
    font-size: 15px;
  }
  &-16 {
    font-size: 16px;
  }
  &-17 {
    font-size: 17px;
  }
  &-20 {
    font-size: 20px;
  }
  &-24 {
    font-size: 24px;
  }
  &-25 {
    font-size: 25px;
  }
}

.r-gap-1 {
  row-gap: 0.5em;
}
.r-gap-2 {
  row-gap: 0.75em;
}
.r-gap-3 {
  row-gap: 1em;
}
.r-gap-4 {
  row-gap: 1.5em;
}
.r-gap-5 {
  row-gap: 2em;
}
.r-gap-6 {
  row-gap: 2.5em;
}

.c-gap-1 {
  column-gap: 0.5em;
}
.c-gap-2 {
  column-gap: 0.75em;
}
.c-gap-3 {
  column-gap: 1em;
}
.c-gap-4 {
  column-gap: 1.5em;
}
.c-gap-5 {
  column-gap: 2em;
}
.c-gap-6 {
  column-gap: 2.5em;
}

.lh {
  &-15 {
    line-height: 15px;
  }
  &-16 {
    line-height: 16px;
  }
  &-17 {
    line-height: 17px;
  }
  &-18 {
    line-height: 18px;
  }
  &-19 {
    line-height: 19px;
  }
  &-20 {
    line-height: 20px;
  }
  &-21 {
    line-height: 21px;
  }
  &-22 {
    line-height: 22px;
  }
  &-23 {
    line-height: 23px;
  }
  &-24 {
    line-height: 24px;
  }
  &-25 {
    line-height: 25px;
  }
}
</style>
