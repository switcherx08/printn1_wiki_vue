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
    const menu = ref([])

    return {
      menu
    }
  },

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
    }
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

    changeMenu(data) {
      console.log(data)
    }
  }
}
</script>

<template>
  <draggable
      class="menu-drag-area"
      tag="div"
      :list="menu"
      :group="{ name: 'g1' }"
      item-key="name"
      @change="changeMenu($event)"
  >
    <template #item="{ element }">
      <PagesNavigationItem :item-data="element" :level-data="levelData" >
<!--        {{element}}-->
<!--        <template #children>-->
          <!--            {{element.children}}-->
<!--          <MenuDraggable :list="element.children" :level-data="levelMenu" />-->
<!--        </template>-->
      </PagesNavigationItem>
    </template>
  </draggable>
</template>

<style lang="scss">
.menu-drag-area {
  min-height: 50px;
}
</style>
