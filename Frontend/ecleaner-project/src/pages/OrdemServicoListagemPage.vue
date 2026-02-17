<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-icon name="assignment_turned_in" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ $t('forms.ordemServico.title') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-end">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ $t('forms.ordemServico.subtitle') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Estatísticas -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-3">
        <q-card flat bordered>
          <q-card-section class="text-center">
            <q-icon name="assignment" size="2rem" class="text-primary" />
            <div class="text-h6 q-mt-sm">{{ totalOrdens }}</div>
            <div class="text-caption text-grey-6">{{ $t('forms.ordemServico.stats.total') }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-3">
        <q-card flat bordered>
          <q-card-section class="text-center">
            <q-icon name="pending_actions" size="2rem" class="text-blue" />
            <div class="text-h6 q-mt-sm">{{ ordensAbertas.length }}</div>
            <div class="text-caption text-grey-6">{{ $t('forms.ordemServico.stats.abertas') }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-3">
        <q-card flat bordered>
          <q-card-section class="text-center">
            <q-icon name="sync" size="2rem" class="text-orange" />
            <div class="text-h6 q-mt-sm">{{ ordensEmAndamento.length }}</div>
            <div class="text-caption text-grey-6">{{ $t('forms.ordemServico.stats.emAndamento') }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-3">
        <q-card flat bordered>
          <q-card-section class="text-center">
            <q-icon name="check_circle" size="2rem" class="text-green" />
            <div class="text-h6 q-mt-sm">{{ ordensConcluidas.length }}</div>
            <div class="text-caption text-grey-6">{{ $t('forms.ordemServico.stats.concluidas') }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Campo de Busca -->
    <div class="row q-mb-lg items-center q-gutter-md">
      <div class="col-12 col-md-6">
        <q-input v-model="filtro" :placeholder="$t('forms.ordemServico.searchPlaceholder')" filled clearable dense>
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <!-- Tabela Desktop -->
    <div class="gt-sm">
      <q-table :rows="ordensFiltradas" :columns="columns" row-key="Id" flat bordered :loading="loading"
        :no-data-label="$t('forms.ordemServico.noData')">
        <template v-slot:body-cell-NumeroOS="props">
          <q-td :props="props">
            <q-chip color="primary" text-color="white" size="sm">
              {{ props.value }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-Cliente="props">
          <q-td :props="props">
            <div class="text-weight-medium">{{ props.value.Nome }} {{ props.value.Sobrenome }}</div>
            <div class="text-caption text-grey-6">{{ props.value.Email }}</div>
          </q-td>
        </template>

        <template v-slot:body-cell-Status="props">
          <q-td :props="props">
            <q-badge :color="getStatusColor(props.value)" :label="$t(`enums.statusOrdemServico.${props.value}`)" />
          </q-td>
        </template>

        <template v-slot:body-cell-DataCriacao="props">
          <q-td :props="props">
            {{ formatarData(props.value) }}
          </q-td>
        </template>

        <template v-slot:body-cell-ValorTotal="props">
          <q-td :props="props">
            <div class="text-weight-medium">{{ formatarMoeda(props.value) }}</div>
          </q-td>
        </template>

        <template v-slot:body-cell-Acoes="props">
          <q-td :props="props">
            <q-btn flat round color="primary" icon="visibility" size="sm"
              @click="$router.push(`/ordens-servico/${props.row.Id}`)" :tooltip="$t('forms.ordemServico.viewButton')" />
            <q-btn flat round color="primary" icon="edit" size="sm"
              @click="$router.push({ path: `/ordens-servico/${props.row.Id}`, query: { edit: 'true' } })"
              :tooltip="$t('forms.ordemServico.editButton')"
              v-if="props.row.Status !== 'CONCLUIDA' && props.row.Status !== 'CANCELADA'" />
            <q-btn flat round color="negative" icon="delete" size="sm" @click="confirmarExclusao(props.row)"
              :tooltip="$t('forms.ordemServico.deleteButton')" />
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- Cards Mobile -->
    <div class="lt-md">
      <q-card v-for="ordem in ordensFiltradas" :key="ordem.Id" flat bordered class="q-mb-md">
        <q-card-section>
          <div class="row items-center q-mb-sm">
            <q-chip color="primary" text-color="white" size="sm">
              {{ ordem.NumeroOS }}
            </q-chip>
            <q-space />
            <q-badge :color="getStatusColor(ordem.Status)" :label="$t(`enums.statusOrdemServico.${ordem.Status}`)" />
          </div>

          <div class="text-body1 text-weight-medium q-mb-xs">
            {{ ordem.Cliente.Nome }} {{ ordem.Cliente.Sobrenome }}
          </div>
          <div class="text-caption text-grey-6 q-mb-sm">
            {{ ordem.Cliente.Email }}
          </div>

          <div class="row q-mb-sm">
            <div class="col-6">
              <div class="text-caption text-grey-6">Data</div>
              <div class="text-body2">{{ formatarData(ordem.DataCriacao) }}</div>
            </div>
            <div class="col-6 text-right">
              <div class="text-caption text-grey-6">Valor</div>
              <div class="text-body2 text-weight-bold">{{ formatarMoeda(calcularTotal(ordem)) }}</div>
            </div>
          </div>

          <div class="row q-gutter-sm justify-end">
            <q-btn flat color="primary" icon="visibility" :label="$t('forms.ordemServico.viewButton')"
              @click="$router.push(`/ordens-servico/${ordem.Id}`)" size="sm" />
            <q-btn flat color="primary" icon="edit" :label="$t('forms.ordemServico.editButton')"
              @click="$router.push({ path: `/ordens-servico/${ordem.Id}`, query: { edit: 'true' } })" size="sm"
              v-if="ordem.Status !== 'CONCLUIDA' && ordem.Status !== 'CANCELADA'" />
            <q-btn flat color="negative" icon="delete" :label="$t('forms.ordemServico.deleteButton')"
              @click="confirmarExclusao(ordem)" size="sm" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { useOrdemServicoStore } from '@/stores/ordem-servico-store'
import { formatDateForLocale } from '@/core/utils/dateValidation'

export default defineComponent({
  name: 'OrdemServicoListagemPage',

  setup() {
    const { t, locale } = useI18n()
    const $q = useQuasar()
    const store = useOrdemServicoStore()

    const filtro = ref('')
    const loading = ref(false)

    const columns = computed(() => [
      {
        name: 'NumeroOS',
        required: true,
        label: t('forms.ordemServico.fields.numeroOS'),
        align: 'left',
        field: 'NumeroOS',
        sortable: true
      },
      {
        name: 'Cliente',
        label: t('forms.ordemServico.fields.cliente'),
        align: 'left',
        field: 'Cliente',
        sortable: true
      },
      {
        name: 'DataCriacao',
        label: t('forms.ordemServico.fields.dataCriacao'),
        align: 'left',
        field: 'DataCriacao',
        sortable: true
      },
      {
        name: 'Status',
        label: t('forms.ordemServico.fields.status'),
        align: 'center',
        field: 'Status',
        sortable: true
      },
      {
        name: 'ValorTotal',
        label: t('forms.ordemServico.fields.valorTotal'),
        align: 'right',
        field: row => calcularTotal(row),
        sortable: true
      },
      {
        name: 'Acoes',
        label: 'Ações',
        align: 'center'
      }
    ])

    const ordensFiltradas = computed(() => {
      if (!filtro.value) {
        return store.ordensServico
      }
      const filtroLower = filtro.value.toLowerCase()
      return store.ordensServico.filter(ordem => {
        const clienteNome = `${ordem.Cliente.Nome} ${ordem.Cliente.Sobrenome}`.toLowerCase()
        const numeroOS = ordem.NumeroOS.toString().toLowerCase()
        return clienteNome.includes(filtroLower) || numeroOS.includes(filtroLower)
      })
    })

    const totalOrdens = computed(() => store.ordensServico.length)
    const ordensAbertas = computed(() => store.ordensAbertas)
    const ordensEmAndamento = computed(() => store.ordensEmAndamento)
    const ordensConcluidas = computed(() => store.ordensConcluidas)

    function getStatusColor(status) {
      const colors = {
        ABERTA: 'blue',
        EM_ANDAMENTO: 'orange',
        CONCLUIDA: 'green',
        CANCELADA: 'red'
      }
      return colors[status] || 'grey'
    }

    function formatarData(data) {
      if (!data) return '-'
      return formatDateForLocale(data, locale.value)
    }

    function formatarMoeda(valor) {
      return new Intl.NumberFormat(locale.value, {
        style: 'currency',
        currency: 'BRL'
      }).format(valor)
    }

    function calcularTotal(ordem) {
      // Calcular subtotal dos itens
      let subtotal = 0
      if (ordem.Itens && Array.isArray(ordem.Itens)) {
        subtotal = ordem.Itens.reduce((total, item) => {
          const valorItem = (item.Custo || 0) * (item.Quantidade || 1)
          return total + valorItem
        }, 0)
      }
      // Total = subtotal - descontos + impostos/taxas
      const descontos = ordem.Descontos || 0
      const impostosTaxas = ordem.ImpostosTaxas || 0
      return subtotal - descontos + impostosTaxas
    }

    function confirmarExclusao(ordem) {
      $q.dialog({
        title: t('forms.ordemServico.confirmDelete.title'),
        message: t('forms.ordemServico.confirmDelete.message'),
        cancel: {
          label: t('buttons.cancel'),
          flat: true
        },
        ok: {
          label: t('buttons.confirm'),
          color: 'negative'
        },
        persistent: true
      }).onOk(async () => {
        try {
          await store.deleteOrdemServico(ordem.Id)
          $q.notify({
            type: 'positive',
            message: t('forms.ordemServico.messages.deleteSuccess'),
            timeout: 3000,
            position: 'top-right'
          })
        } catch (err) {
          console.error('Erro ao excluir ordem:', err)
          $q.notify({
            type: 'negative',
            message: t('forms.ordemServico.messages.deleteError'),
            timeout: 3000,
            position: 'top-right'
          })
        }
      })
    }

    onMounted(async () => {
      loading.value = true
      try {
        await store.loadOrdensServico()
      } catch (error) {
        console.error('Erro ao carregar ordens de serviço:', error)
        $q.notify({
          type: 'negative',
          message: t('forms.ordemServico.messages.loadError'),
          timeout: 3000,
          position: 'top-right'
        })
      } finally {
        loading.value = false
      }
    })

    return {
      filtro,
      loading,
      columns,
      ordensFiltradas,
      totalOrdens,
      ordensAbertas,
      ordensEmAndamento,
      ordensConcluidas,
      getStatusColor,
      formatarData,
      formatarMoeda,
      calcularTotal,
      confirmarExclusao
    }
  }
})
</script>

<style lang="sass" scoped>
.accent-divider
  height: 2px
  background: $accent
  width: 100%
</style>
