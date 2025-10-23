<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho padrão -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-icon name="build" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ $t('pages.servico.title') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-end items-center">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ $t('pages.servico.subtitle') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Campo de Busca e Botão Novo Serviço -->
    <div class="row q-mb-lg items-center q-gutter-md">
      <div class="col-12 col-md-6">
        <q-input v-model="filtro" :placeholder="$t('pages.servico.searchPlaceholder')" filled clearable dense>
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <q-space />
      <q-btn color="primary" icon="add" :label="$t('pages.servico.newButton')" to="/servicos/novo" />
    </div>

    <!-- Listagem responsiva -->
    <div class="gt-sm">
      <q-table :rows="servicosFiltrados" :columns="columns" row-key="Id" class="servico-table" wrap-cells
        :no-data-label="$t('pages.servico.noData')">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn flat round color="primary" icon="edit" @click="editarServico(props.row)">
              <q-tooltip>Editar</q-tooltip>
            </q-btn>
            <q-btn flat round color="negative" icon="delete" @click="excluirServico(props.row)">
              <q-tooltip>Excluir</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <div class="lt-md">
      <div class="row q-col-gutter-md">
        <div v-for="servico in servicosFiltrados" :key="servico.Id" class="col-12">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6">{{ servico.Nome }}</div>
              <div class="text-subtitle2">{{ servico.Descricao }}</div>
              <div class="text-caption">{{ $t('pages.servico.valor') }}: {{ servico.ValorFormatado }}</div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn flat color="primary" icon="edit" label="Editar" @click="editarServico(servico)" />
              <q-btn flat color="negative" icon="delete" label="Excluir" @click="excluirServico(servico)" />
            </q-card-actions>
          </q-card>
        </div>
        <div v-if="servicosFiltrados.length === 0" class="col-12">
          <q-card flat bordered class="text-center q-pa-xl">
            <q-icon name="build" size="4rem" color="grey-5" />
            <div class="text-h6 q-mt-md text-grey-6">
              {{ $t('pages.servico.noData') }}
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, computed, ref } from 'vue'
import { useServicoStore } from '@/stores/servico-store'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { getCurrencyConfig, formatCurrency } from '@/core/domain/utils/currencyUtils'
import { seedServicos } from '@/core/infrastructure/repositories/seeds/servicoSeed'

export default defineComponent({
  name: 'ServicoListagemPage',
  setup() {
    const store = useServicoStore()
    const router = useRouter()
    const $q = useQuasar()
    const { locale } = useI18n()

    // Estado do filtro
    const filtro = ref('')

    const currencyConfig = computed(() => getCurrencyConfig(locale.value))

    const columns = [
      {
        name: 'Nome',
        label: 'Nome',
        field: 'Nome',
        align: 'left',
        style: 'width: 25%; max-width: 180px;'
      },
      {
        name: 'Descricao',
        label: 'Descrição',
        field: 'Descricao',
        align: 'left',
        style: 'width: 40%; max-width: 250px;',
        classes: 'text-wrap'
      },
      {
        name: 'Valor',
        label: 'Valor',
        field: 'ValorFormatado',
        align: 'right',
        style: 'width: 15%; max-width: 100px;'
      },
      {
        name: 'actions',
        label: 'Ações',
        field: 'actions',
        align: 'center',
        style: 'width: 20%; max-width: 150px;'
      }
    ]

    const servicosFormatados = computed(() => {
      return store.servicos.map(servico => ({
        ...servico,
        ValorFormatado: formatCurrency(servico.Valor, locale.value, currencyConfig.value.currency)
      }))
    })

    // Computed para filtrar serviços
    const servicosFiltrados = computed(() => {
      if (!filtro.value) {
        return servicosFormatados.value
      }

      const filtroLowerCase = filtro.value.toLowerCase()
      return servicosFormatados.value.filter(servico =>
        servico.Nome.toLowerCase().includes(filtroLowerCase) ||
        servico.Descricao.toLowerCase().includes(filtroLowerCase)
      )
    })

    const editarServico = (servico) => {
      router.push(`/servicos/editar/${servico.Id}`)
    }

    const excluirServico = async (servico) => {
      $q.dialog({
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir o serviço "${servico.Nome}"?`,
        cancel: true,
        persistent: true,
        ok: {
          label: 'Excluir',
          color: 'negative'
        }
      }).onOk(async () => {
        try {
          await store.deleteServico(servico.Id)
          $q.notify({
            type: 'positive',
            message: 'Serviço excluído com sucesso!',
            position: 'top-right'
          })
        } catch (error) {
          $q.notify({
            type: 'negative',
            message: 'Erro ao excluir serviço: ' + error.message,
            position: 'top-right'
          })
        }
      })
    }

    onMounted(async () => {
      await store.fetchServicos()

      // Se não houver serviços, executa o seed automaticamente
      if (store.servicos.length === 0) {
        console.log('🌱 Nenhum serviço encontrado, executando seed...')
        try {
          await seedServicos()
          await store.fetchServicos() // Recarrega os serviços após o seed
          console.log('✅ Seed executado com sucesso!')
        } catch (error) {
          console.error('❌ Erro ao executar seed:', error)
        }
      }
    })

    return {
      // Estado
      filtro,

      // Computed
      servicosFiltrados,
      columns,

      // Métodos
      editarServico,
      excluirServico
    }
  }
})
</script>

<style lang="sass">
.servico-table
  .q-table__container
    max-width: 100%
    overflow-x: hidden

  .q-table
    table-layout: fixed
    width: 100%

  td, th
    word-wrap: break-word
    overflow-wrap: break-word

  .text-wrap
    white-space: normal !important
    word-break: break-word
    max-width: 250px

  // Coluna Nome
  td:nth-child(1), th:nth-child(1)
    width: 25%
    max-width: 180px

  // Coluna Descrição
  td:nth-child(2), th:nth-child(2)
    width: 40%
    max-width: 250px

  // Coluna Valor
  td:nth-child(3), th:nth-child(3)
    width: 15%
    max-width: 100px

  // Coluna Ações
  td:nth-child(4), th:nth-child(4)
    width: 20%
    max-width: 150px
    text-align: center

// Botão FAB personalizado
.fixed-bottom-right
  position: fixed !important
  z-index: 9999
  border-radius: 50% !important
  right: 10px
  bottom: 40px
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3)
  /* Garante que fique acima do rodapé */
  @media (max-width: 600px)
    right: 16px
    bottom: 24px

  .q-btn__content
    display: flex
    align-items: center
    justify-content: center

  .q-icon
    margin: 0 !important
</style>
