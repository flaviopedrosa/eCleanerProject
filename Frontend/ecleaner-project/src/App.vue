<template>
  <router-view />
</template>

<script>
import { defineComponent, onBeforeMount } from 'vue'
import { useAuthStore } from '@/stores/auth-store'

export default defineComponent({
  name: 'App',

  setup() {
    const authStore = useAuthStore()

    // Inicializar autenticação ANTES do mount para garantir que está disponível
    onBeforeMount(() => {
      console.log('🔒 App: Inicializando autenticação...')
      authStore.initializeAuth()
    })

    return {}
  }
})
</script>
