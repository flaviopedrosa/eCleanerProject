<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho da Página -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-icon name="badge" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ $t('forms.colaborador.list.title') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-between items-center">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ $t('forms.colaborador.list.subtitle') }}
          </p>
          <div class="row q-gutter-sm">
            <q-btn color="primary" :label="$t('forms.colaborador.list.buttons.new')" icon="add"
              to="/colaboradores/novo" />
          </div>
        </div>
      </div>
    </div>



    <!-- Card Principal -->
    <q-card>
      <!-- Seção de Filtros -->
      <q-card-section>
        <div class="row q-col-gutter-md">
          <!-- Filtro de Busca -->
          <div class="col-12 col-md-4">
            <q-input v-model="filter" :label="$t('forms.colaborador.list.filters.search')" dense clearable outlined>
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

          <!-- Filtro de Status -->
          <div class="col-12 col-md-4">
            <q-select v-model="statusFilter" :options="statusOptions"
              :label="$t('forms.colaborador.list.filters.status')" dense outlined clearable emit-value map-options />
          </div>

          <!-- Ordenação -->
          <div class="col-12 col-md-4">
            <q-select v-model="sortBy" :options="sortOptions" :label="$t('forms.colaborador.list.filters.sort')" dense
              outlined emit-value map-options />
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <!-- Seção de Lista -->
      <q-card-section>
        <!-- Tabela para Desktop -->
        <div class="gt-sm">
          <q-table :rows="filteredColaboradores" :columns="columns" :loading="loading" row-key="Id" binary-state-sort
            flat bordered :pagination="pagination" @update:pagination="pagination = $event" :filter="filter">
            <!-- Coluna de Status -->
            <template #body-cell-status="props">
              <q-td :props="props">
                <q-badge :color="getStatusColor(props.value)">
                  {{ $t(`enums.statusColaborador.${props.value}`) }}
                </q-badge>
              </q-td>
            </template>

            <!-- Coluna de Experiência -->
            <template #body-cell-experience="props">
              <q-td :props="props">
                {{ formatExperienceTime(props.row.TempoTotalExperiencia) }}
              </q-td>
            </template>

            <!-- Coluna de Regiões -->
            <template #body-cell-regions="props">
              <q-td :props="props">
                <q-chip v-for="regiao in props.row.RegioesAtuacao" :key="regiao" size="sm" class="q-mr-xs">
                  {{ regiao }}
                </q-chip>
              </q-td>
            </template>

            <!-- Coluna de Ações -->
            <template #body-cell-actions="props">
              <q-td :props="props" class="q-gutter-x-sm">
                <q-btn flat round color="primary" icon="edit" :to="`/colaboradores/${props.row.Id}`">
                  <q-tooltip>
                    {{ $t('forms.colaborador.list.buttons.edit') }}
                  </q-tooltip>
                </q-btn>
                <q-btn flat round color="negative" icon="delete" @click="confirmDelete(props.row)">
                  <q-tooltip>
                    {{ $t('forms.colaborador.list.buttons.delete') }}
                  </q-tooltip>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </div>

        <!-- Cards para Mobile -->
        <div class="lt-md">
          <div class="row q-col-gutter-md">
            <div v-for="colaborador in filteredColaboradores" :key="colaborador.Id" class="col-12">
              <q-card flat bordered>
                <q-card-section>
                  <div class="row items-center q-mb-md">
                    <q-avatar size="48px" color="primary" text-color="white" class="q-mr-md">
                      {{ getInitials(colaborador.Nome, colaborador.Sobrenome) }}
                    </q-avatar>
                    <div class="text-weight-medium">
                      {{ colaborador.Nome }} {{ colaborador.Sobrenome }}
                      <div>
                        <q-badge :color="getStatusColor(colaborador.Status)">
                          {{ $t(`enums.statusColaborador.${colaborador.Status}`) }}
                        </q-badge>
                      </div>
                    </div>
                  </div>

                  <div class="q-gutter-y-sm">
                    <!-- Email -->
                    <div class="row items-center">
                      <q-icon name="email" size="sm" color="grey-7" class="q-mr-sm" />
                      {{ colaborador.Email }}
                    </div>

                    <!-- Experiência -->
                    <div class="row items-center">
                      <q-icon name="work_history" size="sm" color="grey-7" class="q-mr-sm" />
                      {{ formatExperienceTime(colaborador.TempoTotalExperiencia) }}
                    </div>

                    <!-- Disponibilidade -->
                    <div class="row items-center">
                      <q-icon name="schedule" size="sm" color="grey-7" class="q-mr-sm" />
                      {{ colaborador.Disponibilidade }}
                    </div>

                    <!-- Regiões de Atuação -->
                    <div class="row items-start">
                      <q-icon name="place" size="sm" color="grey-7" class="q-mr-sm q-mt-xs" />
                      <div class="col">
                        <q-chip v-for="regiao in colaborador.RegioesAtuacao" :key="regiao" dense size="sm"
                          class="q-ma-none q-mr-xs q-mb-xs">
                          {{ regiao }}
                        </q-chip>
                      </div>
                    </div>
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                  <q-btn flat color="primary" icon="edit" :label="$t('forms.colaborador.list.buttons.edit')"
                    :to="`/colaboradores/${colaborador.Id}`" />
                  <q-btn flat color="negative" icon="delete" :label="$t('forms.colaborador.list.buttons.delete')"
                    @click="confirmDelete(colaborador)" />
                </q-card-actions>
              </q-card>
            </div>
          </div>

          <!-- Paginação para mobile -->
          <div class="row justify-center q-mt-md">
            <q-pagination v-model="pagination.page"
              :max="Math.ceil(filteredColaboradores.length / pagination.rowsPerPage)" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Diálogo de Exclusão -->
    <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm">
          </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat color="primary" v-close-popup />
          <q-btn flat color="primary" v-close-popup />
          <q-btn flat color="negative" @click="deleteColaborador" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { StatusColaborador } from '../core/domain/enums/statusColaborador.js'
