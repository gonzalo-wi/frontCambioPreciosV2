# 🐳 Deployment con Docker

## 📋 Requisitos Previos
- Docker instalado en el servidor 192.168.0.250
- Docker Compose instalado

## 🚀 Despliegue Rápido

### Opción 1: Usando el script de PowerShell (Windows)
```powershell
.\deploy.ps1
```

### Opción 2: Usando Docker Compose manualmente
```bash
# Construir la imagen
docker-compose build

# Iniciar el contenedor
docker-compose up -d

# Ver logs
docker-compose logs -f
```

### Opción 3: Usando Docker directamente
```bash
# Construir la imagen
docker build -t vue-cambio-precios .

# Ejecutar el contenedor
docker run -d -p 5176:80 --name vue-cambio-precios vue-cambio-precios
```

## 🌐 Acceso a la Aplicación
Una vez desplegado, accede desde cualquier dispositivo en la red local:
```
http://192.168.0.250:5176
```

## 📦 Comandos Útiles

### Ver estado de los contenedores
```bash
docker-compose ps
```

### Ver logs en tiempo real
```bash
docker-compose logs -f
```

### Detener la aplicación
```bash
docker-compose down
```

### Reiniciar la aplicación
```bash
docker-compose restart
```

### Reconstruir sin cache
```bash
docker-compose build --no-cache
docker-compose up -d
```

## 🔄 Actualizar la Aplicación
1. Haz pull de los últimos cambios
2. Ejecuta el script de deployment:
   ```powershell
   .\deploy.ps1
   ```

## 🐛 Troubleshooting

### El puerto 5176 está en uso
```bash
# Ver qué está usando el puerto
netstat -ano | findstr :5176

# Cambiar el puerto en docker-compose.yml
ports:
  - "NUEVO_PUERTO:80"
```

### Problemas de permisos
```bash
# En Linux, ejecutar con sudo
sudo docker-compose up -d
```

### Ver errores del contenedor
```bash
docker logs vue-cambio-precios
```

## 📁 Estructura de Archivos Docker
- `Dockerfile` - Configuración de la imagen Docker
- `docker-compose.yml` - Orquestación de contenedores
- `nginx.conf` - Configuración del servidor web
- `.dockerignore` - Archivos a ignorar en el build
- `deploy.ps1` - Script de despliegue para Windows
- `deploy.sh` - Script de despliegue para Linux
