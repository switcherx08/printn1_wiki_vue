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
    isElevated: {
      type: Boolean,
      required: false,
      default: false
    },
    isRounded: {
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
          'button button-simple',
          buttonSizeClass,
          {'is_outline': isOutline},
          {'is_primary': isPrimary},
          {'is_elevated': isElevated},
          {'is-rounded': isRounded}
      ]"

  >
    <span><slot /></span>
  </button>
</template>

<style lang="scss" src="./base_simple_button.scss"></style>
