<script>
const body = document.querySelector('body')

export default {
  name: "ModalDialog",
  props: {
    size: {
      type: String,
      default: 'small' // small, middle, large
    }
  },
  emits: ['close'],
  data() {
    return {
      is_show: false,
      modalSizeClassList: ''
    }
  },
  watch: {
    is_show() {
      body.classList.toggle('overflow_hidden')
    }
  },
  created() {
    if (this.size === 'middle') {
      this.modalSizeClassList = 'w-11/12 max-w-5xl'
    }

    if (this.size === 'large') {
      this.modalSizeClassList = 'w-screen max-w-full h-full'
    }
  },
  methods: {
    show() {
      this.is_show = true
    },

    hide() {
      this.is_show = false
      this.$emit('close', true)
    },
  },
}
</script>

<template>
  <div class="modal z-50" :class="{'modal-open': is_show}">
    <div class="modal-box relative" :class="modalSizeClassList">
      <button class="modal-close btn btn-sm btn-circle absolute right-2 top-2" @click="hide()">✕</button>
      <!-- Modal header -->
      <div v-if="$slots.header" class="modal-header">
        <slot name="header" />
      </div>
      <!-- Modal body -->
      <slot name="body" />
      <!-- Modal footer -->
      <div v-if="$slots.footer" class="modal-action">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal {
  padding: 1rem;
  z-index: 99;

  &-close {
    z-index: 12;
  }
}
</style>
