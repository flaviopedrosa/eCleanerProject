import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, p as computed, $ as onMounted, f as createBaseVNode, e as createVNode, k as QIcon, t as toDisplayString, l as QBtn, m as createTextVNode, j as QInput, h as createElementBlock, aj as Fragment, ak as renderList, Q as QCard, g as QCardSection, a6 as QAvatar, am as QDialog, au as QCardActions, a0 as withDirectives } from "./index-C_9ZqZx5.js";
import { Q as QTable, a as QTd } from "./QTable-BAAlFMYu.js";
import { Q as QChip } from "./QChip-CQHm52sc.js";
import { Q as QPage } from "./QPage-BjohE0wt.js";
import { C as ClosePopup } from "./ClosePopup-BrDwQcvw.js";
import { u as useQuasar } from "./use-quasar-RhPDzzvJ.js";
import { s as scheduleRepository } from "./scheduleRepository-9ggOHHcI.js";
import { u as useI18n } from "./vue-i18n.runtime-BcAS3Jju.js";
import "./QList-DrRTzTWV.js";
import "./QSelect-B7UkQpY4.js";
import "./format-X8mfcfls.js";
import "./QMenu-0ExrfRXY.js";
import "./position-engine-D6xtJVbJ.js";
import "./selection-q6_tzKdx.js";
import "./QLinearProgress-BwVRjKCw.js";
import "./use-fullscreen-BFuhyU9x.js";
import "./pessoa-C98XhDqr.js";
import "./guid-BHuXRmln.js";
import "./imovel-DC67hqHE.js";
import "./colaborador-OpPhEqDl.js";
const _sfc_main = defineComponent({
  name: "ScheduleListagemPage",
  setup() {
    const { t } = useI18n();
    const $q = useQuasar();
    const loading = ref(false);
    const filter = ref("");
    const schedules = ref([]);
    const deleteDialog = ref(false);
    const selectedSchedule = ref(null);
    const pagination = ref({
      sortBy: "NomeEmpresa",
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    });
    const loadSchedules = async () => {
      try {
        loading.value = true;
        schedules.value = await scheduleRepository.getAll();
        pagination.value.rowsNumber = schedules.value.length;
      } catch (error) {
        console.error("Erro ao carregar schedules:", error);
        $q.notify({
          type: "negative",
          message: t("pages.scheduleList.messages.loadError")
        });
      } finally {
        loading.value = false;
      }
    };
    const columns = [
      {
        name: "nomeEmpresa",
        label: t("pages.scheduleList.columns.name"),
        field: "NomeEmpresa",
        align: "left",
        sortable: true
      },
      {
        name: "responsavel",
        label: t("pages.scheduleList.columns.responsavel"),
        field: (row) => `${row.Responsavel.Nome} ${row.Responsavel.Sobrenome}`,
        align: "left",
        sortable: true
      },
      {
        name: "telefoneComercial",
        label: t("pages.scheduleList.columns.telefone"),
        field: "TelefoneComercial",
        align: "left"
      },
      {
        name: "emailComercial",
        label: t("pages.scheduleList.columns.email"),
        field: "EmailComercial",
        align: "left"
      },
      {
        name: "tipoEmpresa",
        label: t("pages.scheduleList.columns.tipo"),
        field: "TipoEmpresa",
        align: "center"
      },
      {
        name: "documentoEmpresa",
        label: t("pages.scheduleList.columns.documento"),
        field: "DocumentoEmpresa",
        align: "left"
      },
      {
        name: "actions",
        label: t("pages.scheduleList.columns.actions"),
        field: "actions",
        align: "center"
      }
    ];
    const filteredSchedules = computed(() => {
      if (!filter.value) return schedules.value;
      const searchTerm = filter.value.toLowerCase();
      return schedules.value.filter(
        (schedule) => schedule.NomeEmpresa.toLowerCase().includes(searchTerm) || schedule.Responsavel.Nome.toLowerCase().includes(searchTerm) || schedule.Responsavel.Sobrenome.toLowerCase().includes(searchTerm) || schedule.DocumentoEmpresa.toLowerCase().includes(searchTerm)
      );
    });
    const confirmDelete = (schedule) => {
      selectedSchedule.value = schedule;
      deleteDialog.value = true;
    };
    const deleteSchedule = async () => {
      try {
        await scheduleRepository.delete(selectedSchedule.value.Id);
        $q.notify({
          type: "positive",
          message: t("pages.scheduleList.messages.deleteSuccess")
        });
        await loadSchedules();
      } catch (error) {
        console.error("Erro ao excluir schedule:", error);
        $q.notify({
          type: "negative",
          message: t("pages.scheduleList.messages.deleteError")
        });
      } finally {
        deleteDialog.value = false;
        selectedSchedule.value = null;
      }
    };
    const loadTestData = async () => {
      try {
        loading.value = true;
        await scheduleRepository.loadTestData();
        await loadSchedules();
        $q.notify({
          type: "positive",
          message: t("pages.scheduleList.messages.loadTestDataSuccess")
        });
      } catch (error) {
        console.error("Erro ao carregar dados de teste:", error);
        $q.notify({
          type: "negative",
          message: t("pages.scheduleList.messages.loadTestDataError")
        });
      } finally {
        loading.value = false;
      }
    };
    onMounted(() => {
      loadSchedules();
    });
    return {
      filter,
      columns,
      schedules,
      filteredSchedules,
      deleteDialog,
      selectedSchedule,
      confirmDelete,
      deleteSchedule,
      loadTestData,
      loading,
      pagination
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
const _hoisted_11 = { class: "lt-md" };
const _hoisted_12 = { class: "row q-col-gutter-md" };
const _hoisted_13 = { class: "row items-start" };
const _hoisted_14 = { class: "col-auto" };
const _hoisted_15 = ["src"];
const _hoisted_16 = { class: "col q-ml-md" };
const _hoisted_17 = { class: "text-h6" };
const _hoisted_18 = { class: "text-subtitle2" };
const _hoisted_19 = { class: "q-mt-sm" };
const _hoisted_20 = { class: "row q-gutter-y-sm q-mt-sm" };
const _hoisted_21 = { class: "col-12 row items-center" };
const _hoisted_22 = { class: "col-12 row items-center" };
const _hoisted_23 = { class: "col-12 row items-center" };
const _hoisted_24 = { class: "col-auto" };
const _hoisted_25 = { class: "row q-gutter-sm" };
const _hoisted_26 = { class: "q-ml-sm" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "q-pa-lg" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(QIcon, {
              name: "business",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.$t("pages.scheduleList.title")), 1)
          ]),
          _cache[4] || (_cache[4] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("pages.scheduleList.subtitle")), 1),
            createBaseVNode("div", _hoisted_7, [
              createVNode(QBtn, {
                label: _ctx.$t("pages.scheduleList.buttons.newSchedule"),
                color: "primary",
                icon: "add",
                to: "/schedules/novo"
              }, null, 8, ["label"]),
              createVNode(QBtn, {
                label: _ctx.$t("pages.scheduleList.buttons.loadTestData"),
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
          rows: _ctx.schedules,
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
                  placeholder: _ctx.$t("pages.scheduleList.filters.search"),
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
          "body-cell-responsavel": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(props.row.Responsavel.Nome) + " " + toDisplayString(props.row.Responsavel.Sobrenome), 1)
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          "body-cell-tipoEmpresa": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$t(`enums.tipoEmpresa.${props.value}`)), 1)
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
                  to: "/schedules/" + props.row.Id,
                  title: _ctx.$t("pages.scheduleList.buttons.edit")
                }, null, 8, ["to", "title"]),
                createVNode(QBtn, {
                  flat: "",
                  round: "",
                  dense: "",
                  color: "negative",
                  icon: "delete",
                  onClick: ($event) => _ctx.confirmDelete(props.row),
                  title: _ctx.$t("pages.scheduleList.buttons.delete")
                }, null, 8, ["onClick", "title"])
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          _: 1
        }, 8, ["rows", "columns", "filter", "loading", "pagination"])
      ]),
      createBaseVNode("div", _hoisted_11, [
        createVNode(QInput, {
          modelValue: _ctx.filter,
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.filter = $event),
          placeholder: _ctx.$t("pages.scheduleList.filters.search"),
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
        createBaseVNode("div", _hoisted_12, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.filteredSchedules, (schedule) => {
            return openBlock(), createElementBlock("div", {
              key: schedule.Id,
              class: "col-12"
            }, [
              createVNode(QCard, null, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_13, [
                        createBaseVNode("div", _hoisted_14, [
                          createVNode(QAvatar, { size: "56px" }, {
                            default: withCtx(() => [
                              schedule.Logomarca ? (openBlock(), createElementBlock("img", {
                                key: 0,
                                src: schedule.Logomarca?.url
                              }, null, 8, _hoisted_15)) : (openBlock(), createBlock(QIcon, {
                                key: 1,
                                name: "image",
                                size: "40px"
                              }))
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        createBaseVNode("div", _hoisted_16, [
                          createBaseVNode("div", _hoisted_17, toDisplayString(schedule.NomeEmpresa), 1),
                          createBaseVNode("div", _hoisted_18, toDisplayString(schedule.Responsavel.Nome) + " " + toDisplayString(schedule.Responsavel.Sobrenome), 1),
                          createBaseVNode("div", _hoisted_19, [
                            createVNode(QChip, {
                              size: "sm",
                              color: "primary",
                              "text-color": "white"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t(`enums.tipoEmpresa.${schedule.TipoEmpresa}`)), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          createBaseVNode("div", _hoisted_20, [
                            createBaseVNode("div", _hoisted_21, [
                              createVNode(QIcon, {
                                name: "email",
                                size: "sm",
                                color: "grey-7",
                                class: "q-mr-sm"
                              }),
                              createTextVNode(" " + toDisplayString(schedule.EmailComercial), 1)
                            ]),
                            createBaseVNode("div", _hoisted_22, [
                              createVNode(QIcon, {
                                name: "phone",
                                size: "sm",
                                color: "grey-7",
                                class: "q-mr-sm"
                              }),
                              createTextVNode(" " + toDisplayString(schedule.TelefoneComercial), 1)
                            ]),
                            createBaseVNode("div", _hoisted_23, [
                              createVNode(QIcon, {
                                name: "badge",
                                size: "sm",
                                color: "grey-7",
                                class: "q-mr-sm"
                              }),
                              createTextVNode(" " + toDisplayString(schedule.DocumentoEmpresa), 1)
                            ])
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_24, [
                          createBaseVNode("div", _hoisted_25, [
                            createVNode(QBtn, {
                              flat: "",
                              round: "",
                              color: "primary",
                              icon: "edit",
                              to: "/schedules/" + schedule.Id,
                              title: _ctx.$t("pages.scheduleList.buttons.edit")
                            }, null, 8, ["to", "title"]),
                            createVNode(QBtn, {
                              flat: "",
                              round: "",
                              color: "negative",
                              icon: "delete",
                              onClick: ($event) => _ctx.confirmDelete(schedule),
                              title: _ctx.$t("pages.scheduleList.buttons.delete")
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
                  createBaseVNode("span", _hoisted_26, toDisplayString(_ctx.$t("pages.scheduleList.dialogs.delete.message")), 1)
                ]),
                _: 1
              }),
              createVNode(QCardActions, { align: "right" }, {
                default: withCtx(() => [
                  withDirectives(createVNode(QBtn, {
                    flat: "",
                    label: _ctx.$t("common.cancel"),
                    color: "primary"
                  }, null, 8, ["label"]), [
                    [ClosePopup]
                  ]),
                  withDirectives(createVNode(QBtn, {
                    flat: "",
                    label: _ctx.$t("common.confirm"),
                    color: "negative",
                    onClick: _ctx.deleteSchedule
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
const ScheduleListagemPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ScheduleListagemPage as default
};
//# sourceMappingURL=ScheduleListagemPage-BuEeDKdp.js.map
