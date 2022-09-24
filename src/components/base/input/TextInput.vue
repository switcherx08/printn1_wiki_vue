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
  <div class="form-control w-full">
    <label class="label">
      <b class="label-text">{{fieldLabel}}</b>
    </label>
    <input
        v-model="model"
        type="text"
        :placeholder="fieldPlaceholder"
        class="input input-bordered w-full"
    />
<!--    <label class="label">-->
<!--      <span class="label-text-alt">Alt label</span>-->
<!--      <span class="label-text-alt">Alt label</span>-->
<!--    </label>-->
  </div>
</template>
