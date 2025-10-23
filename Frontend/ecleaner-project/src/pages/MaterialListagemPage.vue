<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho da Página -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-icon name="category" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ $t('pages.material.title') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-end">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ $t('pages.material.subtitle') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Campo de Busca e Botão Novo Material -->
    <div class="row q-mb-lg items-center q-gutter-md">
      <div class="col-12 col-md-6">
        <q-input v-model="filtro" :placeholder="$t('pages.material.searchPlaceholder')" filled clearable dense>
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <q-space />
      <q-btn color="primary" icon="add" :label="$t('pages.material.newButton')" @click="irParaNovoMaterial" />
    </div>

    <!-- Versão Desktop -->
    <div class="gt-sm">
      <q-table :rows="materiaisFiltrados" :columns="columns" row-key="Id" flat bordered :loading="loading"
        :no-data-label="$t('pages.material.noData')">
        <template v-slot:body-cell-PrecoUnitario="props">
          <q-td :props="props">
            {{ formatarMoeda(props.row.PrecoUnitario) }}
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat round icon="edit" color="primary" size="sm" @click="editarMaterial(props.row)"
              :title="$t('pages.material.editButton')" />
            <q-btn flat round icon="delete" color="negative" size="sm" @click="excluirMaterial(props.row.Id)"
              :title="$t('pages.material.deleteButton')" />
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- Versão Mobile -->
    <div class="lt-md">
      <div class="row q-col-gutter-md">
        <div v-for="material in materiaisFiltrados" :key="material.Id" class="col-12">
          <q-card flat bordered>
            <q-card-section>
              <div class="row items-center">
                <div class="col">
                  <div class="text-h6">{{ material.Descricao }}</div>
                  <div class="text-caption text-grey-6">
                    {{ material.Unidade }} • {{ formatarMoeda(material.PrecoUnitario) }}
                  </div>
                </div>
                <div class="col-auto">
                  <q-btn flat round icon="edit" color="primary" size="sm" @click="editarMaterial(material)" />
                  <q-btn flat round icon="delete" color="negative" size="sm" @click="excluirMaterial(material.Id)" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div v-if="materiaisFiltrados.length === 0" class="col-12">
          <q-card flat bordered class="text-center q-pa-xl">
            <q-icon name="category" size="4rem" color="grey-5" />
            <div class="text-h6 q-mt-md text-grey-6">
              {{ $t('pages.material.noData') }}
            </div>
          </q-card>
        </div>
      </div>
    </div>

    <!-- ...modal removido, agora navegação por rota... -->
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useMaterialStore } from '@/stores/material-store.js'


export default defineComponent({
  name: 'MaterialListagemPage',



  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const store = useMaterialStore()

    // Estado do filtro
    const filtro = ref('')



    // Configuração da tabela
    const columns = computed(() => [
      {
        name: 'Descricao',
        label: t('pages.material.fields.descricao'),
        field: 'Descricao',
        align: 'left',
        sortable: true
      },
      {
        name: 'Unidade',
        label: t('pages.material.fields.unidade'),
        field: 'Unidade',
        align: 'center',
        sortable: true
      },
      {
        name: 'PrecoUnitario',
        label: t('pages.material.fields.precoUnitario'),
        field: 'PrecoUnitario',
        align: 'right',
        sortable: true,
        format: (val) => formatarMoeda(val)
      },
      {
        name: 'actions',
        label: '',
        field: 'actions',
        align: 'right'
      },
    ])

    // Computed properties
    const materiaisSorted = computed(() => store.MateriaisOrdenados)
    const loading = computed(() => store.IsLoading)

    // Computed para filtrar materiais
    const materiaisFiltrados = computed(() => {
      if (!filtro.value) {
        return materiaisSorted.value
      }

      const filtroLowerCase = filtro.value.toLowerCase()
      return materiaisSorted.value.filter(material =>
        material.Descricao.toLowerCase().includes(filtroLowerCase) ||
        material.Unidade.toLowerCase().includes(filtroLowerCase)
      )
    })

    // Métodos
    function formatarMoeda(valor) {
      // Debug: verificar o valor recebido
      console.log('formatarMoeda recebeu:', valor, typeof valor)

      // Conversão mais robusta
      let numeroValido = 0

      if (typeof valor === 'number' && !isNaN(valor)) {
        numeroValido = valor
      } else if (typeof valor === 'string') {
        const parsed = parseFloat(valor)
        numeroValido = isNaN(parsed) ? 0 : parsed
      }

      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(numeroValido)
    }


    // Navegação para novo material
    function irParaNovoMaterial() {
      router.push('/materiais/novo')
    }

    // Navegação para editar material
    function editarMaterial(material) {
      router.push(`/materiais/${material.Id}/editar`)
    }

    async function excluirMaterial(id) {
      try {
        await store.deleteMaterial(id)
      } catch (error) {
        console.error('Erro ao excluir material:', error)
      }
    }

    async function salvarMaterial(material) {
      try {
        if (material.Id) {
          await store.updateMaterial(material)
        } else {
          await store.addMaterial(material)
        }
      } catch (error) {
        console.error('Erro ao salvar material:', error)
      }
    }

    // Carrega os materiais ao montar o componente
    onMounted(async () => {
      try {
        await store.loadMateriais()

        // Debug: verificar dados carregados
        console.log('Materiais carregados:', store.Materiais)
        console.log('Materiais ordenados:', store.MateriaisOrdenados)

        // Se não houver materiais, executar o seed
        if (store.Materiais.length === 0) {
          console.log('Nenhum material encontrado, executando seed...')
          // Importar e executar o seed
          const { seedMateriais } = await import('@/core/infrastructure/repositories/seeds/materialSeed')
          await seedMateriais()
          await store.loadMateriais() // Recarregar após o seed
          console.log('Seed executado, materiais após seed:', store.Materiais)
        }
      } catch (error) {
        console.error('Erro ao carregar materiais:', error)
      }
    })

    return {
      // Estado
      filtro,

      // Computed
      columns,
      materiaisSorted,
      materiaisFiltrados,
      loading,

      // Métodos
      formatarMoeda,
      irParaNovoMaterial,
      editarMaterial,
      excluirMaterial,
      salvarMaterial
    }
  }
})
</script>
