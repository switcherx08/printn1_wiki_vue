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
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <form
          @submit.prevent="submitForm()"
          action="/api/page/create"
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

