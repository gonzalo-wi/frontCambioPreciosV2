import axios from 'axios';
import { API_CONFIG, ENDPOINTS, getAmbienteParamLavazza } from '../config/api.js';

const apiCafe = axios.create({
  baseURL: API_CONFIG.BASE_URL_CAFE,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

apiCafe.interceptors.request.use(
  (config) => {
    const ambiente = getAmbienteParamLavazza();
    if (ambiente) {
      if (!config.params) config.params = {};
      config.params.ambiente = ambiente;
    }
    return config;
  },
  (error) => { console.error('Error en la solicitud Lavazza:', error); return Promise.reject(error); }
);

// Normaliza una fila plana de listas-con-productos al formato IVESS
function _normalizarFilaLista(row) {
  return {
    idListaPrecios: row.idListaPrecios ?? row.listaId ?? row.id ?? '',
    descripcion: row.listaDescripcion ?? row.descripcion ?? row.Descripcion ?? '',
    idProducto: row.idProducto ?? row.IdProducto ?? row.producto_id ?? '',
    productoDescripcion: row.productoDescripcion ?? row.Descripcion ?? row.descripcionProducto ?? '',
    precio: row.precio ?? row.Precio ?? 0,
  };
}

export const lavazzaService = {
  /**
   * Obtiene clientes con descuentos especiales (misma firma que IVESS).
   * @param {Object} params - { page, per_page, descuento, nrocta }
   * @returns {Promise} Respuesta paginada de Laravel
   */
  async getClientesConDescuento(params = {}) {
    try {
      const query = {};
      if (params.page !== undefined)     query.page     = params.page;
      if (params.per_page !== undefined) query.perPage  = params.per_page;
      if (params.descuento !== undefined && params.descuento !== '') query.porcentaje = params.descuento;
      if (params.nrocta !== undefined && params.nrocta !== '')       query.nroCta     = params.nrocta;

      const response = await apiCafe.get(ENDPOINTS.CAMBIO_PRECIOS_CAFE.CLIENTES_DESCUENTO, { params: query });
      return response.data;
    } catch (error) {
      console.error('Lavazza: Error al obtener clientes con descuento:', error);
      throw new Error(
        error.response?.data?.message || error.message || 'Error al obtener clientes con descuento'
      );
    }
  },

  /**
   * Actualiza o crea precios especiales por cliente.
   * Mapea desde el formato IVESS {nrocta, producto_id, precio_especial}
   * al formato Lavazza {nroCta, idProducto, nuevoPrecio}.
   * @param {Array} precios - [{ nrocta, producto_id, precio_especial }]
   * @returns {Promise}
   */
  async setPreciosEspecialesCliente(precios) {
    try {
      const data = precios.map(p => ({
        nroCta:      p.nrocta      ?? p.nroCta,
        idProducto:  p.producto_id ?? p.idProducto,
        nuevoPrecio: p.precio_especial ?? p.nuevoPrecio,
      }));
      const response = await apiCafe.post(ENDPOINTS.CAMBIO_PRECIOS_CAFE.SET_PRECIO_ESPECIAL_CLIENTE, { data });
      return response.data;
    } catch (error) {
      console.error('Lavazza: Error al set precios especiales:', error);
      throw new Error(
        error.response?.data?.message || error.message || 'Error al actualizar precios especiales'
      );
    }
  },

  /**
   * Eliminar precios especiales. Lavazza no tiene un endpoint dedicado de delete;
   * se lanza un error indicativo para que el componente lo maneje.
   */
  async deletePreciosEspecialesCliente(_registros) {
    throw new Error('La operación de eliminar precios especiales no está disponible para Lavazza.');
  },

  /**
   * Obtiene el precio actual de un cliente para una lista de pares nrocta/producto_id.
   * Usa el endpoint precio-cliente-producto de forma individual en paralelo.
   * @param {Array} registros - [{ nrocta, producto_id }]
   * @returns {Promise<Array>}
   */
  async getPreciosActualesClientes(registros) {
    try {
      const requests = registros.map(r =>
        apiCafe.get(ENDPOINTS.CAMBIO_PRECIOS_CAFE.PRECIO_CLIENTE_PRODUCTO, {
          params: {
            nroCta:     r.nrocta     ?? r.nroCta,
            idProducto: r.producto_id ?? r.idProducto,
          }
        }).then(res => res.data).catch(() => [])
      );
      const results = await Promise.all(requests);
      return results.flat();
    } catch (error) {
      console.error('Lavazza: Error al obtener precios actuales:', error);
      throw new Error(error.message || 'Error al obtener precios actuales de clientes');
    }
  },

  /**
   * Obtiene descuentos masivos de clientes (misma firma que IVESS).
   * Usa precio-cliente-producto en paralelo.
   * @param {Array} registros - [{ nrocta, producto_id }]
   * @returns {Promise<Array>}
   */
  async getClientesConDescuentosMasivos(registros) {
    return this.getPreciosActualesClientes(registros);
  },

  /**
   * Calcula estadísticas de descuentos (lógica pura, igual que IVESS).
   * @param {Array} clientes
   * @returns {Object}
   */
  calcularEstadisticasDescuentos(clientes) {
    if (!clientes || clientes.length === 0) {
      return { total: 0, descuentoPromedio: 0, descuentoMinimo: 0, descuentoMaximo: 0, totalAhorro: 0 };
    }
    const descuentos = clientes.map(c => parseFloat(c.descuento) || 0);
    const ahorros    = clientes.map(c => {
      const real  = parseFloat(c.precioReal)  || 0;
      const lista = parseFloat(c.precioLista) || 0;
      return lista - real;
    });
    return {
      total:             clientes.length,
      descuentoPromedio: descuentos.reduce((a, b) => a + b, 0) / descuentos.length,
      descuentoMinimo:   Math.min(...descuentos),
      descuentoMaximo:   Math.max(...descuentos),
      totalAhorro:       ahorros.reduce((a, b) => a + b, 0),
    };
  },

  /**
   * Normaliza un cliente al formato de display (misma firma que IVESS).
   * Lavazza devuelve los campos en el mismo formato que IVESS para este endpoint.
   * @param {Object} cliente
   * @returns {Object}
   */
  formatearCliente(cliente) {
    return {
      nrocta:      cliente.nrocta      ?? cliente.nroCta      ?? '',
      idproducto:  cliente.idproducto  ?? cliente.idProducto  ?? '',
      precioReal:  cliente.precioReal  ?? 0,
      precioLista: cliente.precioLista ?? 0,
      descuento:   cliente.descuento   ?? 0,
    };
  },

  /**
   * Obtiene todas las listas de precios con sus productos, normalizadas al formato IVESS.
   * Lavazza devuelve filas planas; las agrupamos por lista.
   * @returns {Promise<Array>} [{ idListaPrecios, descripcion, items: [{ idProducto, productoDescripcion, precio }] }]
   */
  async getListasDePrecios() {
    try {
      const response = await apiCafe.get(ENDPOINTS.CAMBIO_PRECIOS_CAFE.LISTAS_CON_PRODUCTOS);
      const filas = response.data;

      // Agrupar las filas planas por lista
      const mapaListas = new Map();
      for (const fila of filas) {
        const norm = _normalizarFilaLista(fila);
        const key  = norm.idListaPrecios;

        if (!mapaListas.has(key)) {
          mapaListas.set(key, {
            idListaPrecios: key,
            descripcion:    norm.descripcion,
            items:          [],
          });
        }
        if (norm.idProducto) {
          mapaListas.get(key).items.push({
            idProducto:          norm.idProducto,
            productoDescripcion: norm.productoDescripcion,
            precio:              norm.precio,
          });
        }
      }

      return Array.from(mapaListas.values());
    } catch (error) {
      console.error('Lavazza: Error al obtener listas de precios:', error);
      throw new Error(
        error.response?.data?.message || error.message || 'Error al obtener listas de precios'
      );
    }
  },

  /**
   * Obtiene todos los productos disponibles.
   * Lavazza devuelve { idProducto, Descripcion, Abreviatura } — igual que IVESS.
   * @returns {Promise<Array>}
   */
  async getProductos() {
    try {
      const response = await apiCafe.get(ENDPOINTS.CAMBIO_PRECIOS_CAFE.PRODUCTOS);
      return response.data;
    } catch (error) {
      console.error('Lavazza: Error al obtener productos:', error);
      throw new Error(
        error.response?.data?.message || error.message || 'Error al obtener los productos'
      );
    }
  },

  /**
   * Actualiza precios de productos en una lista.
   * Mapea desde el formato IVESS {lista_id, producto_id, precio}
   * al formato Lavazza {idListaPrecio, idProducto, nuevoPrecio}.
   * @param {Array} productos - [{ lista_id, producto_id, precio }]
   * @returns {Promise<Object>} { success, data, mensaje }
   */
  async setPreciosProductos(productos) {
    try {
      const data = productos.map(p => ({
        idListaPrecio: p.lista_id    ?? p.idListaPrecio,
        idProducto:    p.producto_id ?? p.idProducto,
        nuevoPrecio:   p.precio      ?? p.nuevoPrecio,
      }));
      const response = await apiCafe.post(ENDPOINTS.CAMBIO_PRECIOS_CAFE.SET_PRECIO_LISTA_PRODUCTO, { data });
      return {
        success: true,
        data:    response.data,
        mensaje: response.data?.mensaje || 'Precios actualizados correctamente',
      };
    } catch (error) {
      console.error('Lavazza: Error al actualizar precios de productos:', error);
      return {
        success:  false,
        error:    error.response?.data?.message || error.message || 'Error al actualizar precios',
        detalles: error.response?.data,
      };
    }
  },

  /**
   * Insertar productos en una lista (delegado a setPreciosProductos para Lavazza).
   * @param {Array} data - misma forma que insertarListaPreciosProductos de IVESS
   * @returns {Promise}
   */
  async insertarListaPreciosProductos(data) {
    // Lavazza usa el mismo endpoint para insert/update
    return this.setPreciosProductos(data);
  },
};

export default lavazzaService;
