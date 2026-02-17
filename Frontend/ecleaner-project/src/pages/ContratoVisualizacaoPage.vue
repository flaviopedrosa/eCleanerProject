<template>
    <q-page padding>
        <div v-if="contratoStore.loading" class="flex flex-center" style="min-height: 400px">
            <q-spinner color="primary" size="50px" />
        </div>

        <div v-else-if="!contrato" class="text-center q-pa-xl">
            <q-icon name="error_outline" size="64px" color="grey-5" />
            <div class="text-h6 q-mt-md">{{ $t('contrato.naoEncontrado') }}</div>
            <q-btn :label="$t('acoes.voltar')" color="primary" flat @click="$router.back()" class="q-mt-md" />
        </div>

        <div v-else>
            <!-- Breadcrumb e cabeçalho -->
            <div class="q-mb-md">
                <q-breadcrumbs>
                    <q-breadcrumbs-el :label="$t('menu.inicio')" icon="home" to="/" />
                    <q-breadcrumbs-el :label="$t('menu.contratos')" to="/contratos" />
                    <q-breadcrumbs-el :label="contrato.NumeroContrato" />
                </q-breadcrumbs>
            </div>

            <div class="row items-center q-mb-md">
                <div class="col">
                    <div class="row items-center q-gutter-sm">
                        <q-btn icon="arrow_back" flat round dense @click="$router.back()" />
                        <div>
                            <div class="text-h5">{{ contrato.NumeroContrato }}</div>
                            <div class="text-subtitle2 text-grey-7">
                                {{ $t('contrato.orcamento') }}: {{ contrato.Orcamento?.NumeroOrcamento }}
                            </div>
                        </div>
                        <ContratoStatusBadge :status="contrato.Status" />
                    </div>
                </div>

                <div class="col-auto">
                    <q-btn-group outline>
                        <q-btn :label="$t('contrato.downloadPDF')" icon="download" color="secondary"
                            @click="downloadPDF" />

                        <q-btn v-if="contrato.Status === 'RASCUNHO'" :label="$t('contrato.enviarParaAssinatura')"
                            icon="send" color="primary" @click="confirmarEnvio" />

                        <q-btn v-if="contrato.Status === 'AGUARDANDO_ASSINATURA'" :label="$t('contrato.reenviarEmail')"
                            icon="email" color="info" @click="reenviarEmail" />

                        <q-btn v-if="contrato.Status === 'ASSINADO_CLIENTE'" :label="$t('contrato.assinarPrestador')"
                            icon="edit" color="positive" @click="abrirDialogAssinatura" />

                        <q-btn v-if="!['CANCELADO', 'EXPIRADO'].includes(contrato.Status)"
                            :label="$t('contrato.cancelar')" icon="cancel" color="negative"
                            @click="confirmarCancelamento" />
                    </q-btn-group>
                </div>
            </div>

            <!-- Informações principais -->
            <div class="row q-col-gutter-md q-mb-md">
                <!-- Dados da Empresa -->
                <div class="col-12 col-md-6">
                    <q-card flat bordered>
                        <q-card-section>
                            <div class="text-h6 q-mb-sm">{{ $t('contrato.contratante') }}</div>
                            <div><strong>{{ config.nomeEmpresa || 'eCleaner' }}</strong></div>
                            <div v-if="config.cnpjEmpresa" class="text-caption">CNPJ: {{ config.cnpjEmpresa }}</div>
                            <div v-if="config.emailEmpresa" class="text-caption">
                                <q-icon name="email" size="xs" /> {{ config.emailEmpresa }}
                            </div>
                            <div v-if="config.telefoneEmpresa" class="text-caption">
                                <q-icon name="phone" size="xs" /> {{ config.telefoneEmpresa }}
                            </div>
                        </q-card-section>
                    </q-card>
                </div>

                <!-- Dados do Cliente -->
                <div class="col-12 col-md-6">
                    <q-card flat bordered>
                        <q-card-section>
                            <div class="text-h6 q-mb-sm">{{ $t('contrato.contratado') }}</div>
                            <div><strong>{{ contrato.Orcamento?.Cliente?.Nome }}</strong></div>
                            <div v-if="contrato.Orcamento?.Cliente?.NumeroDocumento" class="text-caption">
                                {{ getTipoDocLabel(contrato.Orcamento?.Cliente?.TipoDocumento) }}:
                                {{ contrato.Orcamento?.Cliente?.NumeroDocumento }}
                            </div>
                            <div v-if="contrato.Orcamento?.Cliente?.Email" class="text-caption">
                                <q-icon name="email" size="xs" /> {{ contrato.Orcamento?.Cliente?.Email }}
                            </div>
                            <div v-if="contrato.Orcamento?.Cliente?.Telefone" class="text-caption">
                                <q-icon name="phone" size="xs" /> {{ contrato.Orcamento?.Cliente?.Telefone }}
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>

            <!-- Texto do Contrato -->
            <q-card flat bordered class="q-mb-md">
                <q-card-section>
                    <div class="text-h6 q-mb-md">{{ $t('contrato.textoContrato') }}</div>
                    <div class="contrato-texto"
                        style="white-space: pre-wrap; font-family: 'Courier New', monospace; font-size: 12px;">
                        {{ contrato.TextoContrato }}
                    </div>
                </q-card-section>
            </q-card>

            <!-- Valores -->
            <q-card flat bordered class="q-mb-md">
                <q-card-section>
                    <div class="text-h6 q-mb-md">{{ $t('contrato.valores') }}</div>
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-sm-6">
                            <div class="text-caption text-grey-7">{{ $t('contrato.valorTotal') }}</div>
                            <div class="text-h5 text-primary">{{ formatarValor(contrato.Orcamento?.ValorTotal) }}</div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="text-caption text-grey-7">{{ $t('contrato.periodicidade') }}</div>
                            <div class="text-h6">{{ contrato.Orcamento?.Periodicidade || 'Única' }}</div>
                            <div v-if="contrato.Orcamento?.QuantidadeNoPeriodo > 1" class="text-caption">
                                {{ contrato.Orcamento.QuantidadeNoPeriodo }}x no período
                            </div>
                        </div>
                    </div>
                </q-card-section>
            </q-card>

            <!-- Assinaturas Digitais -->
            <q-card flat bordered class="q-mb-md">
                <q-card-section>
                    <div class="text-h6 q-mb-md">{{ $t('contrato.assinaturasDigitais') }}</div>

                    <div class="row q-col-gutter-md">
                        <!-- Assinatura do Cliente -->
                        <div class="col-12 col-md-6">
                            <q-card flat bordered :class="contrato.AssinaturaCliente ? 'bg-green-1' : 'bg-grey-2'">
                                <q-card-section>
                                    <div class="row items-center q-mb-sm">
                                        <div class="text-subtitle1 text-weight-bold">{{ $t('contrato.assinaturaCliente')
                                        }}</div>
                                        <q-space />
                                        <q-icon :name="contrato.AssinaturaCliente ? 'check_circle' : 'pending'"
                                            :color="contrato.AssinaturaCliente ? 'positive' : 'grey'" size="sm" />
                                    </div>

                                    <div v-if="contrato.AssinaturaCliente">
                                        <div class="q-mb-xs">
                                            <strong>{{ $t('contrato.nome') }}:</strong> {{
                                                contrato.AssinaturaCliente.nome }}
                                        </div>
                                        <div class="q-mb-xs">
                                            <strong>{{ getTipoDocLabel(contrato.AssinaturaCliente.tipoDocumento)
                                            }}:</strong>
                                            {{ mascaraDoc(contrato.AssinaturaCliente.tipoDocumento,
                                                contrato.AssinaturaCliente.numeroDocumento) }}
                                        </div>
                                        <div class="q-mb-xs">
                                            <strong>{{ $t('contrato.dataHora') }}:</strong> {{
                                                formatarDataHora(contrato.AssinaturaCliente.timestamp) }}
                                        </div>
                                        <div class="q-mb-xs">
                                            <strong>IP:</strong> {{ contrato.AssinaturaCliente.ip }}
                                        </div>
                                        <div class="text-caption text-grey-7" style="word-break: break-all;">
                                            <strong>Hash:</strong> {{ contrato.AssinaturaCliente.hash }}
                                        </div>
                                    </div>
                                    <div v-else class="text-grey-7 text-italic">
                                        {{ $t('contrato.assinaturaPendente') }}
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>

                        <!-- Assinatura do Prestador -->
                        <div class="col-12 col-md-6">
                            <q-card flat bordered :class="contrato.AssinaturaPrestador ? 'bg-green-1' : 'bg-grey-2'">
                                <q-card-section>
                                    <div class="row items-center q-mb-sm">
                                        <div class="text-subtitle1 text-weight-bold">{{
                                            $t('contrato.assinaturaPrestador') }}</div>
                                        <q-space />
                                        <q-icon :name="contrato.AssinaturaPrestador ? 'check_circle' : 'pending'"
                                            :color="contrato.AssinaturaPrestador ? 'positive' : 'grey'" size="sm" />
                                    </div>

                                    <div v-if="contrato.AssinaturaPrestador">
                                        <div class="q-mb-xs">
                                            <strong>{{ $t('contrato.nome') }}:</strong> {{
                                                contrato.AssinaturaPrestador.nome }}
                                        </div>
                                        <div class="q-mb-xs">
                                            <strong>{{ getTipoDocLabel(contrato.AssinaturaPrestador.tipoDocumento)
                                            }}:</strong>
                                            {{ mascaraDoc(contrato.AssinaturaPrestador.tipoDocumento,
                                                contrato.AssinaturaPrestador.numeroDocumento) }}
                                        </div>
                                        <div class="q-mb-xs">
                                            <strong>{{ $t('contrato.dataHora') }}:</strong> {{
                                                formatarDataHora(contrato.AssinaturaPrestador.timestamp) }}
                                        </div>
                                        <div class="q-mb-xs">
                                            <strong>IP:</strong> {{ contrato.AssinaturaPrestador.ip }}
                                        </div>
                                        <div class="text-caption text-grey-7" style="word-break: break-all;">
                                            <strong>Hash:</strong> {{ contrato.AssinaturaPrestador.hash }}
                                        </div>
                                    </div>
                                    <div v-else class="text-grey-7 text-italic">
                                        {{ $t('contrato.assinaturaPendente') }}
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </div>
                </q-card-section>
            </q-card>

            <!-- Histórico -->
            <q-card flat bordered>
                <q-card-section>
                    <div class="text-h6 q-mb-md">{{ $t('contrato.historico') }}</div>
                    <q-timeline color="primary">
                        <q-timeline-entry v-for="(evento, index) in contrato.Historico" :key="index"
                            :title="$t(`contrato.eventos.${evento.evento}`)"
                            :subtitle="formatarDataHora(evento.timestamp)">
                            <div v-if="evento.detalhes && Object.keys(evento.detalhes).length > 0" class="text-caption">
                                {{ JSON.stringify(evento.detalhes, null, 2) }}
                            </div>
                        </q-timeline-entry>
                    </q-timeline>
                </q-card-section>
            </q-card>
        </div>

        <!-- Dialog de Envio para Assinatura -->
        <q-dialog v-model="dialogEnvio" persistent>
            <q-card style="min-width: 400px">
                <q-card-section>
                    <div class="text-h6">{{ $t('contrato.confirmarEnvio') }}</div>
                </q-card-section>

                <q-card-section>
                    <p>{{ $t('contrato.confirmarEnvioTexto') }}</p>
                    <p class="text-caption text-grey-7">
                        {{ $t('contrato.linkValidoPor72h') }}
                    </p>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn :label="$t('acoes.cancelar')" flat color="grey-7" v-close-popup />
                    <q-btn :label="$t('acoes.enviar')" color="primary" @click="enviarParaAssinatura" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- Dialog de Assinatura do Prestador -->
        <q-dialog v-model="dialogAssinatura" persistent>
            <q-card style="min-width: 500px">
                <q-card-section>
                    <div class="text-h6">{{ $t('contrato.assinarContrato') }}</div>
                </q-card-section>

                <q-card-section>
                    <q-input v-model="formAssinatura.nome" :label="$t('contrato.nomeCompleto')" outlined
                        :rules="[val => !!val || $t('forms.validacoes.campoObrigatorio')]" />

                    <DocumentInput v-model:tipoDocumento="formAssinatura.tipoDocumento"
                        v-model:numeroDocumento="formAssinatura.numeroDocumento" class="q-mt-md" />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn :label="$t('acoes.cancelar')" flat color="grey-7" v-close-popup />
                    <q-btn :label="$t('contrato.assinar')" color="positive" :disable="!podeAssinar"
                        @click="assinarPrestador" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- Dialog de Cancelamento -->
        <q-dialog v-model="dialogCancelamento" persistent>
            <q-card style="min-width: 400px">
                <q-card-section>
                    <div class="text-h6">{{ $t('contrato.cancelarContrato') }}</div>
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
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useContratoStore } from '../stores/contrato-store'
import ContratoStatusBadge from '../components/ContratoStatusBadge.vue'
import DocumentInput from '../components/DocumentInput.vue'
import { getTipoDocumentoLabel } from '../core/domain/enums/tipoDocumento'
import { mascaraDocumento } from '../core/infrastructure/utils/documentValidator'

