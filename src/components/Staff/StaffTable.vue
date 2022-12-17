<template>
  <div>
    <div class="table-parent">
      <table class="w-100">
        <tr>
          <td>
            <div class="d-flex flex-column text-align-center">
              <p class="fw-500 fs-12lh-18 light-grey">Staff Name</p>
            </div>
          </td>
          <td>
            <div class="d-flex flex-column text-align-center">
              <p class="fw-500 fs-12lh-18 light-grey">Email</p>
            </div>
          </td>
          <td>
            <div class="d-flex flex-column text-align-center">
              <p class="fw-500 fs-12lh-18 light-grey">Staff Type</p>
            </div>
          </td>
          <td>
            <div class="d-flex flex-column text-align-center"></div>
          </td>
        </tr>
        <!-- <tr v-for="(shift, j) in tableData" :key="j"> -->
        <tr v-for="(staff, i) in staffs" :key="i">
          <!-- v-for="(val, i) in shift.shifts"
            :key="i" -->
          <td class="px-2 py-2">
            <div>
              <p class="fw-400 fs-14 lh-20 mb-0 text-capitalize">
                {{ `${staff.firstName} ${staff.lastName}` }}
              </p>
            </div>
          </td>
          <td class="px-2 py-2">
            <div>
              <p class="fw-400 fs-14 lh-20 mb-0">{{ staff.email }}</p>
            </div>
          </td>
          <td class="px-2 py-2">
            <div>
              <p class="fw-400 fs-14 lh-20 mb-0 text-capitalize">
                {{ staff.type || `Consultant` }}
              </p>
            </div>
          </td>
          <td class="px-2 py-2">
            <div class="d-flex justify-content-center">
              <div
                @click="
                  $emit('delete', { id: staff._id, name: staff.firstName })
                "
                class="delete-icon"
              ></div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "StaffTable",
  props: {
    staffs: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
.table-parent {
  //   background: #ffffff;
  //   border: 1px solid #d0d5dd;
  //   border-radius: 10px;
  background: #ffffff;
  /* Grey/300 */

  border: 2px solid #98a2b3;
  border-radius: 16px;
}

table {
  tr {
    border-bottom: 1px solid #d0d5dd;

    &:first-of-type {
      td {
        background-color: #f9fafb;
        &:first-child {
          border-radius: 16px 0 0 0;
        }
        &:last-child {
          border-radius: 0 16px 0 0;
        }
      }
    }
    &:last-of-type {
      border-bottom: none;
    }

    td {
      div {
        padding: 0.5em 0.7em;
      }
      &:last-of-type {
        border-right: none;
      }
    }
  }
}

.delete-icon {
  background-image: url("../../../public/delete-icon.svg");
  // background-image: url('date-icon.svg');
  background-position: center;
  background-repeat: no-repeat;
  height: 20px;
  width: 20px;
}
</style>