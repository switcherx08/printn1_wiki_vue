<script>
import TextInput from '@/components/base/input/TextInput.vue';
import TextareaInput from '@/components/base/input/TextareaInput.vue';
import BaseSimpleButton from "@/components/base/button/BaseSimpleButton.vue";
import {useAuthStore} from "@/stores/auth";
import {useProjectStore} from "@/stores/project";

export default {
  name: 'ProjectCreate',
  components: {BaseSimpleButton, TextInput, TextareaInput},
  setup() {
    const authStore = useAuthStore()
    const projectStore = useProjectStore()

    return {authStore, projectStore}
  },
  data() {
    return {
      name: '',
      text: '',
      errors: {name: '', text: ''}
    }
  },
  methods: {
    async submitForm() {
      await fetch("/api/project/create", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': this.authStore.getToken()
        },
        body: JSON.stringify({
          name: this.name,
          text: this.text
        })
      })
          .then(async response => {
            if (response.status === 201 || response.status === 200) {
              // const data = await response.json()
              await this.projectStore.fetchList()
              this.$router.push({name: 'projects-list'})
            } else {
              const data = await response.json()
              if(data.errors) {
                this.errorsManager(data.errors)
              }
            }
          })
    },

    errorsManager(errors) {
      this.errors = errors
    }
  }
}
</script>

<template>
  <h1 class="mb-4">Новый проект</h1>

  <div class="card w-full bg-base-100">
    <div class="card-body">
      <form
          @submit.prevent="submitForm()"
          action="/api/project/create"
          method="POST"
      >
        <TextInput
            v-model="name"
            field-label="Название проекта"
            field-placeholder="Укажите название нового проекта"
            :field-errors="errors.name"
            class="mb-2"
        />
        <TextareaInput
            v-model="text"
            field-label="Описание проекта"
            field-placeholder="Укажите описание проекта"
            :field-errors="errors.text"
            class="mb-2"
        />

        <BaseSimpleButton is-primary class="mt-4">Создать</BaseSimpleButton>
      </form>
    </div>
  </div>
</template>

