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
        
        <!-- Botones de carga masiva Excel -->
        <div class="mt-4 flex items-center justify-end space-x-3">
          <button
            @click="abrirModalExcel('modificar')"
            class="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            <span class="font-medium">Modificar Precios (Excel)</span>
          </button>
          
          <button
            @click="abrirModalExcel('eliminar')"
            class="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            <span class="font-medium">Eliminar Descuentos (Excel)</span>
          </button>
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
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr v-if="cargando">
              <td colspan="8" class="px-6 py-16 text-center">
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
              <td colspan="8" class="px-6 py-16 text-center">
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
              <td class="px-6 py-4 whitespace-nowrap">
                <button
                  @click="eliminarClienteIndividual(cliente.nrocta, cliente.producto_id)"
                  class="inline-flex items-center px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all duration-200 group-hover:shadow-md"
                  title="Eliminar este precio especial"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                  <span class="text-xs font-medium">Eliminar</span>
                </button>
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

    <!-- Modal para Carga de Excel -->
    <Transition name="modal">
      <div 
        v-if="modalExcelAbierto" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        @click.self="cerrarModalExcel"
      >
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Header del Modal -->
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center" 
               :class="modoExcel === 'modificar' ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gradient-to-r from-red-50 to-rose-50'">
            <div>
              <h3 class="text-xl font-bold" :class="modoExcel === 'modificar' ? 'text-green-800' : 'text-red-800'">
                {{ modoExcel === 'modificar' ? 'Modificar Precios Especiales' : 'Eliminar Clientes con Descuentos' }}
              </h3>
              <p class="text-sm text-gray-600 mt-1">
                {{ modoExcel === 'modificar' 
                  ? 'Sube un archivo Excel con las columnas: nrocta, producto_id, precio_especial' 
                  : 'Sube un archivo Excel con las columnas: nrocta, producto_id' 
                }}
              </p>
            </div>
            <button 
              @click="cerrarModalExcel" 
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Zona de Drag & Drop -->
          <div class="p-6">
            <div 
              @drop.prevent="onDrop"
              @dragover.prevent
              @dragenter.prevent="arrastrando = true"
              @dragleave.prevent="arrastrando = false"
              class="border-3 border-dashed rounded-xl p-8 text-center transition-all duration-300"
              :class="arrastrando 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'"
            >
              <div class="flex flex-col items-center gap-4">
                <!-- Ícono de Excel -->
                <div class="w-20 h-20 rounded-full flex items-center justify-center"
                     :class="modoExcel === 'modificar' ? 'bg-green-100' : 'bg-red-100'">
                  <svg class="w-10 h-10" :class="modoExcel === 'modificar' ? 'text-green-600' : 'text-red-600'" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>

                <!-- Texto -->
                <div>
                  <p class="text-lg font-semibold text-gray-700">
                    {{ archivoExcel ? archivoExcel.name : 'Arrastra tu archivo Excel aquí' }}
                  </p>
                  <p class="text-sm text-gray-500 mt-1">
                    o haz clic para seleccionar
                  </p>
                </div>

                <!-- Input de archivo oculto -->
                <input 
                  ref="inputArchivo"
                  type="file" 
                  accept=".xlsx,.xls"
                  @change="onFileSelected"
                  class="hidden"
                />

                <!-- Botón de selección -->
                <button 
                  v-if="!archivoExcel"
                  @click="$refs.inputArchivo.click()"
                  class="px-6 py-2 rounded-lg font-medium transition-all duration-200"
                  :class="modoExcel === 'modificar' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                    : 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700'"
                >
                  Seleccionar Archivo
                </button>

                <!-- Botón para cambiar archivo -->
                <button 
                  v-else
                  @click="$refs.inputArchivo.click()"
                  class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                >
                  Cambiar Archivo
                </button>
              </div>
            </div>

            <!-- Vista previa de datos -->
            <div v-if="datosExcelProcesados.length > 0" class="mt-6">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-lg font-semibold text-gray-800">
                  Vista Previa ({{ datosExcelProcesados.length }} registros)
                </h4>
                <button
                  @click="exportarVistaPreviaExcel"
                  :disabled="cargandoComparacion"
                  class="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg v-if="cargandoComparacion" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span class="font-medium">{{ cargandoComparacion ? 'Obteniendo precios...' : 'Exportar Vista Previa' }}</span>
                </button>
              </div>
              <div class="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50 sticky top-0">
                    <tr>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nro Cuenta</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Producto ID</th>
                      <th v-if="modoExcel === 'modificar'" class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                        Precio Actual
                      </th>
                      <th v-if="modoExcel === 'modificar'" class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                        Precio Nuevo
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(item, index) in datosExcelProcesados.slice(0, 10)" :key="index" class="hover:bg-gray-50">
                      <td class="px-4 py-2 text-sm text-gray-900">{{ item.nrocta }}</td>
                      <td class="px-4 py-2 text-sm text-gray-900">{{ item.producto_id }}</td>
                      <td v-if="modoExcel === 'modificar'" class="px-4 py-2 text-sm text-gray-600 text-right">
                        <span v-if="cargandoComparacion" class="italic text-xs">Cargando...</span>
                        <span v-else-if="item.precio_lista_actual !== undefined">{{ formatearPrecio(item.precio_lista_actual) }}</span>
                        <span v-else class="italic text-xs">-</span>
                      </td>
                      <td v-if="modoExcel === 'modificar'" class="px-4 py-2 text-sm text-gray-900 text-right font-semibold">
                        {{ formatearPrecio(item.precio_especial) }}
                      </td>
                    </tr>
                    <tr v-if="datosExcelProcesados.length > 10">
                      <td :colspan="modoExcel === 'modificar' ? 4 : 2" class="px-4 py-2 text-sm text-gray-500 text-center italic">
                        ... y {{ datosExcelProcesados.length - 10 }} registros más
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Mensajes de error -->
            <div v-if="errorExcel" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-sm text-red-700">{{ errorExcel }}</p>
            </div>
          </div>

          <!-- Footer del Modal -->
          <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-2xl">
            <button 
              @click="cerrarModalExcel"
              class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button 
              @click="aplicarOperacionExcel"
              :disabled="!archivoExcel || datosExcelProcesados.length === 0 || procesandoExcel"
              class="px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              :class="modoExcel === 'modificar' 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                : 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700'"
            >
              <span v-if="procesandoExcel" class="flex items-center gap-2">
                <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </span>
              <span v-else>
                {{ modoExcel === 'modificar' ? 'Aplicar Cambios' : 'Eliminar Clientes' }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal de Carga (durante procesamiento) -->
    <Transition name="fade">
      <div v-if="mostrandoCarga" class="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-70">
        <div class="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 text-center relative overflow-hidden">
          <!-- Fondo con partículas animadas -->
          <div class="absolute inset-0 overflow-hidden opacity-20">
            <div class="absolute w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse" style="top: -20%; left: -10%;"></div>
            <div class="absolute w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse" style="bottom: -20%; right: -10%; animation-delay: 1s;"></div>
          </div>

          <!-- Contenido -->
          <div class="relative z-10">
            <!-- Spinner Triple -->
            <div class="relative w-24 h-24 mx-auto mb-6">
              <div class="absolute inset-0 border-4 border-blue-200 rounded-full animate-spin" style="border-top-color: #3b82f6;"></div>
              <div class="absolute inset-2 border-4 border-purple-200 rounded-full animate-spin" style="border-top-color: #8b5cf6; animation-direction: reverse; animation-duration: 0.8s;"></div>
              <div class="absolute inset-4 border-4 border-pink-200 rounded-full animate-spin" style="border-top-color: #ec4899; animation-duration: 0.6s;"></div>
            </div>

            <!-- Texto -->
            <h3 class="text-2xl font-bold text-gray-800 mb-2">
              {{ modoExcel === 'modificar' ? 'Modificando Precios...' : 'Eliminando Clientes...' }}
            </h3>
            <p class="text-gray-600 mb-4">
              {{ modoExcel === 'modificar' 
                ? `Actualizando ${datosExcelProcesados.length} precios especiales` 
                : `Eliminando ${datosExcelProcesados.length} registros de clientes` 
              }}
            </p>

            <!-- Barra de progreso -->
            <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
            </div>

            <p class="text-sm text-gray-500 mt-4">Por favor, espera...</p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal de Confirmación de Cambios -->
    <Transition name="fade">
      <div v-if="modalConfirmacionAbierto" class="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-70 p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <!-- Header -->
          <div class="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 text-white">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <div>
                  <h3 class="text-2xl font-bold">Confirmar Cambios de Precios</h3>
                  <p class="text-sm text-green-100">Revisa los cambios antes de aplicarlos</p>
                </div>
              </div>
              <button @click="cancelarCambiosPrecios" class="text-white hover:text-gray-200 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Información de resumen -->
          <div class="px-6 py-4 bg-blue-50 border-b border-blue-100">
            <div class="grid grid-cols-4 gap-4">
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">{{ datosComparacion.length }}</div>
                <div class="text-xs text-gray-600">Registros Totales</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-green-600">
                  {{ datosComparacion.filter(d => d.diferencia > 0).length }}
                </div>
                <div class="text-xs text-gray-600">Aumentos</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-red-600">
                  {{ datosComparacion.filter(d => d.diferencia < 0).length }}
                </div>
                <div class="text-xs text-gray-600">Disminuciones</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-600">
                  {{ datosComparacion.filter(d => d.diferencia === 0).length }}
                </div>
                <div class="text-xs text-gray-600">Sin Cambios</div>
              </div>
            </div>
          </div>

          <!-- Mensaje sobre el Excel descargado -->
          <div class="px-6 py-3 bg-yellow-50 border-b border-yellow-100">
            <div class="flex items-center space-x-2 text-yellow-800">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span class="text-sm font-medium">Se ha descargado un archivo Excel con la comparación detallada de todos los cambios.</span>
            </div>
          </div>

          <!-- Tabla de comparación (scrollable) -->
          <div class="flex-1 overflow-auto px-6 py-4">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">NroCta</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Producto</th>
                  <th class="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Precio Actual</th>
                  <th class="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Precio Nuevo</th>
                  <th class="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Diferencia</th>
                  <th class="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Cambio %</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-100">
                <tr v-for="(item, index) in datosComparacion" :key="index" 
                    :class="item.diferencia > 0 ? 'bg-green-50' : item.diferencia < 0 ? 'bg-red-50' : 'bg-gray-50'"
                    class="hover:bg-opacity-75 transition-colors">
                  <td class="px-4 py-3 text-sm font-mono font-semibold">{{ item.nrocta }}</td>
                  <td class="px-4 py-3 text-sm font-medium">{{ item.producto_id }}</td>
                  <td class="px-4 py-3 text-sm text-right font-mono">{{ formatearPrecio(item.precio_actual) }}</td>
                  <td class="px-4 py-3 text-sm text-right font-mono font-semibold">{{ formatearPrecio(item.precio_nuevo) }}</td>
                  <td class="px-4 py-3 text-sm text-right font-mono font-bold"
                      :class="item.diferencia > 0 ? 'text-green-600' : item.diferencia < 0 ? 'text-red-600' : 'text-gray-600'">
                    {{ item.diferencia > 0 ? '+' : '' }}{{ formatearPrecio(item.diferencia) }}
                  </td>
                  <td class="px-4 py-3 text-sm text-right font-semibold"
                      :class="item.diferencia > 0 ? 'text-green-600' : item.diferencia < 0 ? 'text-red-600' : 'text-gray-600'">
                    {{ item.porcentaje_cambio > 0 ? '+' : '' }}{{ item.porcentaje_cambio }}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Footer con botones -->
          <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button 
              @click="cancelarCambiosPrecios"
              class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <span>Cancelar</span>
              </div>
            </button>
            <button 
              @click="confirmarCambiosPrecios"
              :disabled="procesandoExcel"
              class="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div class="flex items-center space-x-2">
                <svg v-if="procesandoExcel" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>{{ procesandoExcel ? 'Aplicando...' : 'Confirmar y Aplicar Cambios' }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div> <!-- Cierre del div raíz con ola -->
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { clientesPreciosService } from '../services/clientesPreciosService.js';
import WaveBackground from '../components/WaveBackground.vue';
import * as XLSX from 'xlsx';

// Estado reactivo
const clientes = ref([]);
const paginacion = ref(null);
const cargando = ref(false);
const error = ref(null);

// Edición de precios
const preciosEditados = ref(new Map());
const guardandoCambios = ref(false);
const mensajeGuardado = ref(null);

// Estado para Excel upload
const modalExcelAbierto = ref(false);
const modoExcel = ref('modificar'); // 'modificar' o 'eliminar'
const archivoExcel = ref(null);
const arrastrando = ref(false);
const datosExcelProcesados = ref([]);
const errorExcel = ref(null);
const procesandoExcel = ref(false);
const mostrandoCarga = ref(false);
const inputArchivo = ref(null);

// Estado para comparación y confirmación
const datosComparacion = ref([]);
const modalConfirmacionAbierto = ref(false);
const cargandoComparacion = ref(false);

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

// Función auxiliar para formatear precio
const formatearPrecio = (precio) => {
  if (!precio && precio !== 0) return '-';
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  }).format(precio);
};

// Métodos para manejo de Excel
const abrirModalExcel = (modo) => {
  modoExcel.value = modo;
  modalExcelAbierto.value = true;
  archivoExcel.value = null;
  datosExcelProcesados.value = [];
  errorExcel.value = null;
};

const cerrarModalExcel = () => {
  modalExcelAbierto.value = false;
  archivoExcel.value = null;
  datosExcelProcesados.value = [];
  errorExcel.value = null;
  arrastrando.value = false;
};

const onFileSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    procesarArchivoExcel(file);
  }
};

const onDrop = (event) => {
  arrastrando.value = false;
  const file = event.dataTransfer.files[0];
  if (file) {
    procesarArchivoExcel(file);
  }
};

const procesarArchivoExcel = async (file) => {
  errorExcel.value = null;
  
  // Validar que sea un archivo Excel
  if (!file.name.match(/\.(xlsx|xls)$/)) {
    errorExcel.value = 'Por favor selecciona un archivo Excel válido (.xlsx o .xls)';
    return;
  }

  archivoExcel.value = file;

  const reader = new FileReader();
  
  reader.onload = async (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      
      // Tomar la primera hoja
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      // Verificar el rango del worksheet
      console.log('Rango original del Excel:', worksheet['!ref']);
      
      // Forzar el rango completo si es necesario
      // Obtener el rango actual
      let range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
      console.log('Filas detectadas por XLSX:', range.e.r + 1);
      console.log('Columnas detectadas por XLSX:', range.e.c + 1);
      
      // Buscar la última celda con contenido en la columna A (NROCTA)
      let ultimaFilaConDatos = range.e.r;
      for (let r = range.e.r + 1; r <= 50000; r++) {
        const cellAddress = XLSX.utils.encode_cell({ r: r, c: 0 }); // Columna A
        if (worksheet[cellAddress]) {
          ultimaFilaConDatos = r;
        } else if (r > ultimaFilaConDatos + 100) {
          // Si no hay datos en 100 filas consecutivas, parar
          break;
        }
      }
      
      console.log('Última fila con datos encontrada:', ultimaFilaConDatos + 1);
      
      // Forzar el rango completo
      if (ultimaFilaConDatos > range.e.r) {
        const nuevoRango = XLSX.utils.encode_range({
          s: { r: 0, c: 0 },
          e: { r: ultimaFilaConDatos, c: range.e.c }
        });
        worksheet['!ref'] = nuevoRango;
        console.log('Rango ajustado a:', nuevoRango);
      }
      
      // Convertir a JSON usando los HEADERS del Excel con rango completo
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
        raw: false,
        defval: '',
        blankrows: true
      });

      console.log('Datos Excel parseados con headers:', jsonData);
      console.log('Total de filas en el Excel:', jsonData.length);
      console.log('Primer registro (para ver las columnas):', jsonData[0]);
      console.log('Último registro:', jsonData[jsonData.length - 1]);
      console.log('Claves detectadas:', jsonData[0] ? Object.keys(jsonData[0]) : 'No hay datos');

      // Convertir TODAS las filas sin filtrar (temporalmente para debug)
      const datosConvertidos = jsonData.map((row, index) => {
        // Buscar las columnas por nombres
        const nrocta = row['nrocta'] || row['NroCta'] || row['Nrocta'] || row['NROCTA'] || row['Numero'] || row['Cuenta'];
        const producto = row['producto_id'] || row['idProducto'] || row['IdProducto'] || row['producto'] || row['Producto'] || row['PRODUCTO'] || row['IDPRODUCTO'];
        
        const obj = {
          nrocta: nrocta,
          producto_id: producto,
        };
        
        // Solo agregar precio si es modo modificar
        if (modoExcel.value === 'modificar') {
          const precio = row['precio'] || row['Precio'] || row['PRECIO'] || row['precio_especial'] || row['PrecioEspecial'] || row['Precio Final'] || row['PrecioFinal'] || row['precio_final'];
          obj.precio = precio;
        }
        
        return obj;
      });

      console.log('Total de filas leídas del Excel:', jsonData.length);
      console.log('Total de registros convertidos (sin filtrar):', datosConvertidos.length);
      console.log('Ejemplo de registro convertido:', datosConvertidos[0]);
      console.log('Último registro convertido:', datosConvertidos[datosConvertidos.length - 1]);

      if (datosConvertidos.length === 0) {
        errorExcel.value = 'El archivo Excel está vacío o no tiene datos válidos';
        return;
      }

      // Validar y transformar datos según el modo
      const datosValidados = validarDatosExcel(datosConvertidos);
      
      if (datosValidados.length === 0) {
        errorExcel.value = 'No se encontraron datos válidos en el archivo';
        return;
      }

      datosExcelProcesados.value = datosValidados;
      
      // Mostrar mensaje de éxito con cantidad de registros procesados
      console.log(`Excel procesado: ${datosValidados.length} registros válidos`);
      
    } catch (err) {
      console.error('Error al procesar Excel:', err);
      errorExcel.value = 'Error al leer el archivo Excel: ' + err.message;
    }
  };

  reader.onerror = () => {
    errorExcel.value = 'Error al leer el archivo';
  };

  reader.readAsArrayBuffer(file);
};

const validarDatosExcel = (datos) => {
  const datosValidos = [];
  const errores = [];

  console.log('Validando datos para modo:', modoExcel.value);
  console.log('Total de filas a validar:', datos.length);

  datos.forEach((row, index) => {
    const linea = index + 2; // +2 porque Excel empieza en 1 y hay header
    
    console.log(`Validando línea ${linea}:`, row);
    
    const nrocta = row.nrocta;
    const producto_id = row.producto_id;
    
    console.log(`Línea ${linea} - nrocta:`, nrocta, ', producto_id:', producto_id);
    
    // Validar campos obligatorios
    if (!nrocta && nrocta !== 0) {
      errores.push(`Línea ${linea}: Falta 'nrocta' en columna A`);
      return;
    }

    if (!producto_id && producto_id !== 0) {
      errores.push(`Línea ${linea}: Falta 'producto_id' en columna B`);
      return;
    }

    const registro = {
      nrocta: String(nrocta).trim(),
      producto_id: String(producto_id).trim()
    };

    // Si es modo modificar, necesitamos el precio
    if (modoExcel.value === 'modificar') {
      const precio = row.precio;
      
      console.log(`Línea ${linea} - precio:`, precio, `tipo:`, typeof precio);
      
      if (!precio && precio !== 0) {
        errores.push(`Línea ${linea}: Falta 'precio' en columna de precio`);
        return;
      }

      // Normalizar precio
      const precioNormalizado = normalizarPrecio(precio);
      
      console.log(`Línea ${linea} - precio normalizado:`, precioNormalizado);
      
      if (precioNormalizado === null || isNaN(precioNormalizado)) {
        errores.push(`Línea ${linea}: Precio inválido '${precio}' - debe ser un número válido`);
        return;
      }

      if (precioNormalizado < 0) {
        errores.push(`Línea ${linea}: Precio negativo '${precio}' - debe ser mayor o igual a 0`);
        return;
      }

      registro.precio_especial = precioNormalizado;
    }

    console.log(`Línea ${linea} - Registro válido:`, registro);
    datosValidos.push(registro);
  });

  // Mostrar errores si los hay
  console.log('Errores de validación:', errores);
  console.log('Datos válidos encontrados:', datosValidos.length);
  
  if (errores.length > 0) {
    const mensajeErrores = errores.slice(0, 10).join('\n');
    const masErrores = errores.length > 10 ? `\n... y ${errores.length - 10} errores más` : '';
    
    if (datosValidos.length === 0) {
      // No hay datos válidos, mostrar error completo
      errorExcel.value = `Se encontraron ${errores.length} errores en el archivo:\n\n` + mensajeErrores + masErrores + '\n\nVerifique que:\n- La columna C contenga solo valores numéricos\n- No haya columnas adicionales mezcladas\n- El formato del Excel sea correcto';
    } else {
      // Hay algunos válidos, mostrar advertencia
      console.warn(`Se encontraron ${errores.length} errores pero ${datosValidos.length} registros válidos`);
      
      // Preguntar al usuario si quiere continuar
      const continuar = confirm(
        `⚠️ ADVERTENCIA\n\n` +
        `Se encontraron ${errores.length} filas con errores y ${datosValidos.length} filas válidas.\n\n` +
        `Primeros errores:\n${mensajeErrores}${masErrores}\n\n` +
        `¿Desea continuar solo con los registros válidos?`
      );
      
      if (!continuar) {
        errorExcel.value = 'Operación cancelada por el usuario';
        return [];
      }
    }
  }

  return datosValidos;
};

const normalizarPrecio = (valor) => {
  if (valor === null || valor === undefined || valor === '') return null;
  
  // Si ya es número, devolverlo
  if (typeof valor === 'number') return valor;
  
  // Convertir a string y limpiar
  let valorStr = String(valor).trim();
  
  // Remover símbolos de moneda y espacios
  valorStr = valorStr.replace(/[$\s]/g, '');
  
  // Manejar formatos argentinos (puntos como separadores de miles, coma como decimal)
  // Ejemplo: "7.900,50" -> "7900.50"
  if (valorStr.includes(',') && valorStr.includes('.')) {
    // Tiene ambos: determinar cuál es el decimal (el último)
    const ultimoPunto = valorStr.lastIndexOf('.');
    const ultimaComa = valorStr.lastIndexOf(',');
    
    if (ultimaComa > ultimoPunto) {
      // La coma es el decimal: "7.900,50"
      valorStr = valorStr.replace(/\./g, '').replace(',', '.');
    } else {
      // El punto es el decimal: "7,900.50"
      valorStr = valorStr.replace(/,/g, '');
    }
  } else if (valorStr.includes(',')) {
    // Solo tiene coma: puede ser decimal o separador de miles
    const partes = valorStr.split(',');
    if (partes[partes.length - 1].length <= 2) {
      // La coma es decimal: "7900,50"
      valorStr = valorStr.replace(',', '.');
    } else {
      // La coma es separador de miles: "7,900"
      valorStr = valorStr.replace(/,/g, '');
    }
  } else if (valorStr.includes('.')) {
    // Solo tiene punto: puede ser decimal o separador de miles
    const partes = valorStr.split('.');
    if (partes[partes.length - 1].length <= 2 && partes.length === 2) {
      // El punto es decimal: "7900.50"
      // Ya está en formato correcto
    } else {
      // El punto es separador de miles: "7.900"
      valorStr = valorStr.replace(/\./g, '');
    }
  }
  
  const numero = parseFloat(valorStr);
  return isNaN(numero) ? null : numero;
};

const aplicarOperacionExcel = async () => {
  if (datosExcelProcesados.value.length === 0) return;

  const cantidad = datosExcelProcesados.value.length;
  
  // Modo ELIMINAR
  if (modoExcel.value === 'eliminar') {
    const mensaje = `¿Está seguro que desea eliminar ${cantidad} registros de clientes con descuentos? Esta acción no se puede deshacer.`;

    if (!confirm(mensaje)) return;

    procesandoExcel.value = true;
    mostrandoCarga.value = true;
    errorExcel.value = null;

    try {
      await clientesPreciosService.deletePreciosEspecialesCliente(datosExcelProcesados.value);
      alert(`✓ ${cantidad} registros eliminados correctamente`);

      // Cerrar modal y recargar datos
      cerrarModalExcel();
      await cargarClientes({ page: paginacion.value?.current_page || 1 });

    } catch (err) {
      console.error('Error al eliminar:', err);
      errorExcel.value = err.message || 'Error al procesar la operación';
      alert('❌ Error: ' + errorExcel.value);
    } finally {
      procesandoExcel.value = false;
      mostrandoCarga.value = false;
    }
    return;
  }

  // Modo MODIFICAR - Enviar directamente al backend
  const mensaje = `¿Está seguro que desea modificar ${cantidad} precios especiales?`;
  if (!confirm(mensaje)) return;

  procesandoExcel.value = true;
  mostrandoCarga.value = true;
  errorExcel.value = null;

  try {
    // Preparar datos para enviar al backend
    const preciosParaActualizar = datosExcelProcesados.value.map(item => ({
      nrocta: parseInt(item.nrocta),
      producto_id: item.producto_id,
      precio_especial: item.precio_especial
    }));

    console.log('Enviando precios al backend:', preciosParaActualizar);

    await clientesPreciosService.setPreciosEspecialesCliente(preciosParaActualizar);

    alert(`✓ ${cantidad} precios especiales actualizados correctamente`);

    // Cerrar modal y recargar datos
    cerrarModalExcel();
    await cargarClientes({ page: paginacion.value?.current_page || 1 });

  } catch (err) {
    console.error('Error al actualizar precios:', err);
    errorExcel.value = err.message || 'Error al actualizar precios';
    alert('❌ Error: ' + errorExcel.value);
  } finally {
    procesandoExcel.value = false;
    mostrandoCarga.value = false;
  }
};

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

// Función para eliminar un cliente individual
const eliminarClienteIndividual = async (nrocta, producto_id) => {
  if (!confirm(`¿Está seguro que desea eliminar el precio especial del cliente ${nrocta} para el producto ${producto_id}?`)) {
    return;
  }

  cargando.value = true;

  try {
    // Crear array con un solo registro
    const registros = [{
      nrocta: String(nrocta),
      producto_id: String(producto_id)
    }];

    await clientesPreciosService.deletePreciosEspecialesCliente(registros);

    alert('✓ Precio especial eliminado correctamente');

    // Recargar datos
    await cargarClientes({ page: paginacion.value?.current_page || 1 });

  } catch (err) {
    console.error('Error al eliminar precio especial:', err);
    alert('❌ Error: ' + (err.message || 'Error al eliminar el precio especial'));
  } finally {
    cargando.value = false;
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
    
    if (response.data && response.data.length > 0) {
      console.log('Datos crudos de clientes (primer elemento):', response.data[0]);
      console.log('Todas las claves del primer cliente:', Object.keys(response.data[0]));
    }
    
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

/* Transiciones del modal */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active > div, .modal-leave-active > div {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div, .modal-leave-to > div {
  transform: scale(0.95) translateY(-20px);
  opacity: 0;
}

/* Transición del loading */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
