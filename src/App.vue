<script setup>
import { useLoaderStore } from '@/stores/loader'
import VNotify from "@/components/notification/V-Notify.vue";
import VProgressLoader from "@/components/loader/V-ProgressLoader.vue";

const loaderStore = useLoaderStore()
</script>

<template>
  <!-- Page layout -->
  <div class="app-content" :class="{'blur-sm pointer-events-none': loaderStore.getAppProgress}">
    <component :is="$route.meta.layout">
      <router-view />
    </component>
  </div>

  <!-- Notification component -->
  <VNotify />
  <!-- Loader -->
  <transition name="slide-y">
    <VProgressLoader
        v-if="loaderStore.getAppProgress"
        :progress-text="loaderStore.getAppProgressText"
        class="flex justify-center items-center fixed inset-0 z-50"
    />
  </transition>
</template>
