<script>
import {mapState} from 'pinia';
import { useRoute } from 'vue-router'
import {useWikiDataStore} from '@/stores/wikiData'
import {useProjectStore} from '@/stores/project'
import {useSidebarStore} from '@/stores/sidebar'
import PageSections from '@/components/sections/page_sections/PageSections.vue'
import TextEditor from '@/components/base/input/TextEditor.vue'
import BaseSimpleButton from '@/components/base/button/BaseSimpleButton.vue';
import IconEdit from '@/components/icons/IconEdit.vue'
import AttachmentFilesMini from "@/components/files/attachment_files/AttachmentFilesMini.vue";

export default {
  name: 'PageEdit',

  components: {AttachmentFilesMini, IconEdit, PageSections, TextEditor, BaseSimpleButton},

  setup() {
    // Route
    const route = useRoute()
    const wikiDataStore = useWikiDataStore()
    const projectStore = useProjectStore()
    const sidebarStore = useSidebarStore()

    sidebarStore.hidePanelMenuIsShow()
    wikiDataStore.fetchWikiData(route.params.id)

    return {route, wikiDataStore, projectStore, sidebarStore}
  },

  computed: {
    ...mapState(useWikiDataStore, {
      id: 'id',
      title: 'title',
      response: 'response',
    }),
  },

  watch: {
    title() {
      this.name = this.title
    },

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
      editTitleMode: false,
      errors: {name: '', text: ''}
    }
  },

  beforeUnmount() {
    this.sidebarStore.showPanelMenuIsShow()
  },

  methods: {
    submitForm() {
      const data = {
        id: this.id,
        name: this.wikiDataStore.title,
        text: this.wikiDataStore.content
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
    },

    onEditTitleMode() {
      this.editTitleMode = true
      setTimeout(() => this.$refs.TitleInput.focus(), 200)
    },

    endEditTitleMode() {
      this.editTitleMode = false
      this.wikiDataStore.setTitle(this.name)
    }
  }
}
</script>

<template>
  <PageSections>
    <template #widgets>
      <BaseSimpleButton
          is-primary
          is-outline
          size="middle"
          class="mr-2"
          @click="submitForm()"
      >
        Сохранить
      </BaseSimpleButton>

      <router-link
          :to="{name: 'page-view', params: { id: $route.params.id }}"
          class="btn btn-sm btn-outline btn-primary"
      >
        Назад
      </router-link>
    </template>
    <template #header>
      <h1>
          <input
              v-show="editTitleMode"
              ref="TitleInput"
              v-model="name"
              type="text"
              class="page-edit-title__input"
              @focusout="endEditTitleMode()"
          />
          <span v-show="!editTitleMode" class="page-edit-title" @click="onEditTitleMode()">
            <span class="page-edit-title__name">{{wikiDataStore.title}}</span>
            <span class="page-edit-title__icon"><IconEdit /></span>
          </span>
      </h1>
    </template>
    <template #body>
      <div class="flex">
        <AttachmentFilesMini show-upload-button class="mb-4" />
      </div>

      <TextEditor
          :model-value="wikiDataStore.content"
          :field-errors="errors.text"
          @update:modelValue="wikiDataStore.setContent($event)"
      />
    </template>
  </PageSections>
</template>

<style lang="scss">
.page-edit-title {
  display: inline-flex;
  cursor: pointer;

  &__name {
    margin-right: 5px;
  }

  &__icon {
    margin-top: auto;
    margin-bottom: auto;
    color: var(--placeholder);
  }

  &:hover &__icon {
    color: var(--primary);
  }

  &__icon svg {
    width: 20px;
    height: 20px;
  }

  &__input {
    font-weight: 600;
    outline: none;
    background-color: var(--body-color);
  }
}
</style>
