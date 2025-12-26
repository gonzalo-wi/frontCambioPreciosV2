import { ref, watch } from 'vue';

/**
 * Composable para manejar el ambiente de la aplicación (Pruebas / Producción)
 */

// Estado global del ambiente (compartido entre todas las instancias)
const ambiente = ref(localStorage.getItem('ambiente') || 'PRUEBAS');

export function useAmbiente() {
  /**
   * Cambiar entre ambiente de pruebas y producción
   * @param {string} nuevoAmbiente - 'PRUEBAS' o 'PRODUCCION'
   */
  const setAmbiente = (nuevoAmbiente) => {
    ambiente.value = nuevoAmbiente;
    localStorage.setItem('ambiente', nuevoAmbiente);
  };

  /**
   * Obtener el ambiente actual
   * @returns {string} - 'PRUEBAS' o 'PRODUCCION'
   */
  const getAmbiente = () => {
    return ambiente.value;
  };

  /**
   * Verificar si estamos en producción
   * @returns {boolean}
   */
  const isProduccion = () => {
    return ambiente.value === 'PRODUCCION';
  };

  /**
   * Obtener el parámetro de ambiente para las peticiones API
   * @returns {string|null} - 'AGUAS-PROD' si es producción, null si es pruebas
   */
  const getAmbienteParam = () => {
    return ambiente.value === 'PRODUCCION' ? 'AGUAS-PROD' : null;
  };

  // Watch para sincronizar con localStorage
  watch(ambiente, (newVal) => {
    localStorage.setItem('ambiente', newVal);
  });

  return {
    ambiente,
    setAmbiente,
    getAmbiente,
    isProduccion,
    getAmbienteParam
  };
}
