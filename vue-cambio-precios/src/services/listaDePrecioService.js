import axios from 'axios';
import { API_CONFIG } from '../config/api.js';

const apiBackend = axios.create({
    baseURL : API_CONFIG.BASE_URL + '/',
    timeout : API_CONFIG.TIMEOUT,
    headers : API_CONFIG.HEADERS,
});

apiBackend.interceptors.request.use(
    (Response) => Response,
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
  }
};
