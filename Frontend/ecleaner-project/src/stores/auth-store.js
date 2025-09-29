import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const user = ref(null)
  const token = ref(localStorage.getItem('auth-token') || null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)

  // Actions
  const login = (userData) => {
    // Gerar um token simples para teste
    const authToken = btoa(`${userData.usuario}:${Date.now()}`)

    // Salvar no estado
    user.value = userData
    token.value = authToken

    // Salvar no localStorage
    localStorage.setItem('auth-token', authToken)
    localStorage.setItem('auth-user', JSON.stringify(userData))
  }

  const logout = () => {
    // Limpar estado
    user.value = null
    token.value = null

    // Limpar localStorage
    localStorage.removeItem('auth-token')
    localStorage.removeItem('auth-user')
  }

  const initializeAuth = () => {
    const savedToken = localStorage.getItem('auth-token')
    const savedUser = localStorage.getItem('auth-user')

    if (savedToken && savedUser) {
      token.value = savedToken
      user.value = JSON.parse(savedUser)
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    currentUser,
    login,
    logout,
    initializeAuth,
  }
})
