<script>
import { mapState } from 'pinia'
import TextInput from '@/components/base/input/TextInput.vue'
import BaseSimpleButton from '@/components/base/button/BaseSimpleButton.vue'
import { useAuthStore } from '@/stores/auth'

export default {
  components: {BaseSimpleButton, TextInput},
  setup() {
    const authStore = useAuthStore()
    return {authStore}
  },
  data() {
    return {
      login: '',
      password: '',
      errors: {login: '', password: ''}
    }
  },
  computed: {
    ...mapState(useAuthStore, ['response'])
  },
  watch: {
    response: {
      handler(val) {
        this.sendResponseManager(val)
      },
      deep: true
    }
  },
  methods: {
    async send() {
      const data = {login: this.login, password: this.password};
      await this.authStore.signIn(data)
    },

    sendResponseManager(val) {
      if (val.errors && (val.errors.length !== 0)) {
        this.errorsManager(val['errors'])
      } else {
        this.successManager(val)
      }
    },

    errorsManager(errors) {
      for (let key in errors) {
        if (key === 'login') {
          this.errors.login = errors[key]
        }

        if (key === 'password') {
          this.errors.password = errors[key]
        }
      }
    },

    successManager(success) {
      this.$notify({
        title: success.title,
        duration:10000
      });

      setTimeout(()=>{
        this.$router.push({name: 'dashboard'})
      },500)
    }
  },
}
</script>

<template>
    <div class="flex justify-center items-center min-h-screen">
      <div class="card w-96 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Вход</h2>

          <form action="/api/sign-in" method="POST" @submit.prevent="send()">
            <TextInput
                v-model="login"
                field-label="E-mail"
                field-placeholder="Укажите e-mail"
                :field-errors="errors.login"
                class="mb-2"
            />
            <TextInput
                v-model="password"
                field-label="Пароль"
                field-placeholder="Укажите пароль"
                :field-errors="errors.password"
                class="mb-2"
            />
            <BaseSimpleButton is-primary class="mt-4">Войти</BaseSimpleButton>
          </form>
        </div>
      </div>
    </div>
</template>
