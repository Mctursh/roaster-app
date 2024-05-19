<template>
  <div v-if="show" class="schedules">
    <div class="d-flex justify-content-end mb-2">
      <b-button
        v-if="isAdmin"
        @click="generateShift()"
        class="fw-600 fs-16 lh-24 blue-primary-bg white"
        >Generate next shifts</b-button
      >
    </div>
    <ScheduleTable :users="allUserData" />
    <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide>
    </b-toast>
  </div>
</template>

<script>
import Axios from "@/auth/axios";
import ScheduleTable from "../components/ScheduleTable.vue";
import { mapState } from "vuex";
// import { BIconLayoutThreeColumns } from "bootstrap-vue";
export default {
  components: { ScheduleTable },
  data() {
    return {
      allUserData: [],
      show: true,
    };
  },

  computed: {
    ...mapState(["isAdmin"]),
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    reRender() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
        this.$nextTick(() => {});
      });
    },
    makeToast(variant = null) {
      this.$bvToast.toast("Shift generated successful", {
        title: `Success`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
      });
    },
    generateShift() {
      Axios.post("users/generate-shift").then(() => {
        this.makeToast("success");
        this.getAllUsers();
      });
    },
    getAllUsers() {
      Axios.get("/users").then((r) => {
        this.allUserData = r.data.data;
        this.reRender();
      });
    },
  },
};
</script>

<style l
Tableang="scss" scoped>
.schedules {
  padding: 2em 8em;
}
</style>