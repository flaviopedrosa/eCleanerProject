<template>
    <q-page padding>
        <!-- Breadcrumb -->
        <div class="q-mb-md">
            <q-breadcrumbs>
                <q-breadcrumbs-el :label="$t('menu.inicio')" icon="home" to="/" />
                <q-breadcrumbs-el :label="$t('menu.contratos')" />
            </q-breadcrumbs>
        </div>

        <!-- Cabeçalho -->
        <div class="row items-center q-mb-md">
            <div class="col">
                <div class="text-h5">{{ $t('contrato.titulo') }}</div>
                <div class="text-subtitle2 text-grey-7">{{ $t('contrato.subtitulo') }}</div>
            </div>
        </div>

        <!-- Filtros -->
        <q-card class="q-mb-md">
            <q-card-section>
                <div class="row q-col-gutter-md">
                    <div class="col-12 col-md-4">
                        <q-input v-model="filtros.busca" :label="$t('contrato.buscar')"
                            :placeholder="$t('contrato.buscarPlaceholder')" outlined dense clearable>
                            <template v-slot:prepend>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </div>

                    <div class="col-12 col-md-4">
                        <q-select v-model="filtros.status" :options="statusOptions"
                            :label="$t('contrato.filtrarPorStatus')" outlined dense multiple clearable emit-value
                            map-options>
                            <template v-slot:prepend>
                                <q-icon name="filter_list" />
                            </template>
                        </q-select>
                    </div>

                    <div class="col-12 col-md-4">
                        <q-btn :label="$t('contrato.limparFiltros')" icon="clear" color="grey-7" outline
                            @click="limparFiltros" />
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <!-- Estatísticas -->
        <div class="row q-col-gutter-sm q-mb-md" v-if="estatisticas">
            <div class="col-6 col-sm-4 col-md-2">
                <q-card flat bordered>
                    <q-card-section class="text-center">
                        <div class="text-h6 text-primary">{{ estatisticas.total }}</div>
                        <div class="text-caption text-grey-7">{{ $t('contrato.total') }}</div>
                    </q-card-section>
                </q-card>
            </div>

            <div class="col-6 col-sm-4 col-md-2">
                <q-card flat bordered>
                    <q-card-section class="text-center">
                        <div class="text-h6 text-positive">{{ estatisticas.vigente }}</div>
                        <div class="text-caption text-grey-7">{{ $t('contrato.status.vigente') }}</div>
                    </q-card-section>
                </q-card>
            </div>

            <div class="col-6 col-sm-4 col-md-2">
                <q-card flat bordered>
                    <q-card-section class="text-center">
                        <div class="text-h6 text-warning">{{ estatisticas.aguardandoAssinatura }}</div>
                        <div class="text-caption text-grey-7">{{ $t('contrato.aguardando') }}</div>
                    </q-card-section>
                </q-card>
            </div>
        </div>

        <!-- Tabela de Contratos -->
        <q-card>
            <q-table :rows="contratosFiltrados" :columns="colunas" :loading="contratoStore.loading"
                :pagination="paginacao" row-key="Id" flat bordered>
                <template v-slot:body-cell-NumeroContrato="props">
                    <q-td :props="props">
                        <div class="text-bold text-primary cursor-pointer" @click="visualizarContrato(props.row.Id)">
                            {{ props.row.NumeroContrato }}
                        </div>
                    </q-td>
                </template>

                <template v-slot:body-cell-Cliente="props">
                    <q-td :props="props">
                        {{ props.row.Orcamento?.Cliente?.Nome || '-' }}
                    </q-td>
                </template>

                <template v-slot:body-cell-Status="props">
                    <q-td :props="props">
                        <ContratoStatusBadge :status="props.row.Status" />
                    </q-td>
                </template>

                <template v-slot:body-cell-DataEmissao="props">
                    <q-td :props="props">
                        {{ formatarData(props.row.DataEmissao) }}
                    </q-td>
                </template>

                <template v-slot:body-cell-ValorTotal="props">
                    <q-td :props="props">
                        <div class="text-bold">
                            {{ formatarValor(props.row.Orcamento?.ValorTotal) }}
                        </div>
                    </q-td>
                </template>

                <template v-slot:body-cell-acoes="props">
                    <q-td :props="props">
                        <q-btn icon="visibility" color="primary" flat dense round
                            @click="visualizarContrato(props.row.Id)">
                            <q-tooltip>{{ $t('contrato.visualizar') }}</q-tooltip>
                        </q-btn>

                        <q-btn icon="download" color="secondary" flat dense round @click="downloadPDF(props.row.Id)">
                            <q-tooltip>{{ $t('contrato.downloadPDF') }}</q-tooltip>
                        </q-btn>

                        <q-btn v-if="props.row.Status !== 'CANCELADO' && props.row.Status !== 'EXPIRADO'" icon="cancel"
                            color="negative" flat dense round @click="confirmarCancelamento(props.row)">
                            <q-tooltip>{{ $t('contrato.cancelar') }}</q-tooltip>
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </q-card>

        <!-- Dialog de Cancelamento -->
        <q-dialog v-model="dialogCancelamento" persistent>
            <q-card style="min-width: 400px">
                <q-card-section>
                    <div class="text-h6">{{ $t('contrato.cancelarTitulo') }}</div>
                </q-card-section>

                <q-card-section>
                    <q-input v-model="motivoCancelamento" :label="$t('contrato.motivoCancelamento')"
                        :placeholder="$t('contrato.motivoCancelamentoPlaceholder')" type="textarea" rows="3" outlined
                        autofocus />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn :label="$t('acoes.cancelar')" flat color="grey-7" v-close-popup />
                    <q-btn :label="$t('acoes.confirmar')" color="negative"
                        :disable="!motivoCancelamento || motivoCancelamento.trim().length < 3"
                        @click="cancelarContrato" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useContratoStore } from '../stores/contrato-store'
