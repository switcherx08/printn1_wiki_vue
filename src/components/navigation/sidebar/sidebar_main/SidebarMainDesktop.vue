<script>
import SidebarMenuDesktop from "@/components/navigation/sidebar/sidebar_menu/SidebarMenuDesktop.vue";
import SidebarAccountDesktop from "@/components/navigation/sidebar/sidebar_account/SidebarAccountDesktop.vue";
import SidebarPanelDesktop from "@/components/navigation/sidebar/sidebar_main/SidebarPanelDesktop.vue";
// import UserProfileDropdown from "@/components/partials/dropdowns/UserProfileDropdown.vue";


export default {
  components: {
    SidebarMenuDesktop,
    SidebarPanelDesktop,
    SidebarAccountDesktop,
    // UserProfileDropdown
  },
}
</script>

<template>
  <div class="sidebar-main flex flex-col shrink-0">
    <div class="sidebar-account">
<!--      <UserProfileDropdown />-->
    </div>

    <div class="sidebar-inner flex flex-col h-full">
      <SidebarMenuDesktop  />
    </div>

    <SidebarAccountDesktop class="mt-auto mb-4" />
  </div>
  <SidebarPanelDesktop />
</template>

<style lang="scss" src="./sidebar_main_desktop.scss"></style>
