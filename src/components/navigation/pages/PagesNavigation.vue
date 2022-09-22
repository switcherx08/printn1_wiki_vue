<template>
    <div class="pages-nav">
      <PagesNavigationItem :item-data="mainPageItem" :level-data="1" />

      <PagesNavigationItem
          v-for="(page, pageIndex) in pages"
          :key="pageIndex"
          :item-data="page"
          :level-data="1"
      />
    </div>
</template>

<script>
import PagesNavigationItem from "./PagesNavigationItem.vue";
export default {
  name: "PagesNavigation",
  components: {PagesNavigationItem},
  data() {
    return {
      mainPageItem: {id: 1, name: 'Страницы', isMain: true},
      pages: [
        {
          id: 1,
          name: 'Введение',
          children: {
            0: {
              id: 11,
              name: 'Интерполяции',
              children: {
                0: {
                  id: 41,
                  name: 'Аргументы 1',
                  children: {
                    0: {
                      id: 41,
                      name: 'Аргументы 2'
                    },
                    1: {id: 42, name: 'Динамические аргументы'},
                    2: {id: 43, name: 'Модификаторы'}
                  }
                },
                1: {id: 42, name: 'Динамические аргументы'},
                2: {id: 43, name: 'Модификаторы'}
              }
            },
            1: {id: 12, name: 'Текст'},
            2: {id: 13, name: 'Сырой HTML'},
            3: {id: 14, name: 'Атрибуты'},
            4: {
              id: 15,
              name: 'Директивы',
              children: {
                0: {id: 41, name: 'Аргументы'},
                1: {id: 42, name: 'Динамические аргументы'},
                2: {id: 43, name: 'Модификаторы'}
              }
            }
          }
        },
        {id: 2, name: 'Экземпляр Vue'},
        {id: 3, name: 'Синтаксис шаблонов'},
      ]
    }
  }
}
</script>

<style lang="scss" src="./pages_navigation.scss"></style>
