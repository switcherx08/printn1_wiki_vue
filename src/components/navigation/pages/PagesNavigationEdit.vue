<script>
import {mapState} from "pinia";
import draggable from "vuedraggable";
import {useSidebarStore} from "@/stores/sidebar";
import LbCard from "@/components/base/card/Lb-Card.vue";
import IconMouse from "@/components/icons/IconMouse.vue";
import PagesNavigationEditChildItem from "@/components/navigation/pages/PagesNavigationEditChildItem.vue";

export default {
  name: 'PagesNavigationEdit',
  components: {PagesNavigationEditChildItem, draggable, IconMouse, LbCard},

  setup () {
    const sidebarStore = useSidebarStore()

    return {sidebarStore}
  },

  computed: {
    ...mapState(useSidebarStore, {
      menu: 'panelMenu',
      dragOptions: 'dragOptions'
    }),
    menuData() {
      let result = []
      for(let item in this.menu) {
        result.push(this.menu[item])
      }

      return result
    }
  },
}
</script>

<template>
  <div class="edit-menu">
    <draggable
        class="grid grid-cols-4 gap-6 w-full"
        :list="menuData"
        v-bind="dragOptions"
        group="menu"
        item-key="id"
    >
      <template #item="{ element }">
        <div>
          <LbCard :use-background="false" class="edit-menu__card bg-slate-200">
            <div class="flex flex-col">
              <div class="edit-menu__card-header flex items-center">
                <IconMouse class="mr-2" />
                <b>{{element.name}}</b>
              </div>

              <div v-if="element.children" class="edit-menu__card-list">
                <PagesNavigationEditChildItem :item-data="element.children" :drag-options="dragOptions" />
              </div>
            </div>
          </LbCard>
        </div>
      </template>
    </draggable>
  </div>
</template>
