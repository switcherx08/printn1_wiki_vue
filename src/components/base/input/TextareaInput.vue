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
  <div class="form-control">
    <label class="label">
      <b class="label-text">{{fieldLabel}}</b>
    </label>
    <textarea
        :placeholder="fieldPlaceholder"
        class="textarea textarea-bordered h-24"
        :class="{'input-error': errors}"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
    <label class="label">
      <template v-if="errors">
        <span class="label-text-alt text-red-500">{{errors}}</span>
      </template>
    </label>
  </div>
</template>
