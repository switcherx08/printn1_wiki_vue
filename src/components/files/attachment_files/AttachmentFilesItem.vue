<script>
import AttachmentFilesIcons from "./AttachmentFilesIcons.vue";
import Popper from "vue3-popper";

export default {
  name: 'AttachmentFilesItem',

  components: {Popper, AttachmentFilesIcons},

  props: {
    itemData: {
      type: Object,
      required: true
    },

    isMiniature: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<template>
  <button type="button" class="attachment-files-item">
    <Popper :content="itemData.name" hover>
      <div class="flex flex-col">
        <AttachmentFilesIcons :icon-format="itemData.format"/>
        <span v-if="!isMiniature" class="attachment-files-item__name">
          {{ itemData.name }}
        </span>
      </div>
    </Popper>
  </button>
</template>

<style lang="scss">
.attachment-files-item {
  display: flex;
  flex-direction: column;
}
</style>
