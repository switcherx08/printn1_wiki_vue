<script>
export default {
  name: "VProgressLoader",
  props: {
    progressText: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <div class="progress-loader flex flex-col">
    <div v-if="progressText" class="mb-2 font-semibold">
      {{progressText}}
    </div>
    <progress class="progress w-56"></progress>
  </div>
</template>
