<script>
import {mapState} from 'pinia'
import { useWikiDataStore } from '@/stores/wikiData'
import { useProjectStore } from '@/stores/project'
import { useSidebarStore } from '@/stores/sidebar'
import PageSections from '@/components/sections/page_sections/PageSections.vue';
import BaseSimpleButton from '@/components/base/button/BaseSimpleButton.vue';
import TextInput from '@/components/base/input/TextInput.vue';
import TextEditor from '@/components/base/input/TextEditor.vue';

export default {
  name: 'PageCreate',
  components: {
    TextEditor,
    TextInput,
    BaseSimpleButton,
    PageSections
  },
  setup() {
    const wikiDataStore = useWikiDataStore()
    const projectStore = useProjectStore()
    const sidebarStore = useSidebarStore()

    return {wikiDataStore, projectStore, sidebarStore}
  },
  computed: {
    ...mapState(useWikiDataStore,{
      response: 'response',
    }),
    ...mapState(useProjectStore,{
      projectId: 'projectId',
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
  methods: {
    submitForm() {
      const data = {
        parent_id: this.$route.query && this.$route.query.parentId ? this.$route.query.parentId : '',
        project_id: this.projectId,
        name: this.name,
        text: this.text
      }
      this.wikiDataStore.sendCreateOrEdit(data, 'POST')
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
      // Show massage
      this.$notify({
        title: data.title,
        duration:10000
      });
      // Update panel menu
      this.sidebarStore.fetchPanelMenu(this.projectId)
      // Redirect to view page
      const alias = data.data.alias
      this.$router.push({name: 'page-view', params: { alias: alias }})
    }
  }
}
</script>

<template>
  <PageSections>
    <template #header>
      <h1>Создать страницу</h1>
    </template>
    <template #widgets>
      <div class="flex ml-auto">
        <BaseSimpleButton is-primary is-outline size="middle" class="ml-2" @click="submitForm()">Сохранить</BaseSimpleButton>
      </div>
    </template>
    <template #body>
      <form action="/api/wiki" method="POST" class="flex flex-col w-full h-full">
        <TextInput
            v-model="name"
            :model-value="name"
            field-label="Название"
            field-placeholder="Укажите название проекта"
            :field-errors="errors.name"
            class="mb-2"
        />

        <div class="w-full">
          <TextEditor
              v-model="text"
              :model-value="text"
              field-label="Описание"
              field-placeholder="Укажите название проекта"
              :field-errors="errors.text"
              class="w-full h-full"
          />
        </div>
      </form>
    </template>
  </PageSections>
</template>
