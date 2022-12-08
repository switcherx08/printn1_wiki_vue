<script setup lang="ts">
import IconSettings from "@/components/icons/IconSettings.vue";
</script>

<template>
  <ul class="sidebar-icon-menu mt-auto">
    <li><router-link :to="{ name: 'users-list' }"><IconSettings /></router-link></li>
  </ul>
</template>
