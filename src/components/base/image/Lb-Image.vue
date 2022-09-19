<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: false,
      default: null
    },

    alt: {
      type: String,
      required: false,
      default: null
    },
  },

  data() {
    return {
      noImage: '/images/150x150.png'
    }
  },
}
</script>

<template>
  <img v-if="imageUrl" :src="imageUrl" :alt="alt" />
  <img v-else :src="noImage" alt="" />
</template>
