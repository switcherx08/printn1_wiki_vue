<script>
import draggable from "vuedraggable";
import {useSidebarStore} from "@/stores/sidebar";

export default {
  name: 'PagesNavigationEditChildItem',

  components: {draggable},

  props: {
    itemData: {
      type: Object,
      required: true
    },
    dragOptions: {
      type: Object,
      required: true
    },
  },

  setup() {
    const sidebarStore = useSidebarStore()

    return {sidebarStore}
  },

  data() {
    return {
      menu: [],
      menuData: []
    }
  },

  computed: {
    isEmptyMenuData() {
      return !(this.menuData && this.menuData.length !== 0)
    }
  },

  watch: {
    menu: {
      handler() {
        this.menuData = this.sidebarStore.transformMenuItemToArray(this.menu)
      },
      deep: true
    }
  },

  mounted() {
    for (let item in this.itemData) {
      this.menu.push(this.itemData[item])
    }
  }
}
</script>

<template>
  <template v-if="!isEmptyMenuData">
    <draggable
        class="flex flex-col"
        :list="menuData"
        group="menu"
        v-bind="dragOptions"
        item-key="id"
    >
      <template #item="{ element }">
        <div class="mt-2 py-2 px-4">
          <div class="flex flex-col">
            <div>{{ element.name }}</div>

            <div v-if="element.children" class="edit-menu__card-list pb-4">
              <PagesNavigationEditChildItem :item-data="element.children" :drag-options="dragOptions"/>
            </div>
          </div>
        </div>
      </template>
    </draggable>
  </template>
</template>

