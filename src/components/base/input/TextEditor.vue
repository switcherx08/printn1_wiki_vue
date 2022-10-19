<script>
import Editor from '@tinymce/tinymce-vue'

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
    const plugins = 'print casechange tinydrive advcode visualblocks image link codesample table hr pagebreak ' +
        'nonbreaking anchor lists checklist textpattern noneditable formatpainter quickbars advtable export'

    const toolbar = [
      { name: 'format', items: [ 'formatselect'] },
      { name: 'formatting', items: [ 'bold', 'italic', 'underline', 'strikethrough', 'casechange', 'subscript', 'superscript' ] },
      { name: 'list', items: [ 'checklist', 'numlist', 'bullist' ] },
      { name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify', 'alignnone' ] },
      { name: 'color', items: [ 'forecolor', 'backcolor' ] },
      { name: 'size', items: [ 'fontsizeselect' ] },
      { name: 'indentation', items: [ 'outdent', 'indent' ] },
      { name: 'style', items: [ 'removeformat', 'formatpainter' ] },
      { name: 'formatting', items: [ 'blockquote', 'codesample', 'hr', 'pagebreak' ] },
      { name: 'table', items: [ 'table' ] },
      { name: 'file', items: [ 'image', 'insertfile', 'link' ] },
      { name: 'other', items: [ 'anchor', 'visualblocks', 'print', 'inlinecode', 'selectall', 'export', 'code' ] },
    ]

    const menubar = ''

    return {plugins, toolbar, menubar}
  },

  data() {
    return {
      apiKey: 'rpphwlv2t4540b2n4lhq7otnvatkghwr7x01n591hs9cdqff',
      config: {
        plugins: this.plugins,
        toolbar: this.toolbar,
        menubar: this.menubar,
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
  }
}
</script>

<template>
  <div class="text-editor form-control">
    <label class="label">
      <b class="label-text">{{ fieldLabel }}</b>
    </label>

    <editor :api-key='apiKey' :init="config" v-model="modelValue" />

    <label class="label">
      <template v-if="errors">
        <span class="label-text-alt text-red-500">{{ errors }}</span>
      </template>
    </label>
  </div>
</template>

<style lang="scss" src="./text_editor.scss"></style>

