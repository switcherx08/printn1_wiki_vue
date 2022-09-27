<script>
import {useProjectStore} from "@/stores/project"
import {mapState} from "pinia";

export default {
  name: 'ProjectList',
  setup() {
    // Projects
    const projectStore = useProjectStore()

    return {projectStore}
  },
  computed: {
    ...mapState(useProjectStore, ['list', 'project'])
  }
}
</script>

<template>
  <h1 class="mb-4">Проекты</h1>

  <div class="grid grid-cols-3 gap-6">
    <div
        v-for="(item, projectIndex) in list" :key="projectIndex"
        class="card w-full bg-base-100"
        :class="{'shadow-md': project.id === item.id}"
    >
      <div class="card-body">
        <h2 class="card-title">{{item.name}}</h2>
        <p>{{item.text}}</p>
        <div class="card-actions justify-start mt-2">
          <router-link
              :to="{name: 'projects-view', params: { alias: item.id }}"
              class="btn btn-sm"
          >Подробнее</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