import colaboradorRepository from '../core/infrastructure/repositories/colaboradorRepository.js'

export default defineComponent({
  name: 'ColaboradorListagemPage',

  setup() {
    const $q = useQuasar()
    const { t } = useI18n()

    // Estado
    const filter = ref('')
    const statusFilter = ref(null)
    const sortBy = ref('nameAsc')
    const loading = ref(false)
    const deleteDialog = ref(false)
    const selectedColaborador = ref(null)
    const colaboradores = ref([])



    // Carrega os colaboradores do repositório
    const loadColaboradores = async () => {
      try {
        loading.value = true
        colaboradores.value = await colaboradorRepository.getAll()
      } catch (error) {
        console.error('Erro ao carregar colaboradores:', error)
        $q.notify({
          color: 'negative',
          message: t('forms.colaborador.list.messages.loadError')
        })
      } finally {
        loading.value = false
      }
    }

    // Definição das colunas como uma ref computada para atualizar quando o idioma mudar
    const columns = computed(() => [
      {
        name: 'name',
        label: t('forms.colaborador.list.columns.name'),
        field: row => `${row.Nome} ${row.Sobrenome}`,
        sortable: true,
        align: 'left'
      },
      {
        name: 'email',
        label: t('forms.colaborador.list.columns.email'),
        field: 'Email',
        sortable: true
      },
      {
        name: 'status',
        label: t('forms.colaborador.list.columns.status'),
        field: 'Status',
        sortable: true
      },
      {
        name: 'availability',
        label: t('forms.colaborador.list.columns.availability'),
        field: 'Disponibilidade'
      },
      {
        name: 'regions',
        label: t('forms.colaborador.list.columns.regions'),
        field: 'RegioesAtuacao'
      },
      {
        name: 'age',
        label: t('forms.colaborador.list.columns.age'),
        field: 'Idade',
        sortable: true
      },
      {
        name: 'experience',
        label: t('forms.colaborador.list.columns.experience'),
        field: 'TempoTotalExperiencia',
        sortable: true
      },
      {
        name: 'custoPorHora',
        label: 'Custo/Hora',
        field: 'CustoPorHora',
        sortable: true,
        format: val => val ? `R$ ${Number(val).toFixed(2)}` : 'N/A',
        align: 'right'
      },
      {
        name: 'actions',
        label: t('forms.colaborador.list.columns.actions'),
        field: 'actions',
        align: 'center'
      }
    ])


    // Paginação
    const pagination = ref({
      sortBy: 'nome',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    })

    // Opções de status para filtro
    const statusOptions = computed(() => Object.keys(StatusColaborador).map(value => ({
      label: t(`enums.statusColaborador.${value}`),
      value
    })))

    // Opções de ordenação
    const sortOptions = computed(() => [
      { label: t('forms.colaborador.list.sort.nameAsc'), value: 'nameAsc' },
      { label: t('forms.colaborador.list.sort.nameDesc'), value: 'nameDesc' },
      { label: t('forms.colaborador.list.sort.newest'), value: 'newest' },
      { label: t('forms.colaborador.list.sort.oldest'), value: 'oldest' }
    ])



    // Filtragem e ordenação dos colaboradores
    const filteredColaboradores = computed(() => {
      let result = [...colaboradores.value]

      // Aplicar filtro de texto
      if (filter.value) {
        const searchText = filter.value.toLowerCase()
        result = result.filter(col =>
          `${col.Nome} ${col.Sobrenome}`.toLowerCase().includes(searchText) ||
          col.Email.toLowerCase().includes(searchText)
        )
      }

      // Aplicar filtro de status
      if (statusFilter.value) {
        result = result.filter(col => col.Status === statusFilter.value)
      }

      // Aplicar ordenação
      switch (sortBy.value) {
        case 'nameAsc':
          result.sort((a, b) => `${a.Nome} ${a.Sobrenome}`.localeCompare(`${b.Nome} ${b.Sobrenome}`))
          break
        case 'nameDesc':
          result.sort((a, b) => `${b.Nome} ${b.Sobrenome}`.localeCompare(`${a.Nome} ${a.Sobrenome}`))
          break
        case 'newest':
          result.sort((a, b) => new Date(b.DataInicioVinculo) - new Date(a.DataInicioVinculo))
          break
        case 'oldest':
          result.sort((a, b) => new Date(a.DataInicioVinculo) - new Date(b.DataInicioVinculo))
          break
      }

      return result
    })

    // Cores dos status
    const getStatusColor = (status) => {
      const colors = {
        [StatusColaborador.EM_ANALISE]: 'grey',
        [StatusColaborador.EM_EXPERIENCIA]: 'orange',
        [StatusColaborador.EFETIVADO]: 'positive',
        [StatusColaborador.SUSPENSO]: 'warning',
        [StatusColaborador.DESLIGADO]: 'negative',
        [StatusColaborador.BLOQUEADO]: 'negative'
      }
      return colors[status] || 'grey'
    }

    // Formatação do tempo de experiência
    const formatExperienceTime = (months) => {
      if (months === 0) return 'Sem experiência'
      const years = Math.floor(months / 12)
      const remainingMonths = months % 12
      const parts = []
      if (years > 0) {
        parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`)
      }
      if (remainingMonths > 0) {
        parts.push(`${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`)
      }
      return parts.join(' e ')
    }

    // Função para obter iniciais do nome
    const getInitials = (nome, sobrenome) => {
      return `${nome.charAt(0)}${sobrenome.charAt(0)}`.toUpperCase()
    }

    // Funções de exclusão
    const confirmDelete = (colaborador) => {
      selectedColaborador.value = colaborador
      deleteDialog.value = true
    }

    const deleteColaborador = async () => {
      try {
        loading.value = true
        // TODO: Implementar lógica de exclusão
        $q.notify({
          type: 'positive',
          message: 'Colaborador excluído com sucesso'
        })
      } catch (error) {
        console.error('Erro ao excluir colaborador:', error)
        $q.notify({
          type: 'negative',
          message: `Erro ao excluir colaborador: ${error.message}`
        })
      } finally {
        loading.value = false
        selectedColaborador.value = null
        deleteDialog.value = false
      }
    }

    // Carrega dados iniciais
    onMounted(() => {
      loadColaboradores()
    })

    return {
      filter,
      statusFilter,
      sortBy,
      loading,
      deleteDialog,
      selectedColaborador,
      colaboradores,
      statusOptions,
      sortOptions,
      columns,
      filteredColaboradores,
      getStatusColor,
      formatExperienceTime,
      confirmDelete,
      deleteColaborador,
      pagination,
      getInitials
    }
  }
})
</script>
