<template>
  <div>
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
        <tr v-for="(shift, j) in allUserShifs" :key="j">
          <td>
            <p>{{ shift.name }}</p>
          </td>
          <td
            v-for="(val, i) in shift.shifts.slice(start, end)"
            :key="i"
            class="px-2 py-2"
          >
            <div
              v-if="val != 'F'"
              :class="[val == 'N' ? 'dark-purple-bg' : 'dark-yellow-bg']"
            >
              <span class="white fw-700 fs-13 lh-16"> {{ val }} </span>
            </div>
          </td>
          <!-- <td class="px-2 py-2">
            <div class="dark-yellow-bg">
              <span class="white fw-700 fs-13 lh-16"> M </span>
            </div>
          </td> -->
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
    };
  },
  computed: {
    ...mapState(["dates", "allUserShifs"]),
    dateToShow() {
      return this.dates.slice(this.start, this.end);
    },
  },
  methods: {
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
</style>