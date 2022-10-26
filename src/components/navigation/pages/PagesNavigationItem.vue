<script>
import IconPlus from "@/components/icons/IconPlus.vue";
import IconArrowBottom from "@/components/icons/IconArrowBottom.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
import {useSidebarStore} from "@/stores/sidebar";

export default {
  name: 'PagesNavigationItem',

  components: {
    IconSettings, IconArrowBottom, IconPlus
  },

  props: {
    itemData: {
      type: [Object, Array],
      required: true
    },
    levelData: {
      type: Number,
      required: true
    }
  },

  setup() {
    const sidebarStore = useSidebarStore()

    return {sidebarStore}
  },

  data() {
    return {
      isOpen: false,
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

    pushPage(page) {
      if(page.children && Object.keys(page.children).length !== 0) {
        this.isOpen = true
      }
    },

    addPage(page) {
      if(page.isMain) {
        this.$router.push({name: 'page-create'})
      } else {
        this.$router.push({name: 'page-create', query: {parentId: page.id}})
      }
    },

    openEditMenu(data) {
      this.sidebarStore.setPanelMenuEditData(data)
      this.sidebarStore.setPanelMenuIsEdit(true)
    }
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
<!--        <button type="button" class="pages-nav-item__button" @click="openEditMenu(itemData)">-->
<!--          <IconSettings width="16px" height="16px" />-->
<!--        </button>-->
        <button type="button" class="pages-nav-item__button" @click="addPage(itemData)">
          <IconPlus />
        </button>
      </div>
    </div>

    <div
        v-if="itemData.children"
        class="pages-nav-item__child"
        :class="{'is_open': isOpen}"
    >
        <PagesNavigationItem
            v-for="(child, childIndex) in itemData.children"
            :key="childIndex"
            :item-data="child"
            :level-data="levelMenu"
        />
    </div>
  </div>
</template>

<style lang="scss" src="./page_navigation_item.scss"></style>
