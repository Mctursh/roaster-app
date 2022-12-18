<template>
  <div>
    <!-- <b-button
        @click="handleRequestState('Approved')"
        class="fw-600 fs-16 lh-24 blue-primary-bg white"
        ><span class="fs-23">+</span> New Request</b-button
    > -->
    <div class="table-parent">
      <table class="w-100">
        <tr>
          <td></td>
          <td v-for="(date, idx) in tableHeaders" :key="idx">
            <div class="d-flex flex-column text-align-center">
              <p class="light-blue-primary fs-16 fw-700 lh-20 text-capitalize">
                {{ date.dayName }}
              </p>
              <p class="light-blue-primary fs-16 fw-700 lh-20">
                {{ `${date.day} ${date.month}` }}
              </p>
            </div>
          </td>
        </tr>
        <tr v-for="(shift, j) in tableData" :key="j">
          <td :class="{ 'blue-primary-bg white': shift.id == userId }">
            <p>{{ shift.name }}</p>
          </td>
          <td
            v-for="(val, i) in shift.shifts"
            :key="i"
            class="px-2 py-2"
            @click="showModal(val, shift)"
            :class="{ 'primary-bg': shift.id == userId }"
          >
            <!-- v-b-modal.modal-center -->
            <div
              v-if="val.shift != 'O'"
              :class="{
                'dark-purple-bg': val.shift == 'N',
                'dark-yellow-bg': val.shift == 'M',
              }"
            >
              <!-- :class="[val.shift == 'N' && 'dark-purple-bg' : 'dark-yellow-bg']" -->
              <span class="white fw-700 fs-13 lh-16"> {{ val.shift }} </span>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="d-flex align-items-center c-gap-3 justify-content-end mt-4">
      <b-button
        @click="prevSchedules"
        class="fw-600 fs-16 lh-24 grey"
        variant="light"
        >Previous</b-button
      >
      <b-button
        @click="nextSchedules"
        class="fw-600 fs-16 lh-24 grey"
        variant="light"
        >Next</b-button
      >
    </div>
    <b-modal
      id="modal-center"
      :hide-footer="true"
      :hide-header="true"
      modal-title="No"
      modal-header="No"
      centered
    >
      <div class="schedule-modal px-4 py-4">
        <p class="fw-700 fs-18 lh-16 mb-4">Request swap</p>
        <p class="fw-600 fs-14 lh-20 mb-2">{{ targetUserName }}</p>
        <div class="select-date mb-5">
          <!-- <b-form-input :value="new Date()" @input="handleInput" :id="`type-date`" :type="'date'"></b-form-input> -->
          <!-- :value="dateValue" -->
          <!-- @input="handleDateInput" -->
          <!-- v-if="show" -->
          <!-- @input="isDateStartInput" -->
          <DatePicker
            :allowFutureDate="true"
            :allowPastDate="false"
            dateId="startDate"
            :value="selectedDate"
          />
        </div>
        <div class="py-2 d-flex flex-column r-gap-3 mb-3">
          <p class="fw-600 fs-14 lh-20">Select Shift</p>
          <div class="select-shifts cursor-pointer">
            <p
              :class="{ selected: targetShift == 'M' }"
              @click="handleShiftChange('M')"
            >
              Day Shift
            </p>
            <p
              :class="{ selected: targetShift == 'N' }"
              @click="handleShiftChange('N')"
            >
              Night Shift
            </p>
            <p
              :class="{ selected: targetShift == 'O' }"
              @click="handleShiftChange('F')"
            >
              Off Duty
            </p>
          </div>
        </div>
        <div class="w-100 req-action c-gap-3">
          <b-button
            @click="closeModal"
            class="fw-600 fs-16 lh-24 grey"
            variant="light"
            >Cancel</b-button
          >
          <b-button
            @click="handleApply"
            class="fw-600 fs-16 lh-24 blue-primary-bg white"
            >Apply</b-button
          >
        </div>
      </div>
    </b-modal>

    <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide>
    </b-toast>
  </div>
</template>

