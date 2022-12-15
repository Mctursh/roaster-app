<template>
  <div>
    <div
      :id="`data-parent-picker-${dateId}`"
      class="date-parent d-flex align-items-center"
    >
      <div @click="pickDate" class="w-100">
        <div
          class="
            d-flex
            align-items-center
            c-gap-1
            date-range-parent
            cursor-pointer
          "
          :class="{ disabled: disabled }"
        >
          <div
            @click="pickDate()"
            :class="{ disabled: disabled }"
            class="cursor-pointer fs-15 date-icon date"></div>
          <div v-if="isSelected" class="d-flex align-items-center c-gap-1">
            <span>{{ date }}</span>
          </div>
        </div>
      </div>

      <div :class="pos" class="date-data" v-if="isActive">
        <DatePicker
          :value="dateValue"
          @input="handleDateInput"
          :formats="formats"
          :max-date="allowPastDate ? currDate : ''"
          :min-date="allowFutureDate ? currDate : ''"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import moment from 'moment';
export default {
  components: { DatePicker },
  props: {
    dateId: {
      type: [Number, String],
    },
    allowPastDate: {
      type: Boolean,
      default: true,
    },
    allowFutureDate: {
      type: Boolean,
      default: true,
    },
    pos: {
      type: String,
      default: "bottom",
    },
    value: {
      type: [String, Object],
    },
    hideCancelButton: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      date: "",
      formats: {
        input: ["YYYY-MM-DD", "YYYY/MM/DD", "DD/MM/YYYY"],
      },
      dateValue: "",
      isSelected: false,
      isActive: false,
      currDate: "",
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newV) {
        this.date = newV;
        this.isSelected = newV ? true : false;
      },
    },
  },
  mounted() {
    this.currDate = new Date();
    let _this = this;
    let box = document.getElementById(`data-parent-picker-${this.dateId}`);
    document.addEventListener(
      "click",
      function (event) {
        let isClickInside = box.contains(event.target);

        if (!isClickInside) {
          //the click was outside the specifiedElement, do something
          _this.isActive = false;
        }
      },
      true
    );
  },
  beforeDestroy() {
    document.removeEventListener("click", function () {}, true);
  },
  computed: {},
  methods: {
    pickDate() {
      if (!this.disabled) {
        this.isActive = true;
      }
    },
    cancelSelected() {
      this.isSelected = false;
      this.isActive = false;
      this.range = "";
      this.$emit("cancelSelected", this.dateId);
    },
    handleDateInput(date) {
        let temp = moment(date)
      this.date = `${temp.format('MMM')} ${temp.format('DD')}, ${temp.format('YYYY')}`
      this.isSelected = true;
      this.isActive = false;
      this.$emit("input", this.date);
    },
  },
};
</script>

<style lang="scss" scoped>
.date-parent {
  position: relative;
  min-width: 160px;
}
.date-range-parent {
  background: #ffffff;
  border: 1px solid #9dbcdc;
  border-radius: 3px;
  padding: 0.6em;
  width: 100%;
  height: 37px;
  &.disabled,
  .disabled {
    background-color: #e9ecef;
    opacity: 1;
    border: 0;
    color: #aaaaaa;
    cursor: not-allowed !important;
  }
}
.date-icon,
.cancel-icon {
  color: #9dbcdc;
}
.date-data {
  &.top {
    bottom: 100%;
  }
  &.bottom {
    top: 100%;
  }
  position: absolute;
  z-index: 3;
  width: auto;
  background-color: #ffffff;
  box-shadow: 0px 5px 14px rgba(19, 50, 82, 0.05);
  border-radius: 3px;
  right: 0%;
  margin-top: 0.2em;
}
.date{
    background-image: url('../../public/date.svg');
    // background-image: url('date-icon.svg');
    background-position: center;
    background-repeat: no-repeat;
    height: 16px;
    width: 15px;
}
</style>