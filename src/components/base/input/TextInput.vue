<script>
export default {
  name: 'TextInput',
  props: {
    modelValue: {
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
    fieldErrors: {
      type: [String, Object],
      default: ''
    },
  },
  emits: ['update:modelValue'],
  computed: {
    errors() {
      if(!this.fieldErrors) { return '' }

      if (typeof this.fieldErrors === 'object') {
        let str = ''
        for (let i = 0; i < Object.keys(this.fieldErrors).length; i++) {
          str = str + this.fieldErrors[i] + ' '
        }

        return str
      }

      return this.fieldErrors
    }
  },
}
</script>

<template>
  <div class="form-control w-full">
    <label v-if="fieldLabel" class="label">
      <b class="label-text">{{fieldLabel}}</b>
    </label>
    <input
        type="text"
        :placeholder="fieldPlaceholder"
        class="input input-bordered w-full"
        :class="{'input-error': errors}"
        @input="$emit('update:modelValue', $event.target.value)"
    />
    <label class="label">
      <template v-if="errors">
        <span class="label-text-alt text-red-500">{{errors}}</span>
      </template>
    </label>
  </div>
</template>
