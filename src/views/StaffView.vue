<template>
  <div class="home">
    <div class="staff">
      <div class="d-flex justify-content-between alignm-items-center">
        <div class="d-flex flex-column r-gap-2 align-items-start">
          <h2 class="fw-700 fs-25 lh-25 grey">Staffs</h2>
          <p class="light-grey fw-400 fs-18 lh-26">
            View all staff members of the department.
          </p>
        </div>
        <div>
          <b-button
            @click="showModal"
            class="fw-600 fs-16 lh-24 blue-primary-bg white"
          >
            <span class="fs-25 mr-2">+</span>Add staff</b-button
          >
        </div>
      </div>
      <div
        v-if="!allUserData.length"
        class="d-flex justify-content-center align-items-center"
      >
        <p>There are no users yet</p>
      </div>
      <StaffTable v-else @delete="handleDelete" :staffs="allUserData" />
      <b-modal
        id="add-staff-modal"
        :hide-footer="true"
        :hide-header="true"
        modal-title="No"
        modal-header="No"
        centered
        :no-close-on-backdrop="true"
      >
        <div
          class="staff-modal px-4 py-4"
          :class="{
            'd-flex justify-content-center align-items-center': isLoading,
          }"
        >
          <div
            v-if="isLoading"
            class="d-flex justify-content-center align-items-center"
          >
            <b-spinner variant="primary" label="Spinning"></b-spinner>
          </div>
          <div v-else>
            <div v-if="!generated" class="d-flex flex-column r-gap-3">
              <p class="fw-700 fs-18 lh-16 mb-4">Add Staff</p>
              <div>
                <label for="firstName" class="fw-500 fs-14 lh-20"
                  >First Name</label
                >
                <b-form-input
                  name="firstName"
                  v-model="firstName"
                  placeholder="First name"
                  id="firstName"
                ></b-form-input>
              </div>
              <div>
                <label class="fw-500 fs-14 lh-20" for="lastName"
                  >Last Name</label
                >
                <b-form-input
                  v-model="lastName"
                  placeholder="Last name"
                ></b-form-input>
              </div>
              <div>
                <label class="fw-500 fs-14 lh-20" for="lastName"
                  >Staff Type</label
                >
                <b-form-select
                  v-model="selected"
                  :options="options"
                  class="mb-3"
                  placeholder="-- Please select an option --"
                />
              </div>
              <div class="w-100 req-action c-gap-3">
                <b-button
                  @click="closeModal"
                  class="fw-600 fs-16 lh-24 grey"
                  variant="light"
                  >Cancel</b-button
                >
                <b-button
                  class="fw-600 fs-16 lh-24 blue-primary-bg white"
                  @click="handleAddStaff"
                  >Add Staff</b-button
                >
              </div>
            </div>
            <div v-else class="d-flex flex-column r-gap-3">
              <p class="fw-700 fs-18 lh-16 mb-3 text-align-center">
                Added Successfully
              </p>
              <span class="fw-400 fs-13 lh-24 light-grey text-align-center"
                >New Account Log In Credentials have been Generated</span
              >
              <div>
                <label for="" class="fw-500 fs-14 lh-20">Name</label>
                <div class="selected-item px-3 py-2">
                  <span class="text-capitalize">{{
                    `${firstName} ${lastName}`
                  }}</span>
                </div>
              </div>
              <div>
                <label for="" class="fw-500 fs-14 lh-20">Email</label>
                <div class="selected-item px-3 py-2">
                  <span>{{ generateEmail }}</span>
                </div>
              </div>
              <div>
                <label for="" class="fw-500 fs-14 lh-20">Role</label>
                <div class="selected-item px-3 py-2">
                  <span class="text-capitalize">{{ selected }}</span>
                </div>
              </div>
              <div>
                <label for="" class="fw-500 fs-14 lh-20">password</label>
                <div class="selected-item px-3 py-2">
                  <span>{{ generatePassword }}</span>
                </div>
              </div>
              <div class="w-100 d-flex flex-column r-gap-3">
                <b-button
                  @click="copyToClipboard"
                  class="fw-600 fs-16 lh-24 blue-primary-bg white"
                  >Copy Credentials to clip board</b-button
                >
                <b-button
                  @click="closeModal"
                  class="fw-600 fs-16 lh-24 grey"
                  variant="light"
                  >Close</b-button
                >
              </div>
            </div>
          </div>
        </div>
      </b-modal>
      <b-modal
        id="delete-staff-modal"
        :hide-footer="true"
        :hide-header="true"
        modal-title="No"
        modal-header="No"
        centered
        :no-close-on-backdrop="true"
      >
        <div class="px-4 py-4">
          <p class="fw-700 fs-18 lh-16 mb-3">Confirm Delete</p>
          <p>Are you sure you want to delete {{ toDeleteName }}?</p>
          <div class="w-100 req-action c-gap-3">
            <b-button
              @click="closeDelete"
              class="fw-600 fs-16 lh-24 grey"
              variant="light"
              >Cancel</b-button
            >
            <!-- @click="handleApply" -->
            <b-button
              variant="danger"
              @click="deleteUser"
              class="fw-600 fs-16 lh-24 white"
              >Delete</b-button
            >
          </div>
        </div>
      </b-modal>
      <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide>
      </b-toast>
    </div>
  </div>
