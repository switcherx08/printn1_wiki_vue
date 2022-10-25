<script>
import draggable from "vuedraggable";
import {useSidebarStore} from "@/stores/sidebar";

export default {
  name: 'PagesNavigationEditChildItem',

  components: {draggable},

  props: {
    levelData: {
      type: Number,
      default: 1
    },
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
        group="children"
        v-bind="dragOptions"
        item-key="id"
    >
      <template #item="{ element, index }">
        <div class="edit-menu-item">
          <div class="flex flex-col">
            <div class="edit-menu-item__name text-ellipsis">{{ element.name }} - {{index}}</div>

            <div class="edit-menu__card-list">
              <PagesNavigationEditChildItem
                  :item-data="element.children"
                  :drag-options="dragOptions"
                  :level-data="1 + 1"
              />
            </div>
          </div>
        </div>
      </template>
    </draggable>
  </template>
</template>

<style lang="scss">
.edit-menu-item {
  padding: 5px 12px;
  margin-top: 12px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  transition: all .3s ease-in-out;

  & & {
    margin-left: 10px;
  }

  &:hover {
    background-color: var(--body-color);
    cursor: pointer;
  }

  & &:hover {
    background-color: rgba(0,0,0,.05);
    cursor: pointer;
  }

  &__name {
    font-weight: 600;
    color: #5c5c5c;
    font-size: .75rem;
  }
}
</style>
