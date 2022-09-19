<script>
export default {
  props: {
    picture: {
      type: String,
      required: false,
      default: null
    },
    alt: {
      type: String,
      required: false,
      default: null
    },
    isRounded: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  data() {
    return {
      noImage: '/images/150x150.png',
    }
  },
  computed: {
    imagePath() {
      return this.picture ? this.picture : this.noImage
    }
  },
}
</script>

<template>
  <div class="avatar">
    <div class="mask" :class="[{'rounded-full': isRounded}, {'mask-squircle': !isRounded}]">
      <img :src="imagePath" :alt="alt" @error.once="$event.target.src = noImage" />
    </div>
  </div>
</template>

<style lang="scss" src="./avatar_user.scss"></style>
