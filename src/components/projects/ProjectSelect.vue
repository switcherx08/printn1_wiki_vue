<script>
import BaseSelect from "@/components/base/input/BaseSelect.vue";
export default {
  name: "ProjectSelect",
  components: {BaseSelect},
  data() {
    return {
      projects: [
        {id: 1, name: 'Проект Wiki'},
      ]
    }
  }
}
</script>

<template>
  <div>
    <BaseSelect :item-data="projects" field-name="projects_select" field-id="projects_select" />
  </div>
</template>
