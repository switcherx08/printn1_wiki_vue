<template>
  <div class="pages-nav-item flex flex-col" :class="{'is_main': itemData.isMain}">
    <div class="pages-nav-item__box flex">
      <template v-if="itemData.isMain">
        <div class="pages-nav-item__icon mr-3">
          <IconPage />
        </div>
      </template>
      <template v-else>
        <div
            v-if="itemData.children"
            class="pages-nav-item__icon mr-3"
            :class="{'is_open': isOpen}"
            @click="toggleChild()"
        >
          <IconArrowBottom />
        </div>
        <div v-else class="pages-nav-item__dot mr-3" @click="pushPage(itemData)"></div>
      </template>
      <template v-if="itemData.isMain">
        <div class="pages-nav-item__name w-full mr-3">
          <b>{{itemData.name}}</b>
        </div>
      </template>
      <template v-else>
        <div class="pages-nav-item__name w-full mr-3" @click="pushPage(itemData)">
          {{itemData.name}}
        </div>
      </template>
      <div class="pages-nav-item__buttons">
        <button type="button" class="pages-nav-item__button" @click="addPage(itemData)">
          <IconPlus />
        </button>
      </div>
    </div>

    <!--      <template v-if="levelMenu <= 3">-->
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
    <!--      </template>-->

  </div>
</template>

<script>
import IconPlus from "@/components/icons/IconPlus.vue";
import IconArrowBottom from "@/components/icons/IconArrowBottom.vue";
import IconPage from "@/components/icons/IconPage.vue";

export default {
  name: "PagesNavigationItem",
  components: {IconPage, IconArrowBottom, IconPlus},
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
      console.log('Push to ' + page.name)

      if(page.children && Object.keys(page.children).length !== 0) {
        this.isOpen = true
      }
    },

    addPage(page) {
      console.log('Add new page in ' + page.name)
    }

  }
}
</script>

<style lang="scss" src="./page_navigation_item.scss"></style>
