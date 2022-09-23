<script>
import AvatarUser from "@/components/base/avatar/AvatarUser.vue";
export default {
  name: 'PageAuthors',
  components: {AvatarUser}
}
</script>

<template>
  <div class="page-authors flex items-align">
    <div class="page-authors__author flex justify-center mr-2">
      <AvatarUser class="w-12" />
    </div>
    <div class="page-authors__info flex flex-col justify-center">
      <div class="text-sm text-slate-500">Автор: Евгений</div>
      <div class="text-sm text-slate-500">Последнее обновление: февр. 21, 2022</div>
    </div>
  </div>
</template>

