<script>
import { mapState, mapActions } from 'pinia'
import { useSidebarStore } from '@/stores/sidebar';
import { useModuleStore } from '@/stores/module';
import ProjectSelect from "@/components/projects/ProjectSelect.vue";

export default {
  components: {ProjectSelect},
  computed: {
    ...mapState(useSidebarStore, {
      panelMenu: 'panelMenu',
      panelMenuIsShow: 'panelMenuIsShow',
      panelMenuIsView: 'panelMenuIsView'
    }),
    ...mapState(useModuleStore, {
      activeModule: 'activeModule'
    }),
  },
  async created() {
    await this.fetchPanelMenu()
  },
  methods: {
    ...mapActions(useSidebarStore, [
      'fetchPanelMenu',
      'getActiveIconMenuName'
    ])
  }
}
</script>

<template>
  <transition name="slide-x">
    <template v-if="panelMenuIsShow">
      <div class="sidebar-panel" :class="{'left_0': !panelMenuIsView}">
        <div class="sidebar-panel__body">
          <div class="sidebar-panel__header mb-4">
            <div class="sidebar-panel__title h3 subtitle w-full">
<!--              {{ getActiveIconMenuName() }}-->
              <ProjectSelect />
            </div>
          </div>

          <div class="mt-6 mx-5">
            <b class="">Страницы</b>
          </div>
          <ul class="sidebar-panel__wrapper">
            <li v-for="(item, itemIndex) in panelMenu[activeModule]" :key="itemIndex">
              <router-link
                  :to="item.route"
                  :disabled="item.disabled"
                  :class="{'is_active': item.route && item.route.name === $route.name || $route.meta.parent === item.route.name}"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </transition>
</template>

<style lang="scss" src="./sidebar_panel_desktop.scss"></style>
