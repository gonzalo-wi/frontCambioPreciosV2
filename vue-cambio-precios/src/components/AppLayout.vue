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

        <!-- Selector de Empresa -->
        <div class="px-3 py-4 border-b border-blue-600/30">
          <div v-if="sidebarAbierto" class="relative">
            <button
              @click="mostrarSelectorEmpresa = !mostrarSelectorEmpresa"
              class="w-full flex items-center justify-between px-3 py-2.5 bg-blue-800/50 hover:bg-blue-700/60 rounded-lg transition-all duration-200 group border border-blue-500/30"
            >
              <div class="flex items-center space-x-2">
                <div 
                  class="w-2 h-2 rounded-full"
                  :class="empresaActual.id === 'IVESS' ? 'bg-blue-400' : 'bg-red-400'"
                ></div>
                <span class="text-sm font-semibold">{{ empresaActual.nombre }}</span>
              </div>
              <svg 
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': mostrarSelectorEmpresa }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Dropdown -->
            <Transition name="dropdown">
              <div 
                v-if="mostrarSelectorEmpresa" 
                class="absolute top-full left-0 right-0 mt-2 bg-blue-800 rounded-lg shadow-xl border border-blue-600/50 overflow-hidden z-50"
              >
                <button
                  v-for="empresa in empresasDisponibles"
                  :key="empresa.id"
                  @click="seleccionarEmpresa(empresa.id)"
                  class="w-full flex items-center justify-between px-3 py-2.5 hover:bg-blue-700/60 transition-colors duration-150"
                  :class="{ 'bg-blue-700/40': empresaActual.id === empresa.id }"
                >
                  <div class="flex items-center space-x-2">
                    <div 
                      class="w-2 h-2 rounded-full"
                      :class="empresa.id === 'IVESS' ? 'bg-blue-400' : 'bg-red-400'"
                    ></div>
                    <span class="text-sm font-medium">{{ empresa.nombre }}</span>
                  </div>
                  <svg 
                    v-if="empresaActual.id === empresa.id"
                    class="w-4 h-4 text-green-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>
            </Transition>
          </div>

          <!-- Vista colapsada -->
          <div v-else class="flex justify-center">
            <div 
              class="w-8 h-8 rounded-lg flex items-center justify-center"
              :class="empresaActual.id === 'IVESS' ? 'bg-blue-600' : 'bg-red-600'"
              :title="empresaActual.nombre"
            >
              <span class="text-xs font-bold">{{ empresaActual.id.charAt(0) }}</span>
            </div>
          </div>
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

          <!-- Cambiar Listas Clientes -->
          <router-link
            to="/cambiar-listas-clientes"
            class="nav-item group"
            :class="{ 'active': $route.path === '/cambiar-listas-clientes' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <span v-show="sidebarAbierto" class="nav-text">Cambiar Listas Clientes</span>
          </router-link>

          <!-- Restaurar Backup -->
          <router-link
            to="/restaurar-backup"
            class="nav-item group"
            :class="{ 'active': $route.path === '/restaurar-backup' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
              </svg>
            </div>
            <span v-show="sidebarAbierto" class="nav-text">Restaurar Backup</span>
          </router-link>
        </nav>

        <!-- Selector de Ambiente (Pruebas/Producción) -->
        <div class="px-3 py-3 border-t border-blue-600/30">
          <div v-if="sidebarAbierto" class="space-y-2">
            <div class="flex items-center justify-between px-2">
              <span class="text-xs font-semibold text-blue-200 uppercase tracking-wider">Ambiente</span>
              <div 
                class="px-2 py-0.5 rounded text-xs font-bold"
                :class="ambienteActual === 'PRODUCCION' 
                  ? 'bg-red-500/30 text-red-200 border border-red-400/50' 
                  : 'bg-green-500/30 text-green-200 border border-green-400/50'"
              >
                {{ ambienteActual === 'PRODUCCION' ? 'PROD' : 'TEST' }}
              </div>
            </div>
            
            <button
              @click="toggleAmbiente"
              class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group"
              :class="ambienteActual === 'PRODUCCION' 
                ? 'bg-red-900/40 hover:bg-red-800/50 border border-red-500/30' 
                : 'bg-green-900/40 hover:bg-green-800/50 border border-green-500/30'"
            >
              <div class="flex items-center space-x-2">
                <div 
                  class="w-2 h-2 rounded-full animate-pulse"
                  :class="ambienteActual === 'PRODUCCION' ? 'bg-red-400' : 'bg-green-400'"
                ></div>
                <span class="text-sm font-semibold">
                  {{ ambienteActual === 'PRODUCCION' ? 'Producción' : 'Pruebas' }}
                </span>
              </div>
              <svg class="w-4 h-4 transition-transform group-hover:rotate-180 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
              </svg>
            </button>
          </div>

          <!-- Vista colapsada -->
          <div v-else class="flex justify-center">
            <div 
              @click="toggleAmbiente"
              class="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
              :class="ambienteActual === 'PRODUCCION' 
                ? 'bg-red-600 border-2 border-red-400' 
                : 'bg-green-600 border-2 border-green-400'"
              :title="ambienteActual === 'PRODUCCION' ? 'Producción' : 'Pruebas'"
            >
              <span class="text-xs font-bold">{{ ambienteActual === 'PRODUCCION' ? 'P' : 'T' }}</span>
            </div>
          </div>
        </div>

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
            <!-- Badge de Ambiente -->
            <div class="flex items-center px-3 py-1.5 rounded-lg border-2" 
                 :class="ambienteActual === 'PRODUCCION' 
                   ? 'bg-red-50 border-red-400 shadow-red-200 shadow-md' 
                   : 'bg-green-50 border-green-400 shadow-green-200 shadow-md'">
              <div class="w-2 h-2 rounded-full mr-2 animate-pulse"
                   :class="ambienteActual === 'PRODUCCION' ? 'bg-red-500' : 'bg-green-500'">
              </div>
              <span class="text-xs font-bold uppercase tracking-wider"
                    :class="ambienteActual === 'PRODUCCION' ? 'text-red-700' : 'text-green-700'">
                {{ ambienteActual === 'PRODUCCION' ? '🔴 PRODUCCIÓN' : '🟢 PRUEBAS' }}
              </span>
            </div>
            
            <!-- Badge de Empresa Activa -->
            <div class="flex items-center px-3 py-1.5 rounded-lg border-2" 
                 :class="empresaActual.id === 'IVESS' 
                   ? 'bg-blue-50 border-blue-300' 
                   : 'bg-red-50 border-red-300'">
              <div class="w-2 h-2 rounded-full mr-2"
                   :class="empresaActual.id === 'IVESS' ? 'bg-blue-500' : 'bg-red-500'">
              </div>
              <span class="text-sm font-semibold"
                    :class="empresaActual.id === 'IVESS' ? 'text-blue-700' : 'text-red-700'">
                {{ empresaActual.nombre }}
              </span>
            </div>

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
              <span class="text-sm font-medium text-gray-700">{{ currentUser?.nombre || 'Admin' }}</span>
            </div>

            <!-- Botón Cerrar Sesión -->
            <button 
              @click="handleLogout"
              class="flex items-center space-x-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 transition-colors duration-200 group"
              title="Cerrar Sesión"
            >
              <svg class="w-5 h-5 text-red-600 group-hover:text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span class="text-sm font-medium text-red-600 group-hover:text-red-700">Salir</span>
            </button>
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
import { useRoute, useRouter } from 'vue-router';
import { useEmpresa } from '../composables/useEmpresa';
import { useAmbiente } from '../composables/useAmbiente';
import { useAuthStore } from '../stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const sidebarAbierto = ref(true);
const mostrarSelectorEmpresa = ref(false);

