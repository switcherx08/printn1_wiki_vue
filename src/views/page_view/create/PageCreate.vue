<script>
import PageEdit from "@/components/content/page_edit/PageEdit.vue";

export default {
  name: 'PageCreate',
  components: {
    PageEdit
  }
}
</script>

<template>
  <div>
    <PageEdit>
      <template #header>
        <h1>Создать страницу {{ $route.query }}</h1>
      </template>
    </PageEdit>
  </div>
</template>