<script>
import moment from "moment";
import DatePicker from "./DatePicker.vue";
import { mapState } from "vuex";
import Axios from "@/auth/axios";
export default {
  name: "ScheduleTable",
  components: {
    DatePicker,
  },
  props: {
    users: {
      type: Array,
    },
  },
  data() {
    return {
      page: 0,
      activePage: 0,
      start: 0,
      end: 14,
      selectedShift: "N",
      targetShift: "N",
      targetUserId: null,
      targetDate: "",
      targetDateObj: "",
      targetUserName: "",
      targetUserObj: {},
      selectedDate: "",
    };
  },
  watch: {
    users: {
      handler() {
        let arr = this.users[0].shifts;
        for (let i = 0; i < arr.length; i++) {
          const shift = arr[i];
          if (
            moment(shift.date).isSame(moment().add(this.page, "week"), "week")
          ) {
            this.page = Math.ceil(i / 7);
            i += arr.length;
          }
        }
      },
    },
  },
  computed: {
    ...mapState(["dates", "structure", "userId"]),
    dateToShow() {
      return this.dates.slice(this.start, this.end);
    },
    tableHeaders() {
      return (this.tableData[0] && this.tableData[0].shifts) || [];
    },
    tableData() {
      let toReturn = [];
      this.users.forEach((user) => {
        let currUser = {
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          shifts: [],
        };
        user.shifts.forEach((shift) => {
          if (
            moment(shift.date).isSame(
              moment().add(this.activePage, "week"),
              "week"
            )
          ) {
            let temp = moment(shift.date);

            currUser.shifts.push({
              ...shift,
              dayName: temp.format("ddd"),
              day: temp.format("D"),
              month: temp.format("MMM"),
            });
          }
        });

        toReturn.push(currUser);
      });

      return toReturn;
    },
  },

  methods: {
    handleInput(evt) {
      this.targetDate = evt;
    },
    handleApply() {
      let payload = {
        date: this.targetDateObj,
        requestUser: this.users.filter((user) => user._id == this.userId)[0],
        targetUser: this.targetUserObj,
        // userShift,
        targetShift: this.targetShift,
      };

      console.log(payload);

      Axios.post("/requests/create", payload).then((r) => {
        this.makeToast("success");
        console.log(r);
        this.closeModal();
      });
      // this.structure.request.push(req)
      // this.$store.commit('UPDATE_STRUCTURE', this.structure)
    },
    handleShiftChange(evt) {
      this.targetShift = evt;
    },
    makeToast(variant = null) {
      this.$bvToast.toast("Request Successful", {
        title: `Success`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
      });
    },
    showModal(val, userObj) {
      if (userObj.id == this.userId) {
        this.targetShift = "O";
      } else {
        this.targetShift = val.shift;
      }
      let temp = moment(val.date);
      this.targetDateObj = val.date;
      this.selectedDate = `${temp.format("MMM")} ${temp.format(
        "DD"
      )}, ${temp.format("YYYY")}`;
      this.targetUserId = userObj.id;
      this.targetUserName = userObj.name;
      this.targetUserObj = userObj;
      this.selectedShift = val.shift;
      this.$bvModal.show("modal-center");
    },
    closeModal() {
      this.$bvModal.hide("modal-center");
    },
    nextSchedules() {
      if (this.page < Math.ceil(this.users[0].shifts.length / 7) - 1) {
        this.page++;
        this.activePage++;
      }
      // this.start += 14;
      // this.end += 14;
    },
    prevSchedules() {
      if (this.page > 0) {
        this.page--;
        this.activePage--;
      }
      // this.start -= 14;
      // this.end -= 14;
    },
  },
};
</script>

<style lang="scss" scoped>
.table-parent {
  background: #ffffff;
  border: 1px solid #d0d5dd;
  border-radius: 10px;
}
table {
  tr {
    border-bottom: 1px solid #d0d5dd;

    &:last-of-type {
      border-bottom: none;
    }

    td {
      border-right: 1px solid #d0d5dd;

      div {
        padding: 0.5em 0.7em;
      }
      &:last-of-type {
        border-right: none;
      }
    }
  }
}

p {
  margin: 0;
}

button {
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
}

.select-date {
  width: 40%;
  height: 38px;
}

.select-shifts {
  background: #f2f4f7;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  padding: 0.125em;
  height: 38px;

  p {
    color: #000000;
    text-align: center;
    height: 100%;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.selected {
      border-radius: 8px;
      background-color: #ffba78;
      color: #ffffff;
    }
  }
}
.req-action {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>