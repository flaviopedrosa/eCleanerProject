<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho da Página -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center q-mb-sm">
          <q-btn flat round icon="arrow_back" @click="$router.go(-1)" class="q-mr-md" />
          <q-icon name="receipt_long" size="2rem" class="text-secondary q-mr-md" />
          <h4 class="text-h5 q-ma-none text-secondary">
            {{ isEditing ? $t('forms.orcamento.editTitle') : $t('forms.orcamento.createTitle') }}
          </h4>
        </div>
        <div class="accent-divider q-mb-md"></div>
        <div class="row justify-end">
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ isEditing ? $t('forms.orcamento.editSubtitle') : $t('forms.orcamento.createSubtitle') }}
          </p>
        </div>
      </div>
    </div>

    <q-form @submit="salvarOrcamento" class="q-gutter-md">
      <!-- Informações Básicas -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">
            <q-icon name="info" class="q-mr-sm" />
            {{ $t('forms.orcamento.sections.basicInfo') }}
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input v-model="form.NumeroOrcamento" :label="$t('forms.orcamento.fields.numero')" filled readonly
                bg-color="grey-1" />
            </div>

            <div class="col-12 col-md-6">
              <q-select v-model="form.Status" :options="statusOptions" :label="$t('forms.orcamento.fields.status')"
                filled emit-value map-options lazy-rules
                :rules="[val => val !== null || $t('forms.validation.required')]" />
            </div>

            <div class="col-12 col-md-6">
              <q-input :model-value="dataEmissaoFormatada" :label="$t('forms.orcamento.fields.dataEmissao')" filled
                readonly>
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="form.DataEmissao" mask="YYYY-MM-DD" :locale="currentLocale">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup :label="$t('buttons.close')" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <!-- Campo hidden para validação -->
              <q-input v-model="form.DataEmissao" style="display: none;"
                :rules="[dateValidators.required, dateValidators.validDate]" />
            </div>

            <div class="col-12 col-md-6">
              <q-input :model-value="validadeFormatada" :label="$t('forms.orcamento.fields.validade')" filled readonly>
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="form.Validade" mask="YYYY-MM-DD" :locale="currentLocale">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup :label="$t('buttons.close')" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <!-- Campo hidden para validação -->
              <q-input v-model="form.Validade" style="display: none;"
                :rules="[dateValidators.required, dateValidators.validDate, dateValidators.validityAfterEmission(form.DataEmissao)]" />
            </div>

            <div class="col-12 col-md-6">
              <q-select v-model="form.Periodicidade" :options="periodicidadeOptions"
                :label="$t('forms.orcamento.fields.periodicidade')" filled emit-value map-options lazy-rules
                :rules="[val => val !== null || $t('forms.validation.required')]" />
            </div>

            <div class="col-12 col-md-6" v-if="form.Periodicidade && form.Periodicidade !== 'Única'">
              <q-input v-model.number="form.QuantidadeNoPeriodo"
                :label="$t('forms.orcamento.fields.quantidadeNoPeriodo')" filled type="number" min="1" step="1"
                :hint="$t('forms.orcamento.hints.quantidadeNoPeriodo')" lazy-rules
                :rules="[val => val >= 1 || $t('forms.validation.minValue', { min: 1 })]" />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Seleção do Cliente -->
      <q-card flat bordered>
        <q-expansion-item v-model="clienteExpanded" header-class="text-h6" expand-separator>
          <template v-slot:header>
            <q-item-section>
              <q-item-label class="text-h6 text-primary">
                <q-icon name="person" class="q-mr-sm" />
                {{ $t('forms.orcamento.sections.client') }}
              </q-item-label>
              <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in"
                :duration="300">
                <q-item-label v-if="!clienteExpanded && clienteResumo" caption class="client-summary-transition"
                  key="summary">
                  {{ clienteResumo }}
                </q-item-label>
              </transition>
            </q-item-section>
          </template>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-select v-model="form.Cliente" :options="clienteOptions" option-label="label" use-input
                  :label="$t('forms.orcamento.fields.cliente')" filled option-value="id" @filter="filtrarClientes"
                  input-debounce="0" @update:model-value="onClienteChange" lazy-rules
                  :rules="[val => val || $t('forms.validation.required')]">
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section>
                        {{ $t('forms.orcamento.noClients') }}
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>

              <div class="col-12" v-if="form.Cliente">
                <q-select v-model="form.Imovel" :options="imovelOptions" option-label="label" use-input
                  :label="$t('forms.orcamento.fields.imovel')" filled option-value="id" @filter="filtrarImoveis"
                  input-debounce="0" clearable lazy-rules :rules="[val => val || $t('forms.validation.required')]">
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section>
                        {{ $t('forms.orcamento.noImoveis') }}
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section>
                        <q-item-label>{{ scope.opt.label }}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-icon name="place" />
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:selected-item="scope">
                    <div class="q-pa-sm">
                      <div class="text-body1">{{ scope.opt.label }}</div>
                    </div>
                  </template>
                </q-select>

                <!-- Informações detalhadas do imóvel selecionado -->
                <div v-if="imovelSelecionado" class="q-mt-md">
                  <q-card flat bordered class="bg-grey-1">
                    <q-card-section class="q-pa-md">
                      <div class="text-subtitle2 text-primary q-mb-md">
                        <q-icon name="info" class="q-mr-xs" />
                        {{ $t('forms.orcamento.propertyInfo.basicInfo') }}
                      </div>
                      <div class="row q-col-gutter-md">
                        <div class="col-6 col-md-3">
                          <div class="text-caption text-grey-7">{{ $t('forms.orcamento.propertyInfo.totalRooms') }}
                          </div>
                          <div class="text-body1 text-weight-medium">{{ imovelSelecionado.totalComodos }} cômodos</div>
                        </div>
                        <div class="col-6 col-md-3">
                          <div class="text-caption text-grey-7">{{ $t('forms.orcamento.propertyInfo.bedrooms') }}</div>
                          <div class="text-body1 text-weight-medium">{{ imovelSelecionado.quartos }} quartos</div>
                        </div>
                        <div class="col-6 col-md-3">
                          <div class="text-caption text-grey-7">{{ $t('forms.orcamento.propertyInfo.bathrooms') }}</div>
                          <div class="text-body1 text-weight-medium">{{ imovelSelecionado.banheiros }} banheiros</div>
                        </div>
                        <div class="col-6 col-md-3">
                          <div class="text-caption text-grey-7">{{ $t('forms.orcamento.propertyInfo.area') }}</div>
                          <div class="text-body1 text-weight-medium">{{ imovelSelecionado.area }}m²</div>
                        </div>
                      </div>
                      <div v-if="imovelSelecionado.observacoes" class="q-mt-md">
                        <div class="text-caption text-grey-7">{{ $t('forms.orcamento.propertyInfo.observations') }}
                        </div>
                        <div class="text-body2">{{ imovelSelecionado.observacoes }}</div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-expansion-item>
      </q-card>



      <!-- Seleção do Pacote de Serviço -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">
            <q-icon name="inventory_2" class="q-mr-sm" />
            {{ $t('forms.orcamento.sections.servicePackage') }}
          </div>

          <div class="row">
            <div class="col-12">
              <q-select v-model="form.PacoteServico" :options="pacoteServicoOptions" option-label="label" use-input
                :label="$t('forms.orcamento.fields.pacoteServico')" filled emit-value map-options option-value="value"
                @filter="filtrarPacotesServico" input-debounce="300" clearable>
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section>
                      {{ $t('forms.orcamento.noServicePackages') }}
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                      <q-item-label caption>
                        Valor: {{ formatarMoeda(scope.opt.valorVenda) }} |
                        Margem: {{ scope.opt.margemLucro }}%
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side v-if="scope.opt.favorito">
                      <q-icon name="star" color="amber" />
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:selected-item="scope">
                  <div class="q-pa-sm">
                    <div class="text-body1">{{ scope.opt.label }}</div>
                    <div class="text-caption text-grey-6">
                      Valor: {{ formatarMoeda(scope.opt.valorVenda) }} |
                      Margem: {{ scope.opt.margemLucro }}%
                    </div>
                  </div>
                </template>
              </q-select>
            </div>

            <div class="col-12" v-if="form.PacoteServico">
              <q-card flat bordered class="bg-blue-1">
                <q-card-section>
                  <div class="text-subtitle2 text-blue-8 q-mb-sm">
                    <q-icon name="info" class="q-mr-xs" />
                    Resumo do Pacote Selecionado
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Valor Material</div>
                      <div class="text-body2">{{ formatarMoeda(pacoteSelecionado?.valorMaterial ||
                        0) }}</div>
                    </div>
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Valor Serviço</div>
                      <div class="text-body2">{{ formatarMoeda(pacoteSelecionado?.valorServico ||
                        0) }}</div>
                    </div>
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Valor Total</div>
                      <div class="text-body2">{{ formatarMoeda(pacoteSelecionado?.valorTotal || 0)
                        }}</div>
                    </div>
                    <div class="col-6">
                      <div class="text-caption text-grey-7">Valor Venda</div>
                      <div class="text-body2 text-weight-bold text-green-7">
                        {{ formatarMoeda(pacoteSelecionado?.valorVenda || 0) }}
                      </div>
                    </div>
                  </div>

                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Itens do Orçamento -->
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center q-mb-md">
            <div class="text-h6 text-primary">
              <q-icon name="list_alt" class="q-mr-sm" />
              {{ $t('forms.orcamento.sections.items') }}
            </div>
            <q-space />
            <q-btn color="secondary" icon="download" label="Importar Serviço" @click="abrirDialogImportarServico"
              size="sm" class="q-mr-sm" />
            <q-btn color="accent" icon="inventory" label="Importar Material" @click="abrirDialogImportarMaterial"
              size="sm" class="q-mr-sm" />
            <q-btn color="purple" icon="construction" label="Importar Equipamento"
              @click="abrirDialogImportarEquipamento" size="sm" class="q-mr-sm" />
            <q-btn color="primary" icon="add" :label="$t('forms.orcamento.actions.addItem')"
              @click="adicionarItemOrcamento" size="sm" />
          </div>

          <div v-if="form.ItensOrcamento.length === 0" class="text-center text-grey-6 q-py-lg">
            <q-icon name="inventory_2" size="48px" class="q-mb-md" />
            <div class="text-body1">{{ $t('forms.orcamento.messages.noItems') }}</div>
            <div class="text-caption">{{ $t('forms.orcamento.messages.selectPackageOrAddItems') }}</div>
          </div>

          <div v-for="(item, index) in form.ItensOrcamento" :key="item.Id || index" class="q-mb-md">
            <q-card flat bordered :class="['bg-grey-1', { 'item-destacado': itemDestacado === item.Id }]">
              <q-card-section class="q-pb-none">
                <div class="row items-center q-mb-sm">
                  <div class="text-subtitle2">{{ $t('forms.orcamento.labels.item') }} {{ item.Numero || (index + 1) }}
                  </div>
                  <q-space />
                  <q-btn flat round color="negative" icon="delete" size="sm" @click="removerItemOrcamento(index)"
                    :tooltip="$t('forms.orcamento.actions.removeItem')" />
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input v-model="item.Descricao" :label="$t('forms.orcamento.fields.itemDescription')" filled dense
                      required />
                  </div>

                  <div class="col-12 col-md-2">
                    <q-select v-model="item.Tipo" :options="tipoItemOptions"
                      :label="$t('forms.orcamento.fields.itemType')" filled dense emit-value map-options />
                  </div>

                  <div class="col-12 col-md-2">
                    <q-input v-model.number="item.Quantidade" :label="$t('forms.orcamento.fields.quantity')" filled
                      dense type="number" min="0.01" step="0.01" @update:model-value="calcularTotal" />
                  </div>

                  <div class="col-12 col-md-2">
                    <q-input v-model="item.Unidade" :label="$t('forms.orcamento.fields.unit')" filled dense />
                  </div>
                </div>

                <div class="row q-col-gutter-md q-mt-xs">
                  <div class="col-12 col-md-3">
                    <q-input v-model.number="item.Custo" :label="$t('forms.orcamento.fields.unitCost')" filled dense
                      type="number" min="0" step="0.01" :prefix="'R$'" @update:model-value="calcularTotal" />
                  </div>

                  <div class="col-12 col-md-3">
                    <q-input :model-value="formatarMoeda(item.Quantidade * item.Custo)"
                      :label="$t('forms.orcamento.fields.subtotal')" filled dense readonly bg-color="grey-2" />
                  </div>

                  <div class="col-12 col-md-6">
                    <q-input v-model="item.Observacoes" :label="$t('forms.orcamento.fields.observations')" filled
                      dense />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
      </q-card>

      <!-- Resumo Financeiro -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 text-primary q-mb-md">
            <q-icon name="calculate" class="q-mr-sm" />
            {{ $t('forms.orcamento.sections.financialSummary') }}
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-input :model-value="formatarMoeda(totalItens)" :label="$t('forms.orcamento.fields.subtotalItems')"
                filled readonly bg-color="grey-1" />
            </div>

            <div class="col-12 col-md-4">
              <q-input v-model.number="form.Desconto" :label="$t('forms.orcamento.fields.desconto')" filled
                type="number" min="0" step="0.01" @update:model-value="calcularTotal" :prefix="'R$'" />
            </div>

            <div class="col-12 col-md-4">
              <q-input :model-value="formatarMoeda(form.ValorTotal)" :label="$t('forms.orcamento.fields.valorTotal')"
                filled readonly bg-color="primary" class="text-white" />
            </div>
          </div>

          <div class="q-mt-md">
            <q-input v-model="form.Observacoes" :label="$t('forms.orcamento.fields.observacoesGerais')" filled
              type="textarea" rows="3" />
          </div>
        </q-card-section>
      </q-card>

      <!-- Botões de Ação -->
      <div class="row q-gutter-md justify-end">
        <q-btn flat :label="$t('buttons.cancel')" @click="$router.go(-1)" />
        <q-btn v-if="isEditing" color="secondary" :label="$t('buttons.downloadPDF')" icon="download" @click="baixarPDF"
          :loading="loadingPDF" :disable="!form.Id" />
        <q-btn v-if="isEditing" color="primary" :label="$t('buttons.sendEmail')" icon="email" @click="enviarPorEmail"
          :loading="loadingEmail" :disable="!form.Id || !form.Cliente" />
        <q-btn v-if="isEditing && form.Status !== 'APROVADO'" color="positive"
          :label="$t('forms.orcamento.buttons.approve')" icon="check" @click="aprovarOrcamento"
          :loading="loadingApprove" :disable="!podeAprovar" />
        <q-btn color="primary" :label="isEditing ? $t('buttons.update') : $t('buttons.save')" type="submit"
          :loading="store.loading" />
      </div>
    </q-form>

    <!-- Dialog para Importar Serviço -->
    <q-dialog v-model="dialogImportarServico" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">Importar Item de Serviço</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select v-model="servicoSelecionado" :options="servicoOptions" label="Selecione o Serviço" filled use-input
            @filter="filtrarServicos" clearable option-label="label" option-value="value" emit-value map-options>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Nenhum serviço encontrado
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <div v-if="servicoSelecionadoDetalhes" class="q-mt-md">
            <q-separator class="q-mb-md" />
            <div class="text-subtitle2 q-mb-sm">Detalhes do Serviço:</div>
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <div class="text-caption text-grey-7">Nome:</div>
                <div class="text-body2">{{ servicoSelecionadoDetalhes.Nome }}</div>
              </div>
              <div class="col-6">
                <div class="text-caption text-grey-7">Valor:</div>
                <div class="text-body2">{{ formatarMoeda(servicoSelecionadoDetalhes.Valor) }}</div>
              </div>
              <div class="col-6">
                <div class="text-caption text-grey-7">Unidade:</div>
                <div class="text-body2">{{ servicoSelecionadoDetalhes.Unidade || 'UN' }}</div>
              </div>
              <div class="col-6">
                <div class="text-caption text-grey-7">Tempo Estimado:</div>
                <div class="text-body2">{{ servicoSelecionadoDetalhes.TempoEstimado || 'N/A' }}</div>
              </div>
            </div>
            <div v-if="servicoSelecionadoDetalhes.Descricao" class="q-mt-sm">
              <div class="text-caption text-grey-7">Descrição:</div>
              <div class="text-body2">{{ servicoSelecionadoDetalhes.Descricao }}</div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey" @click="fecharDialogImportarServico" />
          <q-btn label="Importar" color="primary" @click="importarServicoSelecionado" :disable="!servicoSelecionado" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog para Importar Material -->
    <q-dialog v-model="dialogImportarMaterial" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">Importar Item de Material</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select v-model="materialSelecionado" :options="materialOptions" label="Selecione o Material" filled
            use-input @filter="filtrarMateriais" clearable option-label="label" option-value="value" emit-value
            map-options>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Nenhum material encontrado
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <div v-if="materialSelecionadoDetalhes" class="q-mt-md">
            <q-separator class="q-mb-md" />
            <div class="text-subtitle2 q-mb-sm">Detalhes do Material:</div>
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <div class="text-caption text-grey-7">Nome:</div>
                <div class="text-body2">{{ materialSelecionadoDetalhes.Nome }}</div>
              </div>
              <div class="col-6">
                <div class="text-caption text-grey-7">Preço Unitário:</div>
                <div class="text-body2">{{ formatarMoeda(materialSelecionadoDetalhes.PrecoUnitario) }}</div>
              </div>
              <div class="col-6">
                <div class="text-caption text-grey-7">Unidade:</div>
                <div class="text-body2">{{ materialSelecionadoDetalhes.Unidade || 'UN' }}</div>
              </div>
              <div class="col-6">
                <div class="text-caption text-grey-7">Categoria:</div>
                <div class="text-body2">{{ materialSelecionadoDetalhes.Categoria || 'N/A' }}</div>
              </div>
            </div>
            <div v-if="materialSelecionadoDetalhes.Descricao" class="q-mt-sm">
              <div class="text-caption text-grey-7">Descrição:</div>
              <div class="text-body2">{{ materialSelecionadoDetalhes.Descricao }}</div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey" @click="fecharDialogImportarMaterial" />
          <q-btn label="Importar" color="primary" @click="importarMaterialSelecionado"
            :disable="!materialSelecionado" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog para Importar Equipamento -->
    <q-dialog v-model="dialogImportarEquipamento" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">Importar Item de Equipamento</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select v-model="equipamentoSelecionado" :options="equipamentoOptions" label="Selecione o Equipamento"
            filled use-input @filter="filtrarEquipamentos" clearable option-label="label" option-value="value"
            emit-value map-options>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Nenhum equipamento encontrado
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <div v-if="equipamentoSelecionadoDetalhes" class="q-mt-md">
            <q-separator class="q-mb-md" />
            <div class="text-subtitle2 q-mb-sm">Detalhes do Equipamento:</div>
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <div class="text-caption text-grey-7">Descrição:</div>
                <div class="text-body2">{{ equipamentoSelecionadoDetalhes.Descricao }}</div>
              </div>
              <div class="col-6">
                <div class="text-caption text-grey-7">Preço Unitário:</div>
                <div class="text-body2">{{ formatarMoeda(equipamentoSelecionadoDetalhes.PrecoUnitario) }}</div>
              </div>
              <div class="col-6">
                <div class="text-caption text-grey-7">Unidade:</div>
                <div class="text-body2">{{ equipamentoSelecionadoDetalhes.Unidade || 'UN' }}</div>
              </div>
            </div>
            <div v-if="equipamentoSelecionadoDetalhes.Imagem" class="q-mt-md">
              <div class="text-caption text-grey-7 q-mb-sm">Imagem:</div>
              <q-img :src="equipamentoSelecionadoDetalhes.Imagem" style="max-width: 200px; max-height: 150px;"
                fit="contain" class="rounded-borders" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey" @click="fecharDialogImportarEquipamento" />
          <q-btn label="Importar" color="primary" @click="importarEquipamentoSelecionado"
            :disable="!equipamentoSelecionado" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { useOrcamentoStore } from '@/stores/orcamento-store.js'
