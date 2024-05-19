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
      <div class="d-flex login-form justify-content-around w-100">
        <div class="mt-4 d-flex flex-column">
          <h3>Log in as admin</h3>
          <div class="d-flex flex-column mb-3">
            <div class="text-align-left">
              <span>Email</span>
              <b-form-input
                type="email"
                v-model="adminEmail"
                placeholder="Enter your email"
              ></b-form-input>
            </div>
            <div class="text-align-left mt-3">
              <span>Password</span>
              <b-form-input
                type="password"
                v-model="adminPassword"
                placeholder="Enter your passowrd"
              ></b-form-input>
            </div>
          </div>
          <span
            @click="toastForgot"
            class="blue-primary fs-14 lh-20 cursor-pointer"
            >Forgot password?</span
          >
          <b-button
            @click="handleAdminLogin"
            class="blue-primary-bg mt-3 fw-600 fs-16 lh-24"
            >Sign in</b-button
          >
        </div>
        <div class="mt-4 d-flex flex-column">
          <h3>Log in as staff</h3>
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
          <span
            @click="toastForgot"
            class="cursor-pointer blue-primary fs-14 lh-20"
            >Forgot password?</span
          >
          <b-button
            @click="handleLogin"
            class="blue-primary-bg mt-3 fw-600 fs-16 lh-24"
            >Sign in</b-button
          >
        </div>
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
    <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide>
    </b-toast>
  </div>
</template>

<script>
import Axios from "@/auth/axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      adminEmail: "",
      adminPassword: "",
      loginStep: 1,
      isAdmin: false,
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
  mounted() {
    // Axios.post("/users/create-admin");
  },
  methods: {
    toastForgot() {
      this.$bvToast.toast(
        "An email with a link to reset your password has been sent",
        {
          title: `Success`,
          toaster: "b-toaster-top-center",
          variant: "success",
          solid: true,
        }
      );
    },
    handleAdminLogin() {
      const payload = { email: this.adminEmail, password: this.adminPassword };
      Axios.post("/login", payload).then((r) => {
        this.$store.dispatch("setAuthUser", r.data.user);
        this.$store.commit("UPDATE_USER_ID", r.data.user._id);
        console.log(r);
        this.handleUserCheck(r.data.user.role);
        this.loginStep = 2;
      });
    },
    handleLogin() {
      const payload = { email: this.email, password: this.password };
      Axios.post("/login", payload).then((r) => {
        this.$store.dispatch("setAuthUser", r.data.user);
        this.$store.commit("UPDATE_USER_ID", r.data.user._id);
        console.log(r);
        this.handleUserCheck(r.data.user.role);
        this.loginStep = 2;
      });
    },
    handleUserCheck(role) {
      switch (role) {
        case "Admin":
          this.isAdmin = true;
          break;
        case "User":
          this.isAdmin = false;
          break;
        default:
          break;
      }
    },
    handleContinue() {
      //goto Dashboard
      this.$store.commit("UPDATE_TOUR", true);
      this.$store.commit("UPDATE_AUTH", true);
      if (this.isAdmin) {
        this.$store.commit("UPDATE_ADMIN", true);
        this.$router.push({ path: "schedule" });
      } else {
        this.$store.commit("UPDATE_ADMIN", false);
        this.$router.push({ path: "dashboard" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-parent {
  height: 100vh;
}
.login-form {
  > div {
    min-width: 30vw;
  }
}
</style>