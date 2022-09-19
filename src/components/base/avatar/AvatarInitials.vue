<script>
export default {
  name: 'AvatarInitials',
  props: {
    itemInitials: {
      type: [String, Number, null],
      default: null
    },
    isRounded: {
      type: Boolean,
      default: false
    },
    sizeNumber: {
      type: [Number, String],
      default: '1'
    },
  },
}
</script>

<template>
  <div class="avatar-initials avatar placeholder">
    <div class="avatar-initials__bg avatar-initials__content mask" :class="[{'rounded-full': isRounded}, {'mask-squircle': !isRounded}]">
      <span class="'text-${{sizeNumber}}xl'">{{itemInitials}}</span>
    </div>
  </div>
</template>

<style lang="scss" src="./avatar_initials.scss"></style>
