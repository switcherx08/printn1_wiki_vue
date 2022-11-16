<script>
import ModalDialog from '@/components/modal/ModalDialog.vue';

export default {
  name: 'DialogFileManager',

  components: {
    ModalDialog
  },

  methods: {
    show() {
      this.$refs.FileManager.show()
    }
  }
}
</script>

<template>
  <teleport to="#modals">
    <ModalDialog
        ref="FileManager"
        size="large"
        @close="sidebarStore.setPanelMenuIsEdit(false)"
    >
      <template #header>
        <h3 class="h4 mb-4">Файловый менеджер</h3>
      </template>

      <template #body>
        <div class="file-manager">
          <vue-finder
              id='my_vuefinder'
              locale="ru"
              :dark="false"
              url="http://vuefinder-php.test"
          ></vue-finder>
        </div>
      </template>
    </ModalDialog>
  </teleport>
</template>

<style lang="scss" src="./file_manager.scss"></style>
