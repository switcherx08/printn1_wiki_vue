<script>
import IconNotification from "../../icons/IconNotification.vue";
import BaseIconButton from "@/components/base/button/BaseIconButton.vue";

export default {
  components: {BaseIconButton, IconNotification}
}
</script>

<template>
  <div class="notify-center">
    <BaseIconButton class="notify-center__icon">
      <IconNotification />
    </BaseIconButton>
    <div class="notify-center__menu"></div>
  </div>
</template>

<style lang="scss" src="./notification-center.scss"></style>
