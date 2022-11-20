<template>
  <div class="schedules">
    <ScheduleTable />
  </div>
</template>

<script>
import ScheduleTable from "../components/ScheduleTable.vue";
export default {
  components: { ScheduleTable },
};
</script>

<style l
Tableang="scss" scoped>
.schedules {
  padding: 2em 8em;
}
</style>