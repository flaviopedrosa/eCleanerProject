<template>
  <q-dialog v-model="dialogVisible" persistent>
    <q-card style="min-width: 500px">
      <q-card-section class="row items-center">
        <q-icon name="category" size="2rem" class="text-primary q-mr-md" />
        <div class="text-h6">
          {{ isEditMode ? $t('pages.material.editTitle') : $t('pages.material.newTitle') }}
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator />

      <q-form @submit="salvar">
        <q-card-section class="q-gutter-md">

          <q-input v-model="formData.Descricao" :label="$t('pages.material.fields.descricao') + ' *'" filled autofocus
            :rules="[val => !!val || $t('forms.validation.required')]" />

          <div class="row q-col-gutter-md">
            <div class="col-6">
              <q-input v-model="formData.Unidade" :label="$t('pages.material.fields.unidade') + ' *'" filled
                :rules="[val => !!val || $t('forms.validation.required')]" placeholder="kg, L, un, m²..." />
            </div>
            <div class="col-6">
              <q-input v-model.number="formData.PrecoUnitario" :label="$t('pages.material.fields.precoUnitario') + ' *'"
                filled type="number" min="0" step="0.01" prefix="R$" :rules="[
                  val => val >= 0 || $t('forms.validation.positiveNumber'),
                  val => !!val || $t('forms.validation.required')
                ]" />
            </div>
          </div>

          <q-input v-model="formData.Url" :label="$t('pages.material.fields.url')" filled type="url"
            placeholder="https://exemplo.com/produto" />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="q-pa-md">
          <q-btn :label="$t('forms.buttons.cancel')" color="grey" flat v-close-popup />
          <q-btn :label="$t('forms.buttons.save')" color="primary" type="submit" :loading="loading" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue'

export default defineComponent({
  name: 'MaterialCadastroDialog',

  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    material: {
      type: Object,
      default: null
    }
  },

  emits: ['update:modelValue', 'salvar'],

  setup(props, { emit }) {
    // Estado do formulário
    const formData = ref({
      Id: null,
      Descricao: '',
      Unidade: '',
      PrecoUnitario: 0,
      Url: '',
      Imagem: ''
    })

    const loading = ref(false)

    // Computed properties
    const dialogVisible = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })

    const isEditMode = computed(() => !!formData.value.Id)

    // Watchers
    watch(() => props.material, (val) => {
      if (val) {
        formData.value = { ...val }
      } else {
        formData.value = {
          Id: null,
          Descricao: '',
          Unidade: '',
          PrecoUnitario: 0,
          Url: '',
          Imagem: ''
        }
      }
    }, { immediate: true })

    // Métodos
    function salvar() {
      loading.value = true
      try {
        emit('salvar', { ...formData.value })
      } finally {
        loading.value = false
      }
    }

    return {
      // Estado
      formData,
      loading,

      // Computed
      dialogVisible,
      isEditMode,

      // Métodos
      salvar
    }
  }
})
</script>
