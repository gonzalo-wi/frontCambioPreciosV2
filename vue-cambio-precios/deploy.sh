#!/bin/bash

echo "🚀 Desplegando Vue Cambio de Precios..."

# Detener y eliminar contenedores existentes
echo "🛑 Deteniendo contenedores existentes..."
docker-compose down

# Eliminar imágenes antiguas (opcional)
# docker rmi vue-cambio-precios_vue-cambio-precios

# Construir la nueva imagen
echo "🔨 Construyendo nueva imagen..."
docker-compose build --no-cache

# Iniciar los contenedores
echo "▶️  Iniciando contenedores..."
docker-compose up -d

# Mostrar logs
echo "📋 Logs del contenedor:"
docker-compose logs -f
