import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, l as computed, M as onMounted, b as useRouter, f as createBaseVNode, e as createVNode, Q as QIcon, t as toDisplayString, h as createCommentVNode, j as createTextVNode, i as QBtn, g as createElementBlock, a1 as Fragment, a2 as renderList } from "./index-DcwkHxen.js";
import { Q as QInput } from "./QInput-DXQxwL8P.js";
import { Q as QSpace } from "./QSpace-1am2MY4J.js";
import { Q as QToggle } from "./QToggle-CQSjXwVo.js";
import { Q as QChip } from "./QChip-DJNlQhAb.js";
import { Q as QTable, a as QTd } from "./QTable-C_BNze_w.js";
import { Q as QPage, a as QCard, b as QCardSection } from "./QPage-BYlIwfOX.js";
import { Q as QCardActions } from "./QCardActions-kxyzVYOt.js";
import { u as usePacoteServicoStore } from "./pacote-servico-store-DgEwGr_q.js";
import { g as getCurrencyConfig, f as formatCurrency } from "./currencyUtils-CDJCkeA4.js";
import { u as useI18n } from "./vue-i18n.runtime-CPX_irvo.js";
import "./focus-manager-DpCIkUL-.js";
import "./use-dark-XRAlznJ5.js";
import "./use-checkbox-CitpLRtO.js";
import "./QSeparator-Bf3c0dV9.js";
import "./QList-BqTKY8ZW.js";
import "./QSelect-DUStfZDN.js";
import "./QItemLabel-DaKJP7vT.js";
import "./use-model-toggle-CaGhxNcT.js";
import "./format-BMI8Gb4Z.js";
import "./use-timeout-CtV8kKCk.js";
import "./scroll-DsZj_zve.js";
import "./QCheckbox-B567b7Cu.js";
import "./use-fullscreen-B7V1Jpf8.js";
import "./pacoteServico-BEcXIkd0.js";
import "./guid-BHuXRmln.js";
import "./material-D-n2u651.js";
import "./servico-Bx3u9W9d.js";
const _sfc_main = defineComponent({
  name: "PacoteServicoListagemPage",
  setup() {
    const store = usePacoteServicoStore();
    const router = useRouter();
    const { locale, t } = useI18n();
    const mostrarApenasFavoritos = ref(false);
    const filtro = ref("");
    const currencyConfig = computed(() => getCurrencyConfig(locale.value));
    const columns = [
      { name: "Descricao", label: "Descrição", field: "Descricao", align: "left" },
      { name: "MargemLucro", label: "Margem (%)", field: "MargemLucro", align: "center" },
      { name: "ValorTotal", label: "Valor Custo", field: "ValorTotalFormatado", align: "right" },
      { name: "ValorVenda", label: "Valor Venda", field: "ValorVendaFormatado", align: "right" },
      { name: "Acoes", label: "Ações", field: "Acoes", align: "center", sortable: false }
    ];
    const pacotesFormatados = computed(() => {
      let pacotesFiltrados2 = store.pacotes;
      if (mostrarApenasFavoritos.value) {
        pacotesFiltrados2 = store.pacotes.filter((pacote) => pacote.Favorito);
      }
      return pacotesFiltrados2.map((pacote) => ({
        ...pacote,
        ValorTotalFormatado: formatCurrency(pacote.ValorTotal, locale.value, currencyConfig.value.currency),
        ValorVendaFormatado: formatCurrency(pacote.ValorVenda, locale.value, currencyConfig.value.currency)
      }));
    });
    const pacotesFiltrados = computed(() => {
      let pacotes = pacotesFormatados.value;
      if (filtro.value) {
        const filtroLowerCase = filtro.value.toLowerCase();
        pacotes = pacotes.filter(
          (pacote) => pacote.Descricao.toLowerCase().includes(filtroLowerCase)
        );
      }
      return pacotes;
    });
    const totalFavoritosFiltrados = computed(() => {
      return store.pacotes.filter((pacote) => pacote.Favorito).length;
    });
    const loading = computed(() => store.loading);
    onMounted(async () => {
      console.log("🔍 Debug - Carregando pacotes...");
      const localStorageData = localStorage.getItem("ecleaner_pacotes_servicos");
      console.log("LocalStorage data:", localStorageData);
      await store.fetchPacotes();
      console.log("Store pacotes:", store.pacotes.length, "pacotes carregados");
    });
    function editarPacote(pacote) {
      router.push(`/pacotes-servicos/${pacote.Id}`);
    }
    function excluirPacote(pacote) {
      if (confirm(t("pages.pacoteServico.confirmarExclusao", { descricao: pacote.Descricao }))) {
        store.deletePacote(pacote.Id);
      }
    }
    function toggleFavorito(pacote) {
      store.toggleFavorito(pacote.Id);
    }
    return {
      // Estado
      filtro,
      mostrarApenasFavoritos,
      // Computed
      pacotesFiltrados,
      columns,
      loading,
      totalFavoritosFiltrados,
      // Métodos
      editarPacote,
      excluirPacote,
      toggleFavorito
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
const _hoisted_9 = { class: "row items-center q-gutter-md" };
const _hoisted_10 = { class: "gt-sm" };
const _hoisted_11 = { class: "lt-md" };
const _hoisted_12 = { class: "row q-col-gutter-md" };
const _hoisted_13 = { class: "text-h6" };
const _hoisted_14 = { class: "text-subtitle2 text-grey-7 q-mt-xs" };
const _hoisted_15 = { class: "row q-mt-sm" };
const _hoisted_16 = { class: "col-6" };
const _hoisted_17 = { class: "text-caption text-grey-6" };
const _hoisted_18 = { class: "text-subtitle2" };
const _hoisted_19 = { class: "col-6" };
const _hoisted_20 = { class: "text-caption text-grey-6" };
const _hoisted_21 = { class: "text-subtitle2 text-positive" };
const _hoisted_22 = {
  key: 0,
  class: "col-12"
};
const _hoisted_23 = { class: "text-h6 q-mt-md text-grey-6" };
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
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.$t("pages.pacoteServico.title")), 1)
          ]),
          _cache[3] || (_cache[3] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("pages.pacoteServico.subtitle")), 1)
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_7, [
        createBaseVNode("div", _hoisted_8, [
          createVNode(QInput, {
            modelValue: _ctx.filtro,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.filtro = $event),
            placeholder: _ctx.$t("pages.pacoteServico.searchPlaceholder"),
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
        createBaseVNode("div", _hoisted_9, [
          createVNode(QToggle, {
            modelValue: _ctx.mostrarApenasFavoritos,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.mostrarApenasFavoritos = $event),
            label: _ctx.$t("pages.pacoteServico.mostrarFavoritos"),
            color: "red",
            "left-label": ""
          }, null, 8, ["modelValue", "label"]),
          _ctx.mostrarApenasFavoritos ? (openBlock(), createBlock(QChip, {
            key: 0,
            color: "red",
            "text-color": "white",
            icon: "favorite",
            class: "q-ml-sm"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.totalFavoritosFiltrados) + " " + toDisplayString(_ctx.$t("pages.pacoteServico.favoritos")), 1)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createVNode(QBtn, {
            color: "primary",
            icon: "add",
            label: _ctx.$t("pages.pacoteServico.newButton"),
            onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$router.push("/pacotes-servicos/novo"))
          }, null, 8, ["label"])
        ])
      ]),
      createBaseVNode("div", _hoisted_10, [
        createVNode(QTable, {
          rows: _ctx.pacotesFiltrados,
          columns: _ctx.columns,
          "row-key": "Id",
          loading: _ctx.loading,
          "no-data-label": _ctx.$t("pages.pacoteServico.noData")
        }, {
          "body-cell-Acoes": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createVNode(QBtn, {
                  flat: "",
                  round: "",
                  color: props.row.Favorito ? "red" : "grey",
                  icon: props.row.Favorito ? "favorite" : "favorite_border",
                  onClick: ($event) => _ctx.toggleFavorito(props.row)
                }, null, 8, ["color", "icon", "onClick"]),
                createVNode(QBtn, {
                  flat: "",
                  round: "",
                  color: "primary",
                  icon: "edit",
                  onClick: ($event) => _ctx.editarPacote(props.row)
                }, null, 8, ["onClick"]),
                createVNode(QBtn, {
                  flat: "",
                  round: "",
                  color: "negative",
                  icon: "delete",
                  onClick: ($event) => _ctx.excluirPacote(props.row)
                }, null, 8, ["onClick"])
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          _: 1
        }, 8, ["rows", "columns", "loading", "no-data-label"])
      ]),
      createBaseVNode("div", _hoisted_11, [
        createBaseVNode("div", _hoisted_12, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.pacotesFiltrados, (pacote) => {
            return openBlock(), createElementBlock("div", {
              key: pacote.Id,
              class: "col-12"
            }, [
              createVNode(QCard, {
                flat: "",
                bordered: ""
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_13, toDisplayString(pacote.Descricao), 1),
                      createBaseVNode("div", _hoisted_14, toDisplayString(_ctx.$t("pages.pacoteServico.margem")) + ": " + toDisplayString(pacote.MargemLucro) + "% ", 1),
                      createBaseVNode("div", _hoisted_15, [
                        createBaseVNode("div", _hoisted_16, [
                          createBaseVNode("div", _hoisted_17, toDisplayString(_ctx.$t("pages.pacoteServico.valorCusto")), 1),
                          createBaseVNode("div", _hoisted_18, toDisplayString(pacote.ValorTotalFormatado), 1)
                        ]),
                        createBaseVNode("div", _hoisted_19, [
                          createBaseVNode("div", _hoisted_20, toDisplayString(_ctx.$t("pages.pacoteServico.valorVenda")), 1),
                          createBaseVNode("div", _hoisted_21, toDisplayString(pacote.ValorVendaFormatado), 1)
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(QCardActions, { align: "right" }, {
                    default: withCtx(() => [
                      createVNode(QBtn, {
                        flat: "",
                        round: "",
                        color: pacote.Favorito ? "red" : "grey",
                        icon: pacote.Favorito ? "favorite" : "favorite_border",
                        onClick: ($event) => _ctx.toggleFavorito(pacote)
                      }, null, 8, ["color", "icon", "onClick"]),
                      createVNode(QBtn, {
                        flat: "",
                        color: "primary",
                        label: _ctx.$t("pages.pacoteServico.editar"),
                        onClick: ($event) => _ctx.editarPacote(pacote)
                      }, null, 8, ["label", "onClick"]),
                      createVNode(QBtn, {
                        flat: "",
                        color: "negative",
                        label: _ctx.$t("pages.pacoteServico.excluir"),
                        onClick: ($event) => _ctx.excluirPacote(pacote)
                      }, null, 8, ["label", "onClick"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)
            ]);
          }), 128)),
          _ctx.pacotesFiltrados.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_22, [
            createVNode(QCard, {
              flat: "",
              bordered: "",
              class: "text-center q-pa-xl"
            }, {
              default: withCtx(() => [
                createVNode(QIcon, {
                  name: "inventory",
                  size: "4rem",
                  color: "grey-5"
                }),
                createBaseVNode("div", _hoisted_23, toDisplayString(_ctx.$t("pages.pacoteServico.noData")), 1)
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
const PacoteServicoListagemPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  PacoteServicoListagemPage as default
};
//# sourceMappingURL=PacoteServicoListagemPage-CWRNo-kX.js.map
