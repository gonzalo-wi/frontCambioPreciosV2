# Script de despliegue para Windows PowerShell

Write-Host "🚀 Desplegando Vue Cambio de Precios..." -ForegroundColor Green

# Detener y eliminar contenedores existentes
Write-Host "🛑 Deteniendo contenedores existentes..." -ForegroundColor Yellow
docker-compose down

# Construir la nueva imagen
Write-Host "🔨 Construyendo nueva imagen..." -ForegroundColor Cyan
docker-compose build --no-cache

# Iniciar los contenedores
Write-Host "▶️  Iniciando contenedores..." -ForegroundColor Green
docker-compose up -d

# Verificar estado
Write-Host "`n✅ Estado de los contenedores:" -ForegroundColor Green
docker-compose ps

Write-Host "`n🌐 La aplicación está disponible en:" -ForegroundColor Green
Write-Host "   http://192.168.0.250:5176" -ForegroundColor Cyan

Write-Host "`n📋 Para ver los logs ejecuta:" -ForegroundColor Yellow
Write-Host "   docker-compose logs -f" -ForegroundColor White
