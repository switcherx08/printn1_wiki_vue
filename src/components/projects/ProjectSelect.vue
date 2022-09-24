<script>
import {useProjectStore} from "@/stores/project";

export default {
  name: 'ProjectSelect',
  props: {
    itemSelect: {
      type: Object,
      required: true
    },
  },
  emits: ['select'],
  setup() {
    const projectStore = useProjectStore()
    return {projectStore}
  },
  data() {
    return {
      projects: [
        {id: 1, name: 'Проект Wiki'},
        {id: 2, name: 'Проект CRM система для проведения вебинаров'},
      ],
      select: Object.keys(this.itemSelect).length !== 0 ? this.itemSelect : this.itemData[0]
    }
  },
  watch: {
    select: {
      handler(){
        console.log('Change project...')
        this.projectStore.fetchProject(this.select.id)
      },
      deep: true
    }
  },
  methods: {
    selectOption(project) {
      this.select = project
      this.$emit('select', project)
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
      <span class="text-ellipsis">{{ select ? select.name : 'Еще нет проектов' }}</span>
    </label>
    <div tabindex="0" class="project-select__menu dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      <div v-for="(project, projectIndex) in projects" :key="projectIndex" class="project-select__option">
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
