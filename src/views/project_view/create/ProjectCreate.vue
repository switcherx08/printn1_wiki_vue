<script>
import TextInput from '@/components/base/input/TextInput.vue';
import TextareaInput from '@/components/base/input/TextareaInput.vue';
import BaseSimpleButton from "@/components/base/button/BaseSimpleButton.vue";

export default {
  name: 'ProjectCreate',
  components: {BaseSimpleButton, TextInput, TextareaInput},
  methods: {
    submitForm() {
      console.log('Submit form...')
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
            field-label="Название проекта"
            field-placeholder="Укажите название нового проекта"
            class="mb-4"
        />
        <TextareaInput
            field-label="Название проекта"
            field-placeholder="Укажите название нового проекта"
            class="mb-4"
        />

        <BaseSimpleButton is-primary class="mt-4">Создать</BaseSimpleButton>
      </form>
    </div>
  </div>
</template>

