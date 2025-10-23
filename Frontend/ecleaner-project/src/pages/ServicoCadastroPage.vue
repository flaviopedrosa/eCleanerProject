<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho da Página -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-btn flat round icon="arrow_back" @click="$router.go(-1)" class="q-mr-md" />
          <q-icon :name="isEditMode ? 'edit' : 'build'" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ isEditMode ? $t('pages.servico.editTitle') : $t('pages.servico.cadastroTitle') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-end">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ $t('pages.servico.cadastroSubtitle') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Formulário de cadastro/edição -->
    <q-form @submit.prevent="salvarServico" class="q-gutter-md">
      <!-- Dados do Serviço -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">
            <q-icon name="build" class="q-mr-sm" />
            {{ $t('forms.servico.sections.serviceData') }}
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="servico.Nome" :label="$t('pages.servico.fields.nome') + ' *'" filled lazy-rules
                :rules="[rules.required]" />
            </div>

            <div class="col-12 col-md-6">
              <q-input v-model="valorFormatado" :label="$t('pages.servico.fields.valor') + ' *'" filled lazy-rules
                :rules="[rules.required]" @input="onValorInput" :placeholder="currencyConfig.placeholder">
                <template v-slot:prepend>
                  <q-icon name="attach_money" />
                </template>
              </q-input>
            </div>

            <div class="col-12 col-md-6">
              <q-select v-model="servico.Unidade" :options="unidadeOptions"
                :label="$t('pages.servico.fields.unidade') + ' *'" filled lazy-rules :rules="[rules.required]"
                emit-value map-options>
                <template v-slot:prepend>
                  <q-icon name="straighten" />
                </template>
              </q-select>
            </div>

            <div class="col-12 col-md-6 flex items-center">
              <q-toggle v-model="servico.Ativo" :label="$t('pages.servico.fields.ativo')" color="primary"
                class="q-mt-md" />
            </div>

            <div class="col-12">
              <q-input v-model="servico.Descricao" type="textarea" :label="$t('pages.servico.fields.descricao') + ' *'"
                filled lazy-rules :rules="[rules.required]" rows="3" />
            </div>

            <div class="col-12">
              <q-input v-model="servico.Observacao" type="textarea" :label="$t('pages.servico.fields.observacao')"
                filled rows="2" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Botões de Ação -->
      <div class="row q-gutter-md justify-end">
        <q-btn flat :label="$t('forms.buttons.cancel')" @click="cancelar" />
        <q-btn color="primary" :label="isEditMode ? $t('buttons.update') : $t('forms.buttons.save')" type="submit"
          :loading="store.loading" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useServicoStore } from 'stores/servico-store'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { currencyMask, parseCurrency, getCurrencyConfig, formatCurrency } from 'src/core/domain/utils/currencyUtils'

export default defineComponent({
  name: 'ServicoCadastroPage',
  setup() {
    const store = useServicoStore()
    const router = useRouter()
    const route = useRoute()
    const { locale } = useI18n()

    const servico = ref({
      Id: null,
      Nome: '',
      Valor: 0,
      Descricao: '',
      Unidade: 'Unidade',
      Observacao: '',
      Ativo: true
    })
    const valorFormatado = ref('')

    // Computed properties
    const isEditMode = computed(() => !!route.params.id)
    const currencyConfig = computed(() => getCurrencyConfig(locale.value))

    const unidadeOptions = [
      { label: 'Unidade', value: 'Unidade' },
      { label: 'Hora', value: 'Hora' },
      { label: 'Metro Quadrado (m²)', value: 'Metro Quadrado' },
      { label: 'Metro Linear (m)', value: 'Metro Linear' },
      { label: 'Dia', value: 'Dia' },
      { label: 'Projeto', value: 'Projeto' },
      { label: 'Pacote', value: 'Pacote' },
      { label: 'Cômodo', value: 'Cômodo' },
      { label: 'Casa', value: 'Casa' },
      { label: 'Apartamento', value: 'Apartamento' }
    ]

    const rules = {
      required: val => !!val || 'Campo obrigatório'
    }

    // Função para lidar com a entrada do valor
    function onValorInput(value) {
      const masked = currencyMask(value, locale.value, currencyConfig.value.currency)
      valorFormatado.value = masked
      servico.value.Valor = parseCurrency(masked)
    }

    onMounted(() => {
      if (route.params.id) {
        const s = store.servicos.find(s => s.Id === route.params.id)
        if (s) {
          servico.value = { ...s }
          valorFormatado.value = formatCurrency(s.Valor, locale.value, currencyConfig.value.currency)
        }
      }
    })

    async function salvarServico() {
      if (servico.value.Id) {
        await store.updateServico(servico.value)
      } else {
        await store.addServico(servico.value)
      }
      router.push('/servicos')
    }

    function cancelar() {
      router.push('/servicos')
    }

    return {
      store,
      servico,
      valorFormatado,
      isEditMode,
      currencyConfig,
      unidadeOptions,
      rules,
      salvarServico,
      cancelar,
      onValorInput
    }
  }
})
</script>

<style lang="sass">
// ...estilos específicos se necessário
</style>
