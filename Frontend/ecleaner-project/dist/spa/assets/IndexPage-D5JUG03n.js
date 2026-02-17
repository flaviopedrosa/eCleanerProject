import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, $ as onMounted, b as useRouter, f as createBaseVNode, e as createVNode, k as QIcon, m as createTextVNode, t as toDisplayString, h as createElementBlock, aj as Fragment, ak as renderList, al as normalizeStyle, l as QBtn, am as QDialog, Q as QCard, g as QCardSection } from "./index-C_9ZqZx5.js";
import { Q as QTooltip } from "./QTooltip-BRNgwqDX.js";
import { Q as QPageSticky } from "./QPageSticky-BUX2f9i9.js";
import { Q as QPage } from "./QPage-BjohE0wt.js";
import { C as ClienteRepository } from "./clienteRepository-DQ_hoKdA.js";
import { C as ColaboradorRepository } from "./colaboradorRepository-DatlZTxI.js";
import { E as EquipeRepository } from "./equipeRepository-Cy9UNbRy.js";
import { S as ScheduleRepository } from "./scheduleRepository-9ggOHHcI.js";
import { u as useI18n } from "./vue-i18n.runtime-BcAS3Jju.js";
import "./position-engine-D6xtJVbJ.js";
import "./selection-q6_tzKdx.js";
import "./imovel-DC67hqHE.js";
import "./pessoa-C98XhDqr.js";
import "./guid-BHuXRmln.js";
import "./colaborador-OpPhEqDl.js";
const _sfc_main = defineComponent({
  name: "IndexPage",
  setup() {
    const router = useRouter();
    const { t } = useI18n();
    const showQuickMenu = ref(false);
    const cardsModulos = ref([
      { id: 1, icon: "person", label: t("indexPage.cards.clientes"), url: "/clientes" },
      { id: 2, icon: "home", label: t("indexPage.cards.imoveis"), url: "/imoveis" },
      { id: 3, icon: "badge", label: t("indexPage.cards.colaboradores"), url: "/colaboradores" },
      { id: 4, icon: "groups", label: t("indexPage.cards.equipes"), url: "/equipes" },
      { id: 5, icon: "cleaning_services", label: t("indexPage.cards.servicos"), url: "/servicos" },
      { id: 6, icon: "inventory_2", label: t("indexPage.cards.materiais"), url: "/materiais" },
      { id: 7, icon: "construction", label: t("indexPage.cards.equipamentos"), url: "/equipamentos" },
      { id: 8, icon: "workspaces", label: t("indexPage.cards.pacotes"), url: "/pacotes-servicos" },
      { id: 9, icon: "request_quote", label: t("indexPage.cards.orcamentos"), url: "/orcamentos" }
    ]);
    const acoesRapidas = ref([
      {
        id: 1,
        icon: "person_add",
        label: t("indexPage.actions.novoCliente"),
        color: "primary",
        route: "/clientes/novo"
      },
      {
        id: 2,
        icon: "home_work",
        label: t("indexPage.actions.novoImovel"),
        color: "primary",
        route: "/imoveis/novo"
      },
      {
        id: 3,
        icon: "badge",
        label: t("indexPage.actions.novoColaborador"),
        color: "primary",
        route: "/colaboradores/novo"
      },
      {
        id: 4,
        icon: "group_add",
        label: t("indexPage.actions.novaEquipe"),
        color: "primary",
        route: "/equipes/novo"
      },
      {
        id: 5,
        icon: "request_quote",
        label: t("indexPage.actions.novoOrcamento"),
        color: "primary",
        route: "/orcamentos/novo"
      },
      {
        id: 6,
        icon: "cleaning_services",
        label: t("indexPage.actions.novoServico"),
        color: "primary",
        route: "/servicos/novo"
      },
      {
        id: 7,
        icon: "inventory_2",
        label: t("indexPage.actions.novoMaterial"),
        color: "primary",
        route: "/materiais/novo"
      },
      {
        id: 8,
        icon: "construction",
        label: t("indexPage.actions.novoEquipamento"),
        color: "primary",
        route: "/equipamentos/novo"
      },
      {
        id: 9,
        icon: "workspaces",
        label: t("indexPage.actions.novoPacote"),
        color: "primary",
        route: "/pacotes-servicos/novo"
      }
    ]);
    const navegarPara = (route) => {
      router.push(route);
    };
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
      t,
      cardsModulos,
      acoesRapidas,
      navegarPara,
      clientesCount,
      colaboradoresCount,
      schedulesCount,
      equipesCount,
      servicosHojeCount,
      mediaAvaliacoes,
      novoServico,
      showQuickMenu
    };
  }
});
const _hoisted_1 = { class: "modern-header q-mb-xl" };
const _hoisted_2 = { class: "header-content" };
const _hoisted_3 = { class: "row items-center justify-between" };
const _hoisted_4 = { class: "col-12 col-md-8" };
const _hoisted_5 = { class: "header-main" };
const _hoisted_6 = { class: "icon-wrapper" };
const _hoisted_7 = { class: "icon-background" };
const _hoisted_8 = { class: "header-text" };
const _hoisted_9 = { class: "header-title" };
const _hoisted_10 = { class: "header-subtitle" };
const _hoisted_11 = { class: "col-12 col-md-4" };
const _hoisted_12 = { class: "stats-cards" };
const _hoisted_13 = { class: "stat-card primary" };
const _hoisted_14 = { class: "stat-icon" };
const _hoisted_15 = { class: "stat-content" };
const _hoisted_16 = { class: "stat-number" };
const _hoisted_17 = { class: "stat-card secondary" };
const _hoisted_18 = { class: "stat-icon" };
const _hoisted_19 = { class: "stat-content" };
const _hoisted_20 = { class: "stat-number" };
const _hoisted_21 = { class: "modules-section" };
const _hoisted_22 = { class: "section-header q-mb-lg" };
const _hoisted_23 = { class: "section-title" };
const _hoisted_24 = { class: "modules-grid" };
const _hoisted_25 = ["onClick"];
const _hoisted_26 = { class: "module-icon-wrapper" };
const _hoisted_27 = { class: "module-label" };
const _hoisted_28 = { class: "module-arrow" };
const _hoisted_29 = { class: "actions-section" };
const _hoisted_30 = { class: "section-header q-mb-lg" };
const _hoisted_31 = { class: "section-title" };
const _hoisted_32 = { class: "actions-grid" };
const _hoisted_33 = ["onClick"];
const _hoisted_34 = { class: "action-icon-wrapper" };
const _hoisted_35 = { class: "action-label" };
const _hoisted_36 = { class: "text-h6 q-mb-md" };
const _hoisted_37 = { class: "row q-gutter-sm" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "q-pa-lg" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("div", _hoisted_6, [
                  createBaseVNode("div", _hoisted_7, [
                    createVNode(QIcon, {
                      name: "dashboard",
                      size: "2.5rem",
                      class: "header-icon"
                    })
                  ]),
                  _cache[2] || (_cache[2] = createBaseVNode("div", { class: "icon-glow" }, null, -1))
                ]),
                createBaseVNode("div", _hoisted_8, [
                  createBaseVNode("h3", _hoisted_9, [
                    createTextVNode(toDisplayString(_ctx.$t("indexPage.title") || "Dashboard") + " ", 1),
                    _cache[3] || (_cache[3] = createBaseVNode("span", { class: "title-accent" }, "eCleannear", -1))
                  ]),
                  createBaseVNode("p", _hoisted_10, toDisplayString(_ctx.$t("indexPage.overview") || "Visão geral do sistema"), 1),
                  _cache[4] || (_cache[4] = createBaseVNode("div", { class: "header-divider" }, null, -1))
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_11, [
              createBaseVNode("div", _hoisted_12, [
                createBaseVNode("div", _hoisted_13, [
                  createBaseVNode("div", _hoisted_14, [
                    createVNode(QIcon, {
                      name: "people",
                      size: "1.5rem"
                    })
                  ]),
                  createBaseVNode("div", _hoisted_15, [
                    createBaseVNode("div", _hoisted_16, toDisplayString(_ctx.clientesCount), 1),
                    _cache[5] || (_cache[5] = createBaseVNode("div", { class: "stat-label" }, "Clientes", -1))
                  ])
                ]),
                createBaseVNode("div", _hoisted_17, [
                  createBaseVNode("div", _hoisted_18, [
                    createVNode(QIcon, {
                      name: "badge",
                      size: "1.5rem"
                    })
                  ]),
                  createBaseVNode("div", _hoisted_19, [
                    createBaseVNode("div", _hoisted_20, toDisplayString(_ctx.colaboradoresCount), 1),
                    _cache[6] || (_cache[6] = createBaseVNode("div", { class: "stat-label" }, "Colaboradores", -1))
                  ])
                ])
              ])
            ])
          ])
        ])
      ]),
      createBaseVNode("div", _hoisted_21, [
        createBaseVNode("div", _hoisted_22, [
          createBaseVNode("h5", _hoisted_23, [
            createVNode(QIcon, {
              name: "apps",
              class: "q-mr-sm"
            }),
            createTextVNode(" " + toDisplayString(_ctx.$t("indexPage.modules") || "Módulos"), 1)
          ]),
          _cache[7] || (_cache[7] = createBaseVNode("div", { class: "section-divider" }, null, -1))
        ]),
        createBaseVNode("div", _hoisted_24, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.cardsModulos, (card, index) => {
            return openBlock(), createElementBlock("div", {
              key: card.id,
              class: "module-card-wrapper",
              style: normalizeStyle({ animationDelay: `${index * 0.1}s` })
            }, [
              createBaseVNode("div", {
                class: "module-card",
                onClick: ($event) => _ctx.navegarPara(card.url)
              }, [
                createBaseVNode("div", _hoisted_26, [
                  createVNode(QIcon, {
                    name: card.icon,
                    size: "2rem",
                    class: "module-icon"
                  }, null, 8, ["name"])
                ]),
                createBaseVNode("div", _hoisted_27, toDisplayString(card.label), 1),
                createBaseVNode("div", _hoisted_28, [
                  createVNode(QIcon, {
                    name: "arrow_forward",
                    size: "1rem"
                  })
                ])
              ], 8, _hoisted_25)
            ], 4);
          }), 128))
        ])
      ]),
      createBaseVNode("div", _hoisted_29, [
        createBaseVNode("div", _hoisted_30, [
          createBaseVNode("h5", _hoisted_31, [
            createVNode(QIcon, {
              name: "flash_on",
              class: "q-mr-sm"
            }),
            createTextVNode(" " + toDisplayString(_ctx.$t("indexPage.quickActions") || "Ações Rápidas"), 1)
          ]),
          _cache[8] || (_cache[8] = createBaseVNode("div", { class: "section-divider" }, null, -1))
        ]),
        createBaseVNode("div", _hoisted_32, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.acoesRapidas, (acao, index) => {
            return openBlock(), createElementBlock("div", {
              key: acao.id,
              class: "action-card-wrapper",
              style: normalizeStyle({ animationDelay: `${index * 0.05}s` })
            }, [
              createBaseVNode("div", {
                class: "action-card",
                onClick: ($event) => _ctx.navegarPara(acao.route)
              }, [
                createBaseVNode("div", _hoisted_34, [
                  createVNode(QIcon, {
                    name: acao.icon,
                    size: "1.5rem",
                    class: "action-icon"
                  }, null, 8, ["name"])
                ]),
                createBaseVNode("div", _hoisted_35, toDisplayString(acao.label), 1)
              ], 8, _hoisted_33)
            ], 4);
          }), 128))
        ])
      ]),
      createVNode(QPageSticky, {
        position: "bottom-right",
        offset: [18, 18]
      }, {
        default: withCtx(() => [
          createVNode(QBtn, {
            fab: "",
            icon: "add",
            color: "primary",
            class: "floating-btn",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.showQuickMenu = !_ctx.showQuickMenu)
          }, {
            default: withCtx(() => [
              createVNode(QTooltip, null, {
                default: withCtx(() => [..._cache[9] || (_cache[9] = [
                  createTextVNode("Adicionar novo", -1)
                ])]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QDialog, {
        modelValue: _ctx.showQuickMenu,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.showQuickMenu = $event),
        position: "bottom"
      }, {
        default: withCtx(() => [
          createVNode(QCard, { class: "quick-menu-card" }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_36, [
                    createVNode(QIcon, {
                      name: "add_circle_outline",
                      class: "q-mr-sm"
                    }),
                    _cache[10] || (_cache[10] = createTextVNode(" Criar Novo ", -1))
                  ]),
                  createBaseVNode("div", _hoisted_37, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.acoesRapidas.slice(0, 4), (acao) => {
                      return openBlock(), createBlock(QBtn, {
                        key: acao.id,
                        icon: acao.icon,
                        label: acao.label,
                        color: "primary",
                        outline: "",
                        size: "sm",
                        class: "col",
                        onClick: ($event) => {
                          _ctx.navegarPara(acao.route);
                          _ctx.showQuickMenu = false;
                        }
                      }, null, 8, ["icon", "label", "onClick"]);
                    }), 128))
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
const IndexPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9ba15a00"]]);
export {
  IndexPage as default
};
//# sourceMappingURL=IndexPage-D5JUG03n.js.map
