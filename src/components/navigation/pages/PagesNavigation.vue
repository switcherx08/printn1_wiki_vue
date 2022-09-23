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
          alias: 'page-1',
          children: {
            0: {
              id: 11,
              name: 'Интерполяции',
              alias: 'page-2',
              children: {
                0: {
                  id: 41,
                  name: 'Аргументы 1',
                  alias: 'page-3',
                  children: {
                    0: {
                      id: 41,
                      name: 'Аргументы 2',
                      alias: 'page-4',
                    },
                    1: {id: 42, name: 'Динамические аргументы', alias: 'page-5',},
                    2: {id: 43, name: 'Модификаторы', alias: 'page-6',}
                  }
                },
                1: {id: 42, name: 'Динамические аргументы', alias: 'page-7',},
                2: {id: 43, name: 'Модификаторы', alias: 'page-8',}
              }
            },
            1: {id: 12, name: 'Текст', alias: 'page-9',},
            2: {id: 13, name: 'Сырой HTML', alias: 'page-10',},
            3: {id: 14, name: 'Атрибуты', alias: 'page-11',},
            4: {
              id: 15,
              name: 'Директивы',
              alias: 'page-12',
              children: {
                0: {id: 41, name: 'Аргументы', alias: 'page-13',},
                1: {id: 42, name: 'Динамические аргументы', alias: 'page-14',},
                2: {id: 43, name: 'Модификаторы', alias: 'page-15',}
              }
            }
          }
        },
        {id: 2, name: 'Экземпляр Vue', alias: 'page-16',},
        {id: 3, name: 'Синтаксис шаблонов', alias: 'page-17',},
      ]
    }
  }
}
</script>

<style lang="scss" src="./pages_navigation.scss"></style>
