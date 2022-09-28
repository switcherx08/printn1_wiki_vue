<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'TextEditor',
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
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
        heading: {
          options: [
            { model: 'paragraph', title: 'Параграф', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Заголовок  H1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Заголовок  H2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Заголовок  H3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Заголовок  H4', class: 'ck-heading_heading4' },
            { model: 'heading5', view: 'h5', title: 'Заголовок  H5', class: 'ck-heading_heading5' },
            { model: 'heading6', view: 'h6', title: 'Заголовок  H6', class: 'ck-heading_heading6' },
          ]
        }
      }
    }
  },
  computed: {
    errors() {
      if(!this.fieldErrors) { return '' }

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
      <b class="label-text">{{fieldLabel}}</b>
    </label>
    <ckeditor
        :editor="editor"
        v-model="modelValue"
        :config="editorConfig"
    ></ckeditor>

    <label class="label">
      <template v-if="errors">
        <span class="label-text-alt text-red-500">{{errors}}</span>
      </template>
    </label>
  </div>
</template>

<style lang="scss" src="./text_editor.scss"></style>

