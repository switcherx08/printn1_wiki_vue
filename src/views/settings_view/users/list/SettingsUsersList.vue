<script>
import {ref} from "vue";
import {useAuthStore} from "@/stores/auth";
import PageSections from "../../../../components/sections/page_sections/PageSections.vue";
import BaseSimpleButton from "../../../../components/base/button/BaseSimpleButton.vue";

export default {
  name: 'SettingsUsersList',

  components: {PageSections, BaseSimpleButton},

  setup() {
    const authStore = useAuthStore()
    const list = ref({})

    return {
      authStore,
      list
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
    }
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
                <BaseSimpleButton>Удалить</BaseSimpleButton>
              </template>
            </div>
          </div>
        </div>

      </div>
    </template>
  </PageSections>
</template>
