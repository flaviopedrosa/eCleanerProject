<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="login-container">
          <!-- Logo -->
          <div class="text-center q-mb-lg">
            <img src="@/assets/ecleaner-logo.png" alt="eCleaner" class="login-logo q-mb-md" />
            <div class="text-h4 text-primary text-weight-bold">{{ $t('forms.login.title') }}</div>
            <div class="text-subtitle1 text-grey-7">{{ $t('forms.login.subtitle') }}</div>
          </div>

          <!-- Formulário de Login -->
          <q-card class="login-card">
            <q-card-section>
              <q-form @submit="onSubmit" class="q-gutter-md">
                <div class="text-h6 text-center q-mb-md">{{ $t('forms.login.formTitle') }}</div>

                <!-- Campo Usuário -->
                <q-input v-model="form.usuario" :label="$t('forms.login.fields.usuario')" type="text" filled
                  :rules="[val => !!val || $t('forms.validation.required')]" prepend-icon="person" />

                <!-- Campo Senha -->
                <q-input v-model="form.senha" :label="$t('forms.login.fields.senha')"
                  :type="showPassword ? 'text' : 'password'" filled
                  :rules="[val => !!val || $t('forms.validation.required')]" prepend-icon="lock">
                  <template v-slot:append>
                    <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                      @click="showPassword = !showPassword" />
                  </template>
                </q-input>

                <!-- Mensagem de erro -->
                <div v-if="errorMessage" class="text-negative text-center q-mt-sm">
                  {{ errorMessage }}
                </div>

                <!-- Botão de Login -->
                <q-btn :label="$t('forms.login.buttons.login')" type="submit" color="primary" size="lg"
                  class="full-width" :loading="loading" />
              </q-form>
            </q-card-section>
          </q-card>

          <!-- Informações de teste -->
          <div class="text-center q-mt-md">
            <div class="text-caption text-grey-6">{{ $t('forms.login.testInfo') }}</div>
            <div class="text-caption text-grey-7">
              <strong>{{ $t('forms.login.testCredentials.user') }}:</strong> admin
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth-store'

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const router = useRouter()
    const { t } = useI18n()
    const authStore = useAuthStore()

    // Estado
    const form = ref({
      usuario: '',
      senha: ''
    })
    const showPassword = ref(false)
    const loading = ref(false)
    const errorMessage = ref('')

    // Credenciais fixas para teste
    const CREDENTIALS = {
      usuario: 'admin',
      senha: '@cnNer124,trdsar#fG'
    }

    // Submeter formulário
    const onSubmit = async () => {
      loading.value = true
      errorMessage.value = ''

      try {
        // Simular delay de autenticação
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Verificar credenciais
        if (form.value.usuario === CREDENTIALS.usuario && form.value.senha === CREDENTIALS.senha) {
          // Login bem-sucedido
          authStore.login({
            usuario: form.value.usuario,
            nome: 'Administrador'
          })

          console.log('Login realizado com sucesso!')

          // Redirecionar para a página principal
          const redirect = router.currentRoute.value.query.redirect || '/'
          router.push(redirect)
        } else {
          // Credenciais inválidas
          errorMessage.value = t('forms.login.messages.invalidCredentials')
        }
      } catch (error) {
        console.error('Erro no login:', error)
        errorMessage.value = t('forms.login.messages.loginError')
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      showPassword,
      loading,
      errorMessage,
      onSubmit
    }
  }
})
</script>

<style lang="sass" scoped>
.login-container
  width: 100%
  max-width: 400px
  padding: 2rem

.login-logo
  max-width: 150px
  height: auto

.login-card
  border-radius: 16px
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1)
</style>
