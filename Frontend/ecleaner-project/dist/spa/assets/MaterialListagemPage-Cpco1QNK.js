const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/materialSeed-DxCvsxFa.js","assets/material-D-n2u651.js","assets/guid-BHuXRmln.js","assets/materialRepository-ClMwRjl3.js"])))=>i.map(i=>d[i]);
import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, l as computed, M as onMounted, ak as __vitePreload, b as useRouter, f as createBaseVNode, e as createVNode, Q as QIcon, t as toDisplayString, i as QBtn, j as createTextVNode, g as createElementBlock, h as createCommentVNode, a1 as Fragment, a2 as renderList } from "./index-DcwkHxen.js";
import { Q as QInput } from "./QInput-DXQxwL8P.js";
import { Q as QSpace } from "./QSpace-1am2MY4J.js";
import { Q as QTable, a as QTd } from "./QTable-C_BNze_w.js";
import { Q as QPage, a as QCard, b as QCardSection } from "./QPage-BYlIwfOX.js";
import { u as useMaterialStore } from "./material-store-CEub2Qqs.js";
import { u as useI18n } from "./vue-i18n.runtime-CPX_irvo.js";
import "./focus-manager-DpCIkUL-.js";
import "./use-dark-XRAlznJ5.js";
import "./QSeparator-Bf3c0dV9.js";
import "./QList-BqTKY8ZW.js";
import "./QSelect-DUStfZDN.js";
import "./QChip-DJNlQhAb.js";
import "./QItemLabel-DaKJP7vT.js";
import "./use-model-toggle-CaGhxNcT.js";
import "./format-BMI8Gb4Z.js";
import "./use-timeout-CtV8kKCk.js";
import "./scroll-DsZj_zve.js";
import "./QCheckbox-B567b7Cu.js";
import "./use-checkbox-CitpLRtO.js";
import "./use-fullscreen-B7V1Jpf8.js";
import "./material-D-n2u651.js";
import "./guid-BHuXRmln.js";
import "./materialRepository-ClMwRjl3.js";
const _sfc_main = defineComponent({
  name: "MaterialListagemPage",
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const store = useMaterialStore();
    const filtro = ref("");
    const columns = computed(() => [
      {
        name: "Descricao",
        label: t("pages.material.fields.descricao"),
        field: "Descricao",
        align: "left",
        sortable: true
      },
      {
        name: "Unidade",
        label: t("pages.material.fields.unidade"),
        field: "Unidade",
        align: "center",
        sortable: true
      },
      {
        name: "PrecoUnitario",
        label: t("pages.material.fields.precoUnitario"),
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
    const materiaisSorted = computed(() => store.MateriaisOrdenados);
    const loading = computed(() => store.IsLoading);
    const materiaisFiltrados = computed(() => {
      if (!filtro.value) {
        return materiaisSorted.value;
      }
      const filtroLowerCase = filtro.value.toLowerCase();
      return materiaisSorted.value.filter(
        (material) => material.Descricao.toLowerCase().includes(filtroLowerCase) || material.Unidade.toLowerCase().includes(filtroLowerCase)
      );
    });
    function formatarMoeda(valor) {
      console.log("formatarMoeda recebeu:", valor, typeof valor);
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
    function irParaNovoMaterial() {
      router.push("/materiais/novo");
    }
    function editarMaterial(material) {
      router.push(`/materiais/${material.Id}/editar`);
    }
    async function excluirMaterial(id) {
      try {
        await store.deleteMaterial(id);
      } catch (error) {
        console.error("Erro ao excluir material:", error);
      }
    }
    async function salvarMaterial(material) {
      try {
        if (material.Id) {
          await store.updateMaterial(material);
        } else {
          await store.addMaterial(material);
        }
      } catch (error) {
        console.error("Erro ao salvar material:", error);
      }
    }
    onMounted(async () => {
      try {
        await store.loadMateriais();
        console.log("Materiais carregados:", store.Materiais);
        console.log("Materiais ordenados:", store.MateriaisOrdenados);
        if (store.Materiais.length === 0) {
          console.log("Nenhum material encontrado, executando seed...");
          const { seedMateriais } = await __vitePreload(async () => {
            const { seedMateriais: seedMateriais2 } = await import("./materialSeed-DxCvsxFa.js");
            return { seedMateriais: seedMateriais2 };
          }, true ? __vite__mapDeps([0,1,2,3]) : void 0);
          await seedMateriais();
          await store.loadMateriais();
          console.log("Seed executado, materiais após seed:", store.Materiais);
        }
      } catch (error) {
        console.error("Erro ao carregar materiais:", error);
      }
    });
    return {
      // Estado
      filtro,
      // Computed
      columns,
      materiaisSorted,
      materiaisFiltrados,
      loading,
      // Métodos
      formatarMoeda,
      irParaNovoMaterial,
      editarMaterial,
      excluirMaterial,
      salvarMaterial
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
              name: "category",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.$t("pages.material.title")), 1)
          ]),
          _cache[1] || (_cache[1] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("pages.material.subtitle")), 1)
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_7, [
        createBaseVNode("div", _hoisted_8, [
          createVNode(QInput, {
            modelValue: _ctx.filtro,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.filtro = $event),
            placeholder: _ctx.$t("pages.material.searchPlaceholder"),
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
          label: _ctx.$t("pages.material.newButton"),
          onClick: _ctx.irParaNovoMaterial
        }, null, 8, ["label", "onClick"])
      ]),
      createBaseVNode("div", _hoisted_9, [
        createVNode(QTable, {
          rows: _ctx.materiaisFiltrados,
          columns: _ctx.columns,
          "row-key": "Id",
          flat: "",
          bordered: "",
          loading: _ctx.loading,
          "no-data-label": _ctx.$t("pages.material.noData")
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
                  onClick: ($event) => _ctx.editarMaterial(props.row),
                  title: _ctx.$t("pages.material.editButton")
                }, null, 8, ["onClick", "title"]),
                createVNode(QBtn, {
                  flat: "",
                  round: "",
                  icon: "delete",
                  color: "negative",
                  size: "sm",
                  onClick: ($event) => _ctx.excluirMaterial(props.row.Id),
                  title: _ctx.$t("pages.material.deleteButton")
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
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.materiaisFiltrados, (material) => {
            return openBlock(), createElementBlock("div", {
              key: material.Id,
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
                          createBaseVNode("div", _hoisted_14, toDisplayString(material.Descricao), 1),
                          createBaseVNode("div", _hoisted_15, toDisplayString(material.Unidade) + " • " + toDisplayString(_ctx.formatarMoeda(material.PrecoUnitario)), 1)
                        ]),
                        createBaseVNode("div", _hoisted_16, [
                          createVNode(QBtn, {
                            flat: "",
                            round: "",
                            icon: "edit",
                            color: "primary",
                            size: "sm",
                            onClick: ($event) => _ctx.editarMaterial(material)
                          }, null, 8, ["onClick"]),
                          createVNode(QBtn, {
                            flat: "",
                            round: "",
                            icon: "delete",
                            color: "negative",
                            size: "sm",
                            onClick: ($event) => _ctx.excluirMaterial(material.Id)
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
          _ctx.materiaisFiltrados.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_17, [
            createVNode(QCard, {
              flat: "",
              bordered: "",
              class: "text-center q-pa-xl"
            }, {
              default: withCtx(() => [
                createVNode(QIcon, {
                  name: "category",
                  size: "4rem",
                  color: "grey-5"
                }),
                createBaseVNode("div", _hoisted_18, toDisplayString(_ctx.$t("pages.material.noData")), 1)
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
const MaterialListagemPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  MaterialListagemPage as default
};
//# sourceMappingURL=MaterialListagemPage-Cpco1QNK.js.map
