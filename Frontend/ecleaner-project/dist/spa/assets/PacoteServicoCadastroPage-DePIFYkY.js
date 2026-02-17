import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, p as computed, $ as onMounted, a4 as useRoute, b as useRouter, f as createBaseVNode, e as createVNode, k as QIcon, t as toDisplayString, as as withModifiers, Q as QCard, g as QCardSection, m as createTextVNode, j as QInput, l as QBtn, h as createElementBlock, i as createCommentVNode, aj as Fragment, ak as renderList } from "./index-C_9ZqZx5.js";
import { Q as QSelect } from "./QSelect-B7UkQpY4.js";
import { Q as QExpansionItem } from "./QExpansionItem-BPdw40_F.js";
import { Q as QForm } from "./QForm-BkJeMJ2y.js";
import { Q as QPage } from "./QPage-BjohE0wt.js";
import { u as useQuasar } from "./use-quasar-RhPDzzvJ.js";
import { u as usePacoteServicoStore } from "./pacote-servico-store-C9AlQcmd.js";
import { u as useServicoStore } from "./servico-store-0q30Y1u-.js";
import { u as useMaterialStore } from "./material-store-BXCkkWT9.js";
import { u as useEquipamentoStore } from "./equipamento-store-CDIdSsiM.js";
import { f as formatCurrency, c as currencyMask, p as parseCurrency, g as getCurrencyConfig } from "./currencyUtils-CDJCkeA4.js";
import { P as PacoteServico } from "./pacoteServico-CHT6QKBY.js";
import { seedMateriais } from "./materialSeed-DxCvsxFa.js";
import { s as seedEquipamentos } from "./equipamentoSeed-BsORFu6P.js";
import { u as useI18n } from "./vue-i18n.runtime-BcAS3Jju.js";
import "./QChip-CQHm52sc.js";
import "./format-X8mfcfls.js";
import "./QMenu-0ExrfRXY.js";
import "./position-engine-D6xtJVbJ.js";
import "./selection-q6_tzKdx.js";
import "./servico-Bx3u9W9d.js";
import "./guid-BHuXRmln.js";
import "./material-D-n2u651.js";
import "./materialRepository-ClMwRjl3.js";
import "./equipamento-DInCJpxH.js";
import "./equipamentoRepository-C36gseZz.js";
const _sfc_main = defineComponent({
  name: "PacoteServicoCadastroPage",
  setup() {
    const $q = useQuasar();
    const store = usePacoteServicoStore();
    const servicoStore = useServicoStore();
    const materialStore = useMaterialStore();
    const equipamentoStore = useEquipamentoStore();
    const router = useRouter();
    const route = useRoute();
    const { locale, t } = useI18n();
    const pacote = ref(new PacoteServico("", 30));
    if (!pacote.value.ItensEquipamento) {
      pacote.value.ItensEquipamento = [];
    }
    const materiaisDisponiveis = ref([]);
    const materiaisFiltrados = ref([]);
    const equipamentosDisponiveis = ref([]);
    const equipamentosFiltrados = ref([]);
    const servicosDisponiveis = ref([]);
    const servicosFiltrados = ref([]);
    const valorVendaFormatado = ref("");
    const isEditingExistingPacote = ref(false);
    const isCalculatingFromMargemLucro = ref(false);
    const isCalculatingFromValorVenda = ref(false);
    const isValorVendaManual = ref(false);
    const currencyConfig = computed(() => getCurrencyConfig(locale.value));
    const isEditMode = computed(() => !!route.params.id);
    const rules = {
      required: (val) => !!val || "Campo obrigatório",
      positiveNumber: (val) => val >= 0 || "Deve ser um número positivo"
    };
    onMounted(async () => {
      await servicoStore.fetchServicos();
      servicosDisponiveis.value = servicoStore.servicos;
      servicosFiltrados.value = servicoStore.servicos;
      await materialStore.loadMateriais();
      if (materialStore.Materiais.length === 0) {
        console.log("🌱 Nenhum material encontrado, executando seed...");
        try {
          await seedMateriais();
          await materialStore.loadMateriais();
          console.log("✅ Seed de materiais executado com sucesso!");
        } catch (error) {
          console.error("❌ Erro ao executar seed de materiais:", error);
        }
      }
      materiaisDisponiveis.value = materialStore.Materiais;
      materiaisFiltrados.value = materialStore.Materiais;
      await equipamentoStore.loadEquipamentos();
      if (equipamentoStore.Equipamentos.length === 0) {
        console.log("🌱 Nenhum equipamento encontrado, executando seed...");
        try {
          await seedEquipamentos();
          await equipamentoStore.loadEquipamentos();
          console.log("✅ Seed de equipamentos executado com sucesso!");
        } catch (error) {
          console.error("❌ Erro ao executar seed de equipamentos:", error);
        }
      }
      equipamentosDisponiveis.value = equipamentoStore.Equipamentos;
      equipamentosFiltrados.value = equipamentoStore.Equipamentos;
      if (route.params.id) {
        const p = store.pacotes.find((p2) => p2.Id === route.params.id);
        if (p) {
          console.log("📋 Carregando pacote para edição:", {
            id: p.Id,
            materiais: p.ItensMaterial?.length || 0,
            equipamentos: p.ItensEquipamento?.length || 0,
            servicos: p.ItensServico?.length || 0,
            pacoteCompleto: p
          });
          pacote.value = { ...p };
          if (!pacote.value.ItensMaterial) pacote.value.ItensMaterial = [];
          if (!pacote.value.ItensEquipamento) pacote.value.ItensEquipamento = [];
          if (!pacote.value.ItensServico) pacote.value.ItensServico = [];
          isEditingExistingPacote.value = true;
        }
      }
      updateValorVendaFormatado();
    });
    function formatCurrencyValue(value) {
      return formatCurrency(value, locale.value, currencyConfig.value.currency);
    }
    function onValorVendaInput(value) {
      const masked = currencyMask(value, locale.value, currencyConfig.value.currency);
      valorVendaFormatado.value = masked;
      const novoValorVenda = parseCurrency(masked);
      pacote.value.ValorVenda = novoValorVenda;
      isValorVendaManual.value = true;
      if (pacote.value.ValorTotal > 0) {
        const margemCalculada = (novoValorVenda - pacote.value.ValorTotal) / pacote.value.ValorTotal * 100;
        pacote.value.MargemLucro = Math.round(Math.max(0, margemCalculada) * 100) / 100;
        console.log("Valor Venda:", novoValorVenda, "Valor Total:", pacote.value.ValorTotal, "Nova Margem:", pacote.value.MargemLucro);
      }
    }
    function updateValorVendaFormatado() {
      valorVendaFormatado.value = formatCurrencyValue(pacote.value.ValorVenda);
    }
    function onMargemLucroChange() {
      console.log("Margem de lucro alterada para:", pacote.value.MargemLucro);
      isValorVendaManual.value = false;
      recalcularValores();
    }
    function adicionarMaterial() {
      const item = {
        Id: Date.now().toString(),
        Material: null,
        Quantidade: 1,
        CustoUnitario: 0,
        ValorTotal: 0,
        Observacao: ""
      };
      pacote.value.ItensMaterial.push(item);
    }
    function removerMaterial(index) {
      pacote.value.ItensMaterial.splice(index, 1);
      recalcularValores();
    }
    function onMaterialChange() {
      pacote.value.ItensMaterial.forEach((item) => {
        if (item.Material && item.Material.PrecoUnitario) {
          item.CustoUnitario = item.Material.PrecoUnitario;
          item.ValorTotal = item.Quantidade * item.CustoUnitario;
        }
      });
      recalcularValores();
    }
    function adicionarEquipamento() {
      const item = {
        Id: Date.now().toString(),
        Equipamento: null,
        Quantidade: 1,
        CustoUnitario: 0,
        ValorTotal: 0,
        Observacao: ""
      };
      console.log("🔧 Adicionando equipamento:", item);
      console.log("📦 ItensEquipamento antes:", pacote.value.ItensEquipamento.length);
      pacote.value.ItensEquipamento.push(item);
      console.log("📦 ItensEquipamento depois:", pacote.value.ItensEquipamento.length);
    }
    function removerEquipamento(index) {
      pacote.value.ItensEquipamento.splice(index, 1);
      recalcularValores();
    }
    function onEquipamentoChange() {
      pacote.value.ItensEquipamento.forEach((item) => {
        if (item.Equipamento && item.Equipamento.PrecoUnitario) {
          item.CustoUnitario = item.Equipamento.PrecoUnitario;
          item.ValorTotal = item.Quantidade * item.CustoUnitario;
        }
      });
      recalcularValores();
    }
    function adicionarServico() {
      const item = {
        Id: Date.now().toString(),
        Servico: null,
        QuantidadeHoras: 1,
        QuantidadePessoas: 1,
        ValorTotal: 0
      };
      pacote.value.ItensServico.push(item);
    }
    function removerServico(index) {
      pacote.value.ItensServico.splice(index, 1);
      recalcularValores();
    }
    function onServicoChange() {
      pacote.value.ItensServico.forEach((item) => {
        if (item.Servico && item.Servico.Valor) {
          item.ValorTotal = item.QuantidadeHoras * item.QuantidadePessoas * item.Servico.Valor;
        }
      });
      recalcularValores();
    }
    function onQuantidadeChange() {
      pacote.value.ItensMaterial.forEach((item) => {
        if (item.Material && item.Material.PrecoUnitario) {
          item.CustoUnitario = item.Material.PrecoUnitario;
          item.ValorTotal = item.Quantidade * item.CustoUnitario;
        }
      });
      pacote.value.ItensEquipamento.forEach((item) => {
        if (item.Equipamento && item.Equipamento.PrecoUnitario) {
          item.CustoUnitario = item.Equipamento.PrecoUnitario;
          item.ValorTotal = item.Quantidade * item.CustoUnitario;
        }
      });
      pacote.value.ItensServico.forEach((item) => {
        if (item.Servico && item.Servico.Valor) {
          item.ValorTotal = item.QuantidadeHoras * item.QuantidadePessoas * item.Servico.Valor;
        }
      });
      recalcularValores();
    }
    function recalcularValores() {
      const pacoteInstance = new PacoteServico(pacote.value.Descricao, pacote.value.MargemLucro);
      pacoteInstance.ItensMaterial = pacote.value.ItensMaterial;
      pacoteInstance.ItensEquipamento = pacote.value.ItensEquipamento;
      pacoteInstance.ItensServico = pacote.value.ItensServico;
      pacoteInstance.recalcularValores();
      pacote.value.ValorMaterial = pacoteInstance.ValorMaterial;
      pacote.value.ValorEquipamento = pacoteInstance.ValorEquipamento;
      pacote.value.ValorServico = pacoteInstance.ValorServico;
      pacote.value.ValorTotal = pacoteInstance.ValorTotal;
      if (!isValorVendaManual.value) {
        pacote.value.ValorVenda = pacoteInstance.ValorVenda;
      }
      updateValorVendaFormatado();
    }
    async function salvarPacote() {
      try {
        console.log("💾 Salvando pacote com equipamentos:", {
          materiais: pacote.value.ItensMaterial.length,
          equipamentos: pacote.value.ItensEquipamento.length,
          servicos: pacote.value.ItensServico.length,
          pacoteCompleto: pacote.value
        });
        if (!isEditingExistingPacote.value) {
          pacote.value.Id = null;
        }
        if (isEditingExistingPacote.value) {
          await store.updatePacote(pacote.value);
        } else {
          await store.addPacote(pacote.value);
        }
        $q.notify({
          type: "positive",
          message: isEditingExistingPacote.value ? t("messages.updateSuccess") : t("messages.saveSuccess"),
          timeout: 3e3,
          position: "top-right"
        });
        setTimeout(() => {
          router.push("/pacotes-servicos");
        }, 1500);
      } catch (error) {
        console.error("Erro ao salvar pacote:", error);
        $q.notify({
          type: "negative",
          message: t("messages.saveError"),
          timeout: 5e3,
          position: "top-right"
        });
      }
    }
    function cancelar() {
      router.push("/pacotes-servicos");
    }
    function filterServicos(val, update) {
      if (val === "") {
        update(() => {
          servicosFiltrados.value = servicosDisponiveis.value;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        servicosFiltrados.value = servicosDisponiveis.value.filter(
          (v) => v.Nome.toLowerCase().indexOf(needle) > -1 || v.Descricao && v.Descricao.toLowerCase().indexOf(needle) > -1
        );
      });
    }
    function filterMateriais(val, update) {
      if (val === "") {
        update(() => {
          materiaisFiltrados.value = materiaisDisponiveis.value;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        materiaisFiltrados.value = materiaisDisponiveis.value.filter(
          (v) => v.Descricao.toLowerCase().indexOf(needle) > -1 || v.Unidade && v.Unidade.toLowerCase().indexOf(needle) > -1
        );
      });
    }
    function filterEquipamentos(val, update) {
      if (val === "") {
        update(() => {
          equipamentosFiltrados.value = equipamentosDisponiveis.value;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        equipamentosFiltrados.value = equipamentosDisponiveis.value.filter(
          (v) => v.Descricao.toLowerCase().indexOf(needle) > -1 || v.Unidade && v.Unidade.toLowerCase().indexOf(needle) > -1
        );
      });
    }
    return {
      pacote,
      materiaisDisponiveis,
      materiaisFiltrados,
      equipamentosDisponiveis,
      equipamentosFiltrados,
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
      adicionarEquipamento,
      removerEquipamento,
      onEquipamentoChange,
      onQuantidadeChange,
      adicionarServico,
      removerServico,
      onServicoChange,
      recalcularValores,
      salvarPacote,
      cancelar,
      filterServicos,
      filterMateriais,
      filterEquipamentos
    };
  }
});
const _hoisted_1 = { class: "row items-center q-mb-xl" };
const _hoisted_2 = { class: "col" };
const _hoisted_3 = { class: "row items-center q-mb-sm" };
const _hoisted_4 = { class: "text-h5 q-ma-none text-secondary" };
const _hoisted_5 = { class: "row justify-end" };
const _hoisted_6 = { class: "text-subtitle1 text-grey-7 q-ma-none" };
const _hoisted_7 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_8 = { class: "row q-col-gutter-md" };
const _hoisted_9 = { class: "col-12 col-md-6" };
const _hoisted_10 = { class: "col-12 col-md-3" };
const _hoisted_11 = { class: "col-12 col-md-3 flex items-center" };
const _hoisted_12 = { class: "row items-center justify-end q-mb-md" };
const _hoisted_13 = {
  key: 0,
  class: "text-center text-grey-6 q-py-lg"
};
const _hoisted_14 = { class: "col-12 col-md-4" };
const _hoisted_15 = { class: "col-12 col-md-2" };
const _hoisted_16 = { class: "col-12 col-md-2" };
const _hoisted_17 = { class: "col-12 col-md-3" };
const _hoisted_18 = { class: "col-12 col-md-1 flex items-center" };
const _hoisted_19 = { class: "row items-center justify-end q-mb-md" };
const _hoisted_20 = {
  key: 0,
  class: "text-center text-grey-6 q-py-lg"
};
const _hoisted_21 = { class: "col-12 col-md-6" };
const _hoisted_22 = { class: "col-12 col-md-3" };
const _hoisted_23 = { class: "col-12 col-md-2" };
const _hoisted_24 = { class: "col-12 col-md-1 flex items-center" };
const _hoisted_25 = { class: "row items-center justify-end q-mb-md" };
const _hoisted_26 = {
  key: 0,
  class: "text-center text-grey-6 q-py-lg"
};
const _hoisted_27 = { class: "col-12 col-md-5" };
const _hoisted_28 = { class: "col-12 col-md-2" };
const _hoisted_29 = { class: "col-12 col-md-2" };
const _hoisted_30 = { class: "col-12 col-md-2" };
const _hoisted_31 = { class: "col-12 col-md-1 flex items-center" };
const _hoisted_32 = { class: "text-h6 q-mb-md" };
const _hoisted_33 = { class: "row q-col-gutter-md" };
const _hoisted_34 = { class: "col-6 col-md-3" };
const _hoisted_35 = { class: "col-6 col-md-3" };
const _hoisted_36 = { class: "col-6 col-md-3" };
const _hoisted_37 = { class: "col-6 col-md-3" };
const _hoisted_38 = { class: "col-6 col-md-3" };
const _hoisted_39 = { class: "row justify-end q-mt-lg" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "q-pa-lg" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(QIcon, {
              name: "inventory",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.isEditMode ? _ctx.$t("pages.pacoteServico.editarTitle") : _ctx.$t("pages.pacoteServico.cadastroTitle")), 1)
          ]),
          _cache[4] || (_cache[4] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("pages.pacoteServico.cadastroSubtitle")), 1)
          ])
        ])
      ]),
      createVNode(QForm, {
        onSubmit: withModifiers(_ctx.salvarPacote, ["prevent"])
      }, {
        default: withCtx(() => [
          createVNode(QCard, {
            flat: "",
            bordered: "",
            class: "q-mb-lg"
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_7, [
                    createVNode(QIcon, {
                      name: "info",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("pages.pacoteServico.sections.informacoesBasicas")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_8, [
                    createBaseVNode("div", _hoisted_9, [
                      createVNode(QInput, {
                        modelValue: _ctx.pacote.Descricao,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.pacote.Descricao = $event),
                        label: _ctx.$t("pages.pacoteServico.fields.descricao"),
                        rules: [_ctx.rules.required],
                        filled: ""
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_10, [
                      createVNode(QInput, {
                        modelValue: _ctx.pacote.MargemLucro,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.pacote.MargemLucro = $event),
                        modelModifiers: { number: true },
                        type: "number",
                        label: _ctx.$t("pages.pacoteServico.fields.margemLucro"),
                        suffix: "%",
                        rules: [_ctx.rules.required, _ctx.rules.positiveNumber],
                        onInput: _ctx.onMargemLucroChange,
                        filled: ""
                      }, null, 8, ["modelValue", "label", "rules", "onInput"])
                    ]),
                    createBaseVNode("div", _hoisted_11, [
                      createVNode(QBtn, {
                        flat: "",
                        round: "",
                        onClick: _cache[2] || (_cache[2] = ($event) => _ctx.pacote.Favorito = !_ctx.pacote.Favorito),
                        icon: _ctx.pacote.Favorito ? "favorite" : "favorite_border",
                        color: _ctx.pacote.Favorito ? "red" : "grey-5",
                        size: "md"
                      }, null, 8, ["icon", "color"])
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(QCard, {
            flat: "",
            bordered: "",
            class: "q-mb-lg"
          }, {
            default: withCtx(() => [
              createVNode(QExpansionItem, {
                label: _ctx.$t("pages.pacoteServico.sections.servicos"),
                icon: "room_service",
                "header-class": "text-h6"
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_12, [
                        createVNode(QBtn, {
                          color: "primary",
                          icon: "add",
                          size: "sm",
                          label: _ctx.$t("pages.pacoteServico.buttons.addServico"),
                          onClick: _ctx.adicionarServico
                        }, null, 8, ["label", "onClick"])
                      ]),
                      _ctx.pacote.ItensServico.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_13, toDisplayString(_ctx.$t("pages.pacoteServico.messages.noServicos")), 1)) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.pacote.ItensServico, (item, index) => {
                        return openBlock(), createElementBlock("div", {
                          key: index,
                          class: "q-mb-md"
                        }, [
                          createVNode(QCard, {
                            flat: "",
                            bordered: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(QCardSection, { class: "row q-col-gutter-md" }, {
                                default: withCtx(() => [
                                  createBaseVNode("div", _hoisted_14, [
                                    createVNode(QSelect, {
                                      modelValue: item.Servico,
                                      "onUpdate:modelValue": [($event) => item.Servico = $event, _ctx.onServicoChange],
                                      options: _ctx.servicosFiltrados,
                                      "option-label": "Nome",
                                      "option-value": "Id",
                                      label: _ctx.$t("pages.pacoteServico.fields.servico"),
                                      "use-input": "",
                                      onFilter: _ctx.filterServicos,
                                      "input-debounce": "0"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "label", "onFilter"])
                                  ]),
                                  createBaseVNode("div", _hoisted_15, [
                                    createVNode(QInput, {
                                      modelValue: item.QuantidadeHoras,
                                      "onUpdate:modelValue": ($event) => item.QuantidadeHoras = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      label: _ctx.$t("pages.pacoteServico.fields.horas"),
                                      onInput: _ctx.onQuantidadeChange
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "onInput"])
                                  ]),
                                  createBaseVNode("div", _hoisted_16, [
                                    createVNode(QInput, {
                                      modelValue: item.QuantidadePessoas,
                                      "onUpdate:modelValue": ($event) => item.QuantidadePessoas = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      label: _ctx.$t("pages.pacoteServico.fields.pessoas"),
                                      onInput: _ctx.onQuantidadeChange
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "onInput"])
                                  ]),
                                  createBaseVNode("div", _hoisted_17, [
                                    createVNode(QInput, {
                                      "model-value": _ctx.formatCurrencyValue(item.ValorTotal),
                                      label: _ctx.$t("pages.pacoteServico.fields.valorTotal"),
                                      readonly: ""
                                    }, null, 8, ["model-value", "label"])
                                  ]),
                                  createBaseVNode("div", _hoisted_18, [
                                    createVNode(QBtn, {
                                      flat: "",
                                      round: "",
                                      color: "negative",
                                      icon: "delete",
                                      onClick: ($event) => _ctx.removerServico(index)
                                    }, null, 8, ["onClick"])
                                  ])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]);
                      }), 128))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }),
          createVNode(QCard, {
            flat: "",
            bordered: "",
            class: "q-mb-lg"
          }, {
            default: withCtx(() => [
              createVNode(QExpansionItem, {
                label: _ctx.$t("pages.pacoteServico.sections.materiais"),
                icon: "cleaning_services",
                "header-class": "text-h6"
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_19, [
                        createVNode(QBtn, {
                          color: "primary",
                          icon: "add",
                          size: "sm",
                          label: _ctx.$t("pages.pacoteServico.buttons.addMaterial"),
                          onClick: _ctx.adicionarMaterial
                        }, null, 8, ["label", "onClick"])
                      ]),
                      _ctx.pacote.ItensMaterial.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_20, toDisplayString(_ctx.$t("pages.pacoteServico.messages.noMaterials")), 1)) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.pacote.ItensMaterial, (item, index) => {
                        return openBlock(), createElementBlock("div", {
                          key: index,
                          class: "q-mb-md"
                        }, [
                          createVNode(QCard, {
                            flat: "",
                            bordered: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(QCardSection, { class: "row q-col-gutter-md" }, {
                                default: withCtx(() => [
                                  createBaseVNode("div", _hoisted_21, [
                                    createVNode(QSelect, {
                                      modelValue: item.Material,
                                      "onUpdate:modelValue": [($event) => item.Material = $event, _ctx.onMaterialChange],
                                      options: _ctx.materiaisFiltrados,
                                      "option-label": "Descricao",
                                      "option-value": "Id",
                                      label: _ctx.$t("pages.pacoteServico.fields.material"),
                                      "use-input": "",
                                      onFilter: _ctx.filterMateriais,
                                      "input-debounce": "0"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "label", "onFilter"])
                                  ]),
                                  createBaseVNode("div", _hoisted_22, [
                                    createVNode(QInput, {
                                      modelValue: item.Quantidade,
                                      "onUpdate:modelValue": ($event) => item.Quantidade = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      label: _ctx.$t("pages.pacoteServico.fields.quantidade"),
                                      onInput: _ctx.onQuantidadeChange
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "onInput"])
                                  ]),
                                  createBaseVNode("div", _hoisted_23, [
                                    createVNode(QInput, {
                                      "model-value": _ctx.formatCurrencyValue(item.ValorTotal),
                                      label: _ctx.$t("pages.pacoteServico.fields.valorTotal"),
                                      readonly: ""
                                    }, null, 8, ["model-value", "label"])
                                  ]),
                                  createBaseVNode("div", _hoisted_24, [
                                    createVNode(QBtn, {
                                      flat: "",
                                      round: "",
                                      color: "negative",
                                      icon: "delete",
                                      onClick: ($event) => _ctx.removerMaterial(index)
                                    }, null, 8, ["onClick"])
                                  ])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]);
                      }), 128))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }),
          createVNode(QCard, {
            flat: "",
            bordered: "",
            class: "q-mb-lg"
          }, {
            default: withCtx(() => [
              createVNode(QExpansionItem, {
                label: _ctx.$t("pages.pacoteServico.sections.equipamentos"),
                icon: "construction",
                "header-class": "text-h6"
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_25, [
                        createVNode(QBtn, {
                          color: "purple",
                          icon: "add",
                          size: "sm",
                          label: _ctx.$t("pages.pacoteServico.buttons.addEquipamento"),
                          onClick: _ctx.adicionarEquipamento
                        }, null, 8, ["label", "onClick"])
                      ]),
                      _ctx.pacote.ItensEquipamento.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_26, toDisplayString(_ctx.$t("pages.pacoteServico.messages.noEquipamentos")), 1)) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.pacote.ItensEquipamento, (item, index) => {
                        return openBlock(), createElementBlock("div", {
                          key: index,
                          class: "q-mb-md"
                        }, [
                          createVNode(QCard, {
                            flat: "",
                            bordered: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(QCardSection, { class: "row q-col-gutter-md" }, {
                                default: withCtx(() => [
                                  createBaseVNode("div", _hoisted_27, [
                                    createVNode(QSelect, {
                                      modelValue: item.Equipamento,
                                      "onUpdate:modelValue": [($event) => item.Equipamento = $event, _ctx.onEquipamentoChange],
                                      options: _ctx.equipamentosFiltrados,
                                      "option-label": "Descricao",
                                      "option-value": "Id",
                                      label: _ctx.$t("pages.pacoteServico.fields.equipamento"),
                                      "use-input": "",
                                      onFilter: _ctx.filterEquipamentos,
                                      "input-debounce": "0"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "label", "onFilter"])
                                  ]),
                                  createBaseVNode("div", _hoisted_28, [
                                    createVNode(QInput, {
                                      modelValue: item.Quantidade,
                                      "onUpdate:modelValue": ($event) => item.Quantidade = $event,
                                      modelModifiers: { number: true },
                                      type: "number",
                                      label: _ctx.$t("pages.pacoteServico.fields.quantidade"),
                                      onInput: _ctx.onQuantidadeChange
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "onInput"])
                                  ]),
                                  createBaseVNode("div", _hoisted_29, [
                                    item.Equipamento ? (openBlock(), createBlock(QInput, {
                                      key: 0,
                                      "model-value": item.Equipamento.Unidade,
                                      label: _ctx.$t("pages.pacoteServico.fields.unidade"),
                                      readonly: "",
                                      filled: ""
                                    }, null, 8, ["model-value", "label"])) : createCommentVNode("", true)
                                  ]),
                                  createBaseVNode("div", _hoisted_30, [
                                    createVNode(QInput, {
                                      "model-value": _ctx.formatCurrencyValue(item.ValorTotal),
                                      label: _ctx.$t("pages.pacoteServico.fields.valorTotal"),
                                      readonly: ""
                                    }, null, 8, ["model-value", "label"])
                                  ]),
                                  createBaseVNode("div", _hoisted_31, [
                                    createVNode(QBtn, {
                                      flat: "",
                                      round: "",
                                      color: "negative",
                                      icon: "delete",
                                      onClick: ($event) => _ctx.removerEquipamento(index)
                                    }, null, 8, ["onClick"])
                                  ])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]);
                      }), 128))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["label"])
            ]),
            _: 1
          }),
          createVNode(QCard, {
            flat: "",
            bordered: "",
            class: "q-mb-lg"
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_32, toDisplayString(_ctx.$t("pages.pacoteServico.sections.resumo")), 1),
                  createBaseVNode("div", _hoisted_33, [
                    createBaseVNode("div", _hoisted_34, [
                      createVNode(QInput, {
                        "model-value": _ctx.formatCurrencyValue(_ctx.pacote.ValorMaterial),
                        label: _ctx.$t("pages.pacoteServico.fields.valorMaterial"),
                        readonly: "",
                        outlined: ""
                      }, {
                        prepend: withCtx(() => [
                          createVNode(QIcon, { name: "attach_money" })
                        ]),
                        _: 1
                      }, 8, ["model-value", "label"])
                    ]),
                    createBaseVNode("div", _hoisted_35, [
                      createVNode(QInput, {
                        "model-value": _ctx.formatCurrencyValue(_ctx.pacote.ValorEquipamento),
                        label: _ctx.$t("pages.pacoteServico.fields.valorEquipamento"),
                        readonly: "",
                        outlined: ""
                      }, {
                        prepend: withCtx(() => [
                          createVNode(QIcon, { name: "attach_money" })
                        ]),
                        _: 1
                      }, 8, ["model-value", "label"])
                    ]),
                    createBaseVNode("div", _hoisted_36, [
                      createVNode(QInput, {
                        "model-value": _ctx.formatCurrencyValue(_ctx.pacote.ValorServico),
                        label: _ctx.$t("pages.pacoteServico.fields.valorServico"),
                        readonly: "",
                        outlined: ""
                      }, {
                        prepend: withCtx(() => [
                          createVNode(QIcon, { name: "attach_money" })
                        ]),
                        _: 1
                      }, 8, ["model-value", "label"])
                    ]),
                    createBaseVNode("div", _hoisted_37, [
                      createVNode(QInput, {
                        "model-value": _ctx.formatCurrencyValue(_ctx.pacote.ValorTotal),
                        label: _ctx.$t("pages.pacoteServico.fields.valorCusto"),
                        readonly: "",
                        outlined: ""
                      }, {
                        prepend: withCtx(() => [
                          createVNode(QIcon, { name: "attach_money" })
                        ]),
                        _: 1
                      }, 8, ["model-value", "label"])
                    ]),
                    createBaseVNode("div", _hoisted_38, [
                      createVNode(QInput, {
                        modelValue: _ctx.valorVendaFormatado,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.valorVendaFormatado = $event),
                        label: _ctx.$t("pages.pacoteServico.fields.valorVenda"),
                        outlined: "",
                        onInput: _ctx.onValorVendaInput,
                        placeholder: _ctx.currencyConfig.placeholder
                      }, {
                        prepend: withCtx(() => [
                          createVNode(QIcon, { name: "attach_money" })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "label", "onInput", "placeholder"])
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createBaseVNode("div", _hoisted_39, [
            createVNode(QBtn, {
              type: "submit",
              color: "primary",
              label: _ctx.$t("forms.buttons.save")
            }, null, 8, ["label"]),
            createVNode(QBtn, {
              flat: "",
              color: "secondary",
              label: _ctx.$t("forms.buttons.cancel"),
              class: "q-ml-md",
              onClick: _ctx.cancelar
            }, null, 8, ["label", "onClick"])
          ])
        ]),
        _: 1
      }, 8, ["onSubmit"])
    ]),
    _: 1
  });
}
const PacoteServicoCadastroPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PacoteServicoCadastroPage as default
};
//# sourceMappingURL=PacoteServicoCadastroPage-DePIFYkY.js.map
