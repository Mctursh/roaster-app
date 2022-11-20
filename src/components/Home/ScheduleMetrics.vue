<template>
  <div class="px-4 py-4 schedule-metrics">
    <p class="fw-700 fs-18 lh-16 grey mb-3">This month you have</p>
    <div class="d-flex justify-content-around align-items-center">
      <div class="text-align-center shift">
        <h1 class="blue-primary">9</h1>
        <span class="blue-primary">Morning Shifts</span>
      </div>
      <div class="text-align-center shift">
        <h1 class="blue-primary">13</h1>
        <span class="blue-primary">Night Shifts</span>
      </div>
      <div class="text-align-center shift">
        <h1 class="blue-primary">2</h1>
        <span class="blue-primary">Off Days</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.schedule-metrics {
  p,
  h1 {
    margin: 0;
  }
  height: 288px;
  > div {
    height: 75%;
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

  .shift {
    h1 {
      font-weight: 700;
      font-size: 48px;
      line-height: 54px;
    }
    span {
      font-weight: 400;
      font-size: 18px;
      line-height: 16px;
    }
  }
}
</style>