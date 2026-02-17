<template>
    <q-page class="flex flex-center bg-grey-2">
        <q-card style="width: 100%; max-width: 800px;" class="q-ma-md">
            <!-- Loading -->
            <div v-if="loading" class="flex flex-center q-pa-xl">
                <q-spinner color="primary" size="50px" />
            </div>

            <!-- Erro: Token inválido ou expirado -->
            <div v-else-if="erro" class="q-pa-xl text-center">
                <q-icon name="error_outline" size="64px" :color="erro.tipo === 'expirado' ? 'warning' : 'negative'" />
                <div class="text-h6 q-mt-md">{{ $t(`contrato.erros.${erro.tipo}`) }}</div>
                <div v-if="erro.mensagem" class="text-body2 text-grey-7 q-mt-sm">{{ erro.mensagem }}</div>

                <div v-if="erro.tipo === 'expirado'" class="q-mt-md">
                    <q-btn :label="$t('contrato.solicitarNovoLink')" color="primary" outline
                        @click="solicitarNovoLink" />
                </div>
            </div>

            <!-- Sucesso: Já assinado -->
            <div v-else-if="assinaturaRealizada" class="q-pa-xl text-center">
                <q-icon name="check_circle" size="64px" color="positive" />
                <div class="text-h5 q-mt-md">{{ $t('contrato.assinaturaRealizadaSucesso') }}</div>
                <div class="text-body1 text-grey-7 q-mt-sm">
                    {{ $t('contrato.assinaturaRealizadaTexto') }}
                </div>

                <div class="q-mt-lg">
                    <q-btn :label="$t('contrato.downloadPDF')" icon="download" color="primary" @click="downloadPDF" />
                </div>
            </div>

            <!-- Formulário de Assinatura -->
            <div v-else-if="contrato">
                <q-card-section class="bg-primary text-white">
                    <div class="text-h5">{{ $t('contrato.assinaturaDigital') }}</div>
                    <div class="text-subtitle2">{{ contrato.NumeroContrato }}</div>
                </q-card-section>

                <q-card-section>
                    <div class="text-subtitle1 text-weight-bold q-mb-sm">
                        {{ $t('contrato.dadosContrato') }}
                    </div>
                    <div class="row q-col-gutter-sm">
                        <div class="col-12 col-sm-6">
                            <div class="text-caption text-grey-7">{{ $t('contrato.contratante') }}</div>
                            <div class="text-weight-medium">{{ config.nomeEmpresa || 'eCleaner' }}</div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="text-caption text-grey-7">{{ $t('contrato.valorTotal') }}</div>
                            <div class="text-weight-medium text-primary">{{
                                formatarValor(contrato.Orcamento?.ValorTotal) }}</div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="text-caption text-grey-7">{{ $t('contrato.dataEmissao') }}</div>
                            <div class="text-weight-medium">{{ formatarData(contrato.DataCriacao) }}</div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="text-caption text-grey-7">{{ $t('contrato.validadeLink') }}</div>
                            <div class="text-weight-medium text-warning">{{ formatarDataHora(contrato.TokenExpiraEm) }}
                            </div>
                        </div>
                    </div>
                </q-card-section>

                <q-separator />

                <!-- Visualização do Contrato -->
                <q-card-section>
                    <q-expansion-item :label="$t('contrato.visualizarTextoCompleto')" icon="description"
                        header-class="bg-grey-3">
                        <q-card>
                            <q-card-section class="contrato-texto"
                                style="white-space: pre-wrap; font-family: 'Courier New', monospace; font-size: 11px; max-height: 400px; overflow-y: auto;">
                                {{ contrato.TextoContrato }}
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                </q-card-section>

                <q-separator />

                <!-- Formulário -->
                <q-card-section>
                    <div class="text-h6 q-mb-md">{{ $t('contrato.informeSeusAados') }}</div>

                    <q-form @submit.prevent="assinar" class="q-gutter-md">
                        <q-input v-model="form.nome" :label="$t('contrato.nomeCompleto') + ' *'" outlined :rules="[
                            val => !!val || $t('forms.validacoes.campoObrigatorio'),
                            val => val.trim().length >= 3 || $t('forms.validacoes.nomeMinimo')
                        ]">
                            <template v-slot:prepend>
                                <q-icon name="person" />
                            </template>
                        </q-input>

                        <DocumentInput v-model:tipoDocumento="form.tipoDocumento"
                            v-model:numeroDocumento="form.numeroDocumento" />

                        <q-input v-model="form.email" :label="$t('contrato.emailConfirmacao')" type="email" outlined
                            :hint="$t('contrato.emailConfirmacaoHint')" :rules="[
                                val => !val || /.+@.+\..+/.test(val) || $t('forms.validacoes.emailInvalido')
                            ]">
                            <template v-slot:prepend>
                                <q-icon name="email" />
                            </template>
                        </q-input>

                        <!-- Informações de Segurança -->
                        <q-banner class="bg-info text-white" dense>
                            <template v-slot:avatar>
                                <q-icon name="info" />
                            </template>
                            {{ $t('contrato.infoSeguranca') }}
                        </q-banner>

                        <div v-if="dadosCapturados.ip" class="text-caption text-grey-7">
                            <div><strong>IP:</strong> {{ dadosCapturados.ip }}</div>
                            <div v-if="dadosCapturados.geolocation">
                                <strong>{{ $t('contrato.localizacao') }}:</strong>
                                {{ dadosCapturados.geolocation.city }}, {{ dadosCapturados.geolocation.country }}
                            </div>
                        </div>

                        <!-- Termos -->
                        <q-checkbox v-model="form.aceitouTermos" :label="$t('contrato.aceitoTermos')" color="primary" />

                        <div class="row q-gutter-sm">
                            <q-btn :label="$t('contrato.assinarEletronicamente')" type="submit" color="positive"
                                icon="edit" :disable="!podeAssinar" :loading="assinando" class="col" />
                        </div>
                    </q-form>
                </q-card-section>

                <!-- Rodapé com Informações de Segurança -->
                <q-card-section class="bg-grey-3">
                    <div class="text-caption text-grey-8">
                        <q-icon name="lock" size="xs" />
                        {{ $t('contrato.assinaturaSegura') }}
                    </div>
                </q-card-section>
            </div>
        </q-card>
    </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useContratoStore } from '../stores/contrato-store'
