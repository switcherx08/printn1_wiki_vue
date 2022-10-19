<script>
import LbCard from "../../components/base/card/Lb-Card.vue";

export default {
  name: 'DashboardView',
  components: {
    LbCard
  },
  data() {
    return {
      todoCard: {
        tabs: {0: {name: 'All', id: 1}, 1: {name: 'Mine', id: 2}}
      },
      team: {
        0: {name: 'Name 1', image: '/images/avatars/image/5.jpg'},
        1: {name: 'Name 2', image: '/images/avatars/image/36.jpg'},
        2: {name: 'Name 3', image: '/images/avatars/image/15.jpg'},
        3: {name: 'Name 4', image: '/images/avatars/image/18.jpg'},
        4: {name: 'Name 5', image: '/images/avatars/image/21.jpg'}
      },
    }
  },
  methods: {
    changeTodoTab(tabId) {
      console.log(tabId)
    }
  }
}
</script>

<template>
  <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-6">
    <div>
      <LbCard
          :use-background="false"
          :use-padding="false"
          class="dashboard-card welcome-card"
      >
        <div class="flex flex-col">
          <div class="welcome-card__title mb-2">Привет!</div>
          <p class="welcome-card__text mb-4">
            Рады видеть тебя. Очень скоро здесь появятся последние загруженные данные для Wiki
          </p>
        </div>
      </LbCard>
    </div>

    <div class="inline-flex col-span-2">
      <div class="flex flex-col justify-center items-center w-full">
        <div class="w-24 h-24">
          <img src="https://confluence-v1.prod.atl-paas.net/master/XsMLSfeCYY.svg">
        </div>
        <h2>Событий еще нет</h2>
        <div class="w-96">
          Идут работы по доработке компонентов приложения
        </div>
        <div class="mt-4">
          <router-link :to="{name: 'page-view', params: { id: '1' }}" class="btn btn-sm">
            Перейти к введению
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./dashboard_view.scss"></style>
