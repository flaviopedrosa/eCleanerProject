<template>
  <q-page padding>
    <div class="q-pb-md">
      <div class="row items-center q-mb-md">
        <div class="col-12 col-md-6">
          <div class="text-h5 text-primary">
            <q-icon name="event" class="q-mr-sm" />
            {{ $t('forms.ordemServico.programacao.title') }}
          </div>
        </div>
        <div class="col-12 col-md-6 text-right">
          <q-btn color="primary" icon="refresh" :label="$t('forms.ordemServico.programacao.refresh')"
            @click="carregarDados" flat />
        </div>
      </div>

      <!-- Filtros -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-select v-model="equipeSelecionada" :options="equipesOptions"
                :label="$t('forms.ordemServico.programacao.filterByTeam')" filled clearable emit-value map-options
                @update:model-value="filtrarPorEquipe">
                <template v-slot:prepend>
                  <q-icon name="groups" />
                </template>
              </q-select>
            </div>
            <div class="col-12 col-md-4">
              <q-select v-model="visualizacao" :options="visualizacaoOptions"
                :label="$t('forms.ordemServico.programacao.view')" filled emit-value map-options>
                <template v-slot:prepend>
                  <q-icon name="view_module" />
                </template>
              </q-select>
            </div>
            <div class="col-12 col-md-4">
              <q-input v-model="dataAtual" :label="$t('forms.ordemServico.programacao.goToDate')" type="date" filled>
                <template v-slot:prepend>
                  <q-icon name="today" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Layout responsivo -->
      <div class="row q-col-gutter-md">
        <!-- Painel lateral - Ordens não programadas (oculto no mobile) -->
        <div class="col-12 col-md-3" v-if="!$q.screen.lt.md || mostrarPainel">
          <q-card flat bordered>
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">
                <q-icon name="list_alt" class="q-mr-sm" />
                {{ $t('forms.ordemServico.programacao.pendingOrders') }}
              </div>
              <div class="text-caption">{{ ordensNaoProgramadas.length }} {{
                $t('forms.ordemServico.programacao.orderCount')
                }}</div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-pa-none backlog-drop-zone" :class="{ 'backlog-drag-over': backlogHover }"
              @drop="soltarNoBacklog" @dragover="marcarBacklogHover" @dragleave="desmarcarBacklogHover">
              <q-list separator>
                <q-item v-for="ordem in ordensNaoProgramadas" :key="ordem.Id" draggable="true"
                  @dragstart="iniciarArrastar(ordem)" @dragend="finalizarArrastar" class="cursor-pointer ordem-item">
                  <q-item-section>
                    <q-item-label>{{ ordem.NumeroOS }}</q-item-label>
                    <q-item-label caption>{{ ordem.Cliente?.Nome }}</q-item-label>
                    <q-item-label caption>{{ ordem.Imovel?.NomeIdentificacao }}</q-item-label>
                    <q-item-label caption v-if="ordem.DuracaoHoras">
                      <q-icon name="schedule" size="xs" /> {{ ordem.DuracaoHoras }}h
                    </q-item-label>
                    <q-chip v-if="ordem.IdEquipe" size="sm" dense>
                      {{ getNomeEquipe(ordem.IdEquipe) }}
                    </q-chip>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn icon="more_vert" flat round dense>
                      <q-menu>
                        <q-list>
                          <q-item clickable v-close-popup @click="verDetalhes(ordem)">
                            <q-item-section avatar>
                              <q-icon name="visibility" />
                            </q-item-section>
                            <q-item-section>{{ $t('forms.ordemServico.programacao.actions.viewDetails')
                            }}</q-item-section>
                          </q-item>
                          <q-item clickable v-close-popup @click="agendarOrdem(ordem)">
                            <q-item-section avatar>
                              <q-icon name="event" />
                            </q-item-section>
                            <q-item-section>{{ $t('forms.ordemServico.programacao.actions.schedule') }}</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </q-item-section>
                </q-item>
                <q-item v-if="ordensNaoProgramadas.length === 0">
                  <q-item-section class="text-center text-grey-6">
                    {{ $t('forms.ordemServico.programacao.noOrders') }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>

          <!-- Gráfico de Ocupação das Equipes -->
          <q-card flat bordered class="q-mt-md">
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">
                <q-icon name="bar_chart" class="q-mr-sm" />
                Ocupação das Equipes
              </div>
              <div class="text-caption">{{ tituloGrafico }}</div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="row items-center justify-end q-mb-md" v-if="diaSelecionadoGrafico">
                <q-btn flat dense size="sm" icon="close" @click="limparDiaSelecionado" color="grey-7">
                  <q-tooltip>Voltar para visão mensal</q-tooltip>
                </q-btn>
              </div>
              <div v-if="equipes.length > 0">
                <div v-for="equipe in equipes" :key="equipe.Id" class="q-mb-md">
                  <div class="text-caption text-weight-medium flex items-center q-gutter-xs q-mb-xs">
                    <div class="equipe-cor-circulo" :style="{ backgroundColor: getCorEquipe(equipe.Id) }"></div>
                    <span>{{ equipe.Descricao }}</span>
                  </div>
                  <q-linear-progress :value="getOcupacaoEquipe(equipe.Id) / 100"
                    :color="getCorOcupacao(getOcupacaoEquipe(equipe.Id))" size="18px" rounded>
                    <div class="absolute-full flex flex-center">
                      <q-badge :color="getOcupacaoEquipe(equipe.Id) > 50 ? 'white' : 'grey-8'" text-color="grey-8"
                        :label="`${getOcupacaoEquipe(equipe.Id).toFixed(0)}% (${getHorasOcupadas(equipe.Id)}h / ${getHorasDisponiveis()}h)`" />
                    </div>
                  </q-linear-progress>
                </div>

                <!-- Backlog sem equipe -->
                <div class="q-mb-md">
                  <div class="text-caption text-weight-medium flex items-center q-gutter-xs q-mb-xs">
                    <div class="equipe-cor-circulo" style="background-color: #607D8B"></div>
                    <span>Backlog sem Equipe</span>
                  </div>
                  <q-linear-progress :value="0" color="grey" size="18px" rounded>
                    <div class="absolute-full flex flex-center">
                      <q-badge color="grey-8" text-color="white" :label="`${getHorasBacklogSemEquipe()}h`" />
                    </div>
                  </q-linear-progress>
                </div>
              </div>
              <div v-else class="text-center text-grey-6 q-py-md">
                Nenhuma equipe cadastrada
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Calendário -->
        <div :class="$q.screen.lt.md ? 'col-12' : 'col-9'">
          <q-card flat bordered>
            <!-- Header do Calendário -->
            <q-card-section class="q-pa-sm">
              <div class="row items-center">
                <div class="col">
                  <q-btn icon="chevron_left" flat round dense @click="anteriorPeriodo" />
                  <q-btn icon="chevron_right" flat round dense @click="proximoPeriodo" />
                  <span class="text-h6 q-ml-md">{{ tituloCalendario }}</span>
                </div>
                <div class="col-auto">
                  <q-btn v-if="$q.screen.lt.md" icon="list" flat round dense @click="mostrarPainel = !mostrarPainel" />
                  <q-btn :label="$t('forms.ordemServico.programacao.today')" flat dense @click="irParaHoje" />
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <!-- Grade do Calendário -->
            <q-card-section class="calendario-container">
              <div v-if="visualizacao === 'month'" class="calendario-mes">
                <!-- Cabeçalho dos dias da semana -->
                <div class="calendario-header">
                  <div v-for="dia in diasSemana" :key="dia" class="dia-semana-header">
                    {{ dia }}
                  </div>
                </div>

                <!-- Grade de dias -->
                <div class="calendario-grade">
                  <div v-for="(dia, index) in diasMes" :key="index" class="dia-celula"
                    :class="{ 'outro-mes': !dia.mesAtual, 'hoje': dia.hoje, 'drag-over': celulaHover === dia.data, 'dia-selecionado': diaSelecionadoGrafico === dia.data }"
                    @drop="soltarOrdem(dia.data)" @dragover="marcarCelulaHoverDrag($event, dia.data)"
                    @click.stop="selecionarDiaGrafico(dia.data)">
                    <div class="dia-numero">{{ dia.numero }}</div>
                    <div class="ordens-dia">
                      <div v-for="evento in getEventosDia(dia.data)" :key="evento.ordem.Id" class="evento-item"
                        :style="{ backgroundColor: evento.cor }" draggable="true"
                        @dragstart="iniciarArrastar(evento.ordem)">
                        <div class="evento-conteudo">
                          <q-icon name="work" size="xs" class="q-mr-xs" />
                          <span class="text-caption">{{ evento.ordem.NumeroOS }}</span>
                          <q-icon v-if="evento.ordem.recorrente" name="repeat" size="xs" class="q-ml-xs" />
                        </div>
                        <q-tooltip>
                          <div>{{ evento.ordem.NumeroOS }}</div>
                          <div>{{ evento.ordem.Cliente?.Nome }}</div>
                          <div v-if="evento.ordem.IdEquipe">{{
                            getNomeEquipe(evento.ordem.IdEquipe)
                          }}</div>
                        </q-tooltip>
                        <q-menu touch-position context-menu>
                          <q-list dense>
                            <q-item clickable v-close-popup @click="verDetalhes(evento.ordem)">
                              <q-item-section avatar>
                                <q-icon name="visibility" size="sm" />
                              </q-item-section>
                              <q-item-section>Ver Detalhes</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="editarAgendamento(evento.ordem)">
                              <q-item-section avatar>
                                <q-icon name="edit" size="sm" />
                              </q-item-section>
                              <q-item-section>Editar</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="voltarParaBacklog(evento.ordem)">
                              <q-item-section avatar>
                                <q-icon name="undo" size="sm" />
                              </q-item-section>
                              <q-item-section>Voltar p/ Backlog</q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Visualização Semanal -->
              <div v-else-if="visualizacao === 'week'" class="calendario-semana">
                <div class="semana-header">
                  <div class="hora-coluna"></div>
                  <div v-for="dia in diasSemanaAtual" :key="dia.data" class="dia-coluna-header"
                    :class="{ 'hoje': dia.hoje }">
                    <div class="dia-nome">{{ dia.nomeDia }}</div>
                    <div class="dia-numero">{{ dia.numero }}</div>
                  </div>
                </div>
                <div class="semana-corpo">
                  <div class="horas-coluna">
                    <div v-for="hora in 24" :key="hora" class="hora-label">
                      {{ String(hora - 1).padStart(2, '0') }}:00
                    </div>
                  </div>
                  <div v-for="dia in diasSemanaAtual" :key="dia.data" class="dia-coluna">
                    <div v-for="hora in 24" :key="hora" class="hora-celula"
                      :class="{ 'drag-over': celulaHoraHover === `${dia.data}-${hora - 1}` }"
                      @drop="soltarOrdemSemana(dia.data, hora - 1)"
                      @dragover="marcarCelulaHoraHover($event, dia.data, hora - 1)">
                      <div v-for="evento in getEventosDiaHora(dia.data, hora - 1)" :key="evento.ordem.Id"
                        class="evento-semana" :style="calcularEstiloEvento(evento)" draggable="true"
                        @dragstart="iniciarArrastar(evento.ordem)">
                        <div>{{ evento.ordem.NumeroOS }}</div>
                        <div class="text-caption">{{ evento.ordem.Cliente?.Nome }}</div>
                        <q-menu touch-position context-menu>
                          <q-list dense>
                            <q-item clickable v-close-popup @click="verDetalhes(evento.ordem)">
                              <q-item-section avatar>
                                <q-icon name="visibility" size="sm" />
                              </q-item-section>
                              <q-item-section>{{ $t('forms.ordemServico.programacao.actions.viewDetails')
                                }}</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="editarAgendamento(evento.ordem)">
                              <q-item-section avatar>
                                <q-icon name="edit" size="sm" />
                              </q-item-section>
                              <q-item-section>{{ $t('buttons.edit') }}</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="voltarParaBacklog(evento.ordem)">
                              <q-item-section avatar>
                                <q-icon name="undo" size="sm" />
                              </q-item-section>
                              <q-item-section>{{ $t('forms.ordemServico.programacao.actions.backToBacklog')
                                }}</q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Visualização de Lista -->
              <div v-else-if="visualizacao === 'list'" class="calendario-lista">
                <q-list separator>
                  <q-item v-for="evento in eventosFiltrados" :key="evento.ordem.Id">
                    <q-item-section avatar>
                      <q-avatar :style="{ backgroundColor: evento.cor }" text-color="white" icon="work" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ evento.ordem.NumeroOS }}</q-item-label>
                      <q-item-label caption>{{ evento.ordem.Cliente?.Nome }} - {{
                        evento.ordem.Imovel?.NomeIdentificacao }}</q-item-label>
                      <q-item-label caption>
                        <q-icon name="event" size="xs" />
                        {{ formatarData(evento.ordem.InicioPrevisto) }}
                        <span v-if="evento.ordem.InicioPrevisto">
                          {{ new Date(evento.ordem.InicioPrevisto).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute:
                              '2-digit'
                          }) }}
                        </span>
                      </q-item-label>
                      <q-item-label caption v-if="evento.ordem.DuracaoHoras">
                        <q-icon name="schedule" size="xs" />
                        {{ evento.ordem.DuracaoHoras }}h
                      </q-item-label>
                      <q-item-label caption v-if="evento.ordem.IdEquipe">
                        <q-icon name="groups" size="xs" />
                        {{ getNomeEquipe(evento.ordem.IdEquipe) }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn icon="more_vert" flat round dense>
                        <q-menu>
                          <q-list>
                            <q-item clickable v-close-popup @click="verDetalhes(evento.ordem)">
                              <q-item-section avatar>
                                <q-icon name="visibility" />
                              </q-item-section>
                              <q-item-section>{{ $t('forms.ordemServico.programacao.actions.viewDetails')
                                }}</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="editarAgendamento(evento.ordem)">
                              <q-item-section avatar>
                                <q-icon name="edit" />
                              </q-item-section>
                              <q-item-section>{{ $t('forms.ordemServico.programacao.actions.editSchedule')
                                }}</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="voltarParaBacklog(evento.ordem)">
                              <q-item-section avatar>
                                <q-icon name="undo" />
                              </q-item-section>
                              <q-item-section>{{ $t('forms.ordemServico.programacao.actions.backToBacklog')
                                }}</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="removerAgendamento(evento.ordem)">
                              <q-item-section avatar>
                                <q-icon name="delete" />
                              </q-item-section>
                              <q-item-section>{{ $t('forms.ordemServico.programacao.actions.removeSchedule')
                                }}</q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </q-btn>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Dialog de Agendamento -->
    <q-dialog v-model="dialogAgendamento" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">{{ $t('forms.ordemServico.programacao.scheduleDialog.title') }}</div>
        </q-card-section>

        <q-card-section>
          <div v-if="ordemAgendamento">
            <div class="text-subtitle2 q-mb-md">
              {{ ordemAgendamento.NumeroOS }} - {{ ordemAgendamento.Cliente?.Nome }}
            </div>

            <div v-if="ordemAgendamento.DuracaoHoras" class="q-mb-md">
              <div class="text-caption text-grey-7">{{ $t('forms.ordemServico.programacao.scheduleDialog.duration') }}
              </div>
              <div class="text-body1">{{ ordemAgendamento.DuracaoHoras }}h</div>
            </div>

            <q-input v-model="formAgendamento.dataInicio"
              :label="$t('forms.ordemServico.programacao.scheduleDialog.startDateTime')" type="datetime-local" filled
              class="q-mb-md" />

            <q-input v-model="formAgendamento.dataFim"
              :label="$t('forms.ordemServico.programacao.scheduleDialog.endDateTime')" type="datetime-local" filled
              class="q-mb-md" />

            <q-select v-model="formAgendamento.idEquipe" :options="equipesOptions"
              :label="$t('forms.ordemServico.programacao.scheduleDialog.team')" filled emit-value map-options clearable
              class="q-mb-md" />

            <q-checkbox v-model="formAgendamento.recorrente"
              :label="$t('forms.ordemServico.programacao.scheduleDialog.createRecurrence')" class="q-mb-md" />

            <div v-if="formAgendamento.recorrente" class="q-pl-lg">
              <q-select v-model="formAgendamento.tipoRecorrencia" :options="tiposRecorrencia"
                :label="$t('forms.ordemServico.programacao.scheduleDialog.recurrenceType')" filled emit-value
                map-options class="q-mb-md" />

              <q-input v-model.number="formAgendamento.intervalo"
                :label="$t('forms.ordemServico.programacao.scheduleDialog.interval')" type="number" filled min="1"
                class="q-mb-md" :hint="getHintIntervalo(formAgendamento.tipoRecorrencia)" />

              <q-input v-model="formAgendamento.dataFimRecorrencia"
                :label="$t('forms.ordemServico.programacao.scheduleDialog.recurrenceEndDate')" type="date" filled
                class="q-mb-md" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn :label="$t('buttons.cancel')" flat v-close-popup />
          <q-btn :label="$t('forms.ordemServico.programacao.actions.schedule')" color="primary"
            @click="salvarAgendamento" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { useOrdemServicoStore } from '@/stores/ordem-servico-store'
import { EquipeRepository } from '@/core/infrastructure/repositories/equipeRepository'

export default defineComponent({
  name: 'OrdemServicoProgramacaoPage',

  setup() {
    const router = useRouter()
    const { t, locale } = useI18n()
    const $q = useQuasar()
    const store = useOrdemServicoStore()
    const equipeRepository = new EquipeRepository()

    const equipeSelecionada = ref(null)
    const visualizacao = ref('month')
    const dataAtual = ref(formatarDataParaInput(new Date()))
    const mostrarPainel = ref(false)
    const ordemArrastada = ref(null)
    const celulaHover = ref(null)
    const celulaHoraHover = ref(null)
    const backlogHover = ref(false)
    const diaSelecionadoGrafico = ref(null)
    const equipes = ref([])
    const dialogAgendamento = ref(false)
    const ordemAgendamento = ref(null)
    const formAgendamento = ref({
      dataInicio: null,
      dataFim: null,
      idEquipe: null,
      recorrente: false,
      tipoRecorrencia: 'daily',
      intervalo: 1,
      dataFimRecorrencia: null
    })

    const visualizacaoOptions = computed(() => [
      { label: t('forms.ordemServico.programacao.views.month'), value: 'month' },
      { label: t('forms.ordemServico.programacao.views.week'), value: 'week' },
      { label: t('forms.ordemServico.programacao.views.list'), value: 'list' }
    ])

    const tiposRecorrencia = computed(() => [
      { label: t('forms.ordemServico.programacao.recurrence.daily'), value: 'daily' },
      { label: t('forms.ordemServico.programacao.recurrence.weekly'), value: 'weekly' },
      { label: t('forms.ordemServico.programacao.recurrence.monthly'), value: 'monthly' }
    ])

    const diasSemana = computed(() => {
      if ($q.screen.lt.sm) {
        return [
          t('forms.ordemServico.programacao.weekDays.short.sun'),
          t('forms.ordemServico.programacao.weekDays.short.mon'),
          t('forms.ordemServico.programacao.weekDays.short.tue'),
          t('forms.ordemServico.programacao.weekDays.short.wed'),
          t('forms.ordemServico.programacao.weekDays.short.thu'),
          t('forms.ordemServico.programacao.weekDays.short.fri'),
          t('forms.ordemServico.programacao.weekDays.short.sat')
        ]
      }
      return [
        t('forms.ordemServico.programacao.weekDays.full.sun'),
        t('forms.ordemServico.programacao.weekDays.full.mon'),
        t('forms.ordemServico.programacao.weekDays.full.tue'),
        t('forms.ordemServico.programacao.weekDays.full.wed'),
        t('forms.ordemServico.programacao.weekDays.full.thu'),
        t('forms.ordemServico.programacao.weekDays.full.fri'),
        t('forms.ordemServico.programacao.weekDays.full.sat')
      ]
    })

    const equipesOptions = computed(() => {
      return [
        { label: t('forms.ordemServico.programacao.allTeams'), value: null },
        ...equipes.value.map(e => ({ label: e.Descricao, value: e.Id }))
      ]
    })

    const ordensNaoProgramadas = computed(() => {
      return store.ordensServico.filter(ordem => {
        const naoProgramada = !ordem.InicioPrevisto || !ordem.FimPrevisto
        const equipeMatch = !equipeSelecionada.value || ordem.IdEquipe === equipeSelecionada.value
        return naoProgramada && equipeMatch && ordem.Status !== 'CONCLUIDA' && ordem.Status !== 'CANCELADA'
      })
    })

    const ordensProgramadas = computed(() => {
      return store.ordensServico.filter(ordem => {
        const programada = ordem.InicioPrevisto && ordem.FimPrevisto
        const equipeMatch = !equipeSelecionada.value || ordem.IdEquipe === equipeSelecionada.value
        return programada && equipeMatch && ordem.Status !== 'CONCLUIDA' && ordem.Status !== 'CANCELADA'
      })
    })

    const mesAtual = computed(() => {
      const data = new Date(dataAtual.value)
      return {
        mes: data.getMonth(),
        ano: data.getFullYear()
      }
    })

    const tituloCalendario = computed(() => {
      const data = new Date(dataAtual.value)
      return new Intl.DateTimeFormat(locale.value, {
        month: 'long',
        year: 'numeric'
      }).format(data)
    })

    const tituloGrafico = computed(() => {
      if (diaSelecionadoGrafico.value) {
        const [ano, mes, dia] = diaSelecionadoGrafico.value.split('-').map(Number)
        const data = new Date(ano, mes - 1, dia)
        return new Intl.DateTimeFormat(locale.value, {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }).format(data)
      }
      return tituloCalendario.value
    })

    const diasMes = computed(() => {
      const { mes, ano } = mesAtual.value
      const primeiroDia = new Date(ano, mes, 1)
      const ultimoDia = new Date(ano, mes + 1, 0)
      const diasNoMes = ultimoDia.getDate()
      const diaSemanaInicio = primeiroDia.getDay()

      const dias = []
      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)

      // Dias do mês anterior
      const mesAnterior = mes === 0 ? 11 : mes - 1
      const anoAnterior = mes === 0 ? ano - 1 : ano
      const ultimoDiaMesAnterior = new Date(anoAnterior, mesAnterior + 1, 0).getDate()

      for (let i = diaSemanaInicio - 1; i >= 0; i--) {
        const dia = ultimoDiaMesAnterior - i
        const data = new Date(anoAnterior, mesAnterior, dia)
        dias.push({
          numero: dia,
          data: formatarDataParaInput(data),
          mesAtual: false,
          hoje: false
        })
      }

      // Dias do mês atual
      for (let dia = 1; dia <= diasNoMes; dia++) {
        const data = new Date(ano, mes, dia)
        data.setHours(0, 0, 0, 0)
        dias.push({
          numero: dia,
          data: formatarDataParaInput(data),
          mesAtual: true,
          hoje: data.getTime() === hoje.getTime()
        })
      }

      // Dias do próximo mês para completar a grade
      const diasRestantes = 42 - dias.length // 6 semanas * 7 dias
      const proximoMes = mes === 11 ? 0 : mes + 1
      const proximoAno = mes === 11 ? ano + 1 : ano

      for (let dia = 1; dia <= diasRestantes; dia++) {
        const data = new Date(proximoAno, proximoMes, dia)
        dias.push({
          numero: dia,
          data: formatarDataParaInput(data),
          mesAtual: false,
          hoje: false
        })
      }

      return dias
    })

    const diasSemanaAtual = computed(() => {
      const data = new Date(dataAtual.value)
      const diaSemana = data.getDay()
      const domingo = new Date(data)
      domingo.setDate(data.getDate() - diaSemana)

      const dias = []
      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)

      for (let i = 0; i < 7; i++) {
        const dia = new Date(domingo)
        dia.setDate(domingo.getDate() + i)
        dia.setHours(0, 0, 0, 0)

        dias.push({
          data: formatarDataParaInput(dia),
          numero: dia.getDate(),
          nomeDia: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][dia.getDay()],
          hoje: dia.getTime() === hoje.getTime()
        })
      }

      return dias
    })

    const eventosFiltrados = computed(() => {
      const eventos = []
      ordensProgramadas.value.forEach(ordem => {
        const cor = getCorEquipe(ordem.IdEquipe)
        eventos.push({
          ordem,
          data: ordem.InicioPrevisto,
          cor
        })
      })
      return eventos.sort((a, b) => new Date(a.data) - new Date(b.data))
    })

    function getCorEquipe(idEquipe) {
      if (!idEquipe) return '#607D8B'
      const equipe = equipes.value.find(e => e.Id === idEquipe)
      if (!equipe) return '#607D8B'

      // Retorna a cor salva na equipe, ou cor padrão se não houver
      return equipe.Cor || '#607D8B'
    }

    function getNomeEquipe(idEquipe) {
      if (!idEquipe) return ''
      const equipe = equipes.value.find(e => e.Id === idEquipe)
      return equipe ? equipe.Descricao : ''
    }

    function getHorasDisponiveis() {
      // Buscar configuração do localStorage
      const configStr = localStorage.getItem('ecleaner_config')
      const config = configStr ? JSON.parse(configStr) : null
      const horasPorDia = config?.tempoTrabalhoDia || 8

      // Se um dia específico foi selecionado
      if (diaSelecionadoGrafico.value) {
        const [ano, mes, dia] = diaSelecionadoGrafico.value.split('-').map(Number)
        const data = new Date(ano, mes - 1, dia)
        const diaSemana = data.getDay()
        // Retornar horas do dia se for dia útil, caso contrário 0
        return (diaSemana >= 1 && diaSemana <= 5) ? horasPorDia : 0
      }

      // Calcular dias úteis do mês atual
      const { mes, ano } = mesAtual.value
      const ultimoDia = new Date(ano, mes + 1, 0).getDate()
      let diasUteis = 0

      for (let dia = 1; dia <= ultimoDia; dia++) {
        const data = new Date(ano, mes, dia)
        const diaSemana = data.getDay()
        // Contar apenas dias úteis (segunda a sexta)
        if (diaSemana >= 1 && diaSemana <= 5) {
          diasUteis++
        }
      }

      return diasUteis * horasPorDia
    }

    function getHorasOcupadas(idEquipe) {
      // Se um dia específico foi selecionado
      if (diaSelecionadoGrafico.value) {
        const [ano, mes, dia] = diaSelecionadoGrafico.value.split('-').map(Number)
        const diaSelecionado = new Date(ano, mes - 1, dia, 0, 0, 0, 0)
        const diaFim = new Date(ano, mes - 1, dia, 23, 59, 59, 999)

        let totalHoras = 0

        ordensProgramadas.value.forEach(ordem => {
          if (ordem.IdEquipe === idEquipe && ordem.InicioPrevisto) {
            const dataOrdem = new Date(ordem.InicioPrevisto)

            // Verificar se a ordem está no dia selecionado
            if (dataOrdem >= diaSelecionado && dataOrdem <= diaFim) {
              totalHoras += ordem.DuracaoHoras || 0
            }
          }
        })

        return totalHoras
      }

      // Cálculo mensal
      const { mes, ano } = mesAtual.value
      const primeiroDia = new Date(ano, mes, 1)
      const ultimoDia = new Date(ano, mes + 1, 0, 23, 59, 59)

      let totalHoras = 0

      ordensProgramadas.value.forEach(ordem => {
        if (ordem.IdEquipe === idEquipe && ordem.InicioPrevisto) {
          const dataOrdem = new Date(ordem.InicioPrevisto)

          // Verificar se a ordem está no mês atual
          if (dataOrdem >= primeiroDia && dataOrdem <= ultimoDia) {
            totalHoras += ordem.DuracaoHoras || 0
          }
        }
      })

      return totalHoras
    }

    function getOcupacaoEquipe(idEquipe) {
      const horasDisponiveis = getHorasDisponiveis()
      const horasOcupadas = getHorasOcupadas(idEquipe)

      if (horasDisponiveis === 0) return 0

      return (horasOcupadas / horasDisponiveis) * 100
    }

    function getCorOcupacao(percentual) {
      if (percentual >= 90) return 'red'
      if (percentual >= 70) return 'orange'
      if (percentual >= 50) return 'amber'
      return 'green'
    }

    function getHorasBacklogSemEquipe() {
      let totalHoras = 0
      // Buscar todas as ordens não programadas sem equipe, ignorando o filtro de equipe selecionada
      store.ordensServico.forEach(ordem => {
        const naoProgramada = !ordem.InicioPrevisto || !ordem.FimPrevisto
        const semEquipe = !ordem.IdEquipe || ordem.IdEquipe === null || ordem.IdEquipe === 0
        const ativa = ordem.Status !== 'CONCLUIDA' && ordem.Status !== 'CANCELADA'

        if (naoProgramada && semEquipe && ativa && ordem.DuracaoHoras) {
          totalHoras += ordem.DuracaoHoras
        }
      })
      return totalHoras
    }

    function getEventosDia(data) {
      const dataStr = data.split('T')[0]
      return eventosFiltrados.value.filter(evento => {
        const eventoData = new Date(evento.data).toISOString().split('T')[0]
        return eventoData === dataStr
      })
    }

    function getEventosDiaHora(data, hora) {
      const eventos = getEventosDia(data)
      return eventos.filter(evento => {
        const eventoHora = new Date(evento.data).getHours()
        return eventoHora === hora
      })
    }

    function formatarDataParaInput(data) {
      if (!data) return ''
      const date = data instanceof Date ? data : new Date(data)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    function calcularEstiloEvento(evento) {
      const ordem = evento.ordem
      let duracao = 1 // Padrão de 1 hora

      if (ordem.DuracaoHoras) {
        duracao = ordem.DuracaoHoras
      } else if (ordem.InicioPrevisto && ordem.FimPrevisto) {
        // Calcular duração baseada nas datas
        const inicio = new Date(ordem.InicioPrevisto)
        const fim = new Date(ordem.FimPrevisto)
        duracao = (fim - inicio) / (1000 * 60 * 60) // Converter para horas
      }

      // Cada célula de hora tem 60px
      const alturaPorHora = 60
      const altura = Math.max(duracao * alturaPorHora - 4, alturaPorHora - 4) // -4 para margem

      return {
        backgroundColor: evento.cor,
        height: `${altura}px`,
        minHeight: `${altura}px`
      }
    }

    function formatarData(data) {
      if (!data) return '-'
      const date = data instanceof Date ? data : new Date(data)
      return new Intl.DateTimeFormat(locale.value, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(date)
    }

    function formatarDataHoraParaInput(data) {
      if (!data) return ''
      const date = data instanceof Date ? data : new Date(data)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${year}-${month}-${day}T${hours}:${minutes}`
    }

    function filtrarPorEquipe() {
      // O computed já faz a filtragem
    }

    function anteriorPeriodo() {
      const data = new Date(dataAtual.value)
      if (visualizacao.value === 'month') {
        data.setMonth(data.getMonth() - 1)
      } else if (visualizacao.value === 'week') {
        data.setDate(data.getDate() - 7)
      }
      dataAtual.value = formatarDataParaInput(data)
      diaSelecionadoGrafico.value = null
    }

    function proximoPeriodo() {
      const data = new Date(dataAtual.value)
      if (visualizacao.value === 'month') {
        data.setMonth(data.getMonth() + 1)
      } else if (visualizacao.value === 'week') {
        data.setDate(data.getDate() + 7)
      }
      dataAtual.value = formatarDataParaInput(data)
      diaSelecionadoGrafico.value = null
    }

    function irParaHoje() {
      dataAtual.value = formatarDataParaInput(new Date())
      diaSelecionadoGrafico.value = null
    }

    function selecionarDiaGrafico(data) {
      // Se clicar no mesmo dia, desseleciona
      if (diaSelecionadoGrafico.value === data) {
        diaSelecionadoGrafico.value = null
      } else {
        diaSelecionadoGrafico.value = data
      }
    }

    function limparDiaSelecionado() {
      diaSelecionadoGrafico.value = null
    }

    function iniciarArrastar(ordem) {
      ordemArrastada.value = ordem
    }

    function finalizarArrastar() {
      ordemArrastada.value = null
      celulaHover.value = null
      celulaHoraHover.value = null
      backlogHover.value = false
    }

    function marcarCelulaHoverDrag(event, data) {
      event.preventDefault()
      if (ordemArrastada.value) {
        celulaHover.value = data
        celulaHoraHover.value = null
        backlogHover.value = false
      }
    }

    function marcarCelulaHover(data) {
      if (ordemArrastada.value) {
        celulaHover.value = data
        backlogHover.value = false
      }
    }

    function desmarcarCelulaHover() {
      celulaHover.value = null
    }

    function marcarCelulaHoraHover(event, data, hora) {
      event.preventDefault()
      if (ordemArrastada.value) {
        celulaHoraHover.value = `${data}-${hora}`
        celulaHover.value = null
        backlogHover.value = false
      }
    }

    function marcarBacklogHover(event) {
      event.preventDefault()
      if (ordemArrastada.value && ordemArrastada.value.InicioPrevisto) {
        backlogHover.value = true
        celulaHover.value = null
        celulaHoraHover.value = null
      }
    }

    function desmarcarBacklogHover() {
      backlogHover.value = false
    }

    async function soltarNoBacklog(event) {
      event.preventDefault()
      if (!ordemArrastada.value) return

      const ordem = ordemArrastada.value

      // Só permite soltar se a ordem já estiver programada
      if (!ordem.InicioPrevisto && !ordem.FimPrevisto) {
        ordemArrastada.value = null
        backlogHover.value = false
        celulaHoraHover.value = null
        return
      }

      await voltarParaBacklog(ordem)

      ordemArrastada.value = null
      backlogHover.value = false
      celulaHoraHover.value = null
    }

    async function soltarOrdem(data) {
      if (!ordemArrastada.value) return

      const ordem = ordemArrastada.value
      ordemAgendamento.value = ordem

      // Definir data padrão - parse correto da data local
      const [ano, mes, dia] = data.split('-').map(Number)
      const dataInicio = new Date(ano, mes - 1, dia, 8, 0, 0, 0)

      // Usar DuracaoHoras se disponível, caso contrário usar horário padrão até 17h
      const duracaoHoras = ordem.DuracaoHoras || 9
      const dataFim = new Date(dataInicio.getTime() + duracaoHoras * 60 * 60 * 1000)

      formAgendamento.value = {
        dataInicio: formatarDataHoraParaInput(dataInicio),
        dataFim: formatarDataHoraParaInput(dataFim),
        idEquipe: ordem.IdEquipe || null,
        recorrente: false,
        tipoRecorrencia: 'daily',
        intervalo: 1,
        dataFimRecorrencia: null
      }

      dialogAgendamento.value = true
      ordemArrastada.value = null
      celulaHover.value = null
      celulaHoraHover.value = null
    }

    async function soltarOrdemSemana(data, hora) {
      if (!ordemArrastada.value) return

      const ordem = ordemArrastada.value
      ordemAgendamento.value = ordem

      // Definir data e hora específica
      const [ano, mes, dia] = data.split('-').map(Number)
      const dataInicio = new Date(ano, mes - 1, dia, hora, 0, 0, 0)

      // Usar DuracaoHoras se disponível, caso contrário usar 1 hora
      const duracaoHoras = ordem.DuracaoHoras || 1
      const dataFim = new Date(dataInicio.getTime() + duracaoHoras * 60 * 60 * 1000)

      formAgendamento.value = {
        dataInicio: formatarDataHoraParaInput(dataInicio),
        dataFim: formatarDataHoraParaInput(dataFim),
        idEquipe: ordem.IdEquipe || null,
        recorrente: false,
        tipoRecorrencia: 'daily',
        intervalo: 1,
        dataFimRecorrencia: null
      }

      dialogAgendamento.value = true
      ordemArrastada.value = null
      celulaHover.value = null
      celulaHoraHover.value = null
    }

    function agendarOrdem(ordem) {
      ordemAgendamento.value = ordem

      const dataInicio = new Date()
      dataInicio.setHours(8, 0, 0, 0)

      // Usar DuracaoHoras se disponível, caso contrário usar horário padrão até 17h (9 horas)
      const duracaoHoras = ordem.DuracaoHoras || 9
      const dataFim = new Date(dataInicio.getTime() + duracaoHoras * 60 * 60 * 1000)

      formAgendamento.value = {
        dataInicio: formatarDataHoraParaInput(dataInicio),
        dataFim: formatarDataHoraParaInput(dataFim),
        idEquipe: ordem.IdEquipe || null,
        recorrente: false,
        tipoRecorrencia: 'daily',
        intervalo: 1,
        dataFimRecorrencia: null
      }

      dialogAgendamento.value = true
    }

    function editarAgendamento(ordem) {
      ordemAgendamento.value = ordem

      formAgendamento.value = {
        dataInicio: formatarDataHoraParaInput(ordem.InicioPrevisto),
        dataFim: formatarDataHoraParaInput(ordem.FimPrevisto),
        idEquipe: ordem.IdEquipe || null,
        recorrente: false,
        tipoRecorrencia: 'daily',
        intervalo: 1,
        dataFimRecorrencia: null
      }

      dialogAgendamento.value = true
    }

    async function salvarAgendamento() {
      try {
        const ordem = ordemAgendamento.value
        ordem.InicioPrevisto = new Date(formAgendamento.value.dataInicio)
        ordem.FimPrevisto = new Date(formAgendamento.value.dataFim)
        ordem.IdEquipe = formAgendamento.value.idEquipe

        await store.updateOrdemServico(ordem)

        // Criar recorrências se necessário
        if (formAgendamento.value.recorrente) {
          await criarRecorrencias(ordem)
        }

        $q.notify({
          type: 'positive',
          message: 'Ordem agendada com sucesso',
          timeout: 3000,
          position: 'top-right'
        })

        dialogAgendamento.value = false
        ordemAgendamento.value = null
      } catch (error) {
        console.error('Erro ao agendar ordem:', error)
        $q.notify({
          type: 'negative',
          message: 'Erro ao agendar ordem',
          timeout: 3000,
          position: 'top-right'
        })
      }
    }

    async function criarRecorrencias(ordemOriginal) {
      const { tipoRecorrencia, intervalo } = formAgendamento.value
      const dataInicio = new Date(formAgendamento.value.dataInicio)
      const dataFim = new Date(formAgendamento.value.dataFimRecorrencia)

      let dataAtualRecorrencia = new Date(dataInicio)
      const ordensRecorrentes = []

      while (dataAtualRecorrencia <= dataFim) {
        // Avançar para próxima ocorrência
        if (tipoRecorrencia === 'daily') {
          dataAtualRecorrencia.setDate(dataAtualRecorrencia.getDate() + intervalo)
        } else if (tipoRecorrencia === 'weekly') {
          dataAtualRecorrencia.setDate(dataAtualRecorrencia.getDate() + (7 * intervalo))
        } else if (tipoRecorrencia === 'monthly') {
          dataAtualRecorrencia.setMonth(dataAtualRecorrencia.getMonth() + intervalo)
        }

        if (dataAtualRecorrencia > dataFim) break

        // Criar cópia da ordem
        const novaOrdem = {
          ...JSON.parse(JSON.stringify(ordemOriginal)),
          InicioPrevisto: new Date(dataAtualRecorrencia),
          FimPrevisto: new Date(dataAtualRecorrencia.getTime() +
            (new Date(formAgendamento.value.dataFim) - new Date(formAgendamento.value.dataInicio))),
          recorrente: true
        }

        ordensRecorrentes.push(novaOrdem)
      }

      // Salvar todas as ordens recorrentes
      for (const ordem of ordensRecorrentes) {
        await store.updateOrdemServico(ordem)
      }

      $q.notify({
        type: 'info',
        message: `${ordensRecorrentes.length} recorrência(s) criada(s)`,
        timeout: 3000,
        position: 'top-right'
      })
    }

    async function removerAgendamento(ordem) {
      $q.dialog({
        title: 'Remover Agendamento',
        message: 'Deseja remover o agendamento desta ordem?',
        cancel: true
      }).onOk(async () => {
        try {
          ordem.InicioPrevisto = null
          ordem.FimPrevisto = null
          await store.updateOrdemServico(ordem)

          $q.notify({
            type: 'positive',
            message: 'Agendamento removido',
            timeout: 3000,
            position: 'top-right'
          })
        } catch (error) {
          console.error('Erro ao remover agendamento:', error)
        }
      })
    }

    async function voltarParaBacklog(ordem) {
      try {
        ordem.InicioPrevisto = null
        ordem.FimPrevisto = null
        await store.updateOrdemServico(ordem)

        $q.notify({
          type: 'positive',
          message: 'Ordem retornada ao backlog',
          timeout: 3000,
          position: 'top-right'
        })
      } catch (error) {
        console.error('Erro ao voltar ordem para backlog:', error)
        $q.notify({
          type: 'negative',
          message: 'Erro ao retornar ordem ao backlog',
          timeout: 3000,
          position: 'top-right'
        })
      }
    }

    function verDetalhes(ordem) {
      router.push(`/ordens-servico/${ordem.Id}`)
    }

    function getHintIntervalo(tipo) {
      const hints = {
        daily: t('forms.ordemServico.programacao.recurrenceHints.daily'),
        weekly: t('forms.ordemServico.programacao.recurrenceHints.weekly'),
        monthly: t('forms.ordemServico.programacao.recurrenceHints.monthly')
      }
      return hints[tipo] || ''
    }

    async function carregarDados() {
      try {
        await store.loadOrdensServico()
        equipes.value = await equipeRepository.getAll()
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        $q.notify({
          type: 'negative',
          message: 'Erro ao carregar dados',
          timeout: 3000,
          position: 'top-right'
        })
      }
    }

    onMounted(async () => {
      await carregarDados()
    })

    return {
      equipeSelecionada,
      visualizacao,
      dataAtual,
      mostrarPainel,
      celulaHover,
      celulaHoraHover,
      backlogHover,
      diaSelecionadoGrafico,
      equipes,
      dialogAgendamento,
      ordemAgendamento,
      formAgendamento,
      visualizacaoOptions,
      tiposRecorrencia,
      diasSemana,
      equipesOptions,
      ordensNaoProgramadas,
      ordensProgramadas,
      tituloCalendario,
      tituloGrafico,
      diasMes,
      diasSemanaAtual,
      eventosFiltrados,
      getNomeEquipe,
      getCorEquipe,
      getHorasDisponiveis,
      getHorasOcupadas,
      getOcupacaoEquipe,
      getCorOcupacao,
      getHorasBacklogSemEquipe,
      getEventosDia,
      getEventosDiaHora,
      calcularEstiloEvento,
      formatarData,
      filtrarPorEquipe,
      anteriorPeriodo,
      proximoPeriodo,
      irParaHoje,
      selecionarDiaGrafico,
      limparDiaSelecionado,
      iniciarArrastar,
      finalizarArrastar,
      marcarCelulaHoverDrag,
      marcarCelulaHover,
      marcarCelulaHoraHover,
      desmarcarCelulaHover,
      marcarBacklogHover,
      desmarcarBacklogHover,
      soltarNoBacklog,
      soltarOrdem,
      soltarOrdemSemana,
      agendarOrdem,
      editarAgendamento,
      salvarAgendamento,
      removerAgendamento,
      voltarParaBacklog,
      verDetalhes,
      getHintIntervalo,
      carregarDados,
      store
    }
  }
})
</script>

<style lang="sass" scoped>
.equipe-cor-circulo
  width: 10px
  height: 10px
  border-radius: 50%
  border: 1px solid rgba(0, 0, 0, 0.15)
  flex-shrink: 0

.ordem-item
  &:hover
    background-color: rgba(0, 0, 0, 0.05)

  &[draggable="true"]
    cursor: move

.backlog-drop-zone
  min-height: 300px
  transition: background-color 0.2s, border 0.2s

  &.backlog-drag-over
    background-color: #BBDEFB
    border: 2px dashed #1976D2
    box-shadow: inset 0 0 10px rgba(25, 118, 210, 0.3)

.calendario-container
  min-height: 600px

.calendario-mes
  .calendario-header
    display: grid
    grid-template-columns: repeat(7, 1fr)
    background-color: #f5f5f5
    border-bottom: 2px solid #e0e0e0

  .dia-semana-header
    padding: 12px 8px
    text-align: center
    font-weight: 600
    color: #666

  .calendario-grade
    display: grid
    grid-template-columns: repeat(7, 1fr)
    gap: 1px
    background-color: #e0e0e0

  .dia-celula
    background-color: white
    min-height: 100px
    padding: 4px
    cursor: pointer
    transition: background-color 0.2s, border 0.2s, box-shadow 0.2s
    position: relative

    &:hover
      background-color: #f5f5f5

    &.outro-mes
      opacity: 0.5

    &.hoje
      background-color: #e3f2fd

    &.dia-selecionado
      background-color: #fff3e0
      border: 2px solid #ff9800
      box-shadow: 0 0 8px rgba(255, 152, 0, 0.3)

    &.drag-over
      background-color: #BBDEFB
      border: 2px dashed #1976D2
      box-shadow: inset 0 0 10px rgba(25, 118, 210, 0.3)

      .dia-numero,
      .ordens-dia
        pointer-events: none

  .dia-numero
    font-size: 14px
    font-weight: 500
    margin-bottom: 4px
    color: #333
    pointer-events: none

  .ordens-dia
    display: flex
    flex-direction: column
    gap: 2px
    pointer-events: none

  .evento-item
    padding: 4px 6px
    border-radius: 4px
    color: white
    font-size: 11px
    cursor: pointer
    transition: opacity 0.2s
    pointer-events: auto

    &:hover
      opacity: 0.8

  .evento-conteudo
    display: flex
    align-items: center
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

.calendario-semana
  .semana-header
    display: grid
    grid-template-columns: 60px repeat(7, 1fr)
    background-color: #f5f5f5
    border-bottom: 2px solid #e0e0e0

  .dia-coluna-header
    padding: 12px 8px
    text-align: center
    border-left: 1px solid #e0e0e0

    &.hoje
      background-color: #e3f2fd

  .dia-nome
    font-weight: 600
    color: #666
    font-size: 12px

  .dia-numero
    font-size: 20px
    font-weight: 500
    color: #333

  .semana-corpo
    display: grid
    grid-template-columns: 60px repeat(7, 1fr)

  .horas-coluna
    border-right: 2px solid #e0e0e0

  .hora-label
    height: 60px
    padding: 8px
    font-size: 11px
    color: #666
    border-bottom: 1px solid #e0e0e0

  .dia-coluna
    border-left: 1px solid #e0e0e0
    transition: background-color 0.2s, border 0.2s
    position: relative

    &.drag-over
      background-color: #BBDEFB
      border-left: 3px solid #1976D2
      border-right: 3px solid #1976D2

      .hora-celula
        pointer-events: none

        .evento-semana
          pointer-events: auto

  .hora-celula
    height: 60px
    border-bottom: 1px solid #e0e0e0
    position: relative
    cursor: pointer
    transition: background-color 0.2s, border 0.2s

    &:hover
      background-color: #f5f5f5

    &.drag-over
      background-color: #BBDEFB
      border: 2px solid #1976D2

      .evento-semana
        pointer-events: none

  .evento-semana
    position: absolute
    top: 2px
    left: 2px
    right: 2px
    pointer-events: auto
    padding: 4px
    border-radius: 4px
    color: white
    font-size: 11px
    cursor: pointer
    overflow: hidden
    z-index: 1

    &:hover
      opacity: 0.8

.calendario-lista
  min-height: 400px

@media (max-width: 599px)
  .calendario-mes
    .dia-celula
      min-height: 60px
      font-size: 12px

    .dia-numero
      font-size: 12px

    .evento-item
      font-size: 9px
      padding: 2px 4px

  .calendario-semana
    .dia-numero
      font-size: 16px

    .hora-celula
      height: 40px

    .hora-label
      height: 40px
      font-size: 9px
</style>
