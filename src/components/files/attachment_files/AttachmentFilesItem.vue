<script>
import Popper from "vue3-popper";
import AttachmentFilesIcons from "./AttachmentFilesIcons.vue";
import IconClose from "@/components/icons/IconClose.vue";

export default {
  name: 'AttachmentFilesItem',

  components: {IconClose, Popper, AttachmentFilesIcons},

  props: {
    itemData: {
      type: Object,
      required: true
    },

    isMiniature: {
      type: Boolean,
      default: true
    }
  },

  emits: ['removeFile', 'openFile']
}
</script>

<template>
  <button type="button" class="attachment-files-item">
    <Popper :content="itemData.name" hover>
      <div class="flex flex-col">
        <div class="attachment-files-item__remove" @click="$emit('removeFile')">
          <IconClose />
        </div>
        <a :href="itemData.link" :download="itemData.name" target="_blank" class="attachment-files-item__file flex flex-col">
          <AttachmentFilesIcons :icon-format="itemData.format"/>
          <span v-if="!isMiniature" class="attachment-files-item__name">
          {{ itemData.name }}
        </span>
        </a>
      </div>
    </Popper>
  </button>
</template>

<style lang="scss">
.attachment-files-item {
  display: flex;
  flex-direction: column;
  position: relative;

  &__name {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__remove {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: calc(50% - .5rem);
    padding: 2px;
    border-radius: 50%;
    background-color: var(--widget-grey);
    color: var(--dark-text);
    opacity: 0;
    visibility: hidden;
    transition: all .3s;
  }

  &:hover &__remove {
    top: -.5rem;
    opacity: 1;
    visibility: visible;
  }

  &__remove svg {
    width: .7rem;
    height: .7rem;
  }

  &__remove:hover {
    background-color: var(--primary);
  }

}
</style>
