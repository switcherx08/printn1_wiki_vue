<script>
export default {
  name: "BaseCheckbox",
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  emits: ['checked', 'unchecked'],
  data() {
    return {
      value: this.checked
    }
  },
  watch: {
    value() {
      if(this.value) {
        this.$emit('checked')
      } else {
        this.$emit('unchecked')
      }
    }
  }
}
</script>

<template>
  <input
      v-model="value"
      type="checkbox"
      class="checkbox"
  />
</template>
