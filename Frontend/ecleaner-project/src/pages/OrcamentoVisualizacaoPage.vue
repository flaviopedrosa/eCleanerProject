<template>
    <q-page class="q-pa-lg">
        <!-- Cabeçalho da Página -->
        <div class="row items-center q-mb-xl">
            <div class="col">
                <div class="row items-center q-mb-sm">
                    <q-btn flat round icon="arrow_back" @click="$router.go(-1)" class="q-mr-md" />
                    <q-icon name="receipt_long" size="2rem" class="text-secondary q-mr-md" />
                    <h4 class="text-h5 q-ma-none text-secondary">
                        {{ $t('forms.orcamento.viewTitle') }}
                    </h4>
                </div>
                <div class="accent-divider q-mb-md"></div>
                <div class="row justify-end">
                    <p class="text-subtitle1 text-grey-7 q-ma-none">
                        {{ $t('forms.orcamento.viewSubtitle') }}
                    </p>
                </div>
            </div>
        </div>

        <div v-if="loading" class="row justify-center q-py-xl">
            <q-spinner color="primary" size="3em" />
        </div>

        <div v-else-if="orcamento" class="row q-col-gutter-lg">
            <!-- Coluna Principal -->
            <div class="col-12 col-lg-8">
                <!-- Informações Básicas -->
                <q-card flat bordered class="q-mb-lg">
                    <q-card-section>
                        <div class="text-h6 q-mb-md">
                            <q-icon name="info" class="q-mr-sm" />
                            {{ $t('forms.orcamento.sections.basicInfo') }}
                        </div>

                        <div class="row q-col-gutter-md">
                            <div class="col-12 col-md-6">
                                <div class="text-caption text-grey-6 q-mb-xs">{{ $t('forms.orcamento.fields.numero') }}
                                </div>
                                <q-chip color="primary" text-color="white" size="md">
                                    #{{ orcamento.NumeroOrcamento }}
                                </q-chip>
                            </div>

                            <div class="col-12 col-md-6">
                                <div class="text-caption text-grey-6 q-mb-xs">{{ $t('forms.orcamento.fields.status') }}
                                </div>
                                <q-badge :color="getStatusColor(orcamento.Status)"
                                    :label="$t(`enums.statusOrcamento.${orcamento.Status}`)"
                                    class="text-weight-medium" />
                            </div>

                            <div class="col-12 col-md-6">
                                <div class="text-caption text-grey-6 q-mb-xs">{{
                                    $t('forms.orcamento.fields.dataEmissao') }}</div>
                                <div class="text-body1">{{ formatarData(orcamento.DataEmissao) }}</div>
                            </div>

                            <div class="col-12 col-md-6">
                                <div class="text-caption text-grey-6 q-mb-xs">{{ $t('forms.orcamento.fields.validade')
                                    }}</div>
                                <div :class="isExpirado(orcamento.Validade) ? 'text-negative' : 'text-body1'">
                                    {{ formatarData(orcamento.Validade) }}
                                    <q-icon v-if="isExpirado(orcamento.Validade)" name="warning" color="negative"
                                        size="sm" class="q-ml-xs" />
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>

                <!-- Informações do Cliente -->
                <q-card flat bordered class="q-mb-lg">
                    <q-card-section>
                        <div class="text-h6 q-mb-md">
                            <q-icon name="person" class="q-mr-sm" />
                            {{ $t('forms.orcamento.sections.client') }}
                        </div>

                        <div class="row q-col-gutter-md">
                            <div class="col-12 col-md-6">
                                <div class="text-caption text-grey-6 q-mb-xs">{{ $t('forms.orcamento.fields.nome') }}
                                </div>
                                <div class="text-body1 text-weight-medium">
                                    {{ orcamento.Cliente.Nome }} {{ orcamento.Cliente.Sobrenome }}
                                </div>
                            </div>

                            <div class="col-12 col-md-6">
                                <div class="text-caption text-grey-6 q-mb-xs">{{ $t('forms.orcamento.fields.email') }}
                                </div>
                                <div class="text-body1">{{ orcamento.Cliente.Email }}</div>
                            </div>

                            <div class="col-12 col-md-6">
                                <div class="text-caption text-grey-6 q-mb-xs">{{ $t('forms.orcamento.fields.telefone')
                                    }}</div>
                                <div class="text-body1">{{ orcamento.Cliente.Telefone ||
                                    $t('forms.orcamento.fields.naoInformado') }}</div>
                            </div>

                            <div class="col-12 col-md-6">
                                <div class="text-caption text-grey-6 q-mb-xs">{{ $t('forms.orcamento.fields.documento')
                                    }}</div>
                                <div class="text-body1">{{ orcamento.Cliente.Documento ||
                                    $t('forms.orcamento.fields.naoInformado') }}</div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>

                <!-- Itens de Serviço -->
                <q-card flat bordered class="q-mb-lg" v-if="orcamento.ItensServico.length > 0">
                    <q-card-section>
                        <div class="text-h6 q-mb-md">
                            <q-icon name="build" class="q-mr-sm" />
                            {{ $t('forms.orcamento.sections.services') }}
                        </div>

                        <div class="row q-col-gutter-md">
                            <div class="col-12" v-for="(item, index) in orcamento.ItensServico" :key="index">
                                <q-card flat bordered class="bg-grey-1">
                                    <q-card-section>
                                        <div class="row items-center q-mb-sm">
                                            <div class="text-subtitle1 text-weight-medium">
                                                {{ item.Servico?.Nome || `Serviço ${index + 1}` }}
                                            </div>
                                            <q-space />
                                            <div class="text-h6 text-primary">{{ formatarMoeda(item.Subtotal) }}</div>
                                        </div>

                                        <div class="row q-col-gutter-sm text-caption text-grey-6">
                                            <div class="col">
                                                <strong>{{ $t('forms.orcamento.fields.quantidade') }}:</strong> {{
                                                item.Quantidade }}
                                            </div>
                                            <div class="col">
                                                <strong>{{ $t('forms.orcamento.fields.valorUnitario') }}:</strong> {{
                                                formatarMoeda(item.ValorUnitario) }}
                                            </div>
                                        </div>

                                        <div v-if="item.Observacoes" class="q-mt-sm">
                                            <div class="text-caption text-grey-6">{{
                                                $t('forms.orcamento.fields.observacoes') }}:</div>
                                            <div class="text-body2">{{ item.Observacoes }}</div>
                                        </div>
                                    </q-card-section>
                                </q-card>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>

                <!-- Itens de Material -->
                <q-card flat bordered class="q-mb-lg" v-if="orcamento.ItensMaterial.length > 0">
                    <q-card-section>
                        <div class="text-h6 q-mb-md">
                            <q-icon name="inventory" class="q-mr-sm" />
                            {{ $t('forms.orcamento.sections.materials') }}
                        </div>

                        <div class="row q-col-gutter-md">
                            <div class="col-12" v-for="(item, index) in orcamento.ItensMaterial" :key="index">
                                <q-card flat bordered class="bg-grey-1">
                                    <q-card-section>
                                        <div class="row items-center q-mb-sm">
                                            <div class="text-subtitle1 text-weight-medium">
                                                {{ item.Material?.Nome || `Material ${index + 1}` }}
                                            </div>
                                            <q-space />
                                            <div class="text-h6 text-primary">{{ formatarMoeda(item.Subtotal) }}</div>
                                        </div>

                                        <div class="row q-col-gutter-sm text-caption text-grey-6">
                                            <div class="col">
                                                <strong>{{ $t('forms.orcamento.fields.quantidade') }}:</strong> {{
                                                item.Quantidade }}
                                            </div>
                                            <div class="col">
                                                <strong>{{ $t('forms.orcamento.fields.valorUnitario') }}:</strong> {{
                                                formatarMoeda(item.ValorUnitario) }}
                                            </div>
                                        </div>
                                    </q-card-section>
                                </q-card>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>

                <!-- Observações Gerais -->
                <q-card flat bordered class="q-mb-lg" v-if="orcamento.Observacoes">
                    <q-card-section>
                        <div class="text-h6 q-mb-md">
                            <q-icon name="notes" class="q-mr-sm" />
                            {{ $t('forms.orcamento.fields.observacoesGerais') }}
                        </div>
                        <div class="text-body1">{{ orcamento.Observacoes }}</div>
                    </q-card-section>
                </q-card>
            </div>

            <!-- Sidebar - Resumo Financeiro e Ações -->
            <div class="col-12 col-lg-4">
                <!-- Resumo Financeiro -->
                <q-card flat bordered class="q-mb-lg">
                    <q-card-section>
                        <div class="text-h6 q-mb-md">
                            <q-icon name="calculate" class="q-mr-sm" />
                            {{ $t('forms.orcamento.sections.financialSummary') }}
                        </div>

                        <div class="q-gutter-sm">
                            <div class="row justify-between">
                                <div class="text-body2">{{ $t('forms.orcamento.subtotalServices') }}:</div>
                                <div class="text-body2 text-weight-medium">{{ formatarMoeda(subtotalServicos) }}</div>
                            </div>

                            <div class="row justify-between">
                                <div class="text-body2">{{ $t('forms.orcamento.subtotalMaterials') }}:</div>
                                <div class="text-body2 text-weight-medium">{{ formatarMoeda(subtotalMateriais) }}</div>
                            </div>

                            <div v-if="orcamento.Desconto > 0" class="row justify-between">
                                <div class="text-body2 text-negative">{{ $t('forms.orcamento.fields.desconto') }}:</div>
                                <div class="text-body2 text-negative text-weight-medium">-{{
                                    formatarMoeda(orcamento.Desconto) }}</div>
                            </div>

                            <q-separator />

                            <div class="row justify-between">
                                <div class="text-h6">{{ $t('forms.orcamento.fields.valorTotal') }}:</div>
                                <div class="text-h6 text-primary text-weight-bold">{{
                                    formatarMoeda(orcamento.ValorTotal) }}</div>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>

                <!-- Ações -->
                <q-card flat bordered>
                    <q-card-section>
                        <div class="text-h6 q-mb-md">{{ $t('forms.orcamento.actions') }}</div>

                        <div class="q-gutter-sm">
                            <q-btn color="primary" icon="edit" :label="$t('forms.orcamento.editButton')"
                                @click="editarOrcamento" class="full-width" />

                            <q-btn v-if="orcamento.Status === 'PENDENTE'" color="positive" icon="check"
                                :label="$t('forms.orcamento.buttons.approve')" @click="aprovarOrcamento"
                                class="full-width" />

                            <q-btn v-if="orcamento.Status === 'PENDENTE'" color="negative" icon="close"
                                :label="$t('forms.orcamento.buttons.reject')" @click="rejeitarOrcamento"
                                class="full-width" />

                            <q-btn flat color="primary" icon="print" :label="$t('forms.orcamento.buttons.print')"
                                @click="imprimirOrcamento" class="full-width" />

                            <q-btn flat color="primary" icon="share" :label="$t('forms.orcamento.buttons.share')"
                                @click="compartilharOrcamento" class="full-width" />
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>

        <div v-else class="row justify-center q-py-xl">
            <q-card flat bordered class="text-center q-pa-xl">
                <q-icon name="error" size="4rem" color="grey-5" />
                <div class="text-h6 q-mt-md text-grey-6">
                    {{ $t('forms.orcamento.notFound') }}
                </div>
            </q-card>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { useOrcamentoStore } from '@/stores/orcamento-store.js'