import { useQuasar } from 'quasar'
import DocumentInput from '../components/DocumentInput.vue'

const route = useRoute()
const { t, locale } = useI18n()
const $q = useQuasar()
const contratoStore = useContratoStore()

const config = ref(JSON.parse(localStorage.getItem('ecleaner_config') || '{}'))
const loading = ref(true)
const assinando = ref(false)
const assinaturaRealizada = ref(false)
const erro = ref(null)
const contrato = ref(null)

const form = ref({
    nome: '',
    tipoDocumento: 'CPF',
    numeroDocumento: '',
    email: '',
    aceitouTermos: false
})

const dadosCapturados = ref({
    ip: null,
    userAgent: null,
    geolocation: null
})

const podeAssinar = computed(() => {
    return form.value.nome.trim().length >= 3 &&
        form.value.tipoDocumento &&
        form.value.numeroDocumento &&
        form.value.numeroDocumento.length >= 3 &&
        form.value.aceitouTermos
})

const formatarValor = (valor) => {
    return new Intl.NumberFormat(locale.value, {
        style: 'currency',
        currency: locale.value === 'en-US' ? 'USD' : 'BRL'
    }).format(valor || 0)
}

const formatarData = (data) => {
    if (!data) return '-'
    const dataObj = data instanceof Date ? data : new Date(data)
    return dataObj.toLocaleDateString(locale.value)
}

const formatarDataHora = (data) => {
    if (!data) return '-'
    const dataObj = data instanceof Date ? data : new Date(data)
    return dataObj.toLocaleString(locale.value)
}

