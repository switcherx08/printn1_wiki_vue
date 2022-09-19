<template>
  <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
</template>

<script>
export default {
  name: "IconPlus",

  props: {
    width: {
      type: String,
      required: false,
      default: "24",
    },

    height: {
      type: String,
      required: false,
      default: "24",
    }
  }
}
</script>
