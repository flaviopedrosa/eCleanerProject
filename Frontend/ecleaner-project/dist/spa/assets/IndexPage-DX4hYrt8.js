import { _ as _export_sfc, a as defineComponent, g as createElementBlock, o as openBlock, e as createVNode, w as withCtx, Q as QIcon, j as createTextVNode, t as toDisplayString, b as useRouter, c as createBlock, r as ref, M as onMounted, U as resolveComponent, f as createBaseVNode, i as QBtn } from "./index-DcwkHxen.js";
import { b as QCardSection, a as QCard, Q as QPage } from "./QPage-BYlIwfOX.js";
import { Q as QItem, a as QItemLabel } from "./QItemLabel-DaKJP7vT.js";
import { C as ClienteRepository } from "./clienteRepository-DQv2uKxa.js";
import { C as ColaboradorRepository } from "./colaboradorRepository-CTGhHmAj.js";
import { E as EquipeRepository } from "./equipeRepository-D3frVbmL.js";
import { S as ScheduleRepository } from "./scheduleRepository-CGXfwnNh.js";
import "./use-dark-XRAlznJ5.js";
import "./imovel-DGbBNfIP.js";
import "./pessoa-CnZ4y1f1.js";
import "./guid-BHuXRmln.js";
import "./colaborador-BV0dUqnP.js";
const _sfc_main$1 = defineComponent({
  name: "EcleanerCard",
  props: {
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: "primary"
    }
  },
  setup(props) {
    const router = useRouter();
    const handleClick = () => {
      router.push(props.url);
    };
    const iconColor = `text-${props.color}`;
    const backgroundClass = `bg-${props.color}`;
    return {
      handleClick,
      iconColor,
      backgroundClass
    };
  }
});
const _hoisted_1$1 = { class: "ecleaner-card-container" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createVNode(QCard, {
      class: "ecleaner-card cursor-pointer bg-primary",
      onClick: _ctx.handleClick,
      flat: ""
    }, {
      default: withCtx(() => [
        createVNode(QCardSection, null, {
          default: withCtx(() => [
            createVNode(QItem, null, {
              default: withCtx(() => [
                createVNode(QIcon, {
                  name: _ctx.icon,
                  size: "9rem",
                  class: "text-white"
                }, null, 8, ["name"])
              ]),
              _: 1
            }),
            createVNode(QItemLabel, { class: "text-h6 text-white text-center" }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.label), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 8, ["onClick"])
  ]);
}
const EcleanerCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-4f39a688"]]);
const _sfc_main = defineComponent({
  name: "IndexPage",
  components: {
    EcleanerCard
  },
  setup() {
    const clientesCount = ref(0);
    const colaboradoresCount = ref(0);
    const schedulesCount = ref(0);
    const equipesCount = ref(0);
    const servicosHojeCount = ref(3);
    const mediaAvaliacoes = ref(4.2);
    const clienteRepository = new ClienteRepository();
    const colaboradorRepository = new ColaboradorRepository();
    const equipeRepository = new EquipeRepository();
    const scheduleRepository = new ScheduleRepository();
    const novoServico = () => {
      console.log("Navegando para novo serviço");
    };
    const loadCounts = async () => {
      try {
        const clientes = await clienteRepository.getAll();
        clientesCount.value = clientes.length;
        const colaboradores = await colaboradorRepository.getAll();
        colaboradoresCount.value = colaboradores.length;
        const schedules = await scheduleRepository.getAll();
        schedulesCount.value = schedules.length;
        const equipes = await equipeRepository.getAll();
        equipesCount.value = equipes.length;
      } catch (error) {
        console.error("Erro ao carregar contagens:", error);
        clientesCount.value = 0;
        colaboradoresCount.value = 0;
        schedulesCount.value = 0;
        equipesCount.value = 0;
      }
    };
    onMounted(() => {
      loadCounts();
    });
    return {
      clientesCount,
      colaboradoresCount,
      schedulesCount,
      equipesCount,
      servicosHojeCount,
      mediaAvaliacoes,
      novoServico
    };
  }
});
const _hoisted_1 = { class: "row items-center q-mb-xl" };
const _hoisted_2 = { class: "col" };
const _hoisted_3 = { class: "row items-center justify-between q-mb-sm" };
const _hoisted_4 = { class: "row items-center" };
const _hoisted_5 = { class: "text-subtitle1 text-grey-7 q-ma-none" };
const _hoisted_6 = {
  id: "ecleaner-home-panels",
  class: "q-pa-md"
};
const _hoisted_7 = { class: "row justify-center q-gutter-y-lg" };
const _hoisted_8 = { class: "col-6 col-sm-3 col-md-3 flex justify-center" };
const _hoisted_9 = { class: "col-6 col-sm-3 col-md-3 flex justify-center" };
const _hoisted_10 = { class: "col-6 col-sm-3 col-md-3 flex justify-center" };
const _hoisted_11 = { class: "col-6 col-sm-3 col-md-3 flex justify-center" };
const _hoisted_12 = { class: "col-6 col-sm-3 col-md-3 flex justify-center" };
const _hoisted_13 = { class: "col-6 col-sm-3 col-md-3 flex justify-center" };
const _hoisted_14 = { class: "col-6 col-sm-3 col-md-3 flex justify-center" };
const _hoisted_15 = { class: "col-6 col-sm-3 col-md-3 flex justify-center" };
const _hoisted_16 = { class: "row q-mt-xl q-gutter-md" };
const _hoisted_17 = { class: "col-12 col-sm-6 col-md-3" };
const _hoisted_18 = { class: "column items-center" };
const _hoisted_19 = { class: "col-12 col-sm-6 col-md-3" };
const _hoisted_20 = { class: "column items-center" };
const _hoisted_21 = { class: "col-12 col-sm-6 col-md-3" };
const _hoisted_22 = { class: "column items-center" };
const _hoisted_23 = { class: "col-12 col-sm-6 col-md-3" };
const _hoisted_24 = { class: "column items-center" };
const _hoisted_25 = { class: "col-12 col-sm-6 col-md-3" };
const _hoisted_26 = { class: "column items-center" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_EcleanerCard = resolveComponent("EcleanerCard");
  return openBlock(), createBlock(QPage, { class: "q-pa-lg" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createVNode(QIcon, {
                name: "home",
                size: "2rem",
                class: "text-secondary q-mr-md"
              }),
              _cache[5] || (_cache[5] = createBaseVNode("h4", { class: "text-h5 q-ma-none text-secondary" }, " Home ", -1))
            ]),
            createBaseVNode("p", _hoisted_5, toDisplayString(_ctx.$t("indexPage.overview")), 1)
          ]),
          _cache[6] || (_cache[6] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1))
        ])
      ]),
      createBaseVNode("div", _hoisted_6, [
        createBaseVNode("div", _hoisted_7, [
          createBaseVNode("div", _hoisted_8, [
            createVNode(_component_EcleanerCard, {
              icon: "person",
              label: "Clientes",
              url: "/clientes"
            })
          ]),
          createBaseVNode("div", _hoisted_9, [
            createVNode(_component_EcleanerCard, {
              icon: "home",
              label: "Imóveis",
              url: "/imoveis"
            })
          ]),
          createBaseVNode("div", _hoisted_10, [
            createVNode(_component_EcleanerCard, {
              icon: "badge",
              label: "Colaboradores",
              url: "/colaboradores"
            })
          ]),
          createBaseVNode("div", _hoisted_11, [
            createVNode(_component_EcleanerCard, {
              icon: "groups",
              label: "Equipes",
              url: "/equipes"
            })
          ]),
          createBaseVNode("div", _hoisted_12, [
            createVNode(_component_EcleanerCard, {
              icon: "cleaning_services",
              label: "Serviços",
              url: "/servicos"
            })
          ]),
          createBaseVNode("div", _hoisted_13, [
            createVNode(_component_EcleanerCard, {
              icon: "inventory_2",
              label: "Materiais",
              url: "/materiais"
            })
          ]),
          createBaseVNode("div", _hoisted_14, [
            createVNode(_component_EcleanerCard, {
              icon: "workspaces",
              label: "Pacotes",
              url: "/pacotes-servicos"
            })
          ]),
          createBaseVNode("div", _hoisted_15, [
            createVNode(_component_EcleanerCard, {
              icon: "request_quote",
              label: "Orçamentos",
              url: "/orcamentos"
            })
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_16, [
        _cache[12] || (_cache[12] = createBaseVNode("div", { class: "col-12" }, [
          createBaseVNode("h5", { class: "text-h5 text-weight-bold q-mb-lg text-grey-8" }, " Ações Rápidas ")
        ], -1)),
        createBaseVNode("div", _hoisted_17, [
          createVNode(QBtn, {
            unelevated: "",
            color: "primary",
            size: "lg",
            class: "full-width q-pa-md",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$router.push("/clientes/novo"))
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_18, [
                createVNode(QIcon, {
                  name: "person_add",
                  size: "2rem",
                  class: "q-mb-sm"
                }),
                _cache[7] || (_cache[7] = createBaseVNode("div", { class: "text-weight-medium" }, "Novo Cliente", -1))
              ])
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_19, [
          createVNode(QBtn, {
            unelevated: "",
            color: "orange",
            size: "lg",
            class: "full-width q-pa-md",
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$router.push("/imoveis/novo"))
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_20, [
                createVNode(QIcon, {
                  name: "home_work",
                  size: "2rem",
                  class: "q-mb-sm"
                }),
                _cache[8] || (_cache[8] = createBaseVNode("div", { class: "text-weight-medium" }, "Novo Imóvel", -1))
              ])
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_21, [
          createVNode(QBtn, {
            unelevated: "",
            color: "secondary",
            size: "lg",
            class: "full-width q-pa-md",
            onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$router.push("/colaboradores/novo"))
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_22, [
                createVNode(QIcon, {
                  name: "badge",
                  size: "2rem",
                  class: "q-mb-sm"
                }),
                _cache[9] || (_cache[9] = createBaseVNode("div", { class: "text-weight-medium" }, "Novo Colaborador", -1))
              ])
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_23, [
          createVNode(QBtn, {
            unelevated: "",
            color: "positive",
            size: "lg",
            class: "full-width q-pa-md",
            onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$router.push("/equipes/novo"))
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_24, [
                createVNode(QIcon, {
                  name: "group_add",
                  size: "2rem",
                  class: "q-mb-sm"
                }),
                _cache[10] || (_cache[10] = createBaseVNode("div", { class: "text-weight-medium" }, "Nova Equipe", -1))
              ])
            ]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_25, [
          createVNode(QBtn, {
            unelevated: "",
            color: "teal",
            size: "lg",
            class: "full-width q-pa-md",
            onClick: _cache[4] || (_cache[4] = ($event) => _ctx.$router.push("/orcamentos/novo"))
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_26, [
                createVNode(QIcon, {
                  name: "request_quote",
                  size: "2rem",
                  class: "q-mb-sm"
                }),
                _cache[11] || (_cache[11] = createBaseVNode("div", { class: "text-weight-medium" }, "Novo Orçamento", -1))
              ])
            ]),
            _: 1
          })
        ])
      ])
    ]),
    _: 1
  });
}
const IndexPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2dddfb3f"]]);
export {
  IndexPage as default
};
//# sourceMappingURL=IndexPage-DX4hYrt8.js.map
