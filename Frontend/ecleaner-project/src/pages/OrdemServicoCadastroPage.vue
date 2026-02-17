<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-btn flat round icon="arrow_back" @click="$router.go(-1)" class="q-mr-md" />
          <q-icon name="assignment_turned_in" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ modoEdicao ? $t('forms.ordemServico.editTitle') : $t('forms.ordemServico.viewTitle') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
      </div>
      <div class="col-auto"
        v-if="!modoEdicao && ordemServico && ordemServico.Status !== 'CONCLUIDA' && ordemServico.Status !== 'CANCELADA'">
        <q-btn color="primary" icon="edit" :label="$t('buttons.edit')" @click="habilitarEdicao" />
      </div>
    </div>

    <div v-if="ordemServico">
      <q-form @submit="salvarOrdemServico">
        <!-- Informações Básicas -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-md">
              <q-icon name="info" class="q-mr-sm" />
              {{ $t('forms.ordemServico.sections.basicInfo') }}
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-4">
                <div class="text-caption text-grey-7">{{ $t('forms.ordemServico.fields.numeroOS') }}
                </div>
                <div class="text-h6 text-primary">{{ ordemServico.NumeroOS }}</div>
              </div>

              <div class="col-12 col-md-4">
                <div class="text-caption text-grey-7">{{ $t('forms.ordemServico.fields.status') }}</div>
                <q-badge :color="getStatusColor(ordemServico.Status)"
                  :label="$t(`enums.statusOrdemServico.${ordemServico.Status}`)" class="q-mt-xs" />
              </div>

              <div class="col-12 col-md-4">
                <div class="text-caption text-grey-7">{{ $t('forms.ordemServico.linkedBudget') }}</div>
                <q-btn flat dense color="primary" icon="receipt"
                  :label="`#${orcamentoVinculado?.NumeroOrcamento || '-'}`" @click="verOrcamento"
                  v-if="orcamentoVinculado" size="sm" class="q-mt-xs" />
                <div v-else class="text-body2 q-mt-xs">-</div>
              </div>

              <div class="col-12 col-md-4">
                <div class="text-caption text-grey-7">{{ $t('forms.ordemServico.fields.dataCriacao') }}
                </div>
                <div class="text-body1">{{ formatarData(ordemServico.DataCriacao) }}</div>
              </div>

              <div class="col-12 col-md-4" v-if="ordemServico.DataInicio">
                <div class="text-caption text-grey-7">{{ $t('forms.ordemServico.fields.dataInicio') }}
                </div>
                <div class="text-body1">{{ formatarData(ordemServico.DataInicio) }}</div>
              </div>

              <div class="col-12 col-md-4" v-if="ordemServico.DataConclusao">
                <div class="text-caption text-grey-7">{{ $t('forms.ordemServico.fields.dataConclusao')
                  }}
                </div>
                <div class="text-body1">{{ formatarData(ordemServico.DataConclusao) }}</div>
              </div>

              <div class="col-12">
                <q-input v-if="modoEdicao" v-model="form.Observacoes"
                  :label="$t('forms.ordemServico.fields.observacoes')" type="textarea" filled rows="3" />
                <div v-else-if="ordemServico.Observacoes">
                  <div class="text-caption text-grey-7">{{ $t('forms.ordemServico.fields.observacoes')
                    }}</div>
                  <div class="text-body1">{{ ordemServico.Observacoes }}</div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Planejamento e Equipe -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-md">
              <q-icon name="schedule" class="q-mr-sm" />
              Planejamento e Equipe
            </div>

            <div class="row q-col-gutter-md">
              <!-- Equipe -->
              <div class="col-12 col-md-6">
                <q-select v-if="modoEdicao" v-model="form.IdEquipe" :options="equipes" option-value="Id"
                  option-label="Descricao" emit-value map-options label="Equipe" filled clearable>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Nenhuma equipe cadastrada
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <div v-else>
                  <div class="text-caption text-grey-7">Equipe</div>
                  <div class="text-body1">{{ getNomeEquipe(ordemServico.IdEquipe) || '-' }}</div>
                </div>
              </div>

              <!-- Duração em Horas -->
              <div class="col-12 col-md-6">
                <q-input v-if="modoEdicao" v-model.number="form.DuracaoHoras" label="Duração (horas)" filled
                  type="number" min="0" step="0.5">
                  <template v-slot:prepend>
                    <q-icon name="schedule" />
                  </template>
                </q-input>
                <div v-else-if="ordemServico.DuracaoHoras">
                  <div class="text-caption text-grey-7">Duração (horas)</div>
                  <div class="text-body1">{{ ordemServico.DuracaoHoras }}h</div>
                </div>
              </div>

              <!-- Início Previsto -->
              <div class="col-12 col-md-6">
                <q-input v-if="modoEdicao" v-model="form.InicioPrevisto" label="Início Previsto" filled
                  type="datetime-local" :rules="[validarDataFutura]" lazy-rules />
                <div v-else-if="ordemServico.InicioPrevisto">
                  <div class="text-caption text-grey-7">Início Previsto</div>
                  <div class="text-body1">{{ formatarDataHora(ordemServico.InicioPrevisto) }}</div>
                </div>
              </div>

              <!-- Fim Previsto -->
              <div class="col-12 col-md-6">
                <q-input v-if="modoEdicao" v-model="form.FimPrevisto" label="Fim Previsto" filled type="datetime-local"
                  :rules="[validarDataFutura]" lazy-rules />
                <div v-else-if="ordemServico.FimPrevisto">
                  <div class="text-caption text-grey-7">Fim Previsto</div>
                  <div class="text-body1">{{ formatarDataHora(ordemServico.FimPrevisto) }}</div>
                </div>
              </div>

              <!-- Início Real -->
              <div class="col-12 col-md-6">
                <q-input v-if="modoEdicao" v-model="form.InicioReal" label="Início Real" filled type="datetime-local" />
                <div v-else-if="ordemServico.InicioReal">
                  <div class="text-caption text-grey-7">Início Real</div>
                  <div class="text-body1">{{ formatarDataHora(ordemServico.InicioReal) }}</div>
                </div>
              </div>

              <!-- Fim Real -->
              <div class="col-12 col-md-6">
                <q-input v-if="modoEdicao" v-model="form.FimReal" label="Fim Real" filled type="datetime-local" />
                <div v-else-if="ordemServico.FimReal">
                  <div class="text-caption text-grey-7">Fim Real</div>
                  <div class="text-body1">{{ formatarDataHora(ordemServico.FimReal) }}</div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Cliente -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-md">
              <q-icon name="person" class="q-mr-sm" />
              {{ $t('forms.ordemServico.sections.client') }}
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <div class="text-caption text-grey-7">Nome</div>
                <div class="text-body1">{{ ordemServico.Cliente.Nome }} {{
                  ordemServico.Cliente.Sobrenome }}
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="text-caption text-grey-7">E-mail</div>
                <div class="text-body1">{{ ordemServico.Cliente.Email || '-' }}</div>
              </div>

              <div class="col-12 col-md-6">
                <div class="text-caption text-grey-7">Telefone</div>
                <div class="text-body1">{{ ordemServico.Cliente.Telefone || '-' }}</div>
              </div>

              <div class="col-12 col-md-6">
                <div class="text-caption text-grey-7">Documento</div>
                <div class="text-body1">{{ ordemServico.Cliente.Documento || '-' }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Itens -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-md">
              <q-icon name="list_alt" class="q-mr-sm" />
              {{ $t('forms.ordemServico.sections.items') }}
            </div>

            <q-table :rows="modoEdicao ? form.Itens : ordemServico.Itens" :columns="itensColumns" row-key="Id" flat
              bordered hide-pagination :rows-per-page-options="[0]">
              <template v-slot:body-cell-Descricao="props">
                <q-td :props="props">
                  <q-input v-if="modoEdicao" v-model="props.row.Descricao" dense borderless />
                  <div v-else class="text-weight-medium">{{ props.value }}</div>
                </q-td>
              </template>

              <template v-slot:body-cell-Quantidade="props">
                <q-td :props="props">
                  <q-input v-if="modoEdicao" v-model.number="props.row.Quantidade" type="number" dense borderless
                    min="1" step="0.01" />
                  <div v-else>{{ props.value }}</div>
                </q-td>
              </template>

              <template v-slot:body-cell-Custo="props">
                <q-td :props="props">
                  <q-input v-if="modoEdicao" v-model.number="props.row.Custo" type="number" dense borderless min="0"
                    step="0.01" prefix="R$" />
                  <div v-else>{{ formatarMoeda(props.value) }}</div>
                </q-td>
              </template>

              <template v-slot:body-cell-Subtotal="props">
                <q-td :props="props">
                  {{ formatarMoeda(calcularSubtotalItem(props.row)) }}
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>

        <!-- Resumo Financeiro -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="text-h6 text-primary q-mb-md">
              <q-icon name="calculate" class="q-mr-sm" />
              {{ $t('forms.ordemServico.sections.financialSummary') }}
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-4">
                <div class="text-caption text-grey-7">Subtotal</div>
                <div class="text-h6">{{ formatarMoeda(calcularSubtotalForm()) }}</div>
              </div>

              <div class="col-12 col-md-4">
                <q-input v-if="modoEdicao" v-model.number="form.Descontos" label="Desconto" type="number" filled min="0"
                  step="0.01" prefix="R$" />
                <div v-else>
                  <div class="text-caption text-grey-7">Desconto</div>
                  <div class="text-h6 text-negative">-{{ formatarMoeda(ordemServico.Descontos) }}
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-4">
                <div class="text-caption text-grey-7">{{ $t('forms.ordemServico.fields.valorTotal') }}
                </div>
                <div class="text-h5 text-primary text-weight-bold">{{
                  formatarMoeda(calcularTotalForm()) }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Botões de Ação -->
        <div class="row q-gutter-md justify-end">
          <q-btn v-if="modoEdicao" flat :label="$t('buttons.cancel')" @click="cancelarEdicao" />
          <q-btn v-if="modoEdicao" color="primary" icon="save" type="submit" :label="$t('buttons.save')"
            :loading="loading" />

          <template v-if="!modoEdicao">
            <q-btn flat :label="$t('buttons.cancel')" @click="$router.go(-1)" />
            <q-btn v-if="ordemServico.Status === 'ABERTA'" color="positive" icon="play_arrow"
              :label="$t('forms.ordemServico.buttons.iniciar')" @click="iniciarOrdem" :loading="loading" />
            <q-btn v-if="ordemServico.Status === 'EM_ANDAMENTO'" color="positive" icon="check"
              :label="$t('forms.ordemServico.buttons.concluir')" @click="concluirOrdem" :loading="loading" />
            <q-btn v-if="ordemServico.Status !== 'CONCLUIDA' && ordemServico.Status !== 'CANCELADA'" color="negative"
              icon="close" :label="$t('forms.ordemServico.buttons.cancelar')" @click="cancelarOrdem"
              :loading="loading" />
          </template>
        </div>
      </q-form>
    </div>

    <div v-else class="text-center q-pa-xl">
      <q-spinner-dots size="50px" color="primary" />
      <div class="text-grey-7 q-mt-md">Carregando...</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { useOrdemServicoStore } from '@/stores/ordem-servico-store'
import { useOrcamentoStore } from '@/stores/orcamento-store'
import { formatDateForLocale } from '@/core/utils/dateValidation'
import { EquipeRepository } from '@/core/infrastructure/repositories/equipeRepository'

export default defineComponent({
  name: 'OrdemServicoCadastroPage',

  setup() {
    const router = useRouter()
    const route = useRoute()
    const { t, locale } = useI18n()
    const $q = useQuasar()
    const store = useOrdemServicoStore()
    const orcamentoStore = useOrcamentoStore()
    const equipeRepository = new EquipeRepository()

    const ordemServico = ref(null)
    const orcamentoVinculado = ref(null)
    const equipes = ref([])
    const loading = ref(false)
    const modoEdicao = ref(false)
    const form = ref({
      Itens: [],
      Observacoes: '',
      Descontos: 0,
      IdEquipe: null,
      InicioPrevisto: null,
      FimPrevisto: null,
      InicioReal: null,
      FimReal: null
    })

    const itensColumns = computed(() => [
      {
        name: 'Descricao',
        label: 'Descrição',
        align: 'left',
        field: 'Descricao'
      },
      {
        name: 'Quantidade',
        label: 'Qtd',
        align: 'center',
        field: 'Quantidade'
      },
      {
        name: 'Unidade',
        label: 'Un',
        align: 'center',
        field: 'Unidade'
      },
      {
        name: 'Custo',
        label: 'Valor Unit.',
        align: 'right',
        field: 'Custo'
      },
      {
        name: 'Subtotal',
        label: 'Subtotal',
        align: 'right'
      }
    ])

    function getStatusColor(status) {
      const colors = {
        ABERTA: 'blue',
        EM_ANDAMENTO: 'orange',
        CONCLUIDA: 'green',
        CANCELADA: 'red'
      }
      return colors[status] || 'grey'
    }

    function formatarData(data) {
      if (!data) return '-'
      return formatDateForLocale(data, locale.value)
    }

    function formatarDataHora(data) {
      if (!data) return '-'
      const date = data instanceof Date ? data : new Date(data)
      return new Intl.DateTimeFormat(locale.value, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date)
    }

    function getNomeEquipe(idEquipe) {
      if (!idEquipe) return null
      const equipe = equipes.value.find(e => e.Id === idEquipe)
      return equipe ? equipe.Descricao : null
    }

    function formatarMoeda(valor) {
      return new Intl.NumberFormat(locale.value, {
        style: 'currency',
        currency: 'BRL'
      }).format(valor || 0)
    }

    function calcularSubtotalItem(item) {
      return (item.Custo || 0) * (item.Quantidade || 1)
    }

    function calcularSubtotalForm() {
      if (!form.value.Itens || !Array.isArray(form.value.Itens)) return 0
      return form.value.Itens.reduce((total, item) => {
        return total + calcularSubtotalItem(item)
      }, 0)
    }

    function calcularTotalForm() {
      const subtotal = calcularSubtotalForm()
      const descontos = form.value.Descontos || 0
      const impostos = ordemServico.value?.ImpostosTaxas || 0
      return subtotal - descontos + impostos
    }

    function validarDataFutura(val) {
      if (!val) return true
      const dataSelecionada = new Date(val)
      const agora = new Date()
      if (dataSelecionada <= agora) {
        return t('forms.ordemServico.validations.dataMaiorQueAtual')
      }
      return true
    }

    function habilitarEdicao() {
      modoEdicao.value = true
      // Clonar os dados para o formulário
      form.value = {
        Itens: JSON.parse(JSON.stringify(ordemServico.value.Itens || [])),
        Observacoes: ordemServico.value.Observacoes || '',
        Descontos: ordemServico.value.Descontos || 0,
        IdEquipe: ordemServico.value.IdEquipe || null,
        InicioPrevisto: ordemServico.value.InicioPrevisto ? formatarDataParaInput(ordemServico.value.InicioPrevisto) : null,
        FimPrevisto: ordemServico.value.FimPrevisto ? formatarDataParaInput(ordemServico.value.FimPrevisto) : null,
        InicioReal: ordemServico.value.InicioReal ? formatarDataParaInput(ordemServico.value.InicioReal) : null,
        FimReal: ordemServico.value.FimReal ? formatarDataParaInput(ordemServico.value.FimReal) : null,
        DuracaoHoras: ordemServico.value.DuracaoHoras || null
      }
    }

    function formatarDataParaInput(data) {
      if (!data) return null
      const date = data instanceof Date ? data : new Date(data)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${year}-${month}-${day}T${hours}:${minutes}`
    }

    function cancelarEdicao() {
      modoEdicao.value = false
      form.value = {
        Itens: [],
        Observacoes: '',
        Descontos: 0,
        IdEquipe: null,
        InicioPrevisto: null,
        FimPrevisto: null,
        InicioReal: null,
        FimReal: null,
        DuracaoHoras: null
      }
    }

    async function salvarOrdemServico() {
      try {
        loading.value = true

        // Atualizar os dados da ordem de serviço
        ordemServico.value.Itens = form.value.Itens
        ordemServico.value.Observacoes = form.value.Observacoes
        ordemServico.value.Descontos = form.value.Descontos
        ordemServico.value.IdEquipe = form.value.IdEquipe
        ordemServico.value.InicioPrevisto = form.value.InicioPrevisto ? new Date(form.value.InicioPrevisto) : null
        ordemServico.value.FimPrevisto = form.value.FimPrevisto ? new Date(form.value.FimPrevisto) : null
        ordemServico.value.InicioReal = form.value.InicioReal ? new Date(form.value.InicioReal) : null
        ordemServico.value.FimReal = form.value.FimReal ? new Date(form.value.FimReal) : null
        ordemServico.value.DuracaoHoras = form.value.DuracaoHoras || null

        await store.updateOrdemServico(ordemServico.value)

        $q.notify({
          type: 'positive',
          message: t('forms.ordemServico.messages.updateSuccess'),
          timeout: 3000,
          position: 'top-right'
        })

        modoEdicao.value = false
      } catch (error) {
        console.error('Erro ao salvar ordem:', error)
        $q.notify({
          type: 'negative',
          message: t('forms.ordemServico.messages.saveError'),
          timeout: 5000,
          position: 'top-right'
        })
      } finally {
        loading.value = false
      }
    }

    function verOrcamento() {
      if (orcamentoVinculado.value) {
        router.push(`/orcamentos/${orcamentoVinculado.value.Id}`)
      }
    }

    async function iniciarOrdem() {
      $q.dialog({
        title: t('forms.ordemServico.confirmIniciar.title'),
        message: t('forms.ordemServico.confirmIniciar.message'),
        cancel: {
          label: t('buttons.cancel'),
          flat: true
        },
        ok: {
          label: t('forms.ordemServico.buttons.iniciar'),
          color: 'positive'
        }
      }).onOk(async () => {
        try {
          loading.value = true
          await store.iniciarOrdemServico(ordemServico.value.Id)
          ordemServico.value.Status = 'EM_ANDAMENTO'
          ordemServico.value.DataInicio = new Date()
          $q.notify({
            type: 'positive',
            message: t('forms.ordemServico.messages.iniciarSuccess'),
            timeout: 3000,
            position: 'top-right'
          })
        } catch (error) {
          $q.notify({
            type: 'negative',
            message: t('forms.ordemServico.messages.iniciarError', { error: error.message }),
            timeout: 5000,
            position: 'top-right'
          })
        } finally {
          loading.value = false
        }
      })
    }

    async function concluirOrdem() {
      $q.dialog({
        title: t('forms.ordemServico.confirmConcluir.title'),
        message: t('forms.ordemServico.confirmConcluir.message'),
        cancel: {
          label: t('buttons.cancel'),
          flat: true
        },
        ok: {
          label: t('forms.ordemServico.buttons.concluir'),
          color: 'positive'
        }
      }).onOk(async () => {
        try {
          loading.value = true
          await store.concluirOrdemServico(ordemServico.value.Id)
          ordemServico.value.Status = 'CONCLUIDA'
          ordemServico.value.DataConclusao = new Date()
          $q.notify({
            type: 'positive',
            message: t('forms.ordemServico.messages.concluirSuccess'),
            timeout: 3000,
            position: 'top-right'
          })
        } catch (error) {
          $q.notify({
            type: 'negative',
            message: t('forms.ordemServico.messages.concluirError', { error: error.message }),
            timeout: 5000,
            position: 'top-right'
          })
        } finally {
          loading.value = false
        }
      })
    }

    async function cancelarOrdem() {
      $q.dialog({
        title: t('forms.ordemServico.confirmCancelar.title'),
        message: t('forms.ordemServico.confirmCancelar.message'),
        cancel: {
          label: t('buttons.cancel'),
          flat: true
        },
        ok: {
          label: t('forms.ordemServico.buttons.cancelar'),
          color: 'negative'
        },
        prompt: {
          model: '',
          type: 'text',
          label: t('forms.ordemServico.confirmCancelar.motivoLabel')
        }
      }).onOk(async (motivo) => {
        try {
          loading.value = true
          await store.cancelarOrdemServico(ordemServico.value.Id, motivo)
          ordemServico.value.Status = 'CANCELADA'
          ordemServico.value.Observacoes = motivo ? `Cancelada: ${motivo}` : 'Cancelada'
          $q.notify({
            type: 'positive',
            message: t('forms.ordemServico.messages.cancelarSuccess'),
            timeout: 3000,
            position: 'top-right'
          })
        } catch (error) {
          $q.notify({
            type: 'negative',
            message: t('forms.ordemServico.messages.cancelarError', { error: error.message }),
            timeout: 5000,
            position: 'top-right'
          })
        } finally {
          loading.value = false
        }
      })
    }

    onMounted(async () => {
      try {
        await store.loadOrdensServico()
        await orcamentoStore.loadOrcamentos()

        // Carregar equipes disponíveis
        equipes.value = await equipeRepository.getAll()

        const id = route.params.id
        ordemServico.value = store.ordensServico.find(o => o.Id === id)

        if (!ordemServico.value) {
          $q.notify({
            type: 'negative',
            message: t('forms.ordemServico.notFound'),
            timeout: 3000,
            position: 'top-right'
          })
          router.push('/ordens-servico')
          return
        }

        // Buscar orçamento vinculado
        if (ordemServico.value.IdOrcamento) {
          orcamentoVinculado.value = orcamentoStore.orcamentos.find(
            o => o.Id === ordemServico.value.IdOrcamento
          )
        }

        // Ativar modo de edição se vier do parâmetro de query
        if (route.query.edit === 'true' &&
          ordemServico.value.Status !== 'CONCLUIDA' &&
          ordemServico.value.Status !== 'CANCELADA') {
          habilitarEdicao()
        }
      } catch (error) {
        console.error('Erro ao carregar ordem de serviço:', error)
        $q.notify({
          type: 'negative',
          message: t('forms.ordemServico.messages.loadError'),
          timeout: 3000,
          position: 'top-right'
        })
      }
    })

    // Calcular FimPrevisto automaticamente quando InicioPrevisto ou DuracaoHoras mudar
    watch(
      () => [form.value.InicioPrevisto, form.value.DuracaoHoras],
      ([inicioPrevisto, duracaoHoras]) => {
        if (modoEdicao.value && inicioPrevisto && duracaoHoras && duracaoHoras > 0) {
          const dataInicio = new Date(inicioPrevisto)
          const dataFim = new Date(dataInicio.getTime() + duracaoHoras * 60 * 60 * 1000)

          // Formatar para datetime-local input
          const year = dataFim.getFullYear()
          const month = String(dataFim.getMonth() + 1).padStart(2, '0')
          const day = String(dataFim.getDate()).padStart(2, '0')
          const hours = String(dataFim.getHours()).padStart(2, '0')
          const minutes = String(dataFim.getMinutes()).padStart(2, '0')

          form.value.FimPrevisto = `${year}-${month}-${day}T${hours}:${minutes}`
        }
      }
    )

    return {
      ordemServico,
      orcamentoVinculado,
      equipes,
      loading,
      modoEdicao,
      form,
      itensColumns,
      getStatusColor,
      formatarData,
      formatarDataHora,
      formatarMoeda,
      getNomeEquipe,
      calcularSubtotalItem,
      calcularSubtotalForm,
      calcularTotalForm,
      validarDataFutura,
      habilitarEdicao,
      cancelarEdicao,
      salvarOrdemServico,
      verOrcamento,
      iniciarOrdem,
      concluirOrdem,
      cancelarOrdem
    }
  }
})
</script>

<style lang="sass" scoped>
.accent-divider
  height: 2px
  background: $accent
  width: 100%
</style>
