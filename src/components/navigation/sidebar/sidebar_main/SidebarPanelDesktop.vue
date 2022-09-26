<script>
import { mapState } from 'pinia'
import { useModuleStore } from '@/stores/module';
import { useSidebarStore } from '@/stores/sidebar';
import { useProjectStore } from "@/stores/project"
import ProjectSelect from "@/components/projects/ProjectSelect.vue";
import PagesNavigation from "@/components/navigation/pages/PagesNavigation.vue";

export default {
  components: {PagesNavigation, ProjectSelect},
  setup() {
    const sidebarStore = useSidebarStore()
    return {sidebarStore}
  },
  computed: {
    ...mapState(useSidebarStore, {
      panelMenu: 'panelMenu',
      panelMenuIsShow: 'panelMenuIsShow',
      panelMenuIsView: 'panelMenuIsView'
    }),
    ...mapState(useModuleStore, {
      activeModule: 'activeModule'
    }),
    ...mapState(useProjectStore, {
      projectId: 'projectId'
    }),
  },
  watch: {
    projectId() {
      this.sidebarStore.fetchPanelMenu(this.projectId)
    }
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
