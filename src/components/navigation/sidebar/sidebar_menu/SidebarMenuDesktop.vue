<script>
import { mapState, mapActions } from 'pinia'
import { useSidebarStore } from '@/stores/sidebar';
import { useModuleStore } from '@/stores/module';
import IconDashboardPulse from '@/components/icons/IconDashboardPulse.vue';
import IconViewLayouts from "@/components/icons/IconViewLayouts.vue";
import IconViewElements from "@/components/icons/IconViewElements.vue";
import IconViewComponents from "@/components/icons/IconViewComponents.vue";
import IconLayoutSwitcher from "@/components/icons/IconLayoutSwitcher.vue";

export default {
  components: {
    IconDashboardPulse,
    IconViewLayouts,
    IconViewElements,
    IconViewComponents,
    IconLayoutSwitcher
  },
  data() {
    return {
      activeModuleSaved: ''
    }
  },
  computed: {
    ...mapState(useSidebarStore, {
      iconMenu: 'iconMenu',
      isEmptyIconMenu: 'isEmptyIconMenu',
      panelMenuIsShow: 'panelMenuIsShow'
    }),
    ...mapState(useModuleStore, {
      activeModule: 'activeModule'
    }),
  },
  async created() {
    await this.fetchIconMenu()
    this.activeModuleSaved = this.activeModule
  },
  mounted() {
    this.changeActiveModule({module : this.$route.meta.module})
  },
  methods: {
    ...mapActions(useSidebarStore, [
      'fetchIconMenu',
      'changePanelMenuIsShow',
      'showPanelMenuIsShow',
      'showPanelMenuIsView'
    ]),
    ...mapActions(useModuleStore, [
      'changeActiveModule'
    ]),
    changeModule(module) {
      if(this.activeModuleSaved !== module) {
        this.activeModuleSaved = module
        this.changePanelMenuIsShow()
        setTimeout(() => {
          this.changeActiveModule({module : module})
        }, 120)
      }
    },
    changeModuleManager(module) {
      if(!this.panelMenuIsShow) {
        this.changeModule(module)
        this.showPanelMenuIsShow()
        return
      }

      this.changeModule(module)
    }
  }
}
</script>

<template>
  <div class="sidebar-menu">
    <!-- Navbar -->
    <transition name="fade-fast">
      <div v-if="!isEmptyIconMenu">
        <ul class="sidebar-icon-menu">
          <li v-for="(item, itemIndex) in iconMenu" :key="itemIndex">
            <a
                :title="item.name"
                :class="{'is-active': item.module && item.module === activeModule}"
                @click="changeModuleManager(item.module)"
            >
              <component :is="item.icon_component" />
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" src="./sidebar_menu_desktop.scss"></style>
