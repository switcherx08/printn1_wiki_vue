<script>
export default {
  name: 'ProjectList',
  data() {
    return {
      projects: [
        {id: 1, name: 'Проект Wiki', text: 'Проект по разработке сервиса внутренней документации'},
        {id: 2, name: 'Проект Wiki', text: 'Проект по разработке сервиса внутренней документации'},
        {id: 3, name: 'Проект Wiki', text: 'Проект по разработке сервиса внутренней документации'},
        {id: 4, name: 'Проект Wiki', text: 'Проект по разработке сервиса внутренней документации'}
      ]
    }
  }
}
</script>

<template>
  <div class="grid grid-cols-3 gap-6">
    <div v-for="(project, projectIndex) in projects" :key="projectIndex" class="card w-full bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{{project.name}}</h2>
        <p>{{project.text}}</p>
        <div class="card-actions justify-end">
          <router-link
              :to="{name: 'projects-view', params: { alias: project.id }}"
              class="btn"
          >Подробнее</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
