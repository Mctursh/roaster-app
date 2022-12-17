<template>
  <div class="px-4 py-4 schedule-request">
    <p class="fw-700 fs-18 lh-16 grey mb-3">Requests</p>
    <div
      v-if="!requests.length"
      class="h-100 d-flex justify-content-center align-items-center"
    >
      <span class="fw-400 fs-16 lh-24 grey"> There are no requests </span>
    </div>
    <div v-else class="d-flex flex-column r-gap-3">
      <div
        v-for="(req, i) in requests"
        :key="i"
        class="d-flex justify-content-between align-items-center"
      >
        <div class="request-info d-flex flex-column">
          <p class="fw-400 fs-16 lh-24 grey">
            {{ req.targetShift != "O" ? "Swap Shift" : "Off Day" }}
          </p>
          <p class="light-grey fw-400 fs-13 lh-24">
            {{ convertDate(req.date) }}
          </p>
        </div>
        <div class="request-status">
          <span
            :class="{
              'pending-primary pending-primary-bg':
                req.approval.status == 'Pending',
              'denied-primary denied-primary-bg':
                req.approval.status == 'Declined',
              'approved-primary approved-primary-bg':
                req.approval.status == 'Approved',
            }"
            class="fw-400 fs-13 lh-24"
            >{{ req.approval.status }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "@/auth/axios";
import { mapState } from "vuex";

export default {
  name: "ScheduleRequest",
  data() {
    return {
      monthsArray: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      requests: [],
    };
  },
  computed: {
    ...mapState(["structure", "userId"]),
    computedReq() {
      return this.structure.request;
    },
  },
  mounted() {
    this.getUserRequests();
  },
  methods: {
    getUserRequests() {
      Axios.get(`/requests/get-user-request/${this.userId}`).then((r) => {
        this.requests = r.data.data;
      });
    },
    convertDate(date) {
      let d = new Date(date);
      let day = d.getDate();
      let month = this.monthsArray[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${month} ${year}`;
    },
  },
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
  width: 30%;

  .request-status span {
    padding: 0.3em 0.725em;
    border-radius: 10px;
  }
}
</style>