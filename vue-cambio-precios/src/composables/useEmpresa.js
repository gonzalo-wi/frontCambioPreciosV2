import { ref, watch } from 'vue';

// Estado global de la empresa seleccionada
const empresaActual = ref(localStorage.getItem('empresaActual') || 'IVESS');

// Empresas disponibles
const empresasDisponibles = [
  { id: 'IVESS', nombre: 'IVESS', color: 'blue' },
  { id: 'LAVAZZA', nombre: 'LAVAZZA', color: 'red' }
];

// Guardar en localStorage cuando cambie
watch(empresaActual, (nuevaEmpresa) => {
  localStorage.setItem('empresaActual', nuevaEmpresa);
});

export function useEmpresa() {
  const cambiarEmpresa = (empresaId) => {
    empresaActual.value = empresaId;
  };

  const getEmpresaActual = () => {
    return empresasDisponibles.find(e => e.id === empresaActual.value);
  };

  return {
    empresaActual,
    empresasDisponibles,
    cambiarEmpresa,
    getEmpresaActual
  };
}
