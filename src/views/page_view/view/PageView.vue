<script>
import PageSections from '@/components/sections/page_sections/PageSections.vue';
import BaseIconButton from "@/components/base/button/BaseIconButton.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconComment from "@/components/icons/IconComment.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
import IconFavorite from "@/components/icons/IconFavorite.vue";
import PageAuthors from "@/components/authors/page_authors/PageAuthors.vue";
import PageContent from "@/components/content/page_content/PageContent.vue";

export default {
  name: "PageView",
  components: {
    PageContent,
    PageAuthors,
    IconFavorite,
    IconSettings,
    IconComment,
    IconEdit,
    PageSections,
    BaseIconButton
  }
}
</script>

<template>
  <PageSections class="-mt-4">
    <template #widgets>
      <div class="flex ml-auto">
        <BaseIconButton size="middle" title="Редактировать" class="ml-2">
          <IconEdit width="21px" height="21px" />
        </BaseIconButton>
        <BaseIconButton size="middle" title="Показать комментарии" class="ml-2">
          <IconComment width="25px" height="25px" />
        </BaseIconButton>
        <BaseIconButton size="middle" title="Отметить страницу" class="ml-2">
          <IconFavorite width="25px" height="25px" />
        </BaseIconButton>
        <BaseIconButton size="middle" title="Другие действия" class="ml-2">
          <IconSettings width="20px" height="20px" />
        </BaseIconButton>
      </div>
    </template>
    <template #header>
      <div class="h1 w-full mb-2">Регламенты</div>
      <PageAuthors />
    </template>
    <template #body>
      <PageContent />
    </template>
  </PageSections>
</template>
