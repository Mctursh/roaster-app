<template>
  <div class="schedules">
    <ScheduleTable :users="allUserData" />
  </div>
</template>

<script>
import Axios from '@/auth/axios';
import ScheduleTable from "../components/ScheduleTable.vue";
import moment from 'moment';
export default {
  components: { ScheduleTable },
  data(){
    return {
      allUserData: []
    }
  },
  mounted(){
    this.getAllUsers()
    console.log(moment().add(2, 'day').isSame(moment().add(1, 'week'), 'week'));
  },
  methods: {
    getAllUsers(){
      Axios.get('/users').then(r => {
        this.allUserData = r.data.data
      })
    },
  }
};
</script>

<style l
Tableang="scss" scoped>
.schedules {
  padding: 2em 8em;
}
</style>