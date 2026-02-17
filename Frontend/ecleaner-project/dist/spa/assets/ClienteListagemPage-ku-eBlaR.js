import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, $ as onMounted, p as computed, A as watch, f as createBaseVNode, e as createVNode, k as QIcon, t as toDisplayString, l as QBtn, Q as QCard, g as QCardSection, j as QInput, m as createTextVNode, h as createElementBlock, aj as Fragment, ak as renderList, i as createCommentVNode, a6 as QAvatar, a7 as QSeparator, au as QCardActions, am as QDialog, a0 as withDirectives } from "./index-C_9ZqZx5.js";
import { Q as QSelect } from "./QSelect-B7UkQpY4.js";
import { Q as QTable, a as QTd } from "./QTable-BAAlFMYu.js";
import { Q as QTooltip } from "./QTooltip-BRNgwqDX.js";
import { Q as QChip } from "./QChip-CQHm52sc.js";
import { Q as QPagination } from "./QPagination-BJZX0xK0.js";
import { Q as QPageSticky } from "./QPageSticky-BUX2f9i9.js";
import { Q as QPage } from "./QPage-BjohE0wt.js";
import { C as ClosePopup } from "./ClosePopup-BrDwQcvw.js";
import { u as useQuasar } from "./use-quasar-RhPDzzvJ.js";
import { C as ClienteRepository } from "./clienteRepository-DQ_hoKdA.js";
import { u as useI18n } from "./vue-i18n.runtime-BcAS3Jju.js";
import "./format-X8mfcfls.js";
import "./QMenu-0ExrfRXY.js";
import "./position-engine-D6xtJVbJ.js";
import "./selection-q6_tzKdx.js";
import "./QList-DrRTzTWV.js";
import "./QLinearProgress-BwVRjKCw.js";
import "./use-fullscreen-BFuhyU9x.js";
import "./imovel-DC67hqHE.js";
import "./pessoa-C98XhDqr.js";
import "./guid-BHuXRmln.js";
const _sfc_main = defineComponent({
  name: "ClienteListagemPage",
  setup() {
    const { t } = useI18n();
    const $q = useQuasar();
    const clienteRepository = new ClienteRepository();
    const loading = ref(false);
    const pagination = ref({
      sortBy: "nome",
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    });
    const filters = ref({
      search: "",
      status: null,
      sort: "nome"
    });
    const dialogExclusao = ref({
      show: false,
      cliente: null
    });
    const clientes = ref([]);
    const loadClientes = async () => {
      try {
        loading.value = true;
        clientes.value = await clienteRepository.getAll();
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
        $q.notify({
          color: "negative",
          message: t("pages.clientList.messages.loadError")
        });
      } finally {
        loading.value = false;
      }
    };
    onMounted(() => {
      loadClientes();
    });
    const statusOptions = [
      { label: t("pages.clientList.status.active"), value: "active" },
      { label: t("pages.clientList.status.inactive"), value: "inactive" }
    ];
    const sortOptions = [
      { label: t("pages.clientList.sort.nameAsc"), value: "nome" },
      { label: t("pages.clientList.sort.nameDesc"), value: "-nome" },
      { label: t("pages.clientList.sort.newest"), value: "-createdAt" },
      { label: t("pages.clientList.sort.oldest"), value: "createdAt" }
    ];
    const columns = [
      {
        name: "nome",
        required: true,
        label: t("pages.clientList.columns.name"),
        align: "left",
        field: (row) => `${row.Nome} ${row.Sobrenome}`,
        sortable: true
      },
      {
        name: "email",
        required: true,
        label: t("pages.clientList.columns.email"),
        align: "left",
        field: "Email",
        sortable: true
      },
      {
        name: "telefones",
        required: false,
        label: t("pages.clientList.columns.phones"),
        align: "left",
        field: (row) => [row.Telefone, row.Celular].filter(Boolean).join(" / ")
      },
      {
        name: "enderecos",
        required: false,
        label: t("pages.clientList.columns.addresses"),
        align: "left",
        style: "max-width: 300px; white-space: normal; word-break: break-word",
        field: (row) => (row.Enderecos || []).map((e) => formatEndereco(e)).join("\n")
      },
      {
        name: "imoveis",
        required: false,
        label: t("pages.clientList.columns.properties"),
        align: "left",
        style: "max-width: 250px; white-space: normal; word-break: break-word",
        field: (row) => formatImoveisInfo(row.Imoveis || [])
      },
      {
        name: "status",
        required: true,
        label: t("pages.clientList.columns.status"),
        align: "left",
        field: "Status",
        sortable: true
      },
      {
        name: "actions",
        required: true,
        label: t("pages.clientList.columns.actions"),
        align: "center"
      }
    ];
    const getInitials = (nome, sobrenome) => {
      return `${nome?.charAt(0) || ""}${sobrenome?.charAt(0) || ""}`.toUpperCase();
    };
    const formatEndereco = (endereco) => {
      if (!endereco) return "";
      const { Logradouro, Numero, Bairro, Cidade, Estado } = endereco;
      return `${Logradouro}, ${Numero} - ${Bairro}, ${Cidade}/${Estado}`;
    };
    const formatImoveisInfo = (imoveis) => {
      if (!imoveis || imoveis.length === 0) return t("pages.clientList.noProperties");
      return imoveis.map((imovel) => {
        const endereco = imovel.Endereco;
        const enderecoFormatado = endereco ? `${endereco.Logradouro}, ${endereco.Numero} - ${endereco.Bairro}` : t("pages.clientList.noAddress");
        return `${imovel.TotalComodos} ${t("pages.clientList.rooms")} - ${enderecoFormatado}`;
      }).join("\n");
    };
    const filteredClients = computed(() => {
      let result = [...clientes.value];
      if (filters.value.search) {
        const searchLower = filters.value.search.toLowerCase();
        result = result.filter(
          (cliente) => cliente.Nome.toLowerCase().includes(searchLower) || cliente.Sobrenome.toLowerCase().includes(searchLower) || cliente.Email.toLowerCase().includes(searchLower)
        );
      }
      if (filters.value.status) {
        result = result.filter((cliente) => cliente.Status === filters.value.status);
      }
      const sortField = filters.value.sort.startsWith("-") ? filters.value.sort.substring(1) : filters.value.sort;
      const sortDesc = filters.value.sort.startsWith("-");
      const pascalCaseField = sortField.charAt(0).toUpperCase() + sortField.slice(1);
      result.sort((a, b) => {
        const valueA = (a[pascalCaseField] || "").toString();
        const valueB = (b[pascalCaseField] || "").toString();
        return sortDesc ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
      });
      return result;
    });
    const onRequest = async (props) => {
      const { sortBy, descending } = props.pagination;
      pagination.value = props.pagination;
      filters.value.sort = descending ? `-${sortBy}` : sortBy;
    };
    watch(filteredClients, (newValue) => {
      pagination.value.rowsNumber = newValue.length;
    });
    const confirmarExclusao = (cliente) => {
      dialogExclusao.value = {
        show: true,
        cliente
      };
    };
    const excluirCliente = async () => {
      const cliente = dialogExclusao.value.cliente;
      if (!cliente) return;
      try {
        await clienteRepository.delete(cliente.Id);
        await loadClientes();
        $q.notify({
          color: "positive",
          message: t("pages.clientList.messages.deleteSuccess")
        });
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        $q.notify({
          color: "negative",
          message: t("pages.clientList.messages.deleteError")
        });
      } finally {
        dialogExclusao.value = {
          show: false,
          cliente: null
        };
      }
    };
    return {
      loading,
      filters,
      statusOptions,
      sortOptions,
      columns,
      pagination,
      dialogExclusao,
      filteredClients,
      getInitials,
      formatEndereco,
      formatImoveisInfo,
      confirmarExclusao,
      excluirCliente,
      clientes,
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
const _hoisted_9 = { class: "col-12 col-md-6" };
const _hoisted_10 = { class: "col-12 col-md-3" };
const _hoisted_11 = { class: "col-12 col-md-3" };
const _hoisted_12 = { class: "gt-sm" };
const _hoisted_13 = { class: "row items-center" };
const _hoisted_14 = ["src", "alt"];
const _hoisted_15 = {
  key: 1,
  class: "bg-primary text-white full-width full-height flex items-center justify-center avatar-fallback"
};
const _hoisted_16 = { class: "q-ml-sm" };
const _hoisted_17 = { class: "address-cell" };
const _hoisted_18 = { class: "properties-cell" };
const _hoisted_19 = {
  key: 0,
  class: "text-grey-6"
};
const _hoisted_20 = { key: 1 };
const _hoisted_21 = {
  key: 0,
  class: "q-mt-sm"
};
const _hoisted_22 = { class: "lt-md" };
const _hoisted_23 = { class: "row q-col-gutter-md" };
const _hoisted_24 = { class: "row items-center q-mb-md" };
const _hoisted_25 = ["src", "alt"];
const _hoisted_26 = {
  key: 1,
  class: "bg-primary text-white full-width full-height flex items-center justify-center avatar-fallback"
};
const _hoisted_27 = { class: "text-weight-medium" };
const _hoisted_28 = { class: "q-gutter-y-sm" };
const _hoisted_29 = { class: "row items-center" };
const _hoisted_30 = {
  key: 0,
  class: "row items-center"
};
const _hoisted_31 = { class: "row items-start" };
const _hoisted_32 = { class: "col" };
const _hoisted_33 = {
  key: 1,
  class: "row items-start"
};
const _hoisted_34 = { class: "col" };
const _hoisted_35 = {
  key: 0,
  class: "q-mt-sm"
};
const _hoisted_36 = { class: "row justify-center q-mt-md" };
const _hoisted_37 = { class: "q-ml-sm" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "q-pa-lg" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(QIcon, {
              name: "people",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.$t("pages.clientList.title")), 1)
          ]),
          _cache[5] || (_cache[5] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("pages.clientList.subtitle")), 1),
            createBaseVNode("div", _hoisted_7, [
              createVNode(QBtn, {
                class: "gt-sm",
                color: "positive",
                label: _ctx.$t("pages.clientList.buttons.newClient"),
                icon: "add",
                to: "/clientes/novo"
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
                    label: _ctx.$t("pages.clientList.filters.search"),
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
                    modelValue: _ctx.filters.status,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.filters.status = $event),
                    options: _ctx.statusOptions,
                    label: _ctx.$t("pages.clientList.filters.status"),
                    dense: "",
                    outlined: "",
                    clearable: "",
                    "emit-value": "",
                    "map-options": ""
                  }, null, 8, ["modelValue", "options", "label"])
                ]),
                createBaseVNode("div", _hoisted_11, [
                  createVNode(QSelect, {
                    modelValue: _ctx.filters.sort,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.filters.sort = $event),
                    options: _ctx.sortOptions,
                    label: _ctx.$t("pages.clientList.filters.sort"),
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
      createBaseVNode("div", _hoisted_12, [
        createVNode(QTable, {
          rows: _ctx.filteredClients,
          columns: _ctx.columns,
          "row-key": "Id",
          loading: _ctx.loading,
          pagination: _ctx.pagination,
          onRequest: _ctx.onRequest,
          "rows-per-page-options": [10, 20, 50],
          "binary-state-sort": ""
        }, {
          "body-cell-nome": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_13, [
                  createVNode(QAvatar, {
                    size: "32px",
                    class: "q-mr-sm"
                  }, {
                    default: withCtx(() => [
                      props.row.Foto ? (openBlock(), createElementBlock("img", {
                        key: 0,
                        src: props.row.Foto,
                        alt: props.row.Nome,
                        style: { "object-fit": "cover", "width": "100%", "height": "100%" }
                      }, null, 8, _hoisted_14)) : (openBlock(), createElementBlock("div", _hoisted_15, toDisplayString(_ctx.getInitials(props.row.Nome, props.row.Sobrenome)), 1))
                    ]),
                    _: 2
                  }, 1024),
                  createBaseVNode("div", _hoisted_16, toDisplayString(props.row.Nome) + " " + toDisplayString(props.row.Sobrenome), 1)
                ])
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          "body-cell-enderecos": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_17, toDisplayString(props.row.Enderecos?.map((e) => _ctx.formatEndereco(e))?.join("\n") || "-"), 1)
              ]),
              _: 2
            }, 1032, ["props"])
          ]),
          "body-cell-imoveis": withCtx((props) => [
            createVNode(QTd, { props }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_18, [
                  !props.row.Imoveis || props.row.Imoveis.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_19, toDisplayString(_ctx.$t("pages.clientList.noProperties")), 1)) : (openBlock(), createElementBlock("div", _hoisted_20, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(props.row.Imoveis, (imovel, index) => {
                      return openBlock(), createBlock(QChip, {
                        key: index,
                        dense: "",
                        size: "sm",
                        color: "green-1",
                        "text-color": "green-8",
                        class: "q-ma-none q-mr-xs q-mb-xs"
                      }, {
                        default: withCtx(() => [
                          createVNode(QIcon, {
                            name: "home",
                            size: "xs",
                            class: "q-mr-xs"
                          }),
                          createTextVNode(" " + toDisplayString(imovel.TotalComodos) + " " + toDisplayString(_ctx.$t("pages.clientList.rooms")) + " ", 1),
                          createVNode(QTooltip, null, {
                            default: withCtx(() => [
                              createBaseVNode("div", null, [
                                createBaseVNode("strong", null, toDisplayString(_ctx.$t("pages.clientList.propertyDetails")) + ":", 1),
                                _cache[7] || (_cache[7] = createBaseVNode("br", null, null, -1)),
                                createTextVNode(" " + toDisplayString(_ctx.$t("pages.clientList.totalRooms")) + ": " + toDisplayString(imovel.TotalComodos), 1),
                                _cache[8] || (_cache[8] = createBaseVNode("br", null, null, -1)),
                                createTextVNode(" " + toDisplayString(_ctx.$t("pages.clientList.bedrooms")) + ": " + toDisplayString(imovel.NumeroQuartos || 0), 1),
                                _cache[9] || (_cache[9] = createBaseVNode("br", null, null, -1)),
                                createTextVNode(" " + toDisplayString(_ctx.$t("pages.clientList.bathrooms")) + ": " + toDisplayString(imovel.NumeroBanheiros || 0), 1),
                                _cache[10] || (_cache[10] = createBaseVNode("br", null, null, -1)),
                                createBaseVNode("strong", null, toDisplayString(_ctx.$t("pages.clientList.address")) + ":", 1),
                                _cache[11] || (_cache[11] = createBaseVNode("br", null, null, -1)),
                                createTextVNode(" " + toDisplayString(imovel.Endereco ? _ctx.formatEndereco(imovel.Endereco) : _ctx.$t("pages.clientList.noAddress")) + " ", 1),
                                imovel.Observacao ? (openBlock(), createElementBlock("div", _hoisted_21, [
                                  createBaseVNode("strong", null, toDisplayString(_ctx.$t("pages.clientList.observations")) + ":", 1),
                                  _cache[6] || (_cache[6] = createBaseVNode("br", null, null, -1)),
                                  createTextVNode(" " + toDisplayString(imovel.Observacao), 1)
                                ])) : createCommentVNode("", true)
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ]))
                ])
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
                  to: "/clientes/" + props.row.Id + "/editar"
                }, {
                  default: withCtx(() => [
                    createVNode(QTooltip, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("pages.clientList.buttons.edit")), 1)
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
                  onClick: ($event) => _ctx.confirmarExclusao(props.row)
                }, {
                  default: withCtx(() => [
                    createVNode(QTooltip, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("pages.clientList.buttons.delete")), 1)
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
      createBaseVNode("div", _hoisted_22, [
        createBaseVNode("div", _hoisted_23, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.filteredClients, (cliente) => {
            return openBlock(), createElementBlock("div", {
              key: cliente.Id,
              class: "col-12"
            }, [
              createVNode(QCard, {
                flat: "",
                bordered: ""
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_24, [
                        createVNode(QAvatar, {
                          size: "48px",
                          class: "q-mr-md"
                        }, {
                          default: withCtx(() => [
                            cliente.Foto ? (openBlock(), createElementBlock("img", {
                              key: 0,
                              src: cliente.Foto,
                              alt: cliente.Nome,
                              style: { "object-fit": "cover", "width": "100%", "height": "100%" }
                            }, null, 8, _hoisted_25)) : (openBlock(), createElementBlock("div", _hoisted_26, toDisplayString(_ctx.getInitials(cliente.Nome, cliente.Sobrenome)), 1))
                          ]),
                          _: 2
                        }, 1024),
                        createBaseVNode("div", _hoisted_27, toDisplayString(cliente.Nome) + " " + toDisplayString(cliente.Sobrenome), 1)
                      ]),
                      createBaseVNode("div", _hoisted_28, [
                        createBaseVNode("div", _hoisted_29, [
                          createVNode(QIcon, {
                            name: "email",
                            size: "sm",
                            color: "grey-7",
                            class: "q-mr-sm"
                          }),
                          createTextVNode(" " + toDisplayString(cliente.Email), 1)
                        ]),
                        cliente.Telefone || cliente.Celular ? (openBlock(), createElementBlock("div", _hoisted_30, [
                          createVNode(QIcon, {
                            name: "phone",
                            size: "sm",
                            color: "grey-7",
                            class: "q-mr-sm"
                          }),
                          createTextVNode(" " + toDisplayString([cliente.Telefone, cliente.Celular].filter(Boolean).join(" / ")), 1)
                        ])) : createCommentVNode("", true),
                        createBaseVNode("div", _hoisted_31, [
                          createVNode(QIcon, {
                            name: "place",
                            size: "sm",
                            color: "grey-7",
                            class: "q-mr-sm q-mt-xs"
                          }),
                          createBaseVNode("div", _hoisted_32, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(cliente.Enderecos, (endereco, index) => {
                              return openBlock(), createBlock(QChip, {
                                key: index,
                                dense: "",
                                size: "sm",
                                class: "q-ma-none q-mr-xs q-mb-xs"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.formatEndereco(endereco)), 1)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ])
                        ]),
                        cliente.Imoveis && cliente.Imoveis.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_33, [
                          createVNode(QIcon, {
                            name: "home",
                            size: "sm",
                            color: "grey-7",
                            class: "q-mr-sm q-mt-xs"
                          }),
                          createBaseVNode("div", _hoisted_34, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(cliente.Imoveis, (imovel, index) => {
                              return openBlock(), createBlock(QChip, {
                                key: index,
                                dense: "",
                                size: "sm",
                                color: "green-1",
                                "text-color": "green-8",
                                class: "q-ma-none q-mr-xs q-mb-xs"
                              }, {
                                default: withCtx(() => [
                                  createVNode(QIcon, {
                                    name: "home",
                                    size: "xs",
                                    class: "q-mr-xs"
                                  }),
                                  createTextVNode(" " + toDisplayString(imovel.TotalComodos) + " " + toDisplayString(_ctx.$t("pages.clientList.rooms")) + " ", 1),
                                  createVNode(QTooltip, null, {
                                    default: withCtx(() => [
                                      createBaseVNode("div", null, [
                                        createBaseVNode("strong", null, toDisplayString(_ctx.$t("pages.clientList.propertyDetails")) + ":", 1),
                                        _cache[13] || (_cache[13] = createBaseVNode("br", null, null, -1)),
                                        createTextVNode(" " + toDisplayString(_ctx.$t("pages.clientList.totalRooms")) + ": " + toDisplayString(imovel.TotalComodos), 1),
                                        _cache[14] || (_cache[14] = createBaseVNode("br", null, null, -1)),
                                        createTextVNode(" " + toDisplayString(_ctx.$t("pages.clientList.bedrooms")) + ": " + toDisplayString(imovel.NumeroQuartos || 0), 1),
                                        _cache[15] || (_cache[15] = createBaseVNode("br", null, null, -1)),
                                        createTextVNode(" " + toDisplayString(_ctx.$t("pages.clientList.bathrooms")) + ": " + toDisplayString(imovel.NumeroBanheiros || 0), 1),
                                        _cache[16] || (_cache[16] = createBaseVNode("br", null, null, -1)),
                                        createBaseVNode("strong", null, toDisplayString(_ctx.$t("pages.clientList.address")) + ":", 1),
                                        _cache[17] || (_cache[17] = createBaseVNode("br", null, null, -1)),
                                        createTextVNode(" " + toDisplayString(imovel.Endereco ? _ctx.formatEndereco(imovel.Endereco) : _ctx.$t("pages.clientList.noAddress")) + " ", 1),
                                        imovel.Observacao ? (openBlock(), createElementBlock("div", _hoisted_35, [
                                          createBaseVNode("strong", null, toDisplayString(_ctx.$t("pages.clientList.observations")) + ":", 1),
                                          _cache[12] || (_cache[12] = createBaseVNode("br", null, null, -1)),
                                          createTextVNode(" " + toDisplayString(imovel.Observacao), 1)
                                        ])) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ])
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
                        label: _ctx.$t("pages.clientList.buttons.edit"),
                        to: "/clientes/" + cliente.Id + "/editar"
                      }, null, 8, ["label", "to"]),
                      createVNode(QBtn, {
                        flat: "",
                        color: "negative",
                        icon: "delete",
                        label: _ctx.$t("pages.clientList.buttons.delete"),
                        onClick: ($event) => _ctx.confirmarExclusao(cliente)
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
        createBaseVNode("div", _hoisted_36, [
          createVNode(QPagination, {
            modelValue: _ctx.pagination.page,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.pagination.page = $event),
            max: Math.ceil(_ctx.filteredClients.length / _ctx.pagination.rowsPerPage),
            "max-pages": 6,
            "boundary-links": true,
            "direction-links": true,
            input: true
          }, null, 8, ["modelValue", "max"])
        ])
      ]),
      createVNode(QDialog, {
        modelValue: _ctx.dialogExclusao.show,
        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.dialogExclusao.show = $event),
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
                  createBaseVNode("span", _hoisted_37, toDisplayString(_ctx.$t("pages.clientList.deleteDialog.title")), 1)
                ]),
                _: 1
              }),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("pages.clientList.deleteDialog.message", { name: _ctx.dialogExclusao.cliente?.nome })), 1)
                ]),
                _: 1
              }),
              createVNode(QCardActions, { align: "right" }, {
                default: withCtx(() => [
                  withDirectives(createVNode(QBtn, {
                    flat: "",
                    label: _ctx.$t("pages.clientList.buttons.cancel"),
                    color: "primary"
                  }, null, 8, ["label"]), [
                    [ClosePopup]
                  ]),
                  withDirectives(createVNode(QBtn, {
                    flat: "",
                    label: _ctx.$t("pages.clientList.buttons.confirm"),
                    color: "negative",
                    onClick: _ctx.excluirCliente
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
      createVNode(QPageSticky, {
        position: "bottom-right",
        offset: [18, 18],
        class: "lt-md"
      }, {
        default: withCtx(() => [
          createVNode(QBtn, {
            fab: "",
            icon: "add",
            color: "positive",
            to: "/clientes/novo"
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const ClienteListagemPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ClienteListagemPage as default
};
//# sourceMappingURL=ClienteListagemPage-ku-eBlaR.js.map
