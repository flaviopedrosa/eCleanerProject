<template>
    <q-badge :color="getColor(status)" :label="getLabel(status)" :icon="getIcon(status)" text-color="white"
        class="q-px-sm q-py-xs" />
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getStatusColor, getStatusIcon } from '../core/domain/enums/statusContrato'

defineProps({
    status: {
        type: String,
        required: true
    }
})

const { t } = useI18n()

const getColor = computed(() => (status) => {
    return getStatusColor(status)
})

const getIcon = computed(() => (status) => {
    return getStatusIcon(status)
})

const getLabel = computed(() => (status) => {
    const labels = {
        RASCUNHO: t('contrato.status.rascunho'),
        AGUARDANDO_ASSINATURA: t('contrato.status.aguardandoAssinatura'),
        ASSINADO_CLIENTE: t('contrato.status.assinadoCliente'),
        VIGENTE: t('contrato.status.vigente'),
        CANCELADO: t('contrato.status.cancelado'),
        EXPIRADO: t('contrato.status.expirado')
    }
    return labels[status] || status
})
</script>
