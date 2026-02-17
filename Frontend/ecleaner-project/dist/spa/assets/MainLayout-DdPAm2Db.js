import { n as createComponent, p as computed, q as h, s as hSlot, v as getCurrentInstance, x as inject, y as emptyRenderFn, z as layoutKey, r as ref, A as watch, B as onBeforeUnmount, C as hUniqueSlot, E as createDirective, F as cleanEvt, G as client, H as preventDraggable, I as noop, J as addEvt, K as position, L as prevent, M as stop, O as leftClick, P as stopAndPrevent, R as useModelToggleEmits, S as useDarkProps, T as useModelToggleProps, U as useDark, V as useTimeout, W as useModelToggle, X as useHistory, Y as usePreventScroll, Z as nextTick, $ as onMounted, a0 as withDirectives, a1 as hDir, a2 as isRuntimeSsrPreHydration, a3 as hMergeSlot, _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, u as useAuthStore, b as useRouter, a4 as useRoute, a5 as resolveComponent, e as createVNode, f as createBaseVNode, l as QBtn, k as QIcon, i as createCommentVNode, m as createTextVNode, a6 as QAvatar, t as toDisplayString, a7 as QSeparator, a8 as Ripple } from "./index-C_9ZqZx5.js";
import { Q as QImg } from "./QImg-DiYq_5sI.js";
import { b as between, Q as QItem, a as QItemSection } from "./format-X8mfcfls.js";
import { Q as QList } from "./QList-DrRTzTWV.js";
import { Q as QMenu } from "./QMenu-0ExrfRXY.js";
import { b as QResizeObserver, Q as QLayout, a as QPageContainer } from "./QLayout-DKybGM2j.js";
import { Q as QExpansionItem } from "./QExpansionItem-BPdw40_F.js";
import { g as getModifierDirections, s as shouldStart } from "./touch-BscSWsHh.js";
import { c as clearSelection } from "./selection-q6_tzKdx.js";
import { C as ClosePopup } from "./ClosePopup-BrDwQcvw.js";
import { u as useQuasar } from "./use-quasar-RhPDzzvJ.js";
import { u as useI18n } from "./vue-i18n.runtime-BcAS3Jju.js";
import "./position-engine-D6xtJVbJ.js";
const QToolbarTitle = createComponent({
  name: "QToolbarTitle",
  props: {
    shrink: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => "q-toolbar__title ellipsis" + (props.shrink === true ? " col-shrink" : "")
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
const QToolbar = createComponent({
  name: "QToolbar",
  props: {
    inset: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => "q-toolbar row no-wrap items-center" + (props.inset === true ? " q-toolbar--inset" : "")
    );
    return () => h("div", { class: classes.value, role: "toolbar" }, hSlot(slots.default));
  }
});
const QHeader = createComponent({
  name: "QHeader",
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    revealOffset: {
      type: Number,
      default: 250
    },
    bordered: Boolean,
    elevated: Boolean,
    heightHint: {
      type: [String, Number],
      default: 50
    }
  },
  emits: ["reveal", "focusin"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QHeader needs to be child of QLayout");
      return emptyRenderFn;
    }
    const size = ref(parseInt(props.heightHint, 10));
    const revealed = ref(true);
    const fixed = computed(
      () => props.reveal === true || $layout.view.value.indexOf("H") !== -1 || $q.platform.is.ios && $layout.isContainer.value === true
    );
    const offset = computed(() => {
      if (props.modelValue !== true) {
        return 0;
      }
      if (fixed.value === true) {
        return revealed.value === true ? size.value : 0;
      }
      const offset2 = size.value - $layout.scroll.value.position;
      return offset2 > 0 ? offset2 : 0;
    });
    const hidden = computed(
      () => props.modelValue !== true || fixed.value === true && revealed.value !== true
    );
    const revealOnFocus = computed(
      () => props.modelValue === true && hidden.value === true && props.reveal === true
    );
    const classes = computed(
      () => "q-header q-layout__section--marginal " + (fixed.value === true ? "fixed" : "absolute") + "-top" + (props.bordered === true ? " q-header--bordered" : "") + (hidden.value === true ? " q-header--hidden" : "") + (props.modelValue !== true ? " q-layout--prevent-focus" : "")
    );
    const style = computed(() => {
      const view = $layout.rows.value.top, css = {};
      if (view[0] === "l" && $layout.left.space === true) {
        css[$q.lang.rtl === true ? "right" : "left"] = `${$layout.left.size}px`;
      }
      if (view[2] === "r" && $layout.right.space === true) {
        css[$q.lang.rtl === true ? "left" : "right"] = `${$layout.right.size}px`;
      }
      return css;
    });
    function updateLayout(prop, val) {
      $layout.update("header", prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function onResize({ height }) {
      updateLocal(size, height);
      updateLayout("size", height);
    }
    function onFocusin(evt) {
      if (revealOnFocus.value === true) {
        updateLocal(revealed, true);
      }
      emit("focusin", evt);
    }
    watch(() => props.modelValue, (val) => {
      updateLayout("space", val);
      updateLocal(revealed, true);
      $layout.animate();
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(() => props.reveal, (val) => {
      val === false && updateLocal(revealed, props.modelValue);
    });
    watch(revealed, (val) => {
      $layout.animate();
      emit("reveal", val);
    });
    watch($layout.scroll, (scroll) => {
      props.reveal === true && updateLocal(
        revealed,
        scroll.direction === "up" || scroll.position <= props.revealOffset || scroll.position - scroll.inflectionPoint < 100
      );
    });
    const instance = {};
    $layout.instances.header = instance;
    props.modelValue === true && updateLayout("size", size.value);
    updateLayout("space", props.modelValue);
    updateLayout("offset", offset.value);
    onBeforeUnmount(() => {
      if ($layout.instances.header === instance) {
        $layout.instances.header = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = hUniqueSlot(slots.default, []);
      props.elevated === true && child.push(
        h("div", {
          class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
        })
      );
      child.push(
        h(QResizeObserver, {
          debounce: 0,
          onResize
        })
      );
      return h("header", {
        class: classes.value,
        style: style.value,
        onFocusin
      }, child);
    };
  }
});
function getChanges(evt, ctx, isFinal) {
  const pos = position(evt);
  let dir, distX = pos.left - ctx.event.x, distY = pos.top - ctx.event.y, absX = Math.abs(distX), absY = Math.abs(distY);
  const direction = ctx.direction;
  if (direction.horizontal === true && direction.vertical !== true) {
    dir = distX < 0 ? "left" : "right";
  } else if (direction.horizontal !== true && direction.vertical === true) {
    dir = distY < 0 ? "up" : "down";
  } else if (direction.up === true && distY < 0) {
    dir = "up";
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = "left";
      } else if (direction.right === true && distX > 0) {
        dir = "right";
      }
    }
  } else if (direction.down === true && distY > 0) {
    dir = "down";
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = "left";
      } else if (direction.right === true && distX > 0) {
        dir = "right";
      }
    }
  } else if (direction.left === true && distX < 0) {
    dir = "left";
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = "up";
      } else if (direction.down === true && distY > 0) {
        dir = "down";
      }
    }
  } else if (direction.right === true && distX > 0) {
    dir = "right";
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = "up";
      } else if (direction.down === true && distY > 0) {
        dir = "down";
      }
    }
  }
  let synthetic = false;
  if (dir === void 0 && isFinal === false) {
    if (ctx.event.isFirst === true || ctx.event.lastDir === void 0) {
      return {};
    }
    dir = ctx.event.lastDir;
    synthetic = true;
    if (dir === "left" || dir === "right") {
      pos.left -= distX;
      absX = 0;
      distX = 0;
    } else {
      pos.top -= distY;
      absY = 0;
      distY = 0;
    }
  }
  return {
    synthetic,
    payload: {
      evt,
      touch: ctx.event.mouse !== true,
      mouse: ctx.event.mouse === true,
      position: pos,
      direction: dir,
      isFirst: ctx.event.isFirst,
      isFinal: isFinal === true,
      duration: Date.now() - ctx.event.time,
      distance: {
        x: absX,
        y: absY
      },
      offset: {
        x: distX,
        y: distY
      },
      delta: {
        x: pos.left - ctx.event.lastX,
        y: pos.top - ctx.event.lastY
      }
    }
  };
}
let uid = 0;
const TouchPan = createDirective(
  {
    name: "touch-pan",
    beforeMount(el, { value: value2, modifiers }) {
      if (modifiers.mouse !== true && client.has.touch !== true) return;
      function handleEvent(evt, mouseEvent) {
        if (modifiers.mouse === true && mouseEvent === true) {
          stopAndPrevent(evt);
        } else {
          modifiers.stop === true && stop(evt);
          modifiers.prevent === true && prevent(evt);
        }
      }
      const ctx = {
        uid: "qvtp_" + uid++,
        handler: value2,
        modifiers,
        direction: getModifierDirections(modifiers),
        noop,
        mouseStart(evt) {
          if (shouldStart(evt, ctx) && leftClick(evt)) {
            addEvt(ctx, "temp", [
              [document, "mousemove", "move", "notPassiveCapture"],
              [document, "mouseup", "end", "passiveCapture"]
            ]);
            ctx.start(evt, true);
          }
        },
        touchStart(evt) {
          if (shouldStart(evt, ctx)) {
            const target = evt.target;
            addEvt(ctx, "temp", [
              [target, "touchmove", "move", "notPassiveCapture"],
              [target, "touchcancel", "end", "passiveCapture"],
              [target, "touchend", "end", "passiveCapture"]
            ]);
            ctx.start(evt);
          }
        },
        start(evt, mouseEvent) {
          client.is.firefox === true && preventDraggable(el, true);
          ctx.lastEvt = evt;
          if (mouseEvent === true || modifiers.stop === true) {
            if (ctx.direction.all !== true && (mouseEvent !== true || ctx.modifiers.mouseAllDir !== true && ctx.modifiers.mousealldir !== true)) {
              const clone = evt.type.indexOf("mouse") !== -1 ? new MouseEvent(evt.type, evt) : new TouchEvent(evt.type, evt);
              evt.defaultPrevented === true && prevent(clone);
              evt.cancelBubble === true && stop(clone);
              Object.assign(clone, {
                qKeyEvent: evt.qKeyEvent,
                qClickOutside: evt.qClickOutside,
                qAnchorHandled: evt.qAnchorHandled,
                qClonedBy: evt.qClonedBy === void 0 ? [ctx.uid] : evt.qClonedBy.concat(ctx.uid)
              });
              ctx.initialEvent = {
                target: evt.target,
                event: clone
              };
            }
            stop(evt);
          }
          const { left, top } = position(evt);
          ctx.event = {
            x: left,
            y: top,
            time: Date.now(),
            mouse: mouseEvent === true,
            detected: false,
            isFirst: true,
            isFinal: false,
            lastX: left,
            lastY: top
          };
        },
        move(evt) {
          if (ctx.event === void 0) return;
          const pos = position(evt), distX = pos.left - ctx.event.x, distY = pos.top - ctx.event.y;
          if (distX === 0 && distY === 0) return;
          ctx.lastEvt = evt;
          const isMouseEvt = ctx.event.mouse === true;
          const start = () => {
            handleEvent(evt, isMouseEvt);
            let cursor;
            if (modifiers.preserveCursor !== true && modifiers.preservecursor !== true) {
              cursor = document.documentElement.style.cursor || "";
              document.documentElement.style.cursor = "grabbing";
            }
            isMouseEvt === true && document.body.classList.add("no-pointer-events--children");
            document.body.classList.add("non-selectable");
            clearSelection();
            ctx.styleCleanup = (withDelayedFn) => {
              ctx.styleCleanup = void 0;
              if (cursor !== void 0) {
                document.documentElement.style.cursor = cursor;
              }
              document.body.classList.remove("non-selectable");
              if (isMouseEvt === true) {
                const remove = () => {
                  document.body.classList.remove("no-pointer-events--children");
                };
                if (withDelayedFn !== void 0) {
                  setTimeout(() => {
                    remove();
                    withDelayedFn();
                  }, 50);
                } else {
                  remove();
                }
              } else if (withDelayedFn !== void 0) {
                withDelayedFn();
              }
            };
          };
          if (ctx.event.detected === true) {
            ctx.event.isFirst !== true && handleEvent(evt, ctx.event.mouse);
            const { payload, synthetic } = getChanges(evt, ctx, false);
            if (payload !== void 0) {
              if (ctx.handler(payload) === false) {
                ctx.end(evt);
              } else {
                if (ctx.styleCleanup === void 0 && ctx.event.isFirst === true) {
                  start();
                }
                ctx.event.lastX = payload.position.left;
                ctx.event.lastY = payload.position.top;
                ctx.event.lastDir = synthetic === true ? void 0 : payload.direction;
                ctx.event.isFirst = false;
              }
            }
            return;
          }
          if (ctx.direction.all === true || isMouseEvt === true && (ctx.modifiers.mouseAllDir === true || ctx.modifiers.mousealldir === true)) {
            start();
            ctx.event.detected = true;
            ctx.move(evt);
            return;
          }
          const absX = Math.abs(distX), absY = Math.abs(distY);
          if (absX !== absY) {
            if (ctx.direction.horizontal === true && absX > absY || ctx.direction.vertical === true && absX < absY || ctx.direction.up === true && absX < absY && distY < 0 || ctx.direction.down === true && absX < absY && distY > 0 || ctx.direction.left === true && absX > absY && distX < 0 || ctx.direction.right === true && absX > absY && distX > 0) {
              ctx.event.detected = true;
              ctx.move(evt);
            } else {
              ctx.end(evt, true);
            }
          }
        },
        end(evt, abort) {
          if (ctx.event === void 0) return;
          cleanEvt(ctx, "temp");
          client.is.firefox === true && preventDraggable(el, false);
          if (abort === true) {
            ctx.styleCleanup?.();
            if (ctx.event.detected !== true && ctx.initialEvent !== void 0) {
              ctx.initialEvent.target.dispatchEvent(ctx.initialEvent.event);
            }
          } else if (ctx.event.detected === true) {
            ctx.event.isFirst === true && ctx.handler(getChanges(evt === void 0 ? ctx.lastEvt : evt, ctx).payload);
            const { payload } = getChanges(evt === void 0 ? ctx.lastEvt : evt, ctx, true);
            const fn = () => {
              ctx.handler(payload);
            };
            if (ctx.styleCleanup !== void 0) {
              ctx.styleCleanup(fn);
            } else {
              fn();
            }
          }
          ctx.event = void 0;
          ctx.initialEvent = void 0;
          ctx.lastEvt = void 0;
        }
      };
      el.__qtouchpan = ctx;
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
      const ctx = el.__qtouchpan;
      if (ctx !== void 0) {
        if (bindings.oldValue !== bindings.value) {
          typeof value !== "function" && ctx.end();
          ctx.handler = bindings.value;
        }
        ctx.direction = getModifierDirections(bindings.modifiers);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qtouchpan;
      if (ctx !== void 0) {
        ctx.event !== void 0 && ctx.end();
        cleanEvt(ctx, "main");
        cleanEvt(ctx, "temp");
        client.is.firefox === true && preventDraggable(el, false);
        ctx.styleCleanup?.();
        delete el.__qtouchpan;
      }
    }
  }
);
const duration = 150;
const QDrawer = createComponent({
  name: "QDrawer",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useDarkProps,
    side: {
      type: String,
      default: "left",
      validator: (v) => ["left", "right"].includes(v)
    },
    width: {
      type: Number,
      default: 300
    },
    mini: Boolean,
    miniToOverlay: Boolean,
    miniWidth: {
      type: Number,
      default: 57
    },
    noMiniAnimation: Boolean,
    breakpoint: {
      type: Number,
      default: 1023
    },
    showIfAbove: Boolean,
    behavior: {
      type: String,
      validator: (v) => ["default", "desktop", "mobile"].includes(v),
      default: "default"
    },
    bordered: Boolean,
    elevated: Boolean,
    overlay: Boolean,
    persistent: Boolean,
    noSwipeOpen: Boolean,
    noSwipeClose: Boolean,
    noSwipeBackdrop: Boolean
  },
  emits: [
    ...useModelToggleEmits,
    "onLayout",
    "miniState"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const isDark = useDark(props, $q);
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout, removeTimeout } = useTimeout();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QDrawer needs to be child of QLayout");
      return emptyRenderFn;
    }
    let lastDesktopState, timerMini = null, layoutTotalWidthWatcher;
    const belowBreakpoint = ref(
      props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint
    );
    const isMini = computed(
      () => props.mini === true && belowBreakpoint.value !== true
    );
    const size = computed(() => isMini.value === true ? props.miniWidth : props.width);
    const showing = ref(
      props.showIfAbove === true && belowBreakpoint.value === false ? true : props.modelValue === true
    );
    const hideOnRouteChange = computed(
      () => props.persistent !== true && (belowBreakpoint.value === true || onScreenOverlay.value === true)
    );
    function handleShow(evt, noEvent) {
      addToHistory();
      evt !== false && $layout.animate();
      applyPosition(0);
      if (belowBreakpoint.value === true) {
        const otherInstance = $layout.instances[otherSide.value];
        if (otherInstance?.belowBreakpoint === true) {
          otherInstance.hide(false);
        }
        applyBackdrop(1);
        $layout.isContainer.value !== true && preventBodyScroll(true);
      } else {
        applyBackdrop(0);
        evt !== false && setScrollable(false);
      }
      registerTimeout(() => {
        evt !== false && setScrollable(true);
        noEvent !== true && emit("show", evt);
      }, duration);
    }
    function handleHide(evt, noEvent) {
      removeFromHistory();
      evt !== false && $layout.animate();
      applyBackdrop(0);
      applyPosition(stateDirection.value * size.value);
      cleanup();
      if (noEvent !== true) {
        registerTimeout(() => {
          emit("hide", evt);
        }, duration);
      } else {
        removeTimeout();
      }
    }
    const { show, hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const instance = {
      belowBreakpoint,
      hide
    };
    const rightSide = computed(() => props.side === "right");
    const stateDirection = computed(
      () => ($q.lang.rtl === true ? -1 : 1) * (rightSide.value === true ? 1 : -1)
    );
    const flagBackdropBg = ref(0);
    const flagPanning = ref(false);
    const flagMiniAnimate = ref(false);
    const flagContentPosition = ref(
      // starting with "hidden" for SSR
      size.value * stateDirection.value
    );
    const otherSide = computed(() => rightSide.value === true ? "left" : "right");
    const offset = computed(() => showing.value === true && belowBreakpoint.value === false && props.overlay === false ? props.miniToOverlay === true ? props.miniWidth : size.value : 0);
    const fixed = computed(
      () => props.overlay === true || props.miniToOverlay === true || $layout.view.value.indexOf(rightSide.value ? "R" : "L") !== -1 || $q.platform.is.ios === true && $layout.isContainer.value === true
    );
    const onLayout = computed(
      () => props.overlay === false && showing.value === true && belowBreakpoint.value === false
    );
    const onScreenOverlay = computed(
      () => props.overlay === true && showing.value === true && belowBreakpoint.value === false
    );
    const backdropClass = computed(
      () => "fullscreen q-drawer__backdrop" + (showing.value === false && flagPanning.value === false ? " hidden" : "")
    );
    const backdropStyle = computed(() => ({
      backgroundColor: `rgba(0,0,0,${flagBackdropBg.value * 0.4})`
    }));
    const headerSlot = computed(() => rightSide.value === true ? $layout.rows.value.top[2] === "r" : $layout.rows.value.top[0] === "l");
    const footerSlot = computed(() => rightSide.value === true ? $layout.rows.value.bottom[2] === "r" : $layout.rows.value.bottom[0] === "l");
    const aboveStyle = computed(() => {
      const css = {};
      if ($layout.header.space === true && headerSlot.value === false) {
        if (fixed.value === true) {
          css.top = `${$layout.header.offset}px`;
        } else if ($layout.header.space === true) {
          css.top = `${$layout.header.size}px`;
        }
      }
      if ($layout.footer.space === true && footerSlot.value === false) {
        if (fixed.value === true) {
          css.bottom = `${$layout.footer.offset}px`;
        } else if ($layout.footer.space === true) {
          css.bottom = `${$layout.footer.size}px`;
        }
      }
      return css;
    });
    const style = computed(() => {
      const style2 = {
        width: `${size.value}px`,
        transform: `translateX(${flagContentPosition.value}px)`
      };
      return belowBreakpoint.value === true ? style2 : Object.assign(style2, aboveStyle.value);
    });
    const contentClass = computed(
      () => "q-drawer__content fit " + ($layout.isContainer.value !== true ? "scroll" : "overflow-auto")
    );
    const classes = computed(
      () => `q-drawer q-drawer--${props.side}` + (flagMiniAnimate.value === true ? " q-drawer--mini-animate" : "") + (props.bordered === true ? " q-drawer--bordered" : "") + (isDark.value === true ? " q-drawer--dark q-dark" : "") + (flagPanning.value === true ? " no-transition" : showing.value === true ? "" : " q-layout--prevent-focus") + (belowBreakpoint.value === true ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding" : ` q-drawer--${isMini.value === true ? "mini" : "standard"}` + (fixed.value === true || onLayout.value !== true ? " fixed" : "") + (props.overlay === true || props.miniToOverlay === true ? " q-drawer--on-top" : "") + (headerSlot.value === true ? " q-drawer--top-padding" : ""))
    );
    const openDirective = computed(() => {
      const dir = $q.lang.rtl === true ? props.side : otherSide.value;
      return [[
        TouchPan,
        onOpenPan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const contentCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const backdropCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true,
          mouseAllDir: true
        }
      ]];
    });
    function updateBelowBreakpoint() {
      updateLocal(belowBreakpoint, props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint);
    }
    watch(belowBreakpoint, (val) => {
      if (val === true) {
        lastDesktopState = showing.value;
        showing.value === true && hide(false);
      } else if (props.overlay === false && props.behavior !== "mobile" && lastDesktopState !== false) {
        if (showing.value === true) {
          applyPosition(0);
          applyBackdrop(0);
          cleanup();
        } else {
          show(false);
        }
      }
    });
    watch(() => props.side, (newSide, oldSide) => {
      if ($layout.instances[oldSide] === instance) {
        $layout.instances[oldSide] = void 0;
        $layout[oldSide].space = false;
        $layout[oldSide].offset = 0;
      }
      $layout.instances[newSide] = instance;
      $layout[newSide].size = size.value;
      $layout[newSide].space = onLayout.value;
      $layout[newSide].offset = offset.value;
    });
    watch($layout.totalWidth, () => {
      if ($layout.isContainer.value === true || document.qScrollPrevented !== true) {
        updateBelowBreakpoint();
      }
    });
    watch(
      () => props.behavior + props.breakpoint,
      updateBelowBreakpoint
    );
    watch($layout.isContainer, (val) => {
      showing.value === true && preventBodyScroll(val !== true);
      val === true && updateBelowBreakpoint();
    });
    watch($layout.scrollbarWidth, () => {
      applyPosition(showing.value === true ? 0 : void 0);
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(onLayout, (val) => {
      emit("onLayout", val);
      updateLayout("space", val);
    });
    watch(rightSide, () => {
      applyPosition();
    });
    watch(size, (val) => {
      applyPosition();
      updateSizeOnLayout(props.miniToOverlay, val);
    });
    watch(() => props.miniToOverlay, (val) => {
      updateSizeOnLayout(val, size.value);
    });
    watch(() => $q.lang.rtl, () => {
      applyPosition();
    });
    watch(() => props.mini, () => {
      if (props.noMiniAnimation) return;
      if (props.modelValue === true) {
        animateMini();
        $layout.animate();
      }
    });
    watch(isMini, (val) => {
      emit("miniState", val);
    });
    function applyPosition(position2) {
      if (position2 === void 0) {
        nextTick(() => {
          position2 = showing.value === true ? 0 : size.value;
          applyPosition(stateDirection.value * position2);
        });
      } else {
        if ($layout.isContainer.value === true && rightSide.value === true && (belowBreakpoint.value === true || Math.abs(position2) === size.value)) {
          position2 += stateDirection.value * $layout.scrollbarWidth.value;
        }
        flagContentPosition.value = position2;
      }
    }
    function applyBackdrop(x) {
      flagBackdropBg.value = x;
    }
    function setScrollable(v) {
      const action = v === true ? "remove" : $layout.isContainer.value !== true ? "add" : "";
      action !== "" && document.body.classList[action]("q-body--drawer-toggle");
    }
    function animateMini() {
      timerMini !== null && clearTimeout(timerMini);
      if (vm.proxy && vm.proxy.$el) {
        vm.proxy.$el.classList.add("q-drawer--mini-animate");
      }
      flagMiniAnimate.value = true;
      timerMini = setTimeout(() => {
        timerMini = null;
        flagMiniAnimate.value = false;
        vm?.proxy?.$el?.classList.remove("q-drawer--mini-animate");
      }, 150);
    }
    function onOpenPan(evt) {
      if (showing.value !== false) {
        return;
      }
      const width = size.value, position2 = between(evt.distance.x, 0, width);
      if (evt.isFinal === true) {
        const opened = position2 >= Math.min(75, width);
        if (opened === true) {
          show();
        } else {
          $layout.animate();
          applyBackdrop(0);
          applyPosition(stateDirection.value * width);
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(
        ($q.lang.rtl === true ? rightSide.value !== true : rightSide.value) ? Math.max(width - position2, 0) : Math.min(0, position2 - width)
      );
      applyBackdrop(
        between(position2 / width, 0, 1)
      );
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function onClosePan(evt) {
      if (showing.value !== true) {
        return;
      }
      const width = size.value, dir = evt.direction === props.side, position2 = ($q.lang.rtl === true ? dir !== true : dir) ? between(evt.distance.x, 0, width) : 0;
      if (evt.isFinal === true) {
        const opened = Math.abs(position2) < Math.min(75, width);
        if (opened === true) {
          $layout.animate();
          applyBackdrop(1);
          applyPosition(0);
        } else {
          hide();
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(stateDirection.value * position2);
      applyBackdrop(between(1 - position2 / width, 0, 1));
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function cleanup() {
      preventBodyScroll(false);
      setScrollable(true);
    }
    function updateLayout(prop, val) {
      $layout.update(props.side, prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function updateSizeOnLayout(miniToOverlay, size2) {
      updateLayout("size", miniToOverlay === true ? props.miniWidth : size2);
    }
    $layout.instances[props.side] = instance;
    updateSizeOnLayout(props.miniToOverlay, size.value);
    updateLayout("space", onLayout.value);
    updateLayout("offset", offset.value);
    if (props.showIfAbove === true && props.modelValue !== true && showing.value === true && props["onUpdate:modelValue"] !== void 0) {
      emit("update:modelValue", true);
    }
    onMounted(() => {
      emit("onLayout", onLayout.value);
      emit("miniState", isMini.value);
      lastDesktopState = props.showIfAbove === true;
      const fn = () => {
        const action = showing.value === true ? handleShow : handleHide;
        action(false, true);
      };
      if ($layout.totalWidth.value !== 0) {
        nextTick(fn);
        return;
      }
      layoutTotalWidthWatcher = watch($layout.totalWidth, () => {
        layoutTotalWidthWatcher();
        layoutTotalWidthWatcher = void 0;
        if (showing.value === false && props.showIfAbove === true && belowBreakpoint.value === false) {
          show(false);
        } else {
          fn();
        }
      });
    });
    onBeforeUnmount(() => {
      layoutTotalWidthWatcher?.();
      if (timerMini !== null) {
        clearTimeout(timerMini);
        timerMini = null;
      }
      showing.value === true && cleanup();
      if ($layout.instances[props.side] === instance) {
        $layout.instances[props.side] = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = [];
      if (belowBreakpoint.value === true) {
        props.noSwipeOpen === false && child.push(
          withDirectives(
            h("div", {
              key: "open",
              class: `q-drawer__opener fixed-${props.side}`,
              "aria-hidden": "true"
            }),
            openDirective.value
          )
        );
        child.push(
          hDir(
            "div",
            {
              ref: "backdrop",
              class: backdropClass.value,
              style: backdropStyle.value,
              "aria-hidden": "true",
              onClick: hide
            },
            void 0,
            "backdrop",
            props.noSwipeBackdrop !== true && showing.value === true,
            () => backdropCloseDirective.value
          )
        );
      }
      const mini = isMini.value === true && slots.mini !== void 0;
      const content = [
        h(
          "div",
          {
            ...attrs,
            key: "" + mini,
            // required otherwise Vue will not diff correctly
            class: [
              contentClass.value,
              attrs.class
            ]
          },
          mini === true ? slots.mini() : hSlot(slots.default)
        )
      ];
      if (props.elevated === true && showing.value === true) {
        content.push(
          h("div", {
            class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
          })
        );
      }
      child.push(
        hDir(
          "aside",
          { ref: "content", class: classes.value, style: style.value },
          content,
          "contentclose",
          props.noSwipeClose !== true && belowBreakpoint.value === true,
          () => contentCloseDirective.value
        )
      );
      return h("div", { class: "q-drawer-container" }, child);
    };
  }
});
const QFooter = createComponent({
  name: "QFooter",
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    bordered: Boolean,
    elevated: Boolean,
    heightHint: {
      type: [String, Number],
      default: 50
    }
  },
  emits: ["reveal", "focusin"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QFooter needs to be child of QLayout");
      return emptyRenderFn;
    }
    const size = ref(parseInt(props.heightHint, 10));
    const revealed = ref(true);
    const windowHeight = ref(
      isRuntimeSsrPreHydration.value === true || $layout.isContainer.value === true ? 0 : window.innerHeight
    );
    const fixed = computed(
      () => props.reveal === true || $layout.view.value.indexOf("F") !== -1 || $q.platform.is.ios && $layout.isContainer.value === true
    );
    const containerHeight = computed(() => $layout.isContainer.value === true ? $layout.containerHeight.value : windowHeight.value);
    const offset = computed(() => {
      if (props.modelValue !== true) {
        return 0;
      }
      if (fixed.value === true) {
        return revealed.value === true ? size.value : 0;
      }
      const offset2 = $layout.scroll.value.position + containerHeight.value + size.value - $layout.height.value;
      return offset2 > 0 ? offset2 : 0;
    });
    const hidden = computed(
      () => props.modelValue !== true || fixed.value === true && revealed.value !== true
    );
    const revealOnFocus = computed(
      () => props.modelValue === true && hidden.value === true && props.reveal === true
    );
    const classes = computed(
      () => "q-footer q-layout__section--marginal " + (fixed.value === true ? "fixed" : "absolute") + "-bottom" + (props.bordered === true ? " q-footer--bordered" : "") + (hidden.value === true ? " q-footer--hidden" : "") + (props.modelValue !== true ? " q-layout--prevent-focus" + (fixed.value !== true ? " hidden" : "") : "")
    );
    const style = computed(() => {
      const view = $layout.rows.value.bottom, css = {};
      if (view[0] === "l" && $layout.left.space === true) {
        css[$q.lang.rtl === true ? "right" : "left"] = `${$layout.left.size}px`;
      }
      if (view[2] === "r" && $layout.right.space === true) {
        css[$q.lang.rtl === true ? "left" : "right"] = `${$layout.right.size}px`;
      }
      return css;
    });
    function updateLayout(prop, val) {
      $layout.update("footer", prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function onResize({ height }) {
      updateLocal(size, height);
      updateLayout("size", height);
    }
    function updateRevealed() {
      if (props.reveal !== true) return;
      const { direction, position: position2, inflectionPoint } = $layout.scroll.value;
      updateLocal(revealed, direction === "up" || position2 - inflectionPoint < 100 || $layout.height.value - containerHeight.value - position2 - size.value < 300);
    }
    function onFocusin(evt) {
      if (revealOnFocus.value === true) {
        updateLocal(revealed, true);
      }
      emit("focusin", evt);
    }
    watch(() => props.modelValue, (val) => {
      updateLayout("space", val);
      updateLocal(revealed, true);
      $layout.animate();
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(() => props.reveal, (val) => {
      val === false && updateLocal(revealed, props.modelValue);
    });
    watch(revealed, (val) => {
      $layout.animate();
      emit("reveal", val);
    });
    watch([size, $layout.scroll, $layout.height], updateRevealed);
    watch(() => $q.screen.height, (val) => {
      $layout.isContainer.value !== true && updateLocal(windowHeight, val);
    });
    const instance = {};
    $layout.instances.footer = instance;
    props.modelValue === true && updateLayout("size", size.value);
    updateLayout("space", props.modelValue);
    updateLayout("offset", offset.value);
    onBeforeUnmount(() => {
      if ($layout.instances.footer === instance) {
        $layout.instances.footer = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = hMergeSlot(slots.default, [
        h(QResizeObserver, {
          debounce: 0,
          onResize
        })
      ]);
      props.elevated === true && child.push(
        h("div", {
          class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
        })
      );
      return h("footer", {
        class: classes.value,
        style: style.value,
        onFocusin
      }, child);
    };
  }
});
const _imports_0 = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iNjMuMDUxODA0bW0iCiAgIGhlaWdodD0iNjMuMDUxNzg4bW0iCiAgIHZpZXdCb3g9IjAgMCA2My4wNTE4MDQgNjMuMDUxNzg4IgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcxIgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjQgKDg2YThhZDcsIDIwMjQtMTAtMTEpIgogICBzb2RpcG9kaTpkb2NuYW1lPSJlY2xlYW5lci5zdmciCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXcxIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzAwMDAwMCIKICAgICBib3JkZXJvcGFjaXR5PSIwLjI1IgogICAgIGlua3NjYXBlOnNob3dwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iMCIKICAgICBpbmtzY2FwZTpkZXNrY29sb3I9IiNkMWQxZDEiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9Im1tIgogICAgIGlua3NjYXBlOnpvb209IjAuNDA5MTM4MjgiCiAgICAgaW5rc2NhcGU6Y3g9Ii0zNjAuNTEzODEiCiAgICAgaW5rc2NhcGU6Y3k9Ijg0NC40NTc3NyIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE5MjAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iOTkxIgogICAgIGlua3NjYXBlOndpbmRvdy14PSItOSIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTkiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiPjxpbmtzY2FwZTpwYWdlCiAgICAgICB4PSIwIgogICAgICAgeT0iMCIKICAgICAgIHdpZHRoPSI2My4wNTE4MDQiCiAgICAgICBoZWlnaHQ9IjYzLjA1MTc4OCIKICAgICAgIGlkPSJwYWdlMiIKICAgICAgIG1hcmdpbj0iMCIKICAgICAgIGJsZWVkPSIwIiAvPjwvc29kaXBvZGk6bmFtZWR2aWV3PjxkZWZzCiAgICAgaWQ9ImRlZnMxIiAvPjxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkNhbWFkYSAxIgogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMSIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTMyLjYxMTQ3LC0xOTIuNDQ4OTIpIj48ZwogICAgICAgaWQ9ImcxIj48Y2lyY2xlCiAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjAuNTQzNjY0IgogICAgICAgICBpZD0icGF0aDgtMiIKICAgICAgICAgY3g9Ii0yMjMuOTc0ODIiCiAgICAgICAgIGN5PSItMTY0LjEzNzM2IgogICAgICAgICByPSIzMS41MjU5IgogICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLC0xLC0xLDAsMCwwKSIgLz48cGF0aAogICAgICAgICBpZD0icGF0aDItOC00IgogICAgICAgICBzdHlsZT0iZm9udC12YXJpYXRpb24tc2V0dGluZ3M6J29wc3onIDE0NCwgJ3dnaHQnIDQwMDtmaWxsOiMxNGI1ZTE7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjAuMzI5MzE0IgogICAgICAgICBkPSJtIDE1My4xNjY3OCwyMjYuOTk1OTIgYyAwLjM1MDkzLC0xLjU0NjczIDAuNzg0MSwtMi44NzcxMyAxLjI5MzY0LC00LjAyMDM0IDEuNDE0NTEsLTMuNDEwNzQgNC4zMjI1OSwtNS41OTMzNiA3LjgxNTM4LC02LjUwOTA5IDYuODU3ODcsLTEuNjk5ODUgNy42NDM2OCw1LjUxMzEgMC4zMTM4OSw4LjM2MDY2IC0yLjUwNTE2LDAuOTczMjMgLTQuNDE3NDYsMS43MzI2OSAtOS40MjI5MSwyLjE2ODc3IHogbSAtMC4yOTkxNCw0LjMzNzU0IGMgNy42NDc1NCwtMS4xNTgyNiAxNS43ODM4OCwtMi43MTQxOSAyMC4wNjg5MSwtNi4zNDY5NCA2LjQyNjYyLC01LjQ0ODM1IDIuNzcxOTIsLTE2LjMwNjM1IC05LjM2MTA5LC0xNS4zODYyNiAtNS44MjU5MiwwLjQ0MTc5IC0xMS45NDc2MywzLjg3NDc4IC0xNS44MDIzMiw5Ljc2MTYxIC00LjY1MjgzLDcuMTA1NzUgLTUuNjAyNTEsMTYuNzQxNSAwLjc5ODQ4LDIyLjQwNDMxIDQuMDkxNjMsMy42MTk3OCAxMC4wNjEwMiw0LjMyMjgxIDE0LjY3MDUyLDMuNTIzNzcgOS40MTksLTEuNjMyODIgMTcuOTAwNjIsLTEwLjQ4NTY1IDE1LjcyNTQ2LC0xOC4wNjk2NyAtNC44MjkwNiw4LjUyNzU2IC0xMi44NDg4MSwxMS41OTQ5NyAtMTguNzAzNDcsMTEuMDMyMDggLTQuODA2NzYsLTAuNDYyMTUgLTguMTA1MzUsLTMuNDkzMjQgLTcuMzk2NDksLTYuOTE4OSB6IgogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY3NjY3Nzc3NzY3NjIiAvPjxwYXRoCiAgICAgICAgIGlkPSJyZWN0Mi03LTItNC0yLTU1LTUiCiAgICAgICAgIHN0eWxlPSJmb250LXZhcmlhdGlvbi1zZXR0aW5nczonb3BzeicgMTQ0LCAnd2dodCcgNDAwO2ZpbGw6IzFmNWY4YztmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC4wNjEwNjMiCiAgICAgICAgIGQ9Im0gMTcxLjA0ODIyLDIwMS41NDczNCBjIDAuMTM5ODEsMS41MjkyNCAwLjkyNzAxLDIuNTU1NTEgMi44MDM4NCwyLjgwMzcxIC0xLjg3NjgzLDAuMjQ4MiAtMi42NjQwMywxLjI3NDQ3IC0yLjgwMzg0LDIuODAzNyAtMC4xMzk4LC0xLjUyOTIzIC0wLjkyNywtMi41NTU1IC0yLjgwMzgzLC0yLjgwMzcgMS44NzY4MywtMC4yNDgyIDIuNjY0MDMsLTEuMjc0NDggMi44MDM4MywtMi44MDM3MSB6IgogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjIiAvPjxwYXRoCiAgICAgICAgIGlkPSJyZWN0Mi03LTItNC0yLTU1LTMtNSIKICAgICAgICAgc3R5bGU9ImZvbnQtdmFyaWF0aW9uLXNldHRpbmdzOidvcHN6JyAxNDQsICd3Z2h0JyA0MDA7ZmlsbDojMWY1ZjhjO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDowLjA2MTA2MyIKICAgICAgICAgZD0ibSAxODEuMzM2OTEsMjE0LjU3OTY4IGMgMC4xMzk4LDEuNTI5MjQgMC45MjcsMi41NTU1MSAyLjgwMzgzLDIuODAzNzEgLTEuODc2ODMsMC4yNDgyIC0yLjY2NDAzLDEuMjc0NDggLTIuODAzODMsMi44MDM3IC0wLjEzOTgxLC0xLjUyOTIzIC0wLjkyNywtMi41NTU1IC0yLjgwMzgzLC0yLjgwMzcgMS44NzY4MywtMC4yNDgyIDIuNjY0MDIsLTEuMjc0NDggMi44MDM4MywtMi44MDM3MSB6IgogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjIiAvPjxwYXRoCiAgICAgICAgIGlkPSJyZWN0Mi03LTItNC0yLTU1LTYtMSIKICAgICAgICAgc3R5bGU9ImZvbnQtdmFyaWF0aW9uLXNldHRpbmdzOidvcHN6JyAxNDQsICd3Z2h0JyA0MDA7ZmlsbDojMWY1ZjhjO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDowLjEwMzM4OCIKICAgICAgICAgZD0ibSAxNzYuNzY0MTYsMjA1LjMxOTg2IGMgMC4yMzY3MSwyLjU4OTE4IDEuNTY5NTMsNC4zMjY4MSA0Ljc0NzI1LDQuNzQ3MDQgLTMuMTc3NzIsMC40MjAyNCAtNC41MTA1NCwyLjE1Nzg1IC00Ljc0NzI1LDQuNzQ3MDMgLTAuMjM2NzEsLTIuNTg5MTggLTEuNTY5NTMsLTQuMzI2NzkgLTQuNzQ3MjUsLTQuNzQ3MDMgMy4xNzc3MiwtMC40MjAyMyA0LjUxMDU0LC0yLjE1Nzg2IDQuNzQ3MjUsLTQuNzQ3MDQgeiIKICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NjYyIgLz48L2c+PC9nPjwvc3ZnPgo=";
const _sfc_main = defineComponent({
  name: "MainLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    const { locale, t } = useI18n();
    const currentLanguage = ref(locale.value);
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const authStore = useAuthStore();
    const isInTeamsRoute = computed(() => route.path.startsWith("/equipes"));
    const isInClientsRoute = computed(() => route.path.startsWith("/clientes"));
    const isInEmployeesRoute = computed(() => route.path.startsWith("/colaboradores"));
    const isInScheduleRoute = computed(() => route.path.startsWith("/schedules"));
    const isInServicosRoute = computed(() => route.path.startsWith("/servicos"));
    const isInPacotesServicosRoute = computed(() => route.path.startsWith("/pacotes-servicos"));
    const isInMateriaisRoute = computed(() => route.path.startsWith("/materiais"));
    const isInOrcamentosRoute = computed(() => route.path.startsWith("/orcamentos"));
    const isInPessoasRoute = computed(
      () => route.path.startsWith("/pessoas") || isInClientsRoute.value || isInEmployeesRoute.value || isInScheduleRoute.value || isInTeamsRoute.value
    );
    const changeLanguage = (lang) => {
      locale.value = lang;
      currentLanguage.value = lang;
      localStorage.setItem("language", lang);
    };
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      locale.value = savedLanguage;
      currentLanguage.value = savedLanguage;
    }
    const logout = async () => {
      try {
        $q.dialog({
          title: t("layout.logout.confirmTitle"),
          message: t("layout.logout.confirmMessage"),
          cancel: true,
          persistent: true
        }).onOk(async () => {
          try {
            authStore.logout();
            $q.notify({
              type: "positive",
              message: t("layout.logout.success"),
              position: "top"
            });
            await router.replace("/login");
          } catch (error) {
            console.error("Erro no logout:", error);
            $q.notify({
              type: "negative",
              message: "Erro ao realizar logout",
              position: "top"
            });
          }
        });
      } catch (error) {
        console.error("Erro ao abrir dialog de logout:", error);
        $q.notify({
          type: "negative",
          message: "Erro ao confirmar logout",
          position: "top"
        });
      }
    };
    const navigateToHome = () => {
      router.push("/");
    };
    const debugAuth = () => {
      console.log("🔒 Debug Auth State:", {
        isAuthenticated: authStore.isAuthenticated,
        token: authStore.token,
        user: authStore.user,
        localStorage: {
          token: localStorage.getItem("auth-token"),
          user: localStorage.getItem("auth-user")
        }
      });
      $q.notify({
        type: "info",
        message: `Auth: ${authStore.isAuthenticated ? "Logado" : "Não logado"}`,
        position: "top"
      });
    };
    return {
      leftDrawerOpen,
      currentLanguage,
      changeLanguage,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logout,
      navigateToHome,
      debugAuth,
      isInPessoasRoute,
      isInClientsRoute,
      isInEmployeesRoute,
      isInScheduleRoute,
      isInTeamsRoute,
      isInServicosRoute,
      isInPacotesServicosRoute,
      isInMateriaisRoute,
      isInOrcamentosRoute
    };
  }
});
const _hoisted_1 = { class: "header-actions" };
const _hoisted_2 = { class: "drawer-header" };
const _hoisted_3 = { class: "drawer-brand" };
const _hoisted_4 = { class: "footer-brand" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(QLayout, { view: "hHh lpR fff" }, {
    default: withCtx(() => [
      createVNode(QHeader, {
        class: "modern-header",
        elevated: ""
      }, {
        default: withCtx(() => [
          createVNode(QToolbar, { class: "header-toolbar" }, {
            default: withCtx(() => [
              createVNode(QBtn, {
                dense: "",
                flat: "",
                round: "",
                icon: "menu",
                onClick: _ctx.toggleLeftDrawer,
                class: "menu-toggle-btn"
              }, null, 8, ["onClick"]),
              createVNode(QToolbarTitle, { class: "header-brand" }, {
                default: withCtx(() => [
                  createBaseVNode("div", {
                    class: "brand-container",
                    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.navigateToHome && _ctx.navigateToHome(...args))
                  }, [
                    createVNode(QImg, {
                      src: _imports_0,
                      alt: "eCleannear Logo",
                      class: "brand-logo",
                      contain: ""
                    }),
                    _cache[4] || (_cache[4] = createBaseVNode("div", { class: "brand-text" }, [
                      createBaseVNode("span", { class: "brand-name" }, "eCleannear"),
                      createBaseVNode("span", { class: "brand-tagline" }, "Gestão Inteligente")
                    ], -1))
                  ])
                ]),
                _: 1
              }),
              createBaseVNode("div", _hoisted_1, [
                createVNode(QBtn, {
                  flat: "",
                  round: "",
                  class: "action-btn language-btn"
                }, {
                  default: withCtx(() => [
                    createVNode(QIcon, { name: "language" }),
                    createVNode(QMenu, {
                      "transition-show": "jump-down",
                      "transition-hide": "jump-up",
                      class: "modern-menu"
                    }, {
                      default: withCtx(() => [
                        createVNode(QList, { class: "language-menu" }, {
                          default: withCtx(() => [
                            withDirectives((openBlock(), createBlock(QItem, {
                              clickable: "",
                              onClick: _cache[1] || (_cache[1] = ($event) => _ctx.changeLanguage("pt-BR")),
                              active: _ctx.currentLanguage === "pt-BR",
                              class: "language-item"
                            }, {
                              default: withCtx(() => [
                                createVNode(QItemSection, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(QIcon, { name: "flag" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(QItemSection, null, {
                                  default: withCtx(() => [..._cache[5] || (_cache[5] = [
                                    createTextVNode("Português", -1)
                                  ])]),
                                  _: 1
                                }),
                                _ctx.currentLanguage === "pt-BR" ? (openBlock(), createBlock(QItemSection, {
                                  key: 0,
                                  side: ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(QIcon, {
                                      name: "check",
                                      color: "positive"
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ]),
                              _: 1
                            }, 8, ["active"])), [
                              [ClosePopup]
                            ]),
                            withDirectives((openBlock(), createBlock(QItem, {
                              clickable: "",
                              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.changeLanguage("en-US")),
                              active: _ctx.currentLanguage === "en-US",
                              class: "language-item"
                            }, {
                              default: withCtx(() => [
                                createVNode(QItemSection, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(QIcon, { name: "flag" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(QItemSection, null, {
                                  default: withCtx(() => [..._cache[6] || (_cache[6] = [
                                    createTextVNode("English", -1)
                                  ])]),
                                  _: 1
                                }),
                                _ctx.currentLanguage === "en-US" ? (openBlock(), createBlock(QItemSection, {
                                  key: 0,
                                  side: ""
                                }, {
                                  default: withCtx(() => [
                                    createVNode(QIcon, {
                                      name: "check",
                                      color: "positive"
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ]),
                              _: 1
                            }, 8, ["active"])), [
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
                }),
                createVNode(QBtn, {
                  flat: "",
                  round: "",
                  class: "action-btn profile-btn"
                }, {
                  default: withCtx(() => [
                    createVNode(QAvatar, {
                      size: "36px",
                      class: "profile-avatar"
                    }, {
                      default: withCtx(() => [..._cache[7] || (_cache[7] = [
                        createBaseVNode("img", { src: "https://cdn.quasar.dev/img/avatar.png" }, null, -1),
                        createBaseVNode("div", { class: "avatar-border" }, null, -1)
                      ])]),
                      _: 1
                    }),
                    createVNode(QMenu, {
                      "transition-show": "jump-down",
                      "transition-hide": "jump-up",
                      class: "modern-menu profile-menu"
                    }, {
                      default: withCtx(() => [
                        createVNode(QList, { class: "user-menu" }, {
                          default: withCtx(() => [
                            withDirectives((openBlock(), createBlock(QItem, {
                              clickable: "",
                              to: "/perfil",
                              class: "menu-item"
                            }, {
                              default: withCtx(() => [
                                createVNode(QItemSection, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(QIcon, { name: "account_circle" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(QItemSection, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.$t("menu.myAccount")), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })), [
                              [ClosePopup]
                            ]),
                            withDirectives((openBlock(), createBlock(QItem, {
                              clickable: "",
                              to: "/configuracoes",
                              class: "menu-item"
                            }, {
                              default: withCtx(() => [
                                createVNode(QItemSection, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(QIcon, { name: "settings" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(QItemSection, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.$t("menu.settings")), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })), [
                              [ClosePopup]
                            ]),
                            withDirectives((openBlock(), createBlock(QItem, {
                              clickable: "",
                              onClick: _ctx.debugAuth,
                              class: "menu-item debug-item"
                            }, {
                              default: withCtx(() => [
                                createVNode(QItemSection, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(QIcon, { name: "bug_report" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(QItemSection, null, {
                                  default: withCtx(() => [..._cache[8] || (_cache[8] = [
                                    createTextVNode("Debug Auth", -1)
                                  ])]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick"])), [
                              [ClosePopup]
                            ]),
                            createVNode(QSeparator, { class: "menu-separator" }),
                            withDirectives((openBlock(), createBlock(QItem, {
                              clickable: "",
                              onClick: _ctx.logout,
                              class: "menu-item logout-item"
                            }, {
                              default: withCtx(() => [
                                createVNode(QItemSection, { avatar: "" }, {
                                  default: withCtx(() => [
                                    createVNode(QIcon, { name: "logout" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(QItemSection, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(_ctx.$t("menu.logout")), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick"])), [
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
                })
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QDrawer, {
        modelValue: _ctx.leftDrawerOpen,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.leftDrawerOpen = $event),
        side: "left",
        class: "modern-drawer",
        width: 280,
        bordered: ""
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              createVNode(QIcon, {
                name: "dashboard",
                size: "24px",
                class: "drawer-icon"
              }),
              _cache[9] || (_cache[9] = createBaseVNode("span", { class: "drawer-title" }, "Menu Principal", -1))
            ])
          ]),
          createVNode(QList, {
            padding: "",
            class: "modern-nav-list"
          }, {
            default: withCtx(() => [
              withDirectives((openBlock(), createBlock(QItem, {
                clickable: "",
                to: "/",
                exact: "",
                class: "nav-item home-item"
              }, {
                default: withCtx(() => [
                  createVNode(QItemSection, { avatar: "" }, {
                    default: withCtx(() => [
                      createVNode(QIcon, { name: "home" })
                    ]),
                    _: 1
                  }),
                  createVNode(QItemSection, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("menu.home")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })), [
                [Ripple]
              ]),
              createVNode(QSeparator, { class: "nav-separator" }),
              createVNode(QExpansionItem, {
                icon: "people",
                label: _ctx.$t("menu.pessoas.title"),
                "header-class": _ctx.isInPessoasRoute ? "text-primary nav-active" : "nav-header",
                class: "nav-expansion"
              }, {
                default: withCtx(() => [
                  createVNode(QList, { class: "submenu modern-submenu" }, {
                    default: withCtx(() => [
                      createVNode(QExpansionItem, {
                        icon: "groups",
                        label: _ctx.$t("menu.pessoas.submenus.clients.title"),
                        "header-class": _ctx.isInClientsRoute ? "text-primary submenu-active" : "submenu-header",
                        class: "submenu-expansion"
                      }, {
                        default: withCtx(() => [
                          withDirectives((openBlock(), createBlock(QItem, {
                            clickable: "",
                            to: "/clientes/novo",
                            class: "submenu-item"
                          }, {
                            default: withCtx(() => [
                              createVNode(QItemSection, { avatar: "" }, {
                                default: withCtx(() => [
                                  createVNode(QIcon, { name: "add" })
                                ]),
                                _: 1
                              }),
                              createVNode(QItemSection, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$t("menu.pessoas.submenus.clients.new")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })), [
                            [Ripple]
                          ]),
                          withDirectives((openBlock(), createBlock(QItem, {
                            clickable: "",
                            to: "/clientes",
                            class: "submenu-item"
                          }, {
                            default: withCtx(() => [
                              createVNode(QItemSection, { avatar: "" }, {
                                default: withCtx(() => [
                                  createVNode(QIcon, { name: "list" })
                                ]),
                                _: 1
                              }),
                              createVNode(QItemSection, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$t("menu.pessoas.submenus.clients.list")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })), [
                            [Ripple]
                          ])
                        ]),
                        _: 1
                      }, 8, ["label", "header-class"]),
                      createVNode(QExpansionItem, {
                        icon: "engineering",
                        label: _ctx.$t("menu.pessoas.submenus.employees.title"),
                        "header-class": _ctx.isInEmployeesRoute ? "text-primary submenu-active" : "submenu-header",
                        class: "submenu-expansion"
                      }, {
                        default: withCtx(() => [
                          withDirectives((openBlock(), createBlock(QItem, {
                            clickable: "",
                            to: "/colaboradores/novo",
                            class: "submenu-item"
                          }, {
                            default: withCtx(() => [
                              createVNode(QItemSection, { avatar: "" }, {
                                default: withCtx(() => [
                                  createVNode(QIcon, { name: "add" })
                                ]),
                                _: 1
                              }),
                              createVNode(QItemSection, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$t("menu.pessoas.submenus.employees.new")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })), [
                            [Ripple]
                          ]),
                          withDirectives((openBlock(), createBlock(QItem, {
                            clickable: "",
                            to: "/colaboradores",
                            class: "submenu-item"
                          }, {
                            default: withCtx(() => [
                              createVNode(QItemSection, { avatar: "" }, {
                                default: withCtx(() => [
                                  createVNode(QIcon, { name: "list" })
                                ]),
                                _: 1
                              }),
                              createVNode(QItemSection, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$t("menu.pessoas.submenus.employees.list")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })), [
                            [Ripple]
                          ])
                        ]),
                        _: 1
                      }, 8, ["label", "header-class"]),
                      createVNode(QExpansionItem, {
                        icon: "groups_2",
                        label: _ctx.$t("menu.pessoas.submenus.teams.title"),
                        "header-class": _ctx.isInTeamsRoute ? "text-primary submenu-active" : "submenu-header",
                        class: "submenu-expansion"
                      }, {
                        default: withCtx(() => [
                          withDirectives((openBlock(), createBlock(QItem, {
                            clickable: "",
                            to: "/equipes/novo",
                            class: "submenu-item"
                          }, {
                            default: withCtx(() => [
                              createVNode(QItemSection, { avatar: "" }, {
                                default: withCtx(() => [
                                  createVNode(QIcon, { name: "add" })
                                ]),
                                _: 1
                              }),
                              createVNode(QItemSection, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$t("menu.pessoas.submenus.teams.new")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })), [
                            [Ripple]
                          ]),
                          withDirectives((openBlock(), createBlock(QItem, {
                            clickable: "",
                            to: "/equipes",
                            class: "submenu-item"
                          }, {
                            default: withCtx(() => [
                              createVNode(QItemSection, { avatar: "" }, {
                                default: withCtx(() => [
                                  createVNode(QIcon, { name: "list" })
                                ]),
                                _: 1
                              }),
                              createVNode(QItemSection, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$t("menu.pessoas.submenus.teams.list")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })), [
                            [Ripple]
                          ])
                        ]),
                        _: 1
                      }, 8, ["label", "header-class"]),
                      createVNode(QExpansionItem, {
                        icon: "business",
                        label: _ctx.$t("menu.pessoas.submenus.schedules.title"),
                        "header-class": _ctx.isInScheduleRoute ? "text-primary submenu-active" : "submenu-header",
                        class: "submenu-expansion"
                      }, {
                        default: withCtx(() => [
                          withDirectives((openBlock(), createBlock(QItem, {
                            clickable: "",
                            to: "/schedules/novo",
                            class: "submenu-item"
                          }, {
                            default: withCtx(() => [
                              createVNode(QItemSection, { avatar: "" }, {
                                default: withCtx(() => [
                                  createVNode(QIcon, { name: "add" })
                                ]),
                                _: 1
                              }),
                              createVNode(QItemSection, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$t("menu.pessoas.submenus.schedules.new")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })), [
                            [Ripple]
                          ]),
                          withDirectives((openBlock(), createBlock(QItem, {
                            clickable: "",
                            to: "/schedules",
                            class: "submenu-item"
                          }, {
                            default: withCtx(() => [
                              createVNode(QItemSection, { avatar: "" }, {
                                default: withCtx(() => [
                                  createVNode(QIcon, { name: "list" })
                                ]),
                                _: 1
                              }),
                              createVNode(QItemSection, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.$t("menu.pessoas.submenus.schedules.list")), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })), [
                            [Ripple]
                          ])
                        ]),
                        _: 1
                      }, 8, ["label", "header-class"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["label", "header-class"]),
              createVNode(QExpansionItem, {
                icon: "build",
                label: _ctx.$t("menu.servicos.title"),
                "header-class": _ctx.isInServicosRoute ? "text-primary nav-active" : "nav-header",
                class: "nav-expansion"
              }, {
                default: withCtx(() => [
                  withDirectives((openBlock(), createBlock(QItem, {
                    clickable: "",
                    to: "/servicos/novo",
                    class: "nav-sub-item"
                  }, {
                    default: withCtx(() => [
                      createVNode(QItemSection, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(QIcon, { name: "add" })
                        ]),
                        _: 1
                      }),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("menu.servicos.new")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })), [
                    [Ripple]
                  ]),
                  withDirectives((openBlock(), createBlock(QItem, {
                    clickable: "",
                    to: "/servicos",
                    class: "nav-sub-item"
                  }, {
                    default: withCtx(() => [
                      createVNode(QItemSection, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(QIcon, { name: "list" })
                        ]),
                        _: 1
                      }),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("menu.servicos.list")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })), [
                    [Ripple]
                  ])
                ]),
                _: 1
              }, 8, ["label", "header-class"]),
              createVNode(QExpansionItem, {
                icon: "inventory",
                label: _ctx.$t("menu.pacotesServicos.title"),
                "header-class": _ctx.isInPacotesServicosRoute ? "text-primary nav-active" : "nav-header",
                class: "nav-expansion"
              }, {
                default: withCtx(() => [
                  withDirectives((openBlock(), createBlock(QItem, {
                    clickable: "",
                    to: "/pacotes-servicos/novo",
                    class: "nav-sub-item"
                  }, {
                    default: withCtx(() => [
                      createVNode(QItemSection, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(QIcon, { name: "add" })
                        ]),
                        _: 1
                      }),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("menu.pacotesServicos.new")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })), [
                    [Ripple]
                  ]),
                  withDirectives((openBlock(), createBlock(QItem, {
                    clickable: "",
                    to: "/pacotes-servicos",
                    class: "nav-sub-item"
                  }, {
                    default: withCtx(() => [
                      createVNode(QItemSection, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(QIcon, { name: "list" })
                        ]),
                        _: 1
                      }),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("menu.pacotesServicos.list")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })), [
                    [Ripple]
                  ])
                ]),
                _: 1
              }, 8, ["label", "header-class"]),
              createVNode(QExpansionItem, {
                icon: "category",
                label: _ctx.$t("menu.materiais.title"),
                "header-class": _ctx.isInMateriaisRoute ? "text-primary nav-active" : "nav-header",
                class: "nav-expansion"
              }, {
                default: withCtx(() => [
                  withDirectives((openBlock(), createBlock(QItem, {
                    clickable: "",
                    to: "/materiais/novo",
                    class: "nav-sub-item"
                  }, {
                    default: withCtx(() => [
                      createVNode(QItemSection, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(QIcon, { name: "add" })
                        ]),
                        _: 1
                      }),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("menu.materiais.new")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })), [
                    [Ripple]
                  ]),
                  withDirectives((openBlock(), createBlock(QItem, {
                    clickable: "",
                    to: "/materiais",
                    class: "nav-sub-item"
                  }, {
                    default: withCtx(() => [
                      createVNode(QItemSection, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(QIcon, { name: "list" })
                        ]),
                        _: 1
                      }),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("menu.materiais.list")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })), [
                    [Ripple]
                  ])
                ]),
                _: 1
              }, 8, ["label", "header-class"]),
              createVNode(QExpansionItem, {
                icon: "receipt_long",
                label: _ctx.$t("menu.orcamentos.title"),
                "header-class": _ctx.isInOrcamentosRoute ? "text-primary nav-active" : "nav-header",
                class: "nav-expansion"
              }, {
                default: withCtx(() => [
                  withDirectives((openBlock(), createBlock(QItem, {
                    clickable: "",
                    to: "/orcamentos/novo",
                    class: "nav-sub-item"
                  }, {
                    default: withCtx(() => [
                      createVNode(QItemSection, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(QIcon, { name: "add" })
                        ]),
                        _: 1
                      }),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("menu.orcamentos.new")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })), [
                    [Ripple]
                  ]),
                  withDirectives((openBlock(), createBlock(QItem, {
                    clickable: "",
                    to: "/orcamentos",
                    class: "nav-sub-item"
                  }, {
                    default: withCtx(() => [
                      createVNode(QItemSection, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(QIcon, { name: "list" })
                        ]),
                        _: 1
                      }),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("menu.orcamentos.list")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })), [
                    [Ripple]
                  ])
                ]),
                _: 1
              }, 8, ["label", "header-class"])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      createVNode(QPageContainer, { class: "modern-page-container" }, {
        default: withCtx(() => [
          createVNode(_component_router_view)
        ]),
        _: 1
      }),
      createVNode(QFooter, { class: "modern-footer" }, {
        default: withCtx(() => [
          createVNode(QToolbar, { class: "footer-toolbar" }, {
            default: withCtx(() => [
              createVNode(QToolbarTitle, { class: "footer-content" }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_4, [
                    createVNode(QAvatar, { size: "32px" }, {
                      default: withCtx(() => [..._cache[10] || (_cache[10] = [
                        createBaseVNode("img", {
                          src: _imports_0,
                          alt: "eCleannear Logo",
                          style: { "width": "35px", "height": "auto" },
                          contain: ""
                        }, null, -1)
                      ])]),
                      _: 1
                    }),
                    _cache[11] || (_cache[11] = createBaseVNode("span", { class: "footer-text" }, "eCleannear © 2025 - Gestão Inteligente para Empresas de Limpeza", -1))
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  MainLayout as default
};
//# sourceMappingURL=MainLayout-DdPAm2Db.js.map
