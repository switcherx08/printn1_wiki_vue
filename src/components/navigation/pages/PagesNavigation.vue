<template>
    <div class="pages-nav">
      <PagesNavigationItem :item-data="mainPageItem" />

      <PagesNavigationItem
          v-for="(page, pageIndex) in pages"
          :key="pageIndex"
          :item-data="page"
      />
    </div>
</template>

<script>
import PagesNavigationItem from "./PagesNavigationItem.vue";
export default {
  name: "PagesNavigation",
  components: {PagesNavigationItem},
  data() {
    return {
      mainPageItem: {id: 1, name: 'Страницы', isMain: true},
      pages: [
        {id: 1, name: 'Get started'}
      ]
    }
  }
}
</script>

<style lang="scss">
.pages-nav {
  display: flex;
  flex-direction: column;
}
</style>
