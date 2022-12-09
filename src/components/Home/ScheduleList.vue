<template>
  <div class="px-4 py-4 sub-schedule w-100 align-items-start c-gap-4">
      <!-- v-for="(shift , j) in schedules" -->
    <div
      v-for="(shift , j) in compShifts"
      :key="j"
      class="
        d-flex
        justify-content-center
        flex-column
        align-items-center
        r-gap-1
      "
    >
      <p class="light-blue-primary fs-16 fw-700 lh-20 text-capitalize">{{ shift.dayName }}</p>
      <p class="light-blue-primary fs-16 fw-700 lh-20 text-capitalize">{{ `${shift.day} ${shift.month}` }}</p>
      <p :class="{ 'yellow yellow-bg' : shift.shift == 'M', 'purple purple-bg': shift.shift == 'N', 'approved-primary approved-primary-bg': shift.shift == 'O'  }" >{{ shift.shift }}</p>
      <div v-if="shift.isActive" class="light-blue-primary-bg"></div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import moment from "moment"
export default {
  name: "ScheduleList",
  data(){
    return {
      monthsArray :[
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
      todayShiftIndex: null,
      todayShiftId: null,
      weekStartIndex: '',
      weekStartDateId: '',
      userShifts: []
    }
  },
  mounted(){
  // this.userShifts = this.userData.shifts
  },
  watch: {
    userData(){
      this.userShifts = this.userData.shifts
    }
  },
  computed: {
    ...mapState([
      'userData',
      'dates',
    ]),
    // userShifts(){
    //   return 
    // },
    compShifts(){
      let toReturn = []
      this.userShifts.forEach((shift, idx) => {
        // active shift day 
        if(new Date().toDateString() == new Date(shift.date).toDateString()){
          this.todayShiftId = shift._id
          this.todayShiftIndex = idx
        }
        // active week shift 
        if (new Date(moment().startOf('week')).toDateString() == new Date(shift.date).toDateString()){
          this.weekStartIndex = shift.date
          this.weekStartDateId = idx
        }

      });

      toReturn = this.userShifts.slice(this.weekStartIndex, this.weekStartIndex + 7)
      toReturn = toReturn.map((elem) => {
        let temp = moment(elem.date)
        return {
          ...elem,
          isActive: elem._id == this.todayShiftId,
          dayName: temp.format('ddd'),
          day: temp.format('DD'),
          month: temp.format('MMM')
        }
      })

      return toReturn
    },
  },
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

  display: grid;
  grid-template-columns: repeat(7, 1fr);

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