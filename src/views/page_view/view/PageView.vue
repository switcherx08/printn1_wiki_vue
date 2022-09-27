<script>
import { useRoute } from "vue-router"
import PageSections from '@/components/sections/page_sections/PageSections.vue'
import BaseIconButton from '@/components/base/button/BaseIconButton.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconSettings from '@/components/icons/IconSettings.vue'
import PageAuthors from '@/components/authors/page_authors/PageAuthors.vue'
import PageContent from '@/components/content/page_content/PageContent.vue'
import ModalDialog from '@/components/modal/ModalDialog.vue'
import {useWikiDataStore} from '@/stores/wikiData'
import {useProjectStore} from '@/stores/project'
import {mapState} from "pinia";

export default {
  name: 'PageView',
  components: {
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
      title: 'title',
      content: 'content',
      author: 'author'
    }),
  },
  watch: {
    projectId() {
      this.fetchData()
    },

    route: {
      handler() {
        this.fetchData()
      },
      deep: true
    }
  },
  methods: {
    editContent() {
      this.changeMode(this.modeArray['edit'])
    },

    openSettings() {
      this.$refs.SettingsModalDialog.show()
    },

    changeMode(mode) {
      this.mode = this.modeArray[mode]
    },

    fetchData() {
      this.wikiDataStore.fetchWikiData(this.projectId, this.$route.params.alias)
    }
  },

  // eslint-disable-next-line vue/order-in-components
  beforeUnmount() {
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
      <template #header>
        Title page edit...
      </template>
      <template #body>
        Page edit component...
      </template>
    </PageSections>
  </template>

  <template v-else>
    <PageSections>
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
