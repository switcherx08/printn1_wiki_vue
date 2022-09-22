<script>
import { mapState, mapActions } from 'pinia'
import { useSidebarStore } from '@/stores/sidebar';
import { useModuleStore } from '@/stores/module';
import ProjectSelect from "@/components/projects/ProjectSelect.vue";
import PagesNavigation from "@/components/navigation/pages/PagesNavigation.vue";

export default {
  components: {PagesNavigation, ProjectSelect},
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
      'fetchPanelMenu'
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
              <ProjectSelect />
            </div>
          </div>
          <div class="sidebar-panel__wrapper">
            <PagesNavigation />
          </div>
        </div>
      </div>
    </template>
  </transition>
</template>

<style lang="scss" src="./sidebar_panel_desktop.scss"></style>
