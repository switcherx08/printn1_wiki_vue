<script>
import {mapState} from "pinia";
import PagesNavigationItem from "./PagesNavigationItem.vue";
import {useSidebarStore} from "@/stores/sidebar";
import {useLoaderStore} from "@/stores/loader";

export default {
  name: 'PagesNavigation',
  components: {PagesNavigationItem},
  setup() {
    const sidebarStore = useSidebarStore()
    const loaderStore = useLoaderStore()

    return {
      sidebarStore,
      loaderStore
    }
  },
  data() {
    return {
      mainPageItem: {name: 'Страницы', isMain: true},
    }
  },
  computed: {
    ...mapState(useSidebarStore, {
      menu: 'panelMenu'
    }),
  },
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