import { usePacoteServicoStore } from '@/stores/pacote-servico-store.js'
import { StatusOrcamento } from '@/core/domain/enums/statusOrcamento'
import { ItemOrcamento } from '@/core/domain/entities/itemOrcamento'
import { TipoItemOrcamento } from '@/core/domain/enums/tipoItemOrcamento'
import { createDateValidators, formatDateForLocale } from '@/core/utils/dateValidation'
import { ClienteRepository } from '@/core/infrastructure/repositories/clienteRepository'
import { ImovelRepository } from '@/core/infrastructure/repositories/imovelRepository'
import { EquipamentoRepository } from '@/core/infrastructure/repositories/equipamentoRepository'
import { Cliente } from '@/core/domain/entities/cliente'
import { Imovel } from '@/core/domain/entities/imovel'
import { Endereco } from '@/core/domain/entities/endereco'
import { downloadOrcamentoPDF } from '@/core/infrastructure/utils/pdfGenerator'
import { enviarOrcamentoPorEmail } from '@/core/infrastructure/utils/emailSender'

export default defineComponent({
  name: 'OrcamentoCadastroPage',

  setup() {
    const router = useRouter()
    const route = useRoute()
    const { t, locale } = useI18n()
    const $q = useQuasar()
    const store = useOrcamentoStore()
    const pacoteServicoStore = usePacoteServicoStore()
    const clienteRepository = new ClienteRepository()
    const imovelRepository = new ImovelRepository()
    const equipamentoRepository = new EquipamentoRepository()

    // Criar validadores de data localizados
    const dateValidators = createDateValidators(t)

    // Estado do formulário
    const form = ref({
      PacoteServico: null,
      ItensOrcamento: [],
      Desconto: 0,
      ValorTotal: 0
    })
    const isEditing = computed(() => !!route.params.id)

    // Estado da expansão da seção de cliente
    const clienteExpanded = ref(true)

    // Options para selects
    const statusOptions = computed(() =>
      Object.values(StatusOrcamento).map(status => ({
        label: t(`enums.statusOrcamento.${status}`),
        value: status
      }))
    )

    // Opções de periodicidade
    const periodicidadeOptions = [
      { label: t('forms.orcamento.periodicidade.unica'), value: 'Única' },
      { label: t('forms.orcamento.periodicidade.semana'), value: 'Semana' },
      { label: t('forms.orcamento.periodicidade.mes'), value: 'Mês' },
      { label: t('forms.orcamento.periodicidade.bimestre'), value: 'Bimestre' },
      { label: t('forms.orcamento.periodicidade.trimestre'), value: 'Trimestre' },
      { label: t('forms.orcamento.periodicidade.semestre'), value: 'Semestre' },
      { label: t('forms.orcamento.periodicidade.ano'), value: 'Ano' },
    ]

    const clienteOptions = ref([])
    const imovelOptions = ref([])
    const imovelOptionsAll = ref([])
    const servicoOptions = ref([])
    const servicoOptionsAll = ref([])
    const materialOptions = ref([])
    const materialOptionsAll = ref([])
    const pacoteServicoOptions = ref([])
    const pacoteServicoOptionsAll = ref([])

    // Dialog para importar serviço
    const dialogImportarServico = ref(false)
    const servicoSelecionado = ref(null)
    const servicoSelecionadoDetalhes = computed(() => {
      if (!servicoSelecionado.value) return null
      return servicoOptionsAll.value.find(s => s.value === servicoSelecionado.value)?.servico || null
    })

    // Dialog para importar material
    const dialogImportarMaterial = ref(false)
    const materialSelecionado = ref(null)
    const materialSelecionadoDetalhes = computed(() => {
      if (!materialSelecionado.value) return null
      return materialOptionsAll.value.find(m => m.value === materialSelecionado.value)?.material || null
    })

    // Dialog para importar equipamento
    const dialogImportarEquipamento = ref(false)
    const equipamentoSelecionado = ref(null)
    const equipamentoOptions = ref([])
    const equipamentoOptionsAll = ref([])
    const equipamentoSelecionadoDetalhes = computed(() => {
      if (!equipamentoSelecionado.value) return null
      return equipamentoOptionsAll.value.find(e => e.value === equipamentoSelecionado.value)?.equipamento || null
    })

    // Controle de destaque visual para itens recém criados
    const itemDestacado = ref(null)

    // Estado para loading do PDF e email
    const loadingPDF = ref(false)
    const loadingEmail = ref(false)
    const loadingApprove = ref(false)

    // Computed para verificar se pode aprovar
    const podeAprovar = computed(() => {
      return form.value.Cliente &&
        form.value.ItensOrcamento &&
        form.value.ItensOrcamento.length > 0 &&
        form.value.Status !== 'APROVADO'
    })

    // Opções para tipo de item
    const tipoItemOptions = computed(() => [
      { label: t('enums.tipoItemOrcamento.MATERIAL'), value: TipoItemOrcamento.MATERIAL },
      { label: t('enums.tipoItemOrcamento.SERVICO'), value: TipoItemOrcamento.SERVICO },
      { label: t('enums.tipoItemOrcamento.EQUIPAMENTO'), value: TipoItemOrcamento.EQUIPAMENTO }
    ])

    // Computed property para o locale atual do QDate
    const currentLocale = computed(() => {
      // Mapear os locales do vue-i18n para os do QDate
      const localeMap = {
        'pt-BR': {
          days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
          daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
          months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        },
        'en-US': {
          days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
      }
      return localeMap[locale.value] || localeMap['pt-BR']
    })

    // Computed properties para datas formatadas conforme o idioma
    const dataEmissaoFormatada = computed(() => {
      return form.value.DataEmissao ? formatDateForLocale(form.value.DataEmissao, locale.value) : ''
    })

    const validadeFormatada = computed(() => {
      return form.value.Validade ? formatDateForLocale(form.value.Validade, locale.value) : ''
    })

    // Computed property para o imóvel selecionado
    const imovelSelecionado = computed(() => {
      if (!form.value.Imovel) return null

      // Buscar o imóvel completo com base no ID selecionado
      const imovelId = typeof form.value.Imovel === 'object' ? form.value.Imovel.id : form.value.Imovel
      return imovelOptionsAll.value.find(imovel => imovel.id === imovelId) || null
    })

    // Computed property para o resumo do cliente na barra colapsada
    const clienteResumo = computed(() => {
      // Se a seção está expandida, não mostrar resumo
      if (clienteExpanded.value) {
        return ''
      }

      if (!form.value.Cliente) {
        return t('forms.orcamento.clientSummary.noClient')
      }

      const cliente = form.value.Cliente
      const nomeCliente = typeof cliente === 'object' ? cliente.label : clienteOptions.value.find(c => c.id === cliente)?.label || 'Cliente selecionado'

      if (!form.value.Imovel || !imovelSelecionado.value) {
        return `${nomeCliente} • ${t('forms.orcamento.clientSummary.noProperty')}`
      }

      const imovel = imovelSelecionado.value
      const resumoImovel = `${imovel.quartos}Q ${imovel.banheiros}B • ${imovel.area}m²`

      // Endereço resumido do imóvel
      const enderecoResumo = imovel.endereco ?
        imovel.endereco.length > 50 ?
          imovel.endereco.substring(0, 47) + '...' :
          imovel.endereco
        : t('forms.orcamento.clientSummary.noAddress')

      return `${nomeCliente} • ${resumoImovel} • ${enderecoResumo}`
    })

    // Computed properties financeiros
    const totalItens = computed(() => {
      return form.value.ItensOrcamento.reduce((total, item) => {
        return total + ((item.Quantidade || 0) * (item.Custo || 0))
      }, 0)
    })

    const pacoteSelecionado = computed(() => {
      if (!form.value.PacoteServico) return null
      return pacoteServicoOptionsAll.value.find(p => p.value === form.value.PacoteServico)
    })

    // Métodos
    function gerarNumeroOrcamento() {
      const now = new Date()
      const ano = now.getFullYear()
      const mes = String(now.getMonth() + 1).padStart(2, '0')
      const dia = String(now.getDate()).padStart(2, '0')
      const hora = String(now.getHours()).padStart(2, '0')
      const min = String(now.getMinutes()).padStart(2, '0')

      return `ORC${ano}${mes}${dia}${hora}${min}`
    }

    // Função para criar dados de teste se não houver clientes
    async function criarDadosTeste() {
      try {
        // Criar endereço de teste
        const endereco = new Endereco(
          'Rua das Flores',
          '123',
          'Apto 45',
          'Centro',
          'São Paulo',
          'SP',
          '01234-567'
        )

        // Criar cliente de teste
        const cliente = new Cliente(
          'João',
          'Silva',
          'joao.silva@email.com',
          '(11) 98765-4321', // celular
          '(11) 1234-5678'   // telefone
        )
        cliente.Enderecos = [endereco]

        // Salvar cliente
        const clienteSalvo = await clienteRepository.add(cliente)

        // Criar imóvel associado ao cliente
        const imovel = new Imovel(
          4, // Total de cômodos
          2, // Quartos
          2, // Banheiros
          85, // Área total
          clienteSalvo, // Dono (usar o cliente salvo)
          'Apartamento bem localizado no centro da cidade. Possui sala, cozinha, 2 quartos e 2 banheiros. Ideal para limpeza residencial completa.'
        )
        imovel.Endereco = endereco

        // Salvar imóvel
        await imovelRepository.add(imovel)

        $q.notify({
          type: 'info',
          message: 'Dados de teste criados: Cliente "João Silva" com imóvel no Centro de São Paulo',
          timeout: 4000,
          position: 'top-right'
        })

      } catch (error) {
        console.error('Erro ao criar dados de teste:', error)
        $q.notify({
          type: 'negative',
          message: 'Erro ao criar dados de teste',
          timeout: 3000,
          position: 'top-right'
        })
      }
    }

    async function atualizarOpcoesDependentes() {
      // Atualizar imóveis baseado no cliente selecionado
      if (form.value.Cliente) {
        const clienteId = typeof form.value.Cliente === 'object' ? form.value.Cliente.id : form.value.Cliente
        const imoveisDoCliente = imovelOptionsAll.value.filter(imovel => imovel.clienteId === clienteId)
        imovelOptions.value = imoveisDoCliente
      }

      // Certificar que os filtros de pacotes estão atualizados
      pacoteServicoOptions.value = [...pacoteServicoOptionsAll.value]
    }

    async function carregarOrcamentoParaEdicao() {
      try {
        // Garantir que o store tenha os orçamentos carregados
        if (store.orcamentos.length === 0) {
          await store.fetchOrcamentos()
        }

        const orcamento = store.orcamentos.find(o => o.Id === route.params.id)

        if (orcamento) {
          // Mapear os dados do orçamento para o formulário
          form.value = {
            Id: orcamento.Id, // IMPORTANTE: Incluir o ID para atualizações
            NumeroOrcamento: orcamento.NumeroOrcamento,
            DataEmissao: orcamento.DataEmissao,
            Validade: orcamento.Validade,
            Status: orcamento.Status,
            Periodicidade: orcamento.Periodicidade || 'Única',
            QuantidadeNoPeriodo: orcamento.QuantidadeNoPeriodo || 1,
            Cliente: orcamento.Cliente?.Id || orcamento.Cliente, // Pode ser ID ou objeto
            Imovel: orcamento.Imovel?.Id || orcamento.Imovel, // Pode ser ID ou objeto
            PacoteServico: orcamento.PacoteServico?.Id || orcamento.PacoteServico, // Pode ser ID ou objeto
            ItensOrcamento: orcamento.Itens || orcamento.ItensOrcamento || [],
            Desconto: orcamento.Descontos || 0,
            ValorTotal: orcamento.ValorTotal || 0,
            Observacoes: orcamento.Observacoes || ''
          }

          // Garantir que todos os itens tenham números sequenciais
          if (form.value.ItensOrcamento && Array.isArray(form.value.ItensOrcamento)) {
            form.value.ItensOrcamento.forEach((item, index) => {
              if (item instanceof ItemOrcamento) {
                // Se o item não tem número ou tem número incorreto, atualizar
                if (!item.Numero || item.Numero !== index + 1) {
                  item.atualizarNumero(index + 1)
                }
              } else {
                // Converter item para instância da classe ItemOrcamento com número
                // Garantir que os valores sejam válidos
                const custo = parseFloat(item.Custo || item.custo || 0) || 0
                const quantidade = parseFloat(item.Quantidade || item.quantidade || 1) || 1

                const novoItem = new ItemOrcamento(
                  item.Descricao || item.descricao || 'Item',
                  item.Tipo || item.tipo || 'SERVICO',
                  custo,
                  quantidade,
                  item.Unidade || item.unidade || 'UN',
                  item.Observacoes || item.observacoes || '',
                  index + 1
                )
                novoItem.Id = item.Id || item.id // Preservar ID se existir
                form.value.ItensOrcamento[index] = novoItem
              }
            })
          }

          // Verificar se o cliente existe nas opções
          if (form.value.Cliente) {
            const clienteId = form.value.Cliente?.Id || form.value.Cliente
            const clienteEncontrado = clienteOptions.value.find(c =>
              c.id === clienteId
            )
            if (clienteEncontrado) {
              form.value.Cliente = clienteEncontrado // Usar o objeto completo, não apenas o ID
            } else {
              console.warn('Cliente do orçamento não encontrado nas opções:', form.value.Cliente)
              form.value.Cliente = null // Limpar se não encontrado
            }
          }

          // Atualizar opções dependentes após carregar os dados
          await atualizarOpcoesDependentes()

          // Verificar se o imóvel existe nas opções (após filtrar pelos imóveis do cliente)
          if (form.value.Imovel) {
            const imovelId = form.value.Imovel?.Id || form.value.Imovel
            // Primeiro buscar em todas as opções, depois filtrar se necessário
            const imovelEncontrado = imovelOptionsAll.value.find(i =>
              i.id === imovelId
            )
            if (imovelEncontrado) {
              form.value.Imovel = imovelEncontrado // Usar o objeto completo, não apenas o ID
            } else {
              console.warn('Imóvel do orçamento não encontrado nas opções:', form.value.Imovel)
              form.value.Imovel = null // Limpar se não encontrado
            }
          }

          // Verificar se o pacote de serviço existe nas opções
          if (form.value.PacoteServico) {
            const pacoteId = form.value.PacoteServico?.Id || form.value.PacoteServico
            const pacoteEncontrado = pacoteServicoOptionsAll.value.find(p =>
              p.value === pacoteId
            )
            if (pacoteEncontrado) {
              form.value.PacoteServico = pacoteEncontrado.value // Para pacotes, usar o valor/ID (compatível com q-select)
            } else {
              console.warn('Pacote de serviço do orçamento não encontrado nas opções:', form.value.PacoteServico)
              form.value.PacoteServico = null // Limpar se não encontrado
            }
          }
        } else {
          console.error('Orçamento não encontrado')
          $q.notify({
            type: 'negative',
            message: 'Orçamento não encontrado',
            timeout: 3000,
            position: 'top-right'
          })
          router.push('/orcamentos')
        }
      } catch (error) {
        console.error('Erro ao carregar orçamento para edição:', error)
        $q.notify({
          type: 'negative',
          message: 'Erro ao carregar orçamento',
          timeout: 3000,
          position: 'top-right'
        })
      }
    }

    async function carregarDados() {
      try {
        // Carregar clientes do repositório (mesma base da ClienteListagemPage)
        let clientesData = await clienteRepository.getAll()

        // Se não houver clientes, criar dados de teste
        if (clientesData.length === 0) {
          await criarDadosTeste()
          clientesData = await clienteRepository.getAll()
        }

        // Formatar clientes para o select
        clienteOptions.value = clientesData.map(cliente => ({
          label: `${cliente.Nome} ${cliente.Sobrenome}`,
          id: cliente.Id,
          email: cliente.Email,
          cliente: cliente // Objeto completo para referência
        }))

        // Carregar imóveis do repositório
        const imoveisData = await imovelRepository.getAll()

        // Formatar imóveis para o select, incluindo informações do endereço
        imovelOptionsAll.value = imoveisData.map(imovel => {
          const endereco = imovel.Endereco
          const enderecoFormatado = endereco
            ? `${endereco.Logradouro}, ${endereco.Numero}${endereco.Complemento ? ' - ' + endereco.Complemento : ''} - ${endereco.Bairro}, ${endereco.Cidade} - ${endereco.Estado}`
            : 'Endereço não informado'

          return {
            label: enderecoFormatado,
            id: imovel.Id,
            clienteId: imovel.Dono?.Id || imovel.DonoId, // Compatibilidade com diferentes estruturas
            endereco: enderecoFormatado,
            tipo: 'Imóvel', // Pode ser expandido futuramente
            quartos: imovel.NumeroQuartos || 0,
            banheiros: imovel.NumeroBanheiros || 0,
            area: imovel.AreaTotal || 0,
            totalComodos: imovel.TotalComodos || 0,
            observacoes: imovel.Observacao || '',
            imovel: imovel // Objeto completo para referência
          }
        })

        // Dados mock dos serviços (em uma implementação real, viriam de um repository)
        const servicosMock = [
          {
            Id: '1',
            Nome: 'Limpeza Residencial Completa',
            Descricao: 'Limpeza geral de todos os cômodos da residência',
            Valor: 120.00,
            Unidade: 'Visita',
            TempoEstimado: '3-4 horas'
          },
          {
            Id: '2',
            Nome: 'Limpeza Comercial',
            Descricao: 'Limpeza de escritórios e estabelecimentos comerciais',
            Valor: 200.00,
            Unidade: 'Visita',
            TempoEstimado: '4-6 horas'
          },
          {
            Id: '3',
            Nome: 'Limpeza Pós-Obra',
            Descricao: 'Limpeza especializada após reformas e construções',
            Valor: 300.00,
            Unidade: 'Visita',
            TempoEstimado: '6-8 horas'
          },
          {
            Id: '4',
            Nome: 'Limpeza de Vidros',
            Descricao: 'Limpeza especializada de janelas e superfícies de vidro',
            Valor: 80.00,
            Unidade: 'M²',
            TempoEstimado: '2-3 horas'
          },
          {
            Id: '5',
            Nome: 'Enceramento de Piso',
            Descricao: 'Aplicação de cera e polimento de pisos',
            Valor: 50.00,
            Unidade: 'M²',
            TempoEstimado: '1-2 horas'
          }
        ]

        servicoOptionsAll.value = servicosMock.map(servico => ({
          label: `${servico.Nome} - ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(servico.Valor)}`,
          value: servico.Id,
          servico: servico
        }))
        servicoOptions.value = [...servicoOptionsAll.value]

        // Mock de materiais para importação
        const materiaisMock = [
          {
            Id: 'MAT001',
            Nome: 'Detergente Multiuso',
            Descricao: 'Detergente concentrado para limpeza geral de superfícies',
            Valor: 15.50,
            Unidade: 'Litro',
            Categoria: 'Produtos de Limpeza'
          },
          {
            Id: 'MAT002',
            Nome: 'Desinfetante Hospitalar',
            Descricao: 'Desinfetante de amplo espectro para eliminação de vírus e bactérias',
            Valor: 22.00,
            Unidade: 'Litro',
            Categoria: 'Desinfetantes'
          },
          {
            Id: 'MAT003',
            Nome: 'Panos de Microfibra',
            Descricao: 'Kit com 5 panos de microfibra para limpeza sem riscos',
            Valor: 35.00,
            Unidade: 'Kit',
            Categoria: 'Materiais de Limpeza'
          },
          {
            Id: 'MAT004',
            Nome: 'Álcool 70% Gel',
            Descricao: 'Álcool em gel para desinfecção de mãos e superfícies',
            Valor: 12.90,
            Unidade: 'Litro',
            Categoria: 'Desinfetantes'
          },
          {
            Id: 'MAT005',
            Nome: 'Sabão Neutro Líquido',
            Descricao: 'Sabão neutro biodegradável para limpeza delicada',
            Valor: 18.50,
            Unidade: 'Litro',
            Categoria: 'Produtos de Limpeza'
          },
          {
            Id: 'MAT006',
            Nome: 'Luvas de Látex',
            Descricao: 'Caixa com 100 luvas descartáveis de látex',
            Valor: 25.00,
            Unidade: 'Caixa',
            Categoria: 'EPI'
          },
          {
            Id: 'MAT007',
            Nome: 'Sacos de Lixo 100L',
            Descricao: 'Pacote com 50 sacos de lixo reforçados 100 litros',
            Valor: 28.00,
            Unidade: 'Pacote',
            Categoria: 'Descartáveis'
          },
          {
            Id: 'MAT008',
            Nome: 'Vassoura de Cerdas Macias',
            Descricao: 'Vassoura com cerdas sintéticas para limpeza delicada',
            Valor: 42.00,
            Unidade: 'Unidade',
            Categoria: 'Equipamentos'
          },
          {
            Id: 'MAT009',
            Nome: 'Rodo 40cm Profissional',
            Descricao: 'Rodo com lâmina de borracha para secagem de pisos',
            Valor: 38.50,
            Unidade: 'Unidade',
            Categoria: 'Equipamentos'
          },
          {
            Id: 'MAT010',
            Nome: 'Balde com Espremedor',
            Descricao: 'Balde 20L com sistema de espremedor para mop',
            Valor: 85.00,
            Unidade: 'Unidade',
            Categoria: 'Equipamentos'
          },
          {
            Id: 'MAT011',
            Nome: 'Removedor de Gordura',
            Descricao: 'Produto específico para remoção de gordura em cozinhas',
            Valor: 19.90,
            Unidade: 'Litro',
            Categoria: 'Produtos Especializados'
          },
          {
            Id: 'MAT012',
            Nome: 'Cera Líquida Incolor',
            Descricao: 'Cera líquida para enceramento e proteção de pisos',
            Valor: 32.00,
            Unidade: 'Litro',
            Categoria: 'Produtos Especializados'
          },
          {
            Id: 'MAT013',
            Nome: 'Máscara Descartável PFF2',
            Descricao: 'Caixa com 20 máscaras de proteção respiratória',
            Valor: 45.00,
            Unidade: 'Caixa',
            Categoria: 'EPI'
          },
          {
            Id: 'MAT014',
            Nome: 'Papel Toalha 2 Dobras',
            Descricao: 'Fardo com 12 pacotes de papel toalha interfolhas',
            Valor: 68.00,
            Unidade: 'Fardo',
            Categoria: 'Descartáveis'
          },
          {
            Id: 'MAT015',
            Nome: 'Limpa Vidros',
            Descricao: 'Produto específico para limpeza de vidros e espelhos',
            Valor: 16.80,
            Unidade: 'Litro',
            Categoria: 'Produtos Especializados'
          }
        ]

        materialOptionsAll.value = materiaisMock.map(material => ({
          label: `${material.Nome} - ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(material.Valor)}`,
          value: material.Id,
          material: material
        }))
        materialOptions.value = [...materialOptionsAll.value]

        // Carregar equipamentos
        const equipamentos = await equipamentoRepository.getAll()
        equipamentoOptionsAll.value = equipamentos.map(equipamento => ({
          label: `${equipamento.Descricao} - ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(equipamento.PrecoUnitario)}`,
          value: equipamento.Id,
          equipamento: equipamento
        }))
        equipamentoOptions.value = [...equipamentoOptionsAll.value]

        // Carregar pacotes de serviço
        await pacoteServicoStore.fetchPacotes()
        pacoteServicoOptionsAll.value = pacoteServicoStore.pacotes.map(pacote => ({
          label: pacote.Descricao,
          value: pacote.Id,
          favorito: pacote.Favorito,
          margemLucro: pacote.MargemLucro,
          valorMaterial: pacote.ValorMaterial,
          valorServico: pacote.ValorServico,
          valorTotal: pacote.ValorTotal,
          valorVenda: pacote.ValorVenda,
          pacoteCompleto: pacote
        }))
        pacoteServicoOptions.value = [...pacoteServicoOptionsAll.value]

        if (isEditing.value) {
          await carregarOrcamentoParaEdicao()
        } else {
          inicializarForm()
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        $q.notify({
          type: 'negative',
          message: t('forms.orcamento.messages.loadError')
        })
      }
    }

    // Função utilitária para obter validade padrão do orçamento
    function obterValidadePadrao() {
      try {
        const config = JSON.parse(localStorage.getItem('ecleaner_config') || '{}')
        return config.validadeOrcamentoDias || 30 // fallback para 30 dias
      } catch {
        return 30
      }
    }

    function inicializarForm() {
      const diasValidade = obterValidadePadrao()
      const hoje = new Date()
      const dataValidade = new Date(hoje.getTime() + (diasValidade * 24 * 60 * 60 * 1000))
      form.value = {
        NumeroOrcamento: gerarNumeroOrcamento(),
        DataEmissao: hoje.toISOString().split('T')[0],
        Validade: dataValidade.toISOString().split('T')[0],
        Status: StatusOrcamento.RASCUNHO,
        Periodicidade: 'Única',
        QuantidadeNoPeriodo: 1,
        Cliente: null,
        Imovel: null,
        PacoteServico: null,
        ItensOrcamento: [],
        Desconto: 0,
        ValorTotal: 0,
        Observacoes: ''
      }
    }

    function calcularTotal() {
      const total = totalItens.value - (form.value.Desconto || 0)
      form.value.ValorTotal = Math.max(0, total)
    }

    function adicionarItemOrcamento() {
      const novoItem = new ItemOrcamento(
        'Novo item',
        TipoItemOrcamento.SERVICO,
        0,
        1,
        'UN',
        '',
        1 // Novo item sempre fica em primeiro (número 1)
      )

      // Adicionar no início da lista
      form.value.ItensOrcamento.unshift(novoItem)

      // Reordenar números de todos os itens após inserção
      form.value.ItensOrcamento.forEach((item, i) => {
        item.atualizarNumero(i + 1)
      })

      // Destacar o novo item
      destacarNovoItem(novoItem.Id)
    }

    function removerItemOrcamento(index) {
      form.value.ItensOrcamento.splice(index, 1)
      // Reordenar números dos itens após remoção
      form.value.ItensOrcamento.forEach((item, i) => {
        item.atualizarNumero(i + 1)
      })
      calcularTotal()
    }

    // Função para destacar visualmente um item recém criado
    function destacarNovoItem(itemId) {
      itemDestacado.value = itemId
      // Remove o destaque após 1 segundo
      setTimeout(() => {
        itemDestacado.value = null
      }, 1000)
    }

    function carregarItensPacote() {
      if (!form.value.PacoteServico) return

      const pacoteOption = pacoteServicoOptionsAll.value.find(p => p.value === form.value.PacoteServico)
      if (!pacoteOption || !pacoteOption.pacoteCompleto) return

      const pacote = pacoteOption.pacoteCompleto

      // Limpar itens existentes
      form.value.ItensOrcamento = []

      // Adicionar itens de serviço do pacote
      if (pacote.ItensServico && pacote.ItensServico.length > 0) {
        pacote.ItensServico.forEach((itemServico) => {
          const novoItem = new ItemOrcamento(
            itemServico.servico?.Nome || itemServico.Servico?.Nome || 'Serviço',
            TipoItemOrcamento.SERVICO,
            itemServico.servico?.valor || itemServico.Servico?.Valor || 0,
            itemServico.quantidade || itemServico.Quantidade || 1,
            itemServico.servico?.unidade || itemServico.Servico?.Unidade || 'UN',
            itemServico.observacoes || itemServico.Observacoes || '',
            form.value.ItensOrcamento.length + 1
          )
          form.value.ItensOrcamento.push(novoItem)
        })
      }

      // Adicionar itens de material do pacote
      if (pacote.ItensMaterial && pacote.ItensMaterial.length > 0) {
        pacote.ItensMaterial.forEach(itemMaterial => {
          const novoItem = new ItemOrcamento(
            itemMaterial.material?.Nome || itemMaterial.Material?.Nome || 'Material',
            TipoItemOrcamento.MATERIAL,
            itemMaterial.material?.precoUnitario || itemMaterial.Material?.PrecoUnitario || 0,
            itemMaterial.quantidade || itemMaterial.Quantidade || 1,
            itemMaterial.material?.unidade || itemMaterial.Material?.Unidade || 'UN',
            itemMaterial.observacoes || itemMaterial.Observacoes || '',
            form.value.ItensOrcamento.length + 1
          )
          form.value.ItensOrcamento.push(novoItem)
        })
      }

      // Se não há itens específicos, criar itens baseados nos valores do pacote
      if (form.value.ItensOrcamento.length === 0) {
        // Adicionar item de serviço baseado no valor do pacote
        if (pacote.ValorServico > 0) {
          const itemServico = new ItemOrcamento(
            `Serviços - ${pacote.Descricao}`,
            TipoItemOrcamento.SERVICO,
            pacote.ValorServico,
            1,
            'UN',
            'Item de serviço do pacote',
            1
          )
          form.value.ItensOrcamento.push(itemServico)
        }

        // Adicionar item de material baseado no valor do pacote
        if (pacote.ValorMaterial > 0) {
          const itemMaterial = new ItemOrcamento(
            `Materiais - ${pacote.Descricao}`,
            TipoItemOrcamento.MATERIAL,
            pacote.ValorMaterial,
            1,
            'UN',
            'Item de material do pacote',
            form.value.ItensOrcamento.length + 1
          )
          form.value.ItensOrcamento.push(itemMaterial)
        }
      }

      calcularTotal()

      $q.notify({
        type: 'positive',
        message: `Itens do pacote "${pacote.Descricao}" carregados com sucesso!`
      })
    }

    function formatarMoeda(valor) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(valor || 0)
    }

    function filtrarClientes(val, update) {
      update(() => {
        if (val === '') {
          // Retornar todos os clientes
        } else {
          const needle = val.toLowerCase()
          clienteOptions.value = clienteOptions.value.filter(
            cliente => cliente.label.toLowerCase().includes(needle)
          )
        }
      })
    }

    function onClienteChange(cliente) {
      // Limpar seleção de imóvel quando cliente muda
      form.value.Imovel = null

      if (!cliente) {
        imovelOptions.value = []
        return
      }

      // Extrair o ID do cliente - pode ser um objeto ou uma string
      const clienteId = typeof cliente === 'object' ? cliente.id : cliente

      // Filtrar imóveis do cliente selecionado
      const imoveisDoCliente = imovelOptionsAll.value.filter(imovel => imovel.clienteId === clienteId)
      imovelOptions.value = imoveisDoCliente
    }

    function filtrarImoveis(val, update) {
      update(() => {
        // Extrair o ID do cliente - pode ser um objeto ou uma string
        const cliente = form.value.Cliente
        const clienteId = typeof cliente === 'object' ? cliente.id : cliente

        if (val === '') {
          // Se não há filtro de texto, mostrar todos os imóveis do cliente
          if (clienteId) {
            imovelOptions.value = imovelOptionsAll.value.filter(imovel => imovel.clienteId === clienteId)
          }
        } else {
          // Filtrar por texto dentro dos imóveis do cliente
          const needle = val.toLowerCase()
          imovelOptions.value = imovelOptionsAll.value.filter(
            imovel => imovel.clienteId === clienteId &&
              (imovel.label.toLowerCase().indexOf(needle) > -1 ||
                imovel.endereco.toLowerCase().indexOf(needle) > -1)
          )
        }
      })
    }

    async function salvarOrcamento() {
      try {
        // Preparar o orçamento com as instâncias corretas das classes
        const orcamentoData = { ...form.value }

        // Converter cliente para instância da classe Cliente se necessário
        if (orcamentoData.Cliente && !(orcamentoData.Cliente instanceof Cliente)) {
          // Se o cliente é um objeto do select, extrair o ID para buscar nos clienteOptions
          const clienteId = orcamentoData.Cliente.id || orcamentoData.Cliente
          const clienteOption = clienteOptions.value.find(c => c.id === clienteId)

          if (clienteOption && clienteOption.cliente) {
            // Criar uma nova instância da classe Cliente com os dados corretos
            const clienteData = clienteOption.cliente
            orcamentoData.Cliente = new Cliente(
              clienteData.Nome,
              clienteData.Sobrenome,
              clienteData.Email,
              clienteData.Telefone, // telefone vem antes de celular no construtor de Pessoa
              clienteData.Celular,
              clienteData.PreferenciaContato,
              clienteData.Observacoes
            )
            // Copiar propriedades adicionais como Id
            orcamentoData.Cliente.Id = clienteData.Id
            if (clienteData.Enderecos) {
              orcamentoData.Cliente.Enderecos = clienteData.Enderecos
            }
            if (clienteData.Avaliacoes) {
              orcamentoData.Cliente.Avaliacoes = clienteData.Avaliacoes
            }
            if (clienteData.Imoveis) {
              orcamentoData.Cliente.Imoveis = clienteData.Imoveis
            }
          }
        }

        // Converter imóvel para instância da classe Imovel se necessário
        if (orcamentoData.Imovel && !(orcamentoData.Imovel instanceof Imovel)) {
          // Se o imóvel é um objeto do select, extrair o ID para buscar nos imovelOptions
          const imovelId = orcamentoData.Imovel.id || orcamentoData.Imovel
          const imovelOption = imovelOptionsAll.value.find(i => i.id === imovelId)

          if (imovelOption && imovelOption.imovel) {
            // Usar o objeto imóvel já existente (que já é uma instância válida)
            orcamentoData.Imovel = imovelOption.imovel
          }
        }

        // Converter PacoteServico para apenas ID (não salvar o objeto completo)
        if (orcamentoData.PacoteServico) {
          // Se é um objeto, extrair apenas o ID
          if (typeof orcamentoData.PacoteServico === 'object') {
            orcamentoData.PacoteServico = orcamentoData.PacoteServico.Id || orcamentoData.PacoteServico.id || orcamentoData.PacoteServico
          }
          // Se é uma string (já é o ID), manter como está
        }

        if (isEditing.value) {
          console.log('Atualizando orçamento:', orcamentoData)
          console.log('ID do orçamento:', orcamentoData.Id)
          console.log('Itens finais enviados para store.updateOrcamento:', orcamentoData.ItensOrcamento)
          await store.updateOrcamento(orcamentoData)
          $q.notify({
            type: 'positive',
            message: t('messages.updateSuccess'),
            timeout: 3000,
            position: 'top-right'
          })
        } else {
          console.log('Criando orçamento:', orcamentoData)
          console.log('Itens finais enviados para store.addOrcamento:', orcamentoData.ItensOrcamento)
          await store.addOrcamento(orcamentoData)
          $q.notify({
            type: 'positive',
            message: t('messages.saveSuccess'),
            timeout: 3000,
            position: 'top-right'
          })
        }

        // Aguardar um pouco antes de navegar para mostrar a mensagem
        setTimeout(() => {
          router.push('/orcamentos')
        }, 1500)

      } catch (error) {
        console.error('Erro ao salvar orçamento:', error)
        $q.notify({
          type: 'negative',
          message: t('messages.saveError'),
          timeout: 5000,
          position: 'top-right'
        })
      }
    }

    function filtrarPacotesServico(val, update) {
      update(() => {
        if (val === '') {
          pacoteServicoOptions.value = pacoteServicoOptionsAll.value
        } else {
          const needle = val.toLowerCase()
          pacoteServicoOptions.value = pacoteServicoOptionsAll.value.filter(
            option => option.label.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    }

    // Funções para importar serviço
    function abrirDialogImportarServico() {
      servicoSelecionado.value = null
      dialogImportarServico.value = true
    }

    function fecharDialogImportarServico() {
      servicoSelecionado.value = null
      dialogImportarServico.value = false
    }

    function filtrarServicos(val, update) {
      update(() => {
        if (val === '') {
          servicoOptions.value = servicoOptionsAll.value
        } else {
          const needle = val.toLowerCase()
          servicoOptions.value = servicoOptionsAll.value.filter(
            option => option.label.toLowerCase().includes(needle)
          )
        }
      })
    }

    function importarServicoSelecionado() {
      if (!servicoSelecionado.value) return

      const servicoDetalhes = servicoSelecionadoDetalhes.value
      if (!servicoDetalhes) {
        $q.notify({
          type: 'negative',
          message: 'Serviço não encontrado',
          timeout: 3000,
          position: 'top-right'
        })
        return
      }

      // Criar novo item de orçamento baseado no serviço
      const novoItem = new ItemOrcamento(
        servicoDetalhes.Nome || 'Serviço Importado',
        TipoItemOrcamento.SERVICO,
        servicoDetalhes.Valor || 0,
        1, // Quantidade padrão
        servicoDetalhes.Unidade || 'UN',
        servicoDetalhes.Descricao || '',
        1 // Número 1 - será inserido no topo
      )

      // Adicionar no início da lista
      form.value.ItensOrcamento.unshift(novoItem)

      // Reordenar números de todos os itens
      form.value.ItensOrcamento.forEach((item, i) => {
        item.atualizarNumero(i + 1)
      })

      // Recalcular total
      calcularTotal()

      // Destacar o novo item
      destacarNovoItem(novoItem.Id)

      // Notificar sucesso
      $q.notify({
        type: 'positive',
        message: `Serviço "${servicoDetalhes.Nome}" importado com sucesso!`,
        timeout: 3000,
        position: 'top-right'
      })

      // Fechar dialog
      fecharDialogImportarServico()
    }

    // Funções para importar material
    function abrirDialogImportarMaterial() {
      materialSelecionado.value = null
      dialogImportarMaterial.value = true
    }

    function fecharDialogImportarMaterial() {
      materialSelecionado.value = null
      dialogImportarMaterial.value = false
    }

    function filtrarMateriais(val, update) {
      update(() => {
        if (val === '') {
          materialOptions.value = materialOptionsAll.value
        } else {
          const needle = val.toLowerCase()
          materialOptions.value = materialOptionsAll.value.filter(
            option => option.label.toLowerCase().includes(needle)
          )
        }
      })
    }

    function importarMaterialSelecionado() {
      if (!materialSelecionado.value) return

      const materialDetalhes = materialSelecionadoDetalhes.value
      if (!materialDetalhes) {
        $q.notify({
          type: 'negative',
          message: 'Material não encontrado',
          timeout: 3000,
          position: 'top-right'
        })
        return
      }

      // Criar novo item de orçamento baseado no material
      const novoItem = new ItemOrcamento(
        materialDetalhes.Nome || 'Material Importado',
        TipoItemOrcamento.MATERIAL,
        materialDetalhes.PrecoUnitario || 0,
        1, // Quantidade padrão
        materialDetalhes.Unidade || 'UN',
        materialDetalhes.Descricao || '',
        1 // Número 1 - será inserido no topo
      )

      // Adicionar no início da lista
      form.value.ItensOrcamento.unshift(novoItem)

      // Reordenar números de todos os itens
      form.value.ItensOrcamento.forEach((item, i) => {
        item.atualizarNumero(i + 1)
      })

      // Recalcular total
      calcularTotal()

      // Destacar o novo item
      destacarNovoItem(novoItem.Id)

      // Notificar sucesso
      $q.notify({
        type: 'positive',
        message: `Material "${materialDetalhes.Nome}" importado com sucesso!`,
        timeout: 3000,
        position: 'top-right'
      })

      // Fechar dialog
      fecharDialogImportarMaterial()
    }

    // ==== Funções para Importar Equipamento ====
    function abrirDialogImportarEquipamento() {
      equipamentoSelecionado.value = null
      dialogImportarEquipamento.value = true
    }

    function fecharDialogImportarEquipamento() {
      equipamentoSelecionado.value = null
      dialogImportarEquipamento.value = false
    }

    function filtrarEquipamentos(val, update) {
      update(() => {
        if (val === '') {
          equipamentoOptions.value = equipamentoOptionsAll.value
        } else {
          const needle = val.toLowerCase()
          equipamentoOptions.value = equipamentoOptionsAll.value.filter(
            option => option.label.toLowerCase().includes(needle)
          )
        }
      })
    }

    function importarEquipamentoSelecionado() {
      if (!equipamentoSelecionado.value) return

      const equipamentoDetalhes = equipamentoSelecionadoDetalhes.value
      if (!equipamentoDetalhes) {
        $q.notify({
          type: 'negative',
          message: 'Equipamento não encontrado',
          timeout: 3000,
          position: 'top-right'
        })
        return
      }

      // Criar novo item de orçamento baseado no equipamento
      const novoItem = new ItemOrcamento(
        equipamentoDetalhes.Descricao || 'Equipamento Importado',
        TipoItemOrcamento.EQUIPAMENTO,
        equipamentoDetalhes.PrecoUnitario || 0,
        1, // Quantidade padrão
        equipamentoDetalhes.Unidade || 'UN',
        `Equipamento: ${equipamentoDetalhes.Descricao || ''}`,
        1 // Número 1 - será inserido no topo
      )

      // Adicionar no início da lista
      form.value.ItensOrcamento.unshift(novoItem)

      // Reordenar números de todos os itens
      form.value.ItensOrcamento.forEach((item, i) => {
        item.atualizarNumero(i + 1)
      })

      // Recalcular total
      calcularTotal()

      // Destacar o novo item
      destacarNovoItem(novoItem.Id)

      // Notificar sucesso
      $q.notify({
        type: 'positive',
        message: `Equipamento "${equipamentoDetalhes.Descricao}" importado com sucesso!`,
        timeout: 3000,
        position: 'top-right'
      })

      // Fechar dialog
      fecharDialogImportarEquipamento()
    }

    // Método para baixar PDF do orçamento
    async function baixarPDF() {
      try {
        loadingPDF.value = true

        // Carregar configuração da empresa
        const config = JSON.parse(localStorage.getItem('ecleaner_config') || '{}')

        // Validar se tem dados mínimos (usar nomeEmpresa que é o campo correto)
        if (!config.nomeEmpresa) {
          $q.notify({
            type: 'warning',
            message: t('messages.pdfConfigMissing'),
            timeout: 5000,
            position: 'top-right'
          })
          return
        }

        // Buscar o orçamento completo com todos os dados
        const orcamento = store.orcamentos.find(o => o.Id === form.value.Id)
        if (!orcamento) {
          throw new Error('Orçamento não encontrado')
        }

        console.log('Orçamento encontrado para PDF:', orcamento)
        console.log('ItensOrcamento:', orcamento.ItensOrcamento)
        console.log('Itens:', orcamento.Itens)

        // Gerar e baixar o PDF
        await downloadOrcamentoPDF(orcamento, config)

        $q.notify({
          type: 'positive',
          message: t('messages.pdfGenerateSuccess'),
          timeout: 3000,
          position: 'top-right'
        })
      } catch (error) {
        console.error('Erro ao gerar PDF:', error)
        $q.notify({
          type: 'negative',
          message: t('messages.pdfGenerateError'),
          timeout: 5000,
          position: 'top-right'
        })
      } finally {
        loadingPDF.value = false
      }
    }

    // Método para enviar orçamento por e-mail
    async function enviarPorEmail() {
      try {
        loadingEmail.value = true

        // Debug: ver estrutura dos dados
        console.log('form.value.Cliente:', form.value.Cliente)
        console.log('clienteOptions:', clienteOptions.value)

        // Validar se o cliente tem e-mail
        // form.value.Cliente pode ser um ID (string) ou um objeto
        let clienteData

        if (typeof form.value.Cliente === 'object') {
          // Se for objeto, usar diretamente
          clienteData = form.value.Cliente
        } else {
          // Se for ID, buscar no clienteOptions
          clienteData = clienteOptions.value.find(c => c.id === form.value.Cliente)
        }

        console.log('clienteData encontrado:', clienteData)

        if (!clienteData || !clienteData.email) {
          console.error('❌ Cliente sem e-mail:', { clienteData, hasEmail: !!clienteData?.email })
          $q.notify({
            type: 'warning',
            message: t('messages.clienteEmailMissing'),
            timeout: 5000,
            position: 'top-right'
          })
          return
        }

        console.log('✅ E-mail do cliente:', clienteData.email)

        // Carregar configuração da empresa e EmailJS
        const config = JSON.parse(localStorage.getItem('ecleaner_config') || '{}')

        // Validar se tem dados mínimos
        if (!config.nomeEmpresa) {
          $q.notify({
            type: 'warning',
            message: t('messages.pdfConfigMissing'),
            timeout: 5000,
            position: 'top-right'
          })
          return
        }

        // Validar configuração EmailJS
        if (!config.emailJsKey) {
          $q.notify({
            type: 'warning',
            message: t('messages.emailConfigMissing'),
            timeout: 5000,
            position: 'top-right'
          })
          return
        }

        // Buscar o orçamento completo
        const orcamento = store.orcamentos.find(o => o.Id === form.value.Id)
        if (!orcamento) {
          throw new Error('Orçamento não encontrado')
        }

        // Formatar data de emissão
        const dataEmissao = formatDateForLocale(orcamento.DataEmissao, locale.value)

        // Formatar data de validade
        const dataValidade = formatDateForLocale(orcamento.Validade, locale.value)

        // Formatar endereço completo
        let enderecoCompleto = ''
        if (config.endereco) {
          const end = config.endereco
          const partes = [
            end.logradouro && end.numero ? `${end.logradouro}, ${end.numero}` : '',
            end.complemento ? end.complemento : '',
            end.bairro || '',
            end.cidade && end.estado ? `${end.cidade} - ${end.estado}` : '',
            end.cep || ''
          ].filter(p => p)
          enderecoCompleto = partes.join(', ')
        }

        // Obter label do status
        const statusLabel = statusOptions.value.find(s => s.value === orcamento.Status)?.label || orcamento.Status

        // Preparar itens formatados para o e-mail
        const itensFormatados = (orcamento.Itens || []).map((item, index) => ({
          numero: (index + 1).toString(),
          descricao: item.Descricao || '',
          quantidade: (item.Quantidade || 0).toString(),
          unidade: item.Unidade || 'UN',
          precoUnitario: formatarMoeda(item.PrecoUnitario || 0),
          total: formatarMoeda((item.Quantidade || 0) * (item.PrecoUnitario || 0))
        }))

        // Preparar dados para envio
        const dadosEmail = {
          clienteEmail: clienteData.email,
          clienteNome: clienteData.label,
          numeroOrcamento: orcamento.NumeroOrcamento,
          valorTotal: formatarMoeda(orcamento.ValorTotal),
          nomeEmpresa: config.nomeEmpresa,
          dataEmissao: dataEmissao,
          validade: dataValidade,
          status: statusLabel,
          emailEmpresa: config.emailEmpresa || '',
          telefoneEmpresa: config.telefoneEmpresa || '',
          enderecoCompleto: enderecoCompleto,
          itens: itensFormatados,
          observacoes: orcamento.Observacoes || ''
        }

        console.log('📧 Dados que serão enviados:', dadosEmail)

        // Enviar e-mail com todos os dados
        await enviarOrcamentoPorEmail(dadosEmail)

        $q.notify({
          type: 'positive',
          message: t('messages.emailSent', { email: clienteData.email }),
          timeout: 3000,
          position: 'top-right'
        })
      } catch (error) {
        console.error('Erro ao enviar e-mail:', error)
        $q.notify({
          type: 'negative',
          message: t('messages.emailError', { error: error.message }),
          timeout: 5000,
          position: 'top-right'
        })
      } finally {
        loadingEmail.value = false
      }
    }

    // Método para aprovar orçamento
    async function aprovarOrcamento() {
      try {
        // Mostrar dialog de confirmação
        $q.dialog({
          title: t('forms.orcamento.confirmApprove.title'),
          message: t('forms.orcamento.confirmApprove.message'),
          cancel: {
            label: t('buttons.cancel'),
            flat: true
          },
          ok: {
            label: t('forms.orcamento.buttons.approve'),
            color: 'positive'
          },
          persistent: true
        }).onOk(async () => {
          try {
            loadingApprove.value = true

            // Aprovar orçamento (que cria a ordem de serviço automaticamente)
            const ordemServico = await store.approveOrcamento(form.value.Id)

            $q.notify({
              type: 'positive',
              message: t('forms.orcamento.messages.approveSuccess'),
              timeout: 3000,
              position: 'top-right'
            })

            // Atualizar o form com o novo status
            form.value.Status = 'APROVADO'

            // Notificar sobre a ordem de serviço criada
            $q.notify({
              type: 'info',
              message: t('forms.orcamento.messages.ordemServicoCreated', { numero: ordemServico.NumeroOS }),
              timeout: 5000,
              position: 'top-right',
              actions: [
                {
                  label: t('buttons.view'),
                  color: 'white',
                  handler: () => {
                    router.push(`/ordens-servico/${ordemServico.Id}`)
                  }
                }
              ]
            })
          } catch (error) {
            console.error('Erro ao aprovar orçamento:', error)
            $q.notify({
              type: 'negative',
              message: t('forms.orcamento.messages.approveError', { error: error.message }),
              timeout: 5000,
              position: 'top-right'
            })
          } finally {
            loadingApprove.value = false
          }
        })
      } catch (error) {
        console.error('Erro ao mostrar dialog de confirmação:', error)
      }
    }


    // Watchers
    watch(() => form.value.Desconto, () => {
      calcularTotal()
    })

    watch(() => form.value.PacoteServico, (newValue, oldValue) => {
      calcularTotal()
      // Só carregar itens se não estiver editando um orçamento existente
      if (newValue && newValue !== oldValue && !isEditing.value) {
        carregarItensPacote()
      }
    })

    onMounted(() => {
      carregarDados()
    })

    return {
      // Estado
      form,
      isEditing,
      store,
      clienteExpanded,
      itemDestacado,
      loadingPDF,
      loadingEmail,
      loadingApprove,
      podeAprovar,

      // Options
      statusOptions,
      periodicidadeOptions,
      clienteOptions,
      imovelOptions,
      servicoOptions,
      materialOptions,
      pacoteServicoOptions,
      tipoItemOptions,

      // Dialog importar serviço
      dialogImportarServico,
      servicoSelecionado,
      servicoSelecionadoDetalhes,

      // Dialog importar material
      dialogImportarMaterial,
      materialSelecionado,
      materialSelecionadoDetalhes,

      // Dialog importar equipamento
      dialogImportarEquipamento,
      equipamentoSelecionado,
      equipamentoSelecionadoDetalhes,
      equipamentoOptions,

      // Computed
      pacoteSelecionado,
      totalItens,
      dataEmissaoFormatada,
      validadeFormatada,
      currentLocale,
      imovelSelecionado,
      clienteResumo,

      // Validadores
      dateValidators,

      // Métodos
      adicionarItemOrcamento,
      removerItemOrcamento,
      calcularTotal,
      destacarNovoItem,
      formatarMoeda,
      filtrarClientes,
      onClienteChange,
      filtrarImoveis,
      filtrarPacotesServico,
      atualizarOpcoesDependentes,

      // Métodos importar serviço
      abrirDialogImportarServico,
      fecharDialogImportarServico,
      filtrarServicos,
      importarServicoSelecionado,

      // Métodos importar material
      abrirDialogImportarMaterial,
      fecharDialogImportarMaterial,
      filtrarMateriais,
      importarMaterialSelecionado,

      // Métodos importar equipamento
      abrirDialogImportarEquipamento,
      fecharDialogImportarEquipamento,
      filtrarEquipamentos,
      importarEquipamentoSelecionado,

      salvarOrcamento,
      baixarPDF,
      enviarPorEmail,
      aprovarOrcamento
    }
  }
})
</script>

<style lang="sass">
.accent-divider
  height: 2px
  background: $accent
  width: 100%

// Transições para o resumo do cliente
.client-summary-transition
  transition: all 0.3s ease-in-out
  opacity: 1

// Animações personalizadas
@keyframes fadeIn
  from
    opacity: 0
    transform: translateY(-10px)
  to
    opacity: 1
    transform: translateY(0)

@keyframes fadeOut
  from
    opacity: 1
    transform: translateY(0)
  to
    opacity: 0
    transform: translateY(-10px)

.animated
  animation-duration: 0.3s
  animation-fill-mode: both

.fadeIn
  animation-name: fadeIn

.fadeOut
  animation-name: fadeOut

// Melhorar a transição do q-expansion-item
.q-expansion-item__header
  transition: all 0.3s ease-in-out

.q-expansion-item__caption
  transition: all 0.3s ease-in-out

// Destaque visual para item recém criado
.item-destacado
  animation: pulseGlow 1s ease-in-out
  transition: all 0.3s ease-in-out

@keyframes pulseGlow
  0%
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3), 0 0 15px rgba(76, 175, 80, 0.4)
    transform: scale(1.02)
  50%
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.5), 0 0 25px rgba(76, 175, 80, 0.6)
    transform: scale(1.03)
  100%
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3), 0 0 15px rgba(76, 175, 80, 0.4)
    transform: scale(1.02)
</style>
