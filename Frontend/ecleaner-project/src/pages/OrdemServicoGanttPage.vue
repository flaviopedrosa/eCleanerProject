<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-icon name="view_timeline" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            Visualização Gantt - Ordens de Serviço
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
      </div>
      <div class="col-auto">
        <q-btn color="primary" icon="refresh" label="Atualizar" flat @click="carregarDados" />
      </div>
    </div>

    <!-- Filtros e Controles -->
    <div class="row q-mb-md q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card flat bordered class="control-card">
          <q-card-section>
            <div class="text-subtitle2 q-mb-md text-weight-medium">
              <q-icon name="filter_alt" size="20px" class="q-mr-xs" />
              Filtros
            </div>
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-select v-model="equipeSelecionada" :options="equipesOptions" label="Filtrar por Equipe" filled
                  clearable emit-value map-options dense>
                  <template v-slot:prepend>
                    <q-icon name="groups" />
                  </template>
                </q-select>
              </div>
              <div class="col-6">
                <q-select v-model="statusSelecionado" :options="statusOptions" label="Status" filled clearable
                  emit-value map-options dense>
                  <template v-slot:prepend>
                    <q-icon name="filter_list" />
                  </template>
                </q-select>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-3">
        <q-card flat bordered class="control-card">
          <q-card-section>
            <div class="text-subtitle2 q-mb-md text-weight-medium">
              <q-icon name="visibility" size="20px" class="q-mr-xs" />
              Visualização
            </div>
            <q-btn-toggle v-model="precision" :options="precisionOptions" toggle-color="primary" flat dense spread
              class="full-width" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-3">
        <q-card flat bordered class="control-card">
          <q-card-section>
            <div class="text-subtitle2 q-mb-md text-weight-medium">
              <q-icon name="navigation" size="20px" class="q-mr-xs" />
              Navegação
            </div>
            <div class="row items-center justify-center q-mt-sm">
              <q-btn-group flat>
                <q-btn flat icon="chevron_left" label="Anterior" @click="navegarAnterior" color="primary" />
                <q-btn flat icon="today" label="Dia" color="secondary">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale" ref="datePopup">
                    <q-date v-model="dataSelecionada" mask="YYYY/MM/DD" minimal @update:model-value="onDateSelected">
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn label="Hoje" color="primary" flat @click="irParaHoje" />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-btn>
                <q-btn flat icon="chevron_right" label="Próximo" @click="navegarProximo" color="primary" />
              </q-btn-group>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="row justify-center q-pa-xl">
      <q-spinner-dots color="primary" size="50px" />
    </div>

    <!-- Gantt Chart -->
    <q-card v-else flat bordered>
      <q-card-section class="q-pa-none">
        <gantt-chart :rows="ganttRows" :start-date="chartStart" :end-date="chartEnd" :precision="precision"
          :zoom-level="currentZoom" :row-label-width="rowLabelWidth" @bar-click="onBarClick"
          @bar-updated="onBarUpdated" />
      </q-card-section>

      <!-- Painel de Detalhes da Ordem -->
      <q-slide-transition>
        <q-card-section v-if="ordemSelecionada" class="q-pa-md"
          style="background: #f5f5f5; border-top: 2px solid #2196F3">
          <div class="row items-center q-mb-md">
            <div class="col">
              <div class="text-h6 text-primary">
                <q-icon name="assignment" class="q-mr-sm" />
                {{ ordemSelecionada.NumeroOS }}
              </div>
              <div class="text-caption text-grey-7">
                {{ ordemSelecionada.Cliente?.Nome || 'N/A' }}
              </div>
            </div>
            <div class="col-auto">
              <q-btn unelevated color="primary" icon="edit" label="Editar Ordem" size="sm" class="q-mr-sm"
                @click="editarOrdem" />
              <q-btn flat round dense icon="close" @click="ordemSelecionada = null" />
            </div>
          </div>

          <div class="row q-col-gutter-md">
            <!-- Informações de Planejamento -->
            <div class="col-12 col-md-6">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 text-weight-medium q-mb-md">
                    <q-icon name="event_note" color="primary" class="q-mr-xs" />
                    Planejamento
                  </div>
                  <q-list dense>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon name="schedule" color="primary" size="sm" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label caption>Início Previsto</q-item-label>
                        <q-item-label class="text-weight-medium">
                          {{ formatDateTime(ordemSelecionada.InicioPrevisto) }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon name="play_circle" color="green" size="sm" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label caption>Início Real</q-item-label>
                        <q-item-label class="text-weight-medium">
                          {{ formatDateTime(ordemSelecionada.InicioReal) }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon name="event_available" color="primary" size="sm" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label caption>Fim Previsto</q-item-label>
                        <q-item-label class="text-weight-medium">
                          {{ formatDateTime(ordemSelecionada.FimPrevisto) }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon name="check_circle" color="green" size="sm" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label caption>Fim Real</q-item-label>
                        <q-item-label class="text-weight-medium">
                          {{ formatDateTime(ordemSelecionada.FimReal) }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon name="timer" color="primary" size="sm" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label caption>Duração Prevista</q-item-label>
                        <q-item-label class="text-weight-medium">
                          {{ ordemSelecionada.DuracaoHoras || 0 }}h
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon name="groups" color="primary" size="sm" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label caption>Equipe</q-item-label>
                        <q-item-label class="text-weight-medium">
                          {{ getEquipeNome(ordemSelecionada.IdEquipe) }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon name="info" color="primary" size="sm" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label caption>Status</q-item-label>
                        <q-item-label class="text-weight-medium">
                          {{ ordemSelecionada.Status }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>

            <!-- Observações -->
            <div class="col-12 col-md-6">
              <q-card flat bordered style="height: 100%">
                <q-card-section>
                  <div class="row items-center justify-between q-mb-md">
                    <div class="text-subtitle2 text-weight-medium">
                      <q-icon name="comment" color="primary" class="q-mr-xs" />
                      Observações
                    </div>
                    <q-btn v-if="!editandoObservacoes" flat dense size="sm" icon="edit" color="primary"
                      @click="iniciarEdicaoObservacoes">
                      <q-tooltip>Editar</q-tooltip>
                    </q-btn>
                  </div>

                  <div v-if="!editandoObservacoes" class="text-body2"
                    style="white-space: pre-wrap; max-height: 280px; overflow-y: auto">
                    {{ ordemSelecionada.Observacoes || 'Sem observações' }}
                  </div>

                  <div v-else>
                    <q-input v-model="observacoesTemp" type="textarea" filled autogrow :rows="6"
                      placeholder="Digite as observações..." style="max-height: 240px" />
                    <div class="row q-gutter-sm q-mt-sm justify-end">
                      <q-btn flat label="Cancelar" color="grey" size="sm" @click="cancelarEdicaoObservacoes" />
                      <q-btn unelevated label="Salvar" color="primary" size="sm" @click="salvarObservacoes" />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-slide-transition>

      <q-card-section class="row items-center justify-between q-pa-md"
        style="background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%); border-top: 1px solid rgba(0, 0, 0, 0.08);">
        <!-- Legenda de Status -->
        <div class="row q-gutter-sm wrap">
          <div class="legend-item">
            <div class="legend-color" style="background-color: #2196F3"></div>
            <span class="text-body2">Aberta</span>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background-color: #FF9800"></div>
            <span class="text-body2">Em Andamento</span>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background-color: #4CAF50"></div>
            <span class="text-body2">Concluída</span>
          </div>
          <div class="legend-item">
            <div class="legend-color" style="background-color: #F44336"></div>
            <span class="text-body2">Cancelada</span>
          </div>
        </div>

        <!-- Controles de Zoom -->
        <div class="row items-center q-gutter-md" style="min-width: 280px">
          <q-icon name="zoom_out" color="grey-7" size="20px" />
          <q-slider v-model="currentZoom" :min="0.5" :max="3" :step="0.25"
            :label-value="`${Math.round(currentZoom * 100)}%`" label color="primary" style="width: 180px" />
          <q-icon name="zoom_in" color="grey-7" size="20px" />
        </div>
      </q-card-section>
    </q-card>

    <!-- Dialog de Detalhes -->
    <q-dialog v-model="dialogDetalhes">
      <q-card style="min-width: 450px; max-width: 500px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">
            <q-icon name="assignment" class="q-mr-sm" />
            {{ ordemSelecionada?.NumeroOS }}
          </div>
        </q-card-section>

        <q-card-section v-if="ordemSelecionada">
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon name="person" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Cliente</q-item-label>
                <q-item-label>{{ ordemSelecionada.Cliente?.Nome || 'N/A' }}</q-item-label>
              </q-item-section>
            </q-item>

            <!-- Mudança Rápida de Equipe com Chips -->
            <q-item>
              <q-item-section avatar>
                <q-icon name="groups" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption class="q-mb-sm">
                  Equipe Responsável
                  <q-icon name="info" size="xs" color="grey-6" class="q-ml-xs">
                    <q-tooltip>Clique em uma equipe para alterá-la rapidamente</q-tooltip>
                  </q-icon>
                </q-item-label>
                <div class="row q-gutter-xs">
                  <q-chip v-for="equipe in equipes" :key="equipe.Id" clickable
                    :color="equipeTemporaria === equipe.Id ? 'positive' : 'grey-3'"
                    :text-color="equipeTemporaria === equipe.Id ? 'white' : 'grey-8'"
                    :icon="equipeTemporaria === equipe.Id ? 'check_circle' : 'groups'"
                    @click="equipeTemporaria = equipe.Id" size="sm">
                    {{ equipe.Descricao }}
                  </q-chip>
                </div>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="schedule" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Início Previsto</q-item-label>
                <q-item-label>{{ formatDateTime(ordemSelecionada.InicioPrevisto) }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="timer" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Duração</q-item-label>
                <q-item-label>{{ ordemSelecionada.DuracaoHoras || 0 }}h</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="grey" v-close-popup />
          <q-btn flat label="Salvar Equipe" color="positive" :disable="!equipeAlterada" @click="salvarEquipe" />
          <q-btn flat label="Editar Completo" color="primary" @click="editarOrdem" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useOrdemServicoStore } from '@/stores/ordem-servico-store'
import { EquipeRepository } from '@/core/infrastructure/repositories/equipeRepository'
import GanttChart from '@/components/GanttChart.vue'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isBetween from 'dayjs/plugin/isBetween'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import 'dayjs/locale/pt-br'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)
dayjs.extend(weekOfYear)
dayjs.locale('pt-br')

export default defineComponent({
  name: 'OrdemServicoGanttPage',
  components: {
    GanttChart
  },

  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const store = useOrdemServicoStore()

    const loading = ref(false)
    const equipes = ref([])
    const equipeSelecionada = ref(null)
    const statusSelecionado = ref(null)
    const dialogDetalhes = ref(false)
    const ordemSelecionada = ref(null)
    const equipeTemporaria = ref(null)
    const mostrarDica = ref(true)
    const datePopup = ref(null)
    const currentZoom = ref(1)
    const editandoObservacoes = ref(false)
    const observacoesTemp = ref('')

    const rowLabelWidth = ref('250px')

    const equipeAlterada = computed(() => {
      return ordemSelecionada.value && equipeTemporaria.value !== ordemSelecionada.value.IdEquipe
    })

    const precision = ref('day')
    const offsetPeriodo = ref(0)
    const dataSelecionada = ref(dayjs().format('YYYY/MM/DD'))

    const precisionOptions = [
      { label: 'Dia', value: 'day' },
      { label: 'Semana', value: 'week' },
      { label: 'Mês', value: 'month' }
    ]

    const equipesOptions = computed(() => [
      { label: 'Todas as equipes', value: null },
      ...equipes.value.map(e => ({ label: e.Descricao, value: e.Id }))
    ])

    const statusOptions = computed(() => [
      { label: 'Todos', value: null },
      { label: 'Aberta', value: 'ABERTA' },
      { label: 'Em Andamento', value: 'EM_ANDAMENTO' },
      { label: 'Concluída', value: 'CONCLUIDA' },
      { label: 'Cancelada', value: 'CANCELADA' }
    ])

    const ganttRows = computed(() => {
      // Agrupar ordens por equipe
      const equipesMap = new Map()

      // Adicionar equipes cadastradas
      equipes.value.forEach(equipe => {
        equipesMap.set(equipe.Id, {
          id: equipe.Id,
          label: equipe.Descricao,
          color: equipe.Cor || '#607D8B',
          bars: []
        })
      })

      // Adicionar "Sem Equipe" se necessário
      equipesMap.set(null, {
        id: null,
        label: 'Sem Equipe',
        color: '#607D8B',
        bars: []
      })

      // Filtrar e processar ordens
      let ordens = store.ordensServico.filter(ordem => {
        if (!ordem.InicioPrevisto) return false
        const inicio = dayjs(ordem.InicioPrevisto)
        return inicio.isBetween(chartStart.value, chartEnd.value, null, '[]')
      })

      if (equipeSelecionada.value) ordens = ordens.filter(o => o.IdEquipe === equipeSelecionada.value)
      if (statusSelecionado.value) ordens = ordens.filter(o => o.Status === statusSelecionado.value)

      // Adicionar barras às equipes
      ordens.forEach(ordem => {
        const equipeId = ordem.IdEquipe || null
        const row = equipesMap.get(equipeId)

        if (row) {
          const inicio = dayjs(ordem.InicioPrevisto)
          const fim = ordem.FimPrevisto ? dayjs(ordem.FimPrevisto) : inicio.add(ordem.DuracaoHoras || 2, 'hour')
          const duration = fim.diff(inicio, 'hour', true)

          row.bars.push({
            id: ordem.Id,
            label: ordem.NumeroOS || `OS-${ordem.Id}`,
            start: inicio.toISOString(),
            end: fim.toISOString(),
            duration: Math.round(duration * 10) / 10,
            status: ordem.Status,
            resizable: true,
            tooltipContent: `${ordem.Cliente?.Nome || 'N/A'} - ${inicio.format('DD/MM HH:mm')} até ${fim.format('DD/MM HH:mm')}`,
            ordemCompleta: ordem
          })
        }
      })

      // Retornar todas as equipes, mesmo sem ordens de serviço
      return Array.from(equipesMap.values())
    })

    const chartStart = computed(() => {
      let baseDate = dayjs().startOf('day')
      if (precision.value === 'day') baseDate = baseDate.add(offsetPeriodo.value, 'day').startOf('day')
      else if (precision.value === 'week') baseDate = baseDate.add(offsetPeriodo.value, 'week').startOf('week')
      else if (precision.value === 'month') baseDate = baseDate.add(offsetPeriodo.value, 'month').startOf('month')
      return baseDate.toISOString()
    })

    const chartEnd = computed(() => {
      const start = dayjs(chartStart.value)
      if (precision.value === 'day') return start.endOf('day').toISOString()
      else if (precision.value === 'week') return start.endOf('week').toISOString()
      else return start.endOf('month').toISOString()
    })

    function onBarClick(bar) {
      const ordem = bar.ordemCompleta
      if (ordem) {
        ordemSelecionada.value = ordem
        equipeTemporaria.value = ordem.IdEquipe
      }
    }

    async function onBarUpdated({ bar, type, targetRow }) {
      try {
        const ordem = bar.ordemCompleta
        if (!ordem) return

        const novoInicio = dayjs(bar.start)
        const novoFim = dayjs(bar.end)
        const duracaoHoras = novoFim.diff(novoInicio, 'hour', true)

        ordem.InicioPrevisto = novoInicio.toISOString()
        ordem.FimPrevisto = novoFim.toISOString()
        ordem.DuracaoHoras = Math.round(duracaoHoras * 10) / 10

        // Se mudou de equipe
        if (type === 'move-team' && targetRow) {
          const equipeAnterior = ordem.IdEquipe ? getEquipeNome(ordem.IdEquipe) : 'Sem Equipe'
          ordem.IdEquipe = targetRow.id
          const novaEquipe = targetRow.id ? getEquipeNome(targetRow.id) : 'Sem Equipe'

          await store.updateOrdemServico(ordem)

          $q.notify({
            type: 'positive',
            message: `Ordem ${ordem.NumeroOS} movida para outra equipe`,
            caption: `${equipeAnterior} → ${novaEquipe}`
          })

          await carregarDados()
          return
        }

        await store.updateOrdemServico(ordem)

        const acao = type === 'move' ? 'reagendada' : 'redimensionada'
        $q.notify({
          type: 'positive',
          message: `Ordem ${ordem.NumeroOS} ${acao}`,
          caption: `${novoInicio.format('DD/MM/YYYY HH:mm')} - ${novoFim.format('DD/MM/YYYY HH:mm')} (${ordem.DuracaoHoras}h)`
        })
      } catch (error) {
        console.error('Erro ao atualizar ordem:', error)
        $q.notify({
          type: 'negative',
          message: 'Erro ao atualizar agendamento'
        })
        await carregarDados()
      }
    }

    function formatDateTime(dateString) {
      if (!dateString) return 'N/A'
      return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(dateString))
    }

    function getEquipeNome(equipeId) {
      return equipes.value.find(e => e.Id === equipeId)?.Descricao || 'Sem Equipe'
    }

    function editarOrdem() {
      if (ordemSelecionada.value) {
        const ordemId = ordemSelecionada.value.Id
        ordemSelecionada.value = null
        dialogDetalhes.value = false
        router.push(`/ordens-servico/${ordemId}`)
      }
    }

    function navegarAnterior() {
      offsetPeriodo.value -= 1
    }

    function navegarProximo() {
      offsetPeriodo.value += 1
    }

    function navegarHoje() {
      // Calcular offset baseado na data selecionada
      const dataAlvo = dayjs(dataSelecionada.value, 'YYYY/MM/DD')
      const hoje = dayjs()

      if (precision.value === 'day') {
        offsetPeriodo.value = dataAlvo.diff(hoje, 'day')
      } else if (precision.value === 'week') {
        offsetPeriodo.value = dataAlvo.diff(hoje, 'week')
      } else if (precision.value === 'month') {
        offsetPeriodo.value = dataAlvo.diff(hoje, 'month')
      }
    }

    function irParaHoje() {
      dataSelecionada.value = dayjs().format('YYYY/MM/DD')
      offsetPeriodo.value = 0
    }

    function onDateSelected() {
      navegarHoje()
      if (datePopup.value) {
        datePopup.value.hide()
      }
    }

    async function salvarEquipe() {
      try {
        if (!ordemSelecionada.value || !equipeTemporaria.value) return

        const equipeAnterior = getEquipeNome(ordemSelecionada.value.IdEquipe)
        const novaEquipe = getEquipeNome(equipeTemporaria.value)

        ordemSelecionada.value.IdEquipe = equipeTemporaria.value
        await store.updateOrdemServico(ordemSelecionada.value)

        $q.notify({
          type: 'positive',
          message: `Equipe alterada com sucesso`,
          caption: `${equipeAnterior} → ${novaEquipe}`
        })

        dialogDetalhes.value = false
      } catch (error) {
        console.error('Erro ao alterar equipe:', error)
        $q.notify({
          type: 'negative',
          message: 'Erro ao alterar equipe',
          caption: error.message || 'Erro desconhecido'
        })
      }
    }

    async function carregarDados() {
      loading.value = true
      try {
        await store.loadOrdensServico()
        equipes.value = await new EquipeRepository().getAll()

        console.log('Ordens carregadas:', store.ordensServico.length)
        console.log('Equipes carregadas:', equipes.value.length)
        console.log('Chart Start:', chartStart.value)
        console.log('Chart End:', chartEnd.value)
        console.log('Gantt Rows:', ganttRows.value)
      } catch {
        $q.notify({ type: 'negative', message: 'Erro ao carregar dados' })
      } finally { loading.value = false }
    }

    function iniciarEdicaoObservacoes() {
      observacoesTemp.value = ordemSelecionada.value.Observacoes || ''
      editandoObservacoes.value = true
    }

    function cancelarEdicaoObservacoes() {
      editandoObservacoes.value = false
      observacoesTemp.value = ''
    }

    async function salvarObservacoes() {
      try {
        ordemSelecionada.value.Observacoes = observacoesTemp.value
        await store.updateOrdemServico(ordemSelecionada.value)

        $q.notify({
          type: 'positive',
          message: 'Observações salvas com sucesso'
        })

        editandoObservacoes.value = false
        await carregarDados()
      } catch (error) {
        console.error('Erro ao salvar observações:', error)
        $q.notify({
          type: 'negative',
          message: 'Erro ao salvar observações',
          caption: error.message || 'Erro desconhecido'
        })
      }
    }

    onMounted(carregarDados)

    return {
      loading, equipes, equipeSelecionada, statusSelecionado, precision, dataSelecionada, mostrarDica, rowLabelWidth, datePopup,
      precisionOptions, equipesOptions, statusOptions, chartStart, chartEnd, dialogDetalhes, ordemSelecionada, equipeTemporaria, equipeAlterada,
      ganttRows, onBarClick, onBarUpdated,
      carregarDados, editarOrdem, salvarEquipe, formatDateTime, getEquipeNome, navegarAnterior, navegarProximo, navegarHoje, irParaHoje, onDateSelected,
      currentZoom, editandoObservacoes, observacoesTemp, iniciarEdicaoObservacoes, cancelarEdicaoObservacoes, salvarObservacoes
    }
  }
})
</script>

<style lang="sass" scoped>
// Divisor de seção com cor de destaque
.accent-divider
  height: 2px
  background: $accent
  width: 100%

// Card de controle com borda e sombra suave
.control-card
  border: 1px solid rgba(0, 0, 0, 0.08)
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06)
  transition: all 0.3s ease
  height: 100%
  display: flex
  flex-direction: column

  .q-card__section
    flex: 1
    display: flex
    flex-direction: column

  &:hover
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1)
    border-color: rgba(0, 0, 0, 0.12)

// Legenda de cores
.legend-item
  display: inline-flex
  align-items: center
  gap: 8px
  padding: 4px 12px
  background: white
  border-radius: 16px
  border: 1px solid rgba(0, 0, 0, 0.08)
  transition: all 0.2s ease

  &:hover
    background: rgba(0, 0, 0, 0.02)
    border-color: rgba(0, 0, 0, 0.12)

.legend-color
  width: 16px
  height: 16px
  border-radius: 4px
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15)

// Estilos personalizados para a biblioteca vue-ganttastic usando :deep()
:deep(.g-gantt-chart)
  width: 100%
  position: relative !important

:deep(.g-timeaxis)
  position: sticky !important
  top: 0
  z-index: 4 !important
  background: white
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08)

:deep(.g-timeunits-container)
  background: linear-gradient(to bottom, #f5f5f5, #ffffff)
</style>
