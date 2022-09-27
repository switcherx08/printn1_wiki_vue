<script>
export default {
  name: 'PageAuthors',
  props: {
    itemData: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <div class="page-authors flex items-align">
    <div class="page-authors__info flex flex-col justify-center">
      <div class="text-sm text-slate-500">Автор: {{itemData.name}}</div>
      <div class="text-sm text-slate-500">Последнее обновление: {{itemData.updated_at}}</div>
    </div>
  </div>
</template>

