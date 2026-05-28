/**
 * Configuración centralizada para APIs
 */

// Detectar si estamos en desarrollo o producción
const isProduction = import.meta.env.PROD;

// URL base para todos los servicios
export const API_CONFIG = {
  BASE_URL: isProduction ? 'http://192.168.0.58/api' : '/api',
  BASE_URL_CAFE: isProduction ? 'http://192.168.0.251:8083/api' : '/api-cafe',
  TIMEOUT: 300000, // 5 minutos para operaciones masivas
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

/**
 * Obtiene la empresa actual desde localStorage
 * @returns {string} ID de la empresa actual
 */
export const getEmpresaActual = () => {
  return localStorage.getItem('empresaActual') || 'IVESS';
};

/**
 * Obtiene el parámetro de ambiente para las peticiones API (IVESS)
 * @returns {string|null} - 'AGUAS-PROD' si es producción, null si es pruebas
 */
export const getAmbienteParam = () => {
  const ambiente = localStorage.getItem('ambiente') || 'PRUEBAS';
  return ambiente === 'PRODUCCION' ? 'AGUAS-PROD' : null;
};

/**
 * Obtiene el parámetro de ambiente para las peticiones API de Lavazza
 * @returns {string|null} - 'PROD' si es producción, null si es pruebas
 */
export const getAmbienteParamLavazza = () => {
  const ambiente = localStorage.getItem('ambiente') || 'PRUEBAS';
  return ambiente === 'PRODUCCION' ? 'PROD' : null;
};

export const ENDPOINTS = {
  CAMBIO_PRECIOS: {
    CLIENTES_DESCUENTO:                '/cambio-precios/get-clientes-con-descuento',
    CLIENTES_DESCUENTOS_MASIVOS:       '/cambio-precios/get-clientes-con-descuentos-masivos',
    LISTAS_PRECIOS:                    '/cambio-precios/listas-precios',
    PRECIOS_ESPECIALES_CLIENTE:        '/cambio-precios/set-precios-especiales-cliente',
    DELETE_PRECIOS_ESPECIALES_CLIENTE: '/cambio-precios/delete-precios-especiales-cliente',
    OBTENER_PRECIOS_ACTUALES:          '/cambio-precios/get-precios-actuales-clientes',
    PROCESAR_EXCEL:                    '/cambio-precios/procesar-excel',
    GENERAR_CAMBIO_MASIVO:             '/cambio-precios/generar-cambio-precios-masivo',
    INSERTAR_NUEVA_LISTA:              '/cambio-precios/insertar-nueva-lista-precio',
    GET_PRODUCTOS:                     '/cambio-precios/get-productos',
    INSERTAR_LISTA_PRECIOS_PRODUCTOS:  '/cambio-precios/insertar-lista-precios-productos'
  },
  CAMBIO_PRECIOS_CAFE: {
    PRODUCTOS:                '/cambio-precios-cafe/productos',
    LISTAS_CON_PRODUCTOS:     '/cambio-precios-cafe/listas-con-productos',
    SET_PRECIO_LISTA_PRODUCTO: '/cambio-precios-cafe/set-precio-lista-producto',
    SET_PRECIO_ESPECIAL_CLIENTE: '/cambio-precios-cafe/set-precio-especial-cliente',
    CLIENTES_DESCUENTO:       '/cambio-precios-cafe/clientes-descuento',
    PRECIO_CLIENTE_PRODUCTO:  '/cambio-precios-cafe/precio-cliente-producto'
  }
};

export default API_CONFIG;
