<template>
  <button
      class="btn btn-circle"
      :class="[
          {'btn-outline': isOutline},
          {'btn-primary': isPrimary},
          initSize()
      ]"
  >
    <slot />
  </button>
</template>

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
