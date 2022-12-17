<template>
  <div>
    <div class="request-parent">
      <aside class="text-align-left">
        <div class="in-progress">
          <p class="mb-4 fs-13 fw-400 lh-24 light-grey">In progress</p>
          <div
            v-if="!computedShiftsInprogress.length"
            class="text-align-center"
          >
            <span class="fw-400 fs-16 lh-24 grey">
              There are no pending requests
            </span>
          </div>
          <div v-else class="d-flex flex-column reqs">
            <div
              v-for="(req, i) in computedShiftsInprogress"
              :key="i"
              class="
                d-flex
                align-items-center
                justify-content-between
                c-gap-3
                req
                cursor-pointer
              "
              :class="{ selected: req._id == selectedShifId }"
              @click="handleRequest(req)"
            >
              <div class="d-flex align-items-center c-gap-3">
                <div
                  class="d-flex justify-content-center align-items-center img"
                >
                  {{
                    `${req.requestUserData.firstName[0].toUpperCase()}${req.requestUserData.lastName[0].toUpperCase()}`
                  }}
                </div>
                <div class="info">
                  <p class="mb-0 grey fw-400 fs-13 lh-24">
                    <!-- 1 person requested Day Off -->
                    {{
                      req.targetShift != "O"
                        ? "Shift Swap Requested"
                        : "Off Day Requested"
                    }}
                  </p>
                  <p class="mb-0 light-grey fw-400 fs-13 lh-24">
                    {{
                      `${convertDate(req.date)} · ${
                        (req.targetShift == "M" && "Morning") ||
                        (req.targetShift == "N" && "Night") ||
                        ""
                      }`
                    }}
                  </p>
                </div>
              </div>
              <div class="time">
                <!-- <p class="light-grey fw-400 fs-13 lh-24">
                  {{ req.createdTime }}
                </p> -->
              </div>
            </div>
          </div>
        </div>
        <div class="in-progress">
          <p class="mb-4 fs-13 fw-400 lh-24 light-grey">Completed</p>
          <div v-if="!computedShiftsCompleted.length" class="text-align-center">
            <span class="fw-400 fs-16 lh-24 grey">
              There are no completed requests
            </span>
          </div>
          <div v-else class="d-flex flex-column reqs">
            <div
              v-for="(req, i) in computedShiftsCompleted"
              :key="i"
              class="
                d-flex
                align-items-center
                justify-content-between
                c-gap-3
                req
                cursor-pointer
              "
              :class="{ selected: req._id == selectedShifId }"
              @click="handleRequest(req)"
            >
              <div class="d-flex align-items-center c-gap-3">
                <div
                  class="d-flex justify-content-center align-items-center img"
                >
                  {{
                    `${req.requestUserData.firstName[0].toUpperCase()}${req.requestUserData.lastName[0].toUpperCase()}`
                  }}
                </div>
                <div class="info">
                  <p class="mb-0 grey fw-400 fs-13 lh-24">
                    <!-- 1 person requested Day Off -->
                    {{
                      `${
                        req.targetShift != "O"
                          ? "Shift Swap Requested"
                          : "Off Day Requested"
                      } ${req.approval.status}`
                    }}
                  </p>
                  <p class="mb-0 light-grey fw-400 fs-13 lh-24">
                    {{
                      `${convertDate(req.date)}  ${
                        (req.targetShift == "M" && "· Morning Shift") ||
                        (req.targetShift == "N" && "· Night Shift") ||
                        ""
                      }`
                    }}
                  </p>
                </div>
              </div>
              <div class="time">
                <!-- <p class="light-grey fw-400 fs-13 lh-24">
                  {{ req.createdTime }}
                </p> -->
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div v-if="selectedShift">
        <div class="d-flex align-items-center justify-content-between title">
          <p class="mb-0 blue-primary fw-700 fs-16 lh-24">
            {{
              `${
                selectedShift.targetShift != "O" ? "Swap Shift" : "Day Off"
              } Request`
            }}
          </p>
          <span class="fw-400 fs-13 lh-24 light-grey">{{
            `${
              selectedShift.approval.status == "Pending"
                ? "Pending Approval"
                : selectedShift.approval.status
            }`
          }}</span>
        </div>
        <div
          class="request-modal d-flex justify-content-center align-items-center"
        >
          <div class="d-flex flex-column r-gap-2">
            <div class="d-flex align-items-center c-gap-3">
              <div class="d-flex justify-content-center align-items-center img">
                {{
                  `${selectedShift.requestUserData.firstName[0].toUpperCase()}${selectedShift.requestUserData.lastName[0].toUpperCase()}`
                }}
              </div>
              <div class="text-align-left info">
                <p class="mb-0 grey fw-700 fs-16 lh-24">
                  {{
                    `${selectedShift.requestUserData.firstName} ${selectedShift.requestUserData.lastName}`
                  }}
                </p>
                <p class="mb-0 light-grey fw-400 fs-13 lh-24">
                  {{
                    `${convertDate(selectedShift.date)} · ${
                      (selectedShift.userShift == "M" && "Morning Shift") ||
                      (selectedShift.userShift == "N" && "Night Shift") ||
                      ""
                    }`
                  }}
                </p>
              </div>
            </div>
            <div
              v-if="selectedShift.targetShift != 'O'"
              class="d-flex flex-column r-gap-1 text-align-left"
            >
              <p class="mb-0 light-grey fw-400 fs-13 lh-24 text-capitalize">
                <!-- Nurse · Morning Shift -->
                {{
                  `${selectedShift.targetUserData.firstName} ${
                    selectedShift.targetUserData.lastName
                  }· ${
                    (selectedShift.targetShift == "M" && "Morning") ||
                    (selectedShift.targetShift == "N" && "Night") ||
                    ""
                  }`
                }}
              </p>
              <p class="mb-0 grey fw-700 fs-16 lh-24">
                {{ convertDate(selectedShift.date) }}
              </p>
            </div>
            <div
              v-if="selectedShift.approval.status == 'Pending'"
              class="w-100 req-action c-gap-3"
            >
              <b-button
                @click="handleRequestState('Declined')"
                class="fw-600 fs-16 lh-24 grey"
                variant="light"
                >Deny</b-button
              >
              <b-button
                @click="handleRequestState('Approved')"
                class="fw-600 fs-16 lh-24 blue-primary-bg white"
                >Approve</b-button
              >
            </div>
            <div v-else class="d-flex align-items-center mt-auto">
              <b-icon-check
                v-if="selectedShift.approval.status == 'Approved'"
                class="h3 blue-primary"
              ></b-icon-check>
              <b-icon-x v-else class="h3 denied-primary"></b-icon-x>
              <p
                class="mb-0 fw-600 fs-16 lh-24 text-capitalize"
                :class="[
                  selectedShift.approval.status == 'Approved'
                    ? 'blue-primary'
                    : 'denied-primary',
                ]"
              >
                {{
                  `${selectedShift.approval.status} ${new Date(
                    selectedShift.approval.date
                  ).toDateString()} by Dr ${userData.firstName}`
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="d-flex align-items-center justify-content-center">
        <p class="mb-0 grey fw-700 fs-16 lh-24">
          You have not selected any Request
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "@/auth/axios";
import { mapState } from "vuex";

export default {
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
      selectedShifId: "",
      selectedShift: "",
      requests: [],
    };
  },
  computed: {
    ...mapState(["structure", "userData"]),
    computedShiftsInprogress() {
      let toReturn = [];
      this.requests.forEach((req) => {
        if (req.approval.status == "Pending") {
          toReturn.push(req);
        }
      });
      return toReturn;
    },
    computedShiftsCompleted() {
      let toReturn = [];
      this.requests.forEach((req) => {
        if (req.approval.status != "Pending") {
          toReturn.push(req);
        }
      });
      return toReturn;
    },
  },
  mounted() {
    this.getAllRequests();
  },
  methods: {
    getAllRequests() {
      Axios.get(`/requests/get-all-user-request/`).then((r) => {
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
    handleRequest(req) {
      this.selectedShifId = req._id;
      this.selectedShift = req;
    },
    handleRequestState(status) {
      this.selectedShift.approval.date = new Date();
      this.selectedShift.approval.approvalAdminData = this.userData;
      this.selectedShift.approval.status = status;

      const payload = {
        ...this.selectedShift,
      };
      console.log(payload);
      Axios.patch(`/requests/update-request/${payload._id}`, payload).then(
        () => {}
      );
      // this.structure.request.forEach((req, idx) => {
      //   if (req.shiftId == this.selectedShifId) {
      //     this.structure.request[idx].state = state;
      //   }
      // });
      // this.$store.commit("UPDATE_STRUCTURE", this.structure);
    },
  },
};
</script>

<style lang="scss" scoped>
.request-parent {
  display: grid;
  grid-template-columns: 1fr 3fr;

  aside {
    border-right: 1px solid #d0d5dd;
    height: 80vh;

    .in-progress {
      > p {
        padding: 0.725em 1em 0.725em 2em;
      }
    }

    .reqs {
      max-height: 35vh;
      overflow-y: auto;
    }

    .req {
      padding: 0.725em 1em 0.725em 2em;
      &.selected {
        background-color: #f2f4f7;
      }
      &:hover {
        background-color: #f2f4f7;
      }
    }
  }
  .img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #dc1bb2;
  }

  .title {
    border-bottom: 1px solid #d0d5dd;
    padding: 1.85em 8em 1.85em 2.1em;
  }

  .request-modal {
    background: #f5f5f5;
    height: 100%;
    > div {
      width: 483px;
      min-height: 206px;
      background: #ffffff;
      border-radius: 10px;
      padding: 0.725em 2.1em 1.8em;
    }
  }
  .req-action {
    display: grid;
    margin-top: auto;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>