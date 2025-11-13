<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from './components/AppLayout.vue'

const route = useRoute()

// Rutas que no deben mostrar el layout (menú lateral)
const isPublicRoute = computed(() => {
  return route.path === '/login'
})
</script>

<template>
  <div>
    <!-- Mostrar AppLayout solo si NO es una ruta pública -->
    <AppLayout v-if="!isPublicRoute" />
    
    <!-- Mostrar solo el RouterView para rutas públicas (como login) -->
    <router-view v-else />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
