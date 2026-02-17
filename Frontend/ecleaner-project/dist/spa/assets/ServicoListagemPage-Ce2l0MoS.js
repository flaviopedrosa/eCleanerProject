import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, p as computed, $ as onMounted, b as useRouter, f as createBaseVNode, e as createVNode, k as QIcon, t as toDisplayString, j as QInput, l as QBtn, m as createTextVNode, h as createElementBlock, i as createCommentVNode, aj as Fragment, ak as renderList, Q as QCard, g as QCardSection, a7 as QSeparator, au as QCardActions } from "./index-C_9ZqZx5.js";
import { Q as QSpace } from "./QSpace-CN10jCLy.js";
import { Q as QTooltip } from "./QTooltip-BRNgwqDX.js";
import { Q as QTable, a as QTd } from "./QTable-BAAlFMYu.js";
import { Q as QPage } from "./QPage-BjohE0wt.js";
import { u as useServicoStore } from "./servico-store-0q30Y1u-.js";
import { u as useQuasar } from "./use-quasar-RhPDzzvJ.js";
import { g as getCurrencyConfig, f as formatCurrency } from "./currencyUtils-CDJCkeA4.js";
import { s as seedServicos } from "./servicoSeed-DT2RWvuq.js";
import { u as useI18n } from "./vue-i18n.runtime-BcAS3Jju.js";
import "./position-engine-D6xtJVbJ.js";
import "./selection-q6_tzKdx.js";
import "./QList-DrRTzTWV.js";
import "./QSelect-B7UkQpY4.js";
import "./QChip-CQHm52sc.js";
import "./format-X8mfcfls.js";
import "./QMenu-0ExrfRXY.js";
import "./QLinearProgress-BwVRjKCw.js";
import "./use-fullscreen-BFuhyU9x.js";
import "./servico-Bx3u9W9d.js";
import "./guid-BHuXRmln.js";
const _sfc_main = defineComponent({
  name: "ServicoListagemPage",
  setup() {
    const store = useServicoStore();
    const router = useRouter();
    const $q = useQuasar();
    const { locale } = useI18n();
    const filtro = ref("");
    const currencyConfig = computed(() => getCurrencyConfig(locale.value));
    const columns = [
      {
        name: "Nome",
        label: "Nome",
        field: "Nome",
        align: "left",
        style: "width: 25%; max-width: 180px;"
      },
      {
        name: "Descricao",
        label: "Descrição",
        field: "Descricao",
        align: "left",
        style: "width: 40%; max-width: 250px;",
        classes: "text-wrap"
      },
      {
        name: "Valor",
        label: "Valor",
        field: "ValorFormatado",
        align: "right",
        style: "width: 15%; max-width: 100px;"
      },
      {
        name: "actions",
        label: "Ações",
        field: "actions",
        align: "center",
        style: "width: 20%; max-width: 150px;"
      }
    ];
    const servicosFormatados = computed(() => {
      return store.servicos.map((servico) => ({
        ...servico,
        ValorFormatado: formatCurrency(servico.Valor, locale.value, currencyConfig.value.currency)
      }));
    });
    const servicosFiltrados = computed(() => {
      if (!filtro.value) {
        return servicosFormatados.value;
      }
      const filtroLowerCase = filtro.value.toLowerCase();
      return servicosFormatados.value.filter(
        (servico) => servico.Nome.toLowerCase().includes(filtroLowerCase) || servico.Descricao.toLowerCase().includes(filtroLowerCase)
      );
    });
    const editarServico = (servico) => {
      router.push(`/servicos/editar/${servico.Id}`);
    };
    const excluirServico = async (servico) => {
      $q.dialog({
        title: "Confirmar Exclusão",
        message: `Tem certeza que deseja excluir o serviço "${servico.Nome}"?`,
        cancel: true,
        persistent: true,
        ok: {
          label: "Excluir",
          color: "negative"
        }
      }).onOk(async () => {
        try {
          await store.deleteServico(servico.Id);
          $q.notify({
            type: "positive",
            message: "Serviço excluído com sucesso!",
            position: "top-right"
          });
        } catch (error) {
          $q.notify({
            type: "negative",
            message: "Erro ao excluir serviço: " + error.message,
            position: "top-right"
          });
        }
      });
    };
    onMounted(async () => {
      await store.fetchServicos();
      if (store.servicos.length === 0) {
        console.log("🌱 Nenhum serviço encontrado, executando seed...");
        try {
          await seedServicos();
          await store.fetchServicos();
          console.log("✅ Seed executado com sucesso!");
        } catch (error) {
          console.error("❌ Erro ao executar seed:", error);
        }
      }
    });
    return {
      // Estado
      filtro,
      // Computed
      servicosFiltrados,
      columns,
      // Métodos
      editarServico,
      excluirServico
    };
  }
});
const _hoisted_1 = { class: "row items-center q-mb-xl" };
const _hoisted_2 = { class: "col" };
const _hoisted_3 = { class: "row items-center q-mb-sm" };
const _hoisted_4 = { class: "text-h5 q-ma-none text-secondary" };
const _hoisted_5 = { class: "row justify-end items-center" };
const _hoisted_6 = { class: "text-subtitle1 text-grey-7 q-ma-none" };
const _hoisted_7 = { class: "row q-mb-lg items-center q-gutter-md" };
const _hoisted_8 = { class: "col-12 col-md-6" };
const _hoisted_9 = { class: "gt-sm" };
const _hoisted_10 = { class: "lt-md" };
const _hoisted_11 = { class: "row q-col-gutter-md" };
const _hoisted_12 = { class: "text-h6" };
const _hoisted_13 = { class: "text-subtitle2" };
const _hoisted_14 = { class: "text-caption" };
const _hoisted_15 = {
  key: 0,
  class: "col-12"
};
const _hoisted_16 = { class: "text-h6 q-mt-md text-grey-6" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "q-pa-lg" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(QIcon, {
              name: "build",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.$t("pages.servico.title")), 1)
          ]),
          _cache[1] || (_cache[1] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("pages.servico.subtitle")), 1)
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_7, [
        createBaseVNode("div", _hoisted_8, [
          createVNode(QInput, {
            modelValue: _ctx.filtro,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.filtro = $event),
            placeholder: _ctx.$t("pages.servico.searchPlaceholder"),
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
          label: _ctx.$t("pages.servico.newButton"),
          to: "/servicos/novo"
        }, null, 8, ["label"])
      ]),
      createBaseVNode("div", _hoisted_9, [
        createVNode(QTable, {
          rows: _ctx.servicosFiltrados,
          columns: _ctx.columns,
          "row-key": "Id",
          class: "servico-table",
          "wrap-cells": "",
          "no-data-label": _ctx.$t("pages.servico.noData")
        }, {
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
                  onClick: ($event) => _ctx.editarServico(props.row)
                }, {
                  default: withCtx(() => [
                    createVNode(QTooltip, null, {
                      default: withCtx(() => [..._cache[2] || (_cache[2] = [
                        createTextVNode("Editar", -1)
                      ])]),
                      _: 1
                    })
                  ]),
                  _: 2
                }, 1032, ["onClick"]),
                createVNode(QBtn, {
                  flat: "",
                  round: "",
                  color: "negative",
                  icon: "delete",
                  onClick: ($event) => _ctx.excluirServico(props.row)
                }, {
                  default: withCtx(() => [
                    createVNode(QTooltip, null, {
                      default: withCtx(() => [..._cache[3] || (_cache[3] = [
                        createTextVNode("Excluir", -1)
                      ])]),
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
        }, 8, ["rows", "columns", "no-data-label"])
      ]),
      createBaseVNode("div", _hoisted_10, [
        createBaseVNode("div", _hoisted_11, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.servicosFiltrados, (servico) => {
            return openBlock(), createElementBlock("div", {
              key: servico.Id,
              class: "col-12"
            }, [
              createVNode(QCard, {
                flat: "",
                bordered: ""
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_12, toDisplayString(servico.Nome), 1),
                      createBaseVNode("div", _hoisted_13, toDisplayString(servico.Descricao), 1),
                      createBaseVNode("div", _hoisted_14, toDisplayString(_ctx.$t("pages.servico.valor")) + ": " + toDisplayString(servico.ValorFormatado), 1)
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
                        label: "Editar",
                        onClick: ($event) => _ctx.editarServico(servico)
                      }, null, 8, ["onClick"]),
                      createVNode(QBtn, {
                        flat: "",
                        color: "negative",
                        icon: "delete",
                        label: "Excluir",
                        onClick: ($event) => _ctx.excluirServico(servico)
                      }, null, 8, ["onClick"])
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024)
            ]);
          }), 128)),
          _ctx.servicosFiltrados.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_15, [
            createVNode(QCard, {
              flat: "",
              bordered: "",
              class: "text-center q-pa-xl"
            }, {
              default: withCtx(() => [
                createVNode(QIcon, {
                  name: "build",
                  size: "4rem",
                  color: "grey-5"
                }),
                createBaseVNode("div", _hoisted_16, toDisplayString(_ctx.$t("pages.servico.noData")), 1)
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
const ServicoListagemPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ServicoListagemPage as default
};
//# sourceMappingURL=ServicoListagemPage-Ce2l0MoS.js.map
