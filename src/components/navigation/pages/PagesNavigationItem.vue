<script>
import IconPlus from "@/components/icons/IconPlus.vue";
import IconArrowBottom from "@/components/icons/IconArrowBottom.vue";
import IconPage from "@/components/icons/IconPage.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
import ModalDialog from '@/components/modal/ModalDialog.vue';
import PagesNavigationEdit from "@/components/navigation/pages/PagesNavigationEdit.vue";

export default {
  name: 'PagesNavigationItem',
  components: {
    IconSettings, IconPage, IconArrowBottom, IconPlus,
    PagesNavigationEdit, ModalDialog,
  },
  props: {
    itemData: {
      type: [Object, Array],
      required: true
    },
    levelData: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    levelMenu() {
      return this.levelData + 1
    }
  },
  methods: {
    toggleChild() {
      this.isOpen = !this.isOpen;
    },

    pushPage(page) {
      if(page.children && Object.keys(page.children).length !== 0) {
        this.isOpen = true
      }
    },

    addPage(page) {
      if(page.isMain) {
        this.$router.push({name: 'page-create'})
      } else {
        this.$router.push({name: 'page-create', query: {parentId: page.id}})
      }
    },

    openEditMenu() {
      this.$refs.Modal.show()
    }
  }
}
</script>

<template>
  <div class="pages-nav-item flex flex-col" :class="{'is_main': itemData.isMain}">
    <div class="pages-nav-item__box flex">
      <template v-if="itemData.isMain">
        <div class="pages-nav-item__icon mr-3" :class="{'is_main': itemData.isMain}">
          <IconPage />
        </div>
      </template>
      <template v-else>
        <div
            v-if="itemData.children"
            class="pages-nav-item__icon mr-3"
            :class="{'is_open': isOpen}"
            @click="toggleChild()"
        >
          <IconArrowBottom />
        </div>
        <router-link
            v-else
            :to="{name: 'page-view', params: { id: itemData.id }}"
            exact
            active-class="is_active"
            class="pages-nav-item__dot mr-3"
            @click="pushPage(itemData)"
        ></router-link>
      </template>
      <template v-if="itemData.isMain">
        <div class="pages-nav-item__name w-full mr-3 ">
          <b>{{itemData.name}}</b>
        </div>
      </template>
      <template v-else>
        <router-link
            :to="{name: 'page-view', params: { id: itemData.id }}"
            exact
            active-class="is_active"
            class="pages-nav-item__name w-full mr-3 text-ellipsis"
            @click="pushPage(itemData)"
        >
          <span class="text-ellipsis">{{itemData.name}}</span>
        </router-link>
      </template>
      <div class="pages-nav-item__buttons">
        <template v-if="itemData.isMain">
          <button type="button" class="pages-nav-item__button" @click="openEditMenu()">
            <IconSettings width="16px" height="16px" />
          </button>
        </template>
        <button type="button" class="pages-nav-item__button" @click="addPage(itemData)">
          <IconPlus />
        </button>
      </div>
    </div>

    <div
        v-if="itemData.children"
        class="pages-nav-item__child"
        :class="{'is_open': isOpen}"
    >
        <PagesNavigationItem
            v-for="(child, childIndex) in itemData.children"
            :key="childIndex"
            :item-data="child"
            :level-data="levelMenu"
        />
    </div>
  </div>

  <template v-if="itemData.isMain">
    <teleport to="#modals">
      <modal-dialog ref="Modal" size="large">
        <template #header>
          <h3 class="mb-4">Редактор меню</h3>
        </template>

        <template #body>
          <PagesNavigationEdit />
        </template>
      </modal-dialog>
    </teleport>
  </template>
</template>

<style lang="scss" src="./page_navigation_item.scss"></style>
