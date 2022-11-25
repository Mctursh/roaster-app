<template>
  <div class="px-4 py-4 sub-schedule w-100 d-flex align-items-start c-gap-4">
    <div
      v-for="(shift , j) in schedules"
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
      <p :class="{ 'yellow yellow-bg' : shift.shift == 'M', 'purple purple-bg': shift.shift == 'N', 'approved-primary approved-primary-bg': shift.shift == 'F'  }" >{{ shift.shift }}</p>
      <div v-if="shift.isActive" class="light-blue-primary-bg"></div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
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
      ]
    }
  },
    computed: {
      ...mapState([
        'structure',
        'dates'
      ]),
      schedules(){
        let toReturn = []
        let d = new Date()
        let currMonth = this.monthsArray[d.getMonth()];
        let currDay = d.getDate()
        for (let i = 0; i < 12; i++) {
          const elemShift = this.structure.users[0].shifts[i];
          const elemDate = this.dates[i]
          let temp = {
            shift: elemShift,
            ...elemDate,
            isActive: currMonth == elemDate.month && currDay == elemDate.day
          }
          toReturn.push(temp)
        }
        return toReturn
      }
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