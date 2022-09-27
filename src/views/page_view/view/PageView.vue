<script>
import {mapState} from 'pinia';
import { useRoute } from 'vue-router'
import PageSections from '@/components/sections/page_sections/PageSections.vue'
import BaseIconButton from '@/components/base/button/BaseIconButton.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconSettings from '@/components/icons/IconSettings.vue'
import PageAuthors from '@/components/authors/page_authors/PageAuthors.vue'
import PageContent from '@/components/content/page_content/PageContent.vue'
import PageEdit from "@/components/content/page_edit/PageEdit.vue";
import ModalDialog from '@/components/modal/ModalDialog.vue'
import {useWikiDataStore} from '@/stores/wikiData'
import {useProjectStore} from '@/stores/project'

export default {
  name: 'PageView',
  components: {
    PageEdit,
    ModalDialog,
    PageContent,
    PageAuthors,
    IconEdit,
    IconSettings,
    PageSections,
    BaseIconButton
  },
  setup() {
    // Route
    const route = useRoute()
    const wikiDataStore = useWikiDataStore()
    const projectStore = useProjectStore()

    return {route, wikiDataStore, projectStore}
  },
  data() {
    return {
      modeArray: {
        view: 'view',
        edit: 'edit'
      },
      mode: 'view',
    }
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
      author: 'author'
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
  },
  created() {
    if(this.projectId && parseInt(this.projectId) !== 0) {
      this.fetchData()
    }
  },
  methods: {
    editContent() {
      this.changeMode(this.modeArray['edit'])
    },

    viewContent() {
      this.changeMode(this.modeArray['view'])
    },

    openSettings() {
      this.$refs.SettingsModalDialog.show()
    },

    changeMode(mode) {
      this.mode = this.modeArray[mode]
    },

    fetchData() {
      if(this.$route.params && this.$route.params.alias) {
        this.wikiDataStore.fetchWikiData(this.projectId, this.$route.params.alias)
      }
    },
  },

  // eslint-disable-next-line vue/order-in-components
  beforeUnmount() {
    this.viewContent()
    this.wikiDataStore.clearData()
  },
}
</script>

<template>
  <template v-if="mode === 'edit'">
    <PageSections class="-mt-4">
      <template #widgets>
        <div class="flex ml-auto">
          Edit buttons...
        </div>
      </template>
      <template #body>
        <PageEdit />
      </template>
    </PageSections>
  </template>

  <template v-else>
    <PageSections v-if="content">
      <template #widgets>
        <div class="flex ml-auto">
          <BaseIconButton size="middle" title="Редактировать" class="ml-2" @click="editContent()">
            <IconEdit width="21px" height="21px" />
          </BaseIconButton>
          <BaseIconButton size="middle" title="Другие действия" class="ml-2" @click="openSettings()">
            <IconSettings width="20px" height="20px" />
          </BaseIconButton>
        </div>
      </template>
      <template #header>
        <div class="h1 w-full mb-2">{{title}}</div>
        <PageAuthors :item-data="author" />
      </template>
      <template #body>
        <PageContent :item-data="content" />
        <ModalDialog ref="SettingsModalDialog" size="middle">
            <template #header>
              <h3>Настройки страницы</h3>
            </template>
            <template #body>
              <div class="mt-4">
                Компонент настроек скранмцы...
              </div>
            </template>
          </ModalDialog>
      </template>
    </PageSections>
  </template>
</template>
