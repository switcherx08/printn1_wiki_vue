<script>
import Popper from "vue3-popper";
import AttachmentFilesItem from "./AttachmentFilesItem.vue";
import IconDownload from "@/components/icons/IconDownload.vue";
import {useAuthStore} from "@/stores/auth";
import _ from 'lodash'
import axios from 'axios'

export default {
  name: 'AttachmentFilesMini',

  components: {Popper, IconDownload, AttachmentFilesItem},

  props: {
    showUploadButton: {
      type: Boolean,
      default: true
    },

    // eslint-disable-next-line vue/require-default-prop
    dataFiles: {
      type: Object,
      required: false
    }
  },

  emits: [
    'fetchFiles', 'saveFiles', 'removeFiles'
  ],

  data() {
    return {
      uploadFiles: []
    }
  },

  methods: {
    chooseFiles: function() {
      document.getElementById("uploadFiles").click()
    },

    async uploadFile() {
      const files = this.$refs.uploadFiles.files
      let saveFiles = [];

      const authStore = useAuthStore()
      const token = authStore.getToken()
      let formData = new FormData();

      _.forEach(files, file => {
        formData.append('files', file)
        saveFiles.push(file.name)
      })

      await axios.post('/api/upload/file', formData, {
        'X-XSRF-TOKEN': token
      }).then((response) => {
        this.$emit('saveFiles', saveFiles)
      })
    },

    async removeFile(file) {
      const authStore = useAuthStore()
      const token = authStore.getToken()

      await axios.delete(`/api/wiki/file/${file.id}`, {
        'X-XSRF-TOKEN': token
      }).then((response) => {
        console.log(response.data)
        this.$emit('removeFiles', file)
      })
    }
  }
}
</script>

<template>
  <div class="attachment-files-mini">
    <div class="attachment-files-mini__body">
      <template v-if="showUploadButton">
        <input
            id="uploadFiles"
            ref="uploadFiles"
            multiple
            class="attachment-files-mini__upload-input"
            type="file"
            @change="uploadFile()"
        />

        <button
            type="button"
            class="attachment-files-mini__upload-button attachment-files-mini__button"
            @click="chooseFiles()"
        >
          <Popper content="Загрузить файл" hover>
            <IconDownload width="24px" height="24px" />
          </Popper>
        </button>
      </template>

      <AttachmentFilesItem
          v-for="(file, fileIndex) in dataFiles" :key="fileIndex"
          :item-data="file"
          is-miniature
          class="attachment-files-mini__button ml-2"
          @removeFile="removeFile(file)"
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

  &__upload-input {
    display: none;
  }
}
</style>
