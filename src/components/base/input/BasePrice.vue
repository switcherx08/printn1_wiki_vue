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
    largeFontSize: {
      type: Boolean,
      default: false
    },
  },
  emits: ['change'],
  data() {
    return {
      model: '',
      isFocus: false
    }
  },
  methods: {
    changeFocus(e) {
      this.isFocus = e.type === 'focus';
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
      <div
          class="field-input field-price"
          :class="[{'large_font_size': largeFontSize}, {'is_focus': isFocus}]"
      >
        <input
            :id="`${fieldId}-${fieldName}`"
            v-model.trim="model"
            v-debounce="1000"
            :name="fieldName"
            type="number"
            :placeholder="fieldPlaceholder"
            :autocomplete="fieldAutocomplete"
            @change="$emit('change', model)"
            @focus="changeFocus"
            @blur="changeFocus"
        >
        <span class="field-price__currency">RUB</span>
      </div>
    </template>
    <!---->
  </BaseField>
</template>
