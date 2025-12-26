<template>
  <div class="relative min-h-screen">
    <!-- Fondo con ola -->
    <WaveBackground 
      primary-color="#10b981" 
      primary-opacity="0.4"
      secondary-color="#059669" 
      secondary-opacity="0.25"
    />
    
    <!-- Contenido principal -->
    <div class="relative z-10 p-6">
      
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-xl">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">
              Cambiar Listas de Precio
            </h1>
            <p class="text-gray-600 text-lg">
              Asigna listas de precio a múltiples clientes de forma masiva
            </p>
          </div>
        </div>
      </div>

      <!-- Notificaciones -->
      <Transition name="fade">
        <div v-if="mensajeNotificacion" 
             class="mb-6 p-4 rounded-lg border-2 flex items-center justify-between"
             :class="mensajeNotificacion.tipo === 'success' 
               ? 'bg-green-50 border-green-300 text-green-800' 
               : 'bg-red-50 border-red-300 text-red-800'">
          <div class="flex items-center">
            <svg v-if="mensajeNotificacion.tipo === 'success'" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <svg v-else class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
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

      <!-- Instrucciones -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
          <h2 class="text-xl font-bold text-emerald-900 flex items-center">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Instrucciones
          </h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-emerald-700 font-bold text-sm">1</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Prepara tu archivo Excel</h3>
                <p class="text-gray-600 text-sm mt-1">El archivo debe tener exactamente dos columnas con los siguientes datos:</p>
              </div>
            </div>

            <div class="ml-11 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                  <thead class="bg-emerald-50">
                    <tr>
                      <th class="px-4 py-2 text-left font-semibold text-emerald-900 border-b">Columna A</th>
                      <th class="px-4 py-2 text-left font-semibold text-emerald-900 border-b">Columna B</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b">
                      <td class="px-4 py-2 font-mono text-xs text-gray-600">Número de Cuenta</td>
                      <td class="px-4 py-2 font-mono text-xs text-gray-600">ID Lista de Precio</td>
                    </tr>
                    <tr class="border-b">
                      <td class="px-4 py-2 text-gray-700">123456</td>
                      <td class="px-4 py-2 text-gray-700">LP001</td>
                    </tr>
                    <tr class="bg-white">
                      <td class="px-4 py-2 text-gray-700">789012</td>
                      <td class="px-4 py-2 text-gray-700">LP002</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-emerald-700 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Sube el archivo</h3>
                <p class="text-gray-600 text-sm mt-1">Arrastra el archivo Excel a la zona de carga o haz clic para seleccionarlo.</p>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span class="text-emerald-700 font-bold text-sm">3</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Verifica y aplica</h3>
                <p class="text-gray-600 text-sm mt-1">Revisa la vista previa de los datos y confirma para aplicar los cambios.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Zona de subida -->
      <div v-if="datosListasPrecios.length === 0" class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
          <h2 class="text-xl font-bold text-emerald-900 flex items-center">
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
            </svg>
            Subir Archivo Excel
          </h2>
        </div>

        <div 
          class="p-12 border-2 border-dashed border-emerald-300 m-6 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 transition-all cursor-pointer"
          :class="{ 'border-emerald-500 bg-emerald-100': arrastrando }"
          @dragover.prevent
          @dragenter.prevent="arrastrando = true"
          @dragleave.prevent="arrastrando = false"
          @drop.prevent="manejarDrop"
          @click="$refs.fileInput.click()"
        >
          <div class="flex flex-col items-center space-y-4">
            <div class="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform"
                 :class="{ 'scale-110': arrastrando }">
              <svg class="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            </div>
            <div class="text-center">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">
                {{ arrastrando ? 'Suelta el archivo aquí' : 'Arrastra tu archivo Excel aquí' }}
              </h3>
              <p class="text-gray-600 mb-4">o haz clic para seleccionar</p>
              <div class="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>Formatos: .xlsx, .xls</span>
                </div>
              </div>
            </div>
            <input
              ref="fileInput"
              type="file"
              accept=".xlsx,.xls"
              @change="procesarArchivo"
              class="hidden"
            >
          </div>
        </div>
      </div>

      <!-- Vista previa y confirmación -->
      <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-emerald-900 flex items-center">
              <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Vista Previa - {{ datosListasPrecios.length }} clientes
            </h2>
            <button
              @click="limpiarDatos"
              :disabled="procesando"
              class="text-sm text-red-600 hover:text-red-700 disabled:opacity-50 flex items-center"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              Limpiar
            </button>
          </div>
        </div>

        <!-- Advertencia -->
        <div class="mx-6 mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div class="flex">
            <svg class="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <div class="text-sm text-yellow-800">
              <strong>Importante:</strong> Esta operación cambiará la lista de precio de todos los clientes mostrados abajo. Verifica que los datos sean correctos antes de continuar.
            </div>
          </div>
        </div>

        <!-- Tabla -->
        <div class="p-6">
          <div class="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-emerald-50 sticky top-0">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-emerald-900 uppercase">#</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-emerald-900 uppercase">Nro. Cuenta</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-emerald-900 uppercase">ID Lista de Precio</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-100">
                <tr v-for="(item, index) in datosListasPrecios" :key="index" class="hover:bg-emerald-50 transition-colors">
                  <td class="px-6 py-3 text-sm text-gray-500">{{ index + 1 }}</td>
                  <td class="px-6 py-3 text-sm font-mono font-semibold text-gray-900">{{ item.nrocta }}</td>
                  <td class="px-6 py-3 text-sm font-mono font-semibold text-emerald-700">{{ item.lista_precio_id }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="px-6 pb-6 flex justify-end space-x-3">
          <button
            @click="limpiarDatos"
            :disabled="procesando"
            class="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            Cancelar
          </button>
          <button
            @click="aplicarCambios"
            :disabled="procesando"
            class="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-semibold"
          >
            <svg v-if="procesando" class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="!procesando">Aplicar Cambios ({{ datosListasPrecios.length }})</span>
            <span v-else>Aplicando cambios...</span>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { cambiarListaService } from '../services/cambiarListaService.js';
import WaveBackground from '../components/WaveBackground.vue';

// Estado
const datosListasPrecios = ref([]);
const arrastrando = ref(false);
const procesando = ref(false);
const mensajeNotificacion = ref(null);
const fileInput = ref(null);

// Funciones
const procesarArchivo = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  
  await cargarExcel(file);
};

