<template>
    <div class="pages-nav">
      <PagesNavigationItem />
      <PagesNavigationItem />
      <PagesNavigationItem />
      <PagesNavigationItem />
      <PagesNavigationItem />
    </div>
</template>

<script>
import PagesNavigationItem from "./PagesNavigationItem.vue";
export default {
  name: "PagesNavigation",
  components: {PagesNavigationItem}
}
</script>

<style lang="scss">
.pages-nav {
  display: flex;
  flex-direction: column;
}
</style>
