import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, p as computed, A as watch, $ as onMounted, f as createBaseVNode, e as createVNode, k as QIcon, t as toDisplayString, l as QBtn, Q as QCard, g as QCardSection, j as QInput, am as QDialog, m as createTextVNode, au as QCardActions, a0 as withDirectives, h as createElementBlock, a6 as QAvatar, aj as Fragment, ak as renderList, i as createCommentVNode, a7 as QSeparator } from "./index-C_9ZqZx5.js";
import { Q as QSelect } from "./QSelect-B7UkQpY4.js";
import { Q as QTable, a as QTd } from "./QTable-BAAlFMYu.js";
import { Q as QChip } from "./QChip-CQHm52sc.js";
import { Q as QTooltip } from "./QTooltip-BRNgwqDX.js";
import { Q as QPagination } from "./QPagination-BJZX0xK0.js";
import { Q as QPage } from "./QPage-BjohE0wt.js";
import { C as ClosePopup } from "./ClosePopup-BrDwQcvw.js";
import { u as useQuasar } from "./use-quasar-RhPDzzvJ.js";
import { C as Cliente, I as Imovel } from "./imovel-DC67hqHE.js";
import { E as Endereco } from "./pessoa-C98XhDqr.js";
import { u as useI18n } from "./vue-i18n.runtime-BcAS3Jju.js";
import "./format-X8mfcfls.js";
import "./QMenu-0ExrfRXY.js";
import "./position-engine-D6xtJVbJ.js";
import "./selection-q6_tzKdx.js";
import "./QList-DrRTzTWV.js";
import "./QLinearProgress-BwVRjKCw.js";
import "./use-fullscreen-BFuhyU9x.js";
import "./guid-BHuXRmln.js";
const _sfc_main = defineComponent({
  name: "ImovelListagemPage",
  setup() {
    const $q = useQuasar();
    const { t } = useI18n();
    const loading = ref(false);
    const testDataDialog = ref(false);
    const imoveis = ref([]);
    const filters = ref({
      search: "",
      cidade: null,
      areaRange: null,
      sort: "endereco"
    });
    const pagination = ref({
      page: 1,
      rowsPerPage: 20,
      rowsNumber: 0
    });
    const dialogExclusao = ref({
      show: false,
      imovel: null
    });
    const cidadeOptions = ref([]);
    const areaRangeOptions = computed(() => [
      { label: t("pages.imovelList.areaRanges.small"), value: "small" },
      { label: t("pages.imovelList.areaRanges.medium"), value: "medium" },
      { label: t("pages.imovelList.areaRanges.large"), value: "large" },
      { label: t("pages.imovelList.areaRanges.extraLarge"), value: "extraLarge" }
    ]);
    const sortOptions = computed(() => [
      { label: t("pages.imovelList.sortOptions.endereco"), value: "endereco" },
      { label: t("pages.imovelList.sortOptions.area"), value: "area" },
      { label: t("pages.imovelList.sortOptions.comodos"), value: "comodos" },
      { label: t("pages.imovelList.sortOptions.proprietario"), value: "proprietario" }
    ]);
    const columns = computed(() => [
      {
        name: "endereco",
        required: true,
        label: t("pages.imovelList.table.endereco"),
        align: "left",
        field: (row) => formatEndereco(row.Endereco),
        sortable: true
      },
      {
        name: "areaTotal",
        align: "center",
        label: t("pages.imovelList.table.area"),
        field: "AreaTotal",
        sortable: true
      },
      {
        name: "comodos",
        align: "center",
        label: t("pages.imovelList.table.comodos"),
        field: "TotalComodos",
        sortable: true
      },
      {
        name: "dono",
        align: "left",
        label: t("pages.imovelList.table.proprietario"),
        field: (row) => `${row.Dono?.Nome} ${row.Dono?.Sobrenome}`,
        sortable: true
      },
      {
        name: "observacao",
        align: "left",
        label: t("pages.imovelList.table.observacao"),
        field: "Observacao",
        sortable: true
      },
      {
        name: "actions",
        align: "center",
        label: t("pages.imovelList.table.actions"),
        sortable: false
      }
    ]);
    const filteredImoveis = computed(() => {
      let result = [...imoveis.value];
      if (filters.value.search) {
        const searchLower = filters.value.search.toLowerCase();
        result = result.filter((imovel) => {
          const endereco = formatEndereco(imovel.Endereco).toLowerCase();
          const proprietario = `${imovel.Dono?.Nome} ${imovel.Dono?.Sobrenome}`.toLowerCase();
          const observacao = (imovel.Observacao || "").toLowerCase();
          return endereco.includes(searchLower) || proprietario.includes(searchLower) || observacao.includes(searchLower);
        });
      }
      if (filters.value.cidade) {
        result = result.filter(
          (imovel) => imovel.Endereco.Cidade.toLowerCase() === filters.value.cidade.toLowerCase()
        );
      }
      if (filters.value.areaRange) {
        result = result.filter((imovel) => {
          const area = imovel.AreaTotal;
          switch (filters.value.areaRange) {
            case "small":
              return area <= 50;
            case "medium":
              return area > 50 && area <= 100;
            case "large":
              return area > 100 && area <= 200;
            case "extraLarge":
              return area > 200;
            default:
              return true;
          }
        });
      }
      if (filters.value.sort) {
        result.sort((a, b) => {
          switch (filters.value.sort) {
            case "endereco":
              return formatEndereco(a.Endereco).localeCompare(formatEndereco(b.Endereco));
            case "area":
              return b.AreaTotal - a.AreaTotal;
            case "comodos":
              return b.TotalComodos - a.TotalComodos;
            case "proprietario": {
              const nomeA = `${a.Dono?.Nome} ${a.Dono?.Sobrenome}`;
              const nomeB = `${b.Dono?.Nome} ${b.Dono?.Sobrenome}`;
              return nomeA.localeCompare(nomeB);
            }
            default:
              return 0;
          }
        });
      }
      return result;
    });
    const formatEndereco = (endereco) => {
      if (!endereco) return "-";
      return `${endereco.Logradouro}, ${endereco.Numero} - ${endereco.Bairro}, ${endereco.Cidade}/${endereco.Estado}`;
    };
    const getInitials = (nome, sobrenome) => {
      const nomeInitial = nome ? nome.charAt(0).toUpperCase() : "";
      const sobrenomeInitial = sobrenome ? sobrenome.charAt(0).toUpperCase() : "";
      return nomeInitial + sobrenomeInitial;
    };
    const editarImovel = (imovel) => {
      console.log("Editar imóvel:", imovel);
      $q.notify({
        type: "info",
        message: t("pages.imovelList.messages.editNotImplemented"),
        position: "top"
      });
    };
    const confirmarExclusao = (imovel) => {
      dialogExclusao.value.imovel = imovel;
      dialogExclusao.value.show = true;
    };
    const excluirImovel = () => {
      const index = imoveis.value.findIndex((i) => i.Id === dialogExclusao.value.imovel.Id);
      if (index !== -1) {
        imoveis.value.splice(index, 1);
        $q.notify({
          type: "positive",
          message: t("pages.imovelList.messages.deleteSuccess"),
          position: "top"
        });
      }
      dialogExclusao.value.imovel = null;
    };
    const loadTestData = () => {
      testDataDialog.value = true;
    };
    const confirmLoadTestData = () => {
      loading.value = true;
      const clientesMock = [
        new Cliente("João", "Silva", "joao@email.com", "(11) 99999-9999", "(11) 99999-9999"),
        new Cliente("Maria", "Santos", "maria@email.com", "(11) 88888-8888", "(11) 88888-8888"),
        new Cliente("Pedro", "Oliveira", "pedro@email.com", "(11) 77777-7777", "(11) 77777-7777"),
        new Cliente("Ana", "Costa", "ana@email.com", "(11) 66666-6666", "(11) 66666-6666")
      ];
      const enderecosMock = [
        new Endereco("Rua das Flores", "123", "Apto 45", "Jardim das Rosas", "São Paulo", "SP", "01234-567", "Brasil"),
        new Endereco("Avenida Principal", "456", "", "Centro", "Rio de Janeiro", "RJ", "20000-123", "Brasil"),
        new Endereco("Rua da Paz", "789", "Casa 2", "Vila Esperança", "Belo Horizonte", "MG", "30000-456", "Brasil"),
        new Endereco("Alameda dos Ipês", "321", "Cobertura", "Alto da Boa Vista", "Curitiba", "PR", "80000-789", "Brasil"),
        new Endereco("Rua do Comércio", "654", "", "Comercial", "Porto Alegre", "RS", "90000-012", "Brasil")
      ];
      const imoveisMock = [
        new Imovel(8, 3, 2, 120, enderecosMock[0], clientesMock[0], "Casa ampla com quintal"),
        new Imovel(5, 2, 1, 75, enderecosMock[1], clientesMock[1], "Apartamento bem localizado"),
        new Imovel(10, 4, 3, 180, enderecosMock[2], clientesMock[2], "Casa de alto padrão"),
        new Imovel(3, 1, 1, 45, enderecosMock[3], clientesMock[3], "Studio moderno"),
        new Imovel(6, 2, 2, 90, enderecosMock[4], clientesMock[0], "Apartamento familiar")
      ];
      setTimeout(() => {
        imoveis.value = imoveisMock;
        const cidades = [...new Set(imoveisMock.map((i) => i.Endereco.Cidade))];
        cidadeOptions.value = cidades.map((cidade) => ({
          label: cidade,
          value: cidade
        }));
        loading.value = false;
        $q.notify({
          type: "positive",
          message: t("pages.imovelList.messages.testDataLoaded"),
          position: "top"
        });
      }, 1e3);
    };
    const onRequest = (props) => {
      pagination.value = props.pagination;
    };
    watch(() => filters.value, () => {
      pagination.value.page = 1;
    }, { deep: true });
    onMounted(() => {
    });
    return {
      loading,
      testDataDialog,
      imoveis,
      filters,
      pagination,
      dialogExclusao,
      cidadeOptions,
      areaRangeOptions,
      sortOptions,
      columns,
      filteredImoveis,
      formatEndereco,
      getInitials,
      editarImovel,
      confirmarExclusao,
      excluirImovel,
      loadTestData,
      confirmLoadTestData,
      onRequest
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
const _hoisted_10 = { class: "col-12 col-md-3" };
const _hoisted_11 = { class: "col-12 col-md-2" };
const _hoisted_12 = { class: "col-12 col-md-3" };
const _hoisted_13 = { class: "text-h6" };
const _hoisted_14 = { class: "gt-sm" };
const _hoisted_15 = { class: "address-cell" };
const _hoisted_16 = { class: "row items-center" };
const _hoisted_17 = { class: "q-ml-sm" };
const _hoisted_18 = { class: "row q-gutter-xs" };
const _hoisted_19 = {
  key: 0,
  class: "observation-cell"
};
const _hoisted_20 = {
  key: 1,
  class: "text-grey-5"
};
const _hoisted_21 = { class: "lt-md" };
const _hoisted_22 = { class: "row q-col-gutter-md" };
const _hoisted_23 = { class: "row items-center q-mb-md" };
const _hoisted_24 = { class: "text-weight-medium" };
const _hoisted_25 = { class: "text-caption text-grey-7" };
const _hoisted_26 = { class: "q-gutter-y-sm" };
const _hoisted_27 = { class: "row items-center" };
const _hoisted_28 = { class: "row items-center" };
const _hoisted_29 = { class: "row q-gutter-xs" };
const _hoisted_30 = {
  key: 0,
  class: "row items-start"
};
const _hoisted_31 = { class: "text-caption" };
const _hoisted_32 = { class: "row justify-center q-mt-md" };
const _hoisted_33 = { class: "q-ml-sm" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "q-pa-lg" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(QIcon, {
              name: "home",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.$t("pages.imovelList.title")), 1)
          ]),
          _cache[7] || (_cache[7] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("pages.imovelList.subtitle")), 1),
            createBaseVNode("div", _hoisted_7, [
              createVNode(QBtn, {
                color: "secondary",
                label: _ctx.$t("pages.imovelList.buttons.loadTestData"),
                icon: "dataset",
                onClick: _ctx.loadTestData
              }, null, 8, ["label", "onClick"]),
              createVNode(QBtn, {
                color: "primary",
                label: _ctx.$t("pages.imovelList.buttons.newProperty"),
                icon: "add",
                to: "/imoveis/novo"
              }, null, 8, ["label"])
            ])
          ])
        ])
      ]),
      createVNode(QCard, { class: "q-mb-md" }, {
        default: withCtx(() => [
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_8, [
                createBaseVNode("div", _hoisted_9, [
                  createVNode(QInput, {
                    modelValue: _ctx.filters.search,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.filters.search = $event),
                    label: _ctx.$t("pages.imovelList.filters.search"),
                    dense: "",
                    outlined: "",
                    clearable: "",
                    debounce: "300"
                  }, {
                    append: withCtx(() => [
                      createVNode(QIcon, { name: "search" })
                    ]),
                    _: 1
                  }, 8, ["modelValue", "label"])
                ]),
                createBaseVNode("div", _hoisted_10, [
                  createVNode(QSelect, {
                    modelValue: _ctx.filters.cidade,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.filters.cidade = $event),
                    options: _ctx.cidadeOptions,
                    label: _ctx.$t("pages.imovelList.filters.cidade"),
                    dense: "",
                    outlined: "",
                    clearable: "",
                    "emit-value": "",
                    "map-options": ""
                  }, null, 8, ["modelValue", "options", "label"])
                ]),
                createBaseVNode("div", _hoisted_11, [
                  createVNode(QSelect, {
                    modelValue: _ctx.filters.areaRange,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.filters.areaRange = $event),
                    options: _ctx.areaRangeOptions,
                    label: _ctx.$t("pages.imovelList.filters.areaRange"),
                    dense: "",
                    outlined: "",
                    clearable: "",
                    "emit-value": "",
                    "map-options": ""
                  }, null, 8, ["modelValue", "options", "label"])
                ]),
                createBaseVNode("div", _hoisted_12, [
                  createVNode(QSelect, {
                    modelValue: _ctx.filters.sort,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.filters.sort = $event),
                    options: _ctx.sortOptions,
                    label: _ctx.$t("pages.imovelList.filters.sort"),
                    dense: "",
                    outlined: "",
                    clearable: "",
                    "emit-value": "",
                    "map-options": "",
                    loading: _ctx.loading
                  }, null, 8, ["modelValue", "options", "label", "loading"])
                ])
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QDialog, {
        modelValue: _ctx.testDataDialog,
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.testDataDialog = $event)
      }, {
        default: withCtx(() => [
          createVNode(QCard, { style: { "min-width": "350px" } }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_13, toDisplayString(_ctx.$t("pages.imovelList.messages.loadingTestData")), 1)
                ]),
                _: 1
              }),
              createVNode(QCardSection, { class: "q-pt-none" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("pages.imovelList.messages.loadingTestDataDesc")), 1)
                ]),
                _: 1
              }),
              createVNode(QCardActions, { align: "right" }, {
                default: withCtx(() => [
                  withDirectives(createVNode(QBtn, {
                    flat: "",
                    label: _ctx.$t("pages.imovelList.buttons.cancel"),
                    color: "primary"
                  }, null, 8, ["label"]), [
                    [ClosePopup]
                  ]),
                  withDirectives(createVNode(QBtn, {
                    label: _ctx.$t("pages.imovelList.buttons.confirm"),
                    color: "primary",
                    onClick: _ctx.confirmLoadTestData
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
      }, 8, ["modelValue"]),
      createBaseVNode("div", _hoisted_14, [
        createVNode(QTable, {
          rows: _ctx.filteredImoveis,
          columns: _ctx.columns,
          "row-key": "Id",
          loading: _ctx.loading,
          pagination: _ctx.pagination,
          onRequest: _ctx.onRequest,
          "rows-per-page-options": [10, 20, 50],
          "binary-state-sort": ""
        }, {
          "body-cell-endereco": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_15, toDisplayString(_ctx.formatEndereco(props.row.Endereco)), 1)
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          "body-cell-dono": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_16, [
                  createVNode(QAvatar, {
                    size: "32px",
                    color: "primary",
                    "text-color": "white"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.getInitials(props.row.Dono?.Nome, props.row.Dono?.Sobrenome)), 1)
                    ]),
                    _: 2
                  }, 1024),
                  createBaseVNode("div", _hoisted_17, toDisplayString(props.row.Dono?.Nome) + " " + toDisplayString(props.row.Dono?.Sobrenome), 1)
                ])
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          "body-cell-areaTotal": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(props.row.AreaTotal) + "m² ", 1)
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          "body-cell-comodos": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_18, [
                  createVNode(QChip, {
                    dense: "",
                    size: "sm",
                    color: "primary",
                    "text-color": "white"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(props.row.TotalComodos) + " total ", 1)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(QChip, {
                    dense: "",
                    size: "sm",
                    color: "secondary",
                    "text-color": "white"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(props.row.NumeroQuartos) + " quartos ", 1)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(QChip, {
                    dense: "",
                    size: "sm",
                    color: "accent",
                    "text-color": "white"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(props.row.NumeroBanheiros) + " banheiros ", 1)
                    ]),
                    _: 2
                  }, 1024)
                ])
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          "body-cell-observacao": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                props.row.Observacao ? (openBlock(), createElementBlock("div", _hoisted_19, toDisplayString(props.row.Observacao), 1)) : (openBlock(), createElementBlock("div", _hoisted_20, " - "))
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
                  onClick: ($event) => _ctx.editarImovel(props.row)
                }, {
                  default: withCtx(() => [
                    createVNode(QTooltip, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("pages.imovelList.buttons.edit")), 1)
                      ]),
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
                  onClick: ($event) => _ctx.confirmarExclusao(props.row)
                }, {
                  default: withCtx(() => [
                    createVNode(QTooltip, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("pages.imovelList.buttons.delete")), 1)
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
        }, 8, ["rows", "columns", "loading", "pagination", "onRequest"])
      ]),
      createBaseVNode("div", _hoisted_21, [
        createBaseVNode("div", _hoisted_22, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.filteredImoveis, (imovel) => {
            return openBlock(), createElementBlock("div", {
              key: imovel.Id,
              class: "col-12"
            }, [
              createVNode(QCard, {
                flat: "",
                bordered: ""
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_23, [
                        createVNode(QIcon, {
                          name: "home",
                          size: "32px",
                          color: "primary",
                          class: "q-mr-md"
                        }),
                        createBaseVNode("div", null, [
                          createBaseVNode("div", _hoisted_24, toDisplayString(_ctx.formatEndereco(imovel.Endereco)), 1),
                          createBaseVNode("div", _hoisted_25, toDisplayString(imovel.AreaTotal) + "m² - " + toDisplayString(imovel.TotalComodos) + " cômodos ", 1)
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_26, [
                        createBaseVNode("div", _hoisted_27, [
                          createVNode(QIcon, {
                            name: "person",
                            size: "sm",
                            color: "grey-7",
                            class: "q-mr-sm"
                          }),
                          createVNode(QAvatar, {
                            size: "24px",
                            color: "primary",
                            "text-color": "white",
                            class: "q-mr-sm"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.getInitials(imovel.Dono?.Nome, imovel.Dono?.Sobrenome)), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createTextVNode(" " + toDisplayString(imovel.Dono?.Nome) + " " + toDisplayString(imovel.Dono?.Sobrenome), 1)
                        ]),
                        createBaseVNode("div", _hoisted_28, [
                          createVNode(QIcon, {
                            name: "meeting_room",
                            size: "sm",
                            color: "grey-7",
                            class: "q-mr-sm"
                          }),
                          createBaseVNode("div", _hoisted_29, [
                            createVNode(QChip, {
                              dense: "",
                              size: "sm",
                              color: "primary",
                              "text-color": "white"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(imovel.NumeroQuartos) + " quartos ", 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(QChip, {
                              dense: "",
                              size: "sm",
                              color: "secondary",
                              "text-color": "white"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(imovel.NumeroBanheiros) + " banheiros ", 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(QChip, {
                              dense: "",
                              size: "sm",
                              color: "accent",
                              "text-color": "white"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(imovel.NumeroOutrosComodos) + " outros ", 1)
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ]),
                        imovel.Observacao ? (openBlock(), createElementBlock("div", _hoisted_30, [
                          createVNode(QIcon, {
                            name: "notes",
                            size: "sm",
                            color: "grey-7",
                            class: "q-mr-sm q-mt-xs"
                          }),
                          createBaseVNode("div", _hoisted_31, toDisplayString(imovel.Observacao), 1)
                        ])) : createCommentVNode("", true)
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
                        label: _ctx.$t("pages.imovelList.buttons.edit"),
                        onClick: ($event) => _ctx.editarImovel(imovel)
                      }, null, 8, ["label", "onClick"]),
                      createVNode(QBtn, {
                        flat: "",
                        color: "negative",
                        icon: "delete",
                        label: _ctx.$t("pages.imovelList.buttons.delete"),
                        onClick: ($event) => _ctx.confirmarExclusao(imovel)
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
        createBaseVNode("div", _hoisted_32, [
          createVNode(QPagination, {
            modelValue: _ctx.pagination.page,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.pagination.page = $event),
            max: Math.ceil(_ctx.filteredImoveis.length / _ctx.pagination.rowsPerPage),
            "max-pages": 6,
            "boundary-links": true,
            "direction-links": true,
            input: true
          }, null, 8, ["modelValue", "max"])
        ])
      ]),
      createVNode(QDialog, {
        modelValue: _ctx.dialogExclusao.show,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.dialogExclusao.show = $event),
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
                  createBaseVNode("span", _hoisted_33, toDisplayString(_ctx.$t("pages.imovelList.deleteDialog.title")), 1)
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("pages.imovelList.deleteDialog.message", {
                    endereco: _ctx.dialogExclusao.imovel ? _ctx.formatEndereco(_ctx.dialogExclusao.imovel.Endereco) : ""
                  })), 1)
                ]),
                _: 1
              }),
              createVNode(QCardActions, { align: "right" }, {
                default: withCtx(() => [
                  withDirectives(createVNode(QBtn, {
                    flat: "",
                    label: _ctx.$t("pages.imovelList.buttons.cancel"),
                    color: "primary"
                  }, null, 8, ["label"]), [
                    [ClosePopup]
                  ]),
                  withDirectives(createVNode(QBtn, {
                    flat: "",
                    label: _ctx.$t("pages.imovelList.buttons.confirm"),
                    color: "negative",
                    onClick: _ctx.excluirImovel
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
const ImovelListagemPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c43f8ad5"]]);
export {
  ImovelListagemPage as default
};
//# sourceMappingURL=ImovelListagemPage-C1B1HYPG.js.map
