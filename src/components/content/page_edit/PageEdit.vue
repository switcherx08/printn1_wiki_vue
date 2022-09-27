<script>
import {mapState} from 'pinia';
import PageSections from '@/components/sections/page_sections/PageSections.vue'
import { useWikiDataStore } from '@/stores/wikiData'
import TextInput from '@/components/base/input/TextInput.vue'
import TextEditor from '@/components/base/input/TextEditor.vue'
import BaseSimpleButton from '@/components/base/button/BaseSimpleButton.vue';

export default {
  name: 'PageCreate',
  components: {PageSections, TextEditor, TextInput, BaseSimpleButton},
  setup() {
    const wikiDataStore = useWikiDataStore()

    return {wikiDataStore}
  },
  computed: {
    ...mapState(useWikiDataStore,{
      title: 'title',
      content: 'content',
    })
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      name: '',
      text: '',
    }
  },
  mounted() {
    this.name = this.title
    this.text = this.content
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
        <BaseSimpleButton is-primary>
          Сохранить
        </BaseSimpleButton>
      </div>
    </template>
    <template #body>
      <form action="/" method="POST" class="flex flex-col w-full h-full">
        <TextInput
            v-model="name"
            :model-value="name"
            field-label="Название"
            field-placeholder="Укажите название проекта"
            class="mb-2"
        />

        <div class="w-full">
          <TextEditor
              v-model="text"
              :model-value="text"
              field-label="Описание"
              field-placeholder="Укажите название проекта"
              class="w-full h-full"
          />
        </div>
      </form>
    </template>
  </PageSections>
</template>
