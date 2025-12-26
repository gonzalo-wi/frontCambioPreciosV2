import axios from 'axios';
import { API_CONFIG, ENDPOINTS, getEmpresaActual, getAmbienteParam } from '../config/api.js';

// Configuración base de axios
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS
});

// Interceptor para agregar empresa y ambiente a todas las requests
api.interceptors.request.use(
  config => {
    // Agregar parámetro de empresa a URL params
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

// Interceptor para manejo de errores
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la API:', error);
    return Promise.reject(error);
  }
);

/**
 * Servicio para manejar clientes con descuentos
 */
export const clientesPreciosService = {
  
  /**
   * Obtiene clientes con descuentos con paginación
   * @param {Object} params - Parámetros de filtrado
   * @param {number} params.page - Página actual (opcional, default: 1)
   * @param {number} params.per_page - Elementos por página (opcional, default: 15)
   * @param {number} params.descuento - Filtro por descuento (opcional)
   * @param {string} params.nrocta - Filtro por número de cuenta (opcional)
   * @returns {Promise} Respuesta de la API con datos paginados
   */
  async getClientesConDescuento(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Agregar parámetros si existen
      if (params.page) queryParams.append('page', params.page);
      if (params.per_page) queryParams.append('per_page', params.per_page);
      if (params.descuento) queryParams.append('descuento', params.descuento);
      if (params.nrocta) queryParams.append('nrocta', params.nrocta);
      
      const url = `${ENDPOINTS.CAMBIO_PRECIOS.CLIENTES_DESCUENTO}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error al obtener clientes con descuento:', error);
      throw error;
    }
  },

  /**
   * Busca clientes por número de cuenta específico
   * @param {string} nrocta - Número de cuenta del cliente
   * @param {Object} options - Opciones adicionales
   * @param {number} options.per_page - Elementos por página
   * @returns {Promise} Respuesta de la API
   */
  async buscarClientePorCuenta(nrocta, options = {}) {
    try {
      return await this.getClientesConDescuento({
        nrocta: nrocta,
        per_page: options.per_page || 15
      });
    } catch (error) {
      console.error('Error al buscar cliente por cuenta:', error);
      throw error;
    }
  },

  /**
   * Filtra clientes por rango de descuento
   * @param {number} descuentoMinimo - Descuento mínimo
   * @param {Object} options - Opciones adicionales
   * @param {number} options.page - Página actual
   * @param {number} options.per_page - Elementos por página
   * @returns {Promise} Respuesta de la API
   */
  async filtrarPorDescuento(descuentoMinimo, options = {}) {
    try {
      return await this.getClientesConDescuento({
        descuento: descuentoMinimo,
        page: options.page || 1,
        per_page: options.per_page || 15
      });
    } catch (error) {
      console.error('Error al filtrar por descuento:', error);
      throw error;
    }
  },

  /**
   * Obtiene estadísticas de descuentos
   * @param {Array} clientes - Array de clientes para calcular estadísticas
   * @returns {Object} Estadísticas calculadas
   */
  calcularEstadisticasDescuentos(clientes) {
    if (!clientes || clientes.length === 0) {
      return {
        total: 0,
        descuentoPromedio: 0,
        descuentoMinimo: 0,
        descuentoMaximo: 0,
        totalAhorro: 0
      };
    }

    const descuentos = clientes.map(cliente => parseFloat(cliente.descuento));
    const preciosReales = clientes.map(cliente => parseFloat(cliente.precioReal));
    const preciosLista = clientes.map(cliente => parseFloat(cliente.precioLista));
    
    const totalAhorro = preciosLista.reduce((sum, precio, index) => {
      return sum + (precio - preciosReales[index]);
    }, 0);

    return {
      total: clientes.length,
      descuentoPromedio: (descuentos.reduce((sum, desc) => sum + desc, 0) / descuentos.length).toFixed(2),
      descuentoMinimo: Math.min(...descuentos).toFixed(2),
      descuentoMaximo: Math.max(...descuentos).toFixed(2),
      totalAhorro: totalAhorro.toFixed(2)
    };
  },

  /**
   * Formatea los datos del cliente para mostrar
   * @param {Object} cliente - Datos del cliente
   * @returns {Object} Cliente formateado
   */
  formatearCliente(cliente) {
    return {
      nrocta: cliente.nrocta,
      idproducto: cliente.idproducto,
      producto_id: cliente.idproducto, // Usar el mismo campo para compatibilidad
      precioReal: parseFloat(cliente.precioReal).toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
      }),
      precioLista: parseFloat(cliente.precioLista).toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
      }),
      descuento: `${cliente.descuento}%`,
      descuentoNumerico: parseFloat(cliente.descuento),
      ahorro: (parseFloat(cliente.precioLista) - parseFloat(cliente.precioReal)).toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
      })
    };
  },

  /**
   * Agrupa clientes por número de cuenta
   * @param {Array} clientes - Array de clientes
   * @returns {Object} Clientes agrupados por cuenta
   */
  agruparPorCuenta(clientes) {
    return clientes.reduce((grupos, cliente) => {
      const cuenta = cliente.nrocta;
      if (!grupos[cuenta]) {
        grupos[cuenta] = [];
      }
      grupos[cuenta].push(this.formatearCliente(cliente));
      return grupos;
    }, {});
  },

  /**
   * Actualiza o inserta precios especiales para clientes
   * @param {Array} precios - Array de objetos con {nrocta, producto_id, precio_especial}
   * @returns {Promise} Respuesta de la API
   */
  async setPreciosEspecialesCliente(precios) {
    try {
      const response = await api.put(ENDPOINTS.CAMBIO_PRECIOS.PRECIOS_ESPECIALES_CLIENTE, {
        data: precios
      });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar precios especiales:', error);
      
      // Extraer mensaje de error del servidor si existe
      const errorMessage = error.response?.data?.error 
        || error.response?.data?.message 
        || 'Error al actualizar precios especiales';
      
      const errorDetails = error.response?.data?.details || '';
      
      throw new Error(`${errorMessage}${errorDetails ? ': ' + errorDetails : ''}`);
    }
  },

  /**
   * Elimina precios especiales para clientes
   * @param {Array} registros - Array de objetos con {nrocta, producto_id}
   * @returns {Promise} Respuesta de la API
   */
  async deletePreciosEspecialesCliente(registros) {
    try {
      const response = await api.delete(ENDPOINTS.CAMBIO_PRECIOS.DELETE_PRECIOS_ESPECIALES_CLIENTE, {
        data: {
          data: registros
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error al eliminar precios especiales:', error);
      
      // Extraer mensaje de error del servidor si existe
      const errorMessage = error.response?.data?.error 
        || error.response?.data?.message 
        || 'Error al eliminar precios especiales';
      
      const errorDetails = error.response?.data?.details || '';
      
      throw new Error(`${errorMessage}${errorDetails ? ': ' + errorDetails : ''}`);
    }
  }
};

export default clientesPreciosService;