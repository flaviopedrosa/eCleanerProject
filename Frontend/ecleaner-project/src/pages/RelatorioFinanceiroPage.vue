<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-icon name="analytics" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            Relatório Financeiro de Ordens de Serviço
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
      </div>
      <div class="col-auto">
        <q-btn color="primary" icon="refresh" label="Atualizar" flat @click="carregarDados" />
        <q-btn color="secondary" icon="download" label="Exportar PDF" flat @click="exportarPDF" class="q-ml-sm" />
      </div>
    </div>

    <!-- Filtros -->
    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="text-subtitle2 q-mb-md text-weight-medium">
          <q-icon name="filter_alt" size="20px" class="q-mr-xs" />
          Filtros
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-3">
            <q-input v-model="filtros.dataInicio" type="date" label="Data Início" filled dense>
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-3">
            <q-input v-model="filtros.dataFim" type="date" label="Data Fim" filled dense>
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-3">
            <q-select v-model="filtros.status" :options="statusOptions" label="Status" filled clearable emit-value
              map-options dense multiple>
              <template v-slot:prepend>
                <q-icon name="info" />
              </template>
            </q-select>
          </div>
          <div class="col-12 col-md-3">
            <q-select v-model="filtros.equipe" :options="equipesOptions" label="Equipe" filled clearable emit-value
              map-options dense>
              <template v-slot:prepend>
                <q-icon name="groups" />
              </template>
            </q-select>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Loading -->
    <div v-if="loading" class="row justify-center q-pa-xl">
      <q-spinner-dots color="primary" size="50px" />
    </div>

    <!-- Conteúdo do Relatório -->
    <div v-else>
      <!-- Tabs para alternar entre visualizações -->
      <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="left">
        <q-tab name="graficos" icon="bar_chart" label="Visualização por Gráficos" />
        <q-tab name="valores" icon="table_chart" label="Visualização por Valores" />
      </q-tabs>

      <q-separator class="q-mb-lg" />

      <q-tab-panels v-model="tab" animated>
        <!-- Tab Panel: Visualização por Gráficos -->
        <q-tab-panel name="graficos">
          <!-- Resumo em Cards Compactos -->
          <div class="row q-col-gutter-md q-mb-lg">
            <div class="col-12 col-md-4">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 text-weight-medium q-mb-sm">Previsto</div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Ordens</div>
                      <div class="text-h6 text-weight-bold text-primary">{{ resumo.previsto.totalOrdens }}</div>
                    </div>
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Receita</div>
                      <div class="text-body1 text-weight-bold text-info">{{ formatCurrency(resumo.previsto.receita) }}
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Custo</div>
                      <div class="text-body1 text-weight-bold text-info">{{ formatCurrency(resumo.previsto.custo) }}
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Lucro</div>
                      <div class="text-body1 text-weight-bold text-info">{{ formatCurrency(resumo.previsto.lucro) }}
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-4">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 text-weight-medium q-mb-sm">A Receber</div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Ordens</div>
                      <div class="text-h6 text-weight-bold text-orange">{{ resumo.aReceber.totalOrdens }}</div>
                    </div>
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Receita</div>
                      <div class="text-body1 text-weight-bold text-orange">{{ formatCurrency(resumo.aReceber.receita) }}
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Custo</div>
                      <div class="text-body1 text-weight-bold text-orange">{{ formatCurrency(resumo.aReceber.custo) }}
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Lucro</div>
                      <div class="text-body1 text-weight-bold text-orange">{{ formatCurrency(resumo.aReceber.lucro) }}
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-4">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 text-weight-medium q-mb-sm">Recebido</div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Ordens</div>
                      <div class="text-h6 text-weight-bold text-positive">{{ resumo.recebido.totalOrdens }}</div>
                    </div>
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Receita</div>
                      <div class="text-body1 text-weight-bold text-positive">{{ formatCurrency(resumo.recebido.receita)
                        }}
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Custo</div>
                      <div class="text-body1 text-weight-bold text-negative">{{ formatCurrency(resumo.recebido.custo) }}
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Lucro</div>
                      <div class="text-body1 text-weight-bold"
                        :class="resumo.recebido.lucro >= 0 ? 'text-positive' : 'text-negative'">
                        {{ formatCurrency(resumo.recebido.lucro) }}
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Gráficos de Barras Comparativos -->
          <div class="row q-col-gutter-md q-mb-lg">
            <!-- Gráfico de Receita -->
            <div class="col-12 col-md-4">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 text-weight-medium q-mb-md text-center">
                    <q-icon name="trending_up" color="positive" size="24px" />
                    <div>Receita</div>
                  </div>
                  <div class="chart-wrapper">
                    <div class="chart-bar-vertical">
                      <div class="bar-container">
                        <div class="bar-label">Prevista</div>
                        <div class="bar-wrapper">
                          <div class="bar bar-info"
                            :style="{ height: getBarHeight(resumo.previsto.receita, getMaxValue('receita')) }">
                            <div class="bar-value">{{ formatCurrencyShort(resumo.previsto.receita) }}</div>
                          </div>
                        </div>
                      </div>
                      <div class="bar-container">
                        <div class="bar-label">A Receber</div>
                        <div class="bar-wrapper">
                          <div class="bar bar-orange"
                            :style="{ height: getBarHeight(resumo.aReceber.receita, getMaxValue('receita')) }">
                            <div class="bar-value">{{ formatCurrencyShort(resumo.aReceber.receita) }}</div>
                          </div>
                        </div>
                        <div class="bar-percentage">{{ getPercentage(resumo.aReceber.receita, resumo.previsto.receita)
                          }}%
                        </div>
                      </div>
                      <div class="bar-container">
                        <div class="bar-label">Recebida</div>
                        <div class="bar-wrapper">
                          <div class="bar bar-positive"
                            :style="{ height: getBarHeight(resumo.recebido.receita, getMaxValue('receita')) }">
                            <div class="bar-value">{{ formatCurrencyShort(resumo.recebido.receita) }}</div>
                          </div>
                        </div>
                        <div class="bar-percentage">{{ getPercentage(resumo.recebido.receita, resumo.previsto.receita)
                          }}%
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- Gráfico de Custo -->
            <div class="col-12 col-md-4">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 text-weight-medium q-mb-md text-center">
                    <q-icon name="trending_down" color="negative" size="24px" />
                    <div>Custo</div>
                  </div>
                  <div class="chart-wrapper">
                    <div class="chart-bar-vertical">
                      <div class="bar-container">
                        <div class="bar-label">Previsto</div>
                        <div class="bar-wrapper">
                          <div class="bar bar-info"
                            :style="{ height: getBarHeight(resumo.previsto.custo, getMaxValue('custo')) }">
                            <div class="bar-value">{{ formatCurrencyShort(resumo.previsto.custo) }}</div>
                          </div>
                        </div>
                      </div>
                      <div class="bar-container">
                        <div class="bar-label">A Receber</div>
                        <div class="bar-wrapper">
                          <div class="bar bar-orange"
                            :style="{ height: getBarHeight(resumo.aReceber.custo, getMaxValue('custo')) }">
                            <div class="bar-value">{{ formatCurrencyShort(resumo.aReceber.custo) }}</div>
                          </div>
                        </div>
                        <div class="bar-percentage">{{ getPercentage(resumo.aReceber.custo, resumo.previsto.custo) }}%
                        </div>
                      </div>
                      <div class="bar-container">
                        <div class="bar-label">Realizado</div>
                        <div class="bar-wrapper">
                          <div class="bar bar-negative"
                            :style="{ height: getBarHeight(resumo.recebido.custo, getMaxValue('custo')) }">
                            <div class="bar-value">{{ formatCurrencyShort(resumo.recebido.custo) }}</div>
                          </div>
                        </div>
                        <div class="bar-percentage">{{ getPercentage(resumo.recebido.custo, resumo.previsto.custo) }}%
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- Gráfico de Lucro -->
            <div class="col-12 col-md-4">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 text-weight-medium q-mb-md text-center">
                    <q-icon name="account_balance_wallet" color="primary" size="24px" />
                    <div>Lucro</div>
                  </div>
                  <div class="chart-wrapper">
                    <div class="chart-bar-vertical">
                      <div class="bar-container">
                        <div class="bar-label">Previsto</div>
                        <div class="bar-wrapper">
                          <div class="bar bar-info"
                            :style="{ height: getBarHeight(Math.abs(resumo.previsto.lucro), getMaxValue('lucro')) }">
                            <div class="bar-value">{{ formatCurrencyShort(resumo.previsto.lucro) }}</div>
                          </div>
                        </div>
                      </div>
                      <div class="bar-container">
                        <div class="bar-label">A Receber</div>
                        <div class="bar-wrapper">
                          <div class="bar" :class="resumo.aReceber.lucro >= 0 ? 'bar-orange' : 'bar-negative'"
                            :style="{ height: getBarHeight(Math.abs(resumo.aReceber.lucro), getMaxValue('lucro')) }">
                            <div class="bar-value">{{ formatCurrencyShort(resumo.aReceber.lucro) }}</div>
                          </div>
                        </div>
                        <div class="bar-percentage">{{ getPercentage(resumo.aReceber.lucro, resumo.previsto.lucro) }}%
                        </div>
                      </div>
                      <div class="bar-container">
                        <div class="bar-label">Realizado</div>
                        <div class="bar-wrapper">
                          <div class="bar" :class="resumo.recebido.lucro >= 0 ? 'bar-positive' : 'bar-negative'"
                            :style="{ height: getBarHeight(Math.abs(resumo.recebido.lucro), getMaxValue('lucro')) }">
                            <div class="bar-value">{{ formatCurrencyShort(resumo.recebido.lucro) }}</div>
                          </div>
                        </div>
                        <div class="bar-percentage">{{ getPercentage(resumo.recebido.lucro, resumo.previsto.lucro) }}%
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Gráfico de Pizza - Custos por Tipo -->
          <div class="row q-col-gutter-md q-mb-lg">
            <div class="col-12 col-md-6">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 text-weight-medium q-mb-md text-center">
                    <q-icon name="pie_chart" color="primary" />
                    Distribuição de Custos por Tipo
                  </div>
                  <div v-if="chartDataCustos.length > 0" class="pie-chart-container">
                    <div v-for="(item, index) in chartDataCustos" :key="index" class="pie-item q-mb-md">
                      <div class="row items-center q-mb-xs">
                        <div class="pie-legend" :style="{ backgroundColor: item.color }"></div>
                        <span class="text-body2 q-ml-sm">{{ item.label }}</span>
                        <q-space />
                        <span class="text-weight-bold">{{ formatCurrency(item.value) }}</span>
                      </div>
                      <q-linear-progress :value="item.percentage / 100" :color="item.colorName" size="20px">
                        <div class="absolute-full flex flex-center">
                          <span class="text-white text-caption">{{ item.percentage.toFixed(1) }}%</span>
                        </div>
                      </q-linear-progress>
                    </div>
                  </div>
                  <div v-else class="text-center text-grey-7 q-pa-lg">
                    Nenhum custo registrado
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- Gráfico de Pizza - Receita por Status -->
            <div class="col-12 col-md-6">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 text-weight-medium q-mb-md text-center">
                    <q-icon name="donut_large" color="primary" />
                    Distribuição de Receita por Status
                  </div>
                  <div v-if="chartDataReceita.length > 0" class="pie-chart-container">
                    <div v-for="(item, index) in chartDataReceita" :key="index" class="pie-item q-mb-md">
                      <div class="row items-center q-mb-xs">
                        <div class="pie-legend" :style="{ backgroundColor: item.color }"></div>
                        <span class="text-body2 q-ml-sm">{{ item.label }}</span>
                        <q-space />
                        <span class="text-weight-bold">{{ formatCurrency(item.value) }}</span>
                      </div>
                      <q-linear-progress :value="item.percentage / 100" :color="item.colorName" size="20px">
                        <div class="absolute-full flex flex-center">
                          <span class="text-white text-caption">{{ item.percentage.toFixed(1) }}%</span>
                        </div>
                      </q-linear-progress>
                    </div>
                  </div>
                  <div v-else class="text-center text-grey-7 q-pa-lg">
                    Nenhuma receita registrada
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Gráfico de Colaboradores -->
          <div class="row q-col-gutter-md q-mb-lg">
            <div class="col-12">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 text-weight-medium q-mb-md text-center">
                    <q-icon name="groups" color="primary" />
                    Desempenho Financeiro por Equipe
                  </div>
                  <div v-if="Object.keys(resumo.colaboradoresPorEquipe).length > 0">
                    <div v-for="(equipeData, equipeNome) in resumo.colaboradoresPorEquipe" :key="equipeNome"
                      class="q-mb-lg">
                      <div class="text-body1 text-weight-bold q-mb-sm">{{ equipeNome }}</div>
                      <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-3">
                          <div class="stat-box">
                            <div class="stat-label">Horas Totais</div>
                            <div class="stat-value text-primary">{{ equipeData.totalHoras.toFixed(1) }}h</div>
                          </div>
                        </div>
                        <div class="col-12 col-md-3">
                          <div class="stat-box">
                            <div class="stat-label">Custo Total</div>
                            <div class="stat-value text-negative">{{ formatCurrency(equipeData.totalCusto) }}</div>
                          </div>
                        </div>
                        <div class="col-12 col-md-3">
                          <div class="stat-box">
                            <div class="stat-label">Receita Gerada</div>
                            <div class="stat-value text-positive">{{ formatCurrency(equipeData.totalReceita) }}</div>
                          </div>
                        </div>
                        <div class="col-12 col-md-3">
                          <div class="stat-box">
                            <div class="stat-label">Lucro Gerado</div>
                            <div class="stat-value"
                              :class="equipeData.totalLucro >= 0 ? 'text-positive' : 'text-negative'">
                              {{ formatCurrency(equipeData.totalLucro) }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-center text-grey-7 q-pa-lg">
                    Nenhuma equipe alocada
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-tab-panel>

        <!-- Tab Panel: Visualização por Valores -->
        <q-tab-panel name="valores">
          <!-- Cards de Resumo - Previsto (Todas as Ordens) -->
          <div class="text-h6 text-weight-medium q-mb-md q-mt-md">
            <q-icon name="event_note" color="primary" class="q-mr-sm" />
            Valores Previstos (Todas as Ordens)
          </div>
          <div class="row q-col-gutter-md q-mb-lg">
            <div class="col-12 col-md-2">
              <q-card flat bordered class="summary-card">
                <q-card-section>
                  <div class="text-caption text-grey-7">Total de Ordens</div>
                  <div class="text-h4 text-weight-bold text-primary">{{ resumo.previsto.totalOrdens }}</div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-2">
              <q-card flat bordered class="summary-card">
                <q-card-section>
                  <div class="text-caption text-grey-7">Receita Prevista</div>
                  <div class="text-h4 text-weight-bold text-info">{{ formatCurrency(resumo.previsto.receita) }}</div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-2">
              <q-card flat bordered class="summary-card">
                <q-card-section>
                  <div class="text-caption text-grey-7">Custo Previsto</div>
                  <div class="text-h4 text-weight-bold text-info">{{ formatCurrency(resumo.previsto.custo) }}</div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-2">
              <q-card flat bordered class="summary-card">
                <q-card-section>
                  <div class="text-caption text-grey-7">Custo Colaboradores</div>
                  <div class="text-h5 text-weight-bold text-warning">{{
                    formatCurrency(resumo.previsto.custoColaboradores)
                    }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-2">
              <q-card flat bordered class="summary-card">
                <q-card-section>
                  <div class="text-caption text-grey-7">Outros Custos</div>
                  <div class="text-h5 text-weight-bold text-info">{{ formatCurrency(resumo.previsto.custo -
                    resumo.previsto.custoColaboradores) }}</div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-2">
              <q-card flat bordered class="summary-card">
                <q-card-section>
                  <div class="text-caption text-grey-7">Lucro Previsto</div>
                  <div class="text-h4 text-weight-bold text-info">{{ formatCurrency(resumo.previsto.lucro) }}</div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Cards - A Receber (Ordens Concluídas) -->
          <div class="text-h6 text-weight-medium q-mb-md">
            <q-icon name="schedule" color="orange" class="q-mr-sm" />
            Valores A Receber (Ordens Concluídas)
          </div>
          <div class="row q-col-gutter-md q-mb-lg">
            <div class="col-12 col-md-3">
              <q-card flat bordered class="summary-card">
                <q-card-section>
                  <div class="text-caption text-grey-7">Ordens Concluídas</div>
                  <div class="text-h4 text-weight-bold text-orange">{{ resumo.aReceber.totalOrdens }}</div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-3">
              <q-card flat bordered class="summary-card">
                <q-card-section>
                  <div class="text-caption text-grey-7">Receita A Receber</div>
                  <div class="text-h4 text-weight-bold text-orange">{{ formatCurrency(resumo.aReceber.receita) }}</div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-3">
              <q-card flat bordered class="summary-card">
                <q-card-section>
                  <div class="text-caption text-grey-7">Custo A Receber</div>
                  <div class="text-h4 text-weight-bold text-orange">{{ formatCurrency(resumo.aReceber.custo) }}</div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-3">
              <q-card flat bordered class="summary-card">
                <q-card-section>
                  <div class="text-caption text-grey-7">Lucro A Receber</div>
                  <div class="text-h4 text-weight-bold text-orange">{{ formatCurrency(resumo.aReceber.lucro) }}</div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Cards - Recebido (Ordens com Status Recebido) -->
          <div class="text-h6 text-weight-medium q-mb-md">
            <q-icon name="check_circle" color="positive" class="q-mr-sm" />
            Valores Recebidos (Ordens Pagas)
          </div>
          <div class="row q-col-gutter-md q-mb-lg">
            <div class="col-12 col-md-3">
              <q-card flat bordered class="summary-card">
                <q-card-section>
                  <div class="text-caption text-grey-7">Ordens Recebidas</div>
                  <div class="text-h4 text-weight-bold text-positive">{{ resumo.recebido.totalOrdens }}</div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-3">
              <q-card flat bordered class="summary-card">
                <q-card-section>
                  <div class="text-caption text-grey-7">Receita Recebida</div>
                  <div class="text-h4 text-weight-bold text-positive">{{ formatCurrency(resumo.recebido.receita) }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-3">
              <q-card flat bordered class="summary-card">
                <q-card-section>
                  <div class="text-caption text-grey-7">Custo Realizado</div>
                  <div class="text-h4 text-weight-bold text-negative">{{ formatCurrency(resumo.recebido.custo) }}</div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-3">
              <q-card flat bordered class="summary-card"
                :class="resumo.recebido.lucro >= 0 ? 'profit-card' : 'loss-card'">
                <q-card-section>
                  <div class="text-caption text-grey-7">Lucro Realizado</div>
                  <div class="text-h4 text-weight-bold"
                    :class="resumo.recebido.lucro >= 0 ? 'text-positive' : 'text-negative'">
                    {{ formatCurrency(resumo.recebido.lucro) }}
                  </div>
                  <div class="text-caption">
                    Margem: {{ resumo.recebido.margemLucro.toFixed(2) }}%
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Gráfico Comparativo -->
          <div class="row q-col-gutter-md q-mb-lg">
            <div class="col-12">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 text-weight-medium q-mb-md">
                    <q-icon name="bar_chart" color="primary" class="q-mr-xs" />
                    Comparativo: Previsto vs A Receber vs Recebido
                  </div>
                  <div class="row q-col-gutter-md">
                    <div class="col-12 col-md-4">
                      <div class="text-body2 text-weight-bold q-mb-sm">Receita</div>
                      <div class="chart-bar-item">
                        <div class="row items-center justify-between q-mb-xs">
                          <span class="text-caption">Prevista</span>
                          <span class="text-weight-medium">{{ formatCurrency(resumo.previsto.receita) }}</span>
                        </div>
                        <q-linear-progress :value="1" color="info" size="25px" />
                      </div>
                      <div class="chart-bar-item q-mt-md">
                        <div class="row items-center justify-between q-mb-xs">
                          <span class="text-caption">A Receber</span>
                          <span class="text-weight-medium">{{ formatCurrency(resumo.aReceber.receita) }}</span>
                        </div>
                        <q-linear-progress
                          :value="resumo.previsto.receita > 0 ? resumo.aReceber.receita / resumo.previsto.receita : 0"
                          color="orange" size="25px">
                          <div class="absolute-full flex flex-center">
                            <span class="text-white text-caption text-weight-bold">
                              {{ resumo.previsto.receita > 0 ? ((resumo.aReceber.receita / resumo.previsto.receita) *
                                100).toFixed(1) : 0 }}%
                            </span>
                          </div>
                        </q-linear-progress>
                      </div>
                      <div class="chart-bar-item q-mt-md">
                        <div class="row items-center justify-between q-mb-xs">
                          <span class="text-caption">Recebida</span>
                          <span class="text-weight-medium">{{ formatCurrency(resumo.recebido.receita) }}</span>
                        </div>
                        <q-linear-progress
                          :value="resumo.previsto.receita > 0 ? resumo.recebido.receita / resumo.previsto.receita : 0"
                          color="positive" size="25px">
                          <div class="absolute-full flex flex-center">
                            <span class="text-white text-caption text-weight-bold">
                              {{ resumo.previsto.receita > 0 ? ((resumo.recebido.receita / resumo.previsto.receita) *
                                100).toFixed(1) : 0 }}%
                            </span>
                          </div>
                        </q-linear-progress>
                      </div>
                    </div>
                    <div class="col-12 col-md-4">
                      <div class="text-body2 text-weight-bold q-mb-sm">Custo</div>
                      <div class="chart-bar-item">
                        <div class="row items-center justify-between q-mb-xs">
                          <span class="text-caption">Previsto</span>
                          <span class="text-weight-medium">{{ formatCurrency(resumo.previsto.custo) }}</span>
                        </div>
                        <q-linear-progress :value="1" color="info" size="25px" />
                      </div>
                      <div class="chart-bar-item q-mt-md">
                        <div class="row items-center justify-between q-mb-xs">
                          <span class="text-caption">A Receber</span>
                          <span class="text-weight-medium">{{ formatCurrency(resumo.aReceber.custo) }}</span>
                        </div>
                        <q-linear-progress
                          :value="resumo.previsto.custo > 0 ? resumo.aReceber.custo / resumo.previsto.custo : 0"
                          color="orange" size="25px">
                          <div class="absolute-full flex flex-center">
                            <span class="text-white text-caption text-weight-bold">
                              {{ resumo.previsto.custo > 0 ? ((resumo.aReceber.custo / resumo.previsto.custo) *
                                100).toFixed(1)
                              : 0 }}%
                            </span>
                          </div>
                        </q-linear-progress>
                      </div>
                      <div class="chart-bar-item q-mt-md">
                        <div class="row items-center justify-between q-mb-xs">
                          <span class="text-caption">Realizado</span>
                          <span class="text-weight-medium">{{ formatCurrency(resumo.recebido.custo) }}</span>
                        </div>
                        <q-linear-progress
                          :value="resumo.previsto.custo > 0 ? resumo.recebido.custo / resumo.previsto.custo : 0"
                          color="negative" size="25px">
                          <div class="absolute-full flex flex-center">
                            <span class="text-white text-caption text-weight-bold">
                              {{ resumo.previsto.custo > 0 ? ((resumo.recebido.custo / resumo.previsto.custo) *
                                100).toFixed(1)
                              : 0 }}%
                            </span>
                          </div>
                        </q-linear-progress>
                      </div>
                    </div>
                    <div class="col-12 col-md-4">
                      <div class="text-body2 text-weight-bold q-mb-sm">Lucro</div>
                      <div class="chart-bar-item">
                        <div class="row items-center justify-between q-mb-xs">
                          <span class="text-caption">Previsto</span>
                          <span class="text-weight-medium">{{ formatCurrency(resumo.previsto.lucro) }}</span>
                        </div>
                        <q-linear-progress :value="1" color="info" size="25px" />
                      </div>
                      <div class="chart-bar-item q-mt-md">
                        <div class="row items-center justify-between q-mb-xs">
                          <span class="text-caption">A Receber</span>
                          <span class="text-weight-medium">{{ formatCurrency(resumo.aReceber.lucro) }}</span>
                        </div>
                        <q-linear-progress
                          :value="resumo.previsto.lucro > 0 ? Math.abs(resumo.aReceber.lucro / resumo.previsto.lucro) : 0"
                          :color="resumo.aReceber.lucro >= 0 ? 'orange' : 'negative'" size="25px">
                          <div class="absolute-full flex flex-center">
                            <span class="text-white text-caption text-weight-bold">
                              {{ resumo.previsto.lucro > 0 ? ((resumo.aReceber.lucro / resumo.previsto.lucro) *
                                100).toFixed(1)
                              : 0 }}%
                            </span>
                          </div>
                        </q-linear-progress>
                      </div>
                      <div class="chart-bar-item q-mt-md">
                        <div class="row items-center justify-between q-mb-xs">
                          <span class="text-caption">Realizado</span>
                          <span class="text-weight-medium">{{ formatCurrency(resumo.recebido.lucro) }}</span>
                        </div>
                        <q-linear-progress
                          :value="resumo.previsto.lucro > 0 ? Math.abs(resumo.recebido.lucro / resumo.previsto.lucro) : 0"
                          :color="resumo.recebido.lucro >= 0 ? 'positive' : 'negative'" size="25px">
                          <div class="absolute-full flex flex-center">
                            <span class="text-white text-caption text-weight-bold">
                              {{ resumo.previsto.lucro > 0 ? ((resumo.recebido.lucro / resumo.previsto.lucro) *
                                100).toFixed(1)
                              : 0 }}%
                            </span>
                          </div>
                        </q-linear-progress>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Gráficos -->
          <div class="row q-col-gutter-md q-mb-lg">
            <div class="col-12 col-md-6">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 text-weight-medium q-mb-md">
                    <q-icon name="pie_chart" color="primary" class="q-mr-xs" />
                    Custos por Tipo
                  </div>
                  <div class="chart-container">
                    <div v-for="(valor, tipo) in resumo.custosPorTipo" :key="tipo" class="chart-bar-item">
                      <div class="row items-center justify-between q-mb-xs">
                        <span class="text-body2">{{ tipo }}</span>
                        <span class="text-weight-bold">{{ formatCurrency(valor) }}</span>
                      </div>
                      <q-linear-progress :value="resumo.previsto.custo > 0 ? valor / resumo.previsto.custo : 0"
                        color="primary" size="20px">
                        <div class="absolute-full flex flex-center">
                          <span class="text-white text-caption">{{ resumo.previsto.custo > 0 ? ((valor /
                            resumo.previsto.custo)
                            *
                            100).toFixed(1) : 0 }}%</span>
                        </div>
                      </q-linear-progress>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-6">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 text-weight-medium q-mb-md">
                    <q-icon name="show_chart" color="primary" class="q-mr-xs" />
                    Receita por Status
                  </div>
                  <div class="chart-container">
                    <div v-for="(valor, status) in resumo.receitaPorStatus" :key="status" class="chart-bar-item">
                      <div class="row items-center justify-between q-mb-xs">
                        <span class="text-body2">{{ status }}</span>
                        <span class="text-weight-bold">{{ formatCurrency(valor) }}</span>
                      </div>
                      <q-linear-progress :value="resumo.previsto.receita > 0 ? valor / resumo.previsto.receita : 0"
                        color="positive" size="20px">
                        <div class="absolute-full flex flex-center">
                          <span class="text-white text-caption">{{ resumo.previsto.receita > 0 ? ((valor /
                            resumo.previsto.receita) *
                            100).toFixed(1) : 0 }}%</span>
                        </div>
                      </q-linear-progress>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Análise de Colaboradores por Equipe -->
          <div class="row q-col-gutter-md q-mb-lg">
            <div class="col-12">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 text-weight-medium q-mb-md">
                    <q-icon name="groups" color="primary" class="q-mr-xs" />
                    Análise de Colaboradores por Equipe
                  </div>
                  <div v-if="resumo.colaboradoresPorEquipe && Object.keys(resumo.colaboradoresPorEquipe).length > 0">
                    <div v-for="(equipeData, equipeNome) in resumo.colaboradoresPorEquipe" :key="equipeNome"
                      class="q-mb-lg">
                      <div class="text-body1 text-weight-bold q-mb-md">
                        {{ equipeNome }}
                      </div>
                      <q-table :rows="equipeData.colaboradores" :columns="columnsColaboradores" row-key="id" flat dense
                        hide-pagination>
                        <template v-slot:body-cell-nome="props">
                          <q-td :props="props">
                            <div class="text-weight-medium">{{ props.value }}</div>
                          </q-td>
                        </template>
                        <template v-slot:body-cell-custoPorHora="props">
                          <q-td :props="props">
                            {{ formatCurrency(props.value) }}
                          </q-td>
                        </template>
                        <template v-slot:body-cell-horasTrabalhadas="props">
                          <q-td :props="props">
                            {{ props.value.toFixed(2) }}h
                          </q-td>
                        </template>
                        <template v-slot:body-cell-custoTotal="props">
                          <q-td :props="props" class="text-negative text-weight-bold">
                            {{ formatCurrency(props.value) }}
                          </q-td>
                        </template>
                        <template v-slot:body-cell-receita="props">
                          <q-td :props="props" class="text-positive text-weight-bold">
                            {{ formatCurrency(props.value) }}
                          </q-td>
                        </template>
                        <template v-slot:body-cell-lucro="props">
                          <q-td :props="props" :class="props.value >= 0 ? 'text-positive' : 'text-negative'"
                            class="text-weight-bold">
                            {{ formatCurrency(props.value) }}
                          </q-td>
                        </template>
                      </q-table>
                      <div class="row q-mt-md q-pa-md bg-grey-2 rounded-borders">
                        <div class="col">
                          <div class="text-subtitle2 text-weight-bold">
                            Total da Equipe:
                          </div>
                        </div>
                        <div class="col-auto q-gutter-x-md">
                          <span class="text-body2">
                            Horas: <strong>{{ equipeData.totalHoras.toFixed(2) }}h</strong>
                          </span>
                          <span class="text-body2">
                            Custo: <strong class="text-negative">{{ formatCurrency(equipeData.totalCusto) }}</strong>
                          </span>
                          <span class="text-body2">
                            Receita: <strong class="text-positive">{{ formatCurrency(equipeData.totalReceita)
                              }}</strong>
                          </span>
                          <span class="text-body2">
                            Lucro: <strong :class="equipeData.totalLucro >= 0 ? 'text-positive' : 'text-negative'">{{
                              formatCurrency(equipeData.totalLucro) }}</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="text-center text-grey-7 q-pa-lg">
                    Nenhum colaborador alocado nas ordens de serviço do período
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <!-- Tabela Detalhada -->
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle2 text-weight-medium q-mb-md">
                <q-icon name="table_chart" color="primary" class="q-mr-xs" />
                Detalhamento por Ordem de Serviço
              </div>
              <q-table :rows="ordemsFiltradas" :columns="columns" row-key="Id" :pagination="{ rowsPerPage: 10 }" flat
                bordered>
                <template v-slot:body-cell-NumeroOS="props">
                  <q-td :props="props">
                    <q-btn flat dense color="primary" :label="props.value" @click="verDetalhes(props.row)" />
                  </q-td>
                </template>
                <template v-slot:body-cell-Status="props">
                  <q-td :props="props">
                    <q-badge :color="getStatusColor(props.value)" :label="props.value" />
                  </q-td>
                </template>
                <template v-slot:body-cell-custoTotal="props">
                  <q-td :props="props" class="text-negative text-weight-bold">
                    {{ formatCurrency(props.value) }}
                  </q-td>
                </template>
                <template v-slot:body-cell-receita="props">
                  <q-td :props="props" class="text-positive text-weight-bold">
                    {{ formatCurrency(props.value) }}
                  </q-td>
                </template>
                <template v-slot:body-cell-lucro="props">
                  <q-td :props="props" :class="props.value >= 0 ? 'text-positive' : 'text-negative'"
                    class="text-weight-bold">
                    {{ formatCurrency(props.value) }}
                  </q-td>
                </template>
              </q-table>
            </q-card-section>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <!-- Dialog de Detalhes -->
    <q-dialog v-model="dialogDetalhes" :maximized="$q.screen.lt.md">
      <q-card style="min-width: 600px">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">
            <q-icon name="assignment" class="q-mr-sm" />
            Detalhes Financeiros - {{ ordemSelecionada?.NumeroOS }}
          </div>
        </q-card-section>

        <q-card-section v-if="ordemSelecionada">
          <div class="row q-col-gutter-md">
            <!-- Informações Gerais -->
            <div class="col-12">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 text-weight-medium q-mb-md">Informações Gerais</div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Cliente</div>
                      <div class="text-body2 text-weight-medium">{{ ordemSelecionada.Cliente?.Nome
                        }}
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Status</div>
                      <q-badge :color="getStatusColor(ordemSelecionada.Status)" :label="ordemSelecionada.Status" />
                    </div>
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Data Criação</div>
                      <div class="text-body2">{{ formatDate(ordemSelecionada.DataCriacao) }}</div>
                    </div>
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Data Conclusão</div>
                      <div class="text-body2">{{ formatDate(ordemSelecionada.DataConclusao) }}
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- Breakdown de Custos -->
            <div class="col-12">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 text-weight-medium q-mb-md">Breakdown de Itens</div>
                  <q-list dense separator>
                    <q-item v-for="item in ordemSelecionada.Itens" :key="item.Id">
                      <q-item-section>
                        <q-item-label>{{ item.Descricao }}</q-item-label>
                        <q-item-label caption>
                          {{ item.Tipo }} - {{ item.Quantidade }} {{ item.Unidade }} × {{
                            formatCurrency(item.Custo) }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-item-label class="text-weight-bold">{{
                          formatCurrency(item.calcularValorTotal()) }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>

            <!-- Resumo Financeiro -->
            <div class="col-12">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 text-weight-medium q-mb-md">Resumo Financeiro</div>
                  <div class="financial-summary">
                    <div class="row justify-between q-mb-sm">
                      <span>Subtotal:</span>
                      <span class="text-weight-medium">{{
                        formatCurrency(calcularSubtotalOrdem(ordemSelecionada)) }}</span>
                    </div>
                    <div class="row justify-between q-mb-sm">
                      <span>Descontos:</span>
                      <span class="text-negative">- {{ formatCurrency(ordemSelecionada.Descontos)
                        }}</span>
                    </div>
                    <div class="row justify-between q-mb-sm">
                      <span>Impostos/Taxas:</span>
                      <span class="text-warning">+ {{
                        formatCurrency(ordemSelecionada.ImpostosTaxas)
                        }}</span>
                    </div>
                    <q-separator class="q-my-md" />
                    <div class="row justify-between q-mb-sm">
                      <span class="text-weight-bold">Custo Total:</span>
                      <span class="text-h6 text-negative text-weight-bold">{{
                        formatCurrency(calcularCustoOrdem(ordemSelecionada)) }}</span>
                    </div>
                    <div class="row justify-between q-mb-sm">
                      <span class="text-weight-bold">Receita Total:</span>
                      <span class="text-h6 text-positive text-weight-bold">{{
                        formatCurrency(calcularReceitaOrdem(ordemSelecionada)) }}</span>
                    </div>
                    <q-separator class="q-my-md" />
                    <div class="row justify-between">
                      <span class="text-h6 text-weight-bold">Lucro:</span>
                      <span class="text-h5 text-weight-bold"
                        :class="calcularLucroOrdem(ordemSelecionada) >= 0 ? 'text-positive' : 'text-negative'">
                        {{ formatCurrency(calcularLucroOrdem(ordemSelecionada)) }}
                      </span>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="grey" v-close-popup />
          <q-btn unelevated label="Editar Ordem" color="primary" @click="editarOrdem" />
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
import dayjs from 'dayjs'

export default defineComponent({
  name: 'RelatorioFinanceiroPage',

  setup() {
    const $q = useQuasar()
    const router = useRouter()
    const store = useOrdemServicoStore()

    const loading = ref(false)
    const equipes = ref([])
    const dialogDetalhes = ref(false)
    const ordemSelecionada = ref(null)
    const tab = ref('graficos') // Controla a aba ativa

    const filtros = ref({
      dataInicio: dayjs().startOf('month').format('YYYY-MM-DD'),
      dataFim: dayjs().endOf('month').format('YYYY-MM-DD'),
      status: [],
      equipe: null
    })

    const statusOptions = [
      { label: 'Aberta', value: 'Aberta' },
      { label: 'Em Andamento', value: 'Em Andamento' },
      { label: 'Concluída', value: 'Concluída' },
      { label: 'Recebido', value: 'Recebido' },
      { label: 'Cancelada', value: 'Cancelada' }
    ]

    const equipesOptions = computed(() => [
      { label: 'Todas as equipes', value: null },
      ...equipes.value.map(e => ({ label: e.Descricao, value: e.Id }))
    ])

    const columns = [
      { name: 'NumeroOS', label: 'OS', field: 'NumeroOS', align: 'left', sortable: true },
      { name: 'Cliente', label: 'Cliente', field: row => row.Cliente?.Nome || 'N/A', align: 'left', sortable: true },
      { name: 'DataCriacao', label: 'Data', field: 'DataCriacao', align: 'left', sortable: true, format: val => formatDate(val) },
      { name: 'Status', label: 'Status', field: 'Status', align: 'center', sortable: true },
      { name: 'custoTotal', label: 'Custo', field: row => calcularCustoOrdem(row), align: 'right', sortable: true },
      { name: 'receita', label: 'Receita', field: row => calcularReceitaOrdem(row), align: 'right', sortable: true },
      { name: 'lucro', label: 'Lucro', field: row => calcularLucroOrdem(row), align: 'right', sortable: true }
    ]

    const columnsColaboradores = [
      { name: 'nome', label: 'Colaborador', field: 'nome', align: 'left' },
      { name: 'custoPorHora', label: 'Custo/Hora', field: 'custoPorHora', align: 'right' },
      { name: 'horasTrabalhadas', label: 'Horas Trabalhadas', field: 'horasTrabalhadas', align: 'right' },
      { name: 'custoTotal', label: 'Custo Total', field: 'custoTotal', align: 'right' },
      { name: 'receita', label: 'Receita Gerada', field: 'receita', align: 'right' },
      { name: 'lucro', label: 'Lucro Gerado', field: 'lucro', align: 'right' }
    ]

    const ordemsFiltradas = computed(() => {
      let ordens = store.ordensServico

      // Filtro por data
      if (filtros.value.dataInicio) {
        const dataInicio = new Date(filtros.value.dataInicio)
        ordens = ordens.filter(o => new Date(o.DataCriacao) >= dataInicio)
      }

      if (filtros.value.dataFim) {
        const dataFim = new Date(filtros.value.dataFim)
        dataFim.setHours(23, 59, 59, 999)
        ordens = ordens.filter(o => new Date(o.DataCriacao) <= dataFim)
      }

      // Filtro por status
      if (filtros.value.status && filtros.value.status.length > 0) {
        ordens = ordens.filter(o => filtros.value.status.includes(o.Status))
      }

      // Filtro por equipe
      if (filtros.value.equipe) {
        ordens = ordens.filter(o => o.IdEquipe === filtros.value.equipe)
      }

      return ordens
    })

    const resumo = computed(() => {
      // Separar ordens por status para cálculos comparativos
      const ordensPrevistoFiltradas = ordemsFiltradas.value
      const ordensAReceber = ordemsFiltradas.value.filter(o => o.Status === 'Concluída' || o.Status === 'CONCLUIDA')
      const ordensRecebidas = ordemsFiltradas.value.filter(o => o.Status === 'Recebido' || o.Status === 'RECEBIDO')

      // Inicializar contadores para cada categoria
      const previsto = { totalOrdens: 0, receita: 0, custo: 0, custoColaboradores: 0, lucro: 0 }
      const aReceber = { totalOrdens: 0, receita: 0, custo: 0, custoColaboradores: 0, lucro: 0 }
      const recebido = { totalOrdens: 0, receita: 0, custo: 0, custoColaboradores: 0, lucro: 0, margemLucro: 0 }

      const custosPorTipo = {}
      const receitaPorStatus = {}
      const colaboradoresPorEquipe = {}

      // Calcular valores previstos (todas as ordens)
      previsto.totalOrdens = ordensPrevistoFiltradas.length
      ordensPrevistoFiltradas.forEach(ordem => {
        const receita = calcularReceitaOrdem(ordem)
        const custo = calcularCustoOrdem(ordem)

        previsto.receita += receita
        previsto.custo += custo

        // Agrupar custos por tipo de item
        ordem.Itens.forEach(item => {
          const tipo = item.Tipo
          if (!custosPorTipo[tipo]) {
            custosPorTipo[tipo] = 0
          }
          custosPorTipo[tipo] += item.calcularValorTotal()
        })

        // Agrupar receita por status
        const status = ordem.Status
        if (!receitaPorStatus[status]) {
          receitaPorStatus[status] = 0
        }
        receitaPorStatus[status] += receita
      })

      previsto.lucro = previsto.receita - previsto.custo

      // Calcular valores a receber (ordens concluídas)
      aReceber.totalOrdens = ordensAReceber.length
      ordensAReceber.forEach(ordem => {
        const receita = calcularReceitaOrdem(ordem)
        const custo = calcularCustoOrdem(ordem)
        aReceber.receita += receita
        aReceber.custo += custo
      })
      aReceber.lucro = aReceber.receita - aReceber.custo

      // Calcular valores recebidos (ordens com status recebido)
      recebido.totalOrdens = ordensRecebidas.length
      ordensRecebidas.forEach(ordem => {
        const receita = calcularReceitaOrdem(ordem)
        const custo = calcularCustoOrdem(ordem)
        recebido.receita += receita
        recebido.custo += custo
      })
      recebido.lucro = recebido.receita - recebido.custo
      recebido.margemLucro = recebido.receita > 0 ? (recebido.lucro / recebido.receita) * 100 : 0

      // Calcular custos e receitas dos colaboradores por equipe (usando todas as ordens)
      ordensPrevistoFiltradas.forEach(ordem => {
        const receita = calcularReceitaOrdem(ordem)
        // Calcular custos e receitas dos colaboradores por equipe
        const equipe = equipes.value.find(e => e.Id === ordem.IdEquipe)
        if (equipe && equipe.Colaboradores && equipe.Colaboradores.length > 0) {
          const equipeNome = equipe.Descricao || 'Equipe sem nome'

          if (!colaboradoresPorEquipe[equipeNome]) {
            colaboradoresPorEquipe[equipeNome] = {
              colaboradores: [],
              totalHoras: 0,
              totalCusto: 0,
              totalReceita: 0,
              totalLucro: 0
            }
          }

          const horasPorColaborador = ordem.DuracaoHoras || ordem.EstimativaHoras || 0
          const numColaboradores = equipe.Colaboradores.length
          const horasIndividual = numColaboradores > 0 ? horasPorColaborador / numColaboradores : 0
          const receitaPorColaborador = numColaboradores > 0 ? receita / numColaboradores : 0

          equipe.Colaboradores.forEach(colabEquipe => {
            const colaborador = colabEquipe.Colaborador
            const custoPorHora = colaborador.CustoPorHora || 0
            const custoIndividual = horasIndividual * custoPorHora
            const lucroIndividual = receitaPorColaborador - custoIndividual

            previsto.custoColaboradores += custoIndividual

            // Buscar colaborador existente ou adicionar novo
            let colabData = colaboradoresPorEquipe[equipeNome].colaboradores.find(
              c => c.id === colaborador.Id
            )

            if (!colabData) {
              colabData = {
                id: colaborador.Id,
                nome: `${colaborador.Nome} ${colaborador.Sobrenome}`,
                custoPorHora: custoPorHora,
                horasTrabalhadas: 0,
                custoTotal: 0,
                receita: 0,
                lucro: 0
              }
              colaboradoresPorEquipe[equipeNome].colaboradores.push(colabData)
            }

            colabData.horasTrabalhadas += horasIndividual
            colabData.custoTotal += custoIndividual
            colabData.receita += receitaPorColaborador
            colabData.lucro += lucroIndividual
          })

          // Atualizar totais da equipe
          colaboradoresPorEquipe[equipeNome].totalHoras += horasPorColaborador
          colaboradoresPorEquipe[equipeNome].totalCusto = colaboradoresPorEquipe[equipeNome].colaboradores.reduce(
            (sum, c) => sum + c.custoTotal, 0
          )
          colaboradoresPorEquipe[equipeNome].totalReceita = colaboradoresPorEquipe[equipeNome].colaboradores.reduce(
            (sum, c) => sum + c.receita, 0
          )
          colaboradoresPorEquipe[equipeNome].totalLucro = colaboradoresPorEquipe[equipeNome].totalReceita - colaboradoresPorEquipe[equipeNome].totalCusto
        }
      })

      return {
        previsto,
        aReceber,
        recebido,
        custosPorTipo,
        receitaPorStatus,
        colaboradoresPorEquipe
      }
    })

    function calcularSubtotalOrdem(ordem) {
      return ordem.Itens.reduce((total, item) => total + item.calcularValorTotal(), 0)
    }

    function calcularCustoOrdem(ordem) {
      return calcularSubtotalOrdem(ordem)
    }

    function calcularReceitaOrdem(ordem) {
      const subtotal = calcularSubtotalOrdem(ordem)
      return subtotal - ordem.Descontos + ordem.ImpostosTaxas
    }

    function calcularLucroOrdem(ordem) {
      return calcularReceitaOrdem(ordem) - calcularCustoOrdem(ordem)
    }

    function formatCurrency(value) {
      if (value === null || value === undefined) return 'R$ 0,00'
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value)
    }

    function formatDate(dateString) {
      if (!dateString) return 'N/A'
      return dayjs(dateString).format('DD/MM/YYYY')
    }

    function getStatusColor(status) {
      const cores = {
        'Aberta': 'blue',
        'ABERTA': 'blue',
        'Em Andamento': 'orange',
        'EM_ANDAMENTO': 'orange',
        'Concluída': 'green',
        'CONCLUIDA': 'green',
        'Recebido': 'positive',
        'RECEBIDO': 'positive',
        'Cancelada': 'red',
        'CANCELADA': 'red'
      }
      return cores[status] || 'grey'
    }

    function verDetalhes(ordem) {
      ordemSelecionada.value = ordem
      dialogDetalhes.value = true
    }

    function editarOrdem() {
      if (ordemSelecionada.value) {
        const ordemId = ordemSelecionada.value.Id
        dialogDetalhes.value = false
        router.push(`/ordens-servico/${ordemId}`)
      }
    }

    function exportarPDF() {
      $q.notify({
        type: 'info',
        message: 'Funcionalidade de exportação em desenvolvimento'
      })
    }

    async function carregarDados() {
      loading.value = true
      try {
        await store.loadOrdensServico()
        equipes.value = await new EquipeRepository().getAll()
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        $q.notify({
          type: 'negative',
          message: 'Erro ao carregar dados do relatório'
        })
      } finally {
        loading.value = false
      }
    }

    // Funções para os gráficos
    function formatCurrencyShort(value) {
      if (value === null || value === undefined || value === 0) return 'R$ 0'
      const absValue = Math.abs(value)
      if (absValue >= 1000000) {
        return `R$ ${(value / 1000000).toFixed(1)}M`
      } else if (absValue >= 1000) {
        return `R$ ${(value / 1000).toFixed(1)}K`
      }
      return formatCurrency(value)
    }

    function getBarHeight(value, maxValue) {
      if (maxValue === 0) return '0%'
      const percentage = (Math.abs(value) / maxValue) * 100
      return Math.max(percentage, 5) + '%' // Mínimo de 5% para visualização
    }

    function getMaxValue(type) {
      const values = [
        Math.abs(resumo.value.previsto[type] || 0),
        Math.abs(resumo.value.aReceber[type] || 0),
        Math.abs(resumo.value.recebido[type] || 0)
      ]
      return Math.max(...values, 1) // Evita divisão por zero
    }

    function getPercentage(value, base) {
      if (base === 0) return '0'
      return ((value / base) * 100).toFixed(1)
    }

    // Computed para dados dos gráficos
    const chartDataCustos = computed(() => {
      const colors = ['#1976D2', '#FF6F00', '#7B1FA2', '#388E3C', '#D32F2F', '#00796B', '#C2185B']
      const colorNames = ['primary', 'orange', 'purple', 'green', 'red', 'teal', 'pink']
      const total = resumo.value.previsto.custo

      return Object.entries(resumo.value.custosPorTipo || {})
        .map(([label, value], index) => ({
          label,
          value,
          percentage: total > 0 ? (value / total) * 100 : 0,
          color: colors[index % colors.length],
          colorName: colorNames[index % colorNames.length]
        }))
        .sort((a, b) => b.value - a.value)
    })

    const chartDataReceita = computed(() => {
      const statusColors = {
        'Aberta': { color: '#2196F3', name: 'blue' },
        'ABERTA': { color: '#2196F3', name: 'blue' },
        'Em Andamento': { color: '#FF9800', name: 'orange' },
        'EM_ANDAMENTO': { color: '#FF9800', name: 'orange' },
        'Concluída': { color: '#4CAF50', name: 'green' },
        'CONCLUIDA': { color: '#4CAF50', name: 'green' },
        'Recebido': { color: '#21BA45', name: 'positive' },
        'RECEBIDO': { color: '#21BA45', name: 'positive' },
        'Cancelada': { color: '#F44336', name: 'red' },
        'CANCELADA': { color: '#F44336', name: 'red' }
      }
      const total = resumo.value.previsto.receita

      return Object.entries(resumo.value.receitaPorStatus || {})
        .map(([label, value]) => ({
          label,
          value,
          percentage: total > 0 ? (value / total) * 100 : 0,
          color: statusColors[label]?.color || '#9E9E9E',
          colorName: statusColors[label]?.name || 'grey'
        }))
        .sort((a, b) => b.value - a.value)
    })

    onMounted(carregarDados)

    return {
      loading,
      equipes,
      filtros,
      statusOptions,
      equipesOptions,
      columns,
      columnsColaboradores,
      ordemsFiltradas,
      resumo,
      dialogDetalhes,
      ordemSelecionada,
      tab,
      formatCurrency,
      formatCurrencyShort,
      formatDate,
      getStatusColor,
      verDetalhes,
      editarOrdem,
      exportarPDF,
      carregarDados,
      calcularSubtotalOrdem,
      calcularCustoOrdem,
      calcularReceitaOrdem,
      calcularLucroOrdem,
      getBarHeight,
      getMaxValue,
      getPercentage,
      chartDataCustos,
      chartDataReceita
    }
  }
})
</script>

<style lang="sass" scoped>
.accent-divider
  height: 2px
  background: $accent
  width: 100%

.summary-card
  border: 1px solid rgba(0, 0, 0, 0.08)
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06)
  transition: all 0.3s ease

  &:hover
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1)
    transform: translateY(-2px)

.profit-card
  border-left: 4px solid $positive

.loss-card
  border-left: 4px solid $negative

.chart-container
  padding: 16px 0

.chart-bar-item
  margin-bottom: 20px

  &:last-child
    margin-bottom: 0

.financial-summary
  padding: 8px 0

  .row
    font-size: 14px

// Estilos para gráficos de barras verticais
.chart-wrapper
  padding: 16px
  min-height: 300px

.chart-bar-vertical
  display: flex
  justify-content: space-around
  align-items: flex-end
  height: 250px
  gap: 16px

.bar-container
  flex: 1
  display: flex
  flex-direction: column
  align-items: center
  min-width: 80px

.bar-wrapper
  width: 100%
  display: flex
  flex-direction: column
  justify-content: flex-end
  align-items: center
  height: 200px
  position: relative

.bar
  width: 100%
  max-width: 60px
  border-radius: 4px 4px 0 0
  transition: all 0.3s ease
  display: flex
  align-items: flex-start
  justify-content: center
  padding-top: 8px
  position: relative

  &:hover
    opacity: 0.8
    transform: translateY(-4px)

.bar-info
  background: linear-gradient(180deg, #42A5F5 0%, #1976D2 100%)

.bar-orange
  background: linear-gradient(180deg, #FFB74D 0%, #F57C00 100%)

.bar-positive
  background: linear-gradient(180deg, #66BB6A 0%, #388E3C 100%)

.bar-negative
  background: linear-gradient(180deg, #EF5350 0%, #C62828 100%)

.bar-value
  color: white
  font-size: 11px
  font-weight: bold
  text-align: center
  writing-mode: horizontal-tb
  white-space: nowrap

.bar-label
  margin-top: 8px
  font-size: 12px
  font-weight: 500
  text-align: center
  color: #666

.bar-percentage
  margin-top: 4px
  font-size: 11px
  color: #888
  font-weight: 600

// Estilos para gráficos de pizza
.pie-chart-container
  padding: 16px 0

.pie-item
  margin-bottom: 16px

.pie-legend
  width: 16px
  height: 16px
  border-radius: 3px
  display: inline-block

// Estilos para cards de estatísticas
.stat-box
  background: #f5f5f5
  border-radius: 8px
  padding: 16px
  text-align: center
  transition: all 0.3s ease

  &:hover
    background: #eeeeee
    transform: translateY(-2px)

.stat-label
  font-size: 12px
  color: #666
  margin-bottom: 8px
  text-transform: uppercase
  font-weight: 500

.stat-value
  font-size: 20px
  font-weight: bold
</style>
