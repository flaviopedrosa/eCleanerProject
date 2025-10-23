<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho padrão -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-icon name="inventory" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ isEditMode ? $t('pages.pacoteServico.editarTitle') : $t('pages.pacoteServico.cadastroTitle') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-end">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ $t('pages.pacoteServico.cadastroSubtitle') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Formulário -->
    <q-form @submit.prevent="salvarPacote">
      <!-- Informações básicas -->
      <q-card flat bordered class="q-mb-lg">
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">
            <q-icon name="info" class="q-mr-sm" />
            {{ $t('pages.pacoteServico.sections.informacoesBasicas') }}
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="pacote.Descricao" :label="$t('pages.pacoteServico.fields.descricao')"
                :rules="[rules.required]" filled />
            </div>
            <div class="col-12 col-md-3">
              <q-input v-model.number="pacote.MargemLucro" type="number"
                :label="$t('pages.pacoteServico.fields.margemLucro')" suffix="%"
                :rules="[rules.required, rules.positiveNumber]" @input="onMargemLucroChange" filled />
            </div>
            <div class="col-12 col-md-3 flex items-center">
              <q-btn flat round @click="pacote.Favorito = !pacote.Favorito"
                :icon="pacote.Favorito ? 'favorite' : 'favorite_border'" :color="pacote.Favorito ? 'red' : 'grey-5'"
                size="md" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Seção de Serviços -->
      <q-card flat bordered class="q-mb-lg">
        <q-expansion-item :label="$t('pages.pacoteServico.sections.servicos')" icon="room_service"
          header-class="text-h6">
          <q-card-section>
            <div class="row items-center justify-end q-mb-md">
              <q-btn color="primary" icon="add" size="sm" :label="$t('pages.pacoteServico.buttons.addServico')"
                @click="adicionarServico" />
            </div>

            <div v-if="pacote.ItensServico.length === 0" class="text-center text-grey-6 q-py-lg">
              {{ $t('pages.pacoteServico.messages.noServicos') }}
            </div>

            <div v-for="(item, index) in pacote.ItensServico" :key="index" class="q-mb-md">
              <q-card flat bordered>
                <q-card-section class="row q-col-gutter-md">
                  <div class="col-12 col-md-4">
                    <q-select v-model="item.Servico" :options="servicosFiltrados" option-label="Nome" option-value="Id"
                      :label="$t('pages.pacoteServico.fields.servico')" @update:model-value="onServicoChange" use-input
                      @filter="filterServicos" input-debounce="0" />
                  </div>
                  <div class="col-12 col-md-2">
                    <q-input v-model.number="item.QuantidadeHoras" type="number"
                      :label="$t('pages.pacoteServico.fields.horas')" @input="onQuantidadeChange" />
                  </div>
                  <div class="col-12 col-md-2">
                    <q-input v-model.number="item.QuantidadePessoas" type="number"
                      :label="$t('pages.pacoteServico.fields.pessoas')" @input="onQuantidadeChange" />
                  </div>
                  <div class="col-12 col-md-3">
                    <q-input :model-value="formatCurrencyValue(item.ValorTotal)"
                      :label="$t('pages.pacoteServico.fields.valorTotal')" readonly />
                  </div>
                  <div class="col-12 col-md-1 flex items-center">
                    <q-btn flat round color="negative" icon="delete" @click="removerServico(index)" />
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-card-section>
        </q-expansion-item>
      </q-card>

      <!-- Seção de Materiais -->
      <q-card flat bordered class="q-mb-lg">
        <q-expansion-item :label="$t('pages.pacoteServico.sections.materiais')" icon="cleaning_services"
          header-class="text-h6">
          <q-card-section>
            <div class="row items-center justify-end q-mb-md">
              <q-btn color="primary" icon="add" size="sm" :label="$t('pages.pacoteServico.buttons.addMaterial')"
                @click="adicionarMaterial" />
            </div>

            <div v-if="pacote.ItensMaterial.length === 0" class="text-center text-grey-6 q-py-lg">
              {{ $t('pages.pacoteServico.messages.noMaterials') }}
            </div>

            <div v-for="(item, index) in pacote.ItensMaterial" :key="index" class="q-mb-md">
              <q-card flat bordered>
                <q-card-section class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-select v-model="item.Material" :options="materiaisFiltrados" option-label="Descricao"
                      option-value="Id" :label="$t('pages.pacoteServico.fields.material')"
                      @update:model-value="onMaterialChange" use-input @filter="filterMateriais" input-debounce="0" />
                  </div>
                  <div class="col-12 col-md-3">
                    <q-input v-model.number="item.Quantidade" type="number"
                      :label="$t('pages.pacoteServico.fields.quantidade')" @input="onQuantidadeChange" />
                  </div>
                  <div class="col-12 col-md-2">
                    <q-input :model-value="formatCurrencyValue(item.ValorTotal)"
                      :label="$t('pages.pacoteServico.fields.valorTotal')" readonly />
                  </div>
                  <div class="col-12 col-md-1 flex items-center">
                    <q-btn flat round color="negative" icon="delete" @click="removerMaterial(index)" />
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-card-section>
        </q-expansion-item>
      </q-card>

      <!-- Resumo Financeiro -->
      <q-card flat bordered class="q-mb-lg">
        <q-card-section>
          <div class="text-h6 q-mb-md">{{ $t('pages.pacoteServico.sections.resumo') }}</div>
          <div class="row q-col-gutter-md">
            <div class="col-6 col-md-3">
              <q-input :model-value="formatCurrencyValue(pacote.ValorMaterial)"
                :label="$t('pages.pacoteServico.fields.valorMaterial')" readonly outlined>
                <template v-slot:prepend>
                  <q-icon name="attach_money" />
                </template>
              </q-input>
            </div>
            <div class="col-6 col-md-3">
              <q-input :model-value="formatCurrencyValue(pacote.ValorServico)"
                :label="$t('pages.pacoteServico.fields.valorServico')" readonly outlined>
                <template v-slot:prepend>
                  <q-icon name="attach_money" />
                </template>
              </q-input>
            </div>
            <div class="col-6 col-md-3">
              <q-input :model-value="formatCurrencyValue(pacote.ValorTotal)"
                :label="$t('pages.pacoteServico.fields.valorCusto')" readonly outlined>
                <template v-slot:prepend>
                  <q-icon name="attach_money" />
                </template>
              </q-input>
            </div>
            <div class="col-6 col-md-3">
              <q-input v-model="valorVendaFormatado" :label="$t('pages.pacoteServico.fields.valorVenda')" outlined
                @input="onValorVendaInput" :placeholder="currencyConfig.placeholder">
                <template v-slot:prepend>
                  <q-icon name="attach_money" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Botões de ação -->
      <div class="row justify-end q-mt-lg">
        <q-btn type="submit" color="primary" :label="$t('forms.buttons.save')" />
        <q-btn flat color="secondary" :label="$t('forms.buttons.cancel')" class="q-ml-md" @click="cancelar" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { usePacoteServicoStore } from 'stores/pacote-servico-store'
