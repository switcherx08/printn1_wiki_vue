<script>
export default {
  name: "BaseField",
  props: {
    fieldId: {
      type: [String, Number],
      required: true
    },
    fieldName: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="field">
    <label v-if="$slots.label" class="field__label" :for="`${fieldId}-${fieldName}`">
      <slot name="label"/>
    </label>
    <div :class="['control', {'has-icon': $slots.icon}]" >
      <slot name="input" />
      <label
          v-if="$slots.icon"
          class="field__label form-icon"
          :for="`${fieldId}-${fieldName}`"
      >
        <slot name="icon" />
      </label>
      <!---->
    </div>
  </div>
</template>

<style lang="scss" src="./base_field.scss"></style>
