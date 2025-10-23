<template>
    <q-page class="q-pa-lg">
        <!-- Cabeçalho da Página -->
        <div class="row items-center q-mb-xl">
            <div class="col">
                <div class="row items-center q-mb-sm">
                    <q-icon name="receipt_long" size="2rem" class="text-secondary q-mr-md" />
                    <h4 class="text-h5 q-ma-none text-secondary">
                        {{ $t('forms.orcamento.title') }}
                    </h4>
                </div>
                <div class="accent-divider q-mb-md"></div>
                <div class="row justify-end">
                    <p class="text-subtitle1 text-grey-7 q-ma-none">
                        {{ $t('forms.orcamento.subtitle') }}
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
                        <div class="text-h6 q-mt-sm">{{ totalOrcamentos }}</div>
                        <div class="text-caption text-grey-6">{{ $t('forms.orcamento.stats.total') }}</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 col-md-3">
                <q-card flat bordered>
                    <q-card-section class="text-center">
                        <q-icon name="schedule" size="2rem" class="text-orange" />
                        <div class="text-h6 q-mt-sm">{{ estatisticasPorStatus.PENDENTE || 0 }}</div>
                        <div class="text-caption text-grey-6">{{ $t('forms.orcamento.stats.pending') }}</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 col-md-3">
                <q-card flat bordered>
                    <q-card-section class="text-center">
                        <q-icon name="check_circle" size="2rem" class="text-green" />
                        <div class="text-h6 q-mt-sm">{{ estatisticasPorStatus.APROVADO || 0 }}</div>
                        <div class="text-caption text-grey-6">{{ $t('forms.orcamento.stats.approved') }}</div>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 col-md-3">
                <q-card flat bordered>
                    <q-card-section class="text-center">
                        <q-icon name="attach_money" size="2rem" class="text-positive" />
                        <div class="text-h6 q-mt-sm">{{ formatarMoeda(valorTotalOrcamentos) }}</div>
                        <div class="text-caption text-grey-6">{{ $t('forms.orcamento.stats.totalValue') }}</div>
                    </q-card-section>
                </q-card>
            </div>
        </div>

        <!-- Campo de Busca e Botão Novo Orçamento -->
        <div class="row q-mb-lg items-center q-gutter-md">
            <div class="col-12 col-md-6">
                <q-input v-model="filtro" :placeholder="$t('forms.orcamento.searchPlaceholder')" filled clearable dense>
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>
            <q-space />
            <q-btn color="primary" icon="add" :label="$t('forms.orcamento.newButton')"
                @click="$router.push('/orcamentos/novo')" />
        </div>

        <!-- Versão Desktop -->
        <div class="gt-sm">
            <q-table :rows="orcamentosFiltrados" :columns="columns" row-key="Id" flat bordered :loading="loading"
                :no-data-label="$t('forms.orcamento.noData')">
                <template v-slot:body-cell-NumeroOrcamento="props">
                    <q-td :props="props">
                        <q-chip color="primary" text-color="white" size="sm">
                            #{{ props.value }}
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
                        <q-badge :color="getStatusColor(props.value)"
                            :label="$t(`enums.statusOrcamento.${props.value}`)" />
                    </q-td>
                </template>

                <template v-slot:body-cell-ValorTotal="props">
                    <q-td :props="props">
                        <div class="text-weight-bold">{{ formatarMoeda(props.value) }}</div>
                    </q-td>
                </template>

                <template v-slot:body-cell-Validade="props">
                    <q-td :props="props">
                        <div :class="isExpirado(props.value) ? 'text-negative' : ''">
                            {{ formatarData(props.value) }}
                        </div>
                        <q-icon v-if="isExpirado(props.value)" name="warning" color="negative" size="sm"
                            class="q-ml-xs" />
                    </q-td>
                </template>

                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <q-btn flat round icon="visibility" color="primary" size="sm"
                            @click="visualizarOrcamento(props.row)" :title="$t('forms.orcamento.viewButton')" />
                        <q-btn flat round icon="edit" color="primary" size="sm" @click="editarOrcamento(props.row)"
                            :title="$t('forms.orcamento.editButton')" />
                        <q-btn flat round icon="delete" color="negative" size="sm"
                            @click="excluirOrcamento(props.row.Id)" :title="$t('forms.orcamento.deleteButton')" />
                    </q-td>
                </template>
            </q-table>
        </div>

        <!-- Versão Mobile -->
        <div class="lt-md">
            <div class="row q-col-gutter-md">
                <div v-for="orcamento in orcamentosFiltrados" :key="orcamento.Id" class="col-12">
                    <q-card flat bordered>
                        <q-card-section>
                            <div class="row items-center q-mb-sm">
                                <q-chip color="primary" text-color="white" size="sm">
                                    #{{ orcamento.NumeroOrcamento }}
                                </q-chip>
                                <q-space />
                                <q-badge :color="getStatusColor(orcamento.Status)"
                                    :label="$t(`enums.statusOrcamento.${orcamento.Status}`)" />
                            </div>

                            <div class="text-h6 q-mb-sm">
                                {{ orcamento.Cliente.Nome }} {{ orcamento.Cliente.Sobrenome }}
                            </div>

                            <div class="text-caption text-grey-6 q-mb-sm">
                                {{ orcamento.Cliente.Email }}
                            </div>

                            <div class="row items-center q-mb-sm">
                                <div class="col">
                                    <div class="text-weight-bold">{{ formatarMoeda(orcamento.ValorTotal) }}</div>
                                </div>
                                <div class="col-auto">
                                    <div :class="isExpirado(orcamento.Validade) ? 'text-negative' : 'text-grey-6'">
                                        {{ formatarData(orcamento.Validade) }}
                                        <q-icon v-if="isExpirado(orcamento.Validade)" name="warning" color="negative"
                                            size="sm" class="q-ml-xs" />
                                    </div>
                                </div>
                            </div>

                            <div class="row q-gutter-sm">
                                <q-btn flat dense icon="visibility" color="primary" size="sm"
                                    @click="visualizarOrcamento(orcamento)" />
                                <q-btn flat dense icon="edit" color="primary" size="sm"
                                    @click="editarOrcamento(orcamento)" />
                                <q-btn flat dense icon="delete" color="negative" size="sm"
                                    @click="excluirOrcamento(orcamento.Id)" />
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
                <div v-if="orcamentosFiltrados.length === 0" class="col-12">
                    <q-card flat bordered class="text-center q-pa-xl">
                        <q-icon name="receipt_long" size="4rem" color="grey-5" />
                        <div class="text-h6 q-mt-md text-grey-6">
                            {{ $t('forms.orcamento.noData') }}
                        </div>
                    </q-card>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { useOrcamentoStore } from '@/stores/orcamento-store.js'
