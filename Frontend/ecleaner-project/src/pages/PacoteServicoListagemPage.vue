<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho padrão -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-icon name="inventory" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ $t('pages.pacoteServico.title') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-end">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ $t('pages.pacoteServico.subtitle') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Campo de Busca e Controles -->
    <div class="row q-mb-lg items-center q-gutter-md">
      <div class="col-12 col-md-6">
        <q-input v-model="filtro" :placeholder="$t('pages.pacoteServico.searchPlaceholder')" filled clearable dense>
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <q-space />
      <div class="row items-center q-gutter-md">
        <q-toggle v-model="mostrarApenasFavoritos" :label="$t('pages.pacoteServico.mostrarFavoritos')" color="red"
          left-label />
        <q-chip v-if="mostrarApenasFavoritos" color="red" text-color="white" icon="favorite" class="q-ml-sm">
          {{ totalFavoritosFiltrados }} {{ $t('pages.pacoteServico.favoritos') }}
        </q-chip>
        <q-btn color="primary" icon="add" :label="$t('pages.pacoteServico.newButton')"
          @click="$router.push('/pacotes-servicos/novo')" />
      </div>
    </div>

    <!-- Listagem responsiva -->
    <div class="gt-sm">
      <q-table :rows="pacotesFiltrados" :columns="columns" row-key="Id" :loading="loading"
        :no-data-label="$t('pages.pacoteServico.noData')">
        <template v-slot:body-cell-Acoes="props">
          <q-td :props="props">
            <q-btn flat round :color="props.row.Favorito ? 'red' : 'grey'"
              :icon="props.row.Favorito ? 'favorite' : 'favorite_border'" @click="toggleFavorito(props.row)" />
            <q-btn flat round color="primary" icon="edit" @click="editarPacote(props.row)" />
            <q-btn flat round color="negative" icon="delete" @click="excluirPacote(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>

    <div class="lt-md">
      <div class="row q-col-gutter-md">
        <div v-for="pacote in pacotesFiltrados" :key="pacote.Id" class="col-12">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6">{{ pacote.Descricao }}</div>
              <div class="text-subtitle2 text-grey-7 q-mt-xs">
                {{ $t('pages.pacoteServico.margem') }}: {{ pacote.MargemLucro }}%
              </div>
              <div class="row q-mt-sm">
                <div class="col-6">
                  <div class="text-caption text-grey-6">{{ $t('pages.pacoteServico.valorCusto') }}</div>
                  <div class="text-subtitle2">{{ pacote.ValorTotalFormatado }}</div>
                </div>
                <div class="col-6">
                  <div class="text-caption text-grey-6">{{ $t('pages.pacoteServico.valorVenda') }}</div>
                  <div class="text-subtitle2 text-positive">{{ pacote.ValorVendaFormatado }}</div>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat round :color="pacote.Favorito ? 'red' : 'grey'"
                :icon="pacote.Favorito ? 'favorite' : 'favorite_border'" @click="toggleFavorito(pacote)" />
              <q-btn flat color="primary" :label="$t('pages.pacoteServico.editar')" @click="editarPacote(pacote)" />
              <q-btn flat color="negative" :label="$t('pages.pacoteServico.excluir')" @click="excluirPacote(pacote)" />
            </q-card-actions>
          </q-card>
        </div>
        <div v-if="pacotesFiltrados.length === 0" class="col-12">
          <q-card flat bordered class="text-center q-pa-xl">
            <q-icon name="inventory" size="4rem" color="grey-5" />
            <div class="text-h6 q-mt-md text-grey-6">
              {{ $t('pages.pacoteServico.noData') }}
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, computed, ref } from 'vue'
import { usePacoteServicoStore } from 'stores/pacote-servico-store'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { formatCurrency, getCurrencyConfig } from 'src/core/domain/utils/currencyUtils'

export default defineComponent({
  name: 'PacoteServicoListagemPage',
  setup() {
    const store = usePacoteServicoStore()
    const router = useRouter()
    const { locale, t } = useI18n()

    const mostrarApenasFavoritos = ref(false)
    const filtro = ref('')
    const currencyConfig = computed(() => getCurrencyConfig(locale.value))

    const columns = [
      { name: 'Descricao', label: 'Descrição', field: 'Descricao', align: 'left' },
      { name: 'MargemLucro', label: 'Margem (%)', field: 'MargemLucro', align: 'center' },
      { name: 'ValorTotal', label: 'Valor Custo', field: 'ValorTotalFormatado', align: 'right' },
      { name: 'ValorVenda', label: 'Valor Venda', field: 'ValorVendaFormatado', align: 'right' },
      { name: 'Acoes', label: 'Ações', field: 'Acoes', align: 'center', sortable: false }
    ]

    const pacotesFormatados = computed(() => {
      let pacotesFiltrados = store.pacotes

      if (mostrarApenasFavoritos.value) {
        pacotesFiltrados = store.pacotes.filter(pacote => pacote.Favorito)
      }

      return pacotesFiltrados.map(pacote => ({
        ...pacote,
        ValorTotalFormatado: formatCurrency(pacote.ValorTotal, locale.value, currencyConfig.value.currency),
        ValorVendaFormatado: formatCurrency(pacote.ValorVenda, locale.value, currencyConfig.value.currency)
      }))
    })

    // Computed para filtrar pacotes com busca
    const pacotesFiltrados = computed(() => {
      let pacotes = pacotesFormatados.value

      if (filtro.value) {
        const filtroLowerCase = filtro.value.toLowerCase()
        pacotes = pacotes.filter(pacote =>
          pacote.Descricao.toLowerCase().includes(filtroLowerCase)
        )
      }

      return pacotes
    })

    const totalFavoritosFiltrados = computed(() => {
      return store.pacotes.filter(pacote => pacote.Favorito).length
    })

    const loading = computed(() => store.loading)

    onMounted(async () => {
      console.log('🔍 Debug - Carregando pacotes...')

      // Debug: verificar localStorage diretamente
      const localStorageData = localStorage.getItem('ecleaner_pacotes_servicos')
      console.log('LocalStorage data:', localStorageData)

      await store.fetchPacotes()
      console.log('Store pacotes:', store.pacotes.length, 'pacotes carregados')
    })

    function editarPacote(pacote) {
      router.push(`/pacotes-servicos/${pacote.Id}`)
    }

    function excluirPacote(pacote) {
      if (confirm(t('pages.pacoteServico.confirmarExclusao', { descricao: pacote.Descricao }))) {
        store.deletePacote(pacote.Id)
      }
    }

    function toggleFavorito(pacote) {
      store.toggleFavorito(pacote.Id)
    }

    return {
      // Estado
      filtro,
      mostrarApenasFavoritos,

      // Computed
      pacotesFiltrados,
      columns,
      loading,
      totalFavoritosFiltrados,

      // Métodos
      editarPacote,
      excluirPacote,
      toggleFavorito
    }
  }
})
</script>

<style lang="sass">
// Estilos específicos se necessário
</style>
