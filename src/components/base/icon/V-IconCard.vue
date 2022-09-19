<script>
import VIcon from "@/components/base/icon/V-Icon.vue";
import LbTooltip from "@/components/base/tooltip/Lb-Tooltip.vue";
export default {
  components: {LbTooltip, VIcon},
  props: {
    iconColorClass: {
      type: String,
      required: false,
      default: 'is-default'
    },
    text: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<template>
  <LbTooltip :text="text">
    <div class="icon-card flex">
      <div class="flex">
        <VIcon use-rounded class="icon-card__icon" :class="iconColorClass">
          <slot name="icon" />
        </VIcon>
      </div>
      <div class="icon-card__info flex flex-col">
        <div class="icon-card__count">
          <slot name="count" />
        </div>
        <div class="icon-card__text">
          <slot name="text" />
        </div>
      </div>
    </div>
  </LbTooltip>
</template>

<style lang="scss" src="./v_icon_card.scss"></style>
