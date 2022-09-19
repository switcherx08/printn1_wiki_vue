<script>
import BaseField from "./BaseField.vue";
export default {
  name: "BaseDate",
  components: {BaseField},
  props: {
    fieldId: {
      type: String,
      required: true
    },
    fieldName: {
      type: String,
      required: true
    }
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
      <input
          :id="`${fieldId}-${fieldName}`"
          v-model.trim="model"
          v-debounce="1000"
          :name="fieldName"
          type="date"
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
