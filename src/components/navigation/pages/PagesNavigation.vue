<script>
import {mapState} from "pinia";
import PagesNavigationItem from "./PagesNavigationItem.vue";
import {useSidebarStore} from "@/stores/sidebar";
import {useProjectStore} from "@/stores/project";
import {useLoaderStore} from "@/stores/loader";

export default {
  name: 'PagesNavigation',
  components: {PagesNavigationItem},
  setup() {
    const sidebarStore = useSidebarStore()
    const projectStore = useProjectStore()
    const loaderStore = useLoaderStore()

    return {sidebarStore, projectStore, loaderStore}
  },
  data() {
    return {
      mainPageItem: {name: 'Страницы', isMain: true},
    }
  },
  computed: {
    ...mapState(useProjectStore, {
      projectId: 'projectId'
    }),
    ...mapState(useSidebarStore, {
      menu: 'panelMenu'
    }),
  },
  // watch: {
  //   projectId() {
  //     this.loaderStore.startAppProgress(true)
  //     this.$router.push({name: 'dashboard'})
  //     this.loaderStore.startAppProgress(false)
  //   },
  // },
}
</script>

<template>
    <div class="pages-nav">
      <PagesNavigationItem :item-data="mainPageItem" :level-data="1" />

      <PagesNavigationItem
          v-for="(page, pageIndex) in menu"
          :key="pageIndex"
          :item-data="page"
          :level-data="1"
      />
    </div>
</template>

<style lang="scss" src="./pages_navigation.scss"></style>
