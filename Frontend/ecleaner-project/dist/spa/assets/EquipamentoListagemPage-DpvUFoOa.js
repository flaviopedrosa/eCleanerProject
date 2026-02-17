import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, p as computed, $ as onMounted, b as useRouter, f as createBaseVNode, e as createVNode, k as QIcon, t as toDisplayString, j as QInput, l as QBtn, m as createTextVNode, h as createElementBlock, i as createCommentVNode, aj as Fragment, ak as renderList, Q as QCard, g as QCardSection } from "./index-C_9ZqZx5.js";
import { Q as QSpace } from "./QSpace-CN10jCLy.js";
import { Q as QTable, a as QTd } from "./QTable-BAAlFMYu.js";
import { Q as QPage } from "./QPage-BjohE0wt.js";
import { u as useEquipamentoStore } from "./equipamento-store-CDIdSsiM.js";
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
import "./equipamento-DInCJpxH.js";
import "./guid-BHuXRmln.js";
import "./equipamentoRepository-C36gseZz.js";
const _sfc_main = defineComponent({
  name: "EquipamentoListagemPage",
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const store = useEquipamentoStore();
    const filtro = ref("");
    const columns = computed(() => [
      {
        name: "Descricao",
        label: t("pages.equipamento.fields.descricao"),
        field: "Descricao",
        align: "left",
        sortable: true
      },
      {
        name: "Unidade",
        label: t("pages.equipamento.fields.unidade"),
        field: "Unidade",
        align: "center",
        sortable: true
      },
      {
        name: "PrecoUnitario",
        label: t("pages.equipamento.fields.precoUnitario"),
        field: "PrecoUnitario",
        align: "right",
        sortable: true,
        format: (val) => formatarMoeda(val)
      },
      {
        name: "actions",
        label: "",
        field: "actions",
        align: "right"
      }
    ]);
    const equipamentosSorted = computed(() => store.EquipamentosOrdenados);
    const loading = computed(() => store.IsLoading);
    const equipamentosFiltrados = computed(() => {
      if (!filtro.value) {
        return equipamentosSorted.value;
      }
      const filtroLowerCase = filtro.value.toLowerCase();
      return equipamentosSorted.value.filter(
        (equipamento) => equipamento.Descricao.toLowerCase().includes(filtroLowerCase) || equipamento.Unidade.toLowerCase().includes(filtroLowerCase)
      );
    });
    function formatarMoeda(valor) {
      let numeroValido = 0;
      if (typeof valor === "number" && !isNaN(valor)) {
        numeroValido = valor;
      } else if (typeof valor === "string") {
        const parsed = parseFloat(valor);
        numeroValido = isNaN(parsed) ? 0 : parsed;
      }
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(numeroValido);
    }
    function irParaNovoEquipamento() {
      router.push("/equipamentos/novo");
    }
    function editarEquipamento(equipamento) {
      router.push(`/equipamentos/${equipamento.Id}/editar`);
    }
    async function excluirEquipamento(id) {
      try {
        await store.deleteEquipamento(id);
      } catch (error) {
        console.error("Erro ao excluir equipamento:", error);
      }
    }
    onMounted(async () => {
      await store.loadEquipamentos();
    });
    return {
      // Estado
      filtro,
      // Computed
      columns,
      equipamentosFiltrados,
      loading,
      // Métodos
      formatarMoeda,
      irParaNovoEquipamento,
      editarEquipamento,
      excluirEquipamento
    };
  }
});
const _hoisted_1 = { class: "row items-center q-mb-xl" };
const _hoisted_2 = { class: "col" };
const _hoisted_3 = { class: "row items-center q-mb-sm" };
const _hoisted_4 = { class: "text-h5 q-ma-none text-secondary" };
const _hoisted_5 = { class: "row justify-end" };
const _hoisted_6 = { class: "text-subtitle1 text-grey-7 q-ma-none" };
const _hoisted_7 = { class: "row q-mb-lg items-center q-gutter-md" };
const _hoisted_8 = { class: "col-12 col-md-6" };
const _hoisted_9 = { class: "gt-sm" };
const _hoisted_10 = { class: "lt-md" };
const _hoisted_11 = { class: "row q-col-gutter-md" };
const _hoisted_12 = { class: "row items-center" };
const _hoisted_13 = { class: "col" };
const _hoisted_14 = { class: "text-h6" };
const _hoisted_15 = { class: "text-caption text-grey-6" };
const _hoisted_16 = { class: "col-auto" };
const _hoisted_17 = {
  key: 0,
  class: "col-12"
};
const _hoisted_18 = { class: "text-h6 q-mt-md text-grey-6" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "q-pa-lg" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(QIcon, {
              name: "construction",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.$t("pages.equipamento.title")), 1)
          ]),
          _cache[1] || (_cache[1] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("pages.equipamento.subtitle")), 1)
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_7, [
        createBaseVNode("div", _hoisted_8, [
          createVNode(QInput, {
            modelValue: _ctx.filtro,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.filtro = $event),
            placeholder: _ctx.$t("pages.equipamento.searchPlaceholder"),
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
          label: _ctx.$t("pages.equipamento.newButton"),
          onClick: _ctx.irParaNovoEquipamento
        }, null, 8, ["label", "onClick"])
      ]),
      createBaseVNode("div", _hoisted_9, [
        createVNode(QTable, {
          rows: _ctx.equipamentosFiltrados,
          columns: _ctx.columns,
          "row-key": "Id",
          flat: "",
          bordered: "",
          loading: _ctx.loading,
          "no-data-label": _ctx.$t("pages.equipamento.noData")
        }, {
          "body-cell-PrecoUnitario": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.formatarMoeda(props.row.PrecoUnitario)), 1)
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
                  icon: "edit",
                  color: "primary",
                  size: "sm",
                  onClick: ($event) => _ctx.editarEquipamento(props.row),
                  title: _ctx.$t("pages.equipamento.editButton")
                }, null, 8, ["onClick", "title"]),
                createVNode(QBtn, {
                  flat: "",
                  round: "",
                  icon: "delete",
                  color: "negative",
                  size: "sm",
                  onClick: ($event) => _ctx.excluirEquipamento(props.row.Id),
                  title: _ctx.$t("pages.equipamento.deleteButton")
                }, null, 8, ["onClick", "title"])
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          _: 1
        }, 8, ["rows", "columns", "loading", "no-data-label"])
      ]),
      createBaseVNode("div", _hoisted_10, [
        createBaseVNode("div", _hoisted_11, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.equipamentosFiltrados, (equipamento) => {
            return openBlock(), createElementBlock("div", {
              key: equipamento.Id,
              class: "col-12"
            }, [
              createVNode(QCard, {
                flat: "",
                bordered: ""
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_12, [
                        createBaseVNode("div", _hoisted_13, [
                          createBaseVNode("div", _hoisted_14, toDisplayString(equipamento.Descricao), 1),
                          createBaseVNode("div", _hoisted_15, toDisplayString(equipamento.Unidade) + " • " + toDisplayString(_ctx.formatarMoeda(equipamento.PrecoUnitario)), 1)
                        ]),
                        createBaseVNode("div", _hoisted_16, [
                          createVNode(QBtn, {
                            flat: "",
                            round: "",
                            icon: "edit",
                            color: "primary",
                            size: "sm",
                            onClick: ($event) => _ctx.editarEquipamento(equipamento)
                          }, null, 8, ["onClick"]),
                          createVNode(QBtn, {
                            flat: "",
                            round: "",
                            icon: "delete",
                            color: "negative",
                            size: "sm",
                            onClick: ($event) => _ctx.excluirEquipamento(equipamento.Id)
                          }, null, 8, ["onClick"])
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)
            ]);
          }), 128)),
          _ctx.equipamentosFiltrados.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_17, [
            createVNode(QCard, {
              flat: "",
              bordered: "",
              class: "text-center q-pa-xl"
            }, {
              default: withCtx(() => [
                createVNode(QIcon, {
                  name: "construction",
                  size: "4rem",
                  color: "grey-5"
                }),
                createBaseVNode("div", _hoisted_18, toDisplayString(_ctx.$t("pages.equipamento.noData")), 1)
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
const EquipamentoListagemPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-aec1da1c"]]);
export {
  EquipamentoListagemPage as default
};
//# sourceMappingURL=EquipamentoListagemPage-DpvUFoOa.js.map
