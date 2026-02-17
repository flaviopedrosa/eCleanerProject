import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const user = ref(null)
  const token = ref(localStorage.getItem('auth-token') || null)

  // Watcher para debug
  watch(
    () => token.value,
    (newToken, oldToken) => {
      console.log('🔒 Auth Store: Token changed', { oldToken, newToken })
    },
  )

  watch(
    () => user.value,
    (newUser, oldUser) => {
      console.log('🔒 Auth Store: User changed', { oldUser, newUser })
    },
  )

  // Getters
  const isAuthenticated = computed(() => {
    const authenticated = !!token.value
    console.log('🔒 Auth Store: isAuthenticated computed', authenticated)
    return authenticated
  })
  const currentUser = computed(() => user.value)

  // Actions
  const login = (userData) => {
    console.log('🔒 Auth Store: Fazendo login...', userData)

    // Gerar um token simples para teste
    const authToken = btoa(`${userData.usuario}:${Date.now()}`)

    // Salvar no estado
    user.value = userData
    token.value = authToken

    // Salvar no localStorage
    localStorage.setItem('auth-token', authToken)
    localStorage.setItem('auth-user', JSON.stringify(userData))

    console.log('🔒 Auth Store: Login concluído', { token: authToken, user: userData })
  }

  const logout = () => {
    console.log('🔒 Auth Store: Fazendo logout...')

    // Limpar estado
    user.value = null
    token.value = null

    // Limpar localStorage
    localStorage.removeItem('auth-token')
    localStorage.removeItem('auth-user')

    console.log('🔒 Auth Store: Logout concluído')
  }

  const initializeAuth = () => {
    console.log('🔒 Auth Store: Inicializando autenticação...')

    const savedToken = localStorage.getItem('auth-token')
    const savedUser = localStorage.getItem('auth-user')

    if (savedToken && savedUser) {
      try {
        token.value = savedToken
        user.value = JSON.parse(savedUser)
        console.log('🔒 Auth Store: Autenticação restaurada do localStorage')
      } catch (error) {
        console.error('🔒 Auth Store: Erro ao restaurar autenticação:', error)
        // Limpar dados corrompidos
        localStorage.removeItem('auth-token')
        localStorage.removeItem('auth-user')
        user.value = null
        token.value = null
      }
    } else {
      console.log('🔒 Auth Store: Nenhuma autenticação salva encontrada')
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
