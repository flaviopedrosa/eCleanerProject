<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6 text-primary q-mb-md">
        <q-icon name="place" class="q-mr-sm" /> Endereço da Empresa
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-8">
          <q-input v-model="localValue.logradouro" label="Logradouro" filled :readonly="readonly" />
        </div>
        <div class="col-12 col-md-4">
          <q-input v-model="localValue.numero" label="Número" filled :readonly="readonly" />
        </div>
        <div class="col-12 col-md-6">
          <q-input v-model="localValue.complemento" label="Complemento" filled :readonly="readonly" />
        </div>
        <div class="col-12 col-md-6">
          <q-input v-model="localValue.bairro" label="Bairro" filled :readonly="readonly" />
        </div>
        <div class="col-12 col-md-6">
          <q-input v-model="localValue.cidade" label="Cidade" filled :readonly="readonly" />
        </div>
        <div class="col-12 col-md-3">
          <q-input v-model="localValue.estado" label="Estado" filled :readonly="readonly" />
        </div>
        <div class="col-12 col-md-3">
          <q-input v-model="localValue.cep" label="CEP" filled :readonly="readonly" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineProps, defineEmits, watch, reactive } from 'vue'
const props = defineProps({
  modelValue: { type: Object, required: true },
  readonly: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])

// Usar uma cópia reativa local para evitar mutação direta da prop
const localValue = reactive({ ...props.modelValue })

watch(() => props.modelValue, (val) => {
  // Atualizar cópia local quando prop mudar
  Object.assign(localValue, val || {})
}, { deep: true })

watch(localValue, (val) => {
  // Emitir alterações para o pai
  emit('update:modelValue', { ...val })
}, { deep: true })
</script>
