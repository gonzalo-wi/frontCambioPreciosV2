<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="flex">
      <!-- Sidebar principal -->
      <div 
        :class="[
          'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white transition-all duration-300 ease-in-out flex flex-col shadow-2xl relative z-20 border-r border-blue-600/30',
          sidebarAbierto ? 'w-64' : 'w-16'
        ]"
      >
        <!-- Overlay decorativo superior -->
        <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-400/15 via-blue-500/8 to-transparent pointer-events-none"></div>
        
        <!-- Borde decorativo derecho -->
        <div class="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-300/40 via-blue-400/60 to-blue-300/20"></div>
        
        <!-- Header del sidebar -->
        <div class="flex items-center justify-between p-4 border-b border-blue-600/30 relative z-10 h-24">
          <div v-show="sidebarAbierto" class="flex items-center space-x-3">
            <div class="flex items-center justify-center">
              <img 
                src="../assets/LogoPrice.png" 
                alt="LogoPrice" 
                class="h-16 w-auto"
              />
            </div>
          </div>
          
          <!-- Logo mini para sidebar colapsado -->
          <div v-show="!sidebarAbierto" class="mx-auto">
            <div class="flex items-center justify-center">
              <img 
                src="../assets/LogoPrice.png" 
                alt="LogoPrice" 
                class="h-10 w-auto"
              />
            </div>
          </div>
          
          <!-- Botón para contraer/expandir -->
          <button 
            @click="toggleSidebar"
            class="p-2 rounded-lg hover:bg-blue-600/40 transition-colors duration-200 group"
            :class="{ 'ml-auto': !sidebarAbierto }"
          >
            <svg 
              :class="['w-5 h-5 transition-transform duration-300', sidebarAbierto ? 'rotate-180' : '']" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <!-- Navegación -->
        <nav class="flex-1 px-2 py-6 space-y-2">
          <!-- Dashboard/Inicio -->
          <router-link
            to="/"
            class="nav-item group"
            :class="{ 'active': $route.path === '/' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
            </div>
            <span v-show="sidebarAbierto" class="nav-text">Dashboard</span>
          </router-link>

          <!-- Listas de Precios -->
          <router-link
            to="/listas-precios"
            class="nav-item group"
            :class="{ 'active': $route.path === '/listas-precios' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <span v-show="sidebarAbierto" class="nav-text">Listas de Precios</span>
          </router-link>

          <!-- Clientes con Descuentos -->
          <router-link
            to="/clientes-descuentos"
            class="nav-item group"
            :class="{ 'active': $route.path === '/clientes-descuentos' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <span v-show="sidebarAbierto" class="nav-text">Clientes con Descuentos</span>
          </router-link>

          <!-- Cambiar Precios -->
          <router-link
            to="/cambiar-precios"
            class="nav-item group"
            :class="{ 'active': $route.path === '/cambiar-precios' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
              </svg>
            </div>
            <span v-show="sidebarAbierto" class="nav-text">Cambiar Precios</span>
          </router-link>

          <!-- Productos -->
          <router-link
            to="/productos"
            class="nav-item group"
            :class="{ 'active': $route.path === '/productos' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <span v-show="sidebarAbierto" class="nav-text">Productos</span>
          </router-link>

          <!-- Categorías -->
          <router-link
            to="/categorias"
            class="nav-item group"
            :class="{ 'active': $route.path === '/categorias' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <span v-show="sidebarAbierto" class="nav-text">Categorías</span>
          </router-link>

          <!-- Reportes -->
          <router-link
            to="/reportes"
            class="nav-item group"
            :class="{ 'active': $route.path === '/reportes' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <span v-show="sidebarAbierto" class="nav-text">Reportes</span>
          </router-link>

          <!-- Separador -->
          <div class="border-t border-blue-600/30 my-4"></div>

          <!-- Configuración -->
          <router-link
            to="/configuracion"
            class="nav-item group"
            :class="{ 'active': $route.path === '/configuracion' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <span v-show="sidebarAbierto" class="nav-text">Configuración</span>
          </router-link>
        </nav>

        <!-- Usuario/Footer del sidebar -->
        <div class="p-4 border-t border-blue-600/30 relative z-10">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div v-show="sidebarAbierto" class="min-w-0 flex-1">
              <p class="text-sm font-medium text-white truncate">Usuario Admin</p>
              <p class="text-xs text-gray-400 truncate">Administrador</p>
            </div>
            <!-- Indicador de estado online -->
            <div v-show="sidebarAbierto" class="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
          </div>
          
          <!-- Decoración inferior elegante con degradado suave -->
          <div class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-blue-500/20 via-blue-600/10 to-transparent"></div>
          <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header superior -->
      <header class="bg-white shadow-sm border-b border-gray-200 z-10">
        <div class="flex items-center justify-between px-6 py-4">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-full overflow-hidden logo-container">
                <img 
                  src="../assets/images.jpeg" 
                  alt="Logo" 
                  class="w-full h-full object-cover"
                />
              </div>
              <h2 class="text-xl font-semibold text-gray-800">
                {{ getTituloPagina() }}
              </h2>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- Notificaciones -->
            <button class="p-2 rounded-lg hover:bg-gray-100 relative transition-colors duration-200">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
              </svg>
              <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <!-- Usuario -->
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full"></div>
              <span class="text-sm font-medium text-gray-700">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Contenido de la página -->
      <main class="flex-1 overflow-auto bg-gray-50">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const sidebarAbierto = ref(true);

const toggleSidebar = () => {
  sidebarAbierto.value = !sidebarAbierto.value;
};

const getTituloPagina = () => {
  const titulos = {
    '/': 'Dashboard',
    '/listas-precios': 'Listas de Precios',
    '/clientes-descuentos': 'Clientes con Descuentos',
    '/productos': 'Productos',
    '/categorias': 'Categorías',
    '/reportes': 'Reportes',
    '/configuracion': 'Configuración'
  };
  return titulos[route.path] || 'Sistema de Precios';
};
</script>

<style scoped>
/* Logo circular */
.logo-container {
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.logo-container:hover {
  transform: scale(1.05);
  border-color: rgba(255, 255, 255, 0.5);
}

.sidebar-logo {
  border: 2px solid rgba(59, 130, 246, 0.4);
}

.sidebar-logo:hover {
  border-color: rgba(59, 130, 246, 0.6);
}

/* Navegación */
.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  text-decoration: none;
  color: rgba(219, 234, 254, 0.8);
  position: relative;
  overflow: hidden;
}

.nav-item:hover {
  background-color: rgba(59, 130, 246, 0.2);
  color: white;
  transform: translateX(4px);
}

.nav-item.active {
  background-color: rgba(59, 130, 246, 0.3);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
}

.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.nav-text {
  margin-left: 0.75rem;
  font-weight: 500;
}

/* Animaciones suaves */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Efecto glassmorphism en el header */
header {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
}
</style>