import { StatusOrcamento } from '@/core/domain/enums/statusOrcamento'

export default defineComponent({
    name: 'OrcamentoVisualizacaoPage',

    setup() {
        const router = useRouter()
        const route = useRoute()
        const { t } = useI18n()
        const $q = useQuasar()
        const store = useOrcamentoStore()

        // Estado
        const orcamento = ref(null)
        const loading = ref(true)

        // Computed properties
        const subtotalServicos = computed(() =>
            orcamento.value?.ItensServico?.reduce((sum, item) => sum + (item.Subtotal || 0), 0) || 0
        )

        const subtotalMateriais = computed(() =>
            orcamento.value?.ItensMaterial?.reduce((sum, item) => sum + (item.Subtotal || 0), 0) || 0
        )

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

        function editarOrcamento() {
            router.push(`/orcamentos/${orcamento.value.Id}`)
        }

        async function aprovarOrcamento() {
            try {
                await store.approveOrcamento(orcamento.value.Id)
                orcamento.value.Status = StatusOrcamento.APROVADO
                $q.notify({
                    type: 'positive',
                    message: t('forms.orcamento.messages.approveSuccess')
                })
            } catch (error) {
                console.error('Erro ao aprovar orçamento:', error)
                $q.notify({
                    type: 'negative',
                    message: t('forms.orcamento.messages.approveError')
                })
            }
        }

        async function rejeitarOrcamento() {
            try {
                $q.dialog({
                    title: t('forms.orcamento.confirmReject.title'),
                    message: t('forms.orcamento.confirmReject.message'),
                    cancel: true,
                    persistent: true
                }).onOk(async () => {
                    await store.rejectOrcamento(orcamento.value.Id)
                    orcamento.value.Status = StatusOrcamento.REJEITADO
                    $q.notify({
                        type: 'positive',
                        message: t('forms.orcamento.messages.rejectSuccess')
                    })
                })
            } catch (error) {
                console.error('Erro ao rejeitar orçamento:', error)
                $q.notify({
                    type: 'negative',
                    message: t('forms.orcamento.messages.rejectError')
                })
            }
        }

        function imprimirOrcamento() {
            $q.notify({
                type: 'info',
                message: t('forms.orcamento.messages.printDevelopment')
            })
        }

        function compartilharOrcamento() {
            $q.notify({
                type: 'info',
                message: t('forms.orcamento.messages.shareDevelopment')
            })
        }

        async function carregarOrcamento() {
            try {
                loading.value = true
                const id = route.params.id
                orcamento.value = await store.getOrcamentoById(id)
            } catch (error) {
                console.error('Erro ao carregar orçamento:', error)
                $q.notify({
                    type: 'negative',
                    message: t('forms.orcamento.messages.loadError')
                })
            } finally {
                loading.value = false
            }
        }

        onMounted(() => {
            carregarOrcamento()
        })

        return {
            // Estado
            orcamento,
            loading,

            // Computed
            subtotalServicos,
            subtotalMateriais,

            // Métodos
            t,
            formatarMoeda,
            formatarData,
            isExpirado,
            getStatusColor,
            editarOrcamento,
            aprovarOrcamento,
            rejeitarOrcamento,
            imprimirOrcamento,
            compartilharOrcamento
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
