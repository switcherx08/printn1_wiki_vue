<script>
import {mapState} from 'pinia';
import { useWikiDataStore } from '@/stores/wikiData'
import PageSections from '@/components/sections/page_sections/PageSections.vue'
import TextInput from '@/components/base/input/TextInput.vue'
import TextEditor from '@/components/base/input/TextEditor.vue'
import BaseSimpleButton from '@/components/base/button/BaseSimpleButton.vue';

export default {
  name: 'PageEditContent',
  components: {PageSections, TextEditor, TextInput, BaseSimpleButton},
  setup() {
    const wikiDataStore = useWikiDataStore()

    return {wikiDataStore}
  },
  computed: {
    ...mapState(useWikiDataStore,{
      id: 'id',
      title: 'title',
      content: 'content',
      response: 'response',
    })
  },
  watch: {
    response: {
      handler(val) {
        if(Object.keys(this.response).length !== 0) {
          this.sendResponseManager(val)
        }
      },
      deep: true
    }
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      name: '',
      text: '',
      errors: {name: '', text: ''}
    }
  },
  mounted() {
    this.name = this.title
    this.text = this.content
  },
  methods: {
    submitForm() {
      const data = {
        id: this.id,
        name: this.name,
        text: this.text
      }
      this.wikiDataStore.sendCreateOrEdit(data, 'PUT')
    },

    sendResponseManager(data) {
      if (data.errors) {
        this.setErrors(data.errors)
      } else {
        this.setSuccess(data)
      }
    },

    setErrors(errors) {
      this.errors = errors
    },

    setSuccess(data) {
      this.$notify({
        title: data.title,
        duration:10000
      });
    }
  }
}
</script>

<template>
  <PageSections>
    <template #header>
      <slot name="header" />
    </template>
    <template #widgets>
      <div class="flex ml-auto">
        <slot name="widgets" />
      </div>
    </template>
    <template #body>
      <form action="/api/wiki" method="PUT" class="flex flex-col w-full h-full">
        <TextInput
            v-model="name"
            :model-value="name"
            field-label="????????????????"
            field-placeholder="?????????????? ???????????????? ??????????????"
            :field-errors="errors.name"
            class="mb-2"
        />

        <div class="w-full">
          <TextEditor
              v-model="text"
              :model-value="text"
              field-label="????????????????"
              field-placeholder="?????????????? ???????????????? ??????????????"
              :field-errors="errors.text"
              class="w-full h-full"
          />
        </div>
      </form>
    </template>
  </PageSections>
</template>
