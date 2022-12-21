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
    const dragging = ref(false)
    const drag_aimation = 400
    const changedMenu = ref([])
    const menu = ref([])

    return {
      dragging,
      drag_aimation,
      menu,
      changedMenu
    }
  },

  emits: [
    'update:added',
    'update:moved'
  ],

  computed: {
    levelMenu() {
      return this.levelData + 1
    },
  },

  watch: {
    list: {
      handler(val) {
        this.transformList(val)
      },
      deep: true
    },
  },

  mounted() {
    this.transformList(this.list)
  },

  methods: {
    transformList(val) {
      this.menu = []

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
        this.$emit('update:moved', data)
      }

      if(data.added) {
        this.$emit('update:added', data.added)
      }
    }
  }
}
</script>

<template>
  <draggable
      class="menu-drag-area"
      tag="div"
      v-model="menu"
      :group="{ name: 'g1' }"
      item-key="wiki"
      :animation="drag_aimation"
      @start="dragging = true"
      @end="dragging = false"
      @change="draggableUpdate"
  >
    <template #item="{ element }">
      <PagesNavigationItem :item-data="element" :level-data="levelData" :is-dragging="dragging" />
    </template>
  </draggable>
</template>

<style lang="scss">
.menu-drag-area {
  min-height: 50px;
}
</style>
