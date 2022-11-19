<template>
  <div v-if="loginStep == 1">
    <div
      class="
        login-parent
        d-flex
        justify-content-center
        align-items-center
        flex-column
      "
    >
      <h1 class="blue-primary fw-700">UBTH Shift Management System</h1>
      <div class="mt-4 d-flex flex-column">
        <h3>Log in to your account</h3>
        <p>Welcome! Please enter your work details.</p>
        <div class="d-flex flex-column mb-3">
          <div class="text-align-left">
            <span>Email</span>
            <b-form-input
              type="email"
              v-model="email"
              placeholder="Enter your email"
            ></b-form-input>
          </div>
          <div class="text-align-left mt-3">
            <span>Password</span>
            <b-form-input
              type="password"
              v-model="password"
              placeholder="Enter your passowrd"
            ></b-form-input>
          </div>
        </div>
        <span class="blue-primary fs-14 lh-20">Forgot password?</span>
        <b-button
          @click="handleLogin"
          class="blue-primary-bg mt-3 fw-600 fs-16 lh-24"
          >Sign in</b-button
        >
      </div>
    </div>
  </div>
  <div v-else>
    <div
      class="
        login-parent
        d-flex
        justify-content-center
        align-items-center
        flex-column
        r-gap-3
      "
    >
      <h1 class="blue-primary fw-700">
        Welcome To UBTH Shift Management System
      </h1>
      <p>
        You are signed in to Department of Family Medecine, General Practice
        Clinic
      </p>
      <b-button
        @click="handleContinue"
        class="blue-primary-bg mt-3 fw-500 fs-16 lh-24"
        >Continue</b-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      loginStep: 1,
    };
  },
  computed: {
    ...mapState([
      "isAuthenticated",
      "authUserEmail",
      "authUserPassword",
      "authAdminEmail",
      "authAdminPassword",
    ]),
  },
  methods: {
    handleLogin() {
      if (this.loginStep == 2) {
        //go to dashboard
      }
      switch (this.email.toLowerCase()) {
        case this.authUserEmail:
          if (this.password === this.authUserPassword) {
            this.loginStep = 2;
          } else {
            //wrong user password
          }
          break;
        case this.authAdminEmail:
          if (this.password === this.authAdminPassword) {
            this.$store.commit("UPDATE_TOUR", true);
            this.loginStep = 2;
          } else {
            //wrong admin password
          }
          break;
        default:
          break;
      }
    },
    handleContinue() {
      //goto Dashboard
      this.$store.commit("UPDATE_TOUR", true);
      this.$store.commit("UPDATE_AUTH", true);
      this.$router.push({ path: "dashboard" });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-parent {
  height: 100vh;
}
</style>