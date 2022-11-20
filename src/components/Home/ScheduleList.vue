<template>
  <div class="px-4 py-4 sub-schedule w-100 d-flex align-items-start c-gap-4">
    <div
      class="
        d-flex
        justify-content-center
        flex-column
        align-items-center
        r-gap-1
      "
    >
      <p class="light-blue-primary fs-16 fw-700 lh-20">Sat</p>
      <p class="light-blue-primary fs-16 fw-700 lh-20">19 Nov</p>
      <p class="yellow yellow-bg">M</p>
      <div class="light-blue-primary-bg"></div>
    </div>
    <div
      class="
        d-flex
        justify-content-center
        flex-column
        align-items-center
        r-gap-1
      "
    >
      <p class="grey-secondary fs-16 fw-400 lh-20">Sat</p>
      <p class="grey-secondary fs-16 fw-400 lh-20">19 Nov</p>
      <p class="purple purple-bg">M</p>
      <!-- <div class="light-blue-primary-bg"></div> -->
    </div>
    <div
      class="
        d-flex
        justify-content-center
        flex-column
        align-items-center
        r-gap-1
      "
    >
      <p class="grey-secondary fs-16 fw-400 lh-20">Sat</p>
      <p class="grey-secondary fs-16 fw-400 lh-20">19 Nov</p>
      <p class="purple purple-bg">M</p>
      <!-- <div class="light-blue-primary-bg"></div> -->
    </div>
    <div
      class="
        d-flex
        justify-content-center
        flex-column
        align-items-center
        r-gap-1
      "
    >
      <p class="grey-secondary fs-16 fw-400 lh-20">Sat</p>
      <p class="grey-secondary fs-16 fw-400 lh-20">19 Nov</p>
      <p class="purple purple-bg">M</p>
      <!-- <div class="light-blue-primary-bg"></div> -->
    </div>
    <div
      class="
        d-flex
        justify-content-center
        flex-column
        align-items-center
        r-gap-1
      "
    >
      <p class="grey-secondary fs-16 fw-400 lh-20">Sat</p>
      <p class="grey-secondary fs-16 fw-400 lh-20">19 Nov</p>
      <p class="purple purple-bg">M</p>
      <!-- <div class="light-blue-primary-bg"></div> -->
    </div>
    <div
      class="
        d-flex
        justify-content-center
        flex-column
        align-items-center
        r-gap-1
      "
    >
      <p class="grey-secondary fs-16 fw-400 lh-20">Sat</p>
      <p class="grey-secondary fs-16 fw-400 lh-20">19 Nov</p>
      <p class="purple purple-bg">M</p>
      <!-- <div class="light-blue-primary-bg"></div> -->
    </div>
    <div
      class="
        d-flex
        justify-content-center
        flex-column
        align-items-center
        r-gap-1
      "
    >
      <p class="grey-secondary fs-16 fw-400 lh-20">Sat</p>
      <p class="grey-secondary fs-16 fw-400 lh-20">19 Nov</p>
      <p class="purple purple-bg">M</p>
      <!-- <div class="light-blue-primary-bg"></div> -->
    </div>
    <div
      class="
        d-flex
        justify-content-center
        flex-column
        align-items-center
        r-gap-1
      "
    >
      <p class="grey-secondary fs-16 fw-400 lh-20">Sat</p>
      <p class="grey-secondary fs-16 fw-400 lh-20">19 Nov</p>
      <p class="purple purple-bg">M</p>
      <!-- <div class="light-blue-primary-bg"></div> -->
    </div>
    <div
      class="
        d-flex
        justify-content-center
        flex-column
        align-items-center
        r-gap-1
      "
    >
      <p class="grey-secondary fs-16 fw-400 lh-20">Sat</p>
      <p class="grey-secondary fs-16 fw-400 lh-20">19 Nov</p>
      <p class="purple purple-bg">M</p>
      <!-- <div class="light-blue-primary-bg"></div> -->
    </div>
    <div
      class="
        d-flex
        justify-content-center
        flex-column
        align-items-center
        r-gap-1
      "
    >
      <p class="grey-secondary fs-16 fw-400 lh-20">Sat</p>
      <p class="grey-secondary fs-16 fw-400 lh-20">19 Nov</p>
      <p class="purple purple-bg">M</p>
      <!-- <div class="light-blue-primary-bg"></div> -->
    </div>
    <div
      class="
        d-flex
        justify-content-center
        flex-column
        align-items-center
        r-gap-1
      "
    >
      <p class="grey-secondary fs-16 fw-400 lh-20">Sat</p>
      <p class="grey-secondary fs-16 fw-400 lh-20">19 Nov</p>
      <p class="purple purple-bg">M</p>
      <!-- <div class="light-blue-primary-bg"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ScheduleList",
};
</script>

<style lang="scss" scoped>
.sub-schedule {
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0.8)
    ),
    #f0f5ff;
  border: 1px solid #d0d5dd;
  border-radius: 10px;

  > div {
    p {
      margin: 0 !important;
      &:nth-child(3) {
        font-weight: 700;
        font-size: 32px;
        line-height: 40px;
        padding: 0.525em 0.75em;
        border-radius: 10px;
      }
      // &:nth-child(1){}
      // &:nth-child(1){}
    }
    div {
      height: 10px;
      width: 10px;
      border-radius: 50%;
    }
  }
}
</style>