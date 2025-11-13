<template>
  <div class="container mx-auto p-6">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Listas de Precios</h1>
      <p class="text-gray-600">Gestiona y visualiza todas las listas de precios disponibles</p>
    </div>

    <!-- Barra de búsqueda -->
    <div class="mb-6">
      <div class="flex gap-4">
        <div class="flex-1">
          <input
            v-model="busqueda"
            type="text"
            placeholder="Buscar por descripción..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            @input="filtrarListas"
          />
        </div>
        <button
          @click="cargarListas"
          :disabled="loading"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span v-if="loading">Cargando...</span>
          <span v-else>Actualizar</span>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
      <strong>Error:</strong> {{ error }}
    </div>

    <!-- Tabla de listas -->
    <div v-else-if="listasFiltradas.length > 0" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Lista
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Productos
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="lista in listasFiltradas" :key="lista.idListaPrecios" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ lista.idListaPrecios }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ lista.descripcion }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ lista.items.length }} productos
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="verDetalles(lista)"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  Ver detalles
                </button>
                <button
                  @click="exportarLista(lista)"
                  class="text-green-600 hover:text-green-900"
                >
                  Exportar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="text-gray-500 text-lg">No se encontraron listas de precios</div>
      <button
        @click="cargarListas"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Cargar listas
      </button>
    </div>

    <!-- Modal de detalles -->
    <div
      v-if="listaSeleccionada"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click.self="cerrarModal"
    >
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              Detalles de {{ listaSeleccionada.descripcion }}
            </h3>
            <button
              @click="cerrarModal"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div class="mb-4">
            <p class="text-sm text-gray-600">
              <strong>ID:</strong> {{ listaSeleccionada.idListaPrecios }}
            </p>
          </div>

          <div class="max-h-96 overflow-y-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    ID Producto
                  </th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Precio
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="item in listaSeleccionada.items" :key="item.idProducto">
                  <td class="px-4 py-2 text-sm text-gray-900">{{ item.idProducto }}</td>
                  <td class="px-4 py-2 text-sm text-gray-900">${{ formatearPrecio(item.precio) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { listaDePrecioService } from '../services/listaDePrecioService.js';

export default {
  name: 'ListaPrecios',
  data() {
    return {
      listas: [],
      listasFiltradas: [],
      loading: false,
      error: null,
      busqueda: '',
      listaSeleccionada: null
    };
  },
  async mounted() {
    await this.cargarListas();
  },
  methods: {
    async cargarListas() {
      this.loading = true;
      this.error = null;
      try {
        this.listas = await listaDePrecioService.getListasDePrecios();
        this.listasFiltradas = [...this.listas];
      } catch (error) {
        this.error = error.message;
        console.error('Error al cargar listas:', error);
      } finally {
        this.loading = false;
      }
    },

    filtrarListas() {
      if (!this.busqueda.trim()) {
        this.listasFiltradas = [...this.listas];
        return;
      }

      this.listasFiltradas = this.listas.filter(lista =>
        lista.descripcion.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        lista.idListaPrecios.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    },

    verDetalles(lista) {
      this.listaSeleccionada = lista;
    },

    cerrarModal() {
      this.listaSeleccionada = null;
    },

    exportarLista(lista) {
      // Crear CSV simple
      const csvContent = [
        ['ID Producto', 'Precio'],
        ...lista.items.map(item => [item.idProducto, item.precio])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `lista_precios_${lista.idListaPrecios}.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
    },

    formatearPrecio(precio) {
      return new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 3
      }).format(parseFloat(precio));
    }
  }
};
</script>

<style scoped>
/* Estilos adicionales si necesitas algo específico */
</style>
