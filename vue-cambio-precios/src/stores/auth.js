import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Usuarios hardcodeados
const USERS = [
  {
    username: 'cgestion',
    password: 'Control3241',
    nombre: 'Control de Gestión',
    rol: 'admin'
  },
  {
    username: 'Sistemas',
    password: 'Sistemas3241+-',
    nombre: 'Sistemas',
    rol: 'admin'
  }
]

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const currentUser = computed(() => user.value)

  // Actions
  const login = async (username, password) => {
    isLoading.value = true
    error.value = null

    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500))

      // Buscar usuario
      const foundUser = USERS.find(
        u => u.username === username && u.password === password
      )

      if (!foundUser) {
        throw new Error('Usuario o contraseña incorrectos')
      }

      // Guardar usuario (sin la contraseña)
      const { password: _, ...userWithoutPassword } = foundUser
      user.value = userWithoutPassword
      
      // Generar token simple (en producción sería un JWT del backend)
      token.value = btoa(`${username}:${Date.now()}`)

      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      localStorage.setItem('token', token.value)

      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    error.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const checkAuth = () => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')

    if (savedUser && savedToken) {
      user.value = JSON.parse(savedUser)
      token.value = savedToken
      return true
    }
    return false
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    user,
    token,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    currentUser,
    // Actions
    login,
    logout,
    checkAuth,
    clearError
  }
})
