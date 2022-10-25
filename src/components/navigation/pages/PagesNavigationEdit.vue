<script>
import {mapState} from "pinia";
import draggable from "vuedraggable";
import {useSidebarStore} from "@/stores/sidebar";
import LbCard from "@/components/base/card/Lb-Card.vue";
import IconHamburger from "@/components/icons/IconHamburger.vue";
import PagesNavigationEditChildItem from "@/components/navigation/pages/PagesNavigationEditChildItem.vue";

export default {
  name: 'PagesNavigationEdit',
  components: {PagesNavigationEditChildItem, draggable, IconHamburger, LbCard},

  setup () {
    const sidebarStore = useSidebarStore()

    return {sidebarStore}
  },

  data() {
    return {
      menuData: []
    }
  },

  computed: {
    ...mapState(useSidebarStore, {
      menu: 'panelMenu',
      dragOptions: 'dragOptions'
    }),
  },

  watch: {
    menu: {
      handler() {
        this.menuData = this.sidebarStore.transformMenuItemToArray(this.menu)
      },
      deep: true
    }
  }
}
</script>

<template>
  <div class="edit-menu flex flex-col">
<!--    grid grid-cols-4 gap-6 w-full-->
    <draggable
        class="flex flex-col"
        :list="menuData"
        v-bind="dragOptions"
        :group="menuData.id"
        item-key="id"
        handle=".handle"
    >
      <template #item="{ element, index }">
        <LbCard :use-background="false" :use-padding="false" class="edit-menu__card">
          <div class="flex flex-col">
            <div class="edit-menu__card-header flex items-start">
              <IconHamburger width="20px" height="20px" class="handle mr-2" />
              <b class="text-ellipsis">{{element.name}} - {{index}}</b>
            </div>

            <div class="edit-menu__card-list">
              <PagesNavigationEditChildItem
                  v-if="element.children"
                  :item-data="element.children"
                  :drag-options="dragOptions"
                  :level-data="1"
              />
            </div>
          </div>
        </LbCard>
      </template>
    </draggable>
  </div>
</template>

<style lang="scss">
.edit-menu {
  min-height: 40px;

  &__card {
    padding: 24px 15px;
    margin-bottom: 24px;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
  }

  &__card-list {
    min-height: 40px;
  }
}
</style>
