<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho da Página -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-icon name="business" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ $t('pages.scheduleList.title') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-between items-center">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ $t('pages.scheduleList.subtitle') }}
          </p>
          <div class="row q-gutter-sm">
            <q-btn :label="$t('pages.scheduleList.buttons.newSchedule')" color="primary" icon="add"
              to="/schedules/novo" />
            <q-btn :label="$t('pages.scheduleList.buttons.loadTestData')" color="secondary" icon="storage"
              @click="loadTestData" />
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop: Tabela -->
    <div class="gt-sm">
      <q-table :rows="schedules" :columns="columns" :rows-per-page-options="[10, 20, 50]" :filter="filter" row-key="Id"
        :loading="loading" flat bordered :pagination="pagination" @update:pagination="pagination = $event">
        <!-- Barra de Busca -->
        <template v-slot:top>
          <div class="row full-width">
            <div class="col-12 col-md-4">
              <q-input v-model="filter" :placeholder="$t('pages.scheduleList.filters.search')" dense outlined clearable>
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
        </template>

        <!-- Coluna de Responsável -->
        <template v-slot:body-cell-responsavel="props">
          <q-td :props="props">
            {{ props.row.Responsavel.Nome }} {{ props.row.Responsavel.Sobrenome }}
          </q-td>
        </template>

        <!-- Coluna Tipo Empresa -->
        <template v-slot:body-cell-tipoEmpresa="props">
          <q-td :props="props">
            {{ $t(`enums.tipoEmpresa.${props.value}`) }}
          </q-td>
        </template>

        <!-- Coluna Ações -->
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat round dense color="primary" icon="edit" :to="'/schedules/' + props.row.Id"
              :title="$t('pages.scheduleList.buttons.edit')" />
            <q-btn flat round dense color="negative" icon="delete" @click="confirmDelete(props.row)"
              :title="$t('pages.scheduleList.buttons.delete')" />
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- Mobile: Lista de Cards -->
    <div class="lt-md">
      <q-input v-model="filter" :placeholder="$t('pages.scheduleList.filters.search')" dense outlined clearable
        :loading="loading" class="q-mb-md">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <div class="row q-col-gutter-md">
        <div v-for="schedule in filteredSchedules" :key="schedule.Id" class="col-12">
          <q-card>
            <q-card-section>
              <div class="row items-start">
                <div class="col-auto">
                  <q-avatar size="56px">
                    <img :src="schedule.Logomarca?.url" v-if="schedule.Logomarca">
                    <q-icon name="image" size="40px" v-else />
                  </q-avatar>
                </div>

                <div class="col q-ml-md">
                  <div class="text-h6">{{ schedule.NomeEmpresa }}</div>
                  <div class="text-subtitle2">{{ schedule.Responsavel.Nome }} {{ schedule.Responsavel.Sobrenome }}</div>

                  <div class="q-mt-sm">
                    <q-chip size="sm" color="primary" text-color="white">
                      {{ $t(`enums.tipoEmpresa.${schedule.TipoEmpresa}`) }}
                    </q-chip>
                  </div>

                  <div class="row q-gutter-y-sm q-mt-sm">
                    <!-- Email -->
                    <div class="col-12 row items-center">
                      <q-icon name="email" size="sm" color="grey-7" class="q-mr-sm" />
                      {{ schedule.EmailComercial }}
                    </div>

                    <!-- Telefone -->
                    <div class="col-12 row items-center">
                      <q-icon name="phone" size="sm" color="grey-7" class="q-mr-sm" />
                      {{ schedule.TelefoneComercial }}
                    </div>

                    <!-- Documento -->
                    <div class="col-12 row items-center">
                      <q-icon name="badge" size="sm" color="grey-7" class="q-mr-sm" />
                      {{ schedule.DocumentoEmpresa }}
                    </div>
                  </div>
                </div>

                <div class="col-auto">
                  <div class="row q-gutter-sm">
                    <q-btn flat round color="primary" icon="edit" :to="'/schedules/' + schedule.Id"
                      :title="$t('pages.scheduleList.buttons.edit')" />
                    <q-btn flat round color="negative" icon="delete" @click="confirmDelete(schedule)"
                      :title="$t('pages.scheduleList.buttons.delete')" />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Diálogo de Confirmação de Exclusão -->
    <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="warning" text-color="white" />
          <span class="q-ml-sm">{{ $t('pages.scheduleList.dialogs.delete.message') }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('common.cancel')" color="primary" v-close-popup />
          <q-btn flat :label="$t('common.confirm')" color="negative" @click="deleteSchedule" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import scheduleRepository from '@/core/infrastructure/repositories/scheduleRepository'


export default defineComponent({
  name: 'ScheduleListagemPage',

  setup() {
    const { t } = useI18n()
    const $q = useQuasar()

    // Estado
    const loading = ref(false)
    const filter = ref('')
    const schedules = ref([])
    const deleteDialog = ref(false)
    const selectedSchedule = ref(null)
    const pagination = ref({
      sortBy: 'NomeEmpresa',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    })

    // Carrega a lista de schedules
    const loadSchedules = async () => {
      try {
        loading.value = true
        schedules.value = await scheduleRepository.getAll()
        pagination.value.rowsNumber = schedules.value.length
      } catch (error) {
        console.error('Erro ao carregar schedules:', error)
        $q.notify({
          type: 'negative',
          message: t('pages.scheduleList.messages.loadError')
        })
      } finally {
        loading.value = false
      }
    }

    // Configuração das colunas da tabela
    const columns = [
      {
        name: 'nomeEmpresa',
        label: t('pages.scheduleList.columns.name'),
        field: 'NomeEmpresa',
        align: 'left',
        sortable: true
      },
      {
        name: 'responsavel',
        label: t('pages.scheduleList.columns.responsavel'),
        field: row => `${row.Responsavel.Nome} ${row.Responsavel.Sobrenome}`,
        align: 'left',
        sortable: true
      },
      {
        name: 'telefoneComercial',
        label: t('pages.scheduleList.columns.telefone'),
        field: 'TelefoneComercial',
        align: 'left'
      },
      {
        name: 'emailComercial',
        label: t('pages.scheduleList.columns.email'),
        field: 'EmailComercial',
        align: 'left'
      },
      {
        name: 'tipoEmpresa',
        label: t('pages.scheduleList.columns.tipo'),
        field: 'TipoEmpresa',
        align: 'center'
      },
      {
        name: 'documentoEmpresa',
        label: t('pages.scheduleList.columns.documento'),
        field: 'DocumentoEmpresa',
        align: 'left'
      },
      {
        name: 'actions',
        label: t('pages.scheduleList.columns.actions'),
        field: 'actions',
        align: 'center'
      }
    ]

    // Schedules filtrados para exibição mobile
    const filteredSchedules = computed(() => {
      if (!filter.value) return schedules.value

      const searchTerm = filter.value.toLowerCase()
      return schedules.value.filter(schedule =>
        schedule.NomeEmpresa.toLowerCase().includes(searchTerm) ||
        schedule.Responsavel.Nome.toLowerCase().includes(searchTerm) ||
        schedule.Responsavel.Sobrenome.toLowerCase().includes(searchTerm) ||
        schedule.DocumentoEmpresa.toLowerCase().includes(searchTerm)
      )
    })

    // Métodos
    const confirmDelete = (schedule) => {
      selectedSchedule.value = schedule
      deleteDialog.value = true
    }

    const deleteSchedule = async () => {
      try {
        await scheduleRepository.delete(selectedSchedule.value.Id)

        $q.notify({
          type: 'positive',
          message: t('pages.scheduleList.messages.deleteSuccess')
        })

        // Recarrega a lista após exclusão
        await loadSchedules()
      } catch (error) {
        console.error('Erro ao excluir schedule:', error)
        $q.notify({
          type: 'negative',
          message: t('pages.scheduleList.messages.deleteError')
        })
      } finally {
        deleteDialog.value = false
        selectedSchedule.value = null
      }
    }

    // Carrega dados de teste
    const loadTestData = async () => {
      try {
        loading.value = true
        await scheduleRepository.loadTestData()
        await loadSchedules()
        $q.notify({
          type: 'positive',
          message: t('pages.scheduleList.messages.loadTestDataSuccess')
        })
      } catch (error) {
        console.error('Erro ao carregar dados de teste:', error)
        $q.notify({
          type: 'negative',
          message: t('pages.scheduleList.messages.loadTestDataError')
        })
      } finally {
        loading.value = false
      }
    }

    // Carrega as schedules quando o componente é montado
    onMounted(() => {
      loadSchedules()
    })

    return {
      filter,
      columns,
      schedules,
      filteredSchedules,
      deleteDialog,
      selectedSchedule,
      confirmDelete,
      deleteSchedule,
      loadTestData,
      loading,
      pagination
    }
  }
})
</script>]]>
