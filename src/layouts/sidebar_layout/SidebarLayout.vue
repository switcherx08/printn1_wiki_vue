<script>
import {mapState} from 'pinia'
import SidebarMainDesktop from "@/components/navigation/sidebar/sidebar_main/SidebarMainDesktop.vue";
import {useSidebarStore} from "@/stores/sidebar";
import {usePageStore} from "@/stores/page";

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

    pageTitle() {
      return this.$route.meta
      && this.$route.meta.page
      && this.$route.meta.page.title
          ? this.$route.meta.page.title : 'LinBoard'
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
      <div class="page-content-inner py-8">
        <div :class="{'page-content': useContentInnerContainer}">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./sidebar_layout.scss"></style>
