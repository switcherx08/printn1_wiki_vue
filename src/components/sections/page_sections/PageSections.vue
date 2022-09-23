<template>
  <div class="page_sections">
    <div v-if="$slots.widgets" class="page_sections__widgets flex mb-2">
      <slot name="widgets" />
    </div>
    <div v-if="$slots.header" class="page_sections__header mb-4">
      <slot name="header" />
    </div>
    <div class="page_sections__body mt-6">
      <slot name="body" />
    </div>
    <div v-if="$slots.footer" class="page_sections__footer mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageSections'
}
</script>
