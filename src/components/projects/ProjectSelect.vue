<script>
import { mapState } from 'pinia'
import {useProjectStore} from "@/stores/project"
import {useLoaderStore} from "@/stores/loader";

export default {
  name: 'ProjectSelect',
  emits: ['select'],
  setup() {
    // Projects
    const projectStore = useProjectStore()
    projectStore.fetchList()
    const loaderStore = useLoaderStore()

    // Return
    return {projectStore, loaderStore}
  },
  computed: {
    ...mapState(useProjectStore, ['list']),
    ...mapState(useProjectStore, ['project']),
  },
  methods: {
    selectOption(project) {
      this.loaderStore.startAppProgress(true)
      this.$router.push({name: 'dashboard'})
      this.projectStore.setProject(project)
      this.$emit('select', project)

      setTimeout(() => {
        this.loaderStore.startAppProgress(false)
      }, 2000)
    },

    allProjects() {
      return this.$router.push({name: 'projects-list'})
    },

    addProject() {
      return this.$router.push({name: 'projects-create'})
    }
  }
}
</script>

<template>
  <div class="project-select dropdown">
    <label tabindex="0" class="project-select__selected text-ellipsis">
      <span class="text-ellipsis">{{ project ? project.name : 'Еще нет проектов' }}</span>
    </label>
    <div tabindex="0" class="project-select__menu dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      <div v-for="(project, projectIndex) in list" :key="projectIndex" class="project-select__option">
        <button class="text-ellipsis" @click="selectOption(project)">
          <span class="text-ellipsis">{{ project.name }}</span>
        </button>
      </div>

      <div class="divider">или</div>

      <div class="project-select__option">
        <button class="text-ellipsis" @click="allProjects()">
          <span class="text-ellipsis">Показать все проекты</span>
        </button>
      </div>
      <div class="project-select__option">
        <button class="text-ellipsis" @click="addProject()">
          <span class="text-ellipsis">Добавить проект</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./project_select.scss"></style>
