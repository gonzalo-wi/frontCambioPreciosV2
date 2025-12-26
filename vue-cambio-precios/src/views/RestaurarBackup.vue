<template>
  <div class="relative min-h-screen">
    <!-- Fondo con ola -->
    <WaveBackground />
    
    <!-- Contenido principal -->
    <div class="relative z-10 p-6">
      
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <svg class="w-8 h-8 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
          </svg>
          Restaurar Backups
        </h1>
        <p class="text-gray-600">
          Gestiona y restaura copias de seguridad de precios y clientes
        </p>
      </div>

      <!-- Mensajes de notificación -->
      <Transition name="fade">
        <div v-if="mensajeNotificacion" 
             class="mb-6 p-4 rounded-lg border-2 flex items-center justify-between"
             :class="mensajeNotificacion.tipo === 'success' 
               ? 'bg-green-50 border-green-300 text-green-800' 
               : mensajeNotificacion.tipo === 'error'
               ? 'bg-red-50 border-red-300 text-red-800'
               : 'bg-blue-50 border-blue-300 text-blue-800'">
          <div class="flex items-center">
            <svg v-if="mensajeNotificacion.tipo === 'success'" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <svg v-else-if="mensajeNotificacion.tipo === 'error'" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <span class="font-medium">{{ mensajeNotificacion.texto }}</span>
          </div>
          <button @click="mensajeNotificacion = null" class="ml-4">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </Transition>

      <!-- Estadísticas -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Backups</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalBackups }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Backups Clientes</p>
              <p class="text-2xl font-bold text-gray-900">{{ backupsClientes.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Backups Listas</p>
              <p class="text-2xl font-bold text-gray-900">{{ backupsListas.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Algún Backup Activo</p>
              <p class="text-sm font-bold text-gray-900">{{ (backupActivoClientes || backupActivoListas) ? 'Sí' : 'No' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabla de Backups de Clientes -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <h2 class="text-xl font-bold text-gray-900">Backups de Clientes</h2>
            </div>
            <button
              @click="cargarBackups"
              :disabled="cargando"
              class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <svg class="w-4 h-4 mr-2" :class="{ 'animate-spin': cargando }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Actualizar
            </button>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="cargando" class="p-16 text-center">
          <div class="flex items-center justify-center">
            <svg class="animate-spin h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="ml-3 text-gray-500">Cargando backups...</span>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="p-16 text-center">
          <div class="flex flex-col items-center">
            <svg class="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-red-600 font-medium">{{ error }}</p>
            <button @click="cargarBackups" class="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
              Reintentar
            </button>
          </div>
        </div>

        <!-- Sin backups -->
        <div v-else-if="backupsClientes.length === 0" class="p-16 text-center">
          <div class="flex flex-col items-center">
            <svg class="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
            <p class="text-gray-600">No hay backups de clientes disponibles</p>
          </div>
        </div>

        <!-- Tabla Clientes -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Fecha Inicio</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Fecha Fin</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Total Registros</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Clientes</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Productos</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-for="(backup, index) in backupsClientes" :key="index" 
                  class="hover:bg-green-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-medium text-gray-900">{{ formatearFecha(backup.fecha_inicio) }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-600">{{ backup.fecha_fin ? formatearFecha(backup.fecha_fin) : '-' }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-semibold text-blue-600">{{ formatearNumero(backup.total_registros) }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-semibold text-green-600">{{ formatearNumero(backup.total_clientes) }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-semibold text-purple-600">{{ formatearNumero(backup.total_productos) }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span v-if="backup.activo" 
                        class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300">
                    Activo
                  </span>
                  <span v-else 
                        class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-300">
                    Inactivo
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button
                    @click="mostrarModalRestaurar(backup, 'clientes')"
                    class="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all text-sm font-medium flex items-center"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    Restaurar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tabla de Backups de Listas -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <h2 class="text-xl font-bold text-gray-900">Backups de Listas de Precios</h2>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="cargando" class="p-16 text-center">
          <div class="flex items-center justify-center">
            <svg class="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="ml-3 text-gray-500">Cargando backups...</span>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="p-16 text-center">
          <div class="flex flex-col items-center">
            <svg class="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p class="text-red-600 font-medium">{{ error }}</p>
            <button @click="cargarBackups" class="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
              Reintentar
            </button>
          </div>
        </div>

        <!-- Sin backups -->
        <div v-else-if="backupsListas.length === 0" class="p-16 text-center">
          <div class="flex flex-col items-center">
            <svg class="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
            <p class="text-gray-600">No hay backups de listas disponibles</p>
          </div>
        </div>

        <!-- Tabla Listas -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Fecha Inicio</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Fecha Fin</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Descripción</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Total Registros</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Listas</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Productos</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-for="(backup, index) in backupsListas" :key="index" 
                  class="hover:bg-blue-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-medium text-gray-900">{{ formatearFecha(backup.fecha_inicio) }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-600">{{ backup.fecha_fin ? formatearFecha(backup.fecha_fin) : '-' }}</span>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-900">{{ backup.descripcion || '-' }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-semibold text-blue-600">{{ formatearNumero(backup.total_registros) }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-semibold text-indigo-600">{{ formatearNumero(backup.total_listas) }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-semibold text-purple-600">{{ formatearNumero(backup.total_productos) }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span v-if="backup.activo" 
                        class="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300">
                    Activo
                  </span>
                  <span v-else 
                        class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-300">
                    Inactivo
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button
                    @click="mostrarModalRestaurar(backup, 'listas')"
                    class="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-sm font-medium flex items-center"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    Restaurar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <!-- Modal de Restauración -->
    <Transition name="modal">
      <div v-if="modalRestaurarAbierto" 
           class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
           @click.self="cerrarModalRestaurar">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
          <!-- Header -->
          <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-purple-800 flex items-center">
                <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Restaurar Backup
              </h3>
              <button @click="cerrarModalRestaurar" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Contenido -->
          <div class="p-6">
            <!-- Loading durante restauración -->
            <div v-if="restaurando" class="flex flex-col items-center justify-center py-12">
              <svg class="animate-spin h-16 w-16 text-purple-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-lg font-semibold text-gray-700">Restaurando backup...</p>
              <p class="text-sm text-gray-500 mt-2">Por favor espera, esto puede tomar unos momentos</p>
              <div class="mt-6 w-full max-w-xs">
                <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <!-- Contenido del modal cuando NO está restaurando -->
            <div v-else-if="backupSeleccionado" class="space-y-4">
              <!-- Información del backup -->
              <div :class="tipoBackupSeleccionado === 'clientes' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'" 
                   class="p-4 rounded-lg border">
                <h4 :class="tipoBackupSeleccionado === 'clientes' ? 'text-green-900' : 'text-blue-900'" 
                    class="font-semibold mb-2">
                  Información del Backup de {{ tipoBackupSeleccionado === 'clientes' ? 'Clientes' : 'Listas' }}
                </h4>
                <div class="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span class="text-gray-600">Fecha:</span>
                    <span class="ml-2 font-medium">{{ formatearFecha(backupSeleccionado.fecha_inicio) }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Registros:</span>
                    <span class="ml-2 font-medium">{{ formatearNumero(backupSeleccionado.total_registros) }}</span>
                  </div>
                  <div v-if="tipoBackupSeleccionado === 'clientes'">
                    <span class="text-gray-600">Clientes:</span>
                    <span class="ml-2 font-medium">{{ formatearNumero(backupSeleccionado.total_clientes) }}</span>
                  </div>
                  <div v-if="tipoBackupSeleccionado === 'listas'">
                    <span class="text-gray-600">Listas:</span>
                    <span class="ml-2 font-medium">{{ formatearNumero(backupSeleccionado.total_listas) }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Productos:</span>
                    <span class="ml-2 font-medium">{{ formatearNumero(backupSeleccionado.total_productos) }}</span>
                  </div>
                </div>
              </div>

              <!-- Advertencia -->
              <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div class="flex">
                  <svg class="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-yellow-800">Advertencia</p>
                    <p class="text-sm text-yellow-700 mt-1">
                      Esta acción sobrescribirá los datos actuales. Asegúrate de que deseas continuar.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Opciones de restauración -->
              <div class="space-y-3">
                <p class="font-semibold text-gray-900">{{ tipoBackupSeleccionado === 'clientes' ? '¿Restaurar este backup de clientes?' : '¿Restaurar este backup de listas?' }}</p>
                
                <button
                  v-if="tipoBackupSeleccionado === 'clientes'"
                  @click="restaurarSoloClientes"
                  :disabled="restaurando"
                  class="w-full p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <svg v-if="!restaurando" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  <svg v-else class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span v-if="!restaurando">Restaurar Clientes con Descuentos</span>
                  <span v-else>Restaurando clientes...</span>
                </button>

                <button
                  v-if="tipoBackupSeleccionado === 'listas'"
                  @click="restaurarSoloListas"
                  :disabled="restaurando"
                  class="w-full p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <svg v-if="!restaurando" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <svg v-else class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span v-if="!restaurando">Restaurar Listas de Precios</span>
                  <span v-else>Restaurando listas...</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end rounded-b-2xl">
            <button
              @click="cerrarModalRestaurar"
              :disabled="restaurando"
              class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { backupService } from '../services/backupService.js';
import WaveBackground from '../components/WaveBackground.vue';

// Estado
const backupsClientes = ref([]);
const backupsListas = ref([]);
const cargando = ref(false);
const error = ref(null);
const mensajeNotificacion = ref(null);

// Modal
const modalRestaurarAbierto = ref(false);
const backupSeleccionado = ref(null);
const tipoBackupSeleccionado = ref(null); // 'clientes' o 'listas'
const restaurando = ref(false);

// Computed
const totalBackups = computed(() => {
  return backupsClientes.value.length + backupsListas.value.length;
});

const backupActivoClientes = computed(() => {
  return backupsClientes.value.some(b => b.activo);
});

const backupActivoListas = computed(() => {
  return backupsListas.value.some(b => b.activo);
});

const ultimoBackupClientes = computed(() => {
  if (backupsClientes.value.length === 0) return 'N/A';
  const ultimo = backupsClientes.value[0];
  return formatearFecha(ultimo.fecha_inicio);
});

const ultimoBackupListas = computed(() => {
  if (backupsListas.value.length === 0) return 'N/A';
  const ultimo = backupsListas.value[0];
  return formatearFecha(ultimo.fecha_inicio);
});
// Métodos
const cargarBackups = async () => {
  cargando.value = true;
  error.value = null;
  
  try {
    console.log('🔄 Cargando backups...');
    const response = await backupService.getBackupsDisponibles();
    console.log('✅ Respuesta recibida:', response);
    
    backupsClientes.value = response.backups_clientes || [];
    backupsListas.value = response.backups_listas || [];
    
    if (backupsClientes.value.length === 0 && backupsListas.value.length === 0) {
      console.warn('⚠️ No hay backups disponibles');
    }
  } catch (err) {
    console.error('❌ Error al cargar backups:', err);
    error.value = err.message || 'Error al cargar los backups';
    
    // Mostrar también en notificación
    mensajeNotificacion.value = {
      tipo: 'error',
      texto: `Error del servidor: ${err.message}`
    };
  } finally {
    cargando.value = false;
  }
};

const mostrarModalRestaurar = (backup, tipo) => {
  backupSeleccionado.value = backup;
  tipoBackupSeleccionado.value = tipo;
  modalRestaurarAbierto.value = true;
};

const cerrarModalRestaurar = () => {
  if (!restaurando.value) {
    modalRestaurarAbierto.value = false;
    backupSeleccionado.value = null;
  }
};

const restaurarSoloListas = async () => {
  if (!confirm('¿Está seguro que desea restaurar las LISTAS de precios? Esta acción sobrescribirá las listas actuales.')) {
    return;
  }

  restaurando.value = true;

  try {
    await backupService.restaurarBackupListas(backupSeleccionado.value.fecha_inicio);
    
    mensajeNotificacion.value = {
      tipo: 'success',
      texto: '✓ Listas de precios restauradas exitosamente'
    };
    
    await cargarBackups();
    
    setTimeout(() => {
      mensajeNotificacion.value = null;
    }, 5000);
    
  } catch (err) {
    mensajeNotificacion.value = {
      tipo: 'error',
      texto: '❌ Error: ' + err.message
    };
  } finally {
    restaurando.value = false;
    cerrarModalRestaurar();
  }
};

const restaurarSoloClientes = async () => {
  if (!confirm('¿Está seguro que desea restaurar los CLIENTES con descuentos? Esta acción sobrescribirá los datos actuales de clientes.')) {
    return;
  }

  restaurando.value = true;

  try {
    await backupService.restaurarBackupClientes(backupSeleccionado.value.fecha_inicio);
    
    mensajeNotificacion.value = {
      tipo: 'success',
      texto: '✓ Clientes con descuentos restaurados exitosamente'
    };
    
    await cargarBackups();
    
    setTimeout(() => {
      mensajeNotificacion.value = null;
    }, 5000);
    
  } catch (err) {
    mensajeNotificacion.value = {
      tipo: 'error',
      texto: '❌ Error: ' + err.message
    };
  } finally {
    restaurando.value = false;
    cerrarModalRestaurar();
  }
};

const formatearFecha = (fecha) => {
  return backupService.formatearFecha(fecha);
};

const calcularDuracion = (inicio, fin) => {
  return backupService.calcularDuracion(inicio, fin);
};

const formatearNumero = (num) => {
  if (!num && num !== 0) return '-';
  return new Intl.NumberFormat('es-AR').format(num);
};

// Inicialización
onMounted(() => {
  cargarBackups();
});
</script>

<style scoped>
/* Transiciones */
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
