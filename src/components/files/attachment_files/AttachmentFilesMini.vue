<script>
import Popper from "vue3-popper";
import AttachmentFilesItem from "./AttachmentFilesItem.vue";
import IconDownload from "@/components/icons/IconDownload.vue";

export default {
  name: 'AttachmentFilesMini',

  components: {Popper, IconDownload, AttachmentFilesItem},

  props: {
    showUploadButton: {
      type: Boolean,
      default: true
    }
  },

  emits: [
    'open:fileManager'
  ],

  data() {
    return {
      files: [
        { format: 'word', name: 'Название прикрепленного файла' },
        { format: 'excel', name: 'Название #2 прикрепленного файла' },
        { format: 'pdf', name: 'Название #3 прикрепленного файла' },
        { format: 'image', name: 'Название #4 прикрепленного файла' },
        { format: 'audio', name: 'Название #5 прикрепленного файла' },
        { format: 'zip', name: 'Название #6 прикрепленного файла' },
        { format: 'txt', name: 'Название #7 прикрепленного файла' },
        { format: 'file', name: 'Название #8 прикрепленного файла' }
      ]
    }
  },

  methods: {
    uploadFile() {
      this.$emit('open:fileManager')
    },

    openFile(file) {
      alert('Открыть файл ' + '"' + file.name + '"')
    }
  }
}
</script>

<template>
  <div class="attachment-files-mini">
    <div class="attachment-files-mini__body">
      <button
          v-if="showUploadButton"
          type="button"
          class="attachment-files-mini__upload-button attachment-files-mini__button"
          @click="uploadFile()"
      >
        <Popper content="Загрузить файл" hover>
          <IconDownload width="24px" height="24px" />
        </Popper>
      </button>

      <AttachmentFilesItem
          v-for="(file, fileIndex) in files" :key="fileIndex"
          :item-data="file"
          is-miniature
          class="attachment-files-mini__button ml-2"
          @click="openFile(file)"
      />
    </div>
  </div>
</template>

<style lang="scss">
.attachment-files-mini {
  display: inline-flex;
  flex-direction: column;
  width: auto;
  min-width: 48px;

  &__body {
    display: flex;
    width: 100%;
    height: 48px;
    border-radius: var(--border-radius);
    background-color: var(--background-grey);
  }

  &__button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border: 1px solid transparent;
    background-color: transparent;
    border-radius: var(--border-radius);
  }

  &__button:hover {
    background-color: rgba(0,0,0,.015);
  }

  &__button:not(:first-child) {
    margin-left: .5rem;
  }

  &__upload-button {
    color: var(--primary);
    border-color: var(--primary);
  }
}
</style>
