import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, p as computed, $ as onMounted, f as createBaseVNode, e as createVNode, k as QIcon, t as toDisplayString, l as QBtn, m as createTextVNode, h as createElementBlock, aj as Fragment, ak as renderList, a6 as QAvatar, j as QInput, Q as QCard, g as QCardSection, am as QDialog, au as QCardActions, a0 as withDirectives } from "./index-C_9ZqZx5.js";
import { Q as QTable, a as QTd } from "./QTable-BAAlFMYu.js";
import { Q as QPage } from "./QPage-BjohE0wt.js";
import { C as ClosePopup } from "./ClosePopup-BrDwQcvw.js";
import { u as useQuasar } from "./use-quasar-RhPDzzvJ.js";
import { E as EquipeRepository, F as FuncaoColaborador } from "./equipeRepository-Cy9UNbRy.js";
import { u as useI18n } from "./vue-i18n.runtime-BcAS3Jju.js";
import "./QList-DrRTzTWV.js";
import "./QSelect-B7UkQpY4.js";
import "./QChip-CQHm52sc.js";
import "./format-X8mfcfls.js";
import "./QMenu-0ExrfRXY.js";
import "./position-engine-D6xtJVbJ.js";
import "./selection-q6_tzKdx.js";
import "./QLinearProgress-BwVRjKCw.js";
import "./use-fullscreen-BFuhyU9x.js";
import "./guid-BHuXRmln.js";
import "./colaborador-OpPhEqDl.js";
import "./pessoa-C98XhDqr.js";
const _sfc_main = defineComponent({
  name: "EquipeListagemPage",
  setup() {
    const { t } = useI18n();
    const $q = useQuasar();
    const equipeRepository = new EquipeRepository();
    const loading = ref(false);
    const filter = ref("");
    const equipes = ref([]);
    const deleteDialog = ref(false);
    const selectedEquipe = ref(null);
    const pagination = ref({
      sortBy: "Descricao",
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    });
    const columns = [
      {
        name: "descricao",
        label: t("pages.equipeList.columns.descricao"),
        field: "Descricao",
        align: "left",
        sortable: true
      },
      {
        name: "membros",
        label: t("pages.equipeList.columns.membros"),
        field: "Colaboradores",
        align: "left"
      },
      {
        name: "lider",
        label: t("pages.equipeList.columns.lider"),
        field: (row) => getLider(row)?.Colaborador.Nome,
        align: "left",
        sortable: true
      },
      {
        name: "actions",
        label: t("pages.equipeList.columns.actions"),
        field: "actions",
        align: "center"
      }
    ];
    const loadEquipes = async () => {
      try {
        loading.value = true;
        equipes.value = await equipeRepository.getAll();
        pagination.value.rowsNumber = equipes.value.length;
      } catch (error) {
        console.error("Erro ao carregar equipes:", error);
        $q.notify({
          type: "negative",
          message: t("pages.equipeList.messages.loadError")
        });
      } finally {
        loading.value = false;
      }
    };
    const loadTestData = async () => {
      try {
        loading.value = true;
        await equipeRepository.loadTestData();
        await loadEquipes();
        $q.notify({
          type: "positive",
          message: t("pages.equipeList.messages.loadTestDataSuccess")
        });
      } catch (error) {
        console.error("Erro ao carregar dados de teste:", error);
        $q.notify({
          type: "negative",
          message: t("pages.equipeList.messages.loadTestDataError")
        });
      } finally {
        loading.value = false;
      }
    };
    const getLider = (equipe) => {
      return equipe.Colaboradores.find((c) => c.Funcao === FuncaoColaborador.LIDER);
    };
    const filteredEquipes = computed(() => {
      if (!filter.value) return equipes.value;
      const searchTerm = filter.value.toLowerCase();
      return equipes.value.filter(
        (equipe) => equipe.Descricao.toLowerCase().includes(searchTerm) || equipe.Colaboradores.some(
          (c) => c.Colaborador.Nome.toLowerCase().includes(searchTerm) || c.Colaborador.Sobrenome.toLowerCase().includes(searchTerm)
        )
      );
    });
    const confirmDelete = (equipe) => {
      selectedEquipe.value = equipe;
      deleteDialog.value = true;
    };
    const deleteEquipe = async () => {
      try {
        await equipeRepository.delete(selectedEquipe.value.Id);
        $q.notify({
          type: "positive",
          message: t("pages.equipeList.messages.deleteSuccess")
        });
        await loadEquipes();
      } catch (error) {
        console.error("Erro ao excluir equipe:", error);
        $q.notify({
          type: "negative",
          message: t("pages.equipeList.messages.deleteError")
        });
      } finally {
        deleteDialog.value = false;
        selectedEquipe.value = null;
      }
    };
    onMounted(() => {
      loadEquipes();
    });
    return {
      filter,
      columns,
      equipes,
      filteredEquipes,
      deleteDialog,
      selectedEquipe,
      confirmDelete,
      deleteEquipe,
      loadTestData,
      loading,
      pagination,
      getLider
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
const _hoisted_8 = { class: "gt-sm" };
const _hoisted_9 = { class: "row full-width" };
const _hoisted_10 = { class: "col-12 col-md-4" };
const _hoisted_11 = { class: "row items-center" };
const _hoisted_12 = { class: "lt-md" };
const _hoisted_13 = { class: "row q-col-gutter-md" };
const _hoisted_14 = { class: "row items-center" };
const _hoisted_15 = { class: "col" };
const _hoisted_16 = { class: "text-h6" };
const _hoisted_17 = { class: "text-subtitle2" };
const _hoisted_18 = { class: "q-mt-sm" };
const _hoisted_19 = { class: "col-auto" };
const _hoisted_20 = { class: "row q-gutter-sm" };
const _hoisted_21 = { class: "q-ml-sm" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "q-pa-lg" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(QIcon, {
              name: "groups",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.$t("pages.equipeList.title")), 1)
          ]),
          _cache[4] || (_cache[4] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("pages.equipeList.subtitle")), 1),
            createBaseVNode("div", _hoisted_7, [
              createVNode(QBtn, {
                label: _ctx.$t("pages.equipeList.buttons.newEquipe"),
                color: "primary",
                icon: "add",
                to: "/equipes/novo"
              }, null, 8, ["label"]),
              createVNode(QBtn, {
                label: _ctx.$t("pages.equipeList.buttons.newColaborador"),
                color: "accent",
                icon: "person_add",
                to: "/colaboradores/novo"
              }, null, 8, ["label"]),
              createVNode(QBtn, {
                label: _ctx.$t("pages.equipeList.buttons.loadTestData"),
                color: "secondary",
                icon: "storage",
                onClick: _ctx.loadTestData
              }, null, 8, ["label", "onClick"])
            ])
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_8, [
        createVNode(QTable, {
          rows: _ctx.equipes,
          columns: _ctx.columns,
          "rows-per-page-options": [10, 20, 50],
          filter: _ctx.filter,
          "row-key": "Id",
          loading: _ctx.loading,
          flat: "",
          bordered: "",
          pagination: _ctx.pagination,
          "onUpdate:pagination": _cache[1] || (_cache[1] = ($event) => _ctx.pagination = $event)
        }, {
          top: withCtx(() => [
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, [
                createVNode(QInput, {
                  modelValue: _ctx.filter,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.filter = $event),
                  placeholder: _ctx.$t("pages.equipeList.filters.search"),
                  dense: "",
                  outlined: "",
                  clearable: ""
                }, {
                  prepend: withCtx(() => [
                    createVNode(QIcon, { name: "search" })
                  ]),
                  _: 1
                }, 8, ["modelValue", "placeholder"])
              ])
            ])
          ]),
          "body-cell-membros": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_11, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(props.row.Colaboradores, (membro) => {
                    return openBlock(), createBlock(QAvatar, {
                      key: membro.Colaborador.Id,
                      size: "28px",
                      color: "primary",
                      "text-color": "white",
                      class: "q-mr-xs"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(membro.Colaborador.Nome[0]) + toDisplayString(membro.Colaborador.Sobrenome[0]), 1)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ])
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          "body-cell-lider": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.getLider(props.row)?.Colaborador.Nome) + " " + toDisplayString(_ctx.getLider(props.row)?.Colaborador.Sobrenome), 1)
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
                  dense: "",
                  color: "primary",
                  icon: "edit",
                  to: "/equipes/" + props.row.Id,
                  title: _ctx.$t("pages.equipeList.buttons.edit")
                }, null, 8, ["to", "title"]),
                createVNode(QBtn, {
                  flat: "",
                  round: "",
                  dense: "",
                  color: "negative",
                  icon: "delete",
                  onClick: ($event) => _ctx.confirmDelete(props.row),
                  title: _ctx.$t("pages.equipeList.buttons.delete")
                }, null, 8, ["onClick", "title"])
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          _: 1
        }, 8, ["rows", "columns", "filter", "loading", "pagination"])
      ]),
      createBaseVNode("div", _hoisted_12, [
        createVNode(QInput, {
          modelValue: _ctx.filter,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.filter = $event),
          placeholder: _ctx.$t("pages.equipeList.filters.search"),
          dense: "",
          outlined: "",
          clearable: "",
          loading: _ctx.loading,
          class: "q-mb-md"
        }, {
          prepend: withCtx(() => [
            createVNode(QIcon, { name: "search" })
          ]),
          _: 1
        }, 8, ["modelValue", "placeholder", "loading"]),
        createBaseVNode("div", _hoisted_13, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.filteredEquipes, (equipe) => {
            return openBlock(), createElementBlock("div", {
              key: equipe.Id,
              class: "col-12"
            }, [
              createVNode(QCard, null, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_14, [
                        createBaseVNode("div", _hoisted_15, [
                          createBaseVNode("div", _hoisted_16, toDisplayString(equipe.Descricao), 1),
                          createBaseVNode("div", _hoisted_17, "Líder: " + toDisplayString(_ctx.getLider(equipe)?.Colaborador.Nome) + " " + toDisplayString(_ctx.getLider(equipe)?.Colaborador.Sobrenome), 1),
                          createBaseVNode("div", _hoisted_18, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(equipe.Colaboradores, (membro) => {
                              return openBlock(), createBlock(QAvatar, {
                                key: membro.Colaborador.Id,
                                size: "32px",
                                color: "primary",
                                "text-color": "white",
                                class: "q-mr-sm"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(membro.Colaborador.Nome[0]) + toDisplayString(membro.Colaborador.Sobrenome[0]), 1)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_19, [
                          createBaseVNode("div", _hoisted_20, [
                            createVNode(QBtn, {
                              flat: "",
                              round: "",
                              color: "primary",
                              icon: "edit",
                              to: "/equipes/" + equipe.Id,
                              title: _ctx.$t("pages.equipeList.buttons.edit")
                            }, null, 8, ["to", "title"]),
                            createVNode(QBtn, {
                              flat: "",
                              round: "",
                              color: "negative",
                              icon: "delete",
                              onClick: ($event) => _ctx.confirmDelete(equipe),
                              title: _ctx.$t("pages.equipeList.buttons.delete")
                            }, null, 8, ["onClick", "title"])
                          ])
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
      createVNode(QDialog, {
        modelValue: _ctx.deleteDialog,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.deleteDialog = $event),
        persistent: ""
      }, {
        default: withCtx(() => [
          createVNode(QCard, null, {
            default: withCtx(() => [
              createVNode(QCardSection, { class: "row items-center" }, {
                default: withCtx(() => [
                  createVNode(QAvatar, {
                    icon: "warning",
                    color: "warning",
                    "text-color": "white"
                  }),
                  createBaseVNode("span", _hoisted_21, toDisplayString(_ctx.$t("pages.equipeList.dialogs.delete.message", {
                    descricao: _ctx.selectedEquipe?.Descricao
                  })), 1)
                ]),
                _: 1
              }),
              createVNode(QCardActions, { align: "right" }, {
                default: withCtx(() => [
                  withDirectives(createVNode(QBtn, {
                    flat: "",
                    label: _ctx.$t("pages.equipeList.buttons.cancel"),
                    color: "primary"
                  }, null, 8, ["label"]), [
                    [ClosePopup]
                  ]),
                  withDirectives(createVNode(QBtn, {
                    flat: "",
                    label: _ctx.$t("pages.equipeList.buttons.confirm"),
                    color: "negative",
                    onClick: _ctx.deleteEquipe
                  }, null, 8, ["label", "onClick"]), [
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
const EquipeListagemPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  EquipeListagemPage as default
};
//# sourceMappingURL=EquipeListagemPage-DwBmTOEB.js.map