import { useServicoStore } from 'stores/servico-store'
import { useMaterialStore } from 'stores/material-store'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { formatCurrency, getCurrencyConfig, currencyMask, parseCurrency } from 'src/core/domain/utils/currencyUtils'
import { PacoteServico } from 'src/core/domain/entities/pacoteServico'
import { seedMateriais } from 'src/core/infrastructure/repositories/seeds/materialSeed'

export default defineComponent({
  name: 'PacoteServicoCadastroPage',
  setup() {
    const $q = useQuasar()
    const store = usePacoteServicoStore()
    const servicoStore = useServicoStore()
    const materialStore = useMaterialStore()
    const router = useRouter()
    const route = useRoute()
    const { locale, t } = useI18n()

    const pacote = ref(new PacoteServico('', 30))
    const materiaisDisponiveis = ref([])
    const materiaisFiltrados = ref([])
    const servicosDisponiveis = ref([])
    const servicosFiltrados = ref([])
    const valorVendaFormatado = ref('')
    const isEditingExistingPacote = ref(false)
    const isCalculatingFromMargemLucro = ref(false)
    const isCalculatingFromValorVenda = ref(false)
    const isValorVendaManual = ref(false)

    const currencyConfig = computed(() => getCurrencyConfig(locale.value))
    const isEditMode = computed(() => !!route.params.id)

    const rules = {
      required: val => !!val || 'Campo obrigatório',
      positiveNumber: val => val >= 0 || 'Deve ser um número positivo'
    }

    onMounted(async () => {
      // Carregar dados necessários
      await servicoStore.fetchServicos()
      servicosDisponiveis.value = servicoStore.servicos
      servicosFiltrados.value = servicoStore.servicos

      // Carregar materiais
      await materialStore.loadMateriais()

      // Se não há materiais, executar seed
      if (materialStore.Materiais.length === 0) {
        console.log('🌱 Nenhum material encontrado, executando seed...')
        try {
          await seedMateriais()
          await materialStore.loadMateriais() // Recarregar após seed
          console.log('✅ Seed de materiais executado com sucesso!')
        } catch (error) {
          console.error('❌ Erro ao executar seed de materiais:', error)
        }
      }

      materiaisDisponiveis.value = materialStore.Materiais
      materiaisFiltrados.value = materialStore.Materiais

      // Carregar pacote para edição
      if (route.params.id) {
        const p = store.pacotes.find(p => p.Id === route.params.id)
        if (p) {
          pacote.value = { ...p }
          isEditingExistingPacote.value = true
        }
      }

      // Inicializar valor de venda formatado
      updateValorVendaFormatado()
    })

    function formatCurrencyValue(value) {
      return formatCurrency(value, locale.value, currencyConfig.value.currency)
    }

    // Função para lidar com a entrada do valor de venda
    function onValorVendaInput(value) {
      const masked = currencyMask(value, locale.value, currencyConfig.value.currency)
      valorVendaFormatado.value = masked
      const novoValorVenda = parseCurrency(masked)

      // Atualizar valor de venda
      pacote.value.ValorVenda = novoValorVenda
      isValorVendaManual.value = true

      // Calcular e atualizar margem de lucro se há valor total
      if (pacote.value.ValorTotal > 0) {
        const margemCalculada = ((novoValorVenda - pacote.value.ValorTotal) / pacote.value.ValorTotal) * 100
        pacote.value.MargemLucro = Math.round(Math.max(0, margemCalculada) * 100) / 100

        console.log('Valor Venda:', novoValorVenda, 'Valor Total:', pacote.value.ValorTotal, 'Nova Margem:', pacote.value.MargemLucro)
      }
    }

    // Atualizar valorVendaFormatado quando o pacote for carregado ou recalculado
    function updateValorVendaFormatado() {
      valorVendaFormatado.value = formatCurrencyValue(pacote.value.ValorVenda)
    }

    // Função para lidar com mudanças na margem de lucro
    function onMargemLucroChange() {
      console.log('Margem de lucro alterada para:', pacote.value.MargemLucro)

      isValorVendaManual.value = false // Reset do flag quando margem é alterada
      recalcularValores()
    } function adicionarMaterial() {
      // Criar um item simples sem usar a classe ItemMaterial
      // pois não temos materiais implementados ainda
      const item = {
        Id: Date.now().toString(),
        Material: null,
        Quantidade: 1,
        CustoUnitario: 0,
        ValorTotal: 0,
        Observacao: ''
      }
      pacote.value.ItensMaterial.push(item)
    }

    function removerMaterial(index) {
      pacote.value.ItensMaterial.splice(index, 1)
      recalcularValores()
    }

    function onMaterialChange() {
      // Recalcular valores dos materiais quando um material é selecionado
      pacote.value.ItensMaterial.forEach(item => {
        if (item.Material && item.Material.PrecoUnitario) {
          item.CustoUnitario = item.Material.PrecoUnitario
          item.ValorTotal = item.Quantidade * item.CustoUnitario
        }
      })
      recalcularValores()
    }

    function adicionarServico() {
      // Criar um item simples sem usar a classe ItemServico inicialmente
      const item = {
        Id: Date.now().toString(),
        Servico: null,
        QuantidadeHoras: 1,
        QuantidadePessoas: 1,
        ValorTotal: 0
      }
      pacote.value.ItensServico.push(item)
    }

    function removerServico(index) {
      pacote.value.ItensServico.splice(index, 1)
      recalcularValores()
    }

    function onServicoChange() {
      // Recalcular valores dos serviços quando um serviço é selecionado
      pacote.value.ItensServico.forEach(item => {
        if (item.Servico && item.Servico.Valor) {
          item.ValorTotal = item.QuantidadeHoras * item.QuantidadePessoas * item.Servico.Valor
        }
      })
      recalcularValores()
    }

    function onQuantidadeChange() {
      // Recalcular valores quando quantidades mudarem
      pacote.value.ItensMaterial.forEach(item => {
        if (item.Material && item.Material.PrecoUnitario) {
          item.CustoUnitario = item.Material.PrecoUnitario
          item.ValorTotal = item.Quantidade * item.CustoUnitario
        }
      })

      pacote.value.ItensServico.forEach(item => {
        if (item.Servico && item.Servico.Valor) {
          item.ValorTotal = item.QuantidadeHoras * item.QuantidadePessoas * item.Servico.Valor
        }
      })

      recalcularValores()
    }

    function recalcularValores() {
      // Recalcular valores usando a lógica da entidade
      const pacoteInstance = new PacoteServico(pacote.value.Descricao, pacote.value.MargemLucro)
      pacoteInstance.ItensMaterial = pacote.value.ItensMaterial
      pacoteInstance.ItensServico = pacote.value.ItensServico
      pacoteInstance.recalcularValores()

      pacote.value.ValorMaterial = pacoteInstance.ValorMaterial
      pacote.value.ValorServico = pacoteInstance.ValorServico
      pacote.value.ValorTotal = pacoteInstance.ValorTotal

      // Se valor foi definido manualmente, preservar; senão, usar o calculado
      if (!isValorVendaManual.value) {
        pacote.value.ValorVenda = pacoteInstance.ValorVenda
      }

      // Atualizar valor de venda formatado
      updateValorVendaFormatado()
    }

    async function salvarPacote() {
      try {
        // Para novos pacotes, limpar o ID gerado automaticamente para que o repositório saiba que é novo
        if (!isEditingExistingPacote.value) {
          pacote.value.Id = null
        }

        // Usar a variável que controla se estamos editando um pacote existente
        if (isEditingExistingPacote.value) {
          await store.updatePacote(pacote.value)
        } else {
          await store.addPacote(pacote.value)
        }

        $q.notify({
          type: 'positive',
          message: isEditingExistingPacote.value ? t('messages.updateSuccess') : t('messages.saveSuccess'),
          timeout: 3000,
          position: 'top-right'
        })

        // Aguardar um pouco antes de navegar para mostrar a mensagem
        setTimeout(() => {
          router.push('/pacotes-servicos')
        }, 1500)

      } catch (error) {
        console.error('Erro ao salvar pacote:', error)

        $q.notify({
          type: 'negative',
          message: t('messages.saveError'),
          timeout: 5000,
          position: 'top-right'
        })
      }
    }

    function cancelar() {
      router.push('/pacotes-servicos')
    }

    function filterServicos(val, update) {
      if (val === '') {
        update(() => {
          servicosFiltrados.value = servicosDisponiveis.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        servicosFiltrados.value = servicosDisponiveis.value.filter(v =>
          v.Nome.toLowerCase().indexOf(needle) > -1 ||
          (v.Descricao && v.Descricao.toLowerCase().indexOf(needle) > -1)
        )
      })
    }

    function filterMateriais(val, update) {
      if (val === '') {
        update(() => {
          materiaisFiltrados.value = materiaisDisponiveis.value
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        materiaisFiltrados.value = materiaisDisponiveis.value.filter(v =>
          v.Descricao.toLowerCase().indexOf(needle) > -1 ||
          (v.Unidade && v.Unidade.toLowerCase().indexOf(needle) > -1)
        )
      })
    }

    return {
      pacote,
      materiaisDisponiveis,
      materiaisFiltrados,
      servicosDisponiveis,
      servicosFiltrados,
      valorVendaFormatado,
      currencyConfig,
      isEditMode,
      isEditingExistingPacote,
      isCalculatingFromMargemLucro,
      isCalculatingFromValorVenda,
      isValorVendaManual,
      rules,
      formatCurrencyValue,
      onValorVendaInput,
      onMargemLucroChange,
      updateValorVendaFormatado,
      adicionarMaterial,
      removerMaterial,
      onMaterialChange,
      onQuantidadeChange,
      adicionarServico,
      removerServico,
      onServicoChange,
      recalcularValores,
      salvarPacote,
      cancelar,
      filterServicos,
      filterMateriais
    }
  }
})
</script>

<style lang="sass">
// Estilos específicos se necessário
</style>
