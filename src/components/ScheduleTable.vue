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
          <td v-for="(date, idx) in dateToShow" :key="idx">
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
        <tr v-for="(shift, j) in structure.users" :key="j">
          <td>
            <p>{{ shift.position }}</p>
          </td>
          <td
            v-for="(val, i) in shift.shifts.slice(start, end)"
            :key="i"
            class="px-2 py-2"
            @click="showModal(val, shift.id)"
          >
            <!-- v-b-modal.modal-center -->
            <div
              v-if="val != 'F'"
              :class="[val == 'N' ? 'dark-purple-bg' : 'dark-yellow-bg']"
            >
              <span class="white fw-700 fs-13 lh-16"> {{ val }} </span>
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
    <b-modal id="modal-center" :hide-footer="true" :hide-header="true" modal-title="No" modal-header="No" centered>
      <div class="schedule-modal px-4 py-4">
        <p class="fw-700 fs-18 lh-16 mb-4" >Modify Schedule</p>
        <p class="fw-600 fs-14 lh-20 mb-2" >Katherin Aihoun</p>
        <div class="select-date mb-5" >
          <b-form-input @input="handleInput" :id="`type-date`" :type="'date'"></b-form-input>
        </div>
        <div class="py-2 d-flex flex-column r-gap-3 mb-3">
          <p class="fw-600 fs-14 lh-20">Select Shift</p>
          <div class="select-shifts cursor-pointer">
            <p :class="{selected : targetShift == 'M'}" @click="handleShiftChange('M')">Day Shift</p>
            <p :class="{selected : targetShift == 'N'}" @click="handleShiftChange('N')">Night Shift</p>
            <p :class="{selected : targetShift == 'F'}" @click="handleShiftChange('F')" >Off Duty</p>
          </div>
        </div>
        <div class="w-100 req-action c-gap-3" >
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
import { mapState } from "vuex";
export default {
  name: "ScheduleTable",
  data() {
    return {
      page: 1,
      start: 0,
      end: 14,
      selectedShift: "N",
      targetShift: "N",
      targetUserId: null,
      targetDate: ''
    };
  },
  computed: {
    ...mapState(["dates", "structure"]),
    dateToShow() {
      return this.dates.slice(this.start, this.end);
    },
  },
  methods: {
    handleInput(evt){
      this.targetDate = evt
    },
    handleApply(){
      this.makeToast('success')
      let req = {
        reqStatus: "Pending",
        state: "Pending",
        reqUserId: 1,
        currentShift: this.selectedShift,
        targetShift: this.targetShift,
        targetUserId: this.targetUserId,
        targetDate: this.targetDate,
        approvalAdminName: 'Prof Princewill',
        createdTime: new Date().toLocaleTimeString(),
        statusTime: "",
        shiftId: new Date().getTime()
      }
      this.structure.request.push(req)
      this.$store.commit('UPDATE_STRUCTURE', this.structure)
      this.closeModal()
    },
    handleShiftChange(evt){
      this.targetShift = evt
    },
    makeToast(variant = null) {
      this.$bvToast.toast('Request Successful', {
        title: `Success`,
        toaster: 'b-toaster-top-center',
        variant: variant,
        solid: true
      })
    },
    showModal(val, id){
      this.targetUserId = id
      this.selectedShift = val
      this.targetShift = val
      this.$bvModal.show('modal-center')	
    },
    closeModal(){
      this.$bvModal.hide('modal-center')	
    },
    nextSchedules() {
      if (this.page == 11) return;
      this.start += 14;
      this.end += 14;
      this.page++;
    },
    prevSchedules() {
      if (this.page == 1) return;
      this.start -= 14;
      this.end -= 14;
      this.page--;
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

.select-date{
  width: 40%;
  height: 38px;
}

.select-shifts{
  background: #F2F4F7;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  padding: .125em;
  height: 38px;

p{
  color: #000000;
  text-align: center;
  height: 100%;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.selected{
    border-radius: 8px;
    background-color: #FFBA78;
    color: #ffffff;
  }
}
}
.req-action{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
</style>