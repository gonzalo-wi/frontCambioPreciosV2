/**
 * Configuración centralizada para APIs
 */

// Detectar si estamos en desarrollo o producción
const isProduction = import.meta.env.PROD;

// URL base para todos los servicios
export const API_CONFIG = {
  BASE_URL: isProduction ? 'http://192.168.0.251:8083/api' : '/api',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};


export const ENDPOINTS = {
  CAMBIO_PRECIOS: {
    CLIENTES_DESCUENTO: '/cambio-precios/get-clientes-con-descuento',
    LISTAS_PRECIOS: '/cambio-precios/listas-precios',
    PRECIOS_ESPECIALES_CLIENTE: '/cambio-precios/set-precios-especiales-cliente',
    PROCESAR_EXCEL: '/cambio-precios/procesar-excel',
    GENERAR_CAMBIO_MASIVO: '/cambio-precios/generar-cambio-precios-masivo'
  }
};

export default API_CONFIG;
