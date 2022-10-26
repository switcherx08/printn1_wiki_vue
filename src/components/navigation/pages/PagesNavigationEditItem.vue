<script>
import {useSidebarStore} from "@/stores/sidebar";
import IconArrowBottom from "@/components/icons/IconArrowBottom.vue";

export default {
  name: 'PagesNavigationEditItem',

  components: {
    IconArrowBottom
  },

  props: {
    itemData: {
      type: [Object, Array],
      required: true
    },
    levelData: {
      type: Number,
      required: true
    },
    parentId: {
      type: [Number, null],
      default: null
    },
  },

  setup() {
    const sidebarStore = useSidebarStore()

    return {sidebarStore}
  },

  data() {
    return {
      isOpen: true,
    }
  },

  computed: {
    levelMenu() {
      return this.levelData + 1
    }
  },

  methods: {
    toggleChild() {
      this.isOpen = !this.isOpen;
    },
  }
}
</script>

<template>
  <div class="pages-nav-item flex flex-col">
    <div class="pages-nav-item__box flex">
      <div
          v-if="itemData.children"
          class="pages-nav-item__icon mr-3"
          :class="{'is_open': isOpen}"
          @click="toggleChild()"
      >
        <IconArrowBottom />
      </div>
      <div v-else class="pages-nav-item__dot mr-3"></div>
      <div class="pages-nav-item__name w-full mr-3 text-ellipsis" :class="{'is_active': parentId === itemData.id}">
        <span class="text-ellipsis" :title="itemData.name">{{itemData.name}}</span>
      </div>
    </div>

    <div
        v-if="itemData.children"
        class="pages-nav-item__child"
        :class="{'is_open': isOpen}"
    >
        <PagesNavigationEditItem
            v-for="(child, childIndex) in itemData.children"
            :key="childIndex"
            :item-data="child"
            :level-data="levelMenu"
            :parent-id="parentId"
        />
    </div>
  </div>
</template>
