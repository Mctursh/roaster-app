<template>
  <div
    class="
      login-parent
      d-flex
      justify-content-center
      align-items-center
      flex-column
    "
  >
    <h1>UBTH Shift Management System</h1>
    <div class="mt-4">
      <h3>Log in to your account</h3>
      <p>Welcome! Please enter your work details.</p>
      <div>
        <span>Email</span>
        <b-form-input
          type="email"
          v-model="email"
          placeholder="Enter your email"
        ></b-form-input>
      </div>
      <div>
        <span>Password</span>
        <b-form-input
          type="password"
          v-model="email"
          placeholder="Enter your passowrd"
        ></b-form-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.login-parent {
  height: 100vh;
}
</style>