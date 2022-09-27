<script>
import TextInput from "@/components/base/input/TextareaInput.vue";

export default {
  name: 'PageCreate',
  components: {TextInput}
}
</script>

<template>
  <div>
    <form action="/" method="POST">
      <TextInput />
    </form>
  </div>
</template>
