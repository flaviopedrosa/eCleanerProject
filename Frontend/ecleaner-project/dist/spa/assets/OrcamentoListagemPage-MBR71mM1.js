import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, p as computed, $ as onMounted, b as useRouter, f as createBaseVNode, e as createVNode, k as QIcon, t as toDisplayString, Q as QCard, g as QCardSection, j as QInput, l as QBtn, i as createCommentVNode, aR as normalizeClass, m as createTextVNode, h as createElementBlock, aj as Fragment, ak as renderList } from "./index-C_9ZqZx5.js";
import { Q as QSpace } from "./QSpace-CN10jCLy.js";
import { Q as QChip } from "./QChip-CQHm52sc.js";
import { Q as QTable, a as QTd } from "./QTable-BAAlFMYu.js";
import { Q as QBadge } from "./QBadge-COwJSeCD.js";
import { Q as QPage } from "./QPage-BjohE0wt.js";
import { u as useQuasar } from "./use-quasar-RhPDzzvJ.js";
import { u as useOrcamentoStore, S as StatusOrcamento } from "./orcamento-store-B7Z4GIjq.js";
import { u as useI18n } from "./vue-i18n.runtime-BcAS3Jju.js";
import "./QList-DrRTzTWV.js";
import "./QSelect-B7UkQpY4.js";
import "./format-X8mfcfls.js";
import "./QMenu-0ExrfRXY.js";
import "./position-engine-D6xtJVbJ.js";
import "./selection-q6_tzKdx.js";
import "./QLinearProgress-BwVRjKCw.js";
import "./use-fullscreen-BFuhyU9x.js";
import "./guid-BHuXRmln.js";
import "./imovel-DC67hqHE.js";
import "./pessoa-C98XhDqr.js";
import "./pacoteServico-CHT6QKBY.js";
import "./material-D-n2u651.js";
import "./servico-Bx3u9W9d.js";
import "./equipamento-DInCJpxH.js";
const _sfc_main = defineComponent({
  name: "OrcamentoListagemPage",
  setup() {
    const router = useRouter();
    const { t } = useI18n();
    const $q = useQuasar();
    const store = useOrcamentoStore();
    const filtro = ref("");
    const columns = computed(() => [
      {
        name: "NumeroOrcamento",
        label: t("forms.orcamento.fields.numero"),
        field: "NumeroOrcamento",
        align: "center",
        sortable: true
      },
      {
        name: "Cliente",
        label: t("forms.orcamento.fields.cliente"),
        field: "Cliente",
        align: "left",
        sortable: true,
        sort: (a, b) => `${a.Nome} ${a.Sobrenome}`.localeCompare(`${b.Nome} ${b.Sobrenome}`)
      },
      {
        name: "DataEmissao",
        label: t("forms.orcamento.fields.dataEmissao"),
        field: "DataEmissao",
        align: "center",
        sortable: true,
        format: (val) => formatarData(val)
      },
      {
        name: "Status",
        label: t("forms.orcamento.fields.status"),
        field: "Status",
        align: "center",
        sortable: true
      },
      {
        name: "ValorTotal",
        label: t("forms.orcamento.fields.valorTotal"),
        field: "ValorTotal",
        align: "right",
        sortable: true
      },
      {
        name: "Validade",
        label: t("forms.orcamento.fields.validade"),
        field: "Validade",
        align: "center",
        sortable: true
      },
      {
        name: "actions",
        label: "",
        field: "actions",
        align: "right"
      }
    ]);
    const orcamentosSorted = computed(() => store.orcamentosSorted);
    const loading = computed(() => store.loading);
    const totalOrcamentos = computed(() => store.totalOrcamentos);
    const estatisticasPorStatus = computed(() => store.estatisticasPorStatus);
    const valorTotalOrcamentos = computed(() => store.valorTotalOrcamentos);
    const orcamentosFiltrados = computed(() => {
      if (!filtro.value) {
        return orcamentosSorted.value;
      }
      const filtroLowerCase = filtro.value.toLowerCase();
      return orcamentosSorted.value.filter(
        (orcamento) => orcamento.NumeroOrcamento.toString().includes(filtroLowerCase) || `${orcamento.Cliente.Nome} ${orcamento.Cliente.Sobrenome}`.toLowerCase().includes(filtroLowerCase) || orcamento.Cliente.Email.toLowerCase().includes(filtroLowerCase)
      );
    });
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
    function visualizarOrcamento(orcamento) {
      router.push(`/orcamentos/${orcamento.Id}/visualizar`);
    }
    function editarOrcamento(orcamento) {
      router.push(`/orcamentos/${orcamento.Id}`);
    }
    async function excluirOrcamento(id) {
      try {
        $q.dialog({
          title: t("forms.orcamento.confirmDelete.title"),
          message: t("forms.orcamento.confirmDelete.message"),
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await store.deleteOrcamento(id);
          $q.notify({
            type: "positive",
            message: t("forms.orcamento.messages.deleteSuccess")
          });
        });
      } catch (error) {
        console.error("Erro ao excluir orçamento:", error);
        $q.notify({
          type: "negative",
          message: t("forms.orcamento.messages.deleteError")
        });
      }
    }
    onMounted(() => {
      store.loadOrcamentos();
    });
    return {
      // Estado
      filtro,
      // Computed
      columns,
      orcamentosFiltrados,
      loading,
      totalOrcamentos,
      estatisticasPorStatus,
      valorTotalOrcamentos,
      // Métodos
      formatarMoeda,
      formatarData,
      isExpirado,
      getStatusColor,
      visualizarOrcamento,
      editarOrcamento,
      excluirOrcamento
    };
  }
});
const _hoisted_1 = { class: "row items-center q-mb-xl" };
const _hoisted_2 = { class: "col" };
const _hoisted_3 = { class: "row items-center q-mb-sm" };
const _hoisted_4 = { class: "text-h5 q-ma-none text-secondary" };
const _hoisted_5 = { class: "row justify-end" };
const _hoisted_6 = { class: "text-subtitle1 text-grey-7 q-ma-none" };
const _hoisted_7 = { class: "row q-col-gutter-md q-mb-lg" };
const _hoisted_8 = { class: "col-12 col-md-3" };
const _hoisted_9 = { class: "text-h6 q-mt-sm" };
const _hoisted_10 = { class: "text-caption text-grey-6" };
const _hoisted_11 = { class: "col-12 col-md-3" };
const _hoisted_12 = { class: "text-h6 q-mt-sm" };
const _hoisted_13 = { class: "text-caption text-grey-6" };
const _hoisted_14 = { class: "col-12 col-md-3" };
const _hoisted_15 = { class: "text-h6 q-mt-sm" };
const _hoisted_16 = { class: "text-caption text-grey-6" };
const _hoisted_17 = { class: "col-12 col-md-3" };
const _hoisted_18 = { class: "text-h6 q-mt-sm" };
const _hoisted_19 = { class: "text-caption text-grey-6" };
const _hoisted_20 = { class: "row q-mb-lg items-center q-gutter-md" };
const _hoisted_21 = { class: "col-12 col-md-6" };
const _hoisted_22 = { class: "gt-sm" };
const _hoisted_23 = { class: "text-weight-medium" };
const _hoisted_24 = { class: "text-caption text-grey-6" };
const _hoisted_25 = { class: "text-weight-bold" };
const _hoisted_26 = { class: "lt-md" };
const _hoisted_27 = { class: "row q-col-gutter-md" };
const _hoisted_28 = { class: "row items-center q-mb-sm" };
const _hoisted_29 = { class: "text-h6 q-mb-sm" };
const _hoisted_30 = { class: "text-caption text-grey-6 q-mb-sm" };
const _hoisted_31 = { class: "row items-center q-mb-sm" };
const _hoisted_32 = { class: "col" };
const _hoisted_33 = { class: "text-weight-bold" };
const _hoisted_34 = { class: "col-auto" };
const _hoisted_35 = { class: "row q-gutter-sm" };
const _hoisted_36 = {
  key: 0,
  class: "col-12"
};
const _hoisted_37 = { class: "text-h6 q-mt-md text-grey-6" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "q-pa-lg" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(QIcon, {
              name: "receipt_long",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.$t("forms.orcamento.title")), 1)
          ]),
          _cache[2] || (_cache[2] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("forms.orcamento.subtitle")), 1)
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_7, [
        createBaseVNode("div", _hoisted_8, [
          createVNode(QCard, {
            flat: "",
            bordered: ""
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, { class: "text-center" }, {
                default: withCtx(() => [
                  createVNode(QIcon, {
                    name: "assignment",
                    size: "2rem",
                    class: "text-primary"
                  }),
                  createBaseVNode("div", _hoisted_9, toDisplayString(_ctx.totalOrcamentos), 1),
                  createBaseVNode("div", _hoisted_10, toDisplayString(_ctx.$t("forms.orcamento.stats.total")), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_11, [
          createVNode(QCard, {
            flat: "",
            bordered: ""
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, { class: "text-center" }, {
                default: withCtx(() => [
                  createVNode(QIcon, {
                    name: "schedule",
                    size: "2rem",
                    class: "text-orange"
                  }),
                  createBaseVNode("div", _hoisted_12, toDisplayString(_ctx.estatisticasPorStatus.PENDENTE || 0), 1),
                  createBaseVNode("div", _hoisted_13, toDisplayString(_ctx.$t("forms.orcamento.stats.pending")), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_14, [
          createVNode(QCard, {
            flat: "",
            bordered: ""
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, { class: "text-center" }, {
                default: withCtx(() => [
                  createVNode(QIcon, {
                    name: "check_circle",
                    size: "2rem",
                    class: "text-green"
                  }),
                  createBaseVNode("div", _hoisted_15, toDisplayString(_ctx.estatisticasPorStatus.APROVADO || 0), 1),
                  createBaseVNode("div", _hoisted_16, toDisplayString(_ctx.$t("forms.orcamento.stats.approved")), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_17, [
          createVNode(QCard, {
            flat: "",
            bordered: ""
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, { class: "text-center" }, {
                default: withCtx(() => [
                  createVNode(QIcon, {
                    name: "attach_money",
                    size: "2rem",
                    class: "text-positive"
                  }),
                  createBaseVNode("div", _hoisted_18, toDisplayString(_ctx.formatarMoeda(_ctx.valorTotalOrcamentos)), 1),
                  createBaseVNode("div", _hoisted_19, toDisplayString(_ctx.$t("forms.orcamento.stats.totalValue")), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ])
      ]),
      createBaseVNode("div", _hoisted_20, [
        createBaseVNode("div", _hoisted_21, [
          createVNode(QInput, {
            modelValue: _ctx.filtro,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.filtro = $event),
            placeholder: _ctx.$t("forms.orcamento.searchPlaceholder"),
            filled: "",
            clearable: "",
            dense: ""
          }, {
            prepend: withCtx(() => [
              createVNode(QIcon, { name: "search" })
            ]),
            _: 1
          }, 8, ["modelValue", "placeholder"])
        ]),
        createVNode(QSpace),
        createVNode(QBtn, {
          color: "primary",
          icon: "add",
          label: _ctx.$t("forms.orcamento.newButton"),
          onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$router.push("/orcamentos/novo"))
        }, null, 8, ["label"])
      ]),
      createBaseVNode("div", _hoisted_22, [
        createVNode(QTable, {
          rows: _ctx.orcamentosFiltrados,
          columns: _ctx.columns,
          "row-key": "Id",
          flat: "",
          bordered: "",
          loading: _ctx.loading,
          "no-data-label": _ctx.$t("forms.orcamento.noData")
        }, {
          "body-cell-NumeroOrcamento": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createVNode(QChip, {
                  color: "primary",
                  "text-color": "white",
                  size: "sm"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" #" + toDisplayString(props.value), 1)
                  ]),
                  _: 2
                }, 1024)
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          "body-cell-Cliente": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_23, toDisplayString(props.value.Nome) + " " + toDisplayString(props.value.Sobrenome), 1),
                createBaseVNode("div", _hoisted_24, toDisplayString(props.value.Email), 1)
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          "body-cell-Status": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createVNode(QBadge, {
                  color: _ctx.getStatusColor(props.value),
                  label: _ctx.$t(`enums.statusOrcamento.${props.value}`)
                }, null, 8, ["color", "label"])
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          "body-cell-ValorTotal": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_25, toDisplayString(_ctx.formatarMoeda(props.value)), 1)
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          "body-cell-Validade": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createBaseVNode("div", {
                  class: normalizeClass(_ctx.isExpirado(props.value) ? "text-negative" : "")
                }, toDisplayString(_ctx.formatarData(props.value)), 3),
                _ctx.isExpirado(props.value) ? (openBlock(), createBlock(QIcon, {
                  key: 0,
                  name: "warning",
                  color: "negative",
                  size: "sm",
                  class: "q-ml-xs"
                })) : createCommentVNode("", true)
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          "body-cell-actions": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createVNode(QBtn, {
                  flat: "",
                  round: "",
                  icon: "visibility",
                  color: "primary",
                  size: "sm",
                  onClick: ($event) => _ctx.visualizarOrcamento(props.row),
                  title: _ctx.$t("forms.orcamento.viewButton")
                }, null, 8, ["onClick", "title"]),
                createVNode(QBtn, {
                  flat: "",
                  round: "",
                  icon: "edit",
                  color: "primary",
                  size: "sm",
                  onClick: ($event) => _ctx.editarOrcamento(props.row),
                  title: _ctx.$t("forms.orcamento.editButton")
                }, null, 8, ["onClick", "title"]),
                createVNode(QBtn, {
                  flat: "",
                  round: "",
                  icon: "delete",
                  color: "negative",
                  size: "sm",
                  onClick: ($event) => _ctx.excluirOrcamento(props.row.Id),
                  title: _ctx.$t("forms.orcamento.deleteButton")
                }, null, 8, ["onClick", "title"])
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          _: 1
        }, 8, ["rows", "columns", "loading", "no-data-label"])
      ]),
      createBaseVNode("div", _hoisted_26, [
        createBaseVNode("div", _hoisted_27, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.orcamentosFiltrados, (orcamento) => {
            return openBlock(), createElementBlock("div", {
              key: orcamento.Id,
              class: "col-12"
            }, [
              createVNode(QCard, {
                flat: "",
                bordered: ""
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_28, [
                        createVNode(QChip, {
                          color: "primary",
                          "text-color": "white",
                          size: "sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" #" + toDisplayString(orcamento.NumeroOrcamento), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QSpace),
                        createVNode(QBadge, {
                          color: _ctx.getStatusColor(orcamento.Status),
                          label: _ctx.$t(`enums.statusOrcamento.${orcamento.Status}`)
                        }, null, 8, ["color", "label"])
                      ]),
                      createBaseVNode("div", _hoisted_29, toDisplayString(orcamento.Cliente.Nome) + " " + toDisplayString(orcamento.Cliente.Sobrenome), 1),
                      createBaseVNode("div", _hoisted_30, toDisplayString(orcamento.Cliente.Email), 1),
                      createBaseVNode("div", _hoisted_31, [
                        createBaseVNode("div", _hoisted_32, [
                          createBaseVNode("div", _hoisted_33, toDisplayString(_ctx.formatarMoeda(orcamento.ValorTotal)), 1)
                        ]),
                        createBaseVNode("div", _hoisted_34, [
                          createBaseVNode("div", {
                            class: normalizeClass(_ctx.isExpirado(orcamento.Validade) ? "text-negative" : "text-grey-6")
                          }, [
                            createTextVNode(toDisplayString(_ctx.formatarData(orcamento.Validade)) + " ", 1),
                            _ctx.isExpirado(orcamento.Validade) ? (openBlock(), createBlock(QIcon, {
                              key: 0,
                              name: "warning",
                              color: "negative",
                              size: "sm",
                              class: "q-ml-xs"
                            })) : createCommentVNode("", true)
                          ], 2)
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_35, [
                        createVNode(QBtn, {
                          flat: "",
                          dense: "",
                          icon: "visibility",
                          color: "primary",
                          size: "sm",
                          onClick: ($event) => _ctx.visualizarOrcamento(orcamento)
                        }, null, 8, ["onClick"]),
                        createVNode(QBtn, {
                          flat: "",
                          dense: "",
                          icon: "edit",
                          color: "primary",
                          size: "sm",
                          onClick: ($event) => _ctx.editarOrcamento(orcamento)
                        }, null, 8, ["onClick"]),
                        createVNode(QBtn, {
                          flat: "",
                          dense: "",
                          icon: "delete",
                          color: "negative",
                          size: "sm",
                          onClick: ($event) => _ctx.excluirOrcamento(orcamento.Id)
                        }, null, 8, ["onClick"])
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)
            ]);
          }), 128)),
          _ctx.orcamentosFiltrados.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_36, [
            createVNode(QCard, {
              flat: "",
              bordered: "",
              class: "text-center q-pa-xl"
            }, {
              default: withCtx(() => [
                createVNode(QIcon, {
                  name: "receipt_long",
                  size: "4rem",
                  color: "grey-5"
                }),
                createBaseVNode("div", _hoisted_37, toDisplayString(_ctx.$t("forms.orcamento.noData")), 1)
              ]),
              _: 1
            })
          ])) : createCommentVNode("", true)
        ])
      ])
    ]),
    _: 1
  });
}
const OrcamentoListagemPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  OrcamentoListagemPage as default
};
//# sourceMappingURL=OrcamentoListagemPage-MBR71mM1.js.map
