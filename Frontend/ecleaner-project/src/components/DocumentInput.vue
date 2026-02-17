<template>
    <div>
        <q-select v-model="tipoSelecionado" :options="tipoOptions" :label="$t('contrato.tipoDocumento')" emit-value
            map-options outlined dense @update:model-value="onTipoChange" />

        <q-input v-model="numeroFormatado" :label="$t('contrato.numeroDocumento')" :placeholder="placeholder"
            :mask="mask" :rules="[validarDocumentoInput]" outlined dense class="q-mt-sm"
            @update:model-value="onNumeroChange">
            <template v-slot:prepend>
                <q-icon name="badge" />
            </template>
        </q-input>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { TipoDocumento, getTipoDocumentoLabel, getDocumentoPlaceholder, getDocumentoMask } from '../core/domain/enums/tipoDocumento'
import { validarDocumento } from '../core/infrastructure/utils/documentValidator'

const props = defineProps({
    tipoDocumento: {
        type: String,
        default: 'CPF'
    },
    numeroDocumento: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:tipoDocumento', 'update:numeroDocumento'])

const { t, locale } = useI18n()

const tipoSelecionado = ref(props.tipoDocumento)
const numeroFormatado = ref(props.numeroDocumento)

const tipoOptions = computed(() => {
    return Object.values(TipoDocumento).map(tipo => ({
        label: getTipoDocumentoLabel(tipo, locale.value),
        value: tipo
    }))
})

const placeholder = computed(() => {
    return getDocumentoPlaceholder(tipoSelecionado.value, locale.value)
})

const mask = computed(() => {
    return getDocumentoMask(tipoSelecionado.value)
})

const validarDocumentoInput = (val) => {
    if (!val || val.trim() === '') {
        return t('forms.validacoes.campoObrigatorio')
    }

    const valido = validarDocumento(tipoSelecionado.value, val)
    if (!valido) {
        return t('contrato.documentoInvalido')
    }

    return true
}

const onTipoChange = (novoTipo) => {
    emit('update:tipoDocumento', novoTipo)
    numeroFormatado.value = '' // Limpa o número ao trocar tipo
    emit('update:numeroDocumento', '')
}

const onNumeroChange = (novoNumero) => {
    emit('update:numeroDocumento', novoNumero)
}

// Watchers para sincronizar com props
watch(() => props.tipoDocumento, (newVal) => {
    tipoSelecionado.value = newVal
})

watch(() => props.numeroDocumento, (newVal) => {
    numeroFormatado.value = newVal
})
</script>
