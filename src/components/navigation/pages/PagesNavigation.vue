<script>
import {mapState} from "pinia";
import {useSidebarStore} from "@/stores/sidebar";
import {useLoaderStore} from "@/stores/loader";
import PagesNavigationItem from "./PagesNavigationItem.vue";
import PagesNavigationMain from "./PagesNavigationMain.vue";
import ModalDialog from '@/components/modal/ModalDialog.vue';
import PagesNavigationEdit from "@/components/navigation/pages/PagesNavigationEdit.vue";

export default {
  name: 'PagesNavigation',

  components: {
    PagesNavigationMain, PagesNavigationItem, PagesNavigationEdit, ModalDialog
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
      panelMenuIsEdit: 'panelMenuIsEdit'
    }),
  },

  watch: {
    panelMenuIsEdit() {
      if(this.panelMenuIsEdit) {
        this.$refs.Modal.show()
      }
    }
  }
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

  <teleport to="#modals">
    <modal-dialog
        ref="Modal"
        size="large"
        @close="sidebarStore.setPanelMenuIsEdit(false)"
    >
      <template #header>
        <h3 class="mb-4">Настройки меню</h3>
      </template>

      <template #body>
        <PagesNavigationEdit />
      </template>
    </modal-dialog>
  </teleport>
</template>

<style lang="scss" src="./pages_navigation.scss"></style>