</template>

<script>
import StaffTable from "@/components/Staff/StaffTable.vue";
import Axios from "@/auth/axios";
export default {
  components: { StaffTable },
  data() {
    return {
      firstName: "",
      lastName: "",
      staffType: "",
      selected: null,
      options: [
        { value: "nurse", text: "Nurse" },
        { value: "Fellow", text: "Fellow" },
        { value: "Consultant", text: "Consultant" },
        { value: "Senior registrar", text: "Senior registrar" },
        { value: "Junior Registrar", text: "Junior Registrar" },
        { value: "Medical officer", text: "Medical officer" },
      ],
      isLoading: false,
      generated: false,
      allUserData: [],
      generateEmail: "",
      generatePassword: "",
      toDeleteId: null,
      toDeleteName: "",
    };
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    makeToast(message, variant = null) {
      this.$bvToast.toast(message, {
        title: `Success`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
      });
    },
    async copyToClipboard() {
      const obj = {
        email: this.generateEmail,
        password: this.generatePassword,
      };
      try {
        await navigator.clipboard.writeText(JSON.stringify(obj));
        this.makeToast("Copied", "success");
      } catch (e) {
        this.makeToast("Copied", "error");
      }
    },
    handleAddStaff() {
      this.isLoading = true;
      const payload = {
        firstName: this.firstName,
        lastName: this.lastName,
        type: this.selected,
      };
      Axios.post("/users/create", payload).then((r) => {
        console.log(r.data);
        let { firstName, lastName, password, email } = r.data.data;
        this.firstName = firstName;
        this.lastName = lastName;
        this.generateEmail = email;
        this.generatePassword = password;
        this.isLoading = false;
        this.generated = true;
        this.getAllUsers();
      });
    },
    getAllUsers() {
      Axios.get("/users").then((r) => {
        this.allUserData = r.data.data;
      });
    },
    showModal() {
      this.$bvModal.show("add-staff-modal");
    },
    closeModal() {
      this.$bvModal.hide("add-staff-modal");
      this.firstName = "";
      this.lastName = "";
      this.generated = false;
      this.selected = "";
    },
    handleDelete({ id, name }) {
      this.toDeleteId = id;
      this.toDeleteName = name;
      this.$bvModal.show("delete-staff-modal");
    },
    deleteUser() {
      Axios.delete(`/users/${this.toDeleteId}`).then((r) => {
        this.makeToast(r.data.message, "success");
        this.closeDelete();
        this.getAllUsers();
      });
    },
    closeDelete() {
      this.$bvModal.hide("delete-staff-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
.staff {
  width: 80%;
}
label {
  color: #344054;
}
.req-action {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
.staff-modal {
  min-height: 50vh;
}
.selected-item {
  background: #ffffff;
  /* Shadow/xs */

  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  span {
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    /* Gray/500 */

    color: #667085;
  }
}
</style>