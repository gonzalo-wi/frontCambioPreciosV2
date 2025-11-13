<template>
  <div class="min-h-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative">
    <!-- Ola de fondo inferior -->
    <div class="fixed bottom-0 left-0 w-full overflow-hidden z-10 pointer-events-none">
      <!-- Ola principal más fuerte y visible -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full h-auto wave-animation">
        <path fill="#3b82f6" fill-opacity="0.4" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,122.7C960,149,1056,203,1152,202.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
      <!-- Ola secundaria para profundidad -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full h-auto wave-animation-slow absolute bottom-0" style="animation-delay: -3s;">
        <path fill="#2563eb" fill-opacity="0.25" d="M0,160L48,144C96,128,192,96,288,112C384,128,480,192,576,192C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>
    
    <!-- Contenido principal -->
    <div class="relative z-20 p-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <div>
          <h1 class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-2">
            Listas de Precios
          </h1>
          <p class="text-gray-600 text-lg">Gestiona y visualiza todas las listas de precios disponibles</p>
        </div>
      </div>
      <div class="mt-6 sm:mt-0 flex space-x-3">
        <button 
          @click="abrirModalImportar"
          class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
          </svg>
          Importar Excel
        </button>
        <button 
          @click="abrirModalExportar"
          class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Exportar Excel
        </button>
        <button class="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105">
          <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Nueva Lista
        </button>
      </div>
    </div>

    <!-- Barra de búsqueda mejorada -->
    <div class="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100 card-shadow">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="relative flex-grow">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            v-model="busqueda"
            type="text"
            placeholder="Buscar por nombre o ID de lista..."
            class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
            @input="filtrarListas"
          />
          <div v-if="busqueda" class="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              @click="busqueda = ''; filtrarListas()"
              class="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="flex space-x-3">
          <button
            @click="cargarListas"
            :disabled="loading"
            class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-all duration-200 min-w-[120px]"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" :class="{'animate-spin': loading}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.01M20 20v-5h-.01M4 20h5v-.01M20 4h-5v.01" />
            </svg>
            <span v-if="loading">Cargando...</span>
            <span v-else>Actualizar</span>
          </button>
          <button class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200">
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"/>
            </svg>
            Filtros
          </button>
        </div>
      </div>
      
      <!-- Información de búsqueda -->
      <div v-if="busqueda" class="mt-4 flex items-center text-sm text-gray-600">
        <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>
          {{ totalItems }} resultado{{ totalItems !== 1 ? 's' : '' }} para 
          <span class="font-medium text-gray-900">"{{ busqueda }}"</span>
        </span>
      </div>
    </div>

    <!-- Loading State mejorado -->
    <div v-if="loading" class="flex flex-col justify-center items-center py-16 bg-white rounded-xl shadow-lg card-shadow">
      <div class="relative">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent absolute top-0 left-0"></div>
      </div>
      <div class="mt-6 text-center">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Cargando listas de precios</h3>
        <p class="text-gray-600">Por favor espera mientras obtenemos los datos...</p>
      </div>
      <div class="mt-4 flex space-x-1">
        <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
        <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
        <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
      </div>
    </div>

    <!-- Error State mejorado -->
    <div v-else-if="error" class="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 rounded-xl p-6 mb-6 shadow-lg">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="ml-4 flex-1">
          <h3 class="text-lg font-semibold text-red-800 mb-2">Error al cargar los datos</h3>
          <div class="text-red-700 mb-4">
            <p>{{ error }}</p>
          </div>
          <div class="flex space-x-3">
            <button
              @click="cargarListas"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
            >
              <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.01M20 20v-5h-.01M4 20h5v-.01M20 4h-5v.01"/>
              </svg>
              Reintentar
            </button>
            <button
              @click="error = null"
              class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla de listas -->
    <div v-else-if="listasFiltradas.length > 0" class="bg-white rounded-xl shadow-xl overflow-hidden card-shadow">
      <!-- Información de resultados -->
      <div class="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-700">
            Mostrando <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> 
            a <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalItems) }}</span> 
            de <span class="font-medium">{{ totalItems }}</span> resultados
          </div>
          <div class="text-sm text-gray-500">
            Página {{ currentPage }} de {{ totalPages }}
          </div>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div class="flex items-center space-x-1">
                  <span>ID Lista</span>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v8l-5-4h10l-5 4V4zm0 16v-8l5 4H2l5-4v8z"/>
                  </svg>
                </div>
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div class="flex items-center space-x-1">
                  <span>Nombre</span>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div class="flex items-center space-x-1">
                  <span>Productos</span>
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
              </th>
              <th class="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr v-for="(lista, index) in listasPaginadas" :key="lista.idListaPrecios" 
                class="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                    {{ index + 1 + (currentPage - 1) * itemsPerPage }}
                  </div>
                  <div class="text-sm font-bold text-gray-900 font-mono">
                    {{ lista.idListaPrecios }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ lista.descripcion }}</div>
                <div class="text-xs text-gray-500 mt-1">Lista de precios actual</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                    {{ lista.items.length }} productos
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="verDetalles(lista)"
                    class="inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 group-hover:shadow-md"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    Ver detalles
                  </button>
                  <button
                    @click="exportarLista(lista)"
                    class="inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 group-hover:shadow-md"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                    </svg>
                    Exportar
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Paginación -->
      <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex-1 flex justify-between sm:hidden">
            <!-- Paginación móvil -->
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Mostrando
                <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
                a
                <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalItems) }}</span>
                de
                <span class="font-medium">{{ totalItems }}</span>
                resultados
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <!-- Botón anterior -->
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <span class="sr-only">Anterior</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                
                <!-- Números de página -->
                <template v-for="page in totalPages" :key="page">
                  <button
                    v-if="page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)"
                    @click="goToPage(page)"
                    :class="[
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-all duration-200',
                      page === currentPage
                        ? 'z-10 bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 text-white shadow-lg'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:border-gray-400'
                    ]"
                  >
                    {{ page }}
                  </button>
                  <span
                    v-else-if="page === currentPage - 3 || page === currentPage + 3"
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  >
                    ...
                  </span>
                </template>
                
                <!-- Botón siguiente -->
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <span class="sr-only">Siguiente</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State mejorado -->
    <div v-else class="text-center py-16 bg-white rounded-xl shadow-lg card-shadow">
      <div class="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
        <svg class="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">No se encontraron listas de precios</h3>
      <p class="text-gray-500 mb-8 max-w-md mx-auto">
        {{ busqueda ? 'No hay resultados para tu búsqueda. Intenta con otros términos.' : 'Parece que aún no hay listas de precios disponibles.' }}
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          v-if="busqueda"
          @click="busqueda = ''; filtrarListas()"
          class="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
          Limpiar búsqueda
        </button>
        <button
          @click="cargarListas"
          class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.01M20 20v-5h-.01M4 20h5v-.01M20 4h-5v.01"/>
          </svg>
          Actualizar listas
        </button>
      </div>
    </div>

    <!-- Modal de detalles -->
    <div
      v-if="listaSeleccionada"
      class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4 modal-backdrop"
      @click.self="cerrarModal"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col card-shadow">
        <!-- Header del modal -->
        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 class="text-xl font-semibold text-gray-900">{{ listaSeleccionada.descripcion }}</h3>
            <p class="text-sm text-gray-500">ID: {{ listaSeleccionada.idListaPrecios }}</p>
          </div>
          <button
            @click="cerrarModal"
            class="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Contenido del modal -->
        <div class="p-6 flex-1 overflow-hidden flex flex-col">
          <!-- Barra de búsqueda del modal -->
          <div class="mb-4">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                v-model="busquedaModal"
                type="text"
                placeholder="Buscar producto en esta lista..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Tabla de productos -->
          <div class="flex-1 overflow-auto border border-gray-200 rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50 sticky top-0">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Producto
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in itemsFiltradosModal" :key="item.idProducto" 
                    :class="{'bg-blue-50': tienePrecioEditado(item.idProducto), 'hover:bg-gray-50': !tienePrecioEditado(item.idProducto)}">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">
                    {{ item.idProducto }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900">
                    {{ item.productoDescripcion || 'Sin descripción' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div class="flex items-center justify-end gap-2">
                      <span class="text-gray-500">$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        :value="obtenerPrecioMostrar(item)"
                        @input="(e) => actualizarPrecio(item.idProducto, e.target.value)"
                        class="w-32 px-2 py-1 text-right border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        :class="{
                          'border-blue-400 bg-blue-50 font-medium text-blue-900': tienePrecioEditado(item.idProducto),
                          'border-gray-300': !tienePrecioEditado(item.idProducto)
                        }"
                      />
                      <span v-if="tienePrecioEditado(item.idProducto)" class="text-blue-600">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr v-if="itemsFiltradosModal.length === 0">
                  <td colspan="3" class="text-center py-8 text-gray-500">
                    <svg class="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    No se encontraron productos.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Footer del modal -->
        <div class="p-6 bg-gray-50 border-t border-gray-200">
          <!-- Mensaje de éxito/error -->
          <div v-if="mensajeModal" class="mb-4 p-3 rounded-lg flex items-center gap-2"
               :class="{
                 'bg-green-100 text-green-800 border border-green-300': mensajeModal.tipo === 'success',
                 'bg-red-100 text-red-800 border border-red-300': mensajeModal.tipo === 'error'
               }">
            <svg v-if="mensajeModal.tipo === 'success'" class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm font-medium">{{ mensajeModal.texto }}</span>
          </div>

          <div class="flex justify-between items-center">
            <div class="flex items-center gap-4">
              <p class="text-sm text-gray-600">
                Total de productos: <span class="font-medium">{{ itemsFiltradosModal.length }}</span>
              </p>
              <p v-if="hayCambiosSinGuardar" class="text-sm text-blue-600 font-medium flex items-center gap-1">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                </svg>
                {{ preciosEditados.size }} precio{{ preciosEditados.size !== 1 ? 's' : '' }} modificado{{ preciosEditados.size !== 1 ? 's' : '' }}
              </p>
            </div>
            <div class="flex gap-3">
              <button
                @click="cerrarModal"
                class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                :disabled="guardandoCambios"
              >
                Cerrar
              </button>
              <button
                v-if="hayCambiosSinGuardar"
                @click="guardarCambios"
                :disabled="guardandoCambios"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                <svg v-if="!guardandoCambios" class="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
                </svg>
                <svg v-else class="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ guardandoCambios ? 'Guardando...' : 'Guardar Cambios' }}
              </button>
              <button
                @click="exportarLista(listaSeleccionada)"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                :disabled="guardandoCambios"
              >
                <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Exportar CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de exportación a Excel -->
    <div v-if="mostrarModalExportar" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div class="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden" @click.stop>
        <!-- Header del modal -->
        <div class="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 p-6 z-10">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-white">Exportar a Excel</h3>
                <p class="text-green-100 text-sm mt-1">Selecciona las listas que deseas exportar</p>
              </div>
            </div>
            <button
              @click="cerrarModalExportar"
              class="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Contenido del modal -->
        <div class="p-6 overflow-y-auto" style="max-height: calc(90vh - 180px);">
          <!-- Barra de búsqueda -->
          <div class="mb-4">
            <div class="relative">
              <input
                v-model="busquedaExportar"
                type="text"
                placeholder="Buscar lista..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <svg class="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>

          <!-- Selectores -->
          <div class="mb-4 flex items-center justify-between">
            <button
              @click="seleccionarTodas"
              class="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              Seleccionar todas
            </button>
            <button
              @click="deseleccionarTodas"
              class="text-sm text-gray-600 hover:text-gray-700 font-medium"
            >
              Deseleccionar todas
            </button>
          </div>

          <!-- Lista de checkboxes -->
          <div class="space-y-2 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
            <div
              v-for="lista in listasFiltradasExportar"
              :key="lista.idListaPrecios"
              class="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              @click="toggleListaSeleccionada(lista.idListaPrecios)"
            >
              <input
                type="checkbox"
                :checked="listasSeleccionadasExportar.includes(lista.idListaPrecios)"
                @click.stop
                @change="toggleListaSeleccionada(lista.idListaPrecios)"
                class="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
              />
              <label class="ml-3 flex-1 cursor-pointer">
                <div class="text-sm font-medium text-gray-900">{{ lista.descripcion }}</div>
                <div class="text-xs text-gray-500">ID: {{ lista.idListaPrecios }} • {{ lista.items.length }} productos</div>
              </label>
            </div>
            <div v-if="listasFiltradasExportar.length === 0" class="text-center py-8 text-gray-500">
              No se encontraron listas
            </div>
          </div>

          <!-- Contador de selección -->
          <div class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-center justify-between text-sm">
              <span class="text-green-800 font-medium">
                {{ listasSeleccionadasExportar.length }} lista(s) seleccionada(s)
              </span>
              <span class="text-green-600">
                {{ totalProductosSeleccionados }} productos en total
              </span>
            </div>
          </div>
        </div>

        <!-- Footer del modal -->
        <div class="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            @click="cerrarModalExportar"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="exportarListasSeleccionadas"
            :disabled="listasSeleccionadasExportar.length === 0 || exportandoExcel"
            class="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
          >
            <svg v-if="exportandoExcel" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span>{{ exportandoExcel ? 'Exportando...' : 'Exportar Excel' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de importación Excel -->
    <div v-if="mostrarModalImportar" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div class="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden" @click.stop>
        <!-- Header del modal -->
        <div class="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 z-10">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-white">Importar Excel</h3>
                <p class="text-blue-100 text-sm mt-1">Sube un archivo Excel con los cambios de precios</p>
              </div>
            </div>
            <button
              @click="cerrarModalImportar"
              class="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-all duration-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Contenido del modal -->
        <div class="p-6 overflow-y-auto" style="max-height: calc(90vh - 180px);">
          <!-- Zona de carga de archivo -->
          <div v-if="!archivoExcelCargado" class="mb-6">
            <div 
              @click="triggerFileInput"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="handleFileDrop"
              :class="[
                'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all',
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              ]"
            >
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              <p class="mt-2 text-sm text-gray-600">
                <span class="font-semibold text-blue-600">Click para seleccionar</span> o arrastra el archivo aquí
              </p>
              <p class="mt-1 text-xs text-gray-500">Archivos Excel (.xlsx, .xls) - Máximo 10MB</p>
              <input
                ref="fileInput"
                type="file"
                accept=".xlsx,.xls"
                @change="handleFileSelect"
                class="hidden"
              />
            </div>
          </div>

          <!-- Información del archivo cargado -->
          <div v-if="archivoExcelCargado && !procesandoExcel" class="mb-6">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-blue-900">{{ archivoExcel?.name }}</p>
                  <p class="text-xs text-blue-600">{{ formatearTamaño(archivoExcel?.size) }}</p>
                </div>
              </div>
              <button
                @click="limpiarArchivo"
                class="text-blue-600 hover:text-blue-800"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Progreso de procesamiento -->
          <div v-if="procesandoExcel" class="mb-6">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <svg class="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-lg font-semibold text-blue-900">Procesando archivo...</p>
              <p class="text-sm text-blue-600 mt-2">{{ progresoSubida }}%</p>
            </div>
          </div>

          <!-- Resultados del procesamiento -->
          <div v-if="resultadoProcesamiento" class="space-y-4">
            
            <!-- DEBUG: Mostrar JSON completo -->
            <div class="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
              <details>
                <summary class="cursor-pointer font-semibold text-yellow-900 mb-2">
                  🔍 Ver JSON completo del backend (debug)
                </summary>
                <div class="mt-3 bg-white rounded p-3 overflow-auto max-h-96 border border-yellow-200">
                  <pre class="text-xs text-gray-800 whitespace-pre-wrap">{{ JSON.stringify(resultadoProcesamiento, null, 2) }}</pre>
                </div>
              </details>
            </div>
            
            <!-- Resumen general -->
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <h4 class="text-lg font-semibold text-green-900">✅ {{ resultadoProcesamiento.message }}</h4>
                  <p class="text-sm text-green-700 mt-1">Los cambios de precios han sido aplicados exitosamente en la base de datos.</p>
                  <div class="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p class="text-xs text-green-600">Archivo</p>
                      <p class="text-sm font-medium text-green-900">{{ resultadoProcesamiento.file_info.original_name }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-green-600">Tamaño</p>
                      <p class="text-sm font-medium text-green-900">{{ resultadoProcesamiento.file_info.size_mb }} MB</p>
                    </div>
                    <div>
                      <p class="text-xs text-green-600">Total Hojas</p>
                      <p class="text-sm font-medium text-green-900">{{ resultadoProcesamiento.total_sheets }}</p>
                    </div>
                    <div>
                      <p class="text-xs text-green-600">Hojas Procesadas</p>
                      <p class="text-sm font-medium text-green-900">{{ resultadoProcesamiento.processed_sheets }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lista de hojas procesadas -->
            <div class="border border-gray-200 rounded-lg overflow-hidden">
              <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h5 class="text-sm font-semibold text-gray-900">Hojas Procesadas ({{ resultadoProcesamiento.available_sheets?.length || 0 }})</h5>
                <p class="text-xs text-gray-500 mt-1">Debug: sheets = {{ Object.keys(resultadoProcesamiento.sheets || {}).length }} hojas</p>
              </div>
              
              <!-- Debug: mostrar si hay sheets -->
              <div v-if="!resultadoProcesamiento.sheets || Object.keys(resultadoProcesamiento.sheets).length === 0" class="p-4 text-center text-gray-500">
                <p class="mb-2">⚠️ No se encontraron hojas procesadas</p>
                <details class="text-left text-xs">
                  <summary class="cursor-pointer text-blue-600">Ver datos completos</summary>
                  <pre class="mt-2 p-2 bg-gray-100 rounded overflow-auto">{{ JSON.stringify(resultadoProcesamiento, null, 2) }}</pre>
                </details>
              </div>
              
              <div class="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                <div
                  v-for="(sheetData, sheetName) in resultadoProcesamiento.sheets"
                  :key="sheetName"
                  class="p-4 hover:bg-gray-50 transition-colors"
                >
                  <!-- Debug info -->
                  <div class="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                    <p><strong>Sheet:</strong> {{ sheetName }}</p>
                    <p><strong>Data array length:</strong> {{ sheetData.data?.length || 0 }}</p>
                    <p><strong>Primer elemento:</strong> {{ JSON.stringify(sheetData.data?.[0]) }}</p>
                  </div>
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center space-x-2">
                        <h6 class="text-sm font-semibold text-gray-900">{{ sheetData.sheet_name }}</h6>
                        <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {{ sheetData.total_rows }} filas
                        </span>
                      </div>
                      <div class="mt-2 flex flex-wrap gap-1">
                        <span
                          v-for="header in sheetData.headers"
                          :key="header"
                          class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          {{ header }}
                        </span>
                      </div>
                    </div>
                    <button
                      @click="verDetallesHoja(sheetName)"
                      class="ml-4 text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Ver datos
                    </button>
                  </div>

                  <!-- Vista previa de datos (colapsable) -->
                  <div v-if="hojaExpandida === sheetName" class="mt-3 border-t border-gray-200 pt-3">
                    <div class="bg-gray-50 rounded-lg p-3 overflow-x-auto max-h-[600px] overflow-y-auto">
                      <table class="min-w-full text-xs border-collapse">
                        <thead class="sticky top-0 bg-gray-200 z-10">
                          <tr class="bg-gray-200">
                            <th class="px-3 py-2 text-left font-semibold text-gray-700 border border-gray-300">#</th>
                            <th class="px-3 py-2 text-left font-semibold text-gray-700 border border-gray-300">ID Lista</th>
                            <th class="px-3 py-2 text-left font-semibold text-gray-700 border border-gray-300">Código</th>
                            <th class="px-3 py-2 text-left font-semibold text-gray-700 border border-gray-300">Descripción</th>
                            <th class="px-3 py-2 text-right font-semibold text-gray-700 border border-gray-300">Precio Actual</th>
                            <th class="px-3 py-2 text-right font-semibold text-gray-700 border border-gray-300">Precio Nuevo (Editable)</th>
                            <th class="px-3 py-2 text-right font-semibold text-gray-700 border border-gray-300">% Aumento</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(row, index) in sheetData.data" :key="index" class="hover:bg-gray-100">
                            <td class="px-3 py-2 text-gray-600 border border-gray-300">{{ index + 1 }}</td>
                            <td class="px-3 py-2 text-gray-900 border border-gray-300 font-medium">{{ row.idLista }}</td>
                            <td class="px-3 py-2 text-gray-900 border border-gray-300">{{ row.codProducto }}</td>
                            <td class="px-3 py-2 text-gray-700 border border-gray-300">{{ row.descripcion }}</td>
                            <td class="px-3 py-2 text-right text-gray-900 border border-gray-300 font-mono">
                              ${{ formatearPrecioTabla(row.precio_actual) }}
                            </td>
                            <td class="px-2 py-1 text-right border border-gray-300">
                              <input
                                type="number"
                                v-model="row.redondeo"
                                @input="marcarCambioEnFila(sheetName, index)"
                                step="0.01"
                                class="w-full px-2 py-1 text-right font-mono border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                :class="row.redondeo && row.redondeo !== '' && row.redondeo !== '0' ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-400'"
                              />
                            </td>
                            <td class="px-3 py-2 text-right border border-gray-300 font-mono" :class="getColorPorcentajeTabla(row['%Aumento'])">
                              {{ formatearPorcentajeTabla(row['%Aumento']) }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-center">
                        <p class="text-sm text-blue-800 font-medium">
                          Total: {{ sheetData.data.length }} productos
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mensajes de error -->
          <div v-if="errorImportacion" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex items-start space-x-3">
              <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-red-900">Error al procesar el archivo</h4>
                <p class="text-sm text-red-700 mt-1">{{ errorImportacion }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer del modal -->
        <div class="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            @click="cerrarModalImportar"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cerrar
          </button>
          <button
            v-if="archivoExcelCargado && !resultadoProcesamiento"
            @click="procesarExcel"
            :disabled="procesandoExcel"
            class="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
          >
            <svg v-if="procesandoExcel" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ procesandoExcel ? 'Procesando...' : 'Procesar Archivo' }}</span>
          </button>
          <button
            v-if="resultadoProcesamiento"
            @click="aplicarCambios"
            :disabled="conteoCambiosValidos === 0 || procesandoExcel"
            class="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>Aplicar Cambios ({{ conteoCambiosValidos }})</span>
          </button>
        </div>
      </div>
    </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { listaDePrecioService } from '../services/listaDePrecioService.js';
import { cambiarListaService } from '../services/cambiarListaService.js';
import * as XLSX from 'xlsx';

// Estado reactivo
const listas = ref([]);
const loading = ref(false);
const error = ref(null);
const busqueda = ref('');
const busquedaModal = ref('');
const listaSeleccionada = ref(null);

// Estado para edición de precios
const preciosEditados = ref(new Map()); // Map<idProducto, nuevoPrecio>
const guardandoCambios = ref(false);
const mensajeModal = ref(null); // { tipo: 'success' | 'error', texto: '' }

// Estados para exportación
const mostrarModalExportar = ref(false);
const listasSeleccionadasExportar = ref([]);
const busquedaExportar = ref('');
const exportandoExcel = ref(false);

// Estados para importación
const mostrarModalImportar = ref(false);
const archivoExcel = ref(null);
const archivoExcelCargado = ref(false);
const procesandoExcel = ref(false);
const progresoSubida = ref(0);
const resultadoProcesamiento = ref(null);
const errorImportacion = ref(null);
const isDragging = ref(false);
const hojaExpandida = ref(null);
const fileInput = ref(null);

// Variables de paginación
const currentPage = ref(1);
const itemsPerPage = 15;

// Computed para filtrado
const listasFiltradas = computed(() => {
  if (!busqueda.value.trim()) {
    return listas.value;
  }
  
  const searchTerm = busqueda.value.toLowerCase();
  return listas.value.filter(lista =>
    lista.descripcion.toLowerCase().includes(searchTerm) ||
    lista.idListaPrecios.toLowerCase().includes(searchTerm)
  );
});

// Computed para paginación
const totalPages = computed(() => {
  return Math.ceil(listasFiltradas.value.length / itemsPerPage);
});

const listasPaginadas = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return listasFiltradas.value.slice(start, end);
});

const totalItems = computed(() => listasFiltradas.value.length);

// Computed para items filtrados del modal
const itemsFiltradosModal = computed(() => {
  if (!listaSeleccionada.value || !listaSeleccionada.value.items) return [];
  
  if (!busquedaModal.value.trim()) {
    return listaSeleccionada.value.items;
  }
  
  const searchTerm = busquedaModal.value.toLowerCase();
  return listaSeleccionada.value.items.filter(item =>
    item.idProducto.toLowerCase().includes(searchTerm) ||
    (item.productoDescripcion && item.productoDescripcion.toLowerCase().includes(searchTerm))
  );
});

// Computed para listas filtradas en modal de exportación
const listasFiltradasExportar = computed(() => {
  if (!busquedaExportar.value.trim()) {
    return listas.value;
  }
  
  const searchTerm = busquedaExportar.value.toLowerCase();
  return listas.value.filter(lista =>
    lista.descripcion.toLowerCase().includes(searchTerm) ||
    lista.idListaPrecios.toLowerCase().includes(searchTerm)
  );
});

// Computed para total de productos seleccionados
const totalProductosSeleccionados = computed(() => {
  return listasSeleccionadasExportar.value.reduce((total, idLista) => {
    const lista = listas.value.find(l => l.idListaPrecios === idLista);
    return total + (lista ? lista.items.length : 0);
  }, 0);
});

// Funciones de paginación
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Reset página cuando se busca
watch(busqueda, () => {
  currentPage.value = 1;
});

// Métodos
const cargarListas = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    listas.value = await listaDePrecioService.getListasDePrecios();
  } catch (err) {
    error.value = err.message;
    console.error('Error al cargar listas:', err);
  } finally {
    loading.value = false;
  }
};

const filtrarListas = () => {
  // La lógica de filtrado está en el computed
  currentPage.value = 1; // Reset página al filtrar
};

const verDetalles = (lista) => {
  listaSeleccionada.value = lista;
  busquedaModal.value = '';
  preciosEditados.value.clear();
  mensajeModal.value = null;
};

const cerrarModal = () => {
  listaSeleccionada.value = null;
  preciosEditados.value.clear();
  mensajeModal.value = null;
};

// Función para actualizar precio editado
const actualizarPrecio = (idProducto, nuevoPrecio) => {
  if (nuevoPrecio === '' || nuevoPrecio === null) {
    preciosEditados.value.delete(idProducto);
  } else {
    preciosEditados.value.set(idProducto, parseFloat(nuevoPrecio));
  }
};

// Función para obtener precio a mostrar (editado o original)
const obtenerPrecioMostrar = (item) => {
  return preciosEditados.value.has(item.idProducto) 
    ? preciosEditados.value.get(item.idProducto) 
    : item.precio;
};

// Función para verificar si un producto tiene precio editado
const tienePrecioEditado = (idProducto) => {
  return preciosEditados.value.has(idProducto);
};

// Función para guardar cambios
const guardarCambios = async () => {
  if (preciosEditados.value.size === 0) {
    mensajeModal.value = {
      tipo: 'error',
      texto: 'No hay cambios para guardar'
    };
    setTimeout(() => { mensajeModal.value = null; }, 3000);
    return;
  }

  guardandoCambios.value = true;
  mensajeModal.value = null;

  try {
    // Preparar array de productos con precios editados
    // Incluir precio_anterior según la documentación de la API
    const productos = Array.from(preciosEditados.value.entries()).map(([idProducto, precio]) => {
      // Buscar el producto en la lista para obtener el precio anterior
      const item = listaSeleccionada.value.items.find(i => i.idProducto === idProducto);
      const precioAnterior = item ? parseFloat(item.precio) : 0;
      
      const productoData = {
        lista_id: String(listaSeleccionada.value.idListaPrecios),
        producto_id: String(idProducto),
        precio: parseFloat(precio),
        precio_anterior: precioAnterior
      };
      
      console.log('Producto individual:', productoData);
      return productoData;
    });

    console.log('Lista seleccionada ID:', listaSeleccionada.value.idListaPrecios);
    console.log('Productos a enviar:', productos);
    console.log('Total de productos:', productos.length);

    const response = await cambiarListaService.setPreciosProductos(productos);

    if (response.success) {
      mensajeModal.value = {
        tipo: 'success',
        texto: response.mensaje || `Se actualizaron ${productos.length} precios correctamente`
      };

      // Actualizar los precios en la lista local
      productos.forEach(({ producto_id, precio }) => {
        const item = listaSeleccionada.value.items.find(i => i.idProducto === producto_id);
        if (item) {
          item.precio = precio;
        }
      });

      // Limpiar ediciones
      preciosEditados.value.clear();

      // Recargar listas para mantener sincronizado
      setTimeout(() => {
        cargarListas();
      }, 1000);
    } else {
      mensajeModal.value = {
        tipo: 'error',
        texto: response.error || 'Error al guardar los cambios'
      };
    }
  } catch (err) {
    console.error('Error al guardar cambios:', err);
    mensajeModal.value = {
      tipo: 'error',
      texto: err.message || 'Error al guardar los cambios'
    };
  } finally {
    guardandoCambios.value = false;
  }
};

// Computed para saber si hay cambios sin guardar
const hayCambiosSinGuardar = computed(() => {
  return preciosEditados.value.size > 0;
});

const exportarLista = (lista) => {
  // Crear CSV con descripción del producto
  const csvContent = [
    ['ID Producto', 'Descripción', 'Precio'],
    ...lista.items.map(item => [
      item.idProducto, 
      item.productoDescripcion || 'Sin descripción', 
      item.precio
    ])
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `lista_precios_${lista.idListaPrecios}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Funciones para el modal de exportación
const abrirModalExportar = () => {
  mostrarModalExportar.value = true;
  listasSeleccionadasExportar.value = [];
  busquedaExportar.value = '';
};

const cerrarModalExportar = () => {
  mostrarModalExportar.value = false;
  listasSeleccionadasExportar.value = [];
  busquedaExportar.value = '';
};

const toggleListaSeleccionada = (idLista) => {
  const index = listasSeleccionadasExportar.value.indexOf(idLista);
  if (index === -1) {
    listasSeleccionadasExportar.value.push(idLista);
  } else {
    listasSeleccionadasExportar.value.splice(index, 1);
  }
};

const seleccionarTodas = () => {
  listasSeleccionadasExportar.value = listasFiltradasExportar.value.map(l => l.idListaPrecios);
};

const deseleccionarTodas = () => {
  listasSeleccionadasExportar.value = [];
};

const exportarListasSeleccionadas = async () => {
  if (listasSeleccionadasExportar.value.length === 0) return;
  
  exportandoExcel.value = true;
  
  try {
    // Crear un nuevo workbook
    const wb = XLSX.utils.book_new();
    
    // Por cada lista seleccionada, crear una hoja
    for (const idLista of listasSeleccionadasExportar.value) {
      const lista = listas.value.find(l => l.idListaPrecios === idLista);
      if (!lista) continue;
      
      // Preparar los datos según la estructura solicitada
      const data = [];
      
      // Encabezados
      data.push(['idLista', 'codProducto', 'descripcion', 'precio_actual', 'redondeo', '%Aumento']);
      
      // Datos de cada producto
      lista.items.forEach(item => {
        data.push([
          lista.idListaPrecios,
          item.idProducto,
          item.productoDescripcion || '',
          parseFloat(item.precio),
          '', // redondeo vacío
          '' // %Aumento vacío
        ]);
      });
      
      // Crear la hoja
      const ws = XLSX.utils.aoa_to_sheet(data);
      
      // Ajustar anchos de columna
      ws['!cols'] = [
        { wch: 10 }, // idLista
        { wch: 15 }, // codProducto
        { wch: 40 }, // descripcion
        { wch: 12 }, // precio_actual
        { wch: 10 }, // redondeo
        { wch: 10 }  // %Aumento
      ];
      
      // Nombre de la hoja (máximo 31 caracteres para Excel)
      const nombreHoja = lista.descripcion.substring(0, 31);
      
      // Agregar la hoja al workbook
      XLSX.utils.book_append_sheet(wb, ws, nombreHoja);
    }
    
    // Generar el archivo Excel
    const fecha = new Date().toISOString().split('T')[0];
    const nombreArchivo = `listas_precios_${fecha}.xlsx`;
    XLSX.writeFile(wb, nombreArchivo);
    
    // Cerrar modal
    cerrarModalExportar();
    
  } catch (err) {
    console.error('Error al exportar:', err);
    alert('Error al exportar el archivo Excel');
  } finally {
    exportandoExcel.value = false;
  }
};

const formatearPrecio = (precio) => {
  return new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3
  }).format(parseFloat(precio));
};

// Funciones para la importación de Excel
const abrirModalImportar = () => {
  mostrarModalImportar.value = true;
  limpiarArchivo();
};

const cerrarModalImportar = () => {
  mostrarModalImportar.value = false;
  limpiarArchivo();
};

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    validarYCargarArchivo(file);
  }
};

const handleFileDrop = (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file) {
    validarYCargarArchivo(file);
  }
};

const validarYCargarArchivo = (file) => {
  // Validar que sea Excel
  const extensionesValidas = ['.xlsx', '.xls'];
  const extension = '.' + file.name.split('.').pop().toLowerCase();
  
  if (!extensionesValidas.includes(extension)) {
    errorImportacion.value = 'El archivo debe ser un Excel (.xlsx o .xls)';
    return;
  }
  
  // Validar tamaño (máximo 10MB)
  if (file.size > 10 * 1024 * 1024) {
    errorImportacion.value = 'El archivo es demasiado grande (máximo 10MB)';
    return;
  }
  
  // Archivo válido
  archivoExcel.value = file;
  archivoExcelCargado.value = true;
  errorImportacion.value = null;
};

const limpiarArchivo = () => {
  archivoExcel.value = null;
  archivoExcelCargado.value = false;
  procesandoExcel.value = false;
  progresoSubida.value = 0;
  resultadoProcesamiento.value = null;
  errorImportacion.value = null;
  hojaExpandida.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const formatearTamaño = (bytes) => {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const procesarExcel = async () => {
  if (!archivoExcel.value) return;
  
  procesandoExcel.value = true;
  errorImportacion.value = null;
  progresoSubida.value = 0;
  
  try {
    // Callback para el progreso
    const onProgress = (progress) => {
      progresoSubida.value = progress;
    };
    
    // Enviar archivo al backend
    const resultado = await cambiarListaService.subirExcel(
      archivoExcel.value,
      { hasHeader: true }, // opciones
      onProgress
    );
    
    console.log('Resultado completo del backend:', JSON.stringify(resultado, null, 2));
    
    if (resultado.success) {
      resultadoProcesamiento.value = resultado.data;
      console.log('Datos asignados a resultadoProcesamiento:', resultadoProcesamiento.value);
      console.log('¿Tiene sheets?', resultadoProcesamiento.value?.sheets);
      console.log('¿Tiene available_sheets?', resultadoProcesamiento.value?.available_sheets);
    } else {
      errorImportacion.value = resultado.error || 'Error al procesar el archivo';
      console.error('Error al procesar:', resultado.error);
    }
  } catch (err) {
    errorImportacion.value = 'Error inesperado al procesar el archivo';
    console.error('Error:', err);
  } finally {
    procesandoExcel.value = false;
  }
};

const verDetallesHoja = (sheetName) => {
  if (hojaExpandida.value === sheetName) {
    hojaExpandida.value = null;
  } else {
    hojaExpandida.value = sheetName;
  }
};

const getColorPorcentaje = (porcentaje) => {
  const percent = parseFloat(porcentaje) * 100;
  if (percent >= 15) return 'text-red-600 font-semibold';
  if (percent >= 10) return 'text-orange-600 font-semibold';
  if (percent >= 5) return 'text-yellow-600 font-semibold';
  return 'text-green-600 font-semibold';
};

// Funciones para formatear datos de la tabla
const formatearPrecioTabla = (precio) => {
  const valor = normalizarPrecio(precio);
  const n = valor === null ? 0 : valor;
  return n.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatearRedondeo = (redondeo) => {
  if (!redondeo || redondeo === '' || redondeo === '0') {
    return '(vacío)';
  }
  const valor = parseFloat(redondeo);
  return '$' + valor.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatearPorcentajeTabla = (porcentaje) => {
  if (porcentaje === null || porcentaje === undefined || porcentaje === '') {
    return '(vacío)';
  }
  const n = normalizarPrecio(porcentaje);
  if (n === null) return '(vacío)';
  const percent = n <= 1 ? n * 100 : n;
  return percent.toFixed(2) + '%';
};

const getColorPorcentajeTabla = (porcentaje) => {
  if (porcentaje === null || porcentaje === undefined || porcentaje === '') {
    return 'text-gray-400';
  }
  const n = normalizarPrecio(porcentaje);
  if (n === null) return 'text-gray-400';
  const percent = n <= 1 ? n * 100 : n;
  if (percent >= 15) return 'text-red-600 font-semibold';
  if (percent >= 10) return 'text-orange-600 font-semibold';
  if (percent >= 5) return 'text-yellow-600 font-semibold';
  return 'text-green-600 font-semibold';
};

const marcarCambioEnFila = (sheetName, index) => {
  // Esta función se puede usar para trackear cambios si es necesario
  console.log(`Cambio en hoja "${sheetName}", fila ${index + 1}`);
};

// Normaliza un valor de precio que puede venir como "$ 7,900.00", "7900", "7.900,00", etc.
const normalizarPrecio = (valor) => {
  if (valor === null || valor === undefined) return null;
  if (typeof valor === 'number' && !isNaN(valor)) return valor;
  let s = String(valor).trim();
  if (s === '' || s === '-' || s.toLowerCase() === 'null') return null;
  // quitar todo excepto dígitos, coma, punto
  s = s.replace(/[^0-9,.-]/g, '');
  // si hay ambas "," y ".", asumimos que "," es miles y "." es decimal (formato en-US)
  if (s.includes(',') && s.includes('.')) {
    s = s.replace(/,/g, '');
  } else if (s.includes(',') && !s.includes('.')) {
    // solo coma: tratar coma como decimal (formato es-AR)
    s = s.replace(/\./g, '');
    s = s.replace(',', '.');
  }
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
};

// Construye payload { precios: [{lista_id, producto_id, precio}] } desde resultadoProcesamiento
const construirPayloadCambioMasivo = () => {
  if (!resultadoProcesamiento.value || !resultadoProcesamiento.value.sheets) return [];
  const precios = [];
  const sheets = resultadoProcesamiento.value.sheets;
  for (const sheetName in sheets) {
    const sheet = sheets[sheetName];
    const filas = Array.isArray(sheet?.data) ? sheet.data : [];
    for (const row of filas) {
      const listaId = row.idLista ?? row.idlista ?? row.lista_id;
      const productoId = row.codProducto ?? row.producto_id ?? row.codigo ?? row.codproducto;
      const precioNuevo = normalizarPrecio(row.redondeo);
      if (!listaId || !productoId) continue; // se requieren claves
      if (precioNuevo === null || precioNuevo <= 0) continue; // ignorar vacíos o 0
      precios.push({ lista_id: String(listaId), producto_id: String(productoId), precio: precioNuevo });
    }
  }
  return precios;
};

// Conteo reactivo de cambios válidos que se enviarán
const conteoCambiosValidos = computed(() => construirPayloadCambioMasivo().length);

// Envía el payload al backend
const aplicarCambios = async () => {
  const precios = construirPayloadCambioMasivo();
  if (!precios.length) {
    errorImportacion.value = 'No hay precios válidos para enviar. Complete la columna "redondeo".';
    return;
  }

  procesandoExcel.value = true;
  errorImportacion.value = null;
  try {
    const resp = await cambiarListaService.generarCambioPreciosMasivo(precios);
    if (!resp.success) {
      errorImportacion.value = resp.error || 'Error al aplicar cambios';
      return;
    }
    // Éxito: refrescar listas y cerrar modal
    await cargarListas();
    cerrarModalImportar();
    alert('Cambios aplicados correctamente (' + precios.length + ' precios)');
  } catch (e) {
    errorImportacion.value = 'Error inesperado al aplicar cambios';
    console.error(e);
  } finally {
    procesandoExcel.value = false;
  }
};

 

// Cargar datos al montar el componente
onMounted(() => {
  cargarListas();
});
</script>

<style scoped>
/* Animaciones para el modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.95) translateY(-20px);
}

/* Efectos de las olas */
.wave-animation {
  animation: wave 8s ease-in-out infinite;
}

.wave-animation-slow {
  animation: waveSlow 12s ease-in-out infinite;
}

.wave-animation-reverse {
  animation: waveReverse 10s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% {
    transform: translateX(0) translateY(0);
  }
  25% {
    transform: translateX(-20px) translateY(-5px);
  }
  50% {
    transform: translateX(-40px) translateY(0);
  }
  75% {
    transform: translateX(-20px) translateY(5px);
  }
}

@keyframes waveSlow {
  0%, 100% {
    transform: translateX(0) translateY(0);
  }
  33% {
    transform: translateX(15px) translateY(-3px);
  }
  66% {
    transform: translateX(30px) translateY(2px);
  }
}

@keyframes waveReverse {
  0%, 100% {
    transform: translateX(0) translateY(0);
  }
  25% {
    transform: translateX(25px) translateY(3px);
  }
  50% {
    transform: translateX(50px) translateY(0);
  }
  75% {
    transform: translateX(25px) translateY(-3px);
  }
}

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
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(255, 255, 255, 0.5);
}

/* Hover effects para las filas de la tabla */
.group:hover .card-shadow {
  box-shadow: 
    0 20px 40px -5px rgba(0, 0, 0, 0.15), 
    0 15px 15px -5px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.8);
}

/* Mejora para la tabla responsiva */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .card-shadow {
    margin-left: -0.5rem;
    margin-right: -0.5rem;
  }
}

/* Backdrop blur para el modal */
.modal-backdrop {
  backdrop-filter: blur(8px);
  background: rgba(0, 0, 0, 0.4);
}

/* Animación para los botones */
.btn-hover {
  transition: all 0.2s ease-in-out;
}

.btn-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* Gradientes animados */
@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.gradient-animate {
  background-size: 200% 200%;
  animation: gradientShift 4s ease infinite;
}

/* Loading dots animation */
@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.animate-bounce {
  animation: bounce 1.4s infinite ease-in-out both;
}

/* Pulse effect for loading */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Smooth scrolling para la paginación */
html {
  scroll-behavior: smooth;
}

/* Custom focus styles */
.focus-ring {
  transition: all 0.2s ease-in-out;
}

.focus-ring:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}

/* Glassmorphism effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Shimmer loading effect */
@keyframes shimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

.shimmer {
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  animation: shimmer 1.5s infinite linear;
}
</style>