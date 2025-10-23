<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-h4 q-mb-lg">
        <q-icon name="settings" class="q-mr-sm" />
        {{ $t('forms.configuracoes.title') }}
      </div>

      <!-- Seção de Dados do Sistema -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6 q-mb-md">
            <q-icon name="database" class="q-mr-sm" />
            {{ $t('forms.configuracoes.sections.dataManagement.title') }}
          </div>
          <div class="text-body2 text-grey-7 q-mb-md">
            {{ $t('forms.configuracoes.sections.dataManagement.subtitle') }}
          </div>

          <q-separator class="q-mb-md" />

          <!-- Carga Completa -->
          <div class="row items-center q-mb-lg">
            <div class="col-12 col-md-8">
              <div class="text-subtitle1 q-mb-xs">
                <q-icon name="rocket_launch" class="q-mr-sm text-positive" />
                {{ $t('forms.configuracoes.sections.dataManagement.completeLoad.title') }}
              </div>
              <div class="text-body2 text-grey-7">
                {{ $t('forms.configuracoes.sections.dataManagement.completeLoad.description') }}
              </div>
            </div>
            <div class="col-12 col-md-4 text-right">
              <q-btn color="positive" icon="download"
                :label="$t('forms.configuracoes.sections.dataManagement.completeLoad.button')"
                @click="executarCargaCompleta" :loading="loading.cargaCompleta" :disable="hasAnyLoading" size="md"
                class="q-px-lg" />
            </div>
          </div>

          <q-separator class="q-mb-md" />

          <!-- Cargas Individuais -->
          <div class="text-subtitle1 q-mb-md">{{
            $t('forms.configuracoes.sections.dataManagement.individualLoad.title') }}</div>

          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-sm-6 col-md-4">
              <q-card flat bordered class="full-height">
                <q-card-section class="text-center">
                  <q-icon name="cleaning_services" size="3em" color="primary" class="q-mb-sm" />
                  <div class="text-subtitle2 q-mb-xs">{{
                    $t('forms.configuracoes.sections.dataManagement.individualLoad.materials.title')
                    }}
                  </div>
                  <div class="text-caption text-grey-7 q-mb-md">{{
                    $t('forms.configuracoes.sections.dataManagement.individualLoad.materials.description')
                    }}</div>
                  <q-btn flat color="primary"
                    :label="$t('forms.configuracoes.sections.dataManagement.individualLoad.materials.button')"
                    @click="carregarMateriais" :loading="loading.materiais" :disable="hasAnyLoading" size="sm" />
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <q-card flat bordered class="full-height">
                <q-card-section class="text-center">
                  <q-icon name="people" size="3em" color="secondary" class="q-mb-sm" />
                  <div class="text-subtitle2 q-mb-xs">{{
                    $t('forms.configuracoes.sections.dataManagement.individualLoad.clients.title')
                    }}
                  </div>
                  <div class="text-caption text-grey-7 q-mb-md">{{
                    $t('forms.configuracoes.sections.dataManagement.individualLoad.clients.description')
                    }}
                  </div>
                  <q-btn flat color="secondary"
                    :label="$t('forms.configuracoes.sections.dataManagement.individualLoad.clients.button')"
                    @click="carregarClientes" :loading="loading.clientes" :disable="hasAnyLoading" size="sm" />
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <q-card flat bordered class="full-height">
                <q-card-section class="text-center">
                  <q-icon name="engineering" size="3em" color="accent" class="q-mb-sm" />
                  <div class="text-subtitle2 q-mb-xs">{{
                    $t('forms.configuracoes.sections.dataManagement.individualLoad.collaborators.title')
                    }}</div>
                  <div class="text-caption text-grey-7 q-mb-md">{{
                    $t('forms.configuracoes.sections.dataManagement.individualLoad.collaborators.description')
                    }}</div>
                  <q-btn flat color="accent"
                    :label="$t('forms.configuracoes.sections.dataManagement.individualLoad.collaborators.button')"
                    @click="carregarColaboradores" :loading="loading.colaboradores" :disable="hasAnyLoading"
                    size="sm" />
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <q-card flat bordered class="full-height">
                <q-card-section class="text-center">
                  <q-icon name="room_service" size="3em" color="deep-orange" class="q-mb-sm" />
                  <div class="text-subtitle2 q-mb-xs">{{
                    $t('forms.configuracoes.sections.dataManagement.individualLoad.services.title')
                    }}</div>
                  <div class="text-caption text-grey-7 q-mb-md">{{
                    $t('forms.configuracoes.sections.dataManagement.individualLoad.services.description')
                    }}</div>
                  <q-btn flat color="deep-orange"
                    :label="$t('forms.configuracoes.sections.dataManagement.individualLoad.services.button')"
                    @click="carregarServicos" :loading="loading.servicos" :disable="hasAnyLoading" size="sm" />
                </q-card-section>
              </q-card>
            </div>
          </div>

          <q-separator class="q-mb-md" />

          <!-- Limpeza de Dados -->
          <div class="text-subtitle1 q-mb-md text-negative">
            <q-icon name="warning" class="q-mr-sm" />
            {{ $t('forms.configuracoes.sections.danger.title') }}
          </div>

          <div class="row items-center">
            <div class="col-12 col-md-8">
              <div class="text-subtitle2 q-mb-xs">{{
                $t('forms.configuracoes.sections.danger.clearData.title') }}</div>
              <div class="text-body2 text-grey-7">
                <q-icon name="warning" color="orange" class="q-mr-xs" />
                {{ $t('forms.configuracoes.sections.danger.clearData.description') }}
              </div>
            </div>
            <div class="col-12 col-md-4 text-right">
              <q-btn color="negative" outline icon="delete_forever"
                :label="$t('forms.configuracoes.sections.danger.clearData.button')" @click="confirmarLimpezaCompleta"
                :loading="loading.limpeza" size="md" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Seção de Configurações Gerais -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6 q-mb-md">
            <q-icon name="tune" class="q-mr-sm" />
            {{ $t('forms.configuracoes.sections.generalConfig.title') }}
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="config.nomeEmpresa"
                :label="$t('forms.configuracoes.sections.generalConfig.fields.companyName')" filled
                :readonly="!editMode" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="config.emailEmpresa"
                :label="$t('forms.configuracoes.sections.generalConfig.fields.companyEmail')" type="email" filled
                :readonly="!editMode" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="config.telefoneEmpresa"
                :label="$t('forms.configuracoes.sections.generalConfig.fields.companyPhone')" filled
                :readonly="!editMode" />
            </div>
            <div class="col-12 col-md-6">
              <q-select v-model="config.moeda" :options="moedaOptions"
                :label="$t('forms.configuracoes.sections.generalConfig.fields.defaultCurrency')" filled emit-value
                map-options :readonly="!editMode" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model.number="config.validadeOrcamentoDias" label="Validade do Orçamento (dias)" type="number"
                min="1" max="365" filled :readonly="!editMode" hint="Número de dias que um orçamento permanece válido"
                suffix="dias" />
            </div>
            <!-- Campos para configuração do EmailJS -->
            <div class="col-12">
              <div class="text-subtitle2 q-mb-sm q-mt-md">
                <q-icon name="email" class="q-mr-sm" />
                Configuração de E-mail (EmailJS)
              </div>
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="config.emailJsKey" label="Chave Pública do EmailJS" filled :readonly="!editMode"
                hint="Sua chave pública do EmailJS (Public Key)" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="config.emailJsServiceId" label="Service ID do EmailJS" filled :readonly="!editMode"
                hint="ID do serviço de e-mail configurado no EmailJS" />
            </div>
            <div class="col-12 col-md-6">
              <q-input v-model="config.emailJsTemplateIdOrcamento" label="Template ID - Orçamento" filled :readonly="!editMode"
                hint="ID do template para envio de orçamentos" />
            </div>
            <!-- Campo de logomarca -->
            <div class="col-12 col-md-6">
              <q-file v-model="logoFile" :label="$t('forms.configuracoes.sections.generalConfig.fields.logo')"
                accept=".jpg,.png,.jpeg" filled lazy-rules :readonly="!editMode" @update:model-value="handleLogoAdded"
                :rules="[
                  val => !val || val.size <= 5242880 || $t('forms.validation.maxFileSize', { size: '5MB' }),
                  val => !val || ['image/jpeg', 'image/png'].includes(val.type) || $t('forms.validation.invalidFileType')
                ]">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
                <template v-slot:after v-if="previewUrl">
                  <q-avatar size="120px" square>
                    <img :src="previewUrl" style="object-fit: contain;">
                  </q-avatar>
                </template>
              </q-file>
            </div>
            <!-- Componente de endereço -->
            <div class="col-12">
              <EnderecoForm v-model="config.endereco" :readonly="!editMode" />
            </div>
          </div>

          <div class="q-mt-md">
            <q-btn v-if="!editMode" color="primary" icon="edit"
              :label="$t('forms.configuracoes.sections.generalConfig.buttons.edit')" @click="editMode = true" />
            <div v-else class="row q-gutter-sm">
              <q-btn color="positive" icon="save" :label="$t('forms.configuracoes.sections.generalConfig.buttons.save')"
                @click="salvarConfiguracoes" :loading="loading.salvar" />
              <q-btn flat color="grey" :label="$t('forms.configuracoes.sections.generalConfig.buttons.cancel')"
                @click="cancelarEdicao" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Log de Atividades -->
      <q-card v-if="logs.length > 0">
        <q-card-section>
          <div class="text-h6 q-mb-md">
            <q-icon name="article" class="q-mr-sm" />
            {{ $t('forms.configuracoes.sections.activity.title') }}
          </div>

          <div class="log-container">
            <div v-for="(log, index) in logs" :key="index" :class="getLogClass(log.type)"
              class="log-entry q-pa-sm q-mb-xs">
              <q-icon :name="getLogIcon(log.type)" :color="getLogColor(log.type)" class="q-mr-sm" />
              <span class="text-caption">{{ log.timestamp }}</span>
              <span class="q-ml-md">{{ log.message }}</span>
            </div>
          </div>

          <div class="q-mt-md">
            <q-btn flat color="grey" icon="clear" :label="$t('forms.configuracoes.sections.activity.buttons.clear')"
              @click="limparLogs" size="sm" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { runAllSeeds, runMaterialSeed, runServiceSeed } from '@/core/infrastructure/repositories/seeds'