const manejarDrop = async (event) => {
  arrastrando.value = false;
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    await cargarExcel(files[0]);
  }
};

const cargarExcel = async (file) => {
  procesando.value = true;
  
  try {
    const XLSX = await import('xlsx');
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    
    // Leer primera hoja
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Saltar primera fila si parece ser header
    const startRow = jsonData[0]?.[0]?.toString().toLowerCase().includes('cuenta') ? 1 : 0;
    
    // Mapear datos
    const datos = jsonData.slice(startRow).map(row => ({
      nrocta: row[0]?.toString().trim() || '',
      lista_precio_id: row[1]?.toString().trim() || ''
    })).filter(item => item.nrocta && item.lista_precio_id);
    
    if (datos.length === 0) {
      mensajeNotificacion.value = {
        tipo: 'error',
        texto: 'El archivo no contiene datos válidos. Verifica el formato.'
      };
      return;
    }
    
    datosListasPrecios.value = datos;
    console.log('Datos cargados:', datos.length);
    
  } catch (err) {
    console.error('Error al procesar Excel:', err);
    mensajeNotificacion.value = {
      tipo: 'error',
      texto: 'Error al procesar el archivo: ' + err.message
    };
  } finally {
    procesando.value = false;
  }
};

const aplicarCambios = async () => {
  if (!confirm(`¿Estás seguro de cambiar la lista de precio de ${datosListasPrecios.value.length} clientes?`)) {
    return;
  }
  
  procesando.value = true;
  
  try {
    const response = await cambiarListaService.setListaPrecioClientes(datosListasPrecios.value);
    
    if (response.success) {
      mensajeNotificacion.value = {
        tipo: 'success',
        texto: `✓ Listas de precio actualizadas exitosamente para ${datosListasPrecios.value.length} clientes`
      };
      
      // Limpiar después de 3 segundos
      setTimeout(() => {
        limpiarDatos();
      }, 3000);
    } else {
      throw new Error(response.error || 'Error desconocido');
    }
    
  } catch (err) {
    console.error('Error al aplicar cambios:', err);
    mensajeNotificacion.value = {
      tipo: 'error',
      texto: '❌ Error: ' + (err.message || 'Error desconocido')
    };
  } finally {
    procesando.value = false;
  }
};

const limpiarDatos = () => {
  datosListasPrecios.value = [];
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
