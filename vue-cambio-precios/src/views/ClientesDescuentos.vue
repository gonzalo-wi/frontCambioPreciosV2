<template>
  <div class="min-h-full bg-gradient-to-br from-orange-50 via-white to-red-50 relative">
    <!-- Ola de fondo -->
    <WaveBackground 
      primary-color="#f97316" 
      primary-opacity="0.4"
      secondary-color="#dc2626" 
      secondary-opacity="0.25"
    />
    
    <!-- Contenido principal -->
    <div class="relative z-20 p-6">
      
      <!-- Notificación de éxito/error -->
      <transition
        enter-active-class="transform transition ease-out duration-300"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transform transition ease-in duration-200"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-2 opacity-0"
      >
        <div v-if="mensajeGuardado" class="fixed top-6 right-6 z-50 max-w-md">
          <div 
            :class="mensajeGuardado.tipo === 'success' 
              ? 'bg-green-50 border-green-500 text-green-800' 
              : 'bg-red-50 border-red-500 text-red-800'"
            class="border-l-4 p-4 rounded-lg shadow-lg"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg v-if="mensajeGuardado.tipo === 'success'" class="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <svg v-else class="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-semibold">
                  {{ mensajeGuardado.tipo === 'success' ? '¡Éxito!' : 'Error' }}
                </p>
                <p class="text-sm mt-1">
                  {{ mensajeGuardado.texto }}
                </p>
              </div>
              <div class="ml-auto pl-3">
                <button @click="mensajeGuardado = null" class="inline-flex text-gray-400 hover:text-gray-600 transition-colors">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
      
      <!-- Header con título y estadísticas -->
      <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-red-700 bg-clip-text text-transparent mb-2">Clientes con Descuentos</h1>
            <p class="text-gray-600 text-lg">Gestión y análisis de descuentos por cliente</p>
          </div>
        </div>
        
        <!-- Estadísticas rápidas -->
        <div class="grid grid-cols-4 gap-4">
          <div class="bg-white p-4 rounded-lg shadow-sm border">
            <div class="text-2xl font-bold text-blue-600">{{ estadisticas.total }}</div>
            <div class="text-sm text-gray-500">Total Registros</div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-sm border">
            <div class="text-2xl font-bold text-green-600">{{ estadisticas.descuentoPromedio }}%</div>
            <div class="text-sm text-gray-500">Descuento Promedio</div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-sm border">
            <div class="text-2xl font-bold text-purple-600">{{ estadisticas.descuentoMaximo }}%</div>
            <div class="text-sm text-gray-500">Máximo Descuento</div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-sm border">
            <div class="text-2xl font-bold text-orange-600">${{ estadisticas.totalAhorro }}</div>
            <div class="text-sm text-gray-500">Ahorro Total</div>
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Número de Cuenta</label>
            <input
              v-model="filtros.nrocta"
              type="text"
              placeholder="Ej: 1387868"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @keyup.enter="aplicarFiltros"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Descuento mayor a</label>
            <input
              v-model="filtros.descuento"
              type="number"
              placeholder="Ej: 50"
              min="0"
              max="100"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @keyup.enter="aplicarFiltros"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Por Página</label>
            <select
              v-model="filtros.per_page"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="aplicarFiltros"
            >
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          
          <div class="flex items-end space-x-2">
            <button
              @click="aplicarFiltros"
              class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              :disabled="cargando"
            >
              <svg v-if="cargando" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ cargando ? 'Buscando...' : 'Buscar' }}
            </button>
            
            <button
              @click="limpiarFiltros"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla de clientes mejorada -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden card-shadow">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-100">
          <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div class="flex items-center space-x-1">
                  <span>N° Cuenta</span>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div class="flex items-center space-x-1">
                  <span>Producto</span>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div class="flex items-center space-x-1">
                  <span>Precio Lista</span>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                </div>
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div class="flex items-center space-x-1">
                  <span>Precio Real</span>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                </div>
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div class="flex items-center space-x-1">
                  <span>Descuento</span>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                </div>
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div class="flex items-center space-x-1">
                  <span>Ahorro</span>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                </div>
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div class="flex items-center space-x-1">
                  <span>Precio Especial</span>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr v-if="cargando">
              <td colspan="7" class="px-6 py-16 text-center">
                <div class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="text-gray-500">Cargando clientes...</span>
                </div>
              </td>
            </tr>
            
            <tr v-else-if="clientes.length === 0">
              <td colspan="7" class="px-6 py-16 text-center">
                <div class="flex flex-col items-center justify-center space-y-4">
                  <div class="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <div class="text-gray-500">
                    <p class="text-lg font-medium">No se encontraron clientes</p>
                    <p class="text-sm">Intenta ajustar los filtros de búsqueda</p>
                  </div>
                </div>
              </td>
            </tr>
            
            <tr v-else v-for="(cliente, index) in clientesFormateados" :key="`${cliente.nrocta}-${cliente.idproducto}`" 
                class="hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-200 group">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                    {{ index + 1 + ((paginacion.current_page - 1) * paginacion.per_page) }}
                  </div>
                  <div class="text-sm font-bold text-gray-900 font-mono">
                    {{ cliente.nrocta }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ cliente.idproducto }}</div>
                <div class="text-xs text-gray-500 mt-1">ID Producto</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 font-semibold">{{ cliente.precioLista }}</div>
                <div class="text-xs text-gray-500">Precio original</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 font-bold text-green-600">{{ cliente.precioReal }}</div>
                <div class="text-xs text-green-500">Precio con descuento</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span 
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border"
                    :class="getDescuentoClass(cliente.descuentoNumerico)"
                  >
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                    </svg>
                    {{ cliente.descuento }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-bold text-blue-600">{{ cliente.ahorro }}</div>
                <div class="text-xs text-blue-500">Ahorro total</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <input
                    type="number"
                    step="0.01"
                    :value="obtenerPrecioEspecial(cliente.nrocta, cliente.producto_id)"
                    @input="actualizarPrecioEspecial(cliente.nrocta, cliente.producto_id, $event.target.value)"
                    class="w-32 px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    :class="tienePrecioEditado(cliente.nrocta, cliente.producto_id) ? 'border-orange-500 bg-orange-50' : 'border-gray-300'"
                    placeholder="Precio"
                  />
                  <svg 
                    v-if="tienePrecioEditado(cliente.nrocta, cliente.producto_id)" 
                    class="w-5 h-5 text-orange-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Botón de guardar cambios -->
      <div v-if="hayCambiosSinGuardar" class="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4 border-t border-orange-200 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <span class="text-sm font-medium text-orange-800">
            Tienes {{ preciosEditados.size }} precio(s) sin guardar
          </span>
        </div>
        <div class="flex items-center space-x-3">
          <span v-if="mensajeGuardado" class="text-sm font-medium" :class="mensajeGuardado.tipo === 'success' ? 'text-green-600' : 'text-red-600'">
            {{ mensajeGuardado.texto }}
          </span>
          <button
            @click="guardarCambios"
            :disabled="guardandoCambios"
            class="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-lg hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 shadow-lg"
          >
            <svg v-if="guardandoCambios" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            <span>{{ guardandoCambios ? 'Guardando...' : 'Guardar Cambios' }}</span>
          </button>
        </div>
      </div>

      <!-- Paginación -->
      <div v-if="paginacion && paginacion.last_page > 1" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="cambiarPagina(paginacion.current_page - 1)"
            :disabled="!paginacion.prev_page_url"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <button
            @click="cambiarPagina(paginacion.current_page + 1)"
            :disabled="!paginacion.next_page_url"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
        
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Mostrando
              <span class="font-medium">{{ paginacion.from }}</span>
              a
              <span class="font-medium">{{ paginacion.to }}</span>
              de
              <span class="font-medium">{{ paginacion.total.toLocaleString() }}</span>
              resultados
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="cambiarPagina(paginacion.current_page - 1)"
                :disabled="!paginacion.prev_page_url"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ‹
              </button>
              
              <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                {{ paginacion.current_page }} de {{ paginacion.last_page }}
              </span>
              
              <button
                @click="cambiarPagina(paginacion.current_page + 1)"
                :disabled="!paginacion.next_page_url"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ›
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
    </div> <!-- Cierre del contenido principal -->
  </div> <!-- Cierre del div raíz con ola -->
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { clientesPreciosService } from '../services/clientesPreciosService.js';
import WaveBackground from '../components/WaveBackground.vue';

// Estado reactivo
const clientes = ref([]);
const paginacion = ref(null);
const cargando = ref(false);
const error = ref(null);

// Edición de precios
const preciosEditados = ref(new Map());
const guardandoCambios = ref(false);
const mensajeGuardado = ref(null);

// Filtros
const filtros = reactive({
  nrocta: '',
  descuento: '',
  per_page: 15
});

// Estadísticas computadas
const estadisticas = computed(() => {
  return clientesPreciosService.calcularEstadisticasDescuentos(clientes.value);
});

// Clientes formateados
const clientesFormateados = computed(() => {
  return clientes.value.map(cliente => clientesPreciosService.formatearCliente(cliente));
});

// Computed para saber si hay cambios sin guardar
const hayCambiosSinGuardar = computed(() => {
  return preciosEditados.value.size > 0;
});

// Métodos de edición
const obtenerPrecioEspecial = (nrocta, producto_id) => {
  const key = `${nrocta}-${producto_id}`;
  return preciosEditados.value.get(key) ?? '';
};

const actualizarPrecioEspecial = (nrocta, producto_id, precio) => {
  const key = `${nrocta}-${producto_id}`;
  
  if (precio === '' || precio === null) {
    preciosEditados.value.delete(key);
  } else {
    preciosEditados.value.set(key, parseFloat(precio));
  }
  
  // Forzar actualización del computed
  preciosEditados.value = new Map(preciosEditados.value);
};

const tienePrecioEditado = (nrocta, producto_id) => {
  const key = `${nrocta}-${producto_id}`;
  return preciosEditados.value.has(key);
};

const guardarCambios = async () => {
  if (preciosEditados.value.size === 0) return;
  
  guardandoCambios.value = true;
  mensajeGuardado.value = null;
  
  try {
    // Convertir Map a array de objetos
    const preciosArray = Array.from(preciosEditados.value.entries()).map(([key, precio_especial]) => {
      const [nrocta, producto_id] = key.split('-');
      return {
        nrocta: parseInt(nrocta),
        producto_id: producto_id, // Mantener como string, puede ser 'PV', etc.
        precio_especial: parseFloat(precio_especial)
      };
    });
    
    console.log('Enviando precios especiales:', preciosArray);
    
    await clientesPreciosService.setPreciosEspecialesCliente(preciosArray);
    
    mensajeGuardado.value = {
      tipo: 'success',
      texto: 'Precios actualizados correctamente'
    };
    
    // Limpiar ediciones
    preciosEditados.value.clear();
    preciosEditados.value = new Map();
    
    // Recargar datos
    await cargarClientes({ page: paginacion.value?.current_page || 1 });
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      mensajeGuardado.value = null;
    }, 3000);
    
  } catch (err) {
    console.error('Error al guardar precios:', err);
    mensajeGuardado.value = {
      tipo: 'error',
      texto: err.message || 'Error al guardar los precios'
    };
  } finally {
    guardandoCambios.value = false;
  }
};

// Métodos
const cargarClientes = async (params = {}) => {
  cargando.value = true;
  error.value = null;
  
  try {
    const filtrosLimpios = {};
    
    // Solo incluir filtros que tienen valor
    if (filtros.nrocta.trim()) filtrosLimpios.nrocta = filtros.nrocta.trim();
    if (filtros.descuento) filtrosLimpios.descuento = filtros.descuento;
    if (filtros.per_page) filtrosLimpios.per_page = filtros.per_page;
    
    const response = await clientesPreciosService.getClientesConDescuento({
      ...filtrosLimpios,
      ...params
    });
    
    console.log('Datos crudos de clientes (primer elemento):', response.data[0]);
    console.log('Todas las claves del primer cliente:', Object.keys(response.data[0]));
    
    clientes.value = response.data;
    paginacion.value = response;
  } catch (err) {
    error.value = 'Error al cargar los clientes';
    console.error('Error:', err);
  } finally {
    cargando.value = false;
  }
};

const aplicarFiltros = () => {
  cargarClientes({ page: 1 });
};

const limpiarFiltros = () => {
  filtros.nrocta = '';
  filtros.descuento = '';
  filtros.per_page = 15;
  cargarClientes({ page: 1 });
};

const cambiarPagina = (pagina) => {
  if (pagina >= 1 && pagina <= paginacion.value.last_page) {
    cargarClientes({ page: pagina });
  }
};

const getDescuentoClass = (descuento) => {
  if (descuento >= 50) return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200';
  if (descuento >= 25) return 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-orange-200';
  if (descuento >= 10) return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200';
  return 'bg-gradient-to-r from-green-100 to-blue-100 text-green-800 border-green-200';
};

// Inicialización
onMounted(() => {
  cargarClientes();
});
</script>

<style scoped>
/* Animaciones de entrada para las tarjetas */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-shadow {
  animation: slideInUp 0.6s ease-out;
  box-shadow: 
    0 10px 25px -5px rgba(0, 0, 0, 0.1), 
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Efectos hover mejorados */
.hover\:shadow-xl:hover {
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 10px 25px -10px rgba(0, 0, 0, 0.1);
}

/* Gradientes personalizados */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}
</style>
