<script>
import TextInput from "@/components/base/input/TextInput.vue";

export default {
  name: 'PageCreate',
  components: {TextInput}
}
</script>

<template>
  <div class="flex">
    <form action="/" method="POST" class="flex flex-col w-full h-full">
      <TextInput
          model-value=""
          field-label="Название проекта"
          field-placeholder="Укажите название проекта"
          class="mb-6"
      />

      <div class="w-full mb-2">
        <b>Описание</b>
      </div>

      <div class="w-full">
        <textarea class="w-full h-full"></textarea>
      </div>
    </form>
  </div>
</template>
