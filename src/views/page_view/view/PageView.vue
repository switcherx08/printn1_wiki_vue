<script>
import {mapState} from 'pinia';
import {useRoute} from 'vue-router'
import {useWikiDataStore} from '@/stores/wikiData'
import {useProjectStore} from '@/stores/project'
import {useSidebarStore} from "@/stores/sidebar";
import PageSections from '@/components/sections/page_sections/PageSections.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import PageAuthors from '@/components/authors/page_authors/PageAuthors.vue'
import PageContent from '@/components/content/page_content/PageContent.vue'
import AttachmentFilesMini from '@/components/files/attachment_files/AttachmentFilesMini.vue'
import BaseIconButton from '@/components/base/button/BaseIconButton.vue'
import IconSettings from '@/components/icons/IconSettings.vue'
import ModalDialog from '@/components/modal/ModalDialog.vue'
import BaseSimpleButton from '@/components/base/button/BaseSimpleButton.vue'

export default {
  name: 'PageView',
  components: {
    BaseSimpleButton,
    ModalDialog,
    IconSettings,
    BaseIconButton,
    PageContent,
    PageAuthors,
    IconEdit,
    PageSections,
    AttachmentFilesMini
  },

  setup() {
    // Route
    const route = useRoute()
    const wikiDataStore = useWikiDataStore()
    const projectStore = useProjectStore()
    const sidebarStore = useSidebarStore()

    return {route, wikiDataStore, projectStore, sidebarStore}
  },

  computed: {
    ...mapState(useProjectStore, {
      projectId: 'projectId',
      project: 'project'
    }),
    ...mapState(useWikiDataStore, {
      id: 'id',
      title: 'title',
      content: 'content',
      alias: 'alias',
      author: 'author',
      files: 'files',
      is_archive: 'is_archive'
    }),
  },

  watch: {
    projectId() {
      this.fetchData()
    },

    route: {
      handler() {
        this.viewContent()
        this.fetchData()
      },
      deep: true
    },

    is_archive() {
      if(this.is_archive) {
        let response = this.wikiDataStore.response_archive

        this.sidebarStore.fetchPanelMenu(this.projectId)

        this.$notify({
          title: response.title,
          duration: 10000
        });

        setTimeout(()=> {
          this.$router.push({name: 'dashboard'})
        },500)
      }
    }
  },

  created() {
    if(this.projectId && parseInt(this.projectId) !== 0) {
      this.fetchData()
    }
  },

  methods: {
    async viewContent() {
      await this.fetchData()
    },

    fetchData() {
      if(this.$route.params && this.$route.params.id) {
        this.wikiDataStore.fetchWikiData(this.$route.params.id)
        this.wikiDataStore.fetchWikiFiles(this.$route.params.id)
      }
    },

    openSettingsModal() {
      this.$refs.SettingsModal.show()
    }
  },

  // eslint-disable-next-line vue/order-in-components
  beforeUnmount() {
    this.wikiDataStore.clearData()
  },
}
</script>

<template>
    <PageSections v-if="id">
      <template #widgets>
        <div class="flex ml-auto">
          <router-link :to="{name: 'page-edit', params: { alias: $route.params.alias }}" class="btn btn-sm btn-outline btn-primary">
            <div class="flex items-center">
              <IconEdit width="21px" height="21px" class="mr-1" />
              <span class="my-auto">Редактировать</span>
            </div>
          </router-link>
          <BaseIconButton class="ml-4" @click="openSettingsModal()">
            <IconSettings />
          </BaseIconButton>
        </div>
      </template>
      <template #header>
        <div class="h1 w-full mb-2">{{title}}</div>
        <PageAuthors :item-data="author" />
        <AttachmentFilesMini
            v-if="content"
            :show-upload-button="false"
            :show-remove-button="false"
            class="mt-4"
            :data-files="files"
        />
      </template>
      <template #body>
        <PageContent v-if="content" :item-data="content" />
      </template>
    </PageSections>

  <teleport to="#modals">
    <ModalDialog
        ref="SettingsModal"
        size="small"
        @close="sidebarStore.setPanelMenuIsEdit(false)"
    >
      <template #header>
        <h3 class="mb-4">Настройки страницы</h3>
      </template>

      <template #body>
        <BaseSimpleButton
            size="middle"
            class="w-full"
          @click="wikiDataStore.moveToArchive($route.params.id)"
        >Перенести в архив</BaseSimpleButton>
      </template>
    </ModalDialog>
  </teleport>

</template>
