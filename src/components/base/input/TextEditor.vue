<script>
import Editor from '@tinymce/tinymce-vue'
import {useAuthStore} from "@/stores/auth";

export default {
  name: 'TextEditor',

  components: {
    'editor': Editor
  },

  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    fieldLabel: {
      type: String,
      default: ''
    },
    fieldPlaceholder: {
      type: String,
      default: ''
    },
    fieldErrors: {
      type: [String, Object],
      default: ''
    },
  },

  emits: ['update:modelValue'],

  setup() {
    const authStore = useAuthStore()

    const apiKey = 'rpphwlv2t4540b2n4lhq7otnvatkghwr7x01n591hs9cdqff'

    // tinydrive
    const plugins = 'print visualblocks image link codesample table hr pagebreak ' +
        'nonbreaking anchor lists textpattern noneditable quickbars'

    const toolbar = [
      { name: 'format', items: [ 'formatselect'] },
      { name: 'formatting', items: [ 'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript' ] },
      { name: 'list', items: [ 'numlist', 'bullist' ] },
      { name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify', 'alignnone' ] },
      { name: 'color', items: [ 'forecolor', 'backcolor' ] },
      { name: 'size', items: [ 'fontsizeselect' ] },
      { name: 'indentation', items: [ 'outdent', 'indent' ] },
      { name: 'style', items: [ 'removeformat' ] },
      { name: 'formatting', items: [ 'blockquote', 'codesample', 'hr', 'pagebreak' ] },
      { name: 'table', items: [ 'table' ] },
      { name: 'file', items: [ 'image', 'insertfile', 'link' ] },
      { name: 'other', items: [ 'anchor', 'visualblocks', 'print', 'inlinecode', 'selectall', 'code' ] },
    ]

    const contextmenu = 'link image table checklist hr pagebreak visualblocks selectall'

    return {authStore, apiKey, plugins, toolbar, contextmenu}
  },

  data() {
    return {
      config: {
        plugins: this.plugins,
        toolbar: this.toolbar,
        contextmenu: this.contextmenu,
        menubar: '',
        images_upload_url: '/api/upload/image',
        images_upload_base_path: '/api/image/',
        images_upload_credentials: true,
        images_reuse_filename: true,
        images_upload_handler: this.imagesUploadHandler,
        content_css: ['/css/text_editor/text_editor_css.css'],
        content_style: ['/css/text_editor/text_editor_content_css.css'],
      },
    }
  },

  computed: {
    errors() {
      if (!this.fieldErrors) {
        return ''
      }

      if (typeof this.fieldErrors === 'object') {
        let str = ''
        for (let i = 0; i < Object.keys(this.fieldErrors).length; i++) {
          str = str + this.fieldErrors[i] + ' '
        }

        return str
      }

      return this.fieldErrors
    }
  },

  watch: {
    modelValue() {
      this.$emit('update:modelValue', this.modelValue)
    }
  },

  methods: {
    imagesUploadHandler(blobInfo, success, failure, progress) {
      const token = this.authStore.token;

      let xhr = new XMLHttpRequest()
      xhr.withCredentials = false;
      xhr.open('POST', '/api/upload/image');
      xhr.setRequestHeader("X-XSRF-TOKEN", token);

      xhr.upload.onprogress = function (e) {
        progress(e.loaded / e.total * 100);
      };

      xhr.onload = function() {
        var json;

        if (xhr.status === 403) {
          failure('HTTP Error: ' + xhr.status, { remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          failure('HTTP Error: ' + xhr.status);
          return;
        }

        json = JSON.parse(xhr.responseText);

        if (!json || typeof json.location != 'string') {
          failure('Invalid JSON: ' + xhr.responseText);
          return;
        }

        success(json.location);
      };

      xhr.onerror = function () {
        failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
      };

      let formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    }
  }
}
</script>

<template>
  <div class="text-editor form-control">
    <label class="label">
      <b class="label-text">{{ fieldLabel }}</b>
    </label>

    <editor
        v-model="modelValue"
        :api-key='apiKey'
        :init="config"
    />

    <label class="label">
      <template v-if="errors">
        <span class="label-text-alt text-red-500">{{ errors }}</span>
      </template>
    </label>
  </div>
</template>

<style lang="scss">
.tox-tinymce {
  height: 100%;
  min-height: 100vmax;
  border: none !important;
}

.tox-editor-container {
  border-radius: var(--border-radius);
}

.tox-statusbar {
  display: none !important;
}
</style>