import { StatusOrcamento } from '@/core/domain/enums/statusOrcamento'

export default defineComponent({
    name: 'OrcamentoListagemPage',

    setup() {
        const router = useRouter()
        const { t } = useI18n()
        const $q = useQuasar()
        const store = useOrcamentoStore()

        // Estado do filtro
        const filtro = ref('')

        // Configuração da tabela
        const columns = computed(() => [
            {
                name: 'NumeroOrcamento',
                label: t('forms.orcamento.fields.numero'),
                field: 'NumeroOrcamento',
                align: 'center',
                sortable: true
            },
            {
                name: 'Cliente',
                label: t('forms.orcamento.fields.cliente'),
                field: 'Cliente',
                align: 'left',
                sortable: true,
                sort: (a, b) => `${a.Nome} ${a.Sobrenome}`.localeCompare(`${b.Nome} ${b.Sobrenome}`)
            },
            {
                name: 'DataEmissao',
                label: t('forms.orcamento.fields.dataEmissao'),
                field: 'DataEmissao',
                align: 'center',
                sortable: true,
                format: (val) => formatarData(val)
            },
            {
                name: 'Status',
                label: t('forms.orcamento.fields.status'),
                field: 'Status',
                align: 'center',
                sortable: true
            },
            {
                name: 'ValorTotal',
                label: t('forms.orcamento.fields.valorTotal'),
                field: 'ValorTotal',
                align: 'right',
                sortable: true
            },
            {
                name: 'Validade',
                label: t('forms.orcamento.fields.validade'),
                field: 'Validade',
                align: 'center',
                sortable: true
            },
            {
                name: 'actions',
                label: '',
                field: 'actions',
                align: 'right'
            },
        ])

        // Computed properties
        const orcamentosSorted = computed(() => store.orcamentosSorted)
        const loading = computed(() => store.loading)
        const totalOrcamentos = computed(() => store.totalOrcamentos)
        const estatisticasPorStatus = computed(() => store.estatisticasPorStatus)
        const valorTotalOrcamentos = computed(() => store.valorTotalOrcamentos)

        // Computed para filtrar orçamentos
        const orcamentosFiltrados = computed(() => {
            if (!filtro.value) {
                return orcamentosSorted.value
            }

            const filtroLowerCase = filtro.value.toLowerCase()
            return orcamentosSorted.value.filter(orcamento =>
                orcamento.NumeroOrcamento.toString().includes(filtroLowerCase) ||
                `${orcamento.Cliente.Nome} ${orcamento.Cliente.Sobrenome}`.toLowerCase().includes(filtroLowerCase) ||
                orcamento.Cliente.Email.toLowerCase().includes(filtroLowerCase)
            )
        })

        // Métodos
        function formatarMoeda(valor) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(valor || 0)
        }

        function formatarData(data) {
            return new Intl.DateTimeFormat('pt-BR').format(new Date(data))
        }

        function isExpirado(validade) {
            return new Date() > new Date(validade)
        }

        function getStatusColor(status) {
            const colors = {
                [StatusOrcamento.RASCUNHO]: 'grey',
                [StatusOrcamento.PENDENTE]: 'orange',
                [StatusOrcamento.APROVADO]: 'green',
                [StatusOrcamento.REJEITADO]: 'red',
                [StatusOrcamento.CANCELADO]: 'red',
                [StatusOrcamento.EXPIRADO]: 'negative'
            }
            return colors[status] || 'grey'
        }

        function visualizarOrcamento(orcamento) {
            router.push(`/orcamentos/${orcamento.Id}/visualizar`)
        }

        function editarOrcamento(orcamento) {
            router.push(`/orcamentos/${orcamento.Id}`)
        }

        async function excluirOrcamento(id) {
            try {
                $q.dialog({
                    title: t('forms.orcamento.confirmDelete.title'),
                    message: t('forms.orcamento.confirmDelete.message'),
                    cancel: true,
                    persistent: true
                }).onOk(async () => {
                    await store.deleteOrcamento(id)
                    $q.notify({
                        type: 'positive',
                        message: t('forms.orcamento.messages.deleteSuccess')
                    })
                })
            } catch (error) {
                console.error('Erro ao excluir orçamento:', error)
                $q.notify({
                    type: 'negative',
                    message: t('forms.orcamento.messages.deleteError')
                })
            }
        }

        onMounted(() => {
            store.loadOrcamentos()
        })

        return {
            // Estado
            filtro,

            // Computed
            columns,
            orcamentosFiltrados,
            loading,
            totalOrcamentos,
            estatisticasPorStatus,
            valorTotalOrcamentos,

            // Métodos
            formatarMoeda,
            formatarData,
            isExpirado,
            getStatusColor,
            visualizarOrcamento,
            editarOrcamento,
            excluirOrcamento
        }
    }
})
</script>

<style lang="sass">
.accent-divider
  height: 2px
  background: $accent
  width: 100%
</style>
