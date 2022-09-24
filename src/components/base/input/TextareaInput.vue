<script>
export default {
  name: 'TextInput',
  props: {
    fieldValue: {
      type: [String, Number],
      default: ''
    },
    fieldLabel: {
      type: String,
      default: ''
    },
    fieldPlaceholder: {
      type: String,
      default: ''
    },
  },
  emits: ['change'],
  data() {
    return {
      model: this.fieldValue
    }
  }
}
</script>

<template>
  <div class="form-control">
    <label class="label">
      <b class="label-text">{{fieldLabel}}</b>
    </label>
    <textarea
        v-model="model"
        :placeholder="fieldPlaceholder"
        class="textarea textarea-bordered h-24"
    ></textarea>
<!--    <label class="label">-->
<!--      <span class="label-text-alt">Your bio</span>-->
<!--      <span class="label-text-alt">Alt label</span>-->
<!--    </label>-->
  </div>
</template>
