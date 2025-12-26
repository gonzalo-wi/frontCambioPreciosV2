<template>
  <div class="min-h-screen flex">
    <!-- Panel Izquierdo - Branding con Imagen de Fondo -->
    <div class="hidden lg:flex lg:w-[55%] relative overflow-hidden">
      <!-- Imagen de fondo -->
      <div class="absolute inset-0">
        <img 
          src="../assets/FondoGota.png" 
          alt="Fondo" 
          class="w-full h-full object-cover"
        />
        <!-- Overlay oscuro sutil para mejor contraste -->
        <div class="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
      </div>

      <!-- Contenido -->
      <div class="relative z-10 flex flex-col justify-center items-center w-full h-full p-12 text-white">
        <!-- Espaciador para centrar verticalmente -->
      </div>
    </div>

    <!-- Panel Derecho - Formulario -->
    <div class="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      <!-- Patrón decorativo animado -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-20 right-20 w-96 h-96 bg-[#044760] rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      </div>
      
      <!-- Elementos decorativos flotantes -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-[#044760] rounded-full opacity-20 animate-float"></div>
        <div class="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full opacity-20 animate-float-delayed"></div>
        <div class="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#044760] rounded-full opacity-20 animate-float" style="animation-delay: 2s;"></div>
      </div>
      
      <div class="relative z-10 w-full max-w-md px-8">
        <!-- Logo móvil -->
        <div class="lg:hidden mb-12 text-center animate-fade-in">
          <img 
            src="../assets/LogoPrice.png" 
            alt="LogoPrice" 
            class="h-24 w-auto mx-auto mb-6 drop-shadow-xl"
          />
        </div>

        <!-- Header -->
        <div class="text-center mb-10 animate-fade-in-up">
          <div class="inline-flex items-center justify-center mb-6">
            <img 
              src="../assets/LogoPrice.png" 
              alt="LogoPrice" 
              class="h-48 w-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h2 class="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3 animate-gradient">
            Bienvenido
          </h2>
          <p class="text-slate-600 text-lg">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="handleLogin" class="space-y-6 animate-fade-in-up" style="animation-delay: 0.2s;">
          <!-- Campo Usuario -->
          <div class="group transform hover:scale-[1.01] transition-transform duration-200">
            <label for="username" class="block text-sm font-semibold text-slate-800 mb-3">
              Usuario
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-slate-400 group-focus-within:text-[#044760] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <input
                id="username"
                v-model="username"
                type="text"
                required
                placeholder="tu.usuario"
                class="block w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-xl focus:bg-white focus:border-[#044760] focus:ring-4 focus:ring-[#044760]/10 transition-all duration-300 text-slate-900 placeholder-slate-400 text-base shadow-sm hover:border-slate-300 hover:shadow-md"
              />
            </div>
          </div>

          <!-- Campo Contraseña -->
          <div class="group transform hover:scale-[1.01] transition-transform duration-200">
            <div class="flex items-center justify-between mb-3">
              <label for="password" class="block text-sm font-semibold text-slate-800">
                Contraseña
              </label>
              <a href="#" class="text-sm font-medium text-[#044760] hover:text-blue-700 transition-colors hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-slate-400 group-focus-within:text-[#044760] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="block w-full pl-12 pr-12 py-4 bg-white border-2 border-slate-200 rounded-xl focus:bg-white focus:border-[#044760] focus:ring-4 focus:ring-[#044760]/10 transition-all duration-300 text-slate-900 placeholder-slate-400 text-base shadow-sm hover:border-slate-300 hover:shadow-md"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center group hover:scale-110 transition-transform"
              >
                <svg v-if="!showPassword" class="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Recordarme -->
          <div class="flex items-center">
            <input
              id="remember"
              v-model="rememberMe"
              type="checkbox"
              class="h-5 w-5 text-[#044760] focus:ring-[#044760] border-slate-300 rounded-lg transition-all duration-200 cursor-pointer hover:scale-110"
            />
            <label for="remember" class="ml-3 block text-sm font-medium text-slate-700 cursor-pointer hover:text-slate-900 transition-colors">
              Mantener sesión iniciada
            </label>
          </div>

          <!-- Mensaje de error -->
          <div v-if="errorMessage" class="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
              <div>
                <p class="text-sm font-medium text-red-800">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Botón de Iniciar Sesión -->
          <button
            type="submit"
            :disabled="loading"
            class="group w-full relative flex justify-center items-center py-4 px-6 border-2 border-transparent rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#044760] to-blue-600 hover:from-[#033650] hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-[#044760]/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-[#044760]/20 hover:shadow-xl hover:shadow-[#044760]/30"
          >
            <span v-if="!loading" class="flex items-center gap-2">
              Iniciar Sesión
              <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
            <span v-else class="flex items-center gap-3">
              <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Iniciando sesión...
            </span>
          </button>
        </form>

        <!-- Footer -->
        <div class="mt-10 pt-8 border-t border-slate-200">
          <div class="text-center">
            <p class="text-sm text-slate-500 mb-3">
              ¿Necesitas ayuda?
            </p>
            <div class="flex items-center justify-center gap-6 text-sm">
              <a href="#" class="text-[#044760] hover:text-blue-700 font-medium transition-colors">Soporte</a>
              <span class="text-slate-300">•</span>
              <a href="#" class="text-[#044760] hover:text-blue-700 font-medium transition-colors">Documentación</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

// Estado del formulario
const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const errorMessage = ref('');

// Función de manejo de login
const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const result = await authStore.login(username.value, password.value);

    if (result.success) {
      // Login exitoso, redirigir al home
      router.push('/');
    } else {
      // Mostrar error
      errorMessage.value = result.error || 'Error al iniciar sesión';
    }
  } catch (error) {
    errorMessage.value = 'Error al iniciar sesión. Por favor, intenta de nuevo.';
    console.error('Error de login:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Patrón de grid sutil */
.bg-grid-pattern {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Animaciones de entrada */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  33% {
    transform: translateY(-20px) translateX(10px);
  }
  66% {
    transform: translateY(10px) translateX(-10px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  33% {
    transform: translateY(15px) translateX(-15px);
  }
  66% {
    transform: translateY(-10px) translateX(10px);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out;
  animation-fill-mode: both;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}

/* Animaciones personalizadas */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
}

@keyframes pulse-slower {
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.05);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

.animate-pulse-slower {
  animation: pulse-slower 10s ease-in-out infinite;
}

/* Gradiente animado del botón */
.bg-size-200 {
  background-size: 200% 100%;
}

.bg-pos-0 {
  background-position: 0% 0%;
}

.bg-pos-100 {
  background-position: 100% 0%;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}
</style>

