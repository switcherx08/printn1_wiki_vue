<script>
import {mapState} from "pinia";
import {useSidebarStore} from "@/stores/sidebar";
import {useLoaderStore} from "@/stores/loader";
import PagesNavigationItem from "./PagesNavigationItem.vue";
import PagesNavigationMain from "./PagesNavigationMain.vue";
import PagesNavigationEdit from "@/components/navigation/pages/PagesNavigationEdit.vue";
import MenuDraggable from "@/components/navigation/pages/MenuDraggable.vue";

export default {
  name: 'PagesNavigation',

  components: {
    MenuDraggable,
    PagesNavigationMain, PagesNavigationItem, PagesNavigationEdit,
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
    <MenuDraggable :list="menu" :level-data="1" />
  </div>
</template>

<style lang="scss" src="./pages_navigation.scss"></style>
