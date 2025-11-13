import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListaPrecios from '../views/ListaPrecios.vue'
import ClientesDescuentos from '../views/ClientesDescuentos.vue'
import CambiarPrecios from '../views/CambiarPrecios.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: {
      title: 'Iniciar Sesión'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'Inicio'
    }
  },
  {
    path: '/listas-precios',
    name: 'ListaPrecios',
    component: ListaPrecios,
    meta: {
      title: 'Listas de Precios'
    }
  },
  {
    path: '/clientes-descuentos',
    name: 'ClientesDescuentos',
    component: ClientesDescuentos,
    meta: {
      title: 'Clientes con Descuentos'
    }
  },
  {
    path: '/cambiar-precios',
    name: 'CambiarPrecios',
    component: CambiarPrecios,
    meta: {
      title: 'Cambiar Precios'
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

// Guard para actualizar el título de la página
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - Cambio de Precios`
  } else {
    document.title = 'Cambio de Precios'
  }
  next()
})

export default router
