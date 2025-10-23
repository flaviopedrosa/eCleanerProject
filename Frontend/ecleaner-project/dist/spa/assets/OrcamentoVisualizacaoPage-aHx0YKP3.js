import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, l as computed, M as onMounted, b as useRouter, T as useRoute, f as createBaseVNode, g as createElementBlock, e as createVNode, i as QBtn, Q as QIcon, t as toDisplayString, al as QSpinner, h as createCommentVNode, j as createTextVNode, an as normalizeClass, a1 as Fragment, a2 as renderList } from "./index-DcwkHxen.js";
import { Q as QChip } from "./QChip-DJNlQhAb.js";
import { Q as QBadge } from "./QBadge-B7XeNqtw.js";
import { Q as QPage, a as QCard, b as QCardSection } from "./QPage-BYlIwfOX.js";
import { Q as QSpace } from "./QSpace-1am2MY4J.js";
import { Q as QSeparator } from "./QSeparator-Bf3c0dV9.js";
import { u as useQuasar } from "./use-quasar--iu-ZanD.js";
import { u as useOrcamentoStore, S as StatusOrcamento } from "./orcamento-store-B_cAtjL7.js";
import { u as useI18n } from "./vue-i18n.runtime-CPX_irvo.js";
import "./use-dark-XRAlznJ5.js";
import "./guid-BHuXRmln.js";
import "./imovel-DGbBNfIP.js";
import "./pessoa-CnZ4y1f1.js";
import "./pacoteServico-BEcXIkd0.js";
import "./material-D-n2u651.js";
import "./servico-Bx3u9W9d.js";
const _sfc_main = defineComponent({
  name: "OrcamentoVisualizacaoPage",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { t } = useI18n();
    const $q = useQuasar();
    const store = useOrcamentoStore();
    const orcamento = ref(null);
    const loading = ref(true);
    const subtotalServicos = computed(
      () => orcamento.value?.ItensServico?.reduce((sum, item) => sum + (item.Subtotal || 0), 0) || 0
    );
    const subtotalMateriais = computed(
      () => orcamento.value?.ItensMaterial?.reduce((sum, item) => sum + (item.Subtotal || 0), 0) || 0
    );
    function formatarMoeda(valor) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(valor || 0);
    }
    function formatarData(data) {
      return new Intl.DateTimeFormat("pt-BR").format(new Date(data));
    }
    function isExpirado(validade) {
      return /* @__PURE__ */ new Date() > new Date(validade);
    }
    function getStatusColor(status) {
      const colors = {
        [StatusOrcamento.RASCUNHO]: "grey",
        [StatusOrcamento.PENDENTE]: "orange",
        [StatusOrcamento.APROVADO]: "green",
        [StatusOrcamento.REJEITADO]: "red",
        [StatusOrcamento.CANCELADO]: "red",
        [StatusOrcamento.EXPIRADO]: "negative"
      };
      return colors[status] || "grey";
    }
    function editarOrcamento() {
      router.push(`/orcamentos/${orcamento.value.Id}`);
    }
    async function aprovarOrcamento() {
      try {
        await store.approveOrcamento(orcamento.value.Id);
        orcamento.value.Status = StatusOrcamento.APROVADO;
        $q.notify({
          type: "positive",
          message: t("forms.orcamento.messages.approveSuccess")
        });
      } catch (error) {
        console.error("Erro ao aprovar orçamento:", error);
        $q.notify({
          type: "negative",
          message: t("forms.orcamento.messages.approveError")
        });
      }
    }
    async function rejeitarOrcamento() {
      try {
        $q.dialog({
          title: t("forms.orcamento.confirmReject.title"),
          message: t("forms.orcamento.confirmReject.message"),
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await store.rejectOrcamento(orcamento.value.Id);
          orcamento.value.Status = StatusOrcamento.REJEITADO;
          $q.notify({
            type: "positive",
            message: t("forms.orcamento.messages.rejectSuccess")
          });
        });
      } catch (error) {
        console.error("Erro ao rejeitar orçamento:", error);
        $q.notify({
          type: "negative",
          message: t("forms.orcamento.messages.rejectError")
        });
      }
    }
    function imprimirOrcamento() {
      $q.notify({
        type: "info",
        message: t("forms.orcamento.messages.printDevelopment")
      });
    }
    function compartilharOrcamento() {
      $q.notify({
        type: "info",
        message: t("forms.orcamento.messages.shareDevelopment")
      });
    }
    async function carregarOrcamento() {
      try {
        loading.value = true;
        const id = route.params.id;
        orcamento.value = await store.getOrcamentoById(id);
      } catch (error) {
        console.error("Erro ao carregar orçamento:", error);
        $q.notify({
          type: "negative",
          message: t("forms.orcamento.messages.loadError")
        });
      } finally {
        loading.value = false;
      }
    }
    onMounted(() => {
      carregarOrcamento();
    });
    return {
      // Estado
      orcamento,
      loading,
      // Computed
      subtotalServicos,
      subtotalMateriais,
      // Métodos
      t,
      formatarMoeda,
      formatarData,
      isExpirado,
      getStatusColor,
      editarOrcamento,
      aprovarOrcamento,
      rejeitarOrcamento,
      imprimirOrcamento,
      compartilharOrcamento
    };
  }
});
const _hoisted_1 = { class: "row items-center q-mb-xl" };
const _hoisted_2 = { class: "col" };
const _hoisted_3 = { class: "row items-center q-mb-sm" };
const _hoisted_4 = { class: "text-h5 q-ma-none text-secondary" };
const _hoisted_5 = { class: "row justify-end" };
const _hoisted_6 = { class: "text-subtitle1 text-grey-7 q-ma-none" };
const _hoisted_7 = {
  key: 0,
  class: "row justify-center q-py-xl"
};
const _hoisted_8 = {
  key: 1,
  class: "row q-col-gutter-lg"
};
const _hoisted_9 = { class: "col-12 col-lg-8" };
const _hoisted_10 = { class: "text-h6 q-mb-md" };
const _hoisted_11 = { class: "row q-col-gutter-md" };
const _hoisted_12 = { class: "col-12 col-md-6" };
const _hoisted_13 = { class: "text-caption text-grey-6 q-mb-xs" };
const _hoisted_14 = { class: "col-12 col-md-6" };
const _hoisted_15 = { class: "text-caption text-grey-6 q-mb-xs" };
const _hoisted_16 = { class: "col-12 col-md-6" };
const _hoisted_17 = { class: "text-caption text-grey-6 q-mb-xs" };
const _hoisted_18 = { class: "text-body1" };
const _hoisted_19 = { class: "col-12 col-md-6" };
const _hoisted_20 = { class: "text-caption text-grey-6 q-mb-xs" };
const _hoisted_21 = { class: "text-h6 q-mb-md" };
const _hoisted_22 = { class: "row q-col-gutter-md" };
const _hoisted_23 = { class: "col-12 col-md-6" };
const _hoisted_24 = { class: "text-caption text-grey-6 q-mb-xs" };
const _hoisted_25 = { class: "text-body1 text-weight-medium" };
const _hoisted_26 = { class: "col-12 col-md-6" };
const _hoisted_27 = { class: "text-caption text-grey-6 q-mb-xs" };
const _hoisted_28 = { class: "text-body1" };
const _hoisted_29 = { class: "col-12 col-md-6" };
const _hoisted_30 = { class: "text-caption text-grey-6 q-mb-xs" };
const _hoisted_31 = { class: "text-body1" };
const _hoisted_32 = { class: "col-12 col-md-6" };
const _hoisted_33 = { class: "text-caption text-grey-6 q-mb-xs" };
const _hoisted_34 = { class: "text-body1" };
const _hoisted_35 = { class: "text-h6 q-mb-md" };
const _hoisted_36 = { class: "row q-col-gutter-md" };
const _hoisted_37 = { class: "row items-center q-mb-sm" };
const _hoisted_38 = { class: "text-subtitle1 text-weight-medium" };
const _hoisted_39 = { class: "text-h6 text-primary" };
const _hoisted_40 = { class: "row q-col-gutter-sm text-caption text-grey-6" };
const _hoisted_41 = { class: "col" };
const _hoisted_42 = { class: "col" };
const _hoisted_43 = {
  key: 0,
  class: "q-mt-sm"
};
const _hoisted_44 = { class: "text-caption text-grey-6" };
const _hoisted_45 = { class: "text-body2" };
const _hoisted_46 = { class: "text-h6 q-mb-md" };
const _hoisted_47 = { class: "row q-col-gutter-md" };
const _hoisted_48 = { class: "row items-center q-mb-sm" };
const _hoisted_49 = { class: "text-subtitle1 text-weight-medium" };
const _hoisted_50 = { class: "text-h6 text-primary" };
const _hoisted_51 = { class: "row q-col-gutter-sm text-caption text-grey-6" };
const _hoisted_52 = { class: "col" };
const _hoisted_53 = { class: "col" };
const _hoisted_54 = { class: "text-h6 q-mb-md" };
const _hoisted_55 = { class: "text-body1" };
const _hoisted_56 = { class: "col-12 col-lg-4" };
const _hoisted_57 = { class: "text-h6 q-mb-md" };
const _hoisted_58 = { class: "q-gutter-sm" };
const _hoisted_59 = { class: "row justify-between" };
const _hoisted_60 = { class: "text-body2" };
const _hoisted_61 = { class: "text-body2 text-weight-medium" };
const _hoisted_62 = { class: "row justify-between" };
const _hoisted_63 = { class: "text-body2" };
const _hoisted_64 = { class: "text-body2 text-weight-medium" };
const _hoisted_65 = {
  key: 0,
  class: "row justify-between"
};
const _hoisted_66 = { class: "text-body2 text-negative" };
const _hoisted_67 = { class: "text-body2 text-negative text-weight-medium" };
const _hoisted_68 = { class: "row justify-between" };
const _hoisted_69 = { class: "text-h6" };
const _hoisted_70 = { class: "text-h6 text-primary text-weight-bold" };
const _hoisted_71 = { class: "text-h6 q-mb-md" };
const _hoisted_72 = { class: "q-gutter-sm" };
const _hoisted_73 = {
  key: 2,
  class: "row justify-center q-py-xl"
};
const _hoisted_74 = { class: "text-h6 q-mt-md text-grey-6" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "q-pa-lg" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(QBtn, {
              flat: "",
              round: "",
              icon: "arrow_back",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$router.go(-1)),
              class: "q-mr-md"
            }),
            createVNode(QIcon, {
              name: "receipt_long",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.$t("forms.orcamento.viewTitle")), 1)
          ]),
          _cache[1] || (_cache[1] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("forms.orcamento.viewSubtitle")), 1)
          ])
        ])
      ]),
      _ctx.loading ? (openBlock(), createElementBlock("div", _hoisted_7, [
        createVNode(QSpinner, {
          color: "primary",
          size: "3em"
        })
      ])) : _ctx.orcamento ? (openBlock(), createElementBlock("div", _hoisted_8, [
        createBaseVNode("div", _hoisted_9, [
          createVNode(QCard, {
            flat: "",
            bordered: "",
            class: "q-mb-lg"
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_10, [
                    createVNode(QIcon, {
                      name: "info",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("forms.orcamento.sections.basicInfo")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_11, [
                    createBaseVNode("div", _hoisted_12, [
                      createBaseVNode("div", _hoisted_13, toDisplayString(_ctx.$t("forms.orcamento.fields.numero")), 1),
                      createVNode(QChip, {
                        color: "primary",
                        "text-color": "white",
                        size: "md"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" #" + toDisplayString(_ctx.orcamento.NumeroOrcamento), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    createBaseVNode("div", _hoisted_14, [
                      createBaseVNode("div", _hoisted_15, toDisplayString(_ctx.$t("forms.orcamento.fields.status")), 1),
                      createVNode(QBadge, {
                        color: _ctx.getStatusColor(_ctx.orcamento.Status),
                        label: _ctx.$t(`enums.statusOrcamento.${_ctx.orcamento.Status}`),
                        class: "text-weight-medium"
                      }, null, 8, ["color", "label"])
                    ]),
                    createBaseVNode("div", _hoisted_16, [
                      createBaseVNode("div", _hoisted_17, toDisplayString(_ctx.$t("forms.orcamento.fields.dataEmissao")), 1),
                      createBaseVNode("div", _hoisted_18, toDisplayString(_ctx.formatarData(_ctx.orcamento.DataEmissao)), 1)
                    ]),
                    createBaseVNode("div", _hoisted_19, [
                      createBaseVNode("div", _hoisted_20, toDisplayString(_ctx.$t("forms.orcamento.fields.validade")), 1),
                      createBaseVNode("div", {
                        class: normalizeClass(_ctx.isExpirado(_ctx.orcamento.Validade) ? "text-negative" : "text-body1")
                      }, [
                        createTextVNode(toDisplayString(_ctx.formatarData(_ctx.orcamento.Validade)) + " ", 1),
                        _ctx.isExpirado(_ctx.orcamento.Validade) ? (openBlock(), createBlock(QIcon, {
                          key: 0,
                          name: "warning",
                          color: "negative",
                          size: "sm",
                          class: "q-ml-xs"
                        })) : createCommentVNode("", true)
                      ], 2)
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
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_21, [
                    createVNode(QIcon, {
                      name: "person",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("forms.orcamento.sections.client")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_22, [
                    createBaseVNode("div", _hoisted_23, [
                      createBaseVNode("div", _hoisted_24, toDisplayString(_ctx.$t("forms.orcamento.fields.nome")), 1),
                      createBaseVNode("div", _hoisted_25, toDisplayString(_ctx.orcamento.Cliente.Nome) + " " + toDisplayString(_ctx.orcamento.Cliente.Sobrenome), 1)
                    ]),
                    createBaseVNode("div", _hoisted_26, [
                      createBaseVNode("div", _hoisted_27, toDisplayString(_ctx.$t("forms.orcamento.fields.email")), 1),
                      createBaseVNode("div", _hoisted_28, toDisplayString(_ctx.orcamento.Cliente.Email), 1)
                    ]),
                    createBaseVNode("div", _hoisted_29, [
                      createBaseVNode("div", _hoisted_30, toDisplayString(_ctx.$t("forms.orcamento.fields.telefone")), 1),
                      createBaseVNode("div", _hoisted_31, toDisplayString(_ctx.orcamento.Cliente.Telefone || _ctx.$t("forms.orcamento.fields.naoInformado")), 1)
                    ]),
                    createBaseVNode("div", _hoisted_32, [
                      createBaseVNode("div", _hoisted_33, toDisplayString(_ctx.$t("forms.orcamento.fields.documento")), 1),
                      createBaseVNode("div", _hoisted_34, toDisplayString(_ctx.orcamento.Cliente.Documento || _ctx.$t("forms.orcamento.fields.naoInformado")), 1)
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          _ctx.orcamento.ItensServico.length > 0 ? (openBlock(), createBlock(QCard, {
            key: 0,
            flat: "",
            bordered: "",
            class: "q-mb-lg"
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_35, [
                    createVNode(QIcon, {
                      name: "build",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("forms.orcamento.sections.services")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_36, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.orcamento.ItensServico, (item, index) => {
                      return openBlock(), createElementBlock("div", {
                        class: "col-12",
                        key: index
                      }, [
                        createVNode(QCard, {
                          flat: "",
                          bordered: "",
                          class: "bg-grey-1"
                        }, {
                          default: withCtx(() => [
                            createVNode(QCardSection, null, {
                              default: withCtx(() => [
                                createBaseVNode("div", _hoisted_37, [
                                  createBaseVNode("div", _hoisted_38, toDisplayString(item.Servico?.Nome || `Serviço ${index + 1}`), 1),
                                  createVNode(QSpace),
                                  createBaseVNode("div", _hoisted_39, toDisplayString(_ctx.formatarMoeda(item.Subtotal)), 1)
                                ]),
                                createBaseVNode("div", _hoisted_40, [
                                  createBaseVNode("div", _hoisted_41, [
                                    createBaseVNode("strong", null, toDisplayString(_ctx.$t("forms.orcamento.fields.quantidade")) + ":", 1),
                                    createTextVNode(" " + toDisplayString(item.Quantidade), 1)
                                  ]),
                                  createBaseVNode("div", _hoisted_42, [
                                    createBaseVNode("strong", null, toDisplayString(_ctx.$t("forms.orcamento.fields.valorUnitario")) + ":", 1),
                                    createTextVNode(" " + toDisplayString(_ctx.formatarMoeda(item.ValorUnitario)), 1)
                                  ])
                                ]),
                                item.Observacoes ? (openBlock(), createElementBlock("div", _hoisted_43, [
                                  createBaseVNode("div", _hoisted_44, toDisplayString(_ctx.$t("forms.orcamento.fields.observacoes")) + ":", 1),
                                  createBaseVNode("div", _hoisted_45, toDisplayString(item.Observacoes), 1)
                                ])) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)
                      ]);
                    }), 128))
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : createCommentVNode("", true),
          _ctx.orcamento.ItensMaterial.length > 0 ? (openBlock(), createBlock(QCard, {
            key: 1,
            flat: "",
            bordered: "",
            class: "q-mb-lg"
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_46, [
                    createVNode(QIcon, {
                      name: "inventory",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("forms.orcamento.sections.materials")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_47, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.orcamento.ItensMaterial, (item, index) => {
                      return openBlock(), createElementBlock("div", {
                        class: "col-12",
                        key: index
                      }, [
                        createVNode(QCard, {
                          flat: "",
                          bordered: "",
                          class: "bg-grey-1"
                        }, {
                          default: withCtx(() => [
                            createVNode(QCardSection, null, {
                              default: withCtx(() => [
                                createBaseVNode("div", _hoisted_48, [
                                  createBaseVNode("div", _hoisted_49, toDisplayString(item.Material?.Nome || `Material ${index + 1}`), 1),
                                  createVNode(QSpace),
                                  createBaseVNode("div", _hoisted_50, toDisplayString(_ctx.formatarMoeda(item.Subtotal)), 1)
                                ]),
                                createBaseVNode("div", _hoisted_51, [
                                  createBaseVNode("div", _hoisted_52, [
                                    createBaseVNode("strong", null, toDisplayString(_ctx.$t("forms.orcamento.fields.quantidade")) + ":", 1),
                                    createTextVNode(" " + toDisplayString(item.Quantidade), 1)
                                  ]),
                                  createBaseVNode("div", _hoisted_53, [
                                    createBaseVNode("strong", null, toDisplayString(_ctx.$t("forms.orcamento.fields.valorUnitario")) + ":", 1),
                                    createTextVNode(" " + toDisplayString(_ctx.formatarMoeda(item.ValorUnitario)), 1)
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)
                      ]);
                    }), 128))
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : createCommentVNode("", true),
          _ctx.orcamento.Observacoes ? (openBlock(), createBlock(QCard, {
            key: 2,
            flat: "",
            bordered: "",
            class: "q-mb-lg"
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_54, [
                    createVNode(QIcon, {
                      name: "notes",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("forms.orcamento.fields.observacoesGerais")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_55, toDisplayString(_ctx.orcamento.Observacoes), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_56, [
          createVNode(QCard, {
            flat: "",
            bordered: "",
            class: "q-mb-lg"
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_57, [
                    createVNode(QIcon, {
                      name: "calculate",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("forms.orcamento.sections.financialSummary")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_58, [
                    createBaseVNode("div", _hoisted_59, [
                      createBaseVNode("div", _hoisted_60, toDisplayString(_ctx.$t("forms.orcamento.subtotalServices")) + ":", 1),
                      createBaseVNode("div", _hoisted_61, toDisplayString(_ctx.formatarMoeda(_ctx.subtotalServicos)), 1)
                    ]),
                    createBaseVNode("div", _hoisted_62, [
                      createBaseVNode("div", _hoisted_63, toDisplayString(_ctx.$t("forms.orcamento.subtotalMaterials")) + ":", 1),
                      createBaseVNode("div", _hoisted_64, toDisplayString(_ctx.formatarMoeda(_ctx.subtotalMateriais)), 1)
                    ]),
                    _ctx.orcamento.Desconto > 0 ? (openBlock(), createElementBlock("div", _hoisted_65, [
                      createBaseVNode("div", _hoisted_66, toDisplayString(_ctx.$t("forms.orcamento.fields.desconto")) + ":", 1),
                      createBaseVNode("div", _hoisted_67, "-" + toDisplayString(_ctx.formatarMoeda(_ctx.orcamento.Desconto)), 1)
                    ])) : createCommentVNode("", true),
                    createVNode(QSeparator),
                    createBaseVNode("div", _hoisted_68, [
                      createBaseVNode("div", _hoisted_69, toDisplayString(_ctx.$t("forms.orcamento.fields.valorTotal")) + ":", 1),
                      createBaseVNode("div", _hoisted_70, toDisplayString(_ctx.formatarMoeda(_ctx.orcamento.ValorTotal)), 1)
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
            bordered: ""
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_71, toDisplayString(_ctx.$t("forms.orcamento.actions")), 1),
                  createBaseVNode("div", _hoisted_72, [
                    createVNode(QBtn, {
                      color: "primary",
                      icon: "edit",
                      label: _ctx.$t("forms.orcamento.editButton"),
                      onClick: _ctx.editarOrcamento,
                      class: "full-width"
                    }, null, 8, ["label", "onClick"]),
                    _ctx.orcamento.Status === "PENDENTE" ? (openBlock(), createBlock(QBtn, {
                      key: 0,
                      color: "positive",
                      icon: "check",
                      label: _ctx.$t("forms.orcamento.buttons.approve"),
                      onClick: _ctx.aprovarOrcamento,
                      class: "full-width"
                    }, null, 8, ["label", "onClick"])) : createCommentVNode("", true),
                    _ctx.orcamento.Status === "PENDENTE" ? (openBlock(), createBlock(QBtn, {
                      key: 1,
                      color: "negative",
                      icon: "close",
                      label: _ctx.$t("forms.orcamento.buttons.reject"),
                      onClick: _ctx.rejeitarOrcamento,
                      class: "full-width"
                    }, null, 8, ["label", "onClick"])) : createCommentVNode("", true),
                    createVNode(QBtn, {
                      flat: "",
                      color: "primary",
                      icon: "print",
                      label: _ctx.$t("forms.orcamento.buttons.print"),
                      onClick: _ctx.imprimirOrcamento,
                      class: "full-width"
                    }, null, 8, ["label", "onClick"]),
                    createVNode(QBtn, {
                      flat: "",
                      color: "primary",
                      icon: "share",
                      label: _ctx.$t("forms.orcamento.buttons.share"),
                      onClick: _ctx.compartilharOrcamento,
                      class: "full-width"
                    }, null, 8, ["label", "onClick"])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ])
      ])) : (openBlock(), createElementBlock("div", _hoisted_73, [
        createVNode(QCard, {
          flat: "",
          bordered: "",
          class: "text-center q-pa-xl"
        }, {
          default: withCtx(() => [
            createVNode(QIcon, {
              name: "error",
              size: "4rem",
              color: "grey-5"
            }),
            createBaseVNode("div", _hoisted_74, toDisplayString(_ctx.$t("forms.orcamento.notFound")), 1)
          ]),
          _: 1
        })
      ]))
    ]),
    _: 1
  });
}
const OrcamentoVisualizacaoPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  OrcamentoVisualizacaoPage as default
};
//# sourceMappingURL=OrcamentoVisualizacaoPage-aHx0YKP3.js.map