// Obtener usuario actual
const currentUser = computed(() => authStore.currentUser);

// Composable de empresa
const { empresaActual: empresaActualRef, empresasDisponibles, cambiarEmpresa, getEmpresaActual } = useEmpresa();
const empresaActual = computed(() => getEmpresaActual());

// Composable de ambiente
const { ambiente: ambienteActual, setAmbiente, isProduccion } = useAmbiente();

const seleccionarEmpresa = (empresaId) => {
  cambiarEmpresa(empresaId);
  mostrarSelectorEmpresa.value = false;
  // Recargar la vista actual
  window.location.reload();
};

const toggleSidebar = () => {
  sidebarAbierto.value = !sidebarAbierto.value;
};

const toggleAmbiente = () => {
  const nuevoAmbiente = ambienteActual.value === 'PRODUCCION' ? 'PRUEBAS' : 'PRODUCCION';
  setAmbiente(nuevoAmbiente);
  
  // Mostrar notificación
  alert(`Cambiado a ambiente de ${nuevoAmbiente === 'PRODUCCION' ? 'PRODUCCIÓN' : 'PRUEBAS'}\n\nLa página se recargará para aplicar los cambios.`);
  
  // Recargar la página para que se apliquen los cambios en todas las peticiones
  window.location.reload();
};

const handleLogout = () => {
  if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
    authStore.logout();
    router.push('/login');
  }
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

/* Transiciones del dropdown de empresa */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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
