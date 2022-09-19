<script>
export default {
  name: "SimpleTableCell",
  props: {
    useTh: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<template>
  <component :is="useTh ? 'th' : 'td'">
    <slot />
  </component>
</template>
