<template>
  <div>
    <div class="request-parent">
      <aside class="text-align-left">
        <div class="in-progress">
          <p class="mb-4 fs-13 fw-400 lh-24 light-grey">In progress</p>
          <div v-if="!computedShiftsInprogress.length" class="text-align-center">
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
              :class="{selected : req.shiftId == selectedShifId}"
              @click="handleRequest(req)"
            >
              <div class="d-flex align-items-center c-gap-3">
                <div
                  class="d-flex justify-content-center align-items-center img"
                >
                  KA
                </div>
                <div class="info">
                  <p class="mb-0 grey fw-400 fs-13 lh-24">
                    <!-- 1 person requested Day Off -->
                    {{ req.targetShift != 'F' ? 'Shift Swap Requested' : 'Off Day Requested' }}
                  </p>
                  <p class="mb-0 light-grey fw-400 fs-13 lh-24">
                    {{`${convertDate(req.targetDate)} · ${req.targetShift == 'M' && 'Morning' || req.targetShift == 'N' && 'Night' || ''}`}}
                  </p>
                </div>
              </div>
              <div class="time">
                <p class="light-grey fw-400 fs-13 lh-24">{{ req.createdTime }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="in-progress">
          <p class="mb-4 fs-13 fw-400 lh-24 light-grey">Completed</p>
          <div v-if="!computedShiftsCompleted.length" class="text-align-center" >
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
            :class="{selected : req.shiftId == selectedShifId}"
              @click="handleRequest(req)"
            >
              <div class="d-flex align-items-center c-gap-3">
                <div
                  class="d-flex justify-content-center align-items-center img"
                >
                  KA
                </div>
                <div class="info">
                  <p class="mb-0 grey fw-400 fs-13 lh-24">
                    <!-- 1 person requested Day Off -->
                    {{ `${req.targetShift != 'F' ? 'Shift Swap Requested' : 'Off Day Requested'} ${req.state}` }}
                  </p>
                  <p class="mb-0 light-grey fw-400 fs-13 lh-24">
                    {{`${convertDate(req.targetDate)} · ${req.targetShift == 'M' && 'Morning Shift' || req.targetShift == 'N' && 'Night Shift'}`}}
                  </p>
                </div>
              </div>
              <div class="time">
                <p class="light-grey fw-400 fs-13 lh-24">{{ req.createdTime }}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div v-if="selectedShift" >
        <div class="d-flex align-items-center justify-content-between title">
          <p class="mb-0 blue-primary fw-700 fs-16 lh-24">{{`${selectedShift.targetShift != 'F' ? 'Swap Shift' : 'Day Off'} Request`}}</p>
          <span class="fw-400 fs-13 lh-24 light-grey">{{`${selectedShift.state == 'Pending' ? 'Pending Approval' : selectedShift.state }`}}</span>
        </div>
        <div class="request-modal d-flex justify-content-center align-items-center">
          <div class="d-flex flex-column r-gap-2" >
            <div class=" d-flex align-items-center c-gap-3">
              <div class="d-flex justify-content-center align-items-center img">
                KA
              </div>
              <div class="text-align-left info">
                <p class="mb-0 grey fw-700 fs-16 lh-24">Kate Aihoun</p>
                <p class="mb-0 light-grey fw-400 fs-13 lh-24">
                  {{`${convertDate(selectedShift.targetDate)} · ${selectedShift.targetShift == 'M' && 'Morning Shift' || selectedShift.targetShift == 'N' && 'Night Shift' || ''}`}}
                </p>
              </div>
            </div>
              <div class="d-flex flex-column r-gap-1 text-align-left">
                 <p class="mb-0 light-grey fw-400 fs-13 lh-24">
                    <!-- Nurse · Morning Shift -->
                    {{`Nurse · ${selectedShift.targetShift == 'M' && 'Morning' || selectedShift.targetShift == 'N' && 'Night' || ''}`}}
                  </p>
                  <p class="mb-0 grey fw-700 fs-16 lh-24">{{ convertDate(selectedShift.targetDate) }}</p>
              </div>
              <div v-if="selectedShift.state == 'Pending'" class="w-100 req-action c-gap-3" >
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
              <div v-else class="d-flex align-items-center" >
                <b-icon-check class="h3 blue-primary" ></b-icon-check>
                <p class="mb-0 fw-600 fs-16 lh-24 blue-primary">{{`${selectedShift.state} ${new Date().toDateString()} by ${selectedShift.approvalAdminName}`}}</p>
              </div>
          </div>
        </div>
      </div>
      <div v-else class="d-flex align-items-center justify-content-center" >
        <p class="mb-0 grey fw-700 fs-16 lh-24">You have not selected any Request</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data(){
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
            selectedShifId: '',
            selectedShift: ""
        }
    },
    computed: {
        ...mapState([
            'structure',
        ]),
        computedShiftsInprogress(){
            let toReturn = []
            this.structure.request.forEach(req => {
                if(req.state == 'Pending'){
                    toReturn.push(req)
                }
            })
            return toReturn
        },
        computedShiftsCompleted(){
            let toReturn = []
            this.structure.request.forEach(req => {
                if(req.state != 'Pending'){
                    toReturn.push(req)
                }
            })
            return toReturn
        },
    },
    methods: {
        convertDate(date){
            let d = new Date(date)
            let day = d.getDate()
            let month = this.monthsArray[d.getMonth()]
            let year = d.getFullYear()
            return `${day} ${month} ${year}`
        },
        handleRequest(req){
            this.selectedShifId = req.shiftId
            this.selectedShift = req
        },
        handleRequestState(state){
            this.structure.request.forEach((req, idx) => {
                if(req.shiftId == this.selectedShifId){
                    this.structure.request[idx].state = state
                }
            })
            this.$store.commit('UPDATE_STRUCTURE', this.structure)

        }
    }
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
    background: #F5F5F5;
    height: 100%;
    > div {
        width: 483px;
      background: #ffffff;
      border-radius: 10px;
      padding: .725em 2.1em 1.8em;
    }
  }
  .req-action{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>