<script>
import IconPlus from "@/components/icons/IconPlus.vue";
import IconArrowBottom from "@/components/icons/IconArrowBottom.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
import MenuDraggable from "@/components/navigation/pages/MenuDraggable.vue";
import {useSidebarStore} from "@/stores/sidebar";
import {useWikiDataStore} from '@/stores/wikiData'

export default {
  name: 'PagesNavigationItem',

  components: {
    MenuDraggable,
    // eslint-disable-next-line vue/no-unused-components
    IconSettings, IconArrowBottom, IconPlus,
  },

  props: {
    itemData: {
      type: Object,
      required: true
    },

    levelData: {
      type: Number,
      required: true
    },

    isDragging: {
      type: Boolean,
      required: true
    },
  },

  setup() {
    const sidebarStore = useSidebarStore()
    const wikiDataStore = useWikiDataStore()

    return {
      sidebarStore, wikiDataStore
    }
  },

  data() {
    return {
      isOpen: false,
    }
  },

  computed: {
    levelMenu() {
      return this.levelData + 1
    },
  },

  methods: {
    toggleChild() {
      this.isOpen = !this.isOpen;
    },

    pushPage(page) {
      if(page.children && Object.keys(page.children).length !== 0) {
        this.isOpen = true
      }
    },

    addPage(page) {
      if(page.isMain) {
        this.wikiDataStore.setCreateId('')
      } else {
        this.wikiDataStore.setCreateId(page.id)
      }

      this.wikiDataStore.setOpenCreteWindow(true)
    },

    openEditMenu(data) {
      this.sidebarStore.setPanelMenuEditData(data)
      this.sidebarStore.setPanelMenuIsEdit(true)
    }
  }
}
</script>

<template>
  <div class="pages-nav-item flex flex-col" :class="{'dragging': isDragging}">
    <div class="pages-nav-item__box flex">
      <div
          v-if="itemData.children"
          class="pages-nav-item__icon mr-3"
          :class="{'is_open': isOpen}"
          @click="toggleChild()"
      >
        <IconArrowBottom />
      </div>

      <router-link
          v-else
          :to="{name: 'page-view', params: { id: itemData.id }}"
          exact
          active-class="is_active"
          class="pages-nav-item__dot mr-3"
          @click="pushPage(itemData)"
      ></router-link>
      <router-link
          :to="{name: 'page-view', params: { id: itemData.id }}"
          exact
          active-class="is_active"
          class="pages-nav-item__name w-full mr-3 text-ellipsis"
          @click="pushPage(itemData)"
      >
        <span class="text-ellipsis">{{itemData.name}}</span>
      </router-link>

      <div class="pages-nav-item__buttons">
        <button type="button" class="pages-nav-item__button" @click="addPage(itemData)">
          <IconPlus />
        </button>
      </div>
    </div>

    <div
        class="pages-nav-item__child"
        :class="{'is_open': isOpen}"
    >
      <MenuDraggable v-if="itemData.children" :list="itemData.children" :level-data="levelMenu"/>
    </div>
  </div>
</template>

<style lang="scss" src="./page_navigation_item.scss"></style>
