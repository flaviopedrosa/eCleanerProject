import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, p as computed, $ as onMounted, f as createBaseVNode, e as createVNode, k as QIcon, t as toDisplayString, l as QBtn, Q as QCard, g as QCardSection, j as QInput, a7 as QSeparator, m as createTextVNode, h as createElementBlock, aj as Fragment, ak as renderList, a6 as QAvatar, au as QCardActions, am as QDialog, a0 as withDirectives } from "./index-C_9ZqZx5.js";
import { Q as QSelect } from "./QSelect-B7UkQpY4.js";
import { Q as QBadge } from "./QBadge-COwJSeCD.js";
import { Q as QTable, a as QTd } from "./QTable-BAAlFMYu.js";
import { Q as QChip } from "./QChip-CQHm52sc.js";
import { Q as QTooltip } from "./QTooltip-BRNgwqDX.js";
import { Q as QPagination } from "./QPagination-BJZX0xK0.js";
import { Q as QPage } from "./QPage-BjohE0wt.js";
import { C as ClosePopup } from "./ClosePopup-BrDwQcvw.js";
import { u as useQuasar } from "./use-quasar-RhPDzzvJ.js";
import { S as StatusColaborador } from "./colaborador-OpPhEqDl.js";
import { c as colaboradorRepository } from "./colaboradorRepository-DatlZTxI.js";
import { u as useI18n } from "./vue-i18n.runtime-BcAS3Jju.js";
import "./format-X8mfcfls.js";
import "./QMenu-0ExrfRXY.js";
import "./position-engine-D6xtJVbJ.js";
import "./selection-q6_tzKdx.js";
import "./QList-DrRTzTWV.js";
import "./QLinearProgress-BwVRjKCw.js";
import "./use-fullscreen-BFuhyU9x.js";
import "./pessoa-C98XhDqr.js";
import "./guid-BHuXRmln.js";
const _sfc_main = defineComponent({
  name: "ColaboradorListagemPage",
  setup() {
    const $q = useQuasar();
    const { t } = useI18n();
    const filter = ref("");
    const statusFilter = ref(null);
    const sortBy = ref("nameAsc");
    const loading = ref(false);
    const deleteDialog = ref(false);
    const selectedColaborador = ref(null);
    const colaboradores = ref([]);
    const loadColaboradores = async () => {
      try {
        loading.value = true;
        colaboradores.value = await colaboradorRepository.getAll();
      } catch (error) {
        console.error("Erro ao carregar colaboradores:", error);
        $q.notify({
          color: "negative",
          message: t("forms.colaborador.list.messages.loadError")
        });
      } finally {
        loading.value = false;
      }
    };
    const columns = computed(() => [
      {
        name: "name",
        label: t("forms.colaborador.list.columns.name"),
        field: (row) => `${row.Nome} ${row.Sobrenome}`,
        sortable: true,
        align: "left"
      },
      {
        name: "email",
        label: t("forms.colaborador.list.columns.email"),
        field: "Email",
        sortable: true
      },
      {
        name: "status",
        label: t("forms.colaborador.list.columns.status"),
        field: "Status",
        sortable: true
      },
      {
        name: "availability",
        label: t("forms.colaborador.list.columns.availability"),
        field: "Disponibilidade"
      },
      {
        name: "regions",
        label: t("forms.colaborador.list.columns.regions"),
        field: "RegioesAtuacao"
      },
      {
        name: "age",
        label: t("forms.colaborador.list.columns.age"),
        field: "Idade",
        sortable: true
      },
      {
        name: "experience",
        label: t("forms.colaborador.list.columns.experience"),
        field: "TempoTotalExperiencia",
        sortable: true
      },
      {
        name: "actions",
        label: t("forms.colaborador.list.columns.actions"),
        field: "actions",
        align: "center"
      }
    ]);
    const pagination = ref({
      sortBy: "nome",
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    });
    const statusOptions = computed(() => Object.keys(StatusColaborador).map((value) => ({
      label: t(`enums.statusColaborador.${value}`),
      value
    })));
    const sortOptions = computed(() => [
      { label: t("forms.colaborador.list.sort.nameAsc"), value: "nameAsc" },
      { label: t("forms.colaborador.list.sort.nameDesc"), value: "nameDesc" },
      { label: t("forms.colaborador.list.sort.newest"), value: "newest" },
      { label: t("forms.colaborador.list.sort.oldest"), value: "oldest" }
    ]);
    const filteredColaboradores = computed(() => {
      let result = [...colaboradores.value];
      if (filter.value) {
        const searchText = filter.value.toLowerCase();
        result = result.filter(
          (col) => `${col.Nome} ${col.Sobrenome}`.toLowerCase().includes(searchText) || col.Email.toLowerCase().includes(searchText)
        );
      }
      if (statusFilter.value) {
        result = result.filter((col) => col.Status === statusFilter.value);
      }
      switch (sortBy.value) {
        case "nameAsc":
          result.sort((a, b) => `${a.Nome} ${a.Sobrenome}`.localeCompare(`${b.Nome} ${b.Sobrenome}`));
          break;
        case "nameDesc":
          result.sort((a, b) => `${b.Nome} ${b.Sobrenome}`.localeCompare(`${a.Nome} ${a.Sobrenome}`));
          break;
        case "newest":
          result.sort((a, b) => new Date(b.DataInicioVinculo) - new Date(a.DataInicioVinculo));
          break;
        case "oldest":
          result.sort((a, b) => new Date(a.DataInicioVinculo) - new Date(b.DataInicioVinculo));
          break;
      }
      return result;
    });
    const getStatusColor = (status) => {
      const colors = {
        [StatusColaborador.EM_ANALISE]: "grey",
        [StatusColaborador.EM_EXPERIENCIA]: "orange",
        [StatusColaborador.EFETIVADO]: "positive",
        [StatusColaborador.SUSPENSO]: "warning",
        [StatusColaborador.DESLIGADO]: "negative",
        [StatusColaborador.BLOQUEADO]: "negative"
      };
      return colors[status] || "grey";
    };
    const formatExperienceTime = (months) => {
      if (months === 0) return "Sem experiência";
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      const parts = [];
      if (years > 0) {
        parts.push(`${years} ${years === 1 ? "ano" : "anos"}`);
      }
      if (remainingMonths > 0) {
        parts.push(`${remainingMonths} ${remainingMonths === 1 ? "mês" : "meses"}`);
      }
      return parts.join(" e ");
    };
    const getInitials = (nome, sobrenome) => {
      return `${nome.charAt(0)}${sobrenome.charAt(0)}`.toUpperCase();
    };
    const confirmDelete = (colaborador) => {
      selectedColaborador.value = colaborador;
      deleteDialog.value = true;
    };
    const deleteColaborador = async () => {
      try {
        loading.value = true;
        $q.notify({
          type: "positive",
          message: "Colaborador excluído com sucesso"
        });
      } catch (error) {
        console.error("Erro ao excluir colaborador:", error);
        $q.notify({
          type: "negative",
          message: `Erro ao excluir colaborador: ${error.message}`
        });
      } finally {
        loading.value = false;
        selectedColaborador.value = null;
        deleteDialog.value = false;
      }
    };
    onMounted(() => {
      loadColaboradores();
    });
    return {
      filter,
      statusFilter,
      sortBy,
      loading,
      deleteDialog,
      selectedColaborador,
      colaboradores,
      statusOptions,
      sortOptions,
      columns,
      filteredColaboradores,
      getStatusColor,
      formatExperienceTime,
      confirmDelete,
      deleteColaborador,
      pagination,
      getInitials
    };
  }
});
const _hoisted_1 = { class: "row items-center q-mb-xl" };
const _hoisted_2 = { class: "col" };
const _hoisted_3 = { class: "row items-center q-mb-sm" };
const _hoisted_4 = { class: "text-h5 q-ma-none text-secondary" };
const _hoisted_5 = { class: "row justify-between items-center" };
const _hoisted_6 = { class: "text-subtitle1 text-grey-7 q-ma-none" };
const _hoisted_7 = { class: "row q-gutter-sm" };
const _hoisted_8 = { class: "row q-col-gutter-md" };
const _hoisted_9 = { class: "col-12 col-md-4" };
const _hoisted_10 = { class: "col-12 col-md-4" };
const _hoisted_11 = { class: "col-12 col-md-4" };
const _hoisted_12 = { class: "gt-sm" };
const _hoisted_13 = { class: "lt-md" };
const _hoisted_14 = { class: "row q-col-gutter-md" };
const _hoisted_15 = { class: "row items-center q-mb-md" };
const _hoisted_16 = { class: "text-weight-medium" };
const _hoisted_17 = { class: "q-gutter-y-sm" };
const _hoisted_18 = { class: "row items-center" };
const _hoisted_19 = { class: "row items-center" };
const _hoisted_20 = { class: "row items-center" };
const _hoisted_21 = { class: "row items-start" };
const _hoisted_22 = { class: "col" };
const _hoisted_23 = { class: "row justify-center q-mt-md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "q-pa-lg" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(QIcon, {
              name: "badge",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.$t("forms.colaborador.list.title")), 1)
          ]),
          _cache[6] || (_cache[6] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("forms.colaborador.list.subtitle")), 1),
            createBaseVNode("div", _hoisted_7, [
              createVNode(QBtn, {
                color: "primary",
                label: _ctx.$t("forms.colaborador.list.buttons.new"),
                icon: "add",
                to: "/colaboradores/novo"
              }, null, 8, ["label"])
            ])
          ])
        ])
      ]),
      createVNode(QCard, null, {
        default: withCtx(() => [
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_8, [
                createBaseVNode("div", _hoisted_9, [
                  createVNode(QInput, {
                    modelValue: _ctx.filter,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.filter = $event),
                    label: _ctx.$t("forms.colaborador.list.filters.search"),
                    dense: "",
                    clearable: "",
                    outlined: ""
                  }, {
                    append: withCtx(() => [
                      createVNode(QIcon, { name: "search" })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "label"])
                ]),
                createBaseVNode("div", _hoisted_10, [
                  createVNode(QSelect, {
                    modelValue: _ctx.statusFilter,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.statusFilter = $event),
                    options: _ctx.statusOptions,
                    label: _ctx.$t("forms.colaborador.list.filters.status"),
                    dense: "",
                    outlined: "",
                    clearable: "",
                    "emit-value": "",
                    "map-options": ""
                  }, null, 8, ["modelValue", "options", "label"])
                ]),
                createBaseVNode("div", _hoisted_11, [
                  createVNode(QSelect, {
                    modelValue: _ctx.sortBy,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.sortBy = $event),
                    options: _ctx.sortOptions,
                    label: _ctx.$t("forms.colaborador.list.filters.sort"),
                    dense: "",
                    outlined: "",
                    "emit-value": "",
                    "map-options": ""
                  }, null, 8, ["modelValue", "options", "label"])
                ])
              ])
            ]),
            _: 1
          }),
          createVNode(QSeparator),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_12, [
                createVNode(QTable, {
                  rows: _ctx.filteredColaboradores,
                  columns: _ctx.columns,
                  loading: _ctx.loading,
                  "row-key": "Id",
                  "binary-state-sort": "",
                  flat: "",
                  bordered: "",
                  pagination: _ctx.pagination,
                  "onUpdate:pagination": _cache[3] || (_cache[3] = ($event) => _ctx.pagination = $event),
                  filter: _ctx.filter
                }, {
                  "body-cell-status": withCtx((props) => [
                    createVNode(QTd, { props }, {
                      default: withCtx(() => [
                        createVNode(QBadge, {
                          color: _ctx.getStatusColor(props.value)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t(`enums.statusColaborador.${props.value}`)), 1)
                          ]),
                          _: 2
                        }, 1032, ["color"])
                      ]),
                      _: 2
                    }, 1032, ["props"])
                  ]),
                  "body-cell-experience": withCtx((props) => [
                    createVNode(QTd, { props }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.formatExperienceTime(props.row.TempoTotalExperiencia)), 1)
                      ]),
                      _: 2
                    }, 1032, ["props"])
                  ]),
                  "body-cell-regions": withCtx((props) => [
                    createVNode(QTd, { props }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(props.row.RegioesAtuacao, (regiao) => {
                          return openBlock(), createBlock(QChip, {
                            key: regiao,
                            size: "sm",
                            class: "q-mr-xs"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(regiao), 1)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 2
                    }, 1032, ["props"])
                  ]),
                  "body-cell-actions": withCtx((props) => [
                    createVNode(QTd, {
                      props,
                      class: "q-gutter-x-sm"
                    }, {
                      default: withCtx(() => [
                        createVNode(QBtn, {
                          flat: "",
                          round: "",
                          color: "primary",
                          icon: "edit",
                          to: `/colaboradores/${props.row.Id}/editar`
                        }, {
                          default: withCtx(() => [
                            createVNode(QTooltip, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("forms.colaborador.list.buttons.edit")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1032, ["to"]),
                        createVNode(QBtn, {
                          flat: "",
                          round: "",
                          color: "negative",
                          icon: "delete",
                          onClick: ($event) => _ctx.confirmDelete(props.row)
                        }, {
                          default: withCtx(() => [
                            createVNode(QTooltip, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("forms.colaborador.list.buttons.delete")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ]),
                      _: 2
                    }, 1032, ["props"])
                  ]),
                  _: 1
                }, 8, ["rows", "columns", "loading", "pagination", "filter"])
              ]),
              createBaseVNode("div", _hoisted_13, [
                createBaseVNode("div", _hoisted_14, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.filteredColaboradores, (colaborador) => {
                    return openBlock(), createElementBlock("div", {
                      key: colaborador.Id,
                      class: "col-12"
                    }, [
                      createVNode(QCard, {
                        flat: "",
                        bordered: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(QCardSection, null, {
                            default: withCtx(() => [
                              createBaseVNode("div", _hoisted_15, [
                                createVNode(QAvatar, {
                                  size: "48px",
                                  color: "primary",
                                  "text-color": "white",
                                  class: "q-mr-md"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.getInitials(colaborador.Nome, colaborador.Sobrenome)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createBaseVNode("div", _hoisted_16, [
                                  createTextVNode(toDisplayString(colaborador.Nome) + " " + toDisplayString(colaborador.Sobrenome) + " ", 1),
                                  createBaseVNode("div", null, [
                                    createVNode(QBadge, {
                                      color: _ctx.getStatusColor(colaborador.Status)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(_ctx.$t(`enums.statusColaborador.${colaborador.Status}`)), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["color"])
                                  ])
                                ])
                              ]),
                              createBaseVNode("div", _hoisted_17, [
                                createBaseVNode("div", _hoisted_18, [
                                  createVNode(QIcon, {
                                    name: "email",
                                    size: "sm",
                                    color: "grey-7",
                                    class: "q-mr-sm"
                                  }),
                                  createTextVNode(" " + toDisplayString(colaborador.Email), 1)
                                ]),
                                createBaseVNode("div", _hoisted_19, [
                                  createVNode(QIcon, {
                                    name: "work_history",
                                    size: "sm",
                                    color: "grey-7",
                                    class: "q-mr-sm"
                                  }),
                                  createTextVNode(" " + toDisplayString(_ctx.formatExperienceTime(colaborador.TempoTotalExperiencia)), 1)
                                ]),
                                createBaseVNode("div", _hoisted_20, [
                                  createVNode(QIcon, {
                                    name: "schedule",
                                    size: "sm",
                                    color: "grey-7",
                                    class: "q-mr-sm"
                                  }),
                                  createTextVNode(" " + toDisplayString(colaborador.Disponibilidade), 1)
                                ]),
                                createBaseVNode("div", _hoisted_21, [
                                  createVNode(QIcon, {
                                    name: "place",
                                    size: "sm",
                                    color: "grey-7",
                                    class: "q-mr-sm q-mt-xs"
                                  }),
                                  createBaseVNode("div", _hoisted_22, [
                                    (openBlock(true), createElementBlock(Fragment, null, renderList(colaborador.RegioesAtuacao, (regiao) => {
                                      return openBlock(), createBlock(QChip, {
                                        key: regiao,
                                        dense: "",
                                        size: "sm",
                                        class: "q-ma-none q-mr-xs q-mb-xs"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(regiao), 1)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ])
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(QSeparator),
                          createVNode(QCardActions, { align: "right" }, {
                            default: withCtx(() => [
                              createVNode(QBtn, {
                                flat: "",
                                color: "primary",
                                icon: "edit",
                                label: _ctx.$t("forms.colaborador.list.buttons.edit"),
                                to: `/colaboradores/${colaborador.Id}/editar`
                              }, null, 8, ["label", "to"]),
                              createVNode(QBtn, {
                                flat: "",
                                color: "negative",
                                icon: "delete",
                                label: _ctx.$t("forms.colaborador.list.buttons.delete"),
                                onClick: ($event) => _ctx.confirmDelete(colaborador)
                              }, null, 8, ["label", "onClick"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ]);
                  }), 128))
                ]),
                createBaseVNode("div", _hoisted_23, [
                  createVNode(QPagination, {
                    modelValue: _ctx.pagination.page,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.pagination.page = $event),
                    max: Math.ceil(_ctx.filteredColaboradores.length / _ctx.pagination.rowsPerPage)
                  }, null, 8, ["modelValue", "max"])
                ])
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QDialog, {
        modelValue: _ctx.deleteDialog,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.deleteDialog = $event),
        persistent: ""
      }, {
        default: withCtx(() => [
          createVNode(QCard, null, {
            default: withCtx(() => [
              createVNode(QCardSection, { class: "row items-center" }, {
                default: withCtx(() => [
                  createVNode(QAvatar, {
                    icon: "warning",
                    color: "negative",
                    "text-color": "white"
                  }),
                  _cache[7] || (_cache[7] = createBaseVNode("span", { class: "q-ml-sm" }, null, -1))
                ]),
                _: 1
              }),
              createVNode(QCardActions, { align: "right" }, {
                default: withCtx(() => [
                  withDirectives(createVNode(QBtn, {
                    flat: "",
                    color: "primary"
                  }, null, 512), [
                    [ClosePopup]
                  ]),
                  withDirectives(createVNode(QBtn, {
                    flat: "",
                    color: "primary"
                  }, null, 512), [
                    [ClosePopup]
                  ]),
                  withDirectives(createVNode(QBtn, {
                    flat: "",
                    color: "negative",
                    onClick: _ctx.deleteColaborador
                  }, null, 8, ["onClick"]), [
                    [ClosePopup]
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]),
    _: 1
  });
}
const ColaboradorListagemPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ColaboradorListagemPage as default
};
//# sourceMappingURL=ColaboradorListagemPage-DIohxrQy.js.map
