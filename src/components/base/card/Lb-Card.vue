<script>
export default {
  props: {
    useBackground: {
      type: Boolean,
      required: false,
      default: true
    },
    usePadding: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>

<template>
  <div
      class="lb-card"
      :data-bg="useBackground"
      :data-padding="usePadding"
  >
    <slot />
  </div>
</template>

<style lang="scss" src="./lb_card.scss"></style>
