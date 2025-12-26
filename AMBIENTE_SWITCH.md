# Sistema de Switch de Ambiente

## Descripción

Se ha implementado un sistema para cambiar entre ambientes de **Pruebas** y **Producción** en la aplicación.

## Funcionamiento

### Parámetro de Ambiente

Cuando el switch está en **PRODUCCIÓN**, todas las peticiones API incluirán automáticamente el parámetro:
```
ambiente=AGUAS-PROD
```

Ejemplo de URL en producción:
```
http://192.168.0.251:8083/api/cambio-precios/get-clientes-con-descuento?empresa=IVESS&ambiente=AGUAS-PROD
```

En modo **PRUEBAS**, el parámetro `ambiente` NO se incluye en las peticiones.

## Ubicación del Switch

El switch de ambiente se encuentra en:
- **Sidebar izquierdo**: Justo encima del footer del usuario
- **Header superior**: Badge visual que muestra el ambiente actual

## Cambiar de Ambiente

1. Hacer clic en el botón de ambiente en el sidebar
2. Se mostrará una confirmación
3. La página se recargará automáticamente para aplicar los cambios

## Indicadores Visuales

### Modo PRUEBAS (por defecto)
- 🟢 Badge verde con texto "PRUEBAS"
- Punto pulsante verde

### Modo PRODUCCIÓN
- 🔴 Badge rojo con texto "PRODUCCIÓN"
- Punto pulsante rojo

## Archivos Modificados

### Nuevos Archivos
- `src/composables/useAmbiente.js` - Composable para gestionar el ambiente

### Archivos Actualizados
- `src/config/api.js` - Agregada función `getAmbienteParam()`
- `src/services/cambiarListaService.js` - Interceptores actualizados
- `src/services/clientesPreciosService.js` - Interceptores actualizados
- `src/services/backupService.js` - Interceptores actualizados
- `src/services/listaDePrecioService.js` - Interceptores actualizados
- `src/components/AppLayout.vue` - UI del switch agregada

## Almacenamiento

El ambiente seleccionado se guarda en `localStorage` con la clave `ambiente`, por lo que se mantiene entre sesiones.

## Valores Posibles

- `PRUEBAS` - Ambiente de pruebas (por defecto)
- `PRODUCCION` - Ambiente de producción (agrega `ambiente=AGUAS-PROD` a las peticiones)