import ContratoStatusBadge from '../components/ContratoStatusBadge.vue'
import { StatusContrato } from '../core/domain/enums/statusContrato'

const router = useRouter()
const { t, locale } = useI18n()
const contratoStore = useContratoStore()

const filtros = ref({
    busca: '',
    status: []
})

const paginacao = ref({
    page: 1,
    rowsPerPage: 10
})

const dialogCancelamento = ref(false)
const contratoParaCancelar = ref(null)
const motivoCancelamento = ref('')
const estatisticas = ref(null)

const colunas = computed(() => [
    {
        name: 'NumeroContrato',
        label: t('contrato.numero'),
        field: 'NumeroContrato',
        align: 'left',
        sortable: true
    },
    {
        name: 'Cliente',
        label: t('contrato.cliente'),
        align: 'left',
        sortable: true
    },
    {
        name: 'Status',
        label: t('contrato.status.label'),
        field: 'Status',
        align: 'center',
        sortable: true
    },
    {
        name: 'DataEmissao',
        label: t('contrato.dataEmissao'),
        field: 'DataEmissao',
        align: 'center',
        sortable: true
    },
    {
        name: 'ValorTotal',
        label: t('contrato.valorTotal'),
        align: 'right',
        sortable: true
    },
    {
        name: 'acoes',
        label: t('acoes.label'),
        align: 'center'
    }
])

const statusOptions = computed(() => {
    return Object.values(StatusContrato).map(status => ({
        label: t(`contrato.status.${status.toLowerCase()}`),
        value: status
    }))
})

const contratosFiltrados = computed(() => {
    let contratos = contratoStore.contratosOrdenados

    // Filtro por busca
    if (filtros.value.busca) {
        const busca = filtros.value.busca.toLowerCase()
        contratos = contratos.filter(c =>
            c.NumeroContrato.toLowerCase().includes(busca) ||
            c.Orcamento?.NumeroOrcamento?.toLowerCase().includes(busca) ||
            c.Orcamento?.Cliente?.Nome?.toLowerCase().includes(busca)
        )
    }

    // Filtro por status
    if (filtros.value.status && filtros.value.status.length > 0) {
        contratos = contratos.filter(c => filtros.value.status.includes(c.Status))
    }

    return contratos
})

const formatarData = (data) => {
    if (!data) return '-'
    const dataObj = data instanceof Date ? data : new Date(data)
    return dataObj.toLocaleDateString(locale.value)
}

const formatarValor = (valor) => {
    return new Intl.NumberFormat(locale.value, {
        style: 'currency',
        currency: locale.value === 'en-US' ? 'USD' : 'BRL'
    }).format(valor || 0)
}

const limparFiltros = () => {
    filtros.value = {
        busca: '',
        status: []
    }
}

const visualizarContrato = (id) => {
    router.push(`/contratos/visualizar/${id}`)
}

const downloadPDF = async (id) => {
    try {
        await contratoStore.downloadPDF(id)
    } catch (error) {
        console.error('Erro ao fazer download:', error)
    }
}

const confirmarCancelamento = (contrato) => {
    contratoParaCancelar.value = contrato
    motivoCancelamento.value = ''
    dialogCancelamento.value = true
}

const cancelarContrato = async () => {
    try {
        await contratoStore.cancelarContrato(
            contratoParaCancelar.value.Id,
            motivoCancelamento.value,
            'PRESTADOR'
        )
        dialogCancelamento.value = false
        contratoParaCancelar.value = null
        motivoCancelamento.value = ''
    } catch (error) {
        console.error('Erro ao cancelar contrato:', error)
    }
}

const carregarEstatisticas = async () => {
    estatisticas.value = await contratoStore.obterEstatisticas()
}

onMounted(async () => {
    await contratoStore.carregarContratos()
    await carregarEstatisticas()
})
</script>
