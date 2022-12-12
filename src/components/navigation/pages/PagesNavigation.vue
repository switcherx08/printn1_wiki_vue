<script>
import {mapState} from "pinia";
import {useSidebarStore} from "@/stores/sidebar";
import {useLoaderStore} from "@/stores/loader";
import PagesNavigationItem from "./PagesNavigationItem.vue";
import PagesNavigationMain from "./PagesNavigationMain.vue";
import PagesNavigationEdit from "@/components/navigation/pages/PagesNavigationEdit.vue";

export default {
  name: 'PagesNavigation',

  components: {
    PagesNavigationMain, PagesNavigationItem, PagesNavigationEdit
  },

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
      menu: 'panelMenu',
    }),
  },
}
</script>

<template>
  <div class="pages-nav">
    <PagesNavigationMain :item-data="mainPageItem"/>

    <PagesNavigationItem
        v-for="(page, pageIndex) in menu"
        :key="pageIndex"
        :item-data="page"
        :level-data="1"
    />
  </div>
</template>

<style lang="scss" src="./pages_navigation.scss"></style>
