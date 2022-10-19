<template>
  <div class="page_sections">
    <div class="flex w-full mb-6">
      <div v-if="$slots.header" class="page_sections__header w-full">
        <slot name="header" />
      </div>

      <div v-if="$slots.widgets" class="page_sections__widgets flex justify-end w-full">
        <slot name="widgets" />
      </div>
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
