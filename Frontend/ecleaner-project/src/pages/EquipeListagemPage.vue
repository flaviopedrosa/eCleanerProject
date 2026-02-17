<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho da Página -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-icon name="groups" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ $t('pages.equipeList.title') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-between items-center">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ $t('pages.equipeList.subtitle') }}
          </p>
          <div class="row q-gutter-sm">
            <q-btn :label="$t('pages.equipeList.buttons.newEquipe')" color="primary" icon="add" to="/equipes/novo" />
            <q-btn :label="$t('pages.equipeList.buttons.newColaborador')" color="accent" icon="person_add"
              to="/colaboradores/novo" />
            <q-btn :label="$t('pages.equipeList.buttons.loadTestData')" color="secondary" icon="storage"
              @click="loadTestData" />
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop: Tabela -->
    <div class="gt-sm">
      <q-table :rows="equipes" :columns="columns" :rows-per-page-options="[10, 20, 50]" :filter="filter" row-key="Id"
        :loading="loading" flat bordered :pagination="pagination" @update:pagination="pagination = $event">
        <!-- Barra de Busca -->
        <template v-slot:top>
          <div class="row full-width">
            <div class="col-12 col-md-4">
              <q-input v-model="filter" :placeholder="$t('pages.equipeList.filters.search')" dense outlined clearable>
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
        </template>

        <!-- Coluna Membros -->
        <template v-slot:body-cell-membros="props">
          <q-td :props="props">
            <div class="row items-center">
              <q-avatar v-for="membro in props.row.Colaboradores" :key="membro.Colaborador.Id" size="28px"
                color="primary" text-color="white" class="q-mr-xs">
                {{ membro.Colaborador.Nome[0] }}{{ membro.Colaborador.Sobrenome[0] }}
              </q-avatar>
            </div>
          </q-td>
        </template>

        <!-- Coluna Líder -->
        <template v-slot:body-cell-lider="props">
          <q-td :props="props">
            {{ getLider(props.row)?.Colaborador.Nome }} {{ getLider(props.row)?.Colaborador.Sobrenome }}
          </q-td>
        </template>

        <!-- Coluna Cor -->
        <template v-slot:body-cell-cor="props">
          <q-td :props="props">
            <div v-if="props.row.Cor"
              style="width: 40px; height: 40px; border-radius: 4px; border: 1px solid #ccc; margin: 0 auto;"
              :style="{ backgroundColor: props.row.Cor }">
            </div>
            <span v-else class="text-grey-6">-</span>
          </q-td>
        </template>

        <!-- Coluna Ações -->
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat round dense color="primary" icon="edit" :to="'/equipes/' + props.row.Id"
              :title="$t('pages.equipeList.buttons.edit')" />
            <q-btn flat round dense color="negative" icon="delete" @click="confirmDelete(props.row)"
              :title="$t('pages.equipeList.buttons.delete')" />
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- Mobile: Lista de Cards -->
    <div class="lt-md">
      <q-input v-model="filter" :placeholder="$t('pages.equipeList.filters.search')" dense outlined clearable
        :loading="loading" class="q-mb-md">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <div class="row q-col-gutter-md">
        <div v-for="equipe in filteredEquipes" :key="equipe.Id" class="col-12">
          <q-card>
            <q-card-section>
              <div class="row items-center">
                <div class="col">
                  <div class="text-h6">{{ equipe.Descricao }}</div>
                  <div class="text-subtitle2">Líder: {{ getLider(equipe)?.Colaborador.Nome }} {{
                    getLider(equipe)?.Colaborador.Sobrenome }}</div>

                  <div class="q-mt-sm">
                    <q-avatar v-for="membro in equipe.Colaboradores" :key="membro.Colaborador.Id" size="32px"
                      color="primary" text-color="white" class="q-mr-sm">
                      {{ membro.Colaborador.Nome[0] }}{{ membro.Colaborador.Sobrenome[0] }}
                    </q-avatar>
                  </div>
                </div>

                <div class="col-auto">
                  <div class="row q-gutter-sm">
                    <q-btn flat round color="primary" icon="edit" :to="'/equipes/' + equipe.Id"
                      :title="$t('pages.equipeList.buttons.edit')" />
                    <q-btn flat round color="negative" icon="delete" @click="confirmDelete(equipe)"
                      :title="$t('pages.equipeList.buttons.delete')" />
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
          <span class="q-ml-sm">{{ $t('pages.equipeList.dialogs.delete.message', {
            descricao:
              selectedEquipe?.Descricao
          }) }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('pages.equipeList.buttons.cancel')" color="primary" v-close-popup />
          <q-btn flat :label="$t('pages.equipeList.buttons.confirm')" color="negative" @click="deleteEquipe"
            v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { EquipeRepository } from '@/core/infrastructure/repositories/equipeRepository'
import { FuncaoColaborador } from '@/core/domain/enums/funcaoColaborador'

export default defineComponent({
  name: 'EquipeListagemPage',

  setup() {
    const { t } = useI18n()
    const $q = useQuasar()

    // Repositório
    const equipeRepository = new EquipeRepository()

    // Estado
    const loading = ref(false)
    const filter = ref('')
    const equipes = ref([])
    const deleteDialog = ref(false)
    const selectedEquipe = ref(null)
    const pagination = ref({
      sortBy: 'Descricao',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    })

    // Configuração das colunas da tabela
    const columns = [
      {
        name: 'descricao',
        label: t('pages.equipeList.columns.descricao'),
        field: 'Descricao',
        align: 'left',
        sortable: true
      },
      {
        name: 'membros',
        label: t('pages.equipeList.columns.membros'),
        field: 'Colaboradores',
        align: 'left'
      },
      {
        name: 'lider',
        label: t('pages.equipeList.columns.lider'),
        field: row => getLider(row)?.Colaborador.Nome,
        align: 'left',
        sortable: true
      },
      {
        name: 'cor',
        label: t('pages.equipeList.columns.cor'),
        field: 'Cor',
        align: 'center'
      },
      {
        name: 'actions',
        label: t('pages.equipeList.columns.actions'),
        field: 'actions',
        align: 'center'
      }
    ]

    // Carrega a lista de equipes
    const loadEquipes = async () => {
      try {
        loading.value = true
        equipes.value = await equipeRepository.getAll()
        pagination.value.rowsNumber = equipes.value.length
      } catch (error) {
        console.error('Erro ao carregar equipes:', error)
        $q.notify({
          type: 'negative',
          message: t('pages.equipeList.messages.loadError')
        })
      } finally {
        loading.value = false
      }
    }

    // Carrega dados de teste
    const loadTestData = async () => {
      try {
        loading.value = true
        await equipeRepository.loadTestData()
        await loadEquipes()
        $q.notify({
          type: 'positive',
          message: t('pages.equipeList.messages.loadTestDataSuccess')
        })
      } catch (error) {
        console.error('Erro ao carregar dados de teste:', error)
        $q.notify({
          type: 'negative',
          message: t('pages.equipeList.messages.loadTestDataError')
        })
      } finally {
        loading.value = false
      }
    }

    // Retorna o líder da equipe
    const getLider = (equipe) => {
      return equipe.Colaboradores.find(c => c.Funcao === FuncaoColaborador.LIDER)
    }

    // Equipes filtradas para exibição mobile
    const filteredEquipes = computed(() => {
      if (!filter.value) return equipes.value

      const searchTerm = filter.value.toLowerCase()
      return equipes.value.filter(equipe =>
        equipe.Descricao.toLowerCase().includes(searchTerm) ||
        equipe.Colaboradores.some(c =>
          c.Colaborador.Nome.toLowerCase().includes(searchTerm) ||
          c.Colaborador.Sobrenome.toLowerCase().includes(searchTerm)
        )
      )
    })

    // Métodos
    const confirmDelete = (equipe) => {
      selectedEquipe.value = equipe
      deleteDialog.value = true
    }

    const deleteEquipe = async () => {
      try {
        await equipeRepository.delete(selectedEquipe.value.Id)

        $q.notify({
          type: 'positive',
          message: t('pages.equipeList.messages.deleteSuccess')
        })

        // Recarrega a lista após exclusão
        await loadEquipes()
      } catch (error) {
        console.error('Erro ao excluir equipe:', error)
        $q.notify({
          type: 'negative',
          message: t('pages.equipeList.messages.deleteError')
        })
      } finally {
        deleteDialog.value = false
        selectedEquipe.value = null
      }
    }

    // Carrega as equipes quando o componente é montado
    onMounted(() => {
      loadEquipes()
    })

    return {
      filter,
      columns,
      equipes,
      filteredEquipes,
      deleteDialog,
      selectedEquipe,
      confirmDelete,
      deleteEquipe,
      loadTestData,
      loading,
      pagination,
      getLider
    }
  }
})
</script>
