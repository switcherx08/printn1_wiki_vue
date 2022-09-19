<script>
export default {
  name: "IconCheckmark",
  props: {
    isChecked: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<template>
  <svg
      class="icon-checkmark"
      :class="{'is_checked': isChecked}"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
  >
    <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"></circle>
    <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"></path>
  </svg>
</template>

<style lang="scss">
.icon-checkmark {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-rounded);
  display: block;
  stroke-width: 2;
  color: var(--placeholder);
  stroke: var(--placeholder);
  stroke-miterlimit: 10;
  margin: 0 auto;
  box-shadow: inset 0 0 0 var(--primary-color);
}

.icon-checkmark .checkmark-circle {
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) both;
}

.icon-checkmark.is_checked .checkmark-circle {
  height: 32px;
  width: 32px;
  fill: none;
  color: var(--primary-color);
  stroke: var(--primary-color);
}

.icon-checkmark.is_checked .checkmark-check {
  color: var(--primary-color);
  stroke: var(--primary-color);
}
</style>
