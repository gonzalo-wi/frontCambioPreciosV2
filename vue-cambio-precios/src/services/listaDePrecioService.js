import axios from 'axios';
import { API_CONFIG, getAmbienteParam } from '../config/api.js';

const apiBackend = axios.create({
    baseURL : API_CONFIG.BASE_URL + '/',
    timeout : API_CONFIG.TIMEOUT,
    headers : API_CONFIG.HEADERS,
});

apiBackend.interceptors.request.use(
    (config) => {
        const ambiente = getAmbienteParam();
        
        // Agregar parámetro ambiente solo si es producción
        if (ambiente) {
            if (!config.params) {
                config.params = {};
            }
            config.params.ambiente = ambiente;
        }
        
        return config;
    },
    (error) => {console.error('Error en la solicitud:', error); return Promise.reject(error);}
);

export const listaDePrecioService = {
    /**
     * Obtiene la lista de precios.
     * @returns {Promise<Array>}
     */
 async getListasDePrecios() {
    try {
      const response = await apiBackend.get('cambio-precios/get-listas');
      return response.data;
    } catch (error) {
      console.error('Error al obtener las listas de precios:', error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Error al obtener las listas de precios'
      );
    }
  },

  /**
   * Obtiene una lista de precios específica por ID
   * @param {string} idListaPrecios - ID de la lista de precios
   * @returns {Promise<Object|null>} Lista de precios encontrada o null
   */
  async getListaPreciosPorId(idListaPrecios) {
    try {
      const listas = await this.getListasDePrecios();
      return listas.find(lista => lista.idListaPrecios === idListaPrecios) || null;
    } catch (error) {
      console.error(`Error al obtener la lista de precios ${idListaPrecios}:`, error);
      throw error;
    }
  },

  /**
   * Busca listas de precios por descripción
   * @param {string} descripcion - Texto a buscar en la descripción
   * @returns {Promise<Array>} Array de listas que coinciden con la búsqueda
   */
  async buscarListasPorDescripcion(descripcion) {
    try {
      const listas = await this.getListasDePrecios();
      return listas.filter(lista => 
        lista.descripcion.toLowerCase().includes(descripcion.toLowerCase())
      );
    } catch (error) {
      console.error('Error al buscar listas por descripción:', error);
      throw error;
    }
  },

  /**
   * Busca un producto específico en todas las listas
   * @param {string} idProducto - ID del producto a buscar
   * @returns {Promise<Array>} Array de objetos con lista e item del producto
   */
  async buscarProductoEnListas(idProducto) {
    try {
      const listas = await this.getListasDePrecios();
      const resultados = [];
      
      listas.forEach(lista => {
        const item = lista.items.find(item => item.idProducto === idProducto);
        if (item) {
          resultados.push({
            lista: {
              idListaPrecios: lista.idListaPrecios,
              descripcion: lista.descripcion
            },
            item: item
          });
        }
      });
      
      return resultados;
    } catch (error) {
      console.error('Error al buscar producto en listas:', error);
      throw error;
    }
  },

  /**
   * Crea una nueva lista de precios
   * @param {string} id - ID de la nueva lista
   * @param {string} descripcion - Descripción de la lista
   * @returns {Promise<Object>} Respuesta del servidor
   */
  async crearNuevaLista(id, descripcion) {
    try {
      const ambiente = getAmbienteParam();
      const payload = {
        id,
        descripcion
      };
      
      // Si hay ambiente, agregarlo al body
      if (ambiente) {
        payload.ambiente = ambiente;
      }
      
      console.log('Creando lista con payload:', payload);
      const response = await apiBackend.post('cambio-precios/insertar-nueva-lista-precio', payload);
      console.log('Respuesta exitosa:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al crear nueva lista:', error);
      console.error('Response status:', error.response?.status);
      console.error('Response data completo:', error.response?.data);
      
      // El backend puede responder con diferentes estructuras
      const errorData = error.response?.data;
      let mensajeError = 'Error al crear la nueva lista de precios';
      
      if (errorData) {
        if (typeof errorData === 'string') {
          mensajeError = errorData;
        } else if (errorData.message) {
          mensajeError = errorData.message;
        } else if (errorData.error) {
          mensajeError = errorData.error;
        } else if (errorData.mensaje) {
          mensajeError = errorData.mensaje;
        }
      } else if (error.message) {
        mensajeError = error.message;
      }
      
      throw new Error(mensajeError);
    }
  },

  /**
   * Obtiene todos los productos disponibles
   * @returns {Promise<Array>} Lista de productos
   */
  async getProductos() {
    try {
      const response = await apiBackend.get('cambio-precios/get-productos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Error al obtener los productos'
      );
    }
  },

  /**
   * Inserta o actualiza precios de productos en una lista
   * @param {Array} data - Array de objetos con lista_id, producto_id, precio, descripcion_lista
   * @returns {Promise<Object>} Respuesta del servidor
   */
  async insertarListaPreciosProductos(data) {
    try {
      const ambiente = getAmbienteParam();
      const payload = { data };
      
      // Si hay ambiente, agregarlo al body
      if (ambiente) {
        payload.ambiente = ambiente;
      }
      
      const response = await apiBackend.post('cambio-precios/insertar-lista-precios-productos', payload);
      return response.data;
    } catch (error) {
      console.error('Error al insertar precios de productos:', error);
      console.error('Response data:', error.response?.data);
      throw new Error(
        error.response?.data?.message || 
        error.response?.data?.error ||
        error.message || 
        'Error al insertar los precios de productos'
      );
    }
  }
};
