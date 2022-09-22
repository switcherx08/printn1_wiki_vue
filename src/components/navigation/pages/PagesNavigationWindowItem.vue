<template>
  <div class="pages-nav-item flex flex-col">
    <div class="pages-nav-item__box flex">
      <template v-if="itemData.isMain">
        <div class="pages-nav-item__icon mr-3">
          <IconPage/>
        </div>
      </template>
      <template v-else>
        <div v-if="itemData.children" class="pages-nav-item__icon mr-3">
          <IconArrowBottom/>
        </div>
        <div v-else class="pages-nav-item__dot mr-3"></div>
      </template>
      <div class="pages-nav-item__name w-full mr-3">
        {{ itemData.name }}
      </div>
      <div class="pages-nav-item__buttons">
        <button type="button" class="pages-nav-item__button">
          <IconPlus/>
        </button>
      </div>
    </div>

    <div
        v-if="itemData.children"
        class="pages-nav-item__child"
    >
      <PagesNavigationItem
          v-for="(child, childIndex) in itemData.children"
          :key="childIndex"
          :item-data="child"
          :level-data="levelData"
      />
    </div>
  </div>
</template>

<script>
import IconPlus from "@/components/icons/IconPlus.vue";
import IconArrowBottom from "@/components/icons/IconArrowBottom.vue";
import IconPage from "@/components/icons/IconPage.vue";

export default {
  name: 'PagesNavigationWindowItem',
  components: {
    IconPage,
    IconArrowBottom,
    IconPlus
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
}
</script>

<style lang="scss" src="./page_navigation_item.scss"></style>
