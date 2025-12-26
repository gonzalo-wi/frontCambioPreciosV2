import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import HomeView from '../views/HomeView.vue'
import ListaPrecios from '../views/ListaPrecios.vue'
import ClientesDescuentos from '../views/ClientesDescuentos.vue'
import CambiarPrecios from '../views/CambiarPrecios.vue'
import CambiarListasClientes from '../views/CambiarListasClientes.vue'
import RestaurarBackup from '../views/RestaurarBackup.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      title: 'Iniciar Sesión',
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'Inicio',
      requiresAuth: true
    }
  },
  {
    path: '/listas-precios',
    name: 'ListaPrecios',
    component: ListaPrecios,
    meta: {
      title: 'Listas de Precios',
      requiresAuth: true
    }
  },
  {
    path: '/clientes-descuentos',
    name: 'ClientesDescuentos',
    component: ClientesDescuentos,
    meta: {
      title: 'Clientes con Descuentos',
      requiresAuth: true
    }
  },
  {
    path: '/cambiar-precios',
    name: 'CambiarPrecios',
    component: CambiarPrecios,
    meta: {
      title: 'Cambiar Precios',
      requiresAuth: true
    }
  },
  {
    path: '/cambiar-listas-clientes',
    name: 'CambiarListasClientes',
    component: CambiarListasClientes,
    meta: {
      title: 'Cambiar Listas de Clientes',
      requiresAuth: true
    }
  },
  {
    path: '/restaurar-backup',
    name: 'RestaurarBackup',
    component: RestaurarBackup,
    meta: {
      title: 'Restaurar Backup',
      requiresAuth: true
    }
  }
  // Aquí puedes agregar más rutas en el futuro
  // {
  //   path: '/productos',
  //   name: 'Productos',
  //   component: () => import('../views/Productos.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard para autenticación y actualizar título
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Actualizar título
  if (to.meta.title) {
    document.title = `${to.meta.title} - Cambio de Precios`
  } else {
    document.title = 'Cambio de Precios'
  }

  // Verificar autenticación
  const requiresAuth = to.meta.requiresAuth !== false // Por defecto requiere auth
  const isAuthenticated = authStore.checkAuth()

  if (requiresAuth && !isAuthenticated) {
    // Redirigir al login si la ruta requiere autenticación y no está autenticado
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    // Si ya está autenticado y va al login, redirigir al home
    next('/')
  } else {
    next()
  }
})

export default router
