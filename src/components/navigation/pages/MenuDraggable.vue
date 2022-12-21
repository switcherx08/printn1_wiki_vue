<script>
import {ref} from "vue";

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
    const drag = ref(false)
    const changedMenu = ref([])
    let menu = ref([])

    return {
      drag,
      menu,
      changedMenu
    }
  },

  computed: {
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
    }
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
      for(let i in val) {
        this.menu.push(val[i])
      }
    },

    draggableUpdate(data) {
      this.draggableSort()
      this.draggableEventManager(data)
    },

    draggableSort() {
      this.menu.map((item, index) => {
        item.sort = index + 1
      })
    },

    draggableEventManager(data) {
      if(data.moved) {
        console.log(data.moved)
      }

      if(data.added) {
        console.log(data.added)
      }
    }
  }
}
</script>

<template>
  <draggable
      class="menu-drag-area"
      :component-data="{
          tag: 'div',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null
        }"
      v-model="menu"
      v-bind="dragOptions"
      :group="{ name: 'g1' }"
      @start="drag = true"
      @end="drag = false"
      item-key="wiki"
  >
    <template #item="{ element }">
      <PagesNavigationItem :item-data="element" :level-data="levelData" />
    </template>
  </draggable>
</template>

<style lang="scss">
.menu-drag-area {
  min-height: 50px;
}
</style>
