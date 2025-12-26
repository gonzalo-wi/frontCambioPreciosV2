import axios from 'axios';
import { API_CONFIG, ENDPOINTS, getEmpresaActual, getAmbienteParam } from '../config/api.js';

// Configuración de axios para archivos
const apiFile = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 30000 // Timeout mayor para archivos
  // No establecemos Content-Type aquí para que axios lo haga automáticamente con multipart/form-data
});

// Interceptor para agregar empresa y ambiente a requests de archivo
apiFile.interceptors.request.use(
  config => {
    // const empresa = getEmpresaActual();
    const ambiente = getAmbienteParam();
    
    if (!config.params) {
      config.params = {};
    }
    // config.params.empresa = empresa; // Comentado temporalmente - no implementado en backend
    
    // Agregar parámetro ambiente solo si es producción
    if (ambiente) {
      config.params.ambiente = ambiente;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor para debugging solo en desarrollo
if (import.meta.env.DEV) {
  apiFile.interceptors.request.use(request => {
    console.log('API Request:', request.method?.toUpperCase(), request.url);
    return request;
  });

  apiFile.interceptors.response.use(
    response => {
      console.log('API Response Success:', response.status, response.config.url);
      return response;
    },
    error => {
      console.log('API Response Error:', error.response?.status || 'Network Error', error.config?.url);
      return Promise.reject(error);
    }
  );
}

// Configuración de axios para requests normales
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS
});

// Interceptor para agregar empresa y ambiente a requests normales
api.interceptors.request.use(
  config => {
    // const empresa = getEmpresaActual();
    const ambiente = getAmbienteParam();
    
    if (!config.params) {
      config.params = {};
    }
    // config.params.empresa = empresa; // Comentado temporalmente - no implementado en backend
    
    // Agregar parámetro ambiente solo si es producción
    if (ambiente) {
      config.params.ambiente = ambiente;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const cambiarListaService = {
  // Normaliza números provenientes de strings con formato AR/US
  _normalizarNumero(valor) {
    if (valor === null || valor === undefined) return null;
    if (typeof valor === 'number' && !isNaN(valor)) return valor;
    let s = String(valor).trim();
    if (s === '' || s === '-' || s.toLowerCase() === 'null') return null;
    s = s.replace(/[^0-9,.-]/g, '');
    if (s.includes(',') && s.includes('.')) {
      s = s.replace(/,/g, '');
    } else if (s.includes(',') && !s.includes('.')) {
      s = s.replace(/\./g, '');
      s = s.replace(',', '.');
    }
    const n = parseFloat(s);
    return isNaN(n) ? null : n;
  },
  /**
   * Prueba el endpoint con un request simple para verificar conectividad
   */
  async probarConectividad() {
    try {
      const response = await api.get('/');
      console.log('Conectividad OK:', response);
      return true;
    } catch (error) {
      console.error('Error de conectividad:', error);
      return false;
    }
  },

  /**
   * Genera cambio de precios masivo a partir de un array de precios
   * @param {Array<{lista_id:string, producto_id:string, precio:number}>} precios
   * @returns {Promise<{success:boolean, data?:any, error?:string}>}
   */
  async generarCambioPreciosMasivo(precios) {
    try {
      if (!Array.isArray(precios) || precios.length === 0) {
        throw new Error('No hay precios para enviar');
      }

      const payload = { precios };
      if (import.meta.env.DEV) {
        console.log('Enviando cambio masivo:', JSON.stringify(payload, null, 2));
      }

      const response = await api.post(ENDPOINTS.CAMBIO_PRECIOS.GENERAR_CAMBIO_MASIVO, payload);
      return { success: true, data: response.data };
    } catch (error) {
      let mensaje = 'Error al generar cambio de precios masivo';
      if (error.response?.data) {
        mensaje = error.response.data?.error || error.response.data?.message || mensaje;
      } else if (error.message) {
        mensaje = error.message;
      }
      if (import.meta.env.DEV) {
        console.error('Error cambio masivo:', error.response?.status, error.response?.data || error.message);
      }
      return { success: false, error: mensaje };
    }
  },

  /**
   * Prueba con fetch nativo como alternativa
   */
  async subirExcelConFetch(file, onProgress = null) {
    try {
      const formData = new FormData();
      formData.append('excel_file', file);
      formData.append('has_header', true);

      const response = await fetch(`${API_CONFIG.BASE_URL}/cambio-precios/procesar-excel`, {
        method: 'POST',
        body: formData
      });

      console.log('Fetch response status:', response.status);
      console.log('Fetch response headers:', Object.fromEntries(response.headers));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error con fetch:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Sube un archivo Excel para procesar cambios de precios
   * @param {File} file - Archivo Excel
   * @param {Object} options - Opciones de procesamiento
   * @param {boolean} options.hasHeader - Si las hojas tienen cabeceras (default: true)
   * @param {Array} options.sheetsToProcess - Hojas específicas a procesar (opcional)
   * @param {Function} onProgress - Callback para el progreso de subida (opcional)
   * @returns {Promise} Respuesta de la API con los datos procesados
   */
  /**
   * Versión exacta como Postman - SOLO el archivo
   */
  async subirExcelSoloArchivo(file, onProgress = null) {
    try {
      if (import.meta.env.DEV) {
        console.log('Probando versión SOLO archivo (como Postman)...');
      }
      
      const formData = new FormData();
      formData.append('excel_file', file);
      // NO agregar nada más, exactamente como en Postman

      const config = {
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(progress);
          }
        }
      };

      const response = await apiFile.post('/cambio-precios/procesar-excel', formData, config);
      return { success: true, data: response.data };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error en versión solo archivo:', error.message);
        if (error.response?.data?.details) {
          console.error('Detalles de validación:', error.response.data.details);
        }
      }
      return { success: false, error: error.response?.data?.error || error.message };
    }
  },

  async subirExcel(file, options = {}, onProgress = null) {
    try {
      // Validar que sea un archivo Excel
      if (!this.esArchivoExcel(file)) {
        throw new Error('El archivo debe ser un Excel (.xlsx, .xls)');
      }

      // Validar tamaño (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('El archivo es demasiado grande (máximo 10MB)');
      }

      const formData = new FormData();
      
      // SOLO agregar el archivo, tal como funciona en Postman
      formData.append('excel_file', file);
      
      // Agregar parámetros opcionales solo si están definidos
      if (options.hasHeader !== undefined) {
        formData.append('has_header', options.hasHeader ? 'true' : 'false');
      }
      
      // Agregar hojas específicas solo si se proporcionan y no están vacías
      if (options.sheetsToProcess && Array.isArray(options.sheetsToProcess) && options.sheetsToProcess.length > 0) {
        formData.append('sheets_to_process', JSON.stringify(options.sheetsToProcess));
      }

      // Log detallado para debugging
      if (import.meta.env.DEV) {
        console.log('Archivo:', {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: new Date(file.lastModified).toISOString()
        });
        
        console.log('Parámetros enviados:');
        for (let [key, value] of formData.entries()) {
          if (value instanceof File) {
            console.log(key, ':', `[File: ${value.name}, ${value.size} bytes]`);
          } else {
            console.log(key, ':', value);
          }
        }
      }

      const config = {
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(progress);
          }
        }
      };

      // Log solo en desarrollo
      if (import.meta.env.DEV) {
        console.log('Enviando archivo:', file.name, 'Tamaño:', this.formatearTamaño(file.size));
      }

      const response = await apiFile.post('/cambio-precios/procesar-excel', formData, config);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error al subir Excel:', error.message);
        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Data:', error.response.data);
          console.error('Details:', error.response.data?.details);
        }
      }
      let errorMessage = 'Error al procesar el archivo';
      
      if (error.response) {
        // Error del servidor con respuesta
        if (error.response.status === 400) {
          const data = error.response.data;
          if (data?.details) {
            // Si hay detalles específicos, mostrarlos
            const detalles = Object.entries(data.details)
              .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
              .join('; ');
            errorMessage = `${data.error || 'Error de validación'} - ${detalles}`;
          } else {
            errorMessage = data?.error || data?.message || 'Datos inválidos en el archivo';
          }
        } else if (error.response.status === 413) {
          errorMessage = 'El archivo es demasiado grande';
        } else if (error.response.status === 415) {
          errorMessage = 'Formato de archivo no soportado';
        } else {
          errorMessage = `Error del servidor (${error.response.status}): ${error.response.data?.message || 'Error desconocido'}`;
        }
      } else if (error.request) {
        // Error de red
        errorMessage = 'Error de conexión con el servidor';
      } else {
        // Error en la configuración
        errorMessage = error.message;
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  },

  /**
   * Valida si el archivo es un Excel válido
   * @param {File} file - Archivo a validar
   * @returns {boolean}
   */
  esArchivoExcel(file) {
    // Validar extensión
    const extensionesValidas = ['.xlsx', '.xls'];
    const extension = '.' + file.name.split('.').pop().toLowerCase();
    const extensionValida = extensionesValidas.includes(extension);
    
    // Validar MIME type
    const mimeTypesValidos = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'application/octet-stream' // Fallback común
    ];
    const mimeTypeValido = mimeTypesValidos.includes(file.type) || file.type === '';
    
    if (import.meta.env.DEV) {
      console.log('Validación archivo:', {
        name: file.name,
        extension,
        mimeType: file.type,
        extensionValida,
        mimeTypeValido
      });
    }
    
    return extensionValida && (mimeTypeValido || file.type === '');
  },

  /**
   * Formatea el tamaño del archivo en MB
   * @param {number} bytes - Tamaño en bytes
   * @returns {string} Tamaño formateado
   */
  formatearTamaño(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const decimales = 2;
    const tamaños = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimales)) + ' ' + tamaños[i];
  },

  /**
   * Formatea el porcentaje de aumento
   * @param {number} porcentaje - Porcentaje decimal (ej: 0.1176)
   * @returns {string} Porcentaje formateado (ej: "11.76%")
   */
  formatearPorcentaje(porcentaje) {
    const n = this._normalizarNumero(porcentaje);
    if (n === null) return '(vacío)';
    const percent = n <= 1 ? n * 100 : n;
    return percent.toFixed(2) + '%';
  },

  /**
   * Formatea precio en formato argentino
   * @param {number|string} precio - Precio a formatear
   * @returns {string} Precio formateado
   */
  formatearPrecio(precio) {
    const n = this._normalizarNumero(precio);
    if (n === null) return '$\u00A00,00';
    return n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  },

  /**
   * Calcula estadísticas de una hoja
   * @param {Array} data - Datos de la hoja
   * @returns {Object} Estadísticas calculadas
   */
  calcularEstadisticas(data) {
    if (!data || data.length === 0) {
      return {
        totalProductos: 0,
        aumentoPromedio: 0,
        aumentoMinimo: 0,
        aumentoMaximo: 0
      };
    }

    const aumentos = data.map(item => {
      const v = this._normalizarNumero(item['% Aumento']);
      if (v === null) return 0;
      return v <= 1 ? v : v / 100; // admitir 12 o 0.12
    });
    
    return {
      totalProductos: data.length,
      aumentoPromedio: (aumentos.reduce((sum, aumento) => sum + aumento, 0) / aumentos.length * 100).toFixed(2),
      aumentoMinimo: (Math.min(...aumentos) * 100).toFixed(2),
      aumentoMaximo: (Math.max(...aumentos) * 100).toFixed(2)
    };
  },

  /**
   * Obtiene la clase CSS según el porcentaje de aumento
   * @param {number} porcentaje - Porcentaje decimal
   * @returns {string} Clases CSS
   */
  getClasePorcentaje(porcentaje) {
    const v = this._normalizarNumero(porcentaje);
    const percent = v === null ? 0 : (v <= 1 ? v * 100 : v);
    
    if (percent >= 15) return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200';
    if (percent >= 10) return 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-orange-200';
    if (percent >= 5) return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200';
    return 'bg-gradient-to-r from-green-100 to-blue-100 text-green-800 border-green-200';
  },

  /**
   * Actualiza precios para productos específicos en listas
   * @param {Array} productos - Array de objetos {lista_id, producto_id, precio, precio_anterior}
   * @returns {Promise<Object>} Resultado de la operación
   */
  async setPreciosProductos(productos) {
    try {
      console.log('Enviando precios de productos:', productos);
      
      // El PUT requiere el wrapper "data" según la documentación
      const payload = { data: productos };
      console.log('Datos a enviar:', JSON.stringify(payload, null, 2));
      
      const response = await api.put('/cambio-precios/actualizar-lista-precios-productos', payload);

      console.log('Respuesta del servidor:', response.data);

      return {
        success: true,
        data: response.data,
        mensaje: response.data.mensaje || 'Precios actualizados correctamente'
      };
    } catch (error) {
      console.error('Error al actualizar precios:', error);
      console.error('Respuesta del servidor:', error.response?.data);
      
      let mensajeError = 'Error al actualizar los precios de productos';
      
      if (error.response) {
        // Intentar obtener el mensaje de error del servidor
        const serverError = error.response.data;
        if (typeof serverError === 'string') {
          mensajeError = serverError;
        } else if (serverError?.mensaje) {
          mensajeError = serverError.mensaje;
        } else if (serverError?.error) {
          mensajeError = serverError.error;
        } else if (serverError?.message) {
          mensajeError = serverError.message;
        } else {
          mensajeError = `Error del servidor: ${error.response.status}`;
        }
      } else if (error.request) {
        mensajeError = 'No se pudo conectar con el servidor';
      }

      return {
        success: false,
        error: mensajeError,
        detalles: error.response?.data
      };
    }
  },

  /**
   * Cambia las listas de precio de múltiples clientes de forma masiva
   * @param {Array<{nrocta:string, lista_precio_id:string}>} data
   * @returns {Promise<{success:boolean, data?:any, error?:string}>}
   */
  async setListaPrecioClientes(data) {
    try {
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No hay datos para enviar');
      }

      const payload = { data };
      if (import.meta.env.DEV) {
        console.log('Cambiando listas de precio:', JSON.stringify(payload, null, 2));
      }

      const response = await api.put('/cambio-precios/set-lista-precio-clientes', payload);
      return { success: true, data: response.data };
    } catch (error) {
      let mensajeError = 'Error al cambiar listas de precio';
      
      if (error.response?.data) {
        const serverError = error.response.data;
        if (typeof serverError === 'string') {
          mensajeError = serverError;
        } else if (serverError?.error) {
          mensajeError = serverError.error;
        } else if (serverError?.message) {
          mensajeError = serverError.message;
        } else {
          mensajeError = `Error del servidor: ${error.response.status}`;
        }
      } else if (error.request) {
        mensajeError = 'No se pudo conectar con el servidor';
      }

      if (import.meta.env.DEV) {
        console.error('Error al cambiar listas:', error.response?.status, error.response?.data || error.message);
      }

      return {
        success: false,
        error: mensajeError,
        detalles: error.response?.data
      };
    }
  }
};

export default cambiarListaService;