import { seedClientes } from '@/core/infrastructure/repositories/seeds/clienteSeed'
import { seedColaboradores } from '@/core/infrastructure/repositories/seeds/colaboradorSeed'
import EnderecoForm from '@/components/EnderecoForm.vue'
import { processImage } from '@/core/infrastructure/utils/imageCompressor'

export default defineComponent({
  name: 'ConfiguracoesPage',

  components: {
    EnderecoForm
  },

  setup() {
    const $q = useQuasar()
    const { t } = useI18n()

    const loading = ref({
      cargaCompleta: false,
      materiais: false,
      clientes: false,
      colaboradores: false,
      servicos: false,
      limpeza: false,
      salvar: false,
      configuracao: false
    })

    const logs = ref([])
    const editMode = ref(false)

    const config = ref({
      nomeEmpresa: 'eCleaner',
      emailEmpresa: 'contato@ecleaner.com.br',
      telefoneEmpresa: '(11) 99999-9999',
      moeda: 'BRL',
      validadeOrcamentoDias: 30,
      emailJsKey: '',
      emailJsServiceId: '',
      emailJsTemplateIdOrcamento: '',
      logo: null, // Imagem da logomarca
      endereco: {
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''
      }
    })

    const configOriginal = ref({})

    // Controller for file input
    const logoFile = ref(null)
    const previewUrl = ref(null)

    async function handleLogoAdded(file) {
      if (!file) {
        config.value.logo = null
        previewUrl.value = null
        return
      }

      try {
        // Usar o utilitário de processamento de imagem (valida + comprime)
        const result = await processImage(file)

        if (!result.success) {
          $q.notify({
            color: 'negative',
            message: result.error,
            timeout: 4000,
            position: 'top-right'
          })
          logoFile.value = null
          previewUrl.value = null
          return
        }

        // Salvar como data-url (string) no config para persistência
        config.value.logo = result.data
        previewUrl.value = result.data

        $q.notify({
          color: 'positive',
          message: 'Logomarca carregada e comprimida com sucesso!',
          timeout: 2000,
          position: 'top-right'
        })
      } catch (err) {
        console.error('Erro ao processar logomarca:', err)
        $q.notify({
          color: 'negative',
          message: 'Erro ao processar a imagem. Tente outro arquivo.',
          timeout: 4000,
          position: 'top-right'
        })
        logoFile.value = null
        previewUrl.value = null
      }
    }

    const moedaOptions = [
      { label: 'Real (R$)', value: 'BRL' },
      { label: 'Dólar ($)', value: 'USD' },
      { label: 'Euro (€)', value: 'EUR' }
    ]

    const hasAnyLoading = computed(() => {
      return loading.value.cargaCompleta || loading.value.materiais ||
        loading.value.clientes || loading.value.colaboradores || loading.value.servicos
    })

    function addLog(message, type = 'info') {
      const timestamp = new Date().toLocaleTimeString()
      logs.value.unshift({ message, type, timestamp })

      if (logs.value.length > 100) {
        logs.value = logs.value.slice(0, 100)
      }
    }

    function getLogClass(type) {
      switch (type) {
        case 'success': return 'bg-green-1 text-green-8'
        case 'error': return 'bg-red-1 text-red-8'
        case 'warning': return 'bg-orange-1 text-orange-8'
        default: return 'bg-blue-1 text-blue-8'
      }
    }

    function getLogIcon(type) {
      switch (type) {
        case 'success': return 'check_circle'
        case 'error': return 'error'
        case 'warning': return 'warning'
        default: return 'info'
      }
    }

    function getLogColor(type) {
      switch (type) {
        case 'success': return 'green'
        case 'error': return 'red'
        case 'warning': return 'orange'
        default: return 'blue'
      }
    }

    async function executarCargaCompleta() {
      loading.value.cargaCompleta = true
      try {
        addLog('🚀 Iniciando carga completa do sistema...', 'info')

        // Carregar configuração
        await carregarConfiguracao()

        // Carregar todos os dados
        await runAllSeeds()

        addLog('✅ Carga completa executada com sucesso!', 'success')

        $q.notify({
          color: 'positive',
          message: t('forms.configuracoes.sections.dataManagement.completeLoad.success'),
          caption: 'Todos os dados iniciais foram carregados',
          timeout: 5000,
          position: 'top-right',
          actions: [{ icon: 'close', color: 'white' }]
        })

      } catch (error) {
        addLog(`❌ Erro durante a carga completa: ${error.message}`, 'error')

        $q.notify({
          color: 'negative',
          message: t('forms.configuracoes.sections.dataManagement.completeLoad.error'),
          caption: error.message,
          timeout: 7000,
          position: 'top-right',
          actions: [{ icon: 'close', color: 'white' }]
        })
      } finally {
        loading.value.cargaCompleta = false
      }
    }

    async function carregarMateriais() {
      loading.value.materiais = true
      try {
        addLog('🧽 Carregando materiais de limpeza...', 'info')
        await runMaterialSeed()
        addLog('✅ Materiais carregados com sucesso!', 'success')

        $q.notify({
          color: 'positive',
          message: t('forms.configuracoes.sections.dataManagement.individualLoad.materials.success'),
          timeout: 3000,
          position: 'top-right'
        })
      } catch (error) {
        addLog(`❌ Erro ao carregar materiais: ${error.message}`, 'error')
        $q.notify({
          color: 'negative',
          message: t('forms.configuracoes.sections.dataManagement.individualLoad.materials.error'),
          timeout: 5000,
          position: 'top-right'
        })
      } finally {
        loading.value.materiais = false
      }
    }

    async function carregarClientes() {
      loading.value.clientes = true
      try {
        addLog('👥 Carregando clientes...', 'info')
        await seedClientes()
        addLog('✅ Clientes carregados com sucesso!', 'success')

        $q.notify({
          color: 'positive',
          message: t('forms.configuracoes.sections.dataManagement.individualLoad.clients.success'),
          timeout: 3000,
          position: 'top-right'
        })
      } catch (error) {
        addLog(`❌ Erro ao carregar clientes: ${error.message}`, 'error')
        $q.notify({
          color: 'negative',
          message: t('forms.configuracoes.sections.dataManagement.individualLoad.clients.error'),
          timeout: 5000,
          position: 'top-right'
        })
      } finally {
        loading.value.clientes = false
      }
    }

    async function carregarColaboradores() {
      loading.value.colaboradores = true
      try {
        addLog('👷 Carregando colaboradores...', 'info')
        await seedColaboradores()
        addLog('✅ Colaboradores carregados com sucesso!', 'success')

        $q.notify({
          color: 'positive',
          message: t('forms.configuracoes.sections.dataManagement.individualLoad.collaborators.success'),
          timeout: 3000,
          position: 'top-right'
        })
      } catch (error) {
        addLog(`❌ Erro ao carregar colaboradores: ${error.message}`, 'error')
        $q.notify({
          color: 'negative',
          message: t('forms.configuracoes.sections.dataManagement.individualLoad.collaborators.error'),
          timeout: 5000,
          position: 'top-right'
        })
      } finally {
        loading.value.colaboradores = false
      }
    }

    async function carregarServicos() {
      loading.value.servicos = true
      try {
        addLog('🧹 Carregando serviços...', 'info')
        await runServiceSeed()
        addLog('✅ Serviços carregados com sucesso!', 'success')

        $q.notify({
          color: 'positive',
          message: t('forms.configuracoes.sections.dataManagement.individualLoad.services.success'),
          timeout: 3000,
          position: 'top-right'
        })
      } catch (error) {
        addLog(`❌ Erro ao carregar serviços: ${error.message}`, 'error')
        $q.notify({
          color: 'negative',
          message: t('forms.configuracoes.sections.dataManagement.individualLoad.services.error'),
          timeout: 5000,
          position: 'top-right'
        })
      } finally {
        loading.value.servicos = false
      }
    }

    async function carregarConfiguracao() {
      loading.value.configuracao = true
      try {
        addLog('⚙️ Carregando configuração da Schedule America...', 'info')

        // Carregar a imagem
        const response = await fetch('/schedule_america.png')
        if (!response.ok) throw new Error('Não foi possível carregar a logo')

        const blob = await response.blob()
        const reader = new FileReader()

        const logoBase64 = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result)
          reader.onerror = () => reject(reader.error)
          reader.readAsDataURL(blob)
        })

        // Configuração completa
        const configScheduleAmerica = {
          nomeEmpresa: 'Schedule America',
          emailEmpresa: 'contato@scheduleamerica.com',
          telefoneEmpresa: '(305) 555-0123',
          moeda: 'USD',
          validadeOrcamentoDias: 30,
          emailJsKey: '',
          emailJsServiceId: '',
          emailJsTemplateIdOrcamento: '',
          logo: logoBase64,
          endereco: {
            logradouro: '456 Cleaning Boulevard',
            numero: '789',
            complemento: 'Suite 200',
            bairro: 'Downtown',
            cidade: 'Miami',
            estado: 'FL',
            cep: '33101'
          }
        }

        localStorage.setItem('ecleaner_config', JSON.stringify(configScheduleAmerica))
        config.value = { ...configScheduleAmerica }
        configOriginal.value = { ...configScheduleAmerica }
        editMode.value = false
        logoFile.value = null
        previewUrl.value = configScheduleAmerica.logo

        addLog('✅ Configuração da Schedule America carregada com sucesso!', 'success')

        $q.notify({
          color: 'positive',
          message: 'Configuração Schedule America carregada',
          caption: 'Empresa e dados de teste foram importados com sucesso',
          timeout: 3000,
          position: 'top-right'
        })
      } catch (error) {
        addLog(`❌ Erro ao carregar configuração: ${error.message}`, 'error')
        $q.notify({
          color: 'negative',
          message: 'Erro ao carregar configuração',
          caption: error.message,
          timeout: 5000,
          position: 'top-right'
        })
      } finally {
        loading.value.configuracao = false
      }
    }

    function confirmarLimpezaCompleta() {
      $q.dialog({
        title: t('forms.configuracoes.sections.danger.clearData.title'),
        message: t('forms.configuracoes.sections.danger.clearData.confirm'),
        cancel: true,
        persistent: true,
        color: 'negative',
        html: true
      }).onOk(() => {
        executarLimpezaCompleta()
      })
    }

    async function executarLimpezaCompleta() {
      loading.value.limpeza = true
      try {
        addLog('🗑️ Iniciando limpeza completa...', 'warning')

        const keys = Object.keys(localStorage)
        keys.forEach(key => {
          if (key.includes('materiais') || key.includes('clientes') ||
            key.includes('colaboradores') || key.includes('equipes') ||
            key.includes('servicos') || key.includes('pacotes')) {
            localStorage.removeItem(key)
          }
        })

        addLog('✅ Limpeza completa executada!', 'success')

        $q.notify({
          color: 'info',
          message: t('forms.configuracoes.sections.danger.clearData.success'),
          caption: 'Todos os dados foram removidos',
          timeout: 3000,
          position: 'top-right'
        })

      } catch (error) {
        addLog(`❌ Erro durante a limpeza: ${error.message}`, 'error')
        $q.notify({
          color: 'negative',
          message: t('forms.configuracoes.sections.danger.clearData.error'),
          timeout: 5000,
          position: 'top-right'
        })
      } finally {
        loading.value.limpeza = false
      }
    }

    async function salvarConfiguracoes() {
      loading.value.salvar = true
      try {
        // Criar cópia do objeto para salvar, convertendo logo para base64 se for um File
        const configToSave = { ...config.value }

        if (config.value.logo && typeof config.value.logo !== 'string') {
          try {
            configToSave.logo = await fileToBase64(config.value.logo)
          } catch (err) {
            console.error('Erro ao converter logomarca para base64:', err)
            // Caso de erro, não salvar a logo
            configToSave.logo = null
          }
        }

        // Validar tamanho antes de salvar
        const jsonString = JSON.stringify(configToSave)
        const sizeInBytes = new Blob([jsonString]).size
        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2)
        const MAX_SIZE_MB = 2 // Limite máximo de 2MB para a configuração

        if (sizeInBytes > MAX_SIZE_MB * 1024 * 1024) {
          addLog(`❌ Arquivo de configuração muito grande (${sizeInMB}MB). Máximo permitido: ${MAX_SIZE_MB}MB`, 'error')
          $q.notify({
            color: 'negative',
            message: `Arquivo de configuração muito grande (${sizeInMB}MB). Máximo permitido: ${MAX_SIZE_MB}MB. Por favor, reduza o tamanho da logomarca.`,
            timeout: 5000,
            position: 'top-right'
          })
          loading.value.salvar = false
          return
        }

        localStorage.setItem('ecleaner_config', jsonString)
        configOriginal.value = { ...configToSave }
        config.value = { ...configToSave }
        // Limpar arquivo após salvar (logo agora é base64 string)
        logoFile.value = null
        previewUrl.value = configToSave.logo
        editMode.value = false

        addLog('⚙️ Configurações salvas com sucesso!', 'success')

        $q.notify({
          color: 'positive',
          message: t('forms.configuracoes.sections.generalConfig.messages.success'),
          timeout: 2000,
          position: 'top-right'
        })
      } catch (error) {
        addLog(`❌ Erro ao salvar configurações: ${error.message}`, 'error')
        $q.notify({
          color: 'negative',
          message: t('forms.configuracoes.sections.generalConfig.messages.error'),
          timeout: 5000,
          position: 'top-right'
        })
      } finally {
        loading.value.salvar = false
      }
    }

    function cancelarEdicao() {
      config.value = { ...configOriginal.value }
      editMode.value = false
    }

    function limparLogs() {
      logs.value = []
    }

    function carregarConfiguracoes() {
      try {
        const savedConfig = localStorage.getItem('ecleaner_config')
        if (savedConfig) {
          const parsed = JSON.parse(savedConfig)
          // Merge profundo para garantir que objetos aninhados (como endereço) sejam preservados
          config.value = {
            ...config.value,
            ...parsed,
            endereco: {
              ...config.value.endereco,
              ...(parsed.endereco || {})
            }
          }
          // Se a logo estiver salva como base64, exibir preview
          logoFile.value = null
          previewUrl.value = parsed.logo || null
        }
        configOriginal.value = { ...config.value }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error)
      }
    }

    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = (err) => reject(err)
        reader.readAsDataURL(file)
      })
    }

    function getLogoUrl(file) {
      if (!file) return ''
      if (typeof file === 'string') return file
      if (file.__img) return file.__img
      return URL.createObjectURL(file)
    }

    onMounted(() => {
      carregarConfiguracoes()
      addLog('🔧 Página de configurações carregada', 'info')
    })

    return {
      loading,
      logs,
      editMode,
      config,
      moedaOptions,
      hasAnyLoading,
      executarCargaCompleta,
      carregarMateriais,
      carregarClientes,
      carregarColaboradores,
      carregarServicos,
      confirmarLimpezaCompleta,
      salvarConfiguracoes,
      cancelarEdicao,
      limparLogs,
      getLogClass,
      getLogIcon,
      getLogColor,
      getLogoUrl,
      logoFile,
      previewUrl,
      handleLogoAdded
    }
  }
})
</script>

<style lang="sass" scoped>
.log-container
  max-height: 300px
  overflow-y: auto
  border: 1px solid #e0e0e0
  border-radius: 4px
  background: #fafafa

.log-entry
  font-family: 'Courier New', monospace
  font-size: 12px
  border-radius: 4px
  display: flex
  align-items: center

.full-height
  height: 100%
</style>
