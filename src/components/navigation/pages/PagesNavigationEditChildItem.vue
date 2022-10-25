<script>
import draggable from "vuedraggable";
import {useSidebarStore} from "@/stores/sidebar";

export default {
  name: 'PagesNavigationEditChildItem',

  components: {draggable},

  props: {
    itemData: {
      type:  Object,
      required: true
    },
    dragOptions: {
      type:  Object,
      required: true
    },
  },

  setup() {
    const sidebarStore = useSidebarStore()

    return {sidebarStore}
  },

  computed: {
    menuData() {
      return this.sidebarStore.transformMenuItemToArray(this.itemData)
    }
  }
}
</script>

<template>
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
          <div>{{element.name}}</div>

          <div v-if="element.children" class="edit-menu__card-list">
            <PagesNavigationEditChildItem :item-data="element.children" :drag-options="dragOptions" />
          </div>
          <div v-else class="">
            dd
          </div>
        </div>
      </div>
    </template>
  </draggable>
</template>

