<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho da Página -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-icon name="people" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ $t('pages.clientList.title') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-between items-center">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ $t('pages.clientList.subtitle') }}
          </p>
          <div class="row q-gutter-sm">
            <q-btn color="secondary" :label="$t('pages.clientList.buttons.loadTestData')" icon="dataset"
              @click="loadTestData" />
            <q-btn color="primary" :label="$t('pages.clientList.buttons.newClient')" icon="add" to="/clientes/novo" />
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <!-- Busca -->
          <div class="col-12 col-md-6">
            <q-input v-model="filters.search" :label="$t('pages.clientList.filters.search')" dense outlined clearable
              debounce="300">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

          <!-- Status -->
          <div class="col-12 col-md-3">
            <q-select v-model="filters.status" :options="statusOptions" :label="$t('pages.clientList.filters.status')"
              dense outlined clearable emit-value map-options />
          </div>

          <!-- Ordenação -->
          <div class="col-12 col-md-3">
            <q-select v-model="filters.sort" :options="sortOptions" :label="$t('pages.clientList.filters.sort')" dense
              outlined clearable emit-value map-options :loading="loading" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Feedback de carregamento de dados de teste -->
    <q-dialog v-model="testDataDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ $t('pages.clientList.messages.loadingTestData') }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ $t('pages.clientList.messages.loadingTestDataDesc') }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('pages.clientList.buttons.cancel')" color="primary" v-close-popup />
          <q-btn :label="$t('pages.clientList.buttons.confirm')" color="primary" @click="confirmLoadTestData"
            v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Tabela -->
    <!-- Tabela para Desktop -->
    <div class="gt-sm">
      <q-table :rows="filteredClients" :columns="columns" row-key="id" :loading="loading" :pagination="pagination"
        @request="onRequest" :rows-per-page-options="[10, 20, 50]" binary-state-sort>
        <!-- Slots para personalização das células -->
        <template v-slot:body-cell-nome="props">
          <q-td :props="props">
            <div class="row items-center">
              <q-avatar size="32px" color="primary" text-color="white">
                {{ getInitials(props.row.Nome, props.row.Sobrenome) }}
              </q-avatar>
              <div class="q-ml-sm">
                {{ props.row.Nome }} {{ props.row.Sobrenome }}
              </div>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-enderecos="props">
          <q-td :props="props">
            <div class="address-cell">
              {{props.row.Enderecos?.map(e => formatEndereco(e))?.join('\n') || '-'}}
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn flat round color="primary" icon="edit" :to="'/clientes/' + props.row.id + '/editar'">
              <q-tooltip>{{ $t('pages.clientList.buttons.edit') }}</q-tooltip>
            </q-btn>
            <q-btn flat round color="negative" icon="delete" @click="confirmarExclusao(props.row)">
              <q-tooltip>{{ $t('pages.clientList.buttons.delete') }}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- Cards para mobile -->
    <div class="lt-md">
      <div class="row q-col-gutter-md">
        <div v-for="cliente in filteredClients" :key="cliente.id" class="col-12">
          <q-card flat bordered>
            <q-card-section>
              <div class="row items-center q-mb-md">
                <q-avatar size="48px" color="primary" text-color="white" class="q-mr-md">
                  {{ getInitials(cliente.Nome, cliente.Sobrenome) }}
                </q-avatar>
                <div class="text-weight-medium">
                  {{ cliente.Nome }} {{ cliente.Sobrenome }}
                </div>
              </div>

              <div class="q-gutter-y-sm">
                <!-- Email -->
                <div class="row items-center">
                  <q-icon name="email" size="sm" color="grey-7" class="q-mr-sm" />
                  {{ cliente.Email }}
                </div>

                <!-- Telefones -->
                <div class="row items-center" v-if="cliente.Telefone || cliente.Celular">
                  <q-icon name="phone" size="sm" color="grey-7" class="q-mr-sm" />
                  {{ [cliente.Telefone, cliente.Celular].filter(Boolean).join(' / ') }}
                </div>

                <!-- Endereços -->
                <div class="row items-start">
                  <q-icon name="place" size="sm" color="grey-7" class="q-mr-sm q-mt-xs" />
                  <div class="col">
                    <q-chip v-for="(endereco, index) in cliente.Enderecos" :key="index" dense size="sm"
                      class="q-ma-none q-mr-xs q-mb-xs">
                      {{ formatEndereco(endereco) }}
                    </q-chip>
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
              <q-btn flat color="primary" icon="edit" :label="$t('pages.clientList.buttons.edit')"
                :to="'/clientes/' + cliente.id + '/editar'" />
              <q-btn flat color="negative" icon="delete" :label="$t('pages.clientList.buttons.delete')"
                @click="confirmarExclusao(cliente)" />
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <!-- Paginação para mobile -->
      <div class="row justify-center q-mt-md">
        <q-pagination v-model="pagination.page" :max="Math.ceil(filteredClients.length / pagination.rowsPerPage)"
          :max-pages="6" :boundary-links="true" :direction-links="true" :input="true" />
      </div>
    </div>


    <!-- Diálogo de confirmação de exclusão -->
    <q-dialog v-model="dialogExclusao.show" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="warning" text-color="white" />
          <span class="q-ml-sm">{{ $t('pages.clientList.deleteDialog.title') }}</span>
        </q-card-section>

        <q-card-section>
          {{ $t('pages.clientList.deleteDialog.message', { name: dialogExclusao.cliente?.nome }) }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('pages.clientList.buttons.cancel')" color="primary" v-close-popup />
          <q-btn flat :label="$t('pages.clientList.buttons.confirm')" color="negative" @click="excluirCliente"
            v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, computed, defineComponent, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { seedClientes } from '../core/infrastructure/repositories/seeds/clienteSeed'
import { ClienteRepository } from 'src/core/infrastructure/repositories/clienteRepository'

export default defineComponent({
  name: 'ClienteListagemPage',

  setup() {
    const { t } = useI18n()
    const $q = useQuasar()
    const clienteRepository = new ClienteRepository()
    const loading = ref(false)

    // Estado
    const pagination = ref({
      sortBy: 'nome',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    })

    const filters = ref({
      search: '',
      status: null,
      sort: 'nome'
    })

    const dialogExclusao = ref({
      show: false,
      cliente: null
    })

    const testDataDialog = ref(false)
    const clientes = ref([])

    // Funções para carregar dados de teste
    const loadTestData = () => {
      testDataDialog.value = true
    }

    const confirmLoadTestData = async () => {
      try {
        loading.value = true
        await seedClientes()
        await loadClientes()
        $q.notify({
          color: 'positive',
          message: t('pages.clientList.messages.testDataLoaded')
        })
      } catch (error) {
        console.error('Erro ao carregar dados de teste:', error)
        $q.notify({
          color: 'negative',
          message: t('pages.clientList.messages.loadError')
        })
      } finally {
        loading.value = false
      }
    }

    // Carrega os clientes do repositório
    const loadClientes = async () => {
      try {
        loading.value = true
        clientes.value = await clienteRepository.getAll()
      } catch (error) {
        console.error('Erro ao carregar clientes:', error)
        $q.notify({
          color: 'negative',
          message: t('pages.clientList.messages.loadError')
        })
      } finally {
        loading.value = false
      }
    }

    // Carrega os clientes quando o componente é montado
    onMounted(() => {
      loadClientes()
    })

    // Opções e configurações
    const statusOptions = [
      { label: t('pages.clientList.status.active'), value: 'active' },
      { label: t('pages.clientList.status.inactive'), value: 'inactive' }
    ]

    const sortOptions = [
      { label: t('pages.clientList.sort.nameAsc'), value: 'nome' },
      { label: t('pages.clientList.sort.nameDesc'), value: '-nome' },
      { label: t('pages.clientList.sort.newest'), value: '-createdAt' },
      { label: t('pages.clientList.sort.oldest'), value: 'createdAt' }
    ]

    const columns = [
      {
        name: 'nome',
        required: true,
        label: t('pages.clientList.columns.name'),
        align: 'left',
        field: row => `${row.Nome} ${row.Sobrenome}`,
        sortable: true
      },
      {
        name: 'email',
        required: true,
        label: t('pages.clientList.columns.email'),
        align: 'left',
        field: 'Email',
        sortable: true
      },
      {
        name: 'telefones',
        required: false,
        label: t('pages.clientList.columns.phones'),
        align: 'left',
        field: row => [row.Telefone, row.Celular].filter(Boolean).join(' / ')
      },
      {
        name: 'enderecos',
        required: false,
        label: t('pages.clientList.columns.addresses'),
        align: 'left',
        style: 'max-width: 300px; white-space: normal; word-break: break-word',
        field: row => (row.Enderecos || []).map(e => formatEndereco(e)).join('\n')
      },
      {
        name: 'status',
        required: true,
        label: t('pages.clientList.columns.status'),
        align: 'left',
        field: 'Status',
        sortable: true
      },
      {
        name: 'actions',
        required: true,
        label: t('pages.clientList.columns.actions'),
        align: 'center'
      }
    ]

    // Funções auxiliares
    const getInitials = (nome, sobrenome) => {
      return `${nome?.charAt(0) || ''}${sobrenome?.charAt(0) || ''}`.toUpperCase()
    }

    const formatEndereco = (endereco) => {
      if (!endereco) return ''
      const { Logradouro, Numero, Bairro, Cidade, Estado } = endereco
      return `${Logradouro}, ${Numero} - ${Bairro}, ${Cidade}/${Estado}`
    }

    // Computed properties
    const filteredClients = computed(() => {
      let result = [...clientes.value]

      // Filtro por texto
      if (filters.value.search) {
        const searchLower = filters.value.search.toLowerCase()
        result = result.filter(cliente =>
          cliente.Nome.toLowerCase().includes(searchLower) ||
          cliente.Sobrenome.toLowerCase().includes(searchLower) ||
          cliente.Email.toLowerCase().includes(searchLower)
        )
      }

      // Filtro por status
      if (filters.value.status) {
        result = result.filter(cliente => cliente.Status === filters.value.status)
      }

      // Ordenação
      const sortField = filters.value.sort.startsWith('-')
        ? filters.value.sort.substring(1)
        : filters.value.sort
      const sortDesc = filters.value.sort.startsWith('-')

      // Converte o campo de ordenação para PascalCase
      const pascalCaseField = sortField.charAt(0).toUpperCase() + sortField.slice(1)

      result.sort((a, b) => {
        const valueA = (a[pascalCaseField] || '').toString()
        const valueB = (b[pascalCaseField] || '').toString()
        return sortDesc
          ? valueB.localeCompare(valueA)
          : valueA.localeCompare(valueB)
      })

      return result
    })

    // Função para lidar com as requisições da tabela
    const onRequest = async (props) => {
      const { sortBy, descending } = props.pagination

      // Atualiza o estado da paginação
      pagination.value = props.pagination

      // Define a direção da ordenação
      filters.value.sort = descending ? `-${sortBy}` : sortBy
    }

    // Watch para atualizar o número total de linhas
    watch(filteredClients, newValue => {
      pagination.value.rowsNumber = newValue.length
    })

    // Funções de interação
    const confirmarExclusao = (cliente) => {
      dialogExclusao.value = {
        show: true,
        cliente
      }
    }

    const excluirCliente = async () => {
      const cliente = dialogExclusao.value.cliente
      if (!cliente) return

      try {
        await clienteRepository.delete(cliente.id)
        await loadClientes() // Recarrega a lista

        $q.notify({
          color: 'positive',
          message: t('pages.clientList.messages.deleteSuccess')
        })
      } catch (error) {
        console.error('Erro ao excluir cliente:', error)
        $q.notify({
          color: 'negative',
          message: t('pages.clientList.messages.deleteError')
        })
      } finally {
        dialogExclusao.value = {
          show: false,
          cliente: null
        }
      }
    }

    return {
      loading,
      filters,
      statusOptions,
      sortOptions,
      columns,
      pagination,
      dialogExclusao,
      testDataDialog,
      loadTestData,
      confirmLoadTestData,
      filteredClients,
      getInitials,
      formatEndereco,
      confirmarExclusao,
      excluirCliente,
      clientes,
      onRequest
    }
  }
})
</script>

<style lang="sass">
// Remove barra de rolagem horizontal e força quebra de texto nas células
.no-horizontal-scroll
  .q-table__container
    overflow-x: hidden !important

  .q-table
    thead tr th
      white-space: normal
      word-break: break-word
      font-weight: bold

    tbody tr td
      white-space: normal
      word-break: break-word

// Ajusta o tamanho máximo das células para garantir layout responsivo
.q-table td, .q-table th
  max-width: 200px
  padding: 8px

// Estilo específico para a coluna de endereços
.q-table td:has(.address-cell)
  white-space: pre-line
  line-height: 1.4
  padding: 12px 8px

// Estilos para layout mobile
.lt-md
  .q-card
    margin-bottom: 1rem

  .q-card__section
    padding: 16px

  .q-avatar
    font-size: 1.2rem

  .q-chip
    margin: 4px 4px 4px 0

// Outros estilos específicos da página continuam aqui...
</style>
