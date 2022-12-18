<template>
  <div>
    <div class="pos-rel notification" id="notification">
      <p
        @click="isShowing = !isShowing"
        class="fw-700 fs-16 lh-24 cursor-pointer"
        :class="{ asterick: !isSeen && isNewNotification }"
      >
        Notification
      </p>
      <div v-if="isShowing" class="py-4">
        <div
          v-for="(notification, i) in notifications"
          :key="i"
          class="px-4 py-2 d-flex align-items-start c-gap-2 item"
        >
          <div class="d-flex justify-content-center align-items-center img">
            {{
              `${userData.firstName[0].toUpperCase()}${userData.lastName[0].toUpperCase()}`
            }}
          </div>
          <div class="d-flex flex-column text-align-left">
            <p class="fw-400 fs-13 lh-18 grey">
              {{ notification.message }}
            </p>
            <p class="fs-12 fw-400 lh-24 light-grey">
              {{ new Date(notification.dateCreated).toDateString() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "@/auth/axios";
import { mapState } from "vuex";
export default {
  name: "NotificationDropdown",
  data() {
    return {
      isShowing: false,
      isSeen: false,
    };
  },
  watch: {
    isShowing: {
      handler(newV) {
        if (newV) {
          this.isSeen = true;
          Axios.post(`users/read-all-notifications/${this.userData._id}`);
        }
      },
      immediate: false,
    },
  },
  computed: {
    ...mapState(["notifications", "userData"]),
    isNewNotification() {
      return !this.notifications.every((elem) => elem.active == false);
    },
  },
  mounted() {
    let box = document.getElementById("notification");
    document.addEventListener(
      "click",
      (event) => {
        let isClickInside = box.contains(event.target);

        if (!isClickInside) {
          //the click was outside the specifiedElement, do something
          this.isShowing = false;
        }
      },
      true
    );
  },
};
</script>

<style lang="scss" scoped>
.notification {
  position: relative;
  > div {
    position: absolute;
    top: 100%;
    right: 0;
    background: #ffffff;
    box-shadow: 4px 4px 16px rgba(6, 66, 128, 0.16);
    width: 435px;
    height: 590px;
  }
}

.asterick::after {
  content: " ";
  position: absolute;
  background-color: #3d90e3;
  height: 7px;
  width: 7px;
  border-radius: 50%;
}

.img {
  min-width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #dc1bb2;
}
</style>