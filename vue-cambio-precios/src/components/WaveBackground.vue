<template>
  <div class="fixed bottom-0 left-0 w-full overflow-hidden z-10 pointer-events-none">
    <!-- Ola principal -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full h-auto wave-animation">
      <path :fill="primaryColor" :fill-opacity="primaryOpacity" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,122.7C960,149,1056,203,1152,202.7C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
    <!-- Ola secundaria para profundidad -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full h-auto wave-animation-slow absolute bottom-0" style="animation-delay: -3s;">
      <path :fill="secondaryColor" :fill-opacity="secondaryOpacity" d="M0,160L48,144C96,128,192,96,288,112C384,128,480,192,576,192C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  </div>
</template>

<script setup>
// Props para personalizar los colores
const props = defineProps({
  // Color primario de la ola (hex sin #)
  primaryColor: {
    type: String,
    default: '#3b82f6' // azul por defecto
  },
  // Opacidad de la ola primaria
  primaryOpacity: {
    type: String,
    default: '0.4'
  },
  // Color secundario de la ola (hex sin #)
  secondaryColor: {
    type: String,
    default: '#2563eb' // azul más oscuro por defecto
  },
  // Opacidad de la ola secundaria
  secondaryOpacity: {
    type: String,
    default: '0.25'
  }
});
</script>

<style scoped>
/* Efectos de las olas */
.wave-animation {
  animation: wave 8s ease-in-out infinite;
}

.wave-animation-slow {
  animation: waveSlow 12s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% {
    transform: translateX(0) translateY(0);
  }
  25% {
    transform: translateX(-20px) translateY(-5px);
  }
  50% {
    transform: translateX(-40px) translateY(0);
  }
  75% {
    transform: translateX(-20px) translateY(5px);
  }
}

@keyframes waveSlow {
  0%, 100% {
    transform: translateX(0) translateY(0);
  }
  33% {
    transform: translateX(15px) translateY(-3px);
  }
  66% {
    transform: translateX(30px) translateY(2px);
  }
}
</style>
