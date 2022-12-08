<script>
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth";
import PageSections from "../../../../components/sections/page_sections/PageSections.vue";
import BaseSimpleButton from "../../../../components/base/button/BaseSimpleButton.vue";
import ModalDialog from "../../../../components/modal/ModalDialog.vue";
import TextInput from "../../../../components/base/input/TextInput.vue";

export default {
  name: 'SettingsUsersList',

  components: {TextInput, ModalDialog, PageSections, BaseSimpleButton},

  setup() {
    const authStore = useAuthStore()
    const list = ref({})

    return {
      authStore,
      list
    }
  },

  data() {
    return {
      name: '',
      email: '',
      password: '',
      errors: {
        name: '',
        email: '',
        password: ''
      },
      remove_user: {}
    }
  },

  created() {
    this.fetchList()
  },

  methods: {
    async fetchList() {
      await fetch("/api/users/list", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': this.authStore.getToken()
        }
      })
          .then(async response => {
            const data = await response.json()
            this.setList(data)
          })
    },

    setList(data) {
      this.list = data
    },

    addUser() {
      this.$refs.ModalDialog.show()
    },

    async sendForm() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': this.authStore.token
        },
        body: JSON.stringify(data)
      })
          .then(async response => {
            const res = response.json()

            if(res) {
              await this.fetchList()
              this.$refs.ModalDialog.hide()
              this.$notify({
                title: 'Пользователь добавлен',
                duration:10000
              });
            }
          })
    },

    remove(user) {
      this.remove_user = user
      this.$refs.RemoveModalDialog.show()
    },

    async sendRemove() {
      const id = this.remove_user.id

      await fetch(`/api/user/${id}`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': this.authStore.token
        }
      })
          .then(async response => {
            const res = response.json()

            if(res) {
              await this.fetchList()
              this.$refs.RemoveModalDialog.hide()
              this.$notify({
                title: 'Пользователь удален',
                duration:10000
              });
            }
          })
    },

  }
}
</script>

<template>
  <PageSections>
    <template #widgets>
      <BaseSimpleButton
          is-primary
          is-outline
          size="middle"
          class="mr-2"
          @click="addUser()"
      >
        Добавить пользователя
      </BaseSimpleButton>
    </template>
    <template #header>
      <h1 class="mb-4">Пользователи</h1>
    </template>
    <template #body>
      <div class="flex flex-col">
        <div v-for="(user, userIndex) in list" :key="userIndex" class="card w-full p-4 mb-6 bg-base-100 shadow-md">
          <div class="flex">
            <div class="flex flex-col user-info w-full mr-4">
              <span>{{user.name}}</span>
              <span class="text-gray-400">{{user.email}}</span>
            </div>
            <div class="user-action my-auto">
              <template v-if="user.id !== 1">
                <BaseSimpleButton @click="remove(user)">Удалить</BaseSimpleButton>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
  </PageSections>

  <teleport to="#modals">
    <ModalDialog ref="ModalDialog" size="small">
      <template #header>
        <h3 class="mb-4">Добавить пользователя</h3>
      </template>

      <template #body>
        <form class="flex flex-col w-full h-full" @submit.prevent="sendForm()">
          <TextInput
              v-model="name"
              :model-value="name"
              field-placeholder="Укажите имя"
              :field-errors="errors.name"
              class="mb-2"
          />

          <TextInput
              v-model="email"
              :model-value="email"
              field-placeholder="Укажите e-mail"
              :field-errors="errors.email"
              class="mb-2"
          />

          <TextInput
              v-model="password"
              :model-value="password"
              field-placeholder="Укажите пароль"
              :field-errors="errors.password"
              class="mb-2"
          />

          <div class="flex justify-center mt-4">
            <BaseSimpleButton is-primary size="default">Добавить</BaseSimpleButton>
          </div>
        </form>
      </template>
    </ModalDialog>

    <ModalDialog ref="RemoveModalDialog" size="small">
      <template #header>
        <h3 class="mb-4">Удалить пользователя</h3>
      </template>

      <template #body>
        <p>Вы действительно хотите удалить пользователя {{remove_user.email}}? Пользователь будет перенесен в архив.</p>
        <div class="flex justify-center mt-4">
          <BaseSimpleButton is-primary size="default" @click="sendRemove()">Удалить</BaseSimpleButton>
        </div>
      </template>
    </ModalDialog>
  </teleport>
</template>
