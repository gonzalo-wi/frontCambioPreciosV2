<template>
  <div class="min-h-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative">
    <!-- Ola de fondo -->
    <WaveBackground 
      primary-color="#3b82f6" 
      primary-opacity="0.4"
      secondary-color="#2563eb" 
      secondary-opacity="0.25"
    />
    
    <!-- Contenido principal -->
    <div class="relative z-20 p-6 max-w-7xl mx-auto">
      <!-- Header con título mejorado -->
      <div class="mb-10">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="relative group">
              <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div class="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-xl">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                </svg>
              </div>
            </div>
            <div>
              <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent mb-2 tracking-tight">
                Cambio de Precios
              </h1>
              <p class="text-gray-600 text-lg flex items-center space-x-2">
                <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span>Sube tu archivo Excel para procesar cambios masivos de precios</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Opciones de configuración mejoradas -->
      <div v-if="!archivoSubido" class="mb-8">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 card-shadow hover:shadow-2xl transition-shadow duration-300">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.348 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900">
              Opciones de Procesamiento
            </h3>
          </div>
          
          <div class="space-y-6">
            <!-- Opción de cabeceras mejorada -->
            <div class="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <input 
                id="hasHeader" 
                v-model="opciones.hasHeader" 
                type="checkbox" 
                class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
              <label for="hasHeader" class="flex-1 cursor-pointer">
                <span class="text-sm font-semibold text-gray-900 block">Las hojas tienen cabeceras</span>
                <span class="text-xs text-gray-600">La función detecta automáticamente la fila correcta de headers</span>
              </label>
              <div class="group relative">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center cursor-help">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div class="absolute bottom-10 right-0 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg py-2 px-4 whitespace-nowrap z-10 shadow-xl">
                  Detecta automáticamente las cabeceras incluso si hay títulos principales
                  <div class="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                </div>
              </div>
            </div>

            <!-- Selector de hojas específicas (se mostrará después de procesar) -->
            <div v-if="hojasDisponibles.length > 0" class="border-t border-gray-200 pt-6">
              <div class="flex items-center justify-between mb-4">
                <label class="block text-sm font-bold text-gray-900">
                  Seleccionar hojas específicas
                  <span class="text-xs font-normal text-gray-500 ml-2">(opcional)</span>
                </label>
                <span class="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {{ opciones.sheetsToProcess.length || hojasDisponibles.length }} de {{ hojasDisponibles.length }} hojas
                </span>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                <div v-for="hoja in hojasDisponibles" :key="hoja" 
                     class="group flex items-center space-x-2 p-3 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
                  <input 
                    :id="`sheet-${hoja}`"
                    v-model="opciones.sheetsToProcess" 
                    :value="hoja"
                    type="checkbox" 
                    class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                  <label :for="`sheet-${hoja}`" class="flex-1 text-sm text-gray-700 group-hover:text-blue-900 font-medium truncate cursor-pointer">
                    {{ hoja }}
                  </label>
                  <svg class="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
              </div>
              <div class="mt-4 flex items-center space-x-2 text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Si no seleccionas ninguna hoja, se procesarán automáticamente todas las disponibles</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Zona de subida de archivos mejorada -->
      <div v-if="!archivoSubido" class="mb-8">
        <div 
          class="relative border-2 border-dashed rounded-2xl p-12 text-center bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm overflow-hidden group transition-all duration-300 card-shadow"
          :class="arrastrando 
            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-2xl scale-[1.02]' 
            : 'border-gray-300 hover:border-blue-400 hover:shadow-xl'"
          @dragover.prevent
          @dragenter.prevent="arrastrando = true"
          @dragleave.prevent="arrastrando = false"
          @drop.prevent="manejarDrop"
        >
          <!-- Background pattern -->
          <div class="absolute inset-0 opacity-5">
            <div class="absolute inset-0" style="background-image: radial-gradient(circle, #3b82f6 1px, transparent 1px); background-size: 20px 20px;"></div>
          </div>

          <div class="relative flex flex-col items-center space-y-6">
            <!-- Icon with animation -->
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" :class="{ 'animate-pulse': arrastrando }"></div>
              <div class="relative w-24 h-24 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                   :class="{ 'scale-110 rotate-6': arrastrando }">
                <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
              </div>
            </div>
            
            <div class="max-w-md">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">
                Arrastra tu archivo Excel aquí
              </h3>
              <p class="text-gray-600 mb-1">
                o haz clic en el botón para seleccionar
              </p>
              <div class="flex items-center justify-center space-x-4 text-sm text-gray-500 mt-4">
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>.xlsx</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>.xls</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                  </svg>
                  <span>Máx. 10MB</span>
                </div>
              </div>
              
              <input 
                ref="fileInput"
                type="file"
                accept=".xlsx,.xls"
                @change="manejarSeleccionArchivo"
                class="hidden"
              >
              
              <button 
                @click="$refs.fileInput.click()"
                class="mt-6 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl font-bold text-base transform hover:scale-105 active:scale-95 flex items-center space-x-2 mx-auto"
                :disabled="subiendo"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <span>Seleccionar archivo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Progreso de subida mejorado -->
      <div v-if="subiendo" class="mb-8">
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 card-shadow border border-blue-100">
          <div class="flex items-center space-x-6">
            <!-- Animated spinner -->
            <div class="relative">
              <div class="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                </svg>
              </div>
            </div>
            
            <div class="flex-1">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h3 class="text-lg font-bold text-gray-900">Procesando archivo Excel</h3>
                  <p class="text-sm text-gray-600 mt-1">Esto puede tardar unos momentos...</p>
                </div>
                <span class="text-2xl font-bold text-blue-600">{{ progreso }}%</span>
              </div>
              <div class="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                  class="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out"
                  :style="{ width: `${progreso}%` }"
                >
                  <!-- Animated shimmer effect -->
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
              <div class="flex items-center space-x-2 mt-3 text-xs text-gray-500">
                <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Validando datos y procesando hojas de cálculo...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Información del archivo procesado mejorada -->
      <div v-if="archivoSubido && datosArchivo" class="mb-8">
        <div class="bg-white rounded-2xl shadow-2xl overflow-hidden card-shadow border border-green-100">
          <!-- Header con degradado y animación -->
          <div class="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-8 relative overflow-hidden">
            <div class="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div class="relative flex items-center space-x-4">
              <div class="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-white mb-1">Archivo procesado exitosamente</h3>
                <div class="flex items-center space-x-3 text-white/90">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span class="font-medium">{{ datosArchivo.file_info.original_name }}</span>
                  <span class="text-white/70">•</span>
                  <span class="text-sm">{{ formatearTamaño(datosArchivo.file_info.size_mb * 1024 * 1024) }}</span>
                </div>
              </div>
              <div class="w-12 h-12 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="p-8">
            <!-- Estadísticas mejoradas -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div class="group bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div class="flex items-center justify-between mb-2">
                  <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                </div>
                <div class="text-3xl font-bold text-blue-600 mb-1">{{ datosArchivo.total_sheets }}</div>
                <div class="text-sm font-medium text-gray-600">Hojas totales</div>
              </div>
              
              <div class="group bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div class="flex items-center justify-between mb-2">
                  <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                    </svg>
                  </div>
                </div>
                <div class="text-3xl font-bold text-green-600 mb-1">{{ datosArchivo.processed_sheets }}</div>
                <div class="text-sm font-medium text-gray-600">Hojas procesadas</div>
              </div>
              
              <div class="group bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-2xl border border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div class="flex items-center justify-between mb-2">
                  <div class="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                  </div>
                </div>
                <div class="text-3xl font-bold text-purple-600 mb-1">{{ totalProductos }}</div>
                <div class="text-sm font-medium text-gray-600">Productos totales</div>
              </div>
              
              <div class="group bg-gradient-to-br from-yellow-50 to-orange-100 p-6 rounded-2xl border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div class="flex items-center justify-between mb-2">
                  <div class="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                  </div>
                </div>
                <div class="text-3xl font-bold text-orange-600 mb-1">{{ aumentoPromedioGeneral }}%</div>
                <div class="text-sm font-medium text-gray-600">Aumento promedio</div>
              </div>
            </div>

            <div class="mt-8 flex justify-end space-x-4">
              <button
                v-if="datosArchivo && datosArchivo.sheets && conteoCambiosValidos > 0"
                type="button"
                @click="limpiarEspaciosDatos"
                class="px-4 py-2 border rounded bg-white hover:bg-gray-100 text-sm font-medium"
              >Limpiar espacios</button>
              <button 
                v-if="datosArchivo && datosArchivo.sheets"
                @click="aplicarCambios"
                :disabled="conteoCambiosValidos === 0 || aplicando"
                class="group px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center space-x-2 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>{{ aplicando ? 'Aplicando...' : `Aplicar Cambios (${conteoCambiosValidos})` }}</span>
              </button>
              <button 
                @click="reiniciar"
                class="group px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center space-x-2 transform hover:scale-105 active:scale-95"
              >
                <svg class="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                <span>Subir otro archivo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pestañas de hojas mejoradas -->
      <div v-if="datosArchivo && datosArchivo.available_sheets" class="mb-8">
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden card-shadow border border-gray-100">
          <div class="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <nav class="-mb-px flex overflow-x-auto px-6 space-x-2">
              <button
                v-for="(sheet, index) in datosArchivo.available_sheets"
                :key="sheet"
                @click="hojaActiva = sheet"
                :class="[
                  'relative py-4 px-6 font-semibold text-sm transition-all duration-200 whitespace-nowrap group',
                  hojaActiva === sheet
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-900'
                ]"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span>{{ sheet }}</span>
                  <span 
                    class="px-2.5 py-0.5 text-xs font-bold rounded-full transition-colors"
                    :class="hojaActiva === sheet 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'"
                  >
                    {{ datosArchivo.sheets[sheet]?.data?.length || 0 }}
                  </span>
                </div>
                <!-- Active indicator -->
                <div 
                  v-if="hojaActiva === sheet"
                  class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-full"
                ></div>
                <div 
                  v-else
                  class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-full"
                ></div>
              </button>
            </nav>
          </div>

          <!-- Estadísticas de la hoja actual mejoradas -->
          <div v-if="hojaActiva && datosArchivo.sheets[hojaActiva]" class="p-8 bg-gradient-to-br from-gray-50 via-white to-blue-50 border-b">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div class="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
                <div class="text-2xl font-bold text-gray-900 mb-1">{{ estadisticasHojaActual.totalProductos }}</div>
                <div class="text-xs font-medium text-gray-600 uppercase tracking-wide">Productos</div>
              </div>
              <div class="text-center p-4 bg-white rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                </div>
                <div class="text-2xl font-bold text-blue-600 mb-1">{{ estadisticasHojaActual.aumentoPromedio }}%</div>
                <div class="text-xs font-medium text-gray-600 uppercase tracking-wide">Aumento promedio</div>
              </div>
              <div class="text-center p-4 bg-white rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
                <div class="text-2xl font-bold text-green-600 mb-1">{{ estadisticasHojaActual.aumentoMinimo }}%</div>
                <div class="text-xs font-medium text-gray-600 uppercase tracking-wide">Aumento mínimo</div>
              </div>
              <div class="text-center p-4 bg-white rounded-xl shadow-sm border border-red-100 hover:shadow-md transition-shadow">
                <div class="w-12 h-12 bg-gradient-to-br from-red-100 to-pink-200 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                  </svg>
                </div>
                <div class="text-2xl font-bold text-red-600 mb-1">{{ estadisticasHojaActual.aumentoMaximo }}%</div>
                <div class="text-xs font-medium text-gray-600 uppercase tracking-wide">Aumento máximo</div>
              </div>
            </div>
          </div>

          <!-- Tabla de datos -->
          <div class="overflow-x-auto">
            <table v-if="hojaActiva && datosArchivo.sheets[hojaActiva]" class="min-w-full divide-y divide-gray-100">
              <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div class="flex items-center space-x-1">
                      <span>#</span>
                    </div>
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div class="flex items-center space-x-1">
                      <span>Código</span>
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
                      </svg>
                    </div>
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div class="flex items-center space-x-1">
                      <span>Artículo</span>
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                      </svg>
                    </div>
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div class="flex items-center space-x-1">
                      <span>Precio Actual</span>
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                      </svg>
                    </div>
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div class="flex items-center space-x-1">
                      <span>Precio Nuevo</span>
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                      </svg>
                    </div>
                  </th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div class="flex items-center space-x-1">
                      <span>% Aumento</span>
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                      </svg>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-100">
                <tr 
                  v-for="(item, index) in datosArchivo.sheets[hojaActiva].data" 
                  :key="index"
                  class="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {{ index + 1 }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-bold text-gray-900 font-mono">{{ item.codProducto }}</div>
                    <div class="text-xs text-gray-500">Código</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{ item.descripcion }}</div>
                    <div class="text-xs text-gray-500">Producto</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 font-semibold">{{ formatearPrecio(item.precio_actual) }}</div>
                    <div class="text-xs text-gray-500">Precio actual</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900 font-bold text-green-600">
                      <input
                        type="number"
                        v-model="item.redondeo"
                        step="0.01"
                        class="w-36 px-2 py-1 text-right font-mono border border-emerald-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-emerald-50/40"
                      />
                    </div>
                    <div class="text-xs text-green-500">Precio nuevo</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border"
                      :class="getClasePorcentaje(obtenerAumento(item))"
                    >
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                      </svg>
                      {{ formatearPorcentaje(obtenerAumento(item)) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Mensaje de error -->
      <div v-if="error" class="mb-8">
        <div class="bg-red-50 border border-red-200 rounded-xl p-6 card-shadow">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-red-800">Error al procesar archivo</h3>
              <p class="text-red-700">{{ error }}</p>
            </div>
          </div>
          <div class="mt-4">
            <button 
              @click="reiniciar"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de carga mientras se aplican cambios -->
    <div v-if="aplicando" class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <!-- Fondo con blur -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-indigo-900/40 to-purple-900/40 backdrop-blur-md"></div>
      
      <!-- Partículas flotantes de fondo -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>
      
      <!-- Contenedor principal -->
      <div class="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-lg w-full transform scale-100 animate-scale-in border border-white/20">
        <!-- Decoración superior -->
        <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-3xl"></div>
        
        <div class="flex flex-col items-center">
          <!-- Spinner con efecto 3D -->
          <div class="relative w-32 h-32 mb-8">
            <!-- Círculos de fondo -->
            <div class="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-50 blur-sm"></div>
            
            <!-- Anillo exterior giratorio -->
            <div class="absolute inset-0 border-[6px] border-transparent border-t-blue-500 border-r-indigo-500 rounded-full animate-spin-slow"></div>
            
            <!-- Anillo medio giratorio inverso -->
            <div class="absolute inset-3 border-[5px] border-transparent border-b-purple-500 border-l-pink-500 rounded-full animate-spin-reverse"></div>
            
            <!-- Anillo interno pulsante -->
            <div class="absolute inset-6 border-[4px] border-blue-300/50 rounded-full animate-pulse-ring"></div>
            
            <!-- Ícono central con brillo -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-lg opacity-60 animate-pulse"></div>
                <div class="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Título con gradiente -->
          <h3 class="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3 text-center">
            Aplicando cambios de precios
          </h3>
          
          <!-- Contador destacado -->
          <div class="mb-4 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200/50">
            <p class="text-gray-700 text-center flex items-center justify-center space-x-2">
              <span class="text-sm font-medium">Actualizando</span>
              <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{{ conteoCambiosValidos }}</span>
              <span class="text-sm font-medium">precios</span>
            </p>
          </div>
          
          <!-- Mensaje informativo -->
          <p class="text-gray-600 text-center mb-6 text-sm leading-relaxed max-w-sm">
            Por favor, no cierres esta ventana. <br>
            <span class="text-gray-500">Este proceso puede tardar unos momentos...</span>
          </p>
          
          <!-- Barra de progreso mejorada -->
          <div class="w-full bg-gray-200/80 rounded-full h-3 overflow-hidden shadow-inner">
            <div class="h-full bg-gradient-to-r from-blue-500 via-indigo-500 via-purple-500 to-pink-500 rounded-full animate-progress-smooth shadow-lg"></div>
          </div>
          
          <!-- Indicador de puntos animados -->
          <div class="flex items-center space-x-2 mt-6">
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce-dot"></div>
            <div class="w-2 h-2 bg-indigo-500 rounded-full animate-bounce-dot" style="animation-delay: 0.2s"></div>
            <div class="w-2 h-2 bg-purple-500 rounded-full animate-bounce-dot" style="animation-delay: 0.4s"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { cambiarListaService } from '../services/cambiarListaService.js';
import WaveBackground from '../components/WaveBackground.vue';

// Estado reactivo
const archivoSubido = ref(false);
const subiendo = ref(false);
const progreso = ref(0);
const datosArchivo = ref(null);
const hojaActiva = ref('');
const arrastrando = ref(false);
const error = ref('');
const hojasDisponibles = ref([]);
const aplicando = ref(false);

// Opciones de procesamiento
const opciones = ref({
  hasHeader: true,
  sheetsToProcess: []
});

// Computed properties
const totalProductos = computed(() => {
  if (!datosArchivo.value?.sheets) return 0;
  
  return Object.values(datosArchivo.value.sheets)
    .reduce((total, sheet) => total + (sheet.data?.length || 0), 0);
});

const aumentoPromedioGeneral = computed(() => {
  if (!datosArchivo.value?.sheets) return '0.00';
  
  const todosLosAumentos = [];
  Object.values(datosArchivo.value.sheets).forEach(sheet => {
    if (sheet.data) {
      sheet.data.forEach(item => {
        const aumento = parseFloat(item['% Aumento'] || 0);
        if (!isNaN(aumento)) {
          todosLosAumentos.push(aumento);
        }
      });
    }
  });
  
  if (todosLosAumentos.length === 0) return '0.00';
  
  const promedio = todosLosAumentos.reduce((sum, aumento) => sum + aumento, 0) / todosLosAumentos.length;
  return (promedio * 100).toFixed(2);
});

const estadisticasHojaActual = computed(() => {
  if (!hojaActiva.value || !datosArchivo.value?.sheets?.[hojaActiva.value]) {
    return { totalProductos: 0, aumentoPromedio: '0.00', aumentoMinimo: '0.00', aumentoMaximo: '0.00' };
  }
  
  return cambiarListaService.calcularEstadisticas(datosArchivo.value.sheets[hojaActiva.value].data);
});

// Métodos
const manejarDrop = (event) => {
  arrastrando.value = false;
  const archivos = event.dataTransfer.files;
  if (archivos.length > 0) {
    procesarArchivo(archivos[0]);
  }
};

const manejarSeleccionArchivo = (event) => {
  const archivo = event.target.files[0];
  if (archivo) {
    procesarArchivo(archivo);
  }
};

const procesarArchivo = async (archivo) => {
  error.value = '';
  subiendo.value = true;
  progreso.value = 0;

  try {
    // Primero probar con SOLO el archivo (como Postman)
    let resultado = await cambiarListaService.subirExcelSoloArchivo(archivo, (progress) => {
      progreso.value = progress;
    });

    // Si falla, intentar con parámetros adicionales
    if (!resultado.success) {
      console.log('Versión solo archivo falló, probando con parámetros...');
      
      const opcionesEnvio = {
        hasHeader: opciones.value.hasHeader,
        sheetsToProcess: opciones.value.sheetsToProcess.length > 0 ? opciones.value.sheetsToProcess : undefined
      };

      resultado = await cambiarListaService.subirExcel(archivo, opcionesEnvio, (progress) => {
        progreso.value = progress;
      });
    }

    if (resultado.success) {
      datosArchivo.value = resultado.data;
      archivoSubido.value = true;
      
      // Establecer la primera hoja como activa
      if (resultado.data.available_sheets && resultado.data.available_sheets.length > 0) {
        hojaActiva.value = resultado.data.available_sheets[0];
      }
    } else {
      error.value = resultado.error;
    }
  } catch (err) {
    error.value = 'Error inesperado al procesar el archivo';
    console.error(err);
  } finally {
    subiendo.value = false;
  }
};

const reiniciar = () => {
  archivoSubido.value = false;
  datosArchivo.value = null;
  hojaActiva.value = '';
  error.value = '';
  progreso.value = 0;
  hojasDisponibles.value = [];
  opciones.value = {
    hasHeader: true,
    sheetsToProcess: []
  };
};

// Funciones de formato (delegadas al servicio) - usar wrappers para mantener el contexto
const formatearTamaño = (bytes) => cambiarListaService.formatearTamaño(bytes);
const formatearPrecio = (valor) => cambiarListaService.formatearPrecio(valor);
const formatearPorcentaje = (valor) => cambiarListaService.formatearPorcentaje(valor);
const getClasePorcentaje = (valor) => cambiarListaService.getClasePorcentaje(valor);

// Obtiene el valor de %Aumento sin importar si viene con o sin espacio
const obtenerAumento = (item) => item['%Aumento'] ?? item['% Aumento'] ?? item.aumento ?? null;

// Construye el payload esperado por el endpoint masivo: { precios: [{lista_id, producto_id, precio}] }
const construirPayloadCambioMasivo = () => {
  if (!datosArchivo.value?.sheets) return [];
  const precios = [];
  const sheets = datosArchivo.value.sheets;
  for (const nombre in sheets) {
    const filas = Array.isArray(sheets[nombre]?.data) ? sheets[nombre].data : [];
    for (const row of filas) {
      const listaId = row.idLista || row.IdLista || row.idlista || row.lista_id || row['ID Lista'] || row.Lista || row['Lista'];
      const productoId = row.codProducto || row.producto_id || row.Cod || row.Codigo || row['Código'] || row.codproducto;
      const precioNuevo = cambiarListaService._normalizarNumero(row.redondeo || row.Redondeo || row['Precio Nuevo']);
      if (!listaId || !productoId) continue;
      if (precioNuevo === null || precioNuevo <= 0) continue;
      precios.push({ lista_id: String(listaId), producto_id: String(productoId), precio: precioNuevo });
    }
  }
  return precios;
};

const conteoCambiosValidos = computed(() => construirPayloadCambioMasivo().length);

const aplicarCambios = async () => {
  const precios = construirPayloadCambioMasivo();
  if (precios.length === 0) {
    error.value = 'No hay precios válidos para enviar. Verifica la columna de precio nuevo (Redondeo).';
    return;
  }
  // Validaciones adicionales: asegurar que todos los precios son números positivos
  const invalido = precios.find(p => typeof p.precio !== 'number' || isNaN(p.precio) || p.precio <= 0);
  if (invalido) {
    error.value = 'Hay precios inválidos (vacíos, NaN o <= 0). Corrige antes de enviar.';
    return;
  }
  // Confirmación antes de enviar
  const confirmar = confirm(`¿Está seguro que desea cambiar ${precios.length} precios?\n\nEsta acción actualizará los precios en el sistema.`);
  if (!confirmar) return;
  
  aplicando.value = true;
  error.value = '';
  try {
    const resp = await cambiarListaService.generarCambioPreciosMasivo(precios);
    if (!resp.success) {
      error.value = resp.error || 'Error al aplicar cambios';
      return;
    }
    alert(`Cambios aplicados correctamente (${precios.length} precios)`);
    reiniciar();
  } catch (e) {
    console.error(e);
    error.value = 'Error inesperado al aplicar cambios';
  } finally {
    aplicando.value = false;
  }
};

// Limpia espacios internos en IdLista / codProducto y solo trim en descripcion
const limpiarEspaciosDatos = () => {
  if (!datosArchivo.value?.sheets) return;
  for (const nombre in datosArchivo.value.sheets) {
    const filas = datosArchivo.value.sheets[nombre]?.data;
    if (!Array.isArray(filas)) continue;
    filas.forEach(row => {
      // Lista
      if (row.IdLista) row.IdLista = String(row.IdLista).replace(/\s+/g,'');
      if (row.idLista) row.idLista = String(row.idLista).replace(/\s+/g,'');
      if (row.lista_id) row.lista_id = String(row.lista_id).replace(/\s+/g,'');
      // Código producto
      if (row.codProducto) row.codProducto = String(row.codProducto).replace(/\s+/g,'');
      if (row.codproducto) row.codproducto = String(row.codproducto).replace(/\s+/g,'');
      if (row.Cod) row.Cod = String(row.Cod).replace(/\s+/g,'');
      // Descripción: solo trim extremos
      if (row.descripcion) row.descripcion = String(row.descripcion).trim();
      if (row.Aticulo) row.Aticulo = String(row.Aticulo).trim();
    });
  }
  alert('Espacios limpiados correctamente en IDs de lista y códigos de producto.');
};

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

/* Animación shimmer para la barra de progreso */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Animación de escala para modal */
@keyframes scale-in {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Animación de fade-in */
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Transiciones para modal */
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

/* Animación de progreso suave */
@keyframes progress-smooth {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Animación de giro lento */
@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Animación de giro inverso */
@keyframes spin-reverse {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

/* Animación de pulso para anillo */
@keyframes pulse-ring {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

/* Animación de flotación */
@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

/* Animación de flotación retrasada */
@keyframes float-delayed {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(-40px, 30px) scale(0.9);
  }
  66% {
    transform: translate(20px, -20px) scale(1.1);
  }
}

/* Animación de rebote para puntos */
@keyframes bounce-dot {
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-scale-in {
  animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-progress-smooth {
  animation: progress-smooth 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

.animate-spin-reverse {
  animation: spin-reverse 2s linear infinite;
}

.animate-pulse-ring {
  animation: pulse-ring 2s ease-in-out infinite;
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 10s ease-in-out infinite;
}

.animate-bounce-dot {
  animation: bounce-dot 1.4s ease-in-out infinite;
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