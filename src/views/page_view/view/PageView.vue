<script>
import PageSections from '@/components/sections/page_sections/PageSections.vue';
import BaseIconButton from "@/components/base/button/BaseIconButton.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconComment from "@/components/icons/IconComment.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
import IconFavorite from "@/components/icons/IconFavorite.vue";
import PageAuthors from "@/components/authors/page_authors/PageAuthors.vue";
import PageContent from "@/components/content/page_content/PageContent.vue";
import ModalDialog from "@/components/modal/ModalDialog.vue";

export default {
  name: 'PageView',
  components: {
    ModalDialog,
    PageContent,
    PageAuthors,
    IconFavorite,
    IconSettings,
    IconComment,
    IconEdit,
    PageSections,
    BaseIconButton
  },
  data() {
    return {
      modeArray: {
        view: 'view',
        edit: 'edit'
      },
      mode: 'view',
    }
  },
  methods: {
    editContent() {
      this.changeMode(this.modeArray['edit'])
    },

    changeMode(mode) {
      this.mode = this.modeArray[mode]
    },

    viewComments() {
      console.log('View page comments...')
    },

    toggleFavorite() {
      console.log('Toggle page favorite status...')
    },

    openSettings() {
      this.$refs.SettingsModalDialog.show()
    }
  }
}
</script>

<template>
  <template v-if="mode === 'edit'">
    <PageSections class="-mt-4">
      <template #widgets>
        <div class="flex ml-auto">
          Edit buttons...
        </div>
      </template>
      <template #header>
        Title page edit...
      </template>
      <template #body>
        Page edit component...
      </template>
    </PageSections>
  </template>

  <template v-else>
    <PageSections class="-mt-4">
      <template #widgets>
        <div class="flex ml-auto">
          <BaseIconButton size="middle" title="Редактировать" class="ml-2" @click="editContent()">
            <IconEdit width="21px" height="21px" />
          </BaseIconButton>
          <BaseIconButton size="middle" title="Показать комментарии" class="ml-2" @click="viewComments()">
            <IconComment width="25px" height="25px" />
          </BaseIconButton>
          <BaseIconButton size="middle" title="Отметить страницу" class="ml-2" @click="toggleFavorite()">
            <IconFavorite width="25px" height="25px" />
          </BaseIconButton>
          <BaseIconButton size="middle" title="Другие действия" class="ml-2" @click="openSettings()">
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
        <ModalDialog ref="SettingsModalDialog" size="middle">
          <template #header>
            <h3>Настройки страницы</h3>
          </template>
          <template #body>
            <div class="mt-4">
              Компонент настроек скранмцы...
            </div>
          </template>
        </ModalDialog>
      </template>
    </PageSections>
  </template>
</template>
