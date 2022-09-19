<script>
import BaseField from "./BaseField.vue";
import IconArrowBottom from "@/components/icons/IconArrowBottom.vue";

export default {
  name: "BaseSelect",
  components: {IconArrowBottom, BaseField},
  props: {
    fieldId: {
      type: [String, Number],
      required: true
    },
    fieldName: {
      type: String,
      required: true
    },
    itemData: {
      type: Object,
      required: true
    },
    itemSelect: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
  },
  emits: ['select'],
  data() {
    return {
      isShow: false,
      select: Object.keys(this.itemSelect).length !== 0 ? this.itemSelect : this.itemData[0]
    }
  },
  mounted() {
    document.addEventListener('click', this.hide.bind(this), true)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.hide)
  },
  methods: {
    show() {
      this.isShow = true
    },

    hide() {
      this.isShow = false
    },

    selectOption(item) {
      this.select = item
      this.$emit('select', item)
    }
  },
}
</script>

<template>
  <BaseField :field-id="fieldId" :field-name="fieldName">
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>
    <template #input>
      <div tabindex="0" class="field-select flex items-center" @click="show">
        <div class="mr-2">{{ select ? select.name : 'Выберите пункт из списка' }}</div>
        <div class="ml-auto"><IconArrowBottom /></div>
      </div>
      <div v-if="isShow" class="field-select__menu">
        <button
            v-for="(item, itemIndex) in itemData"
            :key="itemIndex"
            class="field-select__option"
            @click="selectOption(item)"
        >
          {{ item.name }}
        </button>
      </div>
    </template>
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <!---->
  </BaseField>
</template>