const route = useRoute()
const { locale } = useI18n()
const contratoStore = useContratoStore()

const config = ref(JSON.parse(localStorage.getItem('ecleaner_config') || '{}'))
const dialogEnvio = ref(false)
const dialogAssinatura = ref(false)
const dialogCancelamento = ref(false)
const motivoCancelamento = ref('')

const formAssinatura = ref({
    nome: '',
    tipoDocumento: 'CPF',
    numeroDocumento: ''
})

const contrato = computed(() => {
    return contratoStore.buscarPorId(route.params.id)
})

const podeAssinar = computed(() => {
    return formAssinatura.value.nome &&
        formAssinatura.value.tipoDocumento &&
        formAssinatura.value.numeroDocumento &&
        formAssinatura.value.numeroDocumento.length >= 3
})

const getTipoDocLabel = (tipo) => {
    return getTipoDocumentoLabel(tipo, locale.value)
}

const mascaraDoc = (tipo, numero) => {
    return mascaraDocumento(tipo, numero)
}

const formatarValor = (valor) => {
    return new Intl.NumberFormat(locale.value, {
        style: 'currency',
        currency: locale.value === 'en-US' ? 'USD' : 'BRL'
    }).format(valor || 0)
}

const formatarDataHora = (data) => {
    if (!data) return '-'
    const dataObj = data instanceof Date ? data : new Date(data)
    return dataObj.toLocaleString(locale.value)
}

