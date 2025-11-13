<template>
  <div class="min-h-full bg-gradient-to-br from-purple-50 via-white to-pink-50 relative">
    <!-- Wave Background -->
    <WaveBackground 
      primary-color="#9333ea" 
      primary-opacity="0.3"
      secondary-color="#ec4899" 
      secondary-opacity="0.2"
    />
    
    <!-- Contenido principal -->
    <div class="relative z-20 p-6 max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8 max-w-7xl mx-auto">
        <div class="flex items-center space-x-4 mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl relative">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl blur opacity-50"></div>
            <svg class="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-5xl font-bold bg-gradient-to-r from-purple-900 via-purple-700 to-pink-700 bg-clip-text text-transparent tracking-tight">
              Cambiar Precio por Producto
            </h1>
          </div>
        </div>
        <p class="text-gray-600 text-lg flex items-center ml-20">
          <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
          </svg>
          Actualiza precios de productos específicos en listas de precios
        </p>
      </div>

      <!-- Formulario de entrada -->
      <div class="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 p-8 card-shadow">
        <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <div class="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>
          Agregar Producto
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div>
            <label class="block text-sm font-bold text-gray-900 mb-3 flex items-center">
              <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              ID Lista
            </label>
            <input
              v-model.number="nuevoItem.lista_id"
              type="number"
              placeholder="Ej: 1"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all font-medium shadow-sm hover:shadow-md"
              @keyup.enter="agregarProducto"
            >
          </div>
          
          <div>
            <label class="block text-sm font-bold text-gray-900 mb-3 flex items-center">
              <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
              ID Producto
            </label>
            <input
              v-model.number="nuevoItem.producto_id"
              type="number"
              placeholder="Ej: 123"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all font-medium shadow-sm hover:shadow-md"
              @keyup.enter="agregarProducto"
            >
          </div>
          
          <div>
            <label class="block text-sm font-bold text-gray-900 mb-3 flex items-center">
              <svg class="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
              Precio Nuevo
            </label>
            <input
              v-model.number="nuevoItem.precio"
              type="number"
              step="0.01"
              placeholder="Ej: 99.99"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all font-medium shadow-sm hover:shadow-md"
              @keyup.enter="agregarProducto"
            >
          </div>
          
          <div class="flex items-end">
            <button
              @click="agregarProducto"
              class="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center"
              :disabled="!formularioValido"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Agregar
            </button>
          </div>
        </div>

        <!-- Lista de productos agregados -->
        <div v-if="productos.length > 0" class="border-t-2 border-gray-200 pt-6">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-lg font-bold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
              </svg>
              Productos a actualizar ({{ productos.length }})
            </h4>
            <button
              @click="productos = []"
              class="px-4 py-2 text-red-600 hover:text-red-800 font-semibold flex items-center hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              Limpiar todo
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="(producto, index) in productos"
              :key="index"
              class="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200 hover:shadow-lg transition-all group"
            >
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {{ index + 1 }}
                  </div>
                  <span class="text-xs font-bold text-purple-600 uppercase">Producto</span>
                </div>
                <button
                  @click="eliminarProducto(index)"
                  class="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              
              <div class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 font-medium">Lista:</span>
                  <span class="font-bold text-blue-600">#{{ producto.lista_id }}</span>
                </div>
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-600 font-medium">Producto:</span>
                  <span class="font-bold text-green-600">#{{ producto.producto_id }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600 font-medium text-sm">Precio:</span>
                  <span class="font-bold text-orange-600 text-lg">${{ producto.precio.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Botón de enviar -->
          <div class="mt-6 flex justify-end">
            <button
              @click="enviarPrecios"
              :disabled="procesando"
              class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center text-lg"
            >
              <svg v-if="!procesando" class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <svg v-else class="animate-spin w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ procesando ? 'Actualizando...' : 'Actualizar Precios' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Mensaje de éxito -->
      <div v-if="mensaje.tipo === 'exito'" class="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 card-shadow">
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-green-900 mb-2">¡Precios actualizados correctamente!</h3>
            <p class="text-green-800 font-medium">{{ mensaje.texto }}</p>
            <button
              @click="reiniciar"
              class="mt-4 px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
            >
              Actualizar más productos
            </button>
          </div>
        </div>
      </div>

      <!-- Mensaje de error -->
      <div v-if="mensaje.tipo === 'error'" class="mb-8 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-8 card-shadow">
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <div class="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-red-900 mb-2">Error al actualizar precios</h3>
            <p class="text-red-800 font-medium">{{ mensaje.texto }}</p>
          </div>
        </div>
      </div>

      <!-- Ayuda -->
      <div class="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
        <h3 class="text-lg font-bold text-blue-900 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          ¿Cómo usar esta función?
        </h3>
        <ul class="space-y-2 text-blue-800">
          <li class="flex items-start">
            <svg class="w-5 h-5 mr-2 mt-0.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span><strong>Paso 1:</strong> Ingresa el ID de la lista de precios donde quieres actualizar</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 mr-2 mt-0.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span><strong>Paso 2:</strong> Ingresa el ID del producto que deseas modificar</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 mr-2 mt-0.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span><strong>Paso 3:</strong> Ingresa el nuevo precio para ese producto</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 mr-2 mt-0.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span><strong>Paso 4:</strong> Haz clic en "Agregar" para añadir el producto a la lista</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 mr-2 mt-0.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span><strong>Paso 5:</strong> Repite el proceso para agregar más productos</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 mr-2 mt-0.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span><strong>Paso 6:</strong> Cuando termines, haz clic en "Actualizar Precios"</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import WaveBackground from '../components/WaveBackground.vue';
import cambiarListaService from '../services/cambiarListaService';

// Estado
const nuevoItem = ref({
  lista_id: null,
  producto_id: null,
  precio: null
});

const productos = ref([]);
const procesando = ref(false);
const mensaje = ref({
  tipo: '', // 'exito' | 'error'
  texto: ''
});

// Computed
const formularioValido = computed(() => {
  return nuevoItem.value.lista_id > 0 && 
         nuevoItem.value.producto_id > 0 && 
         nuevoItem.value.precio > 0;
});

// Métodos
const agregarProducto = () => {
  if (!formularioValido.value) {
    return;
  }

  productos.value.push({
    lista_id: nuevoItem.value.lista_id,
    producto_id: nuevoItem.value.producto_id,
    precio: nuevoItem.value.precio
  });

  // Limpiar formulario pero mantener lista_id
  const listaId = nuevoItem.value.lista_id;
  nuevoItem.value = {
    lista_id: listaId,
    producto_id: null,
    precio: null
  };
};

const eliminarProducto = (index) => {
  productos.value.splice(index, 1);
};

const enviarPrecios = async () => {
  if (productos.value.length === 0) {
    return;
  }

  procesando.value = true;
  mensaje.value = { tipo: '', texto: '' };

  try {
    const resultado = await cambiarListaService.setPreciosProductos(productos.value);

    if (resultado.success) {
      mensaje.value = {
        tipo: 'exito',
        texto: resultado.mensaje
      };
    } else {
      mensaje.value = {
        tipo: 'error',
        texto: resultado.error
      };
    }
  } catch (error) {
    mensaje.value = {
      tipo: 'error',
      texto: 'Error inesperado al actualizar los precios'
    };
    console.error('Error:', error);
  } finally {
    procesando.value = false;
  }
};

const reiniciar = () => {
  productos.value = [];
  nuevoItem.value = {
    lista_id: null,
    producto_id: null,
    precio: null
  };
  mensaje.value = { tipo: '', texto: '' };
};
</script>

<style scoped>
.card-shadow {
  animation: slideInUp 0.6s ease-out;
  box-shadow: 
    0 10px 25px -5px rgba(0, 0, 0, 0.1), 
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

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
</style>
