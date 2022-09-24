<script>
export default {
  props: {
    size: {
      type: String,
      required: false,
      default: 'middle'
    },
    isPrimary: {
      type: Boolean,
      required: false,
      default: false
    },
    isOutline: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  data() {
    return {
      buttonSizeClass: 'button_' + this.size
    }
  },
}
</script>

<template>
  <button
      :class="[
          'btn',
          buttonSizeClass,
          {'btn-outline': isOutline},
          {'btn-primary': isPrimary},
      ]"
  >
    <span><slot /></span>
  </button>
</template>

<style lang="scss" src="./base_simple_button.scss"></style>
