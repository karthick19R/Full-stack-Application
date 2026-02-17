<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
</script>

<template>
  <v-app>
    <!-- Global Navbar -->
   <AppNavbar v-if="!$route.meta.hideNavbar" />

    <!-- Main Content -->
<v-main style="min-height: calc(100vh - 64px);">
      <RouterView />
    </v-main>
  </v-app>
</template>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}
</style>
