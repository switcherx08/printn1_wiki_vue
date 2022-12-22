<script>
import {ref} from "vue";
import {mapState} from "pinia";
import {useSidebarStore} from "@/stores/sidebar";
import {useProjectStore} from "@/stores/project";

export default {
  name: 'MenuDraggable',

  props: {
    list: {
      required: true,
      type: [Object, Array]
    },

    levelData: {
      type: Number,
      required: true
    }
  },

  setup() {
    const sidebarStore = useSidebarStore()
    const drag = ref(false)
    const changedMenu = ref([])
    const menu = ref([])

    return {
      sidebarStore,
      drag,
      menu,
      changedMenu
    }
  },

  computed: {
    ...mapState(useProjectStore, {
      projectId: 'projectId'
    }),
    ...mapState(useSidebarStore, {
      portableMenuItem: 'portableMenuItem',
      panelMenuUpdateCounter: 'panelMenuUpdateCounter'
    }),
    levelMenu() {
      return this.levelData + 1
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
  },

  created() {
    this.transformList(this.list)
  },

  watch: {
    list: {
      handler(val) {
        this.transformList(val)
      },
      deep: true
    },
  },

  methods: {
    transformList(val) {
      this.menu = []

      for(let i in val) {
        this.menu.push(val[i])
      }
    },

    setUpdateCheckItem(item) {
      if(item.moved) {
        this.portableMenuItem.id = item.moved.element.id
        this.portableMenuItem.sort = item.moved.newIndex
      } else if (item.added) {
        this.portableMenuItem.id = item.added.element.id
        this.portableMenuItem.sort = item.added.newIndex
      }
    },

    setDragEnd(item) {
      this.portableMenuItem.parent_id = item.id
    },

    setUpdateEnd() {
      this.drag = false
      this.sidebarStore.panelMenuUpdateCounterUp()
    }
  }
}
</script>

<template>
  <draggable
      class="menu-drag-area"
      item-key="wiki"
      :component-data="{
          tag: 'div',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null
        }"
      v-model="menu"
      v-bind="dragOptions"
      :group="{ name: 'g1' }"
      @start="drag = true"
      @end="setUpdateEnd"
      @change="setUpdateCheckItem"
  >
    <template #item="{ element }">
      <PagesNavigationItem
          :item-data="element"
          :level-data="levelData"
          @drop="setDragEnd(element)"
      />
    </template>
  </draggable>
</template>

<style lang="scss">
.menu-drag-area {
  min-height: 50px;
}
</style>
