<script>
export default {
  name: "SimpleTable"
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <!-- head -->
      <thead v-if="$slots.thead">
        <slot name="thead" />
      </thead>
      <!-- body -->
      <tbody>
        <slot name="tbody" />
      </tbody>
    </table>
  </div>
</template>