const capturarIP = async () => {
    try {
        // Tenta capturar IP usando serviço público
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        dadosCapturados.value.ip = data.ip

        // Tenta obter geolocalização (opcional)
        try {
            const geoResponse = await fetch(`https://ipapi.co/${data.ip}/json/`)
            const geoData = await geoResponse.json()
            dadosCapturados.value.geolocation = {
                city: geoData.city,
                region: geoData.region,
                country: geoData.country_name,
                latitude: geoData.latitude,
                longitude: geoData.longitude
            }
        } catch (geoError) {
            console.warn('Não foi possível obter geolocalização:', geoError)
        }
    } catch (error) {
        console.warn('Não foi possível capturar IP:', error)
        dadosCapturados.value.ip = 'unknown'
    }

    // Captura User Agent
    dadosCapturados.value.userAgent = navigator.userAgent
}

const validarToken = async () => {
    try {
        loading.value = true

        // Carrega contratos
        await contratoStore.carregarContratos()

        const contratoId = route.params.id
        const token = route.params.token

        // Busca contrato por token
        const contratoEncontrado = contratoStore.contratos.find(
            c => c.Id === contratoId && c.TokenAssinatura === token
        )

        if (!contratoEncontrado) {
            erro.value = {
                tipo: 'tokenInvalido',
                mensagem: t('contrato.erros.tokenInvalidoDetalhes')
            }
            return
        }

        // Verifica se já está assinado
        if (contratoEncontrado.AssinaturaCliente) {
            assinaturaRealizada.value = true
            contrato.value = contratoEncontrado
            return
        }

        // Verifica se expirou
        const agora = new Date()
        const expiracao = new Date(contratoEncontrado.TokenExpiraEm)

        if (agora > expiracao) {
            erro.value = {
                tipo: 'expirado',
                mensagem: t('contrato.erros.expiradoDetalhes', {
                    data: formatarDataHora(expiracao)
                })
            }
            return
        }

        // Token válido
        contrato.value = contratoEncontrado

    } catch (error) {
        console.error('Erro ao validar token:', error)
        erro.value = {
            tipo: 'erroGenerico',
            mensagem: error.message
        }
    } finally {
        loading.value = false
    }
}

const assinar = async () => {
    try {
        assinando.value = true

        const dadosAssinatura = {
            nome: form.value.nome.trim(),
            tipoDocumento: form.value.tipoDocumento,
            numeroDocumento: form.value.numeroDocumento,
            ip: dadosCapturados.value.ip || 'unknown',
            userAgent: dadosCapturados.value.userAgent,
            geolocation: dadosCapturados.value.geolocation
        }

        await contratoStore.assinarContrato(
            contrato.value.Id,
            'CLIENTE',
            dadosAssinatura
        )

        // Envia email de confirmação se fornecido
        if (form.value.email) {
            dadosAssinatura.email = form.value.email
        }

        assinaturaRealizada.value = true

        $q.notify({
            type: 'positive',
            message: t('contrato.assinaturaRealizadaSucesso'),
            icon: 'check_circle'
        })

    } catch (error) {
        console.error('Erro ao assinar:', error)
        $q.notify({
            type: 'negative',
            message: error.message || t('contrato.erros.erroAoAssinar'),
            icon: 'error'
        })
    } finally {
        assinando.value = false
    }
}

const downloadPDF = async () => {
    try {
        await contratoStore.downloadPDF(contrato.value.Id)
    } catch (error) {
        console.error('Erro ao fazer download:', error)
        $q.notify({
            type: 'negative',
            message: t('contrato.erros.erroDownload'),
            icon: 'error'
        })
    }
}

const solicitarNovoLink = () => {
    $q.notify({
        type: 'info',
        message: t('contrato.entreEmContato'),
        icon: 'info'
    })
}

onMounted(async () => {
    await capturarIP()
    await validarToken()
})
</script>

<style scoped>
.contrato-texto {
    background: #f5f5f5;
    padding: 16px;
    border-radius: 4px;
}
</style>
