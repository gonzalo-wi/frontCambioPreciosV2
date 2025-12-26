<template>
  <div class="p-6">
    <!-- Header con estadísticas -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">
        Dashboard
      </h1>
      <p class="text-gray-600">
        Resumen general del sistema de cambio de precios
      </p>
    </div>

    <!-- Estadísticas principales -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Listas -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Listas</p>
            <p class="text-2xl font-bold text-gray-900">{{ totalListas }}</p>
          </div>
        </div>
      </div>

      <!-- Total Productos -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Productos</p>
            <p class="text-2xl font-bold text-gray-900">{{ totalProductos }}</p>
          </div>
        </div>
      </div>

      <!-- Última Actualización -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <div class="p-3 bg-yellow-100 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Última Actualización</p>
            <p class="text-sm font-bold text-gray-900">{{ ultimaActualizacion }}</p>
          </div>
        </div>
      </div>

      <!-- Estado del Sistema -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Estado</p>
            <p class="text-sm font-bold text-green-600">Activo</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Accesos rápidos -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <!-- Card Listas de Precios -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Listas de Precios</h3>
          <p class="text-gray-600 mb-4">Gestiona y visualiza todas las listas de precios disponibles</p>
          <button
            @click="navigateToListas"
            class="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-md"
          >
            Ver Listas
          </button>
        </div>
      </div>

      <!-- Card Clientes con Descuentos -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Clientes con Descuentos</h3>
          <p class="text-gray-600 mb-4">Analiza descuentos y precios especiales por cliente</p>
          <button
            @click="navigateToClientes"
            class="inline-block bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105 shadow-md"
          >
            Ver Descuentos
          </button>
        </div>
      </div>

      <!-- Card Cambiar Precios -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Cambiar Precios</h3>
          <p class="text-gray-600 mb-4">Sube archivos Excel para actualizar precios masivamente</p>
          <button
            @click="navigateToCambiarPrecios"
            class="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-md"
          >
            Subir Excel
          </button>
        </div>
      </div>

      <!-- Card Productos -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Productos</h3>
          <p class="text-gray-600 mb-4">Administra el catálogo de productos</p>
          <button
            disabled
            class="inline-block bg-gray-400 text-white px-6 py-2 rounded-lg cursor-not-allowed"
          >
            Próximamente
          </button>
        </div>
      </div>

      <!-- Card Reportes -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Reportes</h3>
          <p class="text-gray-600 mb-4">Genera reportes y análisis de precios</p>
          <button
            disabled
            class="inline-block bg-gray-400 text-white px-6 py-2 rounded-lg cursor-not-allowed"
          >
            Próximamente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { listaDePrecioService } from '../services/listaDePrecioService.js';

const router = useRouter();

// Estado reactivo
const totalListas = ref(0);
const totalProductos = ref(0);
const ultimaActualizacion = ref('Cargando...');

// Métodos
const navigateToListas = () => {
  router.push('/listas-precios');
};

const navigateToClientes = () => {
  router.push('/clientes-descuentos');
};

const navigateToCambiarPrecios = () => {
  router.push('/cambiar-precios');
};

const cargarEstadisticas = async () => {
  try {
    const listas = await listaDePrecioService.getListasDePrecios();
    totalListas.value = listas.length;
    
    // Calcular total de productos
    let productos = 0;
    listas.forEach(lista => {
      productos += lista.items ? lista.items.length : 0;
    });
    totalProductos.value = productos;
    
    // Fecha actual formateada
    const now = new Date();
    ultimaActualizacion.value = now.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error al cargar estadísticas:', error);
    ultimaActualizacion.value = 'Error al cargar';
  }
};

// Cargar datos al montar
onMounted(() => {
  cargarEstadisticas();
});
</script>

<style scoped>
/* Animaciones para las tarjetas */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-white {
  animation: fadeInUp 0.6s ease-out;
}

/* Efecto hover mejorado */
.hover\:-translate-y-1:hover {
  transform: translateY(-0.25rem);
}

/* Gradientes para botones */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
</style>
