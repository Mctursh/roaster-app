<template>
  <div class="home text-align-left d-flex flex-column r-gap-3">
    <div>
      <h2 class="fw-700 fs-25 lh-25 grey">Welcome back, Katherine</h2>
      <p class="light-grey fw-400 fs-18 lh-26">
        Track and manage your work schedule all in one place.
      </p>
    </div>
    <ScheduleList />
    <div class="d-flex align-items-center c-gap-5">
      <ScheduleRequests />
      <ScheduleMetrics />
    </div>
  </div>
</template>

<script>
import ScheduleList from "../components/Home/ScheduleList.vue";
import ScheduleMetrics from "../components/Home/ScheduleMetrics.vue";
import ScheduleRequests from "../components/Home/ScheduleRequests.vue";
// @ is an alias to /src

export default {
  components: { ScheduleList, ScheduleRequests, ScheduleMetrics },
  name: "HomeView",
};
</script>

<style lang="scss" scoped>
.home {
  padding: 2em 8em;
}
</style>