const confirmarEnvio = () => {
    dialogEnvio.value = true
}

const enviarParaAssinatura = async () => {
    try {
        await contratoStore.enviarParaAssinatura(contrato.value.Id)
        dialogEnvio.value = false
    } catch (error) {
        console.error('Erro ao enviar:', error)
    }
}

const reenviarEmail = async () => {
    try {
        await contratoStore.reenviarEmailAssinatura(contrato.value.Id)
    } catch (error) {
        console.error('Erro ao reenviar:', error)
    }
}

const abrirDialogAssinatura = () => {
    formAssinatura.value = {
        nome: config.value.nomeEmpresa || '',
        tipoDocumento: 'CNPJ',
        numeroDocumento: config.value.cnpjEmpresa || ''
    }
    dialogAssinatura.value = true
}

const assinarPrestador = async () => {
    try {
        await contratoStore.assinarContrato(contrato.value.Id, 'PRESTADOR', formAssinatura.value)
        dialogAssinatura.value = false
    } catch (error) {
        console.error('Erro ao assinar:', error)
    }
}

const confirmarCancelamento = () => {
    motivoCancelamento.value = ''
    dialogCancelamento.value = true
}

const cancelarContrato = async () => {
    try {
        await contratoStore.cancelarContrato(
            contrato.value.Id,
            motivoCancelamento.value,
            'PRESTADOR'
        )
        dialogCancelamento.value = false
    } catch (error) {
        console.error('Erro ao cancelar:', error)
    }
}

const downloadPDF = async () => {
    try {
        await contratoStore.downloadPDF(contrato.value.Id)
    } catch (error) {
        console.error('Erro ao fazer download:', error)
    }
}

onMounted(async () => {
    if (!contratoStore.contratos || contratoStore.contratos.length === 0) {
        await contratoStore.carregarContratos()
    }
})
</script>

<style scoped>
.contrato-texto {
    max-height: 500px;
    overflow-y: auto;
    background: #f5f5f5;
    padding: 16px;
    border-radius: 4px;
}
</style>
