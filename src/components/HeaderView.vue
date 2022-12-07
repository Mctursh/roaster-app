<template>
  <div>
    <!-- px-5 -->
    <header
      class="d-flex justify-content-between align-items-center blue-primary-bg"
    >
      <h4 class="white fw-700 fs-18 lh-16">
        UBTH - Department of Family Medicine
      </h4>
      <div class="d-flex align-items-center c-gap-3">
        <b-button class="fw-600 fs-16 lh-24 grey" variant="light"
          >My Account</b-button
        >
        <p @click="handleLogOut" class="white fw-600 fs-16 lh-24 cursor-pointer">Log Out</p>
      </div>
    </header>
    <nav class="d-flex justify-content-between align-items-center white-bg">
      <div class="d-flex align-items-center c-gap-3">
        <router-link v-if="!isAdmin" :to="{ name: 'dashboard' }">
          <p class="fw-700 fs-16 lh-24">Home</p>
        </router-link>
        <router-link :to="{ name: 'schedule' }">
          <p class="fw-700 fs-16 lh-24">Schedule</p>
        </router-link>
        <router-link v-if="isAdmin" :to="{ name: 'request' }">
          <p class="fw-700 fs-16 lh-24">Requests</p>
        </router-link>
      </div>
      <div>
        <p class="fw-700 fs-16 lh-24">Notification</p>
      </div>
    </nav>
  </div>
</template>

<script>
import Axios from '@/auth/axios';
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isAdmin"]),
    activePage() {
      return this.$route;
    },
  },
  methods: {
    handleLogOut(){
        Axios.post('/logout').then(r => {
          console.log(r);
          this.$store.commit('UPDATE_AUTH', false)
          this.$store.commit('UPDATE_ADMIN', false)
          this.$router.push({name: 'login'})
        })
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  min-height: 10vh;
  max-height: 80px;
  padding: 2em 8em;
  border-bottom: 1px solid #f2f4f7;
  p,
  h4 {
    margin: 0 !important;
  }
}

nav {
  a {
    &.router-link-exact-active {
      color: #0354a6;
    }
    &:hover {
      text-decoration: none;
    }
  }
  min-height: 10vh;
  max-height: 80px;
  padding: 2em 8em;
  border-bottom: 1px solid #d0d5dd;
  p,
  h4 {
    margin: 0 !important;
  }
}
</style>