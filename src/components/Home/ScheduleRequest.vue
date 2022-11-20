<template>
  <div class="px-4 py-4 schedule-request">
    <p class="fw-700 fs-18 lh-16 grey mb-3">Requests</p>
    <div class="d-flex flex-column r-gap-3">
      <div class="d-flex justify-content-between align-items-center">
        <div class="request-info d-flex flex-column">
          <p class="fw-400 fs-16 lh-24 grey">Swap Shift</p>
          <p class="light-grey fw-400 fs-13 lh-24">27 Nov 2022</p>
        </div>
        <div class="request-status">
          <span class="pending-primary pending-primary-bg fw-400 fs-13 lh-24"
            >Pending</span
          >
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="request-info d-flex flex-column">
          <p class="fw-400 fs-16 lh-24 grey">Swap Shift</p>
          <p class="light-grey fw-400 fs-13 lh-24">27 Nov 2022</p>
        </div>
        <div class="request-status">
          <span class="approved-primary approved-primary-bg fw-400 fs-13 lh-24"
            >Approved</span
          >
        </div>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="request-info d-flex flex-column">
          <p class="fw-400 fs-16 lh-24 grey">Swap Shift</p>
          <p class="light-grey fw-400 fs-13 lh-24">27 Nov 2022</p>
        </div>
        <div class="request-status">
          <span class="denied-primary denied-primary-bg fw-400 fs-13 lh-24"
            >Denied</span
          >
        </div>
      </div>
    </div>
    <!-- <div class="d-flex flex-column r-gap-3">
    </div>
    <div class="d-flex flex-column r-gap-3">
    </div> -->
  </div>
</template>

<script>
export default {
  name: "ScheduleRequest",
};
</script>

<style lang="scss" scoped>
.schedule-request {
  p {
    margin: 0;
  }
  height: 288px;
  > div {
    height: 75%;
    overflow-y: auto;
  }
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    #f0f5ff;
  /* Grey/200 */

  border: 1px solid #d0d5dd;
  border-radius: 10px;
  width: 40%;

  .request-status span {
    padding: 0.3em 0.725em;
    border-radius: 10px;
  }
}
</style>