<script>
import {mapState} from 'pinia';
import { useRoute } from 'vue-router'
import {useWikiDataStore} from '@/stores/wikiData'
import {useProjectStore} from '@/stores/project'
import PageSections from '@/components/sections/page_sections/PageSections.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import PageAuthors from '@/components/authors/page_authors/PageAuthors.vue'
import PageContent from '@/components/content/page_content/PageContent.vue'

export default {
  name: 'PageView',
  components: {
    PageContent,
    PageAuthors,
    IconEdit,
    PageSections,
  },

  setup() {
    // Route
    const route = useRoute()
    const wikiDataStore = useWikiDataStore()
    const projectStore = useProjectStore()

    return {route, wikiDataStore, projectStore}
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
    async viewContent() {
      await this.fetchData()
    },

    fetchData() {
      if(this.$route.params && this.$route.params.id) {
        this.wikiDataStore.fetchWikiData(this.$route.params.id)
      }
    },
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
        </div>
      </template>
      <template #header>
        <div class="h1 w-full mb-2">{{title}}</div>
        <PageAuthors :item-data="author" />
      </template>
      <template #body>
        <PageContent :item-data="content" />
      </template>
    </PageSections>
</template>
