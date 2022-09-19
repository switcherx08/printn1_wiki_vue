<script>
import BaseField from "./BaseField.vue";
export default {
  name: "BaseTextarea",
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
    fieldPlaceholder: {
      type: String,
      required: false,
      default: ''
    },
  },
  emits: ['change'],
  data() {
    return {
      model: ''
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
      <textarea
          :id="`${fieldId}-${fieldName}`"
          v-model.trim="model"
          v-debounce="1000"
          :placeholder="fieldPlaceholder"
          class="field-textarea"
          @change="$emit('change', model)"
      ></textarea>
    </template>
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <!---->
  </BaseField>
</template>
