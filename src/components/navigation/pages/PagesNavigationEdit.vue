<script>
import {mapState} from "pinia";
import {useSidebarStore} from "@/stores/sidebar";
import PagesNavigationEditItem from "@/components/navigation/pages/PagesNavigationEditItem.vue";

export default {
  name: 'PagesNavigationEdit',

  components: {PagesNavigationEditItem},

  setup() {
    const sidebarStore = useSidebarStore()

    return {
      sidebarStore
    }
  },

  data() {
    return {
      parentId: 0,
      childrenMenu: {}
    }
  },

  computed: {
    ...mapState(useSidebarStore, {
      menu: 'panelMenu',
      panelMenuEditData: 'panelMenuEditData'
    }),
  },

  watch: {
    parentId() {
      for(let i in this.menu) {
        if(this.menu[i].id === this.parentId) {
          this.childrenMenu = this.menu[i]
        }
      }
    }
  },

  mounted() {
    setTimeout(() => {
      this.parentId = 2
    }, 600)
  }
}
</script>

<template>
  <div class="edit-menu flex">
    <div class="edit-menu__parents w-80 shrink-0 pr-4 mr-4">
      <b class="mb-2">Родительская страница</b>
      <PagesNavigationEditItem
          v-for="(page, pageIndex) in menu"
          :key="pageIndex"
          :item-data="page"
          :level-data="1"
          :parent-id="parentId"
      />
    </div>
    <div class="edit-menu__content">
      <div class="edit-menu__child w-80 shrink-0 px-4 mr-6">
        <b class="mb-2">Позиция страницы</b>
        <div class="flex flex-col">
          <div v-for="(children, childrenIndex) in childrenMenu.children" :key="childrenIndex" class="mb-2 py-2">
            <span>{{children.name}}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss">
.edit-menu {
  height: 90%;
  overflow-x: hidden;
  overflow-y: auto;

  &__parents,
  &__child {
    height: 100%;
    border-right: 1px solid var(--border-color);
  }
}
</style>
