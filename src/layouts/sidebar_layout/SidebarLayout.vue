<script>
import {mapState} from 'pinia'
import SidebarMainDesktop from "@/components/navigation/sidebar/sidebar_main/SidebarMainDesktop.vue";
import {useSidebarStore} from "@/stores/sidebar";
import {usePageStore} from "@/stores/page";
import {useProjectStore} from "@/stores/project";

export default {
  components: {
    SidebarMainDesktop
  },
  computed: {
    ...mapState(useSidebarStore, {
      panelMenuIsShow: 'panelMenuIsShow'
    }),
    ...mapState(usePageStore, {
      useContentInnerContainer: 'useContentInnerContainer'
    }),
    ...mapState(useProjectStore, {
      projectId: 'projectId'
    }),

    pageTitle() {
      return this.$route.meta
      && this.$route.meta.page
      && this.$route.meta.page.title
          ? this.$route.meta.page.title : 'LinBoard'
    }
  },
  watch: {
    projectId() {
      this.fetchProjectPages()
      console.log('Return dashboard page')
      this.$router.push({name: 'dashboard'})
    }
  },
  methods: {
    fetchProjectPages() {
      console.log('Update project menu..')
    }
  }
}
</script>

<template>
  <div class="sidebar-layout">
    <!-- Sidebar -->
    <SidebarMainDesktop/>
    <!-- View wrapper -->
    <div :class="[{'is-pushed-full': panelMenuIsShow}, `page-${$route.name}`]" class="view-wrapper" >
      <div class="page-title flex">
        <div class="page-content flex">
          <div class="flex items-center mr-auto">
            <h1 class="title-wrap">{{ pageTitle }}</h1>
          </div>
        </div>
      </div>
      <div class="page-content-inner">
        <div :class="{'page-content': useContentInnerContainer}">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./sidebar_layout.scss"></style>
