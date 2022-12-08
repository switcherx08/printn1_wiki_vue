<script>
import {ref} from "vue";
import {mapState} from "pinia";
import {useProjectStore} from '@/stores/project'
import {useWikiDataStore} from '@/stores/wikiData'
import {useSidebarStore} from '@/stores/sidebar'
import ModalDialog from "../../modal/ModalDialog.vue";
import TextInput from "@/components/base/input/TextInput.vue";
import BaseSimpleButton from "@/components/base/button/BaseSimpleButton.vue";

export default {
  name: 'PageCreateWindow',

  components: {BaseSimpleButton, TextInput, ModalDialog},

  setup() {
    const projectStore = useProjectStore()
    const wikiDataStore = useWikiDataStore()
    const sidebarStore = useSidebarStore()

    const name = ref('Новая страница')

    return {
      projectStore, wikiDataStore, sidebarStore, name
    }
  },

  computed: {
    ...mapState(useWikiDataStore, {
      parentId: 'create_id',
      response: 'response',
      create_id: 'create_id',
      openCreteWindow: 'openCreteWindow'
    }),
  },

  watch: {
    openCreteWindow() {
      if(this.openCreteWindow) {
        this.$refs.ModalDialog.show()
      }
    },

    response: {
      handler(val) {
        if(this.openCreteWindow && Object.keys(this.response).length !== 0) {
          this.sendResponseManager(val)
        }
      },
      deep: true
    }
  },

  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      errors: {name: ''}
    }
  },

  methods: {
    sendForm() {
      const data = {
        parent_id: this.parentId,
        project_id: this.projectStore.projectId,
        name: this.name,
        is_draft: true
      }

      this.wikiDataStore.sendCreateOrEdit(data, 'POST')
    },

    sendResponseManager(data) {
      if (data.errors) {
        this.setErrors(data.errors)
      } else {
        if(data && data.data && data.data.id) {
          this.sidebarStore.fetchPanelMenu(this.projectStore.projectId)
          this.$refs.ModalDialog.hide()
          this.setSuccess(data)
          this.$router.push({name: 'page-edit', params: { id: data.data.id }})
        }
      }
    },

    setErrors(errors) {
      this.errors = errors
    },

    setSuccess(data) {
      this.$notify({
        title: data.title,
        duration:10000
      });

      console.log(data)
    },

    closeWindow() {
      this.wikiDataStore.setOpenCreteWindow(false)
      this.wikiDataStore.setCreateId('')
    }
  }
}
</script>

<template>
  <teleport to="#modals">
    <ModalDialog ref="ModalDialog" size="small" @close="closeWindow()">
      <template #header>
        <h3 class="mb-4">Новая страница</h3>
      </template>

      <template #body>
        <form @submit.prevent="sendForm()" action="/api/wiki" method="POST" class="flex flex-col w-full h-full">
          <TextInput
              v-model="name"
              :model-value="name"
              field-placeholder="Укажите название страницы"
              :field-errors="errors.name"
              class="mb-2"
          />

          <div class="flex justify-center mt-4">
            <BaseSimpleButton is-primary size="default">Создать</BaseSimpleButton>
          </div>
        </form>
      </template>
    </ModalDialog>
  </teleport>
</template>

