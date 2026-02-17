import { E as createDirective, F as cleanEvt, G as client, H as preventDraggable, I as noop, J as addEvt, P as stopAndPrevent, K as position, O as leftClick, v as getCurrentInstance, V as useTimeout, r as ref, p as computed, A as watch, q as h, an as Transition, ao as getNormalizedVNodes, s as hSlot, ap as KeepAlive, n as createComponent, S as useDarkProps, U as useDark, aq as isNumber, $ as onMounted, B as onBeforeUnmount, a1 as hDir, l as QBtn, a3 as hMergeSlot, _ as _export_sfc, c as createBlock, o as openBlock, w as withCtx, a4 as useRoute, b as useRouter, f as createBaseVNode, e as createVNode, k as QIcon, t as toDisplayString, Q as QCard, g as QCardSection, m as createTextVNode, a6 as QAvatar, h as createElementBlock, i as createCommentVNode, j as QInput, aj as Fragment, ak as renderList, ar as QCheckbox, as as withModifiers, a0 as withDirectives, at as vShow } from "./index-C_9ZqZx5.js";
import { Q as QFile } from "./QFile-DirlnN7h.js";
import { a as QItemSection, c as QItemLabel } from "./format-X8mfcfls.js";
import { Q as QSpace } from "./QSpace-CN10jCLy.js";
import { Q as QExpansionItem } from "./QExpansionItem-BPdw40_F.js";
import { Q as QLinearProgress } from "./QLinearProgress-BwVRjKCw.js";
import { g as getModifierDirections, s as shouldStart } from "./touch-BscSWsHh.js";
import { c as clearSelection } from "./selection-q6_tzKdx.js";
import { u as useRenderCache } from "./use-render-cache-DRJWLz-b.js";
import { Q as QImg } from "./QImg-DiYq_5sI.js";
import { u as useFullscreenEmits, a as useFullscreenProps, b as useFullscreen } from "./use-fullscreen-BFuhyU9x.js";
import { Q as QForm } from "./QForm-BkJeMJ2y.js";
import { Q as QPage } from "./QPage-BjohE0wt.js";
import { u as useQuasar } from "./use-quasar-RhPDzzvJ.js";
import { C as Cliente, I as Imovel } from "./imovel-DC67hqHE.js";
import { E as Endereco } from "./pessoa-C98XhDqr.js";
import { g as gerarGuid } from "./guid-BHuXRmln.js";
import { C as ClienteRepository, I as ImovelRepository } from "./clienteRepository-DQ_hoKdA.js";
import { u as useI18n } from "./vue-i18n.runtime-BcAS3Jju.js";
import "./QChip-CQHm52sc.js";
function parseArg(arg) {
  const data = [0.06, 6, 50];
  if (typeof arg === "string" && arg.length) {
    arg.split(":").forEach((val, index) => {
      const v = parseFloat(val);
      v && (data[index] = v);
    });
  }
  return data;
}
const TouchSwipe = createDirective(
  {
    name: "touch-swipe",
    beforeMount(el, { value, arg, modifiers }) {
      if (modifiers.mouse !== true && client.has.touch !== true) return;
      const mouseCapture = modifiers.mouseCapture === true ? "Capture" : "";
      const ctx = {
        handler: value,
        sensitivity: parseArg(arg),
        direction: getModifierDirections(modifiers),
        noop,
        mouseStart(evt) {
          if (shouldStart(evt, ctx) && leftClick(evt)) {
            addEvt(ctx, "temp", [
              [document, "mousemove", "move", `notPassive${mouseCapture}`],
              [document, "mouseup", "end", "notPassiveCapture"]
            ]);
            ctx.start(evt, true);
          }
        },
        touchStart(evt) {
          if (shouldStart(evt, ctx)) {
            const target = evt.target;
            addEvt(ctx, "temp", [
              [target, "touchmove", "move", "notPassiveCapture"],
              [target, "touchcancel", "end", "notPassiveCapture"],
              [target, "touchend", "end", "notPassiveCapture"]
            ]);
            ctx.start(evt);
          }
        },
        start(evt, mouseEvent) {
          client.is.firefox === true && preventDraggable(el, true);
          const pos = position(evt);
          ctx.event = {
            x: pos.left,
            y: pos.top,
            time: Date.now(),
            mouse: mouseEvent === true,
            dir: false
          };
        },
        move(evt) {
          if (ctx.event === void 0) return;
          if (ctx.event.dir !== false) {
            stopAndPrevent(evt);
            return;
          }
          const time = Date.now() - ctx.event.time;
          if (time === 0) return;
          const pos = position(evt), distX = pos.left - ctx.event.x, absX = Math.abs(distX), distY = pos.top - ctx.event.y, absY = Math.abs(distY);
          if (ctx.event.mouse !== true) {
            if (absX < ctx.sensitivity[1] && absY < ctx.sensitivity[1]) {
              ctx.end(evt);
              return;
            }
          } else if (window.getSelection().toString() !== "") {
            ctx.end(evt);
            return;
          } else if (absX < ctx.sensitivity[2] && absY < ctx.sensitivity[2]) {
            return;
          }
          const velX = absX / time, velY = absY / time;
          if (ctx.direction.vertical === true && absX < absY && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = distY < 0 ? "up" : "down";
          }
          if (ctx.direction.horizontal === true && absX > absY && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = distX < 0 ? "left" : "right";
          }
          if (ctx.direction.up === true && absX < absY && distY < 0 && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = "up";
          }
          if (ctx.direction.down === true && absX < absY && distY > 0 && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = "down";
          }
          if (ctx.direction.left === true && absX > absY && distX < 0 && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = "left";
          }
          if (ctx.direction.right === true && absX > absY && distX > 0 && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = "right";
          }
          if (ctx.event.dir !== false) {
            stopAndPrevent(evt);
            if (ctx.event.mouse === true) {
              document.body.classList.add("no-pointer-events--children");
              document.body.classList.add("non-selectable");
              clearSelection();
              ctx.styleCleanup = (withDelay) => {
                ctx.styleCleanup = void 0;
                document.body.classList.remove("non-selectable");
                const remove = () => {
                  document.body.classList.remove("no-pointer-events--children");
                };
                if (withDelay === true) {
                  setTimeout(remove, 50);
                } else {
                  remove();
                }
              };
            }
            ctx.handler({
              evt,
              touch: ctx.event.mouse !== true,
              mouse: ctx.event.mouse,
              direction: ctx.event.dir,
              duration: time,
              distance: {
                x: absX,
                y: absY
              }
            });
          } else {
            ctx.end(evt);
          }
        },
        end(evt) {
          if (ctx.event === void 0) return;
          cleanEvt(ctx, "temp");
          client.is.firefox === true && preventDraggable(el, false);
          ctx.styleCleanup?.(true);
          if (evt !== void 0 && ctx.event.dir !== false) stopAndPrevent(evt);
          ctx.event = void 0;
        }
      };
      el.__qtouchswipe = ctx;
      if (modifiers.mouse === true) {
        const capture = modifiers.mouseCapture === true || modifiers.mousecapture === true ? "Capture" : "";
        addEvt(ctx, "main", [
          [el, "mousedown", "mouseStart", `passive${capture}`]
        ]);
      }
      client.has.touch === true && addEvt(ctx, "main", [
        [el, "touchstart", "touchStart", `passive${modifiers.capture === true ? "Capture" : ""}`],
        [el, "touchmove", "noop", "notPassiveCapture"]
        // cannot be passive (ex: iOS scroll)
      ]);
    },
    updated(el, bindings) {
      const ctx = el.__qtouchswipe;
      if (ctx !== void 0) {
        if (bindings.oldValue !== bindings.value) {
          typeof bindings.value !== "function" && ctx.end();
          ctx.handler = bindings.value;
        }
        ctx.direction = getModifierDirections(bindings.modifiers);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qtouchswipe;
      if (ctx !== void 0) {
        cleanEvt(ctx, "main");
        cleanEvt(ctx, "temp");
        client.is.firefox === true && preventDraggable(el, false);
        ctx.styleCleanup?.();
        delete el.__qtouchswipe;
      }
    }
  }
);
const usePanelChildProps = {
  name: { required: true },
  disable: Boolean
};
const PanelWrapper = {
  setup(_, { slots }) {
    return () => h("div", {
      class: "q-panel scroll",
      role: "tabpanel"
    }, hSlot(slots.default));
  }
};
const usePanelProps = {
  modelValue: {
    required: true
  },
  animated: Boolean,
  infinite: Boolean,
  swipeable: Boolean,
  vertical: Boolean,
  transitionPrev: String,
  transitionNext: String,
  transitionDuration: {
    type: [String, Number],
    default: 300
  },
  keepAlive: Boolean,
  keepAliveInclude: [String, Array, RegExp],
  keepAliveExclude: [String, Array, RegExp],
  keepAliveMax: Number
};
const usePanelEmits = ["update:modelValue", "beforeTransition", "transition"];
function usePanel() {
  const { props, emit, proxy } = getCurrentInstance();
  const { getCache } = useRenderCache();
  const { registerTimeout } = useTimeout();
  let panels, forcedPanelTransition;
  const panelTransition = ref(null);
  const panelIndex = { value: null };
  function onSwipe(evt) {
    const dir = props.vertical === true ? "up" : "left";
    goToPanelByOffset((proxy.$q.lang.rtl === true ? -1 : 1) * (evt.direction === dir ? 1 : -1));
  }
  const panelDirectives = computed(() => {
    return [[
      TouchSwipe,
      onSwipe,
      void 0,
      {
        horizontal: props.vertical !== true,
        vertical: props.vertical,
        mouse: true
      }
    ]];
  });
  const transitionPrev = computed(
    () => props.transitionPrev || `slide-${props.vertical === true ? "down" : "right"}`
  );
  const transitionNext = computed(
    () => props.transitionNext || `slide-${props.vertical === true ? "up" : "left"}`
  );
  const transitionStyle = computed(
    () => `--q-transition-duration: ${props.transitionDuration}ms`
  );
  const contentKey = computed(() => typeof props.modelValue === "string" || typeof props.modelValue === "number" ? props.modelValue : String(props.modelValue));
  const keepAliveProps = computed(() => ({
    include: props.keepAliveInclude,
    exclude: props.keepAliveExclude,
    max: props.keepAliveMax
  }));
  const needsUniqueKeepAliveWrapper = computed(
    () => props.keepAliveInclude !== void 0 || props.keepAliveExclude !== void 0
  );
  watch(() => props.modelValue, (newVal, oldVal) => {
    const index = isValidPanelName(newVal) === true ? getPanelIndex(newVal) : -1;
    if (forcedPanelTransition !== true) {
      updatePanelTransition(
        index === -1 ? 0 : index < getPanelIndex(oldVal) ? -1 : 1
      );
    }
    if (panelIndex.value !== index) {
      panelIndex.value = index;
      emit("beforeTransition", newVal, oldVal);
      registerTimeout(() => {
        emit("transition", newVal, oldVal);
      }, props.transitionDuration);
    }
  });
  function nextPanel() {
    goToPanelByOffset(1);
  }
  function previousPanel() {
    goToPanelByOffset(-1);
  }
  function goToPanel(name) {
    emit("update:modelValue", name);
  }
  function isValidPanelName(name) {
    return name !== void 0 && name !== null && name !== "";
  }
  function getPanelIndex(name) {
    return panels.findIndex((panel) => {
      return panel.props.name === name && panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function getEnabledPanels() {
    return panels.filter((panel) => {
      return panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function updatePanelTransition(direction) {
    const val = direction !== 0 && props.animated === true && panelIndex.value !== -1 ? "q-transition--" + (direction === -1 ? transitionPrev.value : transitionNext.value) : null;
    if (panelTransition.value !== val) {
      panelTransition.value = val;
    }
  }
  function goToPanelByOffset(direction, startIndex = panelIndex.value) {
    let index = startIndex + direction;
    while (index !== -1 && index < panels.length) {
      const opt = panels[index];
      if (opt !== void 0 && opt.props.disable !== "" && opt.props.disable !== true) {
        updatePanelTransition(direction);
        forcedPanelTransition = true;
        emit("update:modelValue", opt.props.name);
        setTimeout(() => {
          forcedPanelTransition = false;
        });
        return;
      }
      index += direction;
    }
    if (props.infinite === true && panels.length !== 0 && startIndex !== -1 && startIndex !== panels.length) {
      goToPanelByOffset(direction, direction === -1 ? panels.length : -1);
    }
  }
  function updatePanelIndex() {
    const index = getPanelIndex(props.modelValue);
    if (panelIndex.value !== index) {
      panelIndex.value = index;
    }
    return true;
  }
  function getPanelContentChild() {
    const panel = isValidPanelName(props.modelValue) === true && updatePanelIndex() && panels[panelIndex.value];
    return props.keepAlive === true ? [
      h(KeepAlive, keepAliveProps.value, [
        h(
          needsUniqueKeepAliveWrapper.value === true ? getCache(contentKey.value, () => ({ ...PanelWrapper, name: contentKey.value })) : PanelWrapper,
          { key: contentKey.value, style: transitionStyle.value },
          () => panel
        )
      ])
    ] : [
      h("div", {
        class: "q-panel scroll",
        style: transitionStyle.value,
        key: contentKey.value,
        role: "tabpanel"
      }, [panel])
    ];
  }
  function getPanelContent() {
    if (panels.length === 0) return;
    return props.animated === true ? [h(Transition, { name: panelTransition.value }, getPanelContentChild)] : getPanelContentChild();
  }
  function updatePanelsList(slots) {
    panels = getNormalizedVNodes(
      hSlot(slots.default, [])
    ).filter(
      (panel) => panel.props !== null && panel.props.slot === void 0 && isValidPanelName(panel.props.name) === true
    );
    return panels.length;
  }
  function getPanels() {
    return panels;
  }
  Object.assign(proxy, {
    next: nextPanel,
    previous: previousPanel,
    goTo: goToPanel
  });
  return {
    panelIndex,
    panelDirectives,
    updatePanelsList,
    updatePanelIndex,
    getPanelContent,
    getEnabledPanels,
    getPanels,
    isValidPanelName,
    keepAliveProps,
    needsUniqueKeepAliveWrapper,
    goToPanelByOffset,
    goToPanel,
    nextPanel,
    previousPanel
  };
}
const QCarouselSlide = createComponent({
  name: "QCarouselSlide",
  props: {
    ...usePanelChildProps,
    imgSrc: String
  },
  setup(props, { slots }) {
    const style = computed(() => props.imgSrc ? { backgroundImage: `url("${props.imgSrc}")` } : {});
    return () => h("div", {
      class: "q-carousel__slide",
      style: style.value
    }, hSlot(slots.default));
  }
});
const navigationPositionOptions = ["top", "right", "bottom", "left"];
const controlTypeOptions = ["regular", "flat", "outline", "push", "unelevated"];
const QCarousel = createComponent({
  name: "QCarousel",
  props: {
    ...useDarkProps,
    ...usePanelProps,
    ...useFullscreenProps,
    transitionPrev: {
      // usePanelParentProps override
      type: String,
      default: "fade"
    },
    transitionNext: {
      // usePanelParentProps override
      type: String,
      default: "fade"
    },
    height: String,
    padding: Boolean,
    controlColor: String,
    controlTextColor: String,
    controlType: {
      type: String,
      validator: (v) => controlTypeOptions.includes(v),
      default: "flat"
    },
    autoplay: [Number, Boolean],
    arrows: Boolean,
    prevIcon: String,
    nextIcon: String,
    navigation: Boolean,
    navigationPosition: {
      type: String,
      validator: (v) => navigationPositionOptions.includes(v)
    },
    navigationIcon: String,
    navigationActiveIcon: String,
    thumbnails: Boolean
  },
  emits: [
    ...useFullscreenEmits,
    ...usePanelEmits
  ],
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    let timer = null, panelsLen;
    const {
      updatePanelsList,
      getPanelContent,
      panelDirectives,
      goToPanel,
      previousPanel,
      nextPanel,
      getEnabledPanels,
      panelIndex
    } = usePanel();
    const { inFullscreen } = useFullscreen();
    const style = computed(() => inFullscreen.value !== true && props.height !== void 0 ? { height: props.height } : {});
    const direction = computed(() => props.vertical === true ? "vertical" : "horizontal");
    const navigationPosition = computed(
      () => props.navigationPosition || (props.vertical === true ? "right" : "bottom")
    );
    const classes = computed(
      () => `q-carousel q-panel-parent q-carousel--with${props.padding === true ? "" : "out"}-padding` + (inFullscreen.value === true ? " fullscreen" : "") + (isDark.value === true ? " q-carousel--dark q-dark" : "") + (props.arrows === true ? ` q-carousel--arrows-${direction.value}` : "") + (props.navigation === true ? ` q-carousel--navigation-${navigationPosition.value}` : "")
    );
    const arrowIcons = computed(() => {
      const ico = [
        props.prevIcon || $q.iconSet.carousel[props.vertical === true ? "up" : "left"],
        props.nextIcon || $q.iconSet.carousel[props.vertical === true ? "down" : "right"]
      ];
      return props.vertical === false && $q.lang.rtl === true ? ico.reverse() : ico;
    });
    const navIcon = computed(() => props.navigationIcon || $q.iconSet.carousel.navigationIcon);
    const navActiveIcon = computed(() => props.navigationActiveIcon || navIcon.value);
    const controlProps = computed(() => ({
      color: props.controlColor,
      textColor: props.controlTextColor,
      round: true,
      [props.controlType]: true,
      dense: true
    }));
    watch(() => props.modelValue, () => {
      if (props.autoplay) {
        startTimer();
      }
    });
    watch(() => props.autoplay, (val) => {
      if (val) {
        startTimer();
      } else if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    });
    function startTimer() {
      const duration = isNumber(props.autoplay) === true ? Math.abs(props.autoplay) : 5e3;
      timer !== null && clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        if (duration >= 0) {
          nextPanel();
        } else {
          previousPanel();
        }
      }, duration);
    }
    onMounted(() => {
      props.autoplay && startTimer();
    });
    onBeforeUnmount(() => {
      timer !== null && clearTimeout(timer);
    });
    function getNavigationContainer(type, mapping) {
      return h("div", {
        class: `q-carousel__control q-carousel__navigation no-wrap absolute flex q-carousel__navigation--${type} q-carousel__navigation--${navigationPosition.value}` + (props.controlColor !== void 0 ? ` text-${props.controlColor}` : "")
      }, [
        h("div", {
          class: "q-carousel__navigation-inner flex flex-center no-wrap"
        }, getEnabledPanels().map(mapping))
      ]);
    }
    function getContent() {
      const node = [];
      if (props.navigation === true) {
        const fn = slots["navigation-icon"] !== void 0 ? slots["navigation-icon"] : (opts) => h(QBtn, {
          key: "nav" + opts.name,
          class: `q-carousel__navigation-icon q-carousel__navigation-icon--${opts.active === true ? "" : "in"}active`,
          ...opts.btnProps,
          onClick: opts.onClick
        });
        const maxIndex = panelsLen - 1;
        node.push(
          getNavigationContainer("buttons", (panel, index) => {
            const name = panel.props.name;
            const active = panelIndex.value === index;
            return fn({
              index,
              maxIndex,
              name,
              active,
              btnProps: {
                icon: active === true ? navActiveIcon.value : navIcon.value,
                size: "sm",
                ...controlProps.value
              },
              onClick: () => {
                goToPanel(name);
              }
            });
          })
        );
      } else if (props.thumbnails === true) {
        const color = props.controlColor !== void 0 ? ` text-${props.controlColor}` : "";
        node.push(getNavigationContainer("thumbnails", (panel) => {
          const slide = panel.props;
          return h("img", {
            key: "tmb#" + slide.name,
            class: `q-carousel__thumbnail q-carousel__thumbnail--${slide.name === props.modelValue ? "" : "in"}active` + color,
            src: slide.imgSrc || slide["img-src"],
            onClick: () => {
              goToPanel(slide.name);
            }
          });
        }));
      }
      if (props.arrows === true && panelIndex.value >= 0) {
        if (props.infinite === true || panelIndex.value > 0) {
          node.push(
            h("div", {
              key: "prev",
              class: `q-carousel__control q-carousel__arrow q-carousel__prev-arrow q-carousel__prev-arrow--${direction.value} absolute flex flex-center`
            }, [
              h(QBtn, {
                icon: arrowIcons.value[0],
                ...controlProps.value,
                onClick: previousPanel
              })
            ])
          );
        }
        if (props.infinite === true || panelIndex.value < panelsLen - 1) {
          node.push(
            h("div", {
              key: "next",
              class: `q-carousel__control q-carousel__arrow q-carousel__next-arrow q-carousel__next-arrow--${direction.value} absolute flex flex-center`
            }, [
              h(QBtn, {
                icon: arrowIcons.value[1],
                ...controlProps.value,
                onClick: nextPanel
              })
            ])
          );
        }
      }
      return hMergeSlot(slots.control, node);
    }
    return () => {
      panelsLen = updatePanelsList(slots);
      return h("div", {
        class: classes.value,
        style: style.value
      }, [
        hDir(
          "div",
          { class: "q-carousel__slides-container" },
          getPanelContent(),
          "sl-cont",
          props.swipeable,
          () => panelDirectives.value
        )
      ].concat(getContent()));
    };
  }
});
const _sfc_main = {
  name: "ClienteCadastroPage",
  setup() {
    const $q = useQuasar();
    const { t } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const clienteRepository = new ClienteRepository();
    const imovelRepository = new ImovelRepository();
    const isEditMode = computed(() => !!route.params.id);
    const loading = ref(false);
    const cliente = ref(null);
    function enderecoVazio() {
      return {
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: ""
      };
    }
    function imovelVazio() {
      return {
        id: "temp_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
        // ID temporário para reatividade
        totalComodos: "",
        numeroQuartos: "",
        numeroBanheiros: "",
        areaTotal: "",
        observacao: "",
        mesmoEnderecoCliente: false,
        endereco: enderecoVazio(),
        imagens: [],
        // Array para armazenar imagens
        imagemTemp: null,
        // Arquivo temporário para galeria
        cameraTemp: null
        // Arquivo temporário para câmera
      };
    }
    const form = ref({
      nome: "",
      sobrenome: "",
      email: "",
      telefone: "",
      celular: "",
      foto: null,
      fotoPreview: null,
      observacoes: "",
      endereco: enderecoVazio(),
      imoveis: []
    });
    const imoveisExpanded = ref(true);
    const secaoAtual = ref(0);
    const secoes = ref([
      { id: 0, titulo: t("forms.cliente.sections.personalData"), icone: "person" },
      { id: 1, titulo: t("forms.cliente.sections.addresses"), icone: "location_on" },
      { id: 2, titulo: t("forms.cliente.sections.properties"), icone: "home" },
      { id: 3, titulo: t("forms.cliente.sections.observacoes"), icone: "notes" }
    ]);
    const validarDadosPessoais = () => {
      const errors = [];
      if (!form.value.nome?.trim()) {
        errors.push(t("forms.cliente.fields.nome"));
      }
      if (!form.value.sobrenome?.trim()) {
        errors.push(t("forms.cliente.fields.sobrenome"));
      }
      if (!form.value.email?.trim()) {
        errors.push(t("forms.cliente.fields.email"));
      } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.value.email)) {
        errors.push(t("forms.cliente.fields.email") + " (formato inválido)");
      }
      if (!form.value.celular?.trim()) {
        errors.push(t("forms.cliente.fields.celular"));
      }
      return errors;
    };
    const validarEnderecos = () => {
      const errors = [];
      if (!form.value.endereco) {
        errors.push("Endereço é obrigatório");
        return errors;
      }
      const endereco = form.value.endereco;
      if (!endereco.cep?.trim()) {
        errors.push("CEP é obrigatório");
      }
      if (!endereco.rua?.trim()) {
        errors.push("Rua é obrigatória");
      }
      if (!endereco.numero?.trim()) {
        errors.push("Número é obrigatório");
      }
      if (!endereco.bairro?.trim()) {
        errors.push("Bairro é obrigatório");
      }
      if (!endereco.cidade?.trim()) {
        errors.push("Cidade é obrigatória");
      }
      if (!endereco.estado?.trim()) {
        errors.push("Estado é obrigatório");
      }
      return errors;
    };
    const validarImoveis = () => {
      const errors = [];
      form.value.imoveis.forEach((imovel, index) => {
        if (!imovel.totalComodos) {
          errors.push(`Imóvel ${index + 1}: Total de cômodos é obrigatório`);
        }
        if (imovel.numeroQuartos === "" || imovel.numeroQuartos < 0) {
          errors.push(`Imóvel ${index + 1}: Número de quartos é obrigatório`);
        }
        if (!imovel.numeroBanheiros) {
          errors.push(`Imóvel ${index + 1}: Número de banheiros é obrigatório`);
        }
        if (!imovel.areaTotal) {
          errors.push(`Imóvel ${index + 1}: Área total é obrigatória`);
        }
        const endereco = imovel.endereco;
        if (!endereco.cep?.trim()) {
          errors.push(`Imóvel ${index + 1}: CEP do endereço é obrigatório`);
        }
        if (!endereco.rua?.trim()) {
          errors.push(`Imóvel ${index + 1}: Rua do endereço é obrigatória`);
        }
        if (!endereco.numero?.trim()) {
          errors.push(`Imóvel ${index + 1}: Número do endereço é obrigatório`);
        }
        if (!endereco.bairro?.trim()) {
          errors.push(`Imóvel ${index + 1}: Bairro do endereço é obrigatório`);
        }
        if (!endereco.cidade?.trim()) {
          errors.push(`Imóvel ${index + 1}: Cidade do endereço é obrigatória`);
        }
        if (!endereco.estado?.trim()) {
          errors.push(`Imóvel ${index + 1}: Estado do endereço é obrigatório`);
        }
      });
      return errors;
    };
    const validarObservacoes = () => {
      return [];
    };
    const validarSecaoAtual = () => {
      let errors = [];
      switch (secaoAtual.value) {
        case 0:
          errors = validarDadosPessoais();
          break;
        case 1:
          errors = validarEnderecos();
          break;
        case 2:
          errors = validarImoveis();
          break;
        case 3:
          errors = validarObservacoes();
          break;
      }
      if (errors.length > 0) {
        $q.notify({
          type: "negative",
          message: "Por favor, corrija os seguintes campos:",
          caption: errors.join("<br>"),
          html: true,
          timeout: 5e3,
          position: "top-right"
        });
        return false;
      }
      return true;
    };
    const proximaSecao = () => {
      if (!validarSecaoAtual()) {
        return;
      }
      if (secaoAtual.value < secoes.value.length - 1) {
        secaoAtual.value++;
      }
    };
    const voltarSecao = () => {
      if (secaoAtual.value > 0) {
        secaoAtual.value--;
      }
    };
    function adicionarNovoImovel() {
      form.value.imoveis.unshift(imovelVazio());
    }
    function removerImovel(index) {
      form.value.imoveis.splice(index, 1);
    }
    function copiarEnderecoCliente(imovelIndex, usarEnderecoCliente) {
      if (usarEnderecoCliente && form.value.endereco) {
        const enderecoCliente = form.value.endereco;
        form.value.imoveis[imovelIndex].endereco = {
          cep: enderecoCliente.cep,
          rua: enderecoCliente.rua,
          numero: enderecoCliente.numero,
          complemento: enderecoCliente.complemento,
          bairro: enderecoCliente.bairro,
          cidade: enderecoCliente.cidade,
          estado: enderecoCliente.estado
        };
      } else if (!usarEnderecoCliente) {
        form.value.imoveis[imovelIndex].endereco = enderecoVazio();
      }
    }
    async function onImagensSelecionadas(files, imovelIndex) {
      if (!files || files.length === 0) return;
      try {
        const imovel = form.value.imoveis[imovelIndex];
        if (!imovel.imagens) {
          imovel.imagens = [];
        }
        for (const file of files) {
          if (file.size > 5242880) {
            $q.notify({
              type: "negative",
              message: t("forms.validation.fileTooLarge", [file.name]),
              timeout: 3e3,
              position: "top-right"
            });
            continue;
          }
          const imagemComprimida = await comprimirImagem(file, 800, 600, 0.8);
          const novaImagem = {
            id: gerarGuid(),
            nome: file.name,
            preview: imagemComprimida,
            descricao: "",
            tipo: file.type,
            tamanho: file.size,
            dataUpload: (/* @__PURE__ */ new Date()).toISOString()
          };
          imovel.imagens.push(novaImagem);
          console.log("Imagem adicionada ao imóvel:", novaImagem);
          console.log("Total de imagens no imóvel agora:", imovel.imagens.length);
        }
        $q.notify({
          type: "positive",
          message: t("forms.cliente.property.images.imagesAdded", [files.length]),
          timeout: 2e3,
          position: "top-right"
        });
        imovel.imagemTemp = null;
      } catch (error) {
        console.error("Erro ao processar imagens:", error);
        $q.notify({
          type: "negative",
          message: t("forms.validation.imageProcessError"),
          timeout: 3e3,
          position: "top-right"
        });
      }
    }
    async function onImagemCamera(file, imovelIndex) {
      if (!file) return;
      try {
        const imovel = form.value.imoveis[imovelIndex];
        if (!imovel.imagens) {
          imovel.imagens = [];
        }
        if (file.size > 5242880) {
          $q.notify({
            type: "negative",
            message: t("forms.validation.fileTooLarge", [file.name]),
            timeout: 3e3,
            position: "top-right"
          });
          return;
        }
        const imagemComprimida = await comprimirImagem(file, 800, 600, 0.8);
        const novaImagem = {
          id: gerarGuid(),
          nome: file.name || `camera_${Date.now()}.jpg`,
          preview: imagemComprimida,
          descricao: "",
          tipo: file.type || "image/jpeg",
          tamanho: file.size,
          dataUpload: (/* @__PURE__ */ new Date()).toISOString()
        };
        imovel.imagens.push(novaImagem);
        $q.notify({
          type: "positive",
          message: t("forms.cliente.property.images.photoTaken"),
          timeout: 2e3,
          position: "top-right"
        });
        imovel.cameraTemp = null;
      } catch (error) {
        console.error("Erro ao processar foto da câmera:", error);
        $q.notify({
          type: "negative",
          message: t("forms.validation.imageProcessError"),
          timeout: 3e3,
          position: "top-right"
        });
      }
    }
    function removerImagemImovel(imovelIndex, imagemIndex) {
      form.value.imoveis[imovelIndex].imagens.splice(imagemIndex, 1);
      $q.notify({
        type: "positive",
        message: t("forms.cliente.property.images.imageRemoved"),
        timeout: 2e3,
        position: "top-right"
      });
    }
    async function buscarEnderecoPorCep(cep, tipo, indice = null) {
      if (!cep || cep.length < 8) return;
      const cepLimpo = cep.replace(/\D/g, "");
      if (cepLimpo.length !== 8) return;
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();
        if (data.erro) {
          $q.notify({
            type: "negative",
            message: t("forms.validation.invalidCep"),
            timeout: 3e3,
            position: "top-right"
          });
          return;
        }
        if (tipo === "cliente") {
          form.value.endereco.rua = data.logradouro || "";
          form.value.endereco.bairro = data.bairro || "";
          form.value.endereco.cidade = data.localidade || "";
          form.value.endereco.estado = data.uf || "";
        } else if (tipo === "imovel" && indice !== null) {
          form.value.imoveis[indice].endereco.rua = data.logradouro || "";
          form.value.imoveis[indice].endereco.bairro = data.bairro || "";
          form.value.imoveis[indice].endereco.cidade = data.localidade || "";
          form.value.imoveis[indice].endereco.estado = data.uf || "";
        }
        $q.notify({
          type: "positive",
          message: t("forms.validation.cepFound"),
          timeout: 2e3,
          position: "top-right"
        });
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        $q.notify({
          type: "negative",
          message: t("forms.validation.cepError"),
          timeout: 3e3,
          position: "top-right"
        });
      }
    }
    async function carregarCliente() {
      if (!isEditMode.value) return;
      loading.value = true;
      try {
        const clienteData = await clienteRepository.getById(route.params.id);
        if (!clienteData) {
          throw new Error("Cliente não encontrado");
        }
        cliente.value = clienteData;
        form.value.nome = clienteData.Nome;
        form.value.sobrenome = clienteData.Sobrenome;
        form.value.email = clienteData.Email;
        form.value.telefone = clienteData.Telefone || "";
        form.value.celular = clienteData.Celular;
        form.value.observacoes = clienteData.Observacoes || "";
        if (clienteData.Foto) {
          form.value.fotoPreview = clienteData.Foto;
        }
        if (clienteData.Endereco) {
          form.value.endereco = {
            cep: clienteData.Endereco.Cep || "",
            rua: clienteData.Endereco.Logradouro || "",
            numero: clienteData.Endereco.Numero || "",
            complemento: clienteData.Endereco.Complemento || "",
            bairro: clienteData.Endereco.Bairro || "",
            cidade: clienteData.Endereco.Cidade || "",
            estado: clienteData.Endereco.Estado || ""
          };
        } else if (clienteData.Enderecos && clienteData.Enderecos.length > 0) {
          const endereco = clienteData.Enderecos[0];
          form.value.endereco = {
            cep: endereco.Cep || "",
            rua: endereco.Logradouro || "",
            numero: endereco.Numero || "",
            complemento: endereco.Complemento || "",
            bairro: endereco.Bairro || "",
            cidade: endereco.Cidade || "",
            estado: endereco.Estado || ""
          };
        } else {
          form.value.endereco = enderecoVazio();
        }
        if (clienteData.Imoveis && clienteData.Imoveis.length > 0) {
          form.value.imoveis = clienteData.Imoveis.map((imovel) => ({
            id: imovel.Id,
            // PRESERVA o ID original do imóvel na edição
            totalComodos: imovel.TotalComodos?.toString() || "",
            numeroQuartos: imovel.NumeroQuartos?.toString() || "",
            numeroBanheiros: imovel.NumeroBanheiros?.toString() || "",
            areaTotal: imovel.AreaTotal?.toString() || "",
            observacao: imovel.Observacao || "",
            mesmoEnderecoCliente: false,
            // Sempre inicia desmarcado na edição
            endereco: {
              cep: imovel.Endereco?.Cep || "",
              rua: imovel.Endereco?.Logradouro || "",
              numero: imovel.Endereco?.Numero || "",
              complemento: imovel.Endereco?.Complemento || "",
              bairro: imovel.Endereco?.Bairro || "",
              cidade: imovel.Endereco?.Cidade || "",
              estado: imovel.Endereco?.Estado || ""
            },
            imagens: imovel.Imagens || [],
            // Inclui as imagens do imóvel
            imagemTemp: null,
            cameraTemp: null
          }));
        } else {
          form.value.imoveis = [];
        }
      } catch (error) {
        console.error("Erro ao carregar cliente:", error);
        $q.notify({
          type: "negative",
          message: t("pages.clientEdit.messages.loadError"),
          timeout: 5e3,
          position: "top-right"
        });
        cliente.value = null;
      } finally {
        loading.value = false;
      }
    }
    const voltarParaListagem = () => {
      router.push("/clientes");
    };
    onMounted(() => {
      if (isEditMode.value) {
        carregarCliente();
      } else {
        form.value.enderecos = [enderecoVazio()];
      }
    });
    const onSubmit = async () => {
      try {
        const clienteInstance = new Cliente(
          form.value.nome,
          form.value.sobrenome,
          form.value.email,
          form.value.celular,
          form.value.telefone
        );
        if (isEditMode.value && cliente.value) {
          clienteInstance.Id = cliente.value.Id;
        }
        if (form.value.fotoPreview) {
          clienteInstance.definirFoto(form.value.fotoPreview);
        }
        if (form.value.endereco && form.value.endereco.cep.trim()) {
          const endereco = new Endereco(
            "Principal",
            // descricao
            form.value.endereco.rua,
            // logradouro
            form.value.endereco.numero,
            form.value.endereco.cep,
            form.value.endereco.bairro,
            form.value.endereco.cidade,
            form.value.endereco.estado,
            "Brasil",
            // pais
            form.value.endereco.complemento
            // complemento
          );
          clienteInstance.definirEndereco(endereco);
        }
        clienteInstance.Observacoes = form.value.observacoes;
        console.log("Salvando cliente primeiro...", clienteInstance);
        const clienteSalvo = await clienteRepository.save(clienteInstance);
        console.log("Cliente salvo com ID:", clienteSalvo.Id);
        const imoveisCriados = [];
        if (isEditMode.value && cliente.value) {
          console.log("Modo edição: removendo imóveis antigos do cliente...");
          await imovelRepository.deleteByDono(cliente.value.Id);
        }
        for (const imovelForm of form.value.imoveis) {
          if (imovelForm.totalComodos && imovelForm.numeroBanheiros && imovelForm.endereco.cep.trim()) {
            const enderecoImovel = new Endereco(
              "Imóvel",
              // descricao
              imovelForm.endereco.rua,
              // logradouro
              imovelForm.endereco.numero,
              imovelForm.endereco.cep,
              imovelForm.endereco.bairro,
              imovelForm.endereco.cidade,
              imovelForm.endereco.estado,
              "Brasil"
              // pais
            );
            console.log("Imagens no formulário do imóvel:", imovelForm.imagens);
            console.log("Número de imagens:", imovelForm.imagens?.length || 0);
            const imovel = new Imovel(
              parseInt(imovelForm.totalComodos),
              parseInt(imovelForm.numeroQuartos) || 0,
              parseInt(imovelForm.numeroBanheiros),
              parseFloat(imovelForm.areaTotal) || 0,
              enderecoImovel,
              clienteSalvo,
              // Usa o cliente salvo com ID
              imovelForm.observacao,
              imovelForm.imagens || []
              // Inclui as imagens do formulário
            );
            if (isEditMode.value && imovelForm.id && typeof imovelForm.id === "string" && imovelForm.id.includes("-") && imovelForm.id.length > 30) {
              imovel.Id = imovelForm.id;
              console.log("ID preservado na edição:", imovelForm.id);
            } else {
              console.log("Novo imóvel criado com ID:", imovel.Id);
            }
            console.log("Imagens no imóvel criado:", imovel.Imagens);
            console.log("Total de imagens no imóvel:", imovel.totalImagens);
            const imovelSalvo = await imovelRepository.save(imovel);
            console.log("Imóvel criado e salvo:", imovelSalvo);
            console.log("ID do cliente no imóvel:", imovelSalvo.Dono.Id);
            clienteSalvo.adicionarImovel(imovelSalvo);
            imoveisCriados.push(imovelSalvo);
          }
        }
        if (imoveisCriados.length > 0) {
          console.log("Atualizando cliente com", imoveisCriados.length, "imóveis...");
          await clienteRepository.save(clienteSalvo);
        }
        $q.notify({
          type: "positive",
          message: isEditMode.value ? t("messages.updateSuccess") : t("messages.saveSuccess"),
          timeout: 3e3,
          position: "top-right"
        });
        setTimeout(() => {
          verificarEspacoLocalStorage();
        }, 1e3);
        setTimeout(() => {
          router.push("/clientes");
        }, 1500);
      } catch (error) {
        console.error(isEditMode.value ? "Erro ao atualizar cliente:" : "Erro ao criar cliente:", error);
        $q.notify({
          type: "negative",
          message: isEditMode.value ? t("messages.updateError") : t("messages.saveError"),
          timeout: 5e3,
          position: "top-right"
        });
      }
    };
    const comprimirImagem = (file, maxWidth = 300, maxHeight = 300, quality = 0.7) => {
      return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > height) {
            if (width > maxWidth) {
              height = height * maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = width * maxHeight / height;
              height = maxHeight;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(compressedDataUrl);
        };
        img.src = URL.createObjectURL(file);
      });
    };
    const onFotoSelecionada = async (file) => {
      if (!file) return;
      if (file.size > 5242880) {
        $q.notify({
          type: "negative",
          message: "Arquivo muito grande. Tamanho máximo: 5MB",
          timeout: 3e3,
          position: "top-right"
        });
        return;
      }
      if (!file.type.startsWith("image/")) {
        $q.notify({
          type: "negative",
          message: "Apenas arquivos de imagem são permitidos",
          timeout: 3e3,
          position: "top-right"
        });
        return;
      }
      try {
        const compressedImage = await comprimirImagem(file);
        const sizeInBytes = Math.round(compressedImage.length * 3 / 4);
        console.log(`Imagem original: ${(file.size / 1024).toFixed(1)}KB, Comprimida: ${(sizeInBytes / 1024).toFixed(1)}KB`);
        form.value.fotoPreview = compressedImage;
        $q.notify({
          type: "positive",
          message: `Foto comprimida e carregada (${(sizeInBytes / 1024).toFixed(1)}KB)`,
          timeout: 2e3,
          position: "top-right"
        });
      } catch (error) {
        console.error("Erro ao comprimir imagem:", error);
        $q.notify({
          type: "negative",
          message: "Erro ao processar a imagem",
          timeout: 3e3,
          position: "top-right"
        });
      }
    };
    const removerFoto = () => {
      form.value.foto = null;
      form.value.fotoPreview = null;
      $q.notify({
        type: "info",
        message: "Foto removida",
        timeout: 2e3,
        position: "top-right"
      });
    };
    const verificarEspacoLocalStorage = () => {
      try {
        const clientesData = localStorage.getItem("clientes") || "[]";
        const sizeInBytes = new Blob([clientesData]).size;
        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
        console.log(`Uso do localStorage - Clientes: ${sizeInMB}MB`);
        if (sizeInBytes > 4 * 1024 * 1024) {
          $q.notify({
            type: "warning",
            message: `Armazenamento local quase cheio (${sizeInMB}MB). Considere remover fotos de clientes antigos.`,
            timeout: 5e3,
            position: "top-right"
          });
        }
      } catch (error) {
        console.error("Erro ao verificar espaço:", error);
      }
    };
    return {
      form,
      imoveisExpanded,
      secaoAtual,
      secoes,
      proximaSecao,
      voltarSecao,
      validarSecaoAtual,
      validarDadosPessoais,
      validarEnderecos,
      validarImoveis,
      validarObservacoes,
      isEditMode,
      loading,
      cliente,
      onSubmit,
      adicionarNovoImovel,
      removerImovel,
      copiarEnderecoCliente,
      buscarEnderecoPorCep,
      voltarParaListagem,
      onFotoSelecionada,
      removerFoto,
      verificarEspacoLocalStorage,
      onImagensSelecionadas,
      onImagemCamera,
      removerImagemImovel
    };
  }
};
const _hoisted_1 = { class: "row items-center q-mb-xl" };
const _hoisted_2 = { class: "col" };
const _hoisted_3 = { class: "row items-center q-mb-sm" };
const _hoisted_4 = { class: "text-h5 q-ma-none text-secondary" };
const _hoisted_5 = { class: "row justify-end" };
const _hoisted_6 = { class: "text-subtitle1 text-grey-7 q-ma-none" };
const _hoisted_7 = { class: "desktop-layout gt-sm" };
const _hoisted_8 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_9 = { class: "row q-col-gutter-md" };
const _hoisted_10 = { class: "col-12 col-md-3" };
const _hoisted_11 = { class: "text-center foto-cliente-container" };
const _hoisted_12 = { class: "text-subtitle2 q-mb-sm" };
const _hoisted_13 = ["src"];
const _hoisted_14 = { class: "col-12 col-md-9" };
const _hoisted_15 = { class: "row q-col-gutter-md" };
const _hoisted_16 = { class: "col-12 col-md-6" };
const _hoisted_17 = { class: "col-12 col-md-6" };
const _hoisted_18 = { class: "col-12 col-md-6" };
const _hoisted_19 = { class: "col-12 col-md-3" };
const _hoisted_20 = { class: "col-12 col-md-3" };
const _hoisted_21 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_22 = { class: "row q-col-gutter-md" };
const _hoisted_23 = { class: "col-12 col-md-2" };
const _hoisted_24 = { class: "col-12 col-md-8" };
const _hoisted_25 = { class: "col-12 col-md-2" };
const _hoisted_26 = { class: "col-12 col-md-4" };
const _hoisted_27 = { class: "col-12 col-md-4" };
const _hoisted_28 = { class: "col-12 col-md-4" };
const _hoisted_29 = { class: "col-12 col-md-4" };
const _hoisted_30 = {
  key: 0,
  class: "text-center text-grey-6 q-py-lg"
};
const _hoisted_31 = { class: "text-body1" };
const _hoisted_32 = { class: "text-caption" };
const _hoisted_33 = { class: "row items-center q-mb-sm" };
const _hoisted_34 = { class: "text-subtitle2" };
const _hoisted_35 = { class: "row q-col-gutter-md" };
const _hoisted_36 = { class: "col-12 col-md-3" };
const _hoisted_37 = { class: "col-12 col-md-3" };
const _hoisted_38 = { class: "col-12 col-md-3" };
const _hoisted_39 = { class: "col-12 col-md-3" };
const _hoisted_40 = { class: "col-12" };
const _hoisted_41 = { class: "col-12" };
const _hoisted_42 = { class: "text-subtitle2 text-primary q-mb-sm q-mt-md" };
const _hoisted_43 = { class: "col-12 q-mb-md" };
const _hoisted_44 = { class: "col-12 col-md-2" };
const _hoisted_45 = { class: "col-12 col-md-6" };
const _hoisted_46 = { class: "col-12 col-md-2" };
const _hoisted_47 = { class: "col-12 col-md-2" };
const _hoisted_48 = { class: "col-12 col-md-4" };
const _hoisted_49 = { class: "col-12 col-md-4" };
const _hoisted_50 = { class: "col-12 col-md-4" };
const _hoisted_51 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_52 = { class: "row q-col-gutter-md" };
const _hoisted_53 = { class: "col-12" };
const _hoisted_54 = { class: "mobile-layout lt-md" };
const _hoisted_55 = { class: "row items-center justify-between q-mb-sm" };
const _hoisted_56 = { class: "text-h6 text-primary" };
const _hoisted_57 = { class: "text-caption text-grey-6" };
const _hoisted_58 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_59 = { class: "q-gutter-md" };
const _hoisted_60 = { class: "text-center q-mb-lg foto-cliente-container" };
const _hoisted_61 = { class: "text-subtitle2 q-mb-sm" };
const _hoisted_62 = ["src"];
const _hoisted_63 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_64 = { class: "q-gutter-md" };
const _hoisted_65 = { class: "row items-center justify-between q-mb-md" };
const _hoisted_66 = { class: "text-h6 text-primary" };
const _hoisted_67 = {
  key: 0,
  class: "text-center text-grey-6 q-py-lg"
};
const _hoisted_68 = { class: "text-body1" };
const _hoisted_69 = { class: "text-caption" };
const _hoisted_70 = { class: "row items-center q-mb-sm" };
const _hoisted_71 = { class: "text-subtitle2" };
const _hoisted_72 = { class: "q-gutter-md" };
const _hoisted_73 = { class: "text-subtitle2 text-primary q-mb-sm q-mt-md" };
const _hoisted_74 = { class: "text-subtitle2 text-primary q-mb-sm q-mt-md" };
const _hoisted_75 = { class: "row q-gutter-sm q-mb-md" };
const _hoisted_76 = {
  key: 0,
  class: "q-mt-md"
};
const _hoisted_77 = { class: "text-caption text-grey-7 q-mb-sm" };
const _hoisted_78 = { class: "row q-gutter-sm" };
const _hoisted_79 = { class: "absolute-top-right q-pa-xs" };
const _hoisted_80 = {
  key: 1,
  class: "text-center text-grey-6 q-py-md"
};
const _hoisted_81 = { class: "text-caption" };
const _hoisted_82 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_83 = { class: "row justify-between" };
const _hoisted_84 = { class: "row q-gutter-md justify-end q-mt-lg" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "q-pa-lg" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(QBtn, {
              flat: "",
              round: "",
              icon: "arrow_back",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$router.go(-1)),
              class: "q-mr-md"
            }),
            createVNode(QIcon, {
              name: $setup.isEditMode ? "edit" : "person_add",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }, null, 8, ["name"]),
            createBaseVNode("h4", _hoisted_4, toDisplayString($setup.isEditMode ? _ctx.$t("pages.clientEdit.title") : _ctx.$t("forms.cliente.title")), 1)
          ]),
          _cache[35] || (_cache[35] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString($setup.isEditMode ? _ctx.$t("forms.cliente.editSubtitle") : _ctx.$t("forms.cliente.subtitle")), 1)
          ])
        ])
      ]),
      createVNode(QForm, {
        onSubmit: $setup.onSubmit,
        class: "q-gutter-md"
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_7, [
            createVNode(QCard, {
              flat: "",
              bordered: "",
              class: "q-mt-md q-mb-md"
            }, {
              default: withCtx(() => [
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_8, [
                      createVNode(QIcon, {
                        name: "person",
                        class: "q-mr-sm"
                      }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("forms.cliente.sections.personalData")), 1)
                    ]),
                    createBaseVNode("div", _hoisted_9, [
                      createBaseVNode("div", _hoisted_10, [
                        createBaseVNode("div", _hoisted_11, [
                          createBaseVNode("div", _hoisted_12, toDisplayString(_ctx.$t("forms.cliente.fields.foto")), 1),
                          createVNode(QAvatar, {
                            size: "120px",
                            class: "q-mb-md"
                          }, {
                            default: withCtx(() => [
                              $setup.form.fotoPreview ? (openBlock(), createElementBlock("img", {
                                key: 0,
                                src: $setup.form.fotoPreview,
                                alt: "Foto do cliente",
                                style: { "object-fit": "cover" }
                              }, null, 8, _hoisted_13)) : (openBlock(), createBlock(QIcon, {
                                key: 1,
                                name: "person",
                                size: "60px",
                                color: "grey-6"
                              }))
                            ]),
                            _: 1
                          }),
                          createBaseVNode("div", null, [
                            createVNode(QFile, {
                              modelValue: $setup.form.foto,
                              "onUpdate:modelValue": [
                                _cache[1] || (_cache[1] = ($event) => $setup.form.foto = $event),
                                $setup.onFotoSelecionada
                              ],
                              accept: "image/*",
                              "max-file-size": "5242880",
                              style: { "display": "none" },
                              ref: "fotoInput"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(QBtn, {
                              color: "primary",
                              icon: "photo_camera",
                              label: $setup.form.fotoPreview ? "Alterar Foto" : "Adicionar Foto",
                              size: "sm",
                              outline: "",
                              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$refs.fotoInput.pickFiles()),
                              class: "q-mb-xs full-width"
                            }, null, 8, ["label"]),
                            $setup.form.fotoPreview ? (openBlock(), createBlock(QBtn, {
                              key: 0,
                              color: "negative",
                              icon: "delete",
                              label: "Remover",
                              size: "sm",
                              flat: "",
                              onClick: $setup.removerFoto,
                              class: "full-width"
                            }, null, 8, ["onClick"])) : createCommentVNode("", true)
                          ])
                        ])
                      ]),
                      createBaseVNode("div", _hoisted_14, [
                        createBaseVNode("div", _hoisted_15, [
                          createBaseVNode("div", _hoisted_16, [
                            createVNode(QInput, {
                              modelValue: $setup.form.nome,
                              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.form.nome = $event),
                              label: _ctx.$t("forms.cliente.fields.nome") + " *",
                              filled: "",
                              "lazy-rules": "",
                              rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                            }, null, 8, ["modelValue", "label", "rules"])
                          ]),
                          createBaseVNode("div", _hoisted_17, [
                            createVNode(QInput, {
                              modelValue: $setup.form.sobrenome,
                              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.form.sobrenome = $event),
                              label: _ctx.$t("forms.cliente.fields.sobrenome") + " *",
                              filled: "",
                              "lazy-rules": "",
                              rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                            }, null, 8, ["modelValue", "label", "rules"])
                          ]),
                          createBaseVNode("div", _hoisted_18, [
                            createVNode(QInput, {
                              modelValue: $setup.form.email,
                              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.form.email = $event),
                              label: _ctx.$t("forms.cliente.fields.email") + " *",
                              filled: "",
                              type: "email",
                              "lazy-rules": "",
                              rules: [
                                (val) => !!val || _ctx.$t("forms.validation.required"),
                                (val) => /^[^@]+@[^@]+\.[^@]+$/.test(val) || _ctx.$t("forms.validation.email")
                              ]
                            }, null, 8, ["modelValue", "label", "rules"])
                          ]),
                          createBaseVNode("div", _hoisted_19, [
                            createVNode(QInput, {
                              modelValue: $setup.form.telefone,
                              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.form.telefone = $event),
                              label: _ctx.$t("forms.cliente.fields.telefone"),
                              filled: "",
                              mask: "(##) ####-####"
                            }, null, 8, ["modelValue", "label"])
                          ]),
                          createBaseVNode("div", _hoisted_20, [
                            createVNode(QInput, {
                              modelValue: $setup.form.celular,
                              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.form.celular = $event),
                              label: _ctx.$t("forms.cliente.fields.celular") + " *",
                              filled: "",
                              mask: "(##) #####-####",
                              "lazy-rules": "",
                              rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                            }, null, 8, ["modelValue", "label", "rules"])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(QCard, {
              flat: "",
              bordered: "",
              class: "q-mt-md q-mb-md"
            }, {
              default: withCtx(() => [
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_21, [
                      createVNode(QIcon, {
                        name: "location_on",
                        class: "q-mr-sm"
                      }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("forms.cliente.sections.addresses")), 1)
                    ]),
                    createBaseVNode("div", _hoisted_22, [
                      createBaseVNode("div", _hoisted_23, [
                        createVNode(QInput, {
                          modelValue: $setup.form.endereco.cep,
                          "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.form.endereco.cep = $event),
                          label: _ctx.$t("forms.cliente.address.fields.cep") + " *",
                          filled: "",
                          mask: "#####-###",
                          "lazy-rules": "",
                          rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                          onBlur: _cache[9] || (_cache[9] = ($event) => $setup.buscarEnderecoPorCep($setup.form.endereco.cep, "cliente"))
                        }, null, 8, ["modelValue", "label", "rules"])
                      ]),
                      createBaseVNode("div", _hoisted_24, [
                        createVNode(QInput, {
                          modelValue: $setup.form.endereco.rua,
                          "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $setup.form.endereco.rua = $event),
                          label: _ctx.$t("forms.cliente.address.fields.rua") + " *",
                          filled: "",
                          "lazy-rules": "",
                          rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                        }, null, 8, ["modelValue", "label", "rules"])
                      ]),
                      createBaseVNode("div", _hoisted_25, [
                        createVNode(QInput, {
                          modelValue: $setup.form.endereco.numero,
                          "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $setup.form.endereco.numero = $event),
                          label: _ctx.$t("forms.cliente.address.fields.numero") + " *",
                          filled: "",
                          "lazy-rules": "",
                          rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                        }, null, 8, ["modelValue", "label", "rules"])
                      ]),
                      createBaseVNode("div", _hoisted_26, [
                        createVNode(QInput, {
                          modelValue: $setup.form.endereco.complemento,
                          "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $setup.form.endereco.complemento = $event),
                          label: _ctx.$t("forms.cliente.address.fields.complemento"),
                          filled: ""
                        }, null, 8, ["modelValue", "label"])
                      ]),
                      createBaseVNode("div", _hoisted_27, [
                        createVNode(QInput, {
                          modelValue: $setup.form.endereco.bairro,
                          "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $setup.form.endereco.bairro = $event),
                          label: _ctx.$t("forms.cliente.address.fields.bairro") + " *",
                          filled: "",
                          "lazy-rules": "",
                          rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                        }, null, 8, ["modelValue", "label", "rules"])
                      ]),
                      createBaseVNode("div", _hoisted_28, [
                        createVNode(QInput, {
                          modelValue: $setup.form.endereco.cidade,
                          "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $setup.form.endereco.cidade = $event),
                          label: _ctx.$t("forms.cliente.address.fields.cidade") + " *",
                          filled: "",
                          "lazy-rules": "",
                          rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                        }, null, 8, ["modelValue", "label", "rules"])
                      ]),
                      createBaseVNode("div", _hoisted_29, [
                        createVNode(QInput, {
                          modelValue: $setup.form.endereco.estado,
                          "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $setup.form.endereco.estado = $event),
                          label: _ctx.$t("forms.cliente.address.fields.estado") + " *",
                          filled: "",
                          "lazy-rules": "",
                          rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                        }, null, 8, ["modelValue", "label", "rules"])
                      ])
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            createVNode(QCard, {
              flat: "",
              bordered: "",
              class: "q-mt-md q-mb-md"
            }, {
              default: withCtx(() => [
                createVNode(QExpansionItem, {
                  modelValue: $setup.imoveisExpanded,
                  "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => $setup.imoveisExpanded = $event),
                  "expand-separator": ""
                }, {
                  header: withCtx(() => [
                    createVNode(QItemSection, null, {
                      default: withCtx(() => [
                        createVNode(QItemLabel, { class: "text-h6 text-primary" }, {
                          default: withCtx(() => [
                            createVNode(QIcon, {
                              name: "home",
                              class: "q-mr-sm"
                            }),
                            createTextVNode(" " + toDisplayString(_ctx.$t("forms.cliente.sections.properties")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(Transition, {
                          "enter-active-class": "animated fadeIn",
                          "leave-active-class": "animated fadeOut"
                        }, {
                          default: withCtx(() => [
                            !$setup.imoveisExpanded ? (openBlock(), createBlock(QItemLabel, {
                              key: 0,
                              caption: ""
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString($setup.form.imoveis.length) + " imóvel(s) ", 1)
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(QItemSection, { side: "" }, {
                      default: withCtx(() => [
                        createVNode(QBtn, {
                          color: "primary",
                          icon: "add_home",
                          label: _ctx.$t("forms.cliente.property.addButton"),
                          flat: "",
                          size: "sm",
                          onClick: withModifiers($setup.adicionarNovoImovel, ["stop"])
                        }, null, 8, ["label", "onClick"])
                      ]),
                      _: 1
                    })
                  ]),
                  default: withCtx(() => [
                    createVNode(QCardSection, null, {
                      default: withCtx(() => [
                        $setup.form.imoveis.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_30, [
                          createVNode(QIcon, {
                            name: "home_work",
                            size: "48px",
                            class: "q-mb-md"
                          }),
                          createBaseVNode("div", _hoisted_31, toDisplayString(_ctx.$t("forms.cliente.property.noProperties")), 1),
                          createBaseVNode("div", _hoisted_32, toDisplayString(_ctx.$t("forms.cliente.property.clickToAdd")), 1)
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createElementBlock(Fragment, null, renderList($setup.form.imoveis, (imovel, index) => {
                          return openBlock(), createElementBlock("div", {
                            key: imovel.id,
                            class: "q-mb-md"
                          }, [
                            createVNode(QCard, {
                              flat: "",
                              bordered: "",
                              class: "bg-grey-1"
                            }, {
                              default: withCtx(() => [
                                createVNode(QCardSection, { class: "q-pb-none" }, {
                                  default: withCtx(() => [
                                    createBaseVNode("div", _hoisted_33, [
                                      createBaseVNode("div", _hoisted_34, toDisplayString(_ctx.$t("forms.cliente.property.title", [index + 1])), 1),
                                      createVNode(QSpace),
                                      createVNode(QBtn, {
                                        flat: "",
                                        round: "",
                                        color: "negative",
                                        icon: "delete",
                                        size: "sm",
                                        onClick: ($event) => $setup.removerImovel(index)
                                      }, null, 8, ["onClick"])
                                    ])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(QCardSection, { class: "q-pt-none" }, {
                                  default: withCtx(() => [
                                    createBaseVNode("div", _hoisted_35, [
                                      createBaseVNode("div", _hoisted_36, [
                                        createVNode(QInput, {
                                          modelValue: imovel.totalComodos,
                                          "onUpdate:modelValue": ($event) => imovel.totalComodos = $event,
                                          label: _ctx.$t("forms.cliente.property.fields.totalComodos") + " *",
                                          filled: "",
                                          type: "number",
                                          min: "1",
                                          "lazy-rules": "",
                                          rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                      ]),
                                      createBaseVNode("div", _hoisted_37, [
                                        createVNode(QInput, {
                                          modelValue: imovel.numeroQuartos,
                                          "onUpdate:modelValue": ($event) => imovel.numeroQuartos = $event,
                                          label: _ctx.$t("forms.cliente.property.fields.numeroQuartos") + " *",
                                          filled: "",
                                          type: "number",
                                          min: "0",
                                          "lazy-rules": "",
                                          rules: [(val) => val >= 0 || _ctx.$t("forms.validation.required")]
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                      ]),
                                      createBaseVNode("div", _hoisted_38, [
                                        createVNode(QInput, {
                                          modelValue: imovel.numeroBanheiros,
                                          "onUpdate:modelValue": ($event) => imovel.numeroBanheiros = $event,
                                          label: _ctx.$t("forms.cliente.property.fields.numeroBanheiros") + " *",
                                          filled: "",
                                          type: "number",
                                          min: "1",
                                          "lazy-rules": "",
                                          rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                      ]),
                                      createBaseVNode("div", _hoisted_39, [
                                        createVNode(QInput, {
                                          modelValue: imovel.areaTotal,
                                          "onUpdate:modelValue": ($event) => imovel.areaTotal = $event,
                                          label: _ctx.$t("forms.cliente.property.fields.areaTotal") + " *",
                                          filled: "",
                                          type: "number",
                                          min: "1",
                                          suffix: "m²",
                                          "lazy-rules": "",
                                          rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                      ]),
                                      createBaseVNode("div", _hoisted_40, [
                                        createVNode(QInput, {
                                          modelValue: imovel.observacao,
                                          "onUpdate:modelValue": ($event) => imovel.observacao = $event,
                                          label: _ctx.$t("forms.cliente.property.fields.observacao"),
                                          filled: "",
                                          type: "textarea",
                                          rows: "2"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                      ]),
                                      createBaseVNode("div", _hoisted_41, [
                                        createBaseVNode("div", _hoisted_42, [
                                          createVNode(QIcon, {
                                            name: "location_on",
                                            class: "q-mr-xs"
                                          }),
                                          createTextVNode(" " + toDisplayString(_ctx.$t("forms.cliente.property.address.title")), 1)
                                        ])
                                      ]),
                                      createBaseVNode("div", _hoisted_43, [
                                        createVNode(QCheckbox, {
                                          modelValue: imovel.mesmoEnderecoCliente,
                                          "onUpdate:modelValue": [($event) => imovel.mesmoEnderecoCliente = $event, (value) => $setup.copiarEnderecoCliente(index, value)],
                                          label: _ctx.$t("forms.cliente.property.address.sameAsClient"),
                                          color: "primary"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                      ]),
                                      createBaseVNode("div", _hoisted_44, [
                                        createVNode(QInput, {
                                          modelValue: imovel.endereco.cep,
                                          "onUpdate:modelValue": ($event) => imovel.endereco.cep = $event,
                                          label: _ctx.$t("forms.cliente.address.fields.cep") + " *",
                                          filled: "",
                                          mask: "#####-###",
                                          "lazy-rules": "",
                                          rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                                          onBlur: ($event) => $setup.buscarEnderecoPorCep(imovel.endereco.cep, "imovel", index)
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules", "onBlur"])
                                      ]),
                                      createBaseVNode("div", _hoisted_45, [
                                        createVNode(QInput, {
                                          modelValue: imovel.endereco.rua,
                                          "onUpdate:modelValue": ($event) => imovel.endereco.rua = $event,
                                          label: _ctx.$t("forms.cliente.address.fields.rua") + " *",
                                          filled: "",
                                          "lazy-rules": "",
                                          rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                      ]),
                                      createBaseVNode("div", _hoisted_46, [
                                        createVNode(QInput, {
                                          modelValue: imovel.endereco.numero,
                                          "onUpdate:modelValue": ($event) => imovel.endereco.numero = $event,
                                          label: _ctx.$t("forms.cliente.address.fields.numero") + " *",
                                          filled: "",
                                          "lazy-rules": "",
                                          rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                      ]),
                                      createBaseVNode("div", _hoisted_47, [
                                        createVNode(QInput, {
                                          modelValue: imovel.endereco.complemento,
                                          "onUpdate:modelValue": ($event) => imovel.endereco.complemento = $event,
                                          label: _ctx.$t("forms.cliente.address.fields.complemento"),
                                          filled: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                      ]),
                                      createBaseVNode("div", _hoisted_48, [
                                        createVNode(QInput, {
                                          modelValue: imovel.endereco.bairro,
                                          "onUpdate:modelValue": ($event) => imovel.endereco.bairro = $event,
                                          label: _ctx.$t("forms.cliente.address.fields.bairro") + " *",
                                          filled: "",
                                          "lazy-rules": "",
                                          rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                      ]),
                                      createBaseVNode("div", _hoisted_49, [
                                        createVNode(QInput, {
                                          modelValue: imovel.endereco.cidade,
                                          "onUpdate:modelValue": ($event) => imovel.endereco.cidade = $event,
                                          label: _ctx.$t("forms.cliente.address.fields.cidade") + " *",
                                          filled: "",
                                          "lazy-rules": "",
                                          rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                      ]),
                                      createBaseVNode("div", _hoisted_50, [
                                        createVNode(QInput, {
                                          modelValue: imovel.endereco.estado,
                                          "onUpdate:modelValue": ($event) => imovel.endereco.estado = $event,
                                          label: _ctx.$t("forms.cliente.address.fields.estado") + " *",
                                          filled: "",
                                          "lazy-rules": "",
                                          rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
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
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ]),
              _: 1
            }),
            createVNode(QCard, {
              flat: "",
              bordered: "",
              class: "q-mt-md q-mb-md"
            }, {
              default: withCtx(() => [
                createVNode(QCardSection, null, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_51, [
                      createVNode(QIcon, {
                        name: "notes",
                        class: "q-mr-sm"
                      }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("forms.cliente.sections.observacoes")), 1)
                    ]),
                    createBaseVNode("div", _hoisted_52, [
                      createBaseVNode("div", _hoisted_53, [
                        createVNode(QInput, {
                          modelValue: $setup.form.observacoes,
                          "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => $setup.form.observacoes = $event),
                          label: _ctx.$t("forms.cliente.fields.observacoes"),
                          filled: "",
                          type: "textarea",
                          rows: "4"
                        }, null, 8, ["modelValue", "label"])
                      ])
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", _hoisted_54, [
            createVNode(QCard, {
              flat: "",
              bordered: ""
            }, {
              default: withCtx(() => [
                createVNode(QCardSection, { class: "q-pb-sm" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_55, [
                      createBaseVNode("div", _hoisted_56, toDisplayString($setup.secoes[$setup.secaoAtual].titulo), 1),
                      createBaseVNode("div", _hoisted_57, toDisplayString($setup.secaoAtual + 1) + "/" + toDisplayString($setup.secoes.length), 1)
                    ]),
                    createVNode(QLinearProgress, {
                      value: ($setup.secaoAtual + 1) / $setup.secoes.length,
                      color: "primary",
                      size: "4px"
                    }, null, 8, ["value"])
                  ]),
                  _: 1
                }),
                createVNode(QCarousel, {
                  modelValue: $setup.secaoAtual,
                  "onUpdate:modelValue": _cache[34] || (_cache[34] = ($event) => $setup.secaoAtual = $event),
                  "transition-prev": "slide-right",
                  "transition-next": "slide-left",
                  swipeable: "",
                  animated: "",
                  "control-color": "primary",
                  height: "auto",
                  class: "rounded-borders"
                }, {
                  default: withCtx(() => [
                    createVNode(QCarouselSlide, {
                      name: 0,
                      class: "q-pa-none"
                    }, {
                      default: withCtx(() => [
                        createVNode(QCardSection, null, {
                          default: withCtx(() => [
                            createBaseVNode("div", _hoisted_58, [
                              createVNode(QIcon, {
                                name: "person",
                                class: "q-mr-sm"
                              }),
                              createTextVNode(" " + toDisplayString(_ctx.$t("forms.cliente.sections.personalData")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_59, [
                              createBaseVNode("div", _hoisted_60, [
                                createBaseVNode("div", _hoisted_61, toDisplayString(_ctx.$t("forms.cliente.fields.foto")), 1),
                                createVNode(QAvatar, {
                                  size: "100px",
                                  class: "q-mb-md"
                                }, {
                                  default: withCtx(() => [
                                    $setup.form.fotoPreview ? (openBlock(), createElementBlock("img", {
                                      key: 0,
                                      src: $setup.form.fotoPreview,
                                      alt: "Foto do cliente",
                                      style: { "object-fit": "cover" }
                                    }, null, 8, _hoisted_62)) : (openBlock(), createBlock(QIcon, {
                                      key: 1,
                                      name: "person",
                                      size: "50px",
                                      color: "grey-6"
                                    }))
                                  ]),
                                  _: 1
                                }),
                                createBaseVNode("div", null, [
                                  createVNode(QBtn, {
                                    color: "primary",
                                    icon: "photo_camera",
                                    label: $setup.form.fotoPreview ? "Alterar Foto" : "Adicionar Foto",
                                    size: "sm",
                                    outline: "",
                                    onClick: _cache[18] || (_cache[18] = ($event) => _ctx.$refs.fotoInputMobile.pickFiles()),
                                    class: "q-mb-xs"
                                  }, null, 8, ["label"]),
                                  $setup.form.fotoPreview ? (openBlock(), createBlock(QBtn, {
                                    key: 0,
                                    color: "negative",
                                    icon: "delete",
                                    label: "Remover",
                                    size: "sm",
                                    flat: "",
                                    onClick: $setup.removerFoto,
                                    class: "q-ml-sm"
                                  }, null, 8, ["onClick"])) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode(QInput, {
                                modelValue: $setup.form.nome,
                                "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => $setup.form.nome = $event),
                                label: _ctx.$t("forms.cliente.fields.nome") + " *",
                                filled: "",
                                "lazy-rules": "",
                                rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                              }, null, 8, ["modelValue", "label", "rules"]),
                              createVNode(QInput, {
                                modelValue: $setup.form.sobrenome,
                                "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => $setup.form.sobrenome = $event),
                                label: _ctx.$t("forms.cliente.fields.sobrenome") + " *",
                                filled: "",
                                "lazy-rules": "",
                                rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                              }, null, 8, ["modelValue", "label", "rules"]),
                              createVNode(QInput, {
                                modelValue: $setup.form.email,
                                "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => $setup.form.email = $event),
                                label: _ctx.$t("forms.cliente.fields.email") + " *",
                                filled: "",
                                type: "email",
                                "lazy-rules": "",
                                rules: [
                                  (val) => !!val || _ctx.$t("forms.validation.required"),
                                  (val) => /^[^@]+@[^@]+\.[^@]+$/.test(val) || _ctx.$t("forms.validation.email")
                                ]
                              }, null, 8, ["modelValue", "label", "rules"]),
                              createVNode(QInput, {
                                modelValue: $setup.form.celular,
                                "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => $setup.form.celular = $event),
                                label: _ctx.$t("forms.cliente.fields.celular") + " *",
                                filled: "",
                                mask: "(##) #####-####",
                                "lazy-rules": "",
                                rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                              }, null, 8, ["modelValue", "label", "rules"]),
                              createVNode(QInput, {
                                modelValue: $setup.form.telefone,
                                "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => $setup.form.telefone = $event),
                                label: _ctx.$t("forms.cliente.fields.telefone"),
                                filled: "",
                                mask: "(##) ####-####"
                              }, null, 8, ["modelValue", "label"]),
                              createVNode(QFile, {
                                modelValue: $setup.form.foto,
                                "onUpdate:modelValue": [
                                  _cache[24] || (_cache[24] = ($event) => $setup.form.foto = $event),
                                  $setup.onFotoSelecionada
                                ],
                                accept: "image/*",
                                "max-file-size": "5242880",
                                style: { "display": "none" },
                                ref: "fotoInputMobile"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(QCarouselSlide, {
                      name: 1,
                      class: "q-pa-none"
                    }, {
                      default: withCtx(() => [
                        createVNode(QCardSection, null, {
                          default: withCtx(() => [
                            createBaseVNode("div", _hoisted_63, [
                              createVNode(QIcon, {
                                name: "location_on",
                                class: "q-mr-sm"
                              }),
                              createTextVNode(" " + toDisplayString(_ctx.$t("forms.cliente.sections.addresses")), 1)
                            ]),
                            createBaseVNode("div", _hoisted_64, [
                              createVNode(QInput, {
                                modelValue: $setup.form.endereco.cep,
                                "onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => $setup.form.endereco.cep = $event),
                                label: _ctx.$t("forms.cliente.address.fields.cep") + " *",
                                filled: "",
                                mask: "#####-###",
                                "lazy-rules": "",
                                rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                                onBlur: _cache[26] || (_cache[26] = ($event) => $setup.buscarEnderecoPorCep($setup.form.endereco.cep, "cliente"))
                              }, null, 8, ["modelValue", "label", "rules"]),
                              createVNode(QInput, {
                                modelValue: $setup.form.endereco.rua,
                                "onUpdate:modelValue": _cache[27] || (_cache[27] = ($event) => $setup.form.endereco.rua = $event),
                                label: _ctx.$t("forms.cliente.address.fields.rua") + " *",
                                filled: "",
                                "lazy-rules": "",
                                rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                              }, null, 8, ["modelValue", "label", "rules"]),
                              createVNode(QInput, {
                                modelValue: $setup.form.endereco.numero,
                                "onUpdate:modelValue": _cache[28] || (_cache[28] = ($event) => $setup.form.endereco.numero = $event),
                                label: _ctx.$t("forms.cliente.address.fields.numero") + " *",
                                filled: "",
                                "lazy-rules": "",
                                rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                              }, null, 8, ["modelValue", "label", "rules"]),
                              createVNode(QInput, {
                                modelValue: $setup.form.endereco.complemento,
                                "onUpdate:modelValue": _cache[29] || (_cache[29] = ($event) => $setup.form.endereco.complemento = $event),
                                label: _ctx.$t("forms.cliente.address.fields.complemento"),
                                filled: ""
                              }, null, 8, ["modelValue", "label"]),
                              createVNode(QInput, {
                                modelValue: $setup.form.endereco.bairro,
                                "onUpdate:modelValue": _cache[30] || (_cache[30] = ($event) => $setup.form.endereco.bairro = $event),
                                label: _ctx.$t("forms.cliente.address.fields.bairro") + " *",
                                filled: "",
                                "lazy-rules": "",
                                rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                              }, null, 8, ["modelValue", "label", "rules"]),
                              createVNode(QInput, {
                                modelValue: $setup.form.endereco.cidade,
                                "onUpdate:modelValue": _cache[31] || (_cache[31] = ($event) => $setup.form.endereco.cidade = $event),
                                label: _ctx.$t("forms.cliente.address.fields.cidade") + " *",
                                filled: "",
                                "lazy-rules": "",
                                rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                              }, null, 8, ["modelValue", "label", "rules"]),
                              createVNode(QInput, {
                                modelValue: $setup.form.endereco.estado,
                                "onUpdate:modelValue": _cache[32] || (_cache[32] = ($event) => $setup.form.endereco.estado = $event),
                                label: _ctx.$t("forms.cliente.address.fields.estado") + " *",
                                filled: "",
                                "lazy-rules": "",
                                rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                              }, null, 8, ["modelValue", "label", "rules"])
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(QCarouselSlide, {
                      name: 2,
                      class: "q-pa-none"
                    }, {
                      default: withCtx(() => [
                        createVNode(QCardSection, null, {
                          default: withCtx(() => [
                            createBaseVNode("div", _hoisted_65, [
                              createBaseVNode("div", _hoisted_66, [
                                createVNode(QIcon, {
                                  name: "home",
                                  class: "q-mr-sm"
                                }),
                                createTextVNode(" " + toDisplayString(_ctx.$t("forms.cliente.sections.properties")), 1)
                              ]),
                              createVNode(QBtn, {
                                color: "primary",
                                icon: "add_home",
                                label: _ctx.$t("forms.cliente.property.addButton"),
                                flat: "",
                                size: "sm",
                                onClick: $setup.adicionarNovoImovel
                              }, null, 8, ["label", "onClick"])
                            ]),
                            $setup.form.imoveis.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_67, [
                              createVNode(QIcon, {
                                name: "home_work",
                                size: "48px",
                                class: "q-mb-md"
                              }),
                              createBaseVNode("div", _hoisted_68, toDisplayString(_ctx.$t("forms.cliente.property.noProperties")), 1),
                              createBaseVNode("div", _hoisted_69, toDisplayString(_ctx.$t("forms.cliente.property.clickToAdd")), 1)
                            ])) : createCommentVNode("", true),
                            (openBlock(true), createElementBlock(Fragment, null, renderList($setup.form.imoveis, (imovel, index) => {
                              return openBlock(), createElementBlock("div", {
                                key: imovel.id,
                                class: "q-mb-md"
                              }, [
                                createVNode(QCard, {
                                  flat: "",
                                  bordered: "",
                                  class: "bg-grey-1"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(QCardSection, { class: "q-pb-none" }, {
                                      default: withCtx(() => [
                                        createBaseVNode("div", _hoisted_70, [
                                          createBaseVNode("div", _hoisted_71, toDisplayString(_ctx.$t("forms.cliente.property.title", [index + 1])), 1),
                                          createVNode(QSpace),
                                          createVNode(QBtn, {
                                            flat: "",
                                            round: "",
                                            color: "negative",
                                            icon: "delete",
                                            size: "sm",
                                            onClick: ($event) => $setup.removerImovel(index)
                                          }, null, 8, ["onClick"])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(QCardSection, { class: "q-pt-none" }, {
                                      default: withCtx(() => [
                                        createBaseVNode("div", _hoisted_72, [
                                          createVNode(QInput, {
                                            modelValue: imovel.totalComodos,
                                            "onUpdate:modelValue": ($event) => imovel.totalComodos = $event,
                                            label: _ctx.$t("forms.cliente.property.fields.totalComodos") + " *",
                                            filled: "",
                                            type: "number",
                                            min: "1",
                                            "lazy-rules": "",
                                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"]),
                                          createVNode(QInput, {
                                            modelValue: imovel.numeroQuartos,
                                            "onUpdate:modelValue": ($event) => imovel.numeroQuartos = $event,
                                            label: _ctx.$t("forms.cliente.property.fields.numeroQuartos") + " *",
                                            filled: "",
                                            type: "number",
                                            min: "0",
                                            "lazy-rules": "",
                                            rules: [(val) => val >= 0 || _ctx.$t("forms.validation.required")]
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"]),
                                          createVNode(QInput, {
                                            modelValue: imovel.numeroBanheiros,
                                            "onUpdate:modelValue": ($event) => imovel.numeroBanheiros = $event,
                                            label: _ctx.$t("forms.cliente.property.fields.numeroBanheiros") + " *",
                                            filled: "",
                                            type: "number",
                                            min: "1",
                                            "lazy-rules": "",
                                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"]),
                                          createVNode(QInput, {
                                            modelValue: imovel.areaTotal,
                                            "onUpdate:modelValue": ($event) => imovel.areaTotal = $event,
                                            label: _ctx.$t("forms.cliente.property.fields.areaTotal") + " *",
                                            filled: "",
                                            type: "number",
                                            min: "1",
                                            suffix: "m²",
                                            "lazy-rules": "",
                                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"]),
                                          createVNode(QInput, {
                                            modelValue: imovel.observacao,
                                            "onUpdate:modelValue": ($event) => imovel.observacao = $event,
                                            label: _ctx.$t("forms.cliente.property.fields.observacao"),
                                            filled: "",
                                            type: "textarea",
                                            rows: "7"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                                          createBaseVNode("div", _hoisted_73, [
                                            createVNode(QIcon, {
                                              name: "location_on",
                                              class: "q-mr-xs"
                                            }),
                                            createTextVNode(" " + toDisplayString(_ctx.$t("forms.cliente.property.address.title")), 1)
                                          ]),
                                          createVNode(QCheckbox, {
                                            modelValue: imovel.mesmoEnderecoCliente,
                                            "onUpdate:modelValue": [($event) => imovel.mesmoEnderecoCliente = $event, (value) => $setup.copiarEnderecoCliente(index, value)],
                                            label: _ctx.$t("forms.cliente.property.address.sameAsClient"),
                                            color: "primary"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                                          createVNode(QInput, {
                                            modelValue: imovel.endereco.cep,
                                            "onUpdate:modelValue": ($event) => imovel.endereco.cep = $event,
                                            label: _ctx.$t("forms.cliente.address.fields.cep") + " *",
                                            filled: "",
                                            mask: "#####-###",
                                            "lazy-rules": "",
                                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                                            onBlur: ($event) => $setup.buscarEnderecoPorCep(imovel.endereco.cep, "imovel", index)
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules", "onBlur"]),
                                          createVNode(QInput, {
                                            modelValue: imovel.endereco.rua,
                                            "onUpdate:modelValue": ($event) => imovel.endereco.rua = $event,
                                            label: _ctx.$t("forms.cliente.address.fields.rua") + " *",
                                            filled: "",
                                            "lazy-rules": "",
                                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"]),
                                          createVNode(QInput, {
                                            modelValue: imovel.endereco.numero,
                                            "onUpdate:modelValue": ($event) => imovel.endereco.numero = $event,
                                            label: _ctx.$t("forms.cliente.address.fields.numero") + " *",
                                            filled: "",
                                            "lazy-rules": "",
                                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"]),
                                          createVNode(QInput, {
                                            modelValue: imovel.endereco.complemento,
                                            "onUpdate:modelValue": ($event) => imovel.endereco.complemento = $event,
                                            label: _ctx.$t("forms.cliente.address.fields.complemento"),
                                            filled: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                                          createVNode(QInput, {
                                            modelValue: imovel.endereco.bairro,
                                            "onUpdate:modelValue": ($event) => imovel.endereco.bairro = $event,
                                            label: _ctx.$t("forms.cliente.address.fields.bairro") + " *",
                                            filled: "",
                                            "lazy-rules": "",
                                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"]),
                                          createVNode(QInput, {
                                            modelValue: imovel.endereco.cidade,
                                            "onUpdate:modelValue": ($event) => imovel.endereco.cidade = $event,
                                            label: _ctx.$t("forms.cliente.address.fields.cidade") + " *",
                                            filled: "",
                                            "lazy-rules": "",
                                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"]),
                                          createVNode(QInput, {
                                            modelValue: imovel.endereco.estado,
                                            "onUpdate:modelValue": ($event) => imovel.endereco.estado = $event,
                                            label: _ctx.$t("forms.cliente.address.fields.estado") + " *",
                                            filled: "",
                                            "lazy-rules": "",
                                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"]),
                                          createBaseVNode("div", _hoisted_74, [
                                            createVNode(QIcon, {
                                              name: "photo_camera",
                                              class: "q-mr-xs"
                                            }),
                                            createTextVNode(" " + toDisplayString(_ctx.$t("forms.cliente.property.images.title")), 1)
                                          ]),
                                          createBaseVNode("div", _hoisted_75, [
                                            createVNode(QBtn, {
                                              color: "primary",
                                              icon: "photo_library",
                                              label: _ctx.$t("forms.cliente.property.images.chooseFile"),
                                              size: "sm",
                                              outline: "",
                                              onClick: ($event) => _ctx.$refs[`imagemInput${index}`][0].pickFiles()
                                            }, null, 8, ["label", "onClick"]),
                                            createVNode(QBtn, {
                                              color: "primary",
                                              icon: "photo_camera",
                                              label: _ctx.$t("forms.cliente.property.images.takePhoto"),
                                              size: "sm",
                                              outline: "",
                                              onClick: ($event) => _ctx.$refs[`cameraInput${index}`][0].pickFiles()
                                            }, null, 8, ["label", "onClick"])
                                          ]),
                                          createVNode(QFile, {
                                            ref_for: true,
                                            ref: `imagemInput${index}`,
                                            modelValue: imovel.imagemTemp,
                                            "onUpdate:modelValue": [($event) => imovel.imagemTemp = $event, (files) => $setup.onImagensSelecionadas(files, index)],
                                            accept: "image/*",
                                            "max-file-size": "5242880",
                                            multiple: "",
                                            style: { "display": "none" }
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                          createVNode(QFile, {
                                            ref_for: true,
                                            ref: `cameraInput${index}`,
                                            modelValue: imovel.cameraTemp,
                                            "onUpdate:modelValue": [($event) => imovel.cameraTemp = $event, (file) => $setup.onImagemCamera(file, index)],
                                            accept: "image/*",
                                            capture: "environment",
                                            "max-file-size": "5242880",
                                            style: { "display": "none" }
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                          imovel.imagens && imovel.imagens.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_76, [
                                            createBaseVNode("div", _hoisted_77, toDisplayString(_ctx.$t("forms.cliente.property.images.addedImages", [imovel.imagens.length])), 1),
                                            createBaseVNode("div", _hoisted_78, [
                                              (openBlock(true), createElementBlock(Fragment, null, renderList(imovel.imagens, (imagem, imgIndex) => {
                                                return openBlock(), createElementBlock("div", {
                                                  key: imgIndex,
                                                  class: "col-6 col-sm-4"
                                                }, [
                                                  createVNode(QCard, {
                                                    flat: "",
                                                    bordered: "",
                                                    class: "imagem-preview"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(QImg, {
                                                        src: imagem.preview || imagem.url,
                                                        alt: imagem.nome || `Imagem ${imgIndex + 1}`,
                                                        ratio: "1",
                                                        class: "rounded-borders",
                                                        style: { "height": "80px" }
                                                      }, {
                                                        default: withCtx(() => [
                                                          createBaseVNode("div", _hoisted_79, [
                                                            createVNode(QBtn, {
                                                              round: "",
                                                              dense: "",
                                                              color: "negative",
                                                              icon: "close",
                                                              size: "xs",
                                                              onClick: ($event) => $setup.removerImagemImovel(index, imgIndex)
                                                            }, null, 8, ["onClick"])
                                                          ])
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["src", "alt"]),
                                                      createVNode(QCardSection, { class: "q-pa-xs" }, {
                                                        default: withCtx(() => [
                                                          createVNode(QInput, {
                                                            modelValue: imagem.descricao,
                                                            "onUpdate:modelValue": ($event) => imagem.descricao = $event,
                                                            placeholder: _ctx.$t("forms.cliente.property.images.description"),
                                                            dense: "",
                                                            filled: "",
                                                            class: "text-caption"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder"])
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]);
                                              }), 128))
                                            ])
                                          ])) : (openBlock(), createElementBlock("div", _hoisted_80, [
                                            createVNode(QIcon, {
                                              name: "photo",
                                              size: "32px",
                                              class: "q-mb-sm"
                                            }),
                                            createBaseVNode("div", _hoisted_81, toDisplayString(_ctx.$t("forms.cliente.property.images.noImages")), 1)
                                          ]))
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(QCarouselSlide, {
                      name: 3,
                      class: "q-pa-none"
                    }, {
                      default: withCtx(() => [
                        createVNode(QCardSection, null, {
                          default: withCtx(() => [
                            createBaseVNode("div", _hoisted_82, [
                              createVNode(QIcon, {
                                name: "notes",
                                class: "q-mr-sm"
                              }),
                              createTextVNode(" " + toDisplayString(_ctx.$t("forms.cliente.sections.observacoes")), 1)
                            ]),
                            createVNode(QInput, {
                              modelValue: $setup.form.observacoes,
                              "onUpdate:modelValue": _cache[33] || (_cache[33] = ($event) => $setup.form.observacoes = $event),
                              label: _ctx.$t("forms.cliente.fields.observacoes"),
                              filled: "",
                              type: "textarea",
                              rows: "6"
                            }, null, 8, ["modelValue", "label"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"]),
                createVNode(QCardSection, { class: "q-pt-sm" }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_83, [
                      withDirectives(createVNode(QBtn, {
                        flat: "",
                        label: _ctx.$t("forms.buttons.previous"),
                        color: "primary",
                        icon: "chevron_left",
                        onClick: $setup.voltarSecao
                      }, null, 8, ["label", "onClick"]), [
                        [vShow, $setup.secaoAtual > 0]
                      ]),
                      withDirectives(createBaseVNode("div", null, null, 512), [
                        [vShow, $setup.secaoAtual === 0]
                      ]),
                      withDirectives(createVNode(QBtn, {
                        flat: "",
                        label: _ctx.$t("forms.buttons.next"),
                        color: "primary",
                        "icon-right": "chevron_right",
                        onClick: $setup.proximaSecao
                      }, null, 8, ["label", "onClick"]), [
                        [vShow, $setup.secaoAtual < $setup.secoes.length - 1]
                      ])
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", _hoisted_84, [
            createVNode(QBtn, {
              flat: "",
              label: _ctx.$t("forms.buttons.cancel"),
              onClick: $setup.voltarParaListagem
            }, null, 8, ["label", "onClick"]),
            createVNode(QBtn, {
              color: "primary",
              label: $setup.isEditMode ? _ctx.$t("pages.clientEdit.buttons.save") : _ctx.$t("forms.buttons.save"),
              type: "submit",
              loading: $setup.loading
            }, null, 8, ["label", "loading"])
          ])
        ]),
        _: 1
      }, 8, ["onSubmit"])
    ]),
    _: 1
  });
}
const ClienteCadastroPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cace43c5"]]);
export {
  ClienteCadastroPage as default
};
//# sourceMappingURL=ClienteCadastroPage-DVP5piF-.js.map
