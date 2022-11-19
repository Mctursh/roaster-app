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
        <p class="white fw-600 fs-16 lh-24">Log Out</p>
      </div>
    </header>
    <nav class="d-flex justify-content-between align-items-center white-bg">
      <div class="d-flex align-items-center c-gap-3">
        <router-link :to="{ name: 'dashboard' }">
          <p class="fw-700 fs-16 lh-24">Home</p>
        </router-link>
        <router-link :to="{ name: 'schedule' }">
          <p class="fw-700 fs-16 lh-24">Schedule</p>
        </router-link>
      </div>
      <div>
        <p class="fw-700 fs-16 lh-24">Notification</p>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
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
  min-height: 10vh;
  max-height: 80px;
  padding: 2em 8em;

  border-bottom: 1px solid #d0d5dd;
}
</style>