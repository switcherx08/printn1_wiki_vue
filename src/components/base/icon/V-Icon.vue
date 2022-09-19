<script>
export default {
  props: {
    useBackground: {
      type: Boolean,
      required: false,
      default: false
    },
    useRounded: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<template>
  <div
      class="v-icon"
      :data-bg="useBackground"
      :data-rounded="useRounded"
  >
    <slot />
  </div>
</template>

<style lang="scss" src="./v_icon.scss"></style>
