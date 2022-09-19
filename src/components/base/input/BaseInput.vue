<script>
import BaseField from "./BaseField.vue";
export default {
  name: "BaseInput",
  components: {BaseField},
  props: {
    fieldId: {
      type: String,
      required: true
    },
    fieldName: {
      type: String,
      required: true
    },
    fieldType: {
      type: String,
      required: false,
      default: 'text'
    },
    fieldPlaceholder: {
      type: String,
      required: false,
      default: ''
    },
    fieldAutocomplete: {
      type: String,
      required: false,
      default: 'off'
    },
    fieldValue: {
      type: [String, Number],
      default: ''
    }
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
  <BaseField :field-id="fieldId" :field-name="fieldName">
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
    <template #input>
      <input
          :id="`${fieldId}-${fieldName}`"
          v-model.trim="model"
          v-debounce="1000"
          :name="fieldName"
          :type="fieldType"
          :placeholder="fieldPlaceholder"
          :autocomplete="fieldAutocomplete"
          class="field-input"
          @change="$emit('change', model)"
      >
    </template>
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <!---->
  </BaseField>
</template>
