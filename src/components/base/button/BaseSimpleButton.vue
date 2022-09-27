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
      sizeArray: {
        'large': 'btn-lg',
        'middle': 'btn-sm',
        'small': 'btn-xs',
      }
    }
  },
  methods: {
    initSize() {
      if(!this.size) { return '' }
      return this.sizeArray[this.size]
    }
  }
}
</script>

<template>
  <button
      class="btn"
      :class="[
          {'btn-outline': isOutline},
          {'btn-primary': isPrimary},
          initSize()
      ]"
  >
    <span><slot /></span>
  </button>
</template>

<style lang="scss" src="./base_simple_button.scss"></style>
