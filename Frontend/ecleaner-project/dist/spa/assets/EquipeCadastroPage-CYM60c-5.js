import { I as noop, n as createComponent, p as computed, q as h, s as hSlot, aB as useTransitionProps, aC as nonRoundBtnProps, v as getCurrentInstance, r as ref, aD as useId, aE as getBtnDesignAttr, A as watch, $ as onMounted, k as QIcon, l as QBtn, M as stop, aF as shouldIgnoreKey, L as prevent, S as useDarkProps, U as useDark, aG as useSplitAttrs, B as onBeforeUnmount, P as stopAndPrevent, Z as nextTick, aH as addFocusFn, _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, e as createVNode, f as createBaseVNode, t as toDisplayString, i as createCommentVNode, g as QCardSection, h as createElementBlock, m as createTextVNode, a6 as QAvatar, aj as Fragment, aI as mergeProps, aJ as QOptionGroup, Q as QCard, a4 as useRoute, b as useRouter, a5 as resolveComponent, j as QInput, ak as renderList } from "./index-C_9ZqZx5.js";
import { Q as QSpace } from "./QSpace-CN10jCLy.js";
import { Q as QMenu } from "./QMenu-0ExrfRXY.js";
import { Q as QTooltip } from "./QTooltip-BRNgwqDX.js";
import { a as QItemSection, Q as QItem, c as QItemLabel } from "./format-X8mfcfls.js";
import { u as useFullscreenEmits, a as useFullscreenProps, b as useFullscreen } from "./use-fullscreen-BFuhyU9x.js";
import { Q as QForm } from "./QForm-BkJeMJ2y.js";
import { Q as QPage } from "./QPage-BjohE0wt.js";
import { u as useQuasar } from "./use-quasar-RhPDzzvJ.js";
import { C as ColaboradorEquipe, F as FuncaoColaborador, E as EquipeRepository, a as Equipe } from "./equipeRepository-Cy9UNbRy.js";
import { C as ColaboradorRepository } from "./colaboradorRepository-DatlZTxI.js";
import { Q as QSelect } from "./QSelect-B7UkQpY4.js";
import { u as useI18n } from "./vue-i18n.runtime-BcAS3Jju.js";
import "./position-engine-D6xtJVbJ.js";
import "./selection-q6_tzKdx.js";
import "./guid-BHuXRmln.js";
import "./colaborador-OpPhEqDl.js";
import "./pessoa-C98XhDqr.js";
import "./QChip-CQHm52sc.js";
function getBlockElement(el, parent) {
  if (parent && el === parent) {
    return null;
  }
  const nodeName = el.nodeName.toLowerCase();
  if (["div", "li", "ul", "ol", "blockquote"].includes(nodeName) === true) {
    return el;
  }
  const style = window.getComputedStyle ? window.getComputedStyle(el) : el.currentStyle, display = style.display;
  if (display === "block" || display === "table") {
    return el;
  }
  return getBlockElement(el.parentNode);
}
function isChildOf(el, parent, orSame) {
  return !el || el === document.body ? false : orSame === true && el === parent || (parent === document ? document.body : parent).contains(el.parentNode);
}
function createRange(node, chars, range) {
  if (!range) {
    range = document.createRange();
    range.selectNode(node);
    range.setStart(node, 0);
  }
  if (chars.count === 0) {
    range.setEnd(node, chars.count);
  } else if (chars.count > 0) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.length < chars.count) {
        chars.count -= node.textContent.length;
      } else {
        range.setEnd(node, chars.count);
        chars.count = 0;
      }
    } else {
      for (let lp = 0; chars.count !== 0 && lp < node.childNodes.length; lp++) {
        range = createRange(node.childNodes[lp], chars, range);
      }
    }
  }
  return range;
}
const urlRegex = /^https?:\/\//;
class Caret {
  constructor(el, eVm) {
    this.el = el;
    this.eVm = eVm;
    this._range = null;
  }
  get selection() {
    if (this.el) {
      const sel = document.getSelection();
      if (isChildOf(sel.anchorNode, this.el, true) && isChildOf(sel.focusNode, this.el, true)) {
        return sel;
      }
    }
    return null;
  }
  get hasSelection() {
    return this.selection !== null ? this.selection.toString().length !== 0 : false;
  }
  get range() {
    const sel = this.selection;
    if (sel?.rangeCount) {
      return sel.getRangeAt(0);
    }
    return this._range;
  }
  get parent() {
    const range = this.range;
    if (range !== null) {
      const node = range.startContainer;
      return node.nodeType === document.ELEMENT_NODE ? node : node.parentNode;
    }
    return null;
  }
  get blockParent() {
    const parent = this.parent;
    if (parent !== null) {
      return getBlockElement(parent, this.el);
    }
    return null;
  }
  save(range = this.range) {
    if (range !== null) {
      this._range = range;
    }
  }
  restore(range = this._range) {
    const r = document.createRange(), sel = document.getSelection();
    if (range !== null) {
      r.setStart(range.startContainer, range.startOffset);
      r.setEnd(range.endContainer, range.endOffset);
      sel.removeAllRanges();
      sel.addRange(r);
    } else {
      sel.selectAllChildren(this.el);
      sel.collapseToEnd();
    }
  }
  savePosition() {
    let charCount = -1, node;
    const selection = document.getSelection(), parentEl = this.el.parentNode;
    if (selection.focusNode && isChildOf(selection.focusNode, parentEl)) {
      node = selection.focusNode;
      charCount = selection.focusOffset;
      while (node && node !== parentEl) {
        if (node !== this.el && node.previousSibling) {
          node = node.previousSibling;
          charCount += node.textContent.length;
        } else {
          node = node.parentNode;
        }
      }
    }
    this.savedPos = charCount;
  }
  restorePosition(length = 0) {
    if (this.savedPos > 0 && this.savedPos < length) {
      const selection = window.getSelection(), range = createRange(this.el, { count: this.savedPos });
      if (range) {
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }
  hasParent(name, spanLevel) {
    const el = spanLevel ? this.parent : this.blockParent;
    return el !== null ? el.nodeName.toLowerCase() === name.toLowerCase() : false;
  }
  hasParents(list, recursive, el = this.parent) {
    if (el === null) {
      return false;
    }
    if (list.includes(el.nodeName.toLowerCase()) === true) {
      return true;
    }
    return recursive === true ? this.hasParents(list, recursive, el.parentNode) : false;
  }
  is(cmd, param) {
    if (this.selection === null) {
      return false;
    }
    switch (cmd) {
      case "formatBlock":
        return param === "DIV" && this.parent === this.el || this.hasParent(param, param === "PRE");
      case "link":
        return this.hasParent("A", true);
      case "fontSize":
        return document.queryCommandValue(cmd) === param;
      case "fontName":
        const res = document.queryCommandValue(cmd);
        return res === `"${param}"` || res === param;
      case "fullscreen":
        return this.eVm.inFullscreen.value;
      case "viewsource":
        return this.eVm.isViewingSource.value;
      case void 0:
        return false;
      default:
        const state = document.queryCommandState(cmd);
        return param !== void 0 ? state === param : state;
    }
  }
  getParentAttribute(attrib) {
    if (this.parent !== null) {
      return this.parent.getAttribute(attrib);
    }
    return null;
  }
  can(name) {
    if (name === "outdent") {
      return this.hasParents(["blockquote", "li"], true);
    }
    if (name === "indent") {
      return this.hasParents(["li"], true);
    }
    if (name === "link") {
      return this.selection !== null || this.is("link");
    }
  }
  apply(cmd, param, done = noop) {
    if (cmd === "formatBlock") {
      if (["BLOCKQUOTE", "H1", "H2", "H3", "H4", "H5", "H6"].includes(param) && this.is(cmd, param)) {
        cmd = "outdent";
        param = null;
      }
      if (param === "PRE" && this.is(cmd, "PRE")) {
        param = "P";
      }
    } else if (cmd === "print") {
      done();
      const win = window.open();
      win.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `);
      win.print();
      win.close();
      return;
    } else if (cmd === "link") {
      const link = this.getParentAttribute("href");
      if (link === null) {
        const selection = this.selectWord(this.selection);
        const url = selection ? selection.toString() : "";
        if (!url.length && (!this.range || !this.range.cloneContents().querySelector("img"))) return;
        this.eVm.editLinkUrl.value = urlRegex.test(url) ? url : "https://";
        document.execCommand("createLink", false, this.eVm.editLinkUrl.value);
        this.save(selection.getRangeAt(0));
      } else {
        this.eVm.editLinkUrl.value = link;
        this.range.selectNodeContents(this.parent);
        this.save();
      }
      return;
    } else if (cmd === "fullscreen") {
      this.eVm.toggleFullscreen();
      done();
      return;
    } else if (cmd === "viewsource") {
      this.eVm.isViewingSource.value = this.eVm.isViewingSource.value === false;
      this.eVm.setContent(this.eVm.props.modelValue);
      done();
      return;
    }
    document.execCommand(cmd, false, param);
    done();
  }
  selectWord(sel) {
    if (sel === null || sel.isCollapsed !== true || /* IE 11 */
    sel.modify === void 0) {
      return sel;
    }
    const range = document.createRange();
    range.setStart(sel.anchorNode, sel.anchorOffset);
    range.setEnd(sel.focusNode, sel.focusOffset);
    const direction = range.collapsed ? ["backward", "forward"] : ["forward", "backward"];
    range.detach();
    const endNode = sel.focusNode, endOffset = sel.focusOffset;
    sel.collapse(sel.anchorNode, sel.anchorOffset);
    sel.modify("move", direction[0], "character");
    sel.modify("move", direction[1], "word");
    sel.extend(endNode, endOffset);
    sel.modify("extend", direction[1], "character");
    sel.modify("extend", direction[0], "word");
    return sel;
  }
}
const QBtnGroup = createComponent({
  name: "QBtnGroup",
  props: {
    unelevated: Boolean,
    outline: Boolean,
    flat: Boolean,
    rounded: Boolean,
    square: Boolean,
    push: Boolean,
    stretch: Boolean,
    glossy: Boolean,
    spread: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(() => {
      const cls = ["unelevated", "outline", "flat", "rounded", "square", "push", "stretch", "glossy"].filter((t) => props[t] === true).map((t) => `q-btn-group--${t}`).join(" ");
      return `q-btn-group row no-wrap${cls.length !== 0 ? " " + cls : ""}` + (props.spread === true ? " q-btn-group--spread" : " inline");
    });
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
const btnPropsList = Object.keys(nonRoundBtnProps);
function passBtnProps(props) {
  return btnPropsList.reduce((acc, key) => {
    const val = props[key];
    if (val !== void 0) {
      acc[key] = val;
    }
    return acc;
  }, {});
}
const QBtnDropdown = createComponent({
  name: "QBtnDropdown",
  props: {
    ...nonRoundBtnProps,
    ...useTransitionProps,
    modelValue: Boolean,
    split: Boolean,
    dropdownIcon: String,
    contentClass: [Array, String, Object],
    contentStyle: [Array, String, Object],
    cover: Boolean,
    persistent: Boolean,
    noEscDismiss: Boolean,
    noRouteDismiss: Boolean,
    autoClose: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    menuAnchor: {
      type: String,
      default: "bottom end"
    },
    menuSelf: {
      type: String,
      default: "top end"
    },
    menuOffset: Array,
    disableMainBtn: Boolean,
    disableDropdown: Boolean,
    noIconAnimation: Boolean,
    toggleAriaLabel: String
  },
  emits: ["update:modelValue", "click", "beforeShow", "show", "beforeHide", "hide"],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const showing = ref(props.modelValue);
    const menuRef = ref(null);
    const targetUid = useId();
    const ariaAttrs = computed(() => {
      const acc = {
        "aria-expanded": showing.value === true ? "true" : "false",
        "aria-haspopup": "true",
        "aria-controls": targetUid.value,
        "aria-label": props.toggleAriaLabel || proxy.$q.lang.label[showing.value === true ? "collapse" : "expand"](props.label)
      };
      if (props.disable === true || (props.split === false && props.disableMainBtn === true || props.disableDropdown === true)) {
        acc["aria-disabled"] = "true";
      }
      return acc;
    });
    const iconClass = computed(
      () => "q-btn-dropdown__arrow" + (showing.value === true && props.noIconAnimation === false ? " rotate-180" : "") + (props.split === false ? " q-btn-dropdown__arrow-container" : "")
    );
    const btnDesignAttr = computed(() => getBtnDesignAttr(props));
    const btnProps = computed(() => passBtnProps(props));
    watch(() => props.modelValue, (val) => {
      menuRef.value?.[val ? "show" : "hide"]();
    });
    watch(() => props.split, hide);
    function onBeforeShow(e) {
      showing.value = true;
      emit("beforeShow", e);
    }
    function onShow(e) {
      emit("show", e);
      emit("update:modelValue", true);
    }
    function onBeforeHide(e) {
      showing.value = false;
      emit("beforeHide", e);
    }
    function onHide(e) {
      emit("hide", e);
      emit("update:modelValue", false);
    }
    function onClick(e) {
      emit("click", e);
    }
    function onClickHide(e) {
      stop(e);
      hide();
      emit("click", e);
    }
    function toggle(evt) {
      menuRef.value?.toggle(evt);
    }
    function show(evt) {
      menuRef.value?.show(evt);
    }
    function hide(evt) {
      menuRef.value?.hide(evt);
    }
    Object.assign(proxy, {
      show,
      hide,
      toggle
    });
    onMounted(() => {
      props.modelValue === true && show();
    });
    return () => {
      const Arrow = [
        h(QIcon, {
          class: iconClass.value,
          name: props.dropdownIcon || proxy.$q.iconSet.arrow.dropdown
        })
      ];
      props.disableDropdown !== true && Arrow.push(
        h(QMenu, {
          ref: menuRef,
          id: targetUid.value,
          class: props.contentClass,
          style: props.contentStyle,
          cover: props.cover,
          fit: true,
          persistent: props.persistent,
          noEscDismiss: props.noEscDismiss,
          noRouteDismiss: props.noRouteDismiss,
          autoClose: props.autoClose,
          noFocus: props.noFocus,
          noRefocus: props.noRefocus,
          anchor: props.menuAnchor,
          self: props.menuSelf,
          offset: props.menuOffset,
          separateClosePopup: true,
          transitionShow: props.transitionShow,
          transitionHide: props.transitionHide,
          transitionDuration: props.transitionDuration,
          onBeforeShow,
          onShow,
          onBeforeHide,
          onHide
        }, slots.default)
      );
      if (props.split === false) {
        return h(QBtn, {
          class: "q-btn-dropdown q-btn-dropdown--simple",
          ...btnProps.value,
          ...ariaAttrs.value,
          disable: props.disable === true || props.disableMainBtn === true,
          noWrap: true,
          round: false,
          onClick
        }, {
          default: () => hSlot(slots.label, []).concat(Arrow),
          loading: slots.loading
        });
      }
      return h(QBtnGroup, {
        class: "q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",
        rounded: props.rounded,
        square: props.square,
        ...btnDesignAttr.value,
        glossy: props.glossy,
        stretch: props.stretch
      }, () => [
        h(QBtn, {
          class: "q-btn-dropdown--current",
          ...btnProps.value,
          disable: props.disable === true || props.disableMainBtn === true,
          noWrap: true,
          round: false,
          onClick: onClickHide
        }, {
          default: slots.label,
          loading: slots.loading
        }),
        h(QBtn, {
          class: "q-btn-dropdown__arrow-container q-anchor--skip",
          ...ariaAttrs.value,
          ...btnDesignAttr.value,
          disable: props.disable === true || props.disableDropdown === true,
          rounded: props.rounded,
          color: props.color,
          textColor: props.textColor,
          dense: props.dense,
          size: props.size,
          padding: props.padding,
          ripple: props.ripple
        }, () => Arrow)
      ]);
    };
  }
});
function run(e, btn, eVm) {
  if (btn.handler) {
    btn.handler(e, eVm, eVm.caret);
  } else {
    eVm.runCmd(btn.cmd, btn.param);
  }
}
function getGroup(children) {
  return h("div", { class: "q-editor__toolbar-group" }, children);
}
function getBtn(eVm, btn, clickHandler, active = false) {
  const toggled = active || (btn.type === "toggle" ? btn.toggled ? btn.toggled(eVm) : btn.cmd && eVm.caret.is(btn.cmd, btn.param) : false), child = [];
  if (eVm.$q.platform.is.desktop && (btn.tip || btn.htmlTip)) {
    const Key = btn.key ? h("div", [
      h("small", `(CTRL + ${String.fromCharCode(btn.key)})`)
    ]) : null;
    child.push(
      h(QTooltip, { delay: 1e3 }, () => [
        h("div", btn.htmlTip ? { innerHTML: btn.htmlTip } : btn.tip),
        Key
      ])
    );
  }
  return h(QBtn, {
    ...eVm.buttonProps.value,
    icon: btn.icon !== null ? btn.icon : void 0,
    color: toggled ? btn.toggleColor || eVm.props.toolbarToggleColor : btn.color || eVm.props.toolbarColor,
    textColor: toggled && !eVm.props.toolbarPush ? null : btn.textColor || eVm.props.toolbarTextColor,
    label: btn.label,
    "aria-label": btn.label == null ? btn.tip : void 0,
    disable: btn.disable ? typeof btn.disable === "function" ? btn.disable(eVm) : true : false,
    size: "sm",
    onClick(e) {
      clickHandler?.();
      run(e, btn, eVm);
    }
  }, () => child);
}
function getDropdown(eVm, btn) {
  const onlyIcons = btn.list === "only-icons";
  let label = btn.label, icon = btn.icon !== null ? btn.icon : void 0, contentClass, Items;
  function closeDropdown() {
    Dropdown.component.proxy.hide();
  }
  if (onlyIcons) {
    Items = btn.options.map((btn2) => {
      const active = btn2.type === void 0 ? eVm.caret.is(btn2.cmd, btn2.param) : false;
      if (active) {
        label = btn2.tip;
        icon = btn2.icon !== null ? btn2.icon : void 0;
      }
      return getBtn(eVm, btn2, closeDropdown, active);
    });
    contentClass = eVm.toolbarBackgroundClass.value;
    Items = [
      getGroup(Items)
    ];
  } else {
    const activeClass = eVm.props.toolbarToggleColor !== void 0 ? `text-${eVm.props.toolbarToggleColor}` : null;
    const inactiveClass = eVm.props.toolbarTextColor !== void 0 ? `text-${eVm.props.toolbarTextColor}` : null;
    const noIcons = btn.list === "no-icons";
    Items = btn.options.map((btn2) => {
      const disable = btn2.disable ? btn2.disable(eVm) : false;
      const active = btn2.type === void 0 ? eVm.caret.is(btn2.cmd, btn2.param) : false;
      if (active) {
        label = btn2.tip;
        icon = btn2.icon !== null ? btn2.icon : void 0;
      }
      const htmlTip = btn2.htmlTip;
      return h(QItem, {
        active,
        activeClass,
        clickable: true,
        disable,
        dense: true,
        onClick(e) {
          closeDropdown();
          e?.qAvoidFocus !== true && eVm.contentRef.value?.focus();
          eVm.caret.restore();
          run(e, btn2, eVm);
        }
      }, () => [
        noIcons === true ? null : h(
          QItemSection,
          {
            class: active ? activeClass : inactiveClass,
            side: true
          },
          () => h(QIcon, { name: btn2.icon !== null ? btn2.icon : void 0 })
        ),
        h(
          QItemSection,
          htmlTip ? () => h("div", { class: "text-no-wrap", innerHTML: btn2.htmlTip }) : btn2.tip ? () => h("div", { class: "text-no-wrap" }, btn2.tip) : void 0
        )
      ]);
    });
    contentClass = [eVm.toolbarBackgroundClass.value, inactiveClass];
  }
  const highlight = btn.highlight && label !== btn.label;
  const Dropdown = h(QBtnDropdown, {
    ...eVm.buttonProps.value,
    noCaps: true,
    noWrap: true,
    color: highlight ? eVm.props.toolbarToggleColor : eVm.props.toolbarColor,
    textColor: highlight && !eVm.props.toolbarPush ? null : eVm.props.toolbarTextColor,
    label: btn.fixedLabel ? btn.label : label,
    icon: btn.fixedIcon ? btn.icon !== null ? btn.icon : void 0 : icon,
    contentClass,
    onShow: (evt) => eVm.emit("dropdownShow", evt),
    onHide: (evt) => eVm.emit("dropdownHide", evt),
    onBeforeShow: (evt) => eVm.emit("dropdownBeforeShow", evt),
    onBeforeHide: (evt) => eVm.emit("dropdownBeforeHide", evt)
  }, () => Items);
  return Dropdown;
}
function getToolbar(eVm) {
  if (eVm.caret) {
    return eVm.buttons.value.filter((f) => {
      return !eVm.isViewingSource.value || f.find((fb) => fb.cmd === "viewsource");
    }).map((group) => getGroup(
      group.map((btn) => {
        if (eVm.isViewingSource.value && btn.cmd !== "viewsource") {
          return false;
        }
        if (btn.type === "slot") {
          return hSlot(eVm.slots[btn.slot]);
        }
        if (btn.type === "dropdown") {
          return getDropdown(eVm, btn);
        }
        return getBtn(eVm, btn);
      })
    ));
  }
}
function getFonts(defaultFont, defaultFontLabel, defaultFontIcon, fonts = {}) {
  const aliases = Object.keys(fonts);
  if (aliases.length === 0) {
    return {};
  }
  const def = {
    default_font: {
      cmd: "fontName",
      param: defaultFont,
      icon: defaultFontIcon,
      tip: defaultFontLabel
    }
  };
  aliases.forEach((alias) => {
    const name = fonts[alias];
    def[alias] = {
      cmd: "fontName",
      param: name,
      icon: defaultFontIcon,
      tip: name,
      htmlTip: `<font face="${name}">${name}</font>`
    };
  });
  return def;
}
function getLinkEditor(eVm) {
  if (eVm.caret) {
    const color = eVm.props.toolbarColor || eVm.props.toolbarTextColor;
    let link = eVm.editLinkUrl.value;
    const updateLink = () => {
      eVm.caret.restore();
      if (link !== eVm.editLinkUrl.value) {
        document.execCommand("createLink", false, link === "" ? " " : link);
      }
      eVm.editLinkUrl.value = null;
    };
    return [
      h("div", { class: `q-mx-xs text-${color}` }, `${eVm.$q.lang.editor.url}: `),
      h("input", {
        key: "qedt_btm_input",
        class: "col q-editor__link-input",
        value: link,
        onInput: (evt) => {
          stop(evt);
          link = evt.target.value;
        },
        onKeydown: (evt) => {
          if (shouldIgnoreKey(evt) === true) return;
          switch (evt.keyCode) {
            case 13:
              prevent(evt);
              return updateLink();
            case 27:
              prevent(evt);
              eVm.caret.restore();
              if (!eVm.editLinkUrl.value || eVm.editLinkUrl.value === "https://") {
                document.execCommand("unlink");
              }
              eVm.editLinkUrl.value = null;
              break;
          }
        }
      }),
      getGroup([
        h(QBtn, {
          key: "qedt_btm_rem",
          ...eVm.buttonProps.value,
          label: eVm.$q.lang.label.remove,
          noCaps: true,
          onClick: () => {
            eVm.caret.restore();
            document.execCommand("unlink");
            eVm.editLinkUrl.value = null;
          }
        }),
        h(QBtn, {
          key: "qedt_btm_upd",
          ...eVm.buttonProps.value,
          label: eVm.$q.lang.label.update,
          noCaps: true,
          onClick: updateLink
        })
      ])
    ];
  }
}
const toString = Object.prototype.toString, hasOwn = Object.prototype.hasOwnProperty, notPlainObject = new Set(
  ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp"].map((name) => "[object " + name + "]")
);
function isPlainObject(obj) {
  if (obj !== Object(obj) || notPlainObject.has(toString.call(obj)) === true) {
    return false;
  }
  if (obj.constructor && hasOwn.call(obj, "constructor") === false && hasOwn.call(obj.constructor.prototype, "isPrototypeOf") === false) {
    return false;
  }
  let key;
  for (key in obj) {
  }
  return key === void 0 || hasOwn.call(obj, key);
}
function extend() {
  let options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, deep = false;
  const length = arguments.length;
  if (typeof target === "boolean") {
    deep = target;
    target = arguments[1] || {};
    i = 2;
  }
  if (Object(target) !== target && typeof target !== "function") {
    target = {};
  }
  if (length === i) {
    target = this;
    i--;
  }
  for (; i < length; i++) {
    if ((options = arguments[i]) !== null) {
      for (name in options) {
        src = target[name];
        copy = options[name];
        if (target === copy) {
          continue;
        }
        if (deep === true && copy && ((copyIsArray = Array.isArray(copy)) || isPlainObject(copy) === true)) {
          if (copyIsArray === true) {
            clone = Array.isArray(src) === true ? src : [];
          } else {
            clone = isPlainObject(src) === true ? src : {};
          }
          target[name] = extend(deep, clone, copy);
        } else if (copy !== void 0) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}
const QEditor = createComponent({
  name: "QEditor",
  props: {
    ...useDarkProps,
    ...useFullscreenProps,
    modelValue: {
      type: String,
      required: true
    },
    readonly: Boolean,
    disable: Boolean,
    minHeight: {
      type: String,
      default: "10rem"
    },
    maxHeight: String,
    height: String,
    definitions: Object,
    fonts: Object,
    placeholder: String,
    toolbar: {
      type: Array,
      validator: (v) => v.length === 0 || v.every((group) => group.length),
      // long line on purpose for API validation purposes:
      default: () => [["left", "center", "right", "justify"], ["bold", "italic", "underline", "strike"], ["undo", "redo"]]
    },
    toolbarColor: String,
    toolbarBg: String,
    toolbarTextColor: String,
    toolbarToggleColor: {
      type: String,
      default: "primary"
    },
    toolbarOutline: Boolean,
    toolbarPush: Boolean,
    toolbarRounded: Boolean,
    paragraphTag: {
      type: String,
      validator: (v) => ["div", "p"].includes(v),
      default: "div"
    },
    contentStyle: Object,
    contentClass: [Object, Array, String],
    square: Boolean,
    flat: Boolean,
    dense: Boolean
  },
  emits: [
    ...useFullscreenEmits,
    "update:modelValue",
    "keydown",
    "click",
    "focus",
    "blur",
    "dropdownShow",
    "dropdownHide",
    "dropdownBeforeShow",
    "dropdownBeforeHide",
    "linkShow",
    "linkHide"
  ],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const isDark = useDark(props, $q);
    const { inFullscreen, toggleFullscreen } = useFullscreen();
    const splitAttrs = useSplitAttrs();
    const rootRef = ref(null);
    const contentRef = ref(null);
    const editLinkUrl = ref(null);
    const isViewingSource = ref(false);
    const editable = computed(() => !props.readonly && !props.disable);
    let defaultFont, offsetBottom;
    let lastEmit = props.modelValue;
    {
      document.execCommand("defaultParagraphSeparator", false, props.paragraphTag);
      defaultFont = window.getComputedStyle(document.body).fontFamily;
    }
    const toolbarBackgroundClass = computed(() => props.toolbarBg ? ` bg-${props.toolbarBg}` : "");
    const buttonProps = computed(() => {
      const flat = props.toolbarOutline !== true && props.toolbarPush !== true;
      return {
        type: "a",
        flat,
        noWrap: true,
        outline: props.toolbarOutline,
        push: props.toolbarPush,
        rounded: props.toolbarRounded,
        dense: true,
        color: props.toolbarColor,
        disable: !editable.value,
        size: "sm"
      };
    });
    const buttonDef = computed(() => {
      const e = $q.lang.editor, i = $q.iconSet.editor;
      return {
        bold: { cmd: "bold", icon: i.bold, tip: e.bold, key: 66 },
        italic: { cmd: "italic", icon: i.italic, tip: e.italic, key: 73 },
        strike: { cmd: "strikeThrough", icon: i.strikethrough, tip: e.strikethrough, key: 83 },
        underline: { cmd: "underline", icon: i.underline, tip: e.underline, key: 85 },
        unordered: { cmd: "insertUnorderedList", icon: i.unorderedList, tip: e.unorderedList },
        ordered: { cmd: "insertOrderedList", icon: i.orderedList, tip: e.orderedList },
        subscript: { cmd: "subscript", icon: i.subscript, tip: e.subscript, htmlTip: "x<subscript>2</subscript>" },
        superscript: { cmd: "superscript", icon: i.superscript, tip: e.superscript, htmlTip: "x<superscript>2</superscript>" },
        link: { cmd: "link", disable: (eVm2) => eVm2.caret && !eVm2.caret.can("link"), icon: i.hyperlink, tip: e.hyperlink, key: 76 },
        fullscreen: { cmd: "fullscreen", icon: i.toggleFullscreen, tip: e.toggleFullscreen, key: 70 },
        viewsource: { cmd: "viewsource", icon: i.viewSource, tip: e.viewSource },
        quote: { cmd: "formatBlock", param: "BLOCKQUOTE", icon: i.quote, tip: e.quote, key: 81 },
        left: { cmd: "justifyLeft", icon: i.left, tip: e.left },
        center: { cmd: "justifyCenter", icon: i.center, tip: e.center },
        right: { cmd: "justifyRight", icon: i.right, tip: e.right },
        justify: { cmd: "justifyFull", icon: i.justify, tip: e.justify },
        print: { type: "no-state", cmd: "print", icon: i.print, tip: e.print, key: 80 },
        outdent: { type: "no-state", disable: (eVm2) => eVm2.caret && !eVm2.caret.can("outdent"), cmd: "outdent", icon: i.outdent, tip: e.outdent },
        indent: { type: "no-state", disable: (eVm2) => eVm2.caret && !eVm2.caret.can("indent"), cmd: "indent", icon: i.indent, tip: e.indent },
        removeFormat: { type: "no-state", cmd: "removeFormat", icon: i.removeFormat, tip: e.removeFormat },
        hr: { type: "no-state", cmd: "insertHorizontalRule", icon: i.hr, tip: e.hr },
        undo: { type: "no-state", cmd: "undo", icon: i.undo, tip: e.undo, key: 90 },
        redo: { type: "no-state", cmd: "redo", icon: i.redo, tip: e.redo, key: 89 },
        h1: { cmd: "formatBlock", param: "H1", icon: i.heading1 || i.heading, tip: e.heading1, htmlTip: `<h1 class="q-ma-none">${e.heading1}</h1>` },
        h2: { cmd: "formatBlock", param: "H2", icon: i.heading2 || i.heading, tip: e.heading2, htmlTip: `<h2 class="q-ma-none">${e.heading2}</h2>` },
        h3: { cmd: "formatBlock", param: "H3", icon: i.heading3 || i.heading, tip: e.heading3, htmlTip: `<h3 class="q-ma-none">${e.heading3}</h3>` },
        h4: { cmd: "formatBlock", param: "H4", icon: i.heading4 || i.heading, tip: e.heading4, htmlTip: `<h4 class="q-ma-none">${e.heading4}</h4>` },
        h5: { cmd: "formatBlock", param: "H5", icon: i.heading5 || i.heading, tip: e.heading5, htmlTip: `<h5 class="q-ma-none">${e.heading5}</h5>` },
        h6: { cmd: "formatBlock", param: "H6", icon: i.heading6 || i.heading, tip: e.heading6, htmlTip: `<h6 class="q-ma-none">${e.heading6}</h6>` },
        p: { cmd: "formatBlock", param: props.paragraphTag, icon: i.heading, tip: e.paragraph },
        code: { cmd: "formatBlock", param: "PRE", icon: i.code, htmlTip: `<code>${e.code}</code>` },
        "size-1": { cmd: "fontSize", param: "1", icon: i.size1 || i.size, tip: e.size1, htmlTip: `<font size="1">${e.size1}</font>` },
        "size-2": { cmd: "fontSize", param: "2", icon: i.size2 || i.size, tip: e.size2, htmlTip: `<font size="2">${e.size2}</font>` },
        "size-3": { cmd: "fontSize", param: "3", icon: i.size3 || i.size, tip: e.size3, htmlTip: `<font size="3">${e.size3}</font>` },
        "size-4": { cmd: "fontSize", param: "4", icon: i.size4 || i.size, tip: e.size4, htmlTip: `<font size="4">${e.size4}</font>` },
        "size-5": { cmd: "fontSize", param: "5", icon: i.size5 || i.size, tip: e.size5, htmlTip: `<font size="5">${e.size5}</font>` },
        "size-6": { cmd: "fontSize", param: "6", icon: i.size6 || i.size, tip: e.size6, htmlTip: `<font size="6">${e.size6}</font>` },
        "size-7": { cmd: "fontSize", param: "7", icon: i.size7 || i.size, tip: e.size7, htmlTip: `<font size="7">${e.size7}</font>` }
      };
    });
    const buttons = computed(() => {
      const userDef = props.definitions || {};
      const def = props.definitions || props.fonts ? extend(
        true,
        {},
        buttonDef.value,
        userDef,
        getFonts(
          defaultFont,
          $q.lang.editor.defaultFont,
          $q.iconSet.editor.font,
          props.fonts
        )
      ) : buttonDef.value;
      return props.toolbar.map(
        (group) => group.map((token) => {
          if (token.options) {
            return {
              type: "dropdown",
              icon: token.icon,
              label: token.label,
              size: "sm",
              dense: true,
              fixedLabel: token.fixedLabel,
              fixedIcon: token.fixedIcon,
              highlight: token.highlight,
              list: token.list,
              options: token.options.map((item) => def[item])
            };
          }
          const obj = def[token];
          if (obj) {
            return obj.type === "no-state" || userDef[token] && (obj.cmd === void 0 || buttonDef.value[obj.cmd] && buttonDef.value[obj.cmd].type === "no-state") ? obj : Object.assign({ type: "toggle" }, obj);
          } else {
            return {
              type: "slot",
              slot: token
            };
          }
        })
      );
    });
    const eVm = {
      $q,
      props,
      slots,
      emit,
      // caret (will get injected after mount)
      inFullscreen,
      toggleFullscreen,
      runCmd,
      isViewingSource,
      editLinkUrl,
      toolbarBackgroundClass,
      buttonProps,
      contentRef,
      buttons,
      setContent
    };
    watch(() => props.modelValue, (v) => {
      if (lastEmit !== v) {
        lastEmit = v;
        setContent(v, true);
      }
    });
    watch(editLinkUrl, (v) => {
      emit(`link${v ? "Show" : "Hide"}`);
    });
    const hasToolbar = computed(() => props.toolbar && props.toolbar.length !== 0);
    const keys = computed(() => {
      const k = {}, add = (btn) => {
        if (btn.key) {
          k[btn.key] = {
            cmd: btn.cmd,
            param: btn.param
          };
        }
      };
      buttons.value.forEach((group) => {
        group.forEach((token) => {
          if (token.options) {
            token.options.forEach(add);
          } else {
            add(token);
          }
        });
      });
      return k;
    });
    const innerStyle = computed(() => inFullscreen.value ? props.contentStyle : [
      {
        minHeight: props.minHeight,
        height: props.height,
        maxHeight: props.maxHeight
      },
      props.contentStyle
    ]);
    const classes = computed(
      () => `q-editor q-editor--${isViewingSource.value === true ? "source" : "default"}` + (props.disable === true ? " disabled" : "") + (inFullscreen.value === true ? " fullscreen column" : "") + (props.square === true ? " q-editor--square no-border-radius" : "") + (props.flat === true ? " q-editor--flat" : "") + (props.dense === true ? " q-editor--dense" : "") + (isDark.value === true ? " q-editor--dark q-dark" : "")
    );
    const innerClass = computed(() => [
      props.contentClass,
      "q-editor__content",
      { col: inFullscreen.value, "overflow-auto": inFullscreen.value || props.maxHeight }
    ]);
    const attributes = computed(() => props.disable === true ? { "aria-disabled": "true" } : {});
    function onInput() {
      if (contentRef.value !== null) {
        const prop = `inner${isViewingSource.value === true ? "Text" : "HTML"}`;
        const val = contentRef.value[prop];
        if (val !== props.modelValue) {
          lastEmit = val;
          emit("update:modelValue", val);
        }
      }
    }
    function onKeydown(e) {
      emit("keydown", e);
      if (e.ctrlKey !== true || shouldIgnoreKey(e) === true) {
        refreshToolbar();
        return;
      }
      const key = e.keyCode;
      const target = keys.value[key];
      if (target !== void 0) {
        const { cmd, param } = target;
        stopAndPrevent(e);
        runCmd(cmd, param, false);
      }
    }
    function onClick(e) {
      refreshToolbar();
      emit("click", e);
    }
    function onBlur(e) {
      if (contentRef.value !== null) {
        const { scrollTop, scrollHeight } = contentRef.value;
        offsetBottom = scrollHeight - scrollTop;
      }
      eVm.caret.save();
      emit("blur", e);
    }
    function onFocus(e) {
      nextTick(() => {
        if (contentRef.value !== null && offsetBottom !== void 0) {
          contentRef.value.scrollTop = contentRef.value.scrollHeight - offsetBottom;
        }
      });
      emit("focus", e);
    }
    function onFocusin(e) {
      const root = rootRef.value;
      if (root !== null && root.contains(e.target) === true && (e.relatedTarget === null || root.contains(e.relatedTarget) !== true)) {
        const prop = `inner${isViewingSource.value === true ? "Text" : "HTML"}`;
        eVm.caret.restorePosition(contentRef.value[prop].length);
        refreshToolbar();
      }
    }
    function onFocusout(e) {
      const root = rootRef.value;
      if (root !== null && root.contains(e.target) === true && (e.relatedTarget === null || root.contains(e.relatedTarget) !== true)) {
        eVm.caret.savePosition();
        refreshToolbar();
      }
    }
    function onPointerStart() {
      offsetBottom = void 0;
    }
    function onSelectionchange(e) {
      eVm.caret.save();
    }
    function setContent(v, restorePosition) {
      if (contentRef.value !== null) {
        if (restorePosition === true) {
          eVm.caret.savePosition();
        }
        const prop = `inner${isViewingSource.value === true ? "Text" : "HTML"}`;
        contentRef.value[prop] = v;
        if (restorePosition === true) {
          eVm.caret.restorePosition(contentRef.value[prop].length);
          refreshToolbar();
        }
      }
    }
    function runCmd(cmd, param, update = true) {
      focus();
      eVm.caret.restore();
      eVm.caret.apply(cmd, param, () => {
        focus();
        eVm.caret.save();
        if (update) {
          refreshToolbar();
        }
      });
    }
    function refreshToolbar() {
      setTimeout(() => {
        editLinkUrl.value = null;
        proxy.$forceUpdate();
      }, 1);
    }
    function focus() {
      addFocusFn(() => {
        contentRef.value?.focus({ preventScroll: true });
      });
    }
    function getContentEl() {
      return contentRef.value;
    }
    onMounted(() => {
      eVm.caret = proxy.caret = new Caret(contentRef.value, eVm);
      setContent(props.modelValue);
      refreshToolbar();
      document.addEventListener("selectionchange", onSelectionchange);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("selectionchange", onSelectionchange);
    });
    Object.assign(proxy, {
      runCmd,
      refreshToolbar,
      focus,
      getContentEl
    });
    return () => {
      let toolbars;
      if (hasToolbar.value) {
        const bars = [
          h("div", {
            key: "qedt_top",
            class: "q-editor__toolbar row no-wrap scroll-x" + toolbarBackgroundClass.value
          }, getToolbar(eVm))
        ];
        editLinkUrl.value !== null && bars.push(
          h("div", {
            key: "qedt_btm",
            class: "q-editor__toolbar row no-wrap items-center scroll-x" + toolbarBackgroundClass.value
          }, getLinkEditor(eVm))
        );
        toolbars = h("div", {
          key: "toolbar_ctainer",
          class: "q-editor__toolbars-container"
        }, bars);
      }
      return h("div", {
        ref: rootRef,
        class: classes.value,
        style: { height: inFullscreen.value === true ? "100%" : null },
        ...attributes.value,
        onFocusin,
        onFocusout
      }, [
        toolbars,
        h("div", {
          ref: contentRef,
          style: innerStyle.value,
          class: innerClass.value,
          contenteditable: editable.value,
          placeholder: props.placeholder,
          ...{},
          ...splitAttrs.listeners.value,
          onInput,
          onKeydown,
          onClick,
          onBlur,
          onFocus,
          // clean saved scroll position
          onMousedown: onPointerStart,
          onTouchstartPassive: onPointerStart
        })
      ]);
    };
  }
});
const _sfc_main$1 = defineComponent({
  name: "ColaboradorEquipeCard",
  props: {
    modelValue: {
      type: ColaboradorEquipe,
      default: null
    },
    index: {
      type: Number,
      required: true
    },
    colaboradores: {
      type: Array,
      required: true
    },
    colaboradoresJaSelecionados: {
      type: Array,
      default: () => []
    }
  },
  emits: ["update:modelValue", "remove"],
  setup(props, { emit }) {
    const { t } = useI18n();
    const localColaboradorEquipe = ref({
      Colaborador: props.modelValue?.Colaborador?.Id || null,
      Funcoes: props.modelValue?.Funcoes || []
    });
    const selectedColaborador = computed(() => {
      if (!localColaboradorEquipe.value.Colaborador) return null;
      return props.colaboradores.find((c) => c.Id === localColaboradorEquipe.value.Colaborador);
    });
    const colaboradoresDisponiveis = computed(() => {
      return props.colaboradores.filter((colaborador) => {
        if (colaborador.Id === localColaboradorEquipe.value.Colaborador) {
          return true;
        }
        return !props.colaboradoresJaSelecionados.includes(colaborador.Id);
      });
    });
    const funcoesDisponiveis = computed(() => [
      { label: t("enums.funcaoColaborador.LIDER"), value: FuncaoColaborador.LIDER },
      { label: t("enums.funcaoColaborador.EXECUTOR"), value: FuncaoColaborador.EXECUTOR },
      { label: t("enums.funcaoColaborador.MOTORISTA"), value: FuncaoColaborador.MOTORISTA }
    ]);
    const onColaboradorChange = () => {
      emitChange();
    };
    const onFuncaoChange = () => {
      emitChange();
    };
    const emitChange = () => {
      if (localColaboradorEquipe.value.Colaborador && localColaboradorEquipe.value.Funcoes && localColaboradorEquipe.value.Funcoes.length > 0) {
        const colaborador = props.colaboradores.find((c) => c.Id === localColaboradorEquipe.value.Colaborador);
        if (colaborador) {
          const colaboradorEquipe = new ColaboradorEquipe(colaborador, localColaboradorEquipe.value.Funcoes);
          emit("update:modelValue", colaboradorEquipe);
        }
      } else {
        emit("update:modelValue", null);
      }
    };
    watch(() => props.modelValue, (newValue) => {
      if (newValue) {
        localColaboradorEquipe.value = {
          Colaborador: newValue.Colaborador?.Id || null,
          Funcoes: newValue.Funcoes || []
        };
      } else {
        localColaboradorEquipe.value = {
          Colaborador: null,
          Funcoes: []
        };
      }
    }, { immediate: true });
    return {
      localColaboradorEquipe,
      selectedColaborador,
      colaboradoresDisponiveis,
      funcoesDisponiveis,
      onColaboradorChange,
      onFuncaoChange
    };
  }
});
const _hoisted_1$1 = { class: "row items-center" };
const _hoisted_2$1 = { class: "col" };
const _hoisted_3$1 = { class: "text-h6 text-primary" };
const _hoisted_4$1 = { class: "col-auto" };
const _hoisted_5$1 = { class: "row q-col-gutter-md" };
const _hoisted_6$1 = { class: "col-12 col-md-8" };
const _hoisted_7$1 = { class: "col-12 col-md-4" };
const _hoisted_8$1 = { class: "text-subtitle2 q-mb-sm" };
const _hoisted_9$1 = {
  key: 0,
  class: "text-negative text-caption q-mt-xs"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QCard, {
    flat: "",
    bordered: "",
    class: "q-mb-md"
  }, {
    default: withCtx(() => [
      createVNode(QCardSection, null, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$1, [
            createBaseVNode("div", _hoisted_2$1, [
              createBaseVNode("div", _hoisted_3$1, toDisplayString(_ctx.index === 0 ? _ctx.$t("components.colaboradorEquipeCard.firstMember") : _ctx.$t("components.colaboradorEquipeCard.memberNumber", { number: _ctx.index + 1 })), 1)
            ]),
            createBaseVNode("div", _hoisted_4$1, [
              _ctx.index > 0 ? (openBlock(), createBlock(QBtn, {
                key: 0,
                flat: "",
                round: "",
                dense: "",
                icon: "close",
                color: "negative",
                size: "sm",
                onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("remove")),
                title: _ctx.$t("components.colaboradorEquipeCard.remove")
              }, null, 8, ["title"])) : createCommentVNode("", true)
            ])
          ])
        ]),
        _: 1
      }),
      createVNode(QCardSection, null, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_5$1, [
            createBaseVNode("div", _hoisted_6$1, [
              createVNode(QSelect, {
                modelValue: _ctx.localColaboradorEquipe.Colaborador,
                "onUpdate:modelValue": [
                  _cache[1] || (_cache[1] = ($event) => _ctx.localColaboradorEquipe.Colaborador = $event),
                  _ctx.onColaboradorChange
                ],
                options: _ctx.colaboradoresDisponiveis,
                label: _ctx.$t("components.colaboradorEquipeCard.fields.colaborador"),
                rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                "option-label": (opt) => `${opt.Nome} ${opt.Sobrenome}`,
                "option-value": "Id",
                "emit-value": "",
                "map-options": "",
                outlined: ""
              }, {
                option: withCtx(({ itemProps, opt, toggleOption }) => [
                  createVNode(QItem, mergeProps(itemProps, {
                    onClick: ($event) => toggleOption(opt)
                  }), {
                    default: withCtx(() => [
                      createVNode(QItemSection, { avatar: "" }, {
                        default: withCtx(() => [
                          createVNode(QAvatar, {
                            color: "primary",
                            "text-color": "white"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(opt.Nome[0]) + toDisplayString(opt.Sobrenome[0]), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createVNode(QItemLabel, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(opt.Nome) + " " + toDisplayString(opt.Sobrenome), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(QItemLabel, { caption: "" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(opt.Email), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1040, ["onClick"])
                ]),
                selected: withCtx(() => [
                  _ctx.selectedColaborador ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createVNode(QAvatar, {
                      color: "primary",
                      "text-color": "white",
                      class: "q-mr-sm"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.selectedColaborador.Nome[0]) + toDisplayString(_ctx.selectedColaborador.Sobrenome[0]), 1)
                      ]),
                      _: 1
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.selectedColaborador.Nome) + " " + toDisplayString(_ctx.selectedColaborador.Sobrenome), 1)
                  ], 64)) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["modelValue", "options", "label", "rules", "option-label", "onUpdate:modelValue"])
            ]),
            createBaseVNode("div", _hoisted_7$1, [
              createBaseVNode("div", _hoisted_8$1, toDisplayString(_ctx.$t("components.colaboradorEquipeCard.fields.funcoes")), 1),
              createVNode(QOptionGroup, {
                modelValue: _ctx.localColaboradorEquipe.Funcoes,
                "onUpdate:modelValue": [
                  _cache[2] || (_cache[2] = ($event) => _ctx.localColaboradorEquipe.Funcoes = $event),
                  _ctx.onFuncaoChange
                ],
                options: _ctx.funcoesDisponiveis,
                color: "primary",
                type: "checkbox",
                inline: ""
              }, null, 8, ["modelValue", "options", "onUpdate:modelValue"]),
              !_ctx.localColaboradorEquipe.Funcoes || _ctx.localColaboradorEquipe.Funcoes.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_9$1, toDisplayString(_ctx.$t("forms.validation.required")), 1)) : createCommentVNode("", true)
            ])
          ])
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
const ColaboradorEquipeCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-24c2ed66"]]);
const _sfc_main = defineComponent({
  name: "EquipeCadastroPage",
  components: {
    ColaboradorEquipeCard
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { t } = useI18n();
    const $q = useQuasar();
    const equipeRepository = new EquipeRepository();
    const colaboradorRepository = new ColaboradorRepository();
    const form = ref({
      descricao: "",
      observacoes: "",
      colaboradoresEquipe: []
    });
    const colaboradores = ref([]);
    const isEdit = computed(() => !!route.params.id);
    const colaboradoresJaSelecionados = computed(() => {
      return form.value.colaboradoresEquipe.filter((ce) => ce && ce.Colaborador).map((ce) => ce.Colaborador.Id);
    });
    const loadColaboradores = async () => {
      try {
        colaboradores.value = await colaboradorRepository.getAll();
      } catch (error) {
        console.error("Erro ao carregar colaboradores:", error);
        $q.notify({
          type: "negative",
          message: t("pages.equipeForm.messages.loadColaboradoresError")
        });
      }
    };
    const loadEquipe = async (id) => {
      try {
        const equipe = await equipeRepository.getById(id);
        if (equipe) {
          form.value = {
            descricao: equipe.Descricao,
            observacoes: equipe.Observacoes || "",
            colaboradoresEquipe: [...equipe.Colaboradores]
          };
        }
      } catch (error) {
        console.error("Erro ao carregar equipe:", error);
        $q.notify({
          type: "negative",
          message: t("pages.equipeForm.messages.loadError")
        });
        router.push("/equipes");
      }
    };
    const adicionarMembro = () => {
      form.value.colaboradoresEquipe.push(null);
    };
    const removerMembro = (index) => {
      if (index > 0) {
        form.value.colaboradoresEquipe.splice(index, 1);
      }
    };
    const onSubmit = async () => {
      try {
        const membrosValidos = form.value.colaboradoresEquipe.filter((ce) => ce && ce.Colaborador && ce.Funcoes && ce.Funcoes.length > 0);
        if (membrosValidos.length === 0) {
          $q.notify({
            type: "negative",
            message: t("pages.equipeForm.messages.noValidMembers")
          });
          return;
        }
        const equipe = new Equipe();
        if (isEdit.value) {
          equipe.Id = route.params.id;
        }
        equipe.Descricao = form.value.descricao;
        equipe.Observacoes = form.value.observacoes;
        membrosValidos.forEach((colaboradorEquipe) => {
          equipe.adicionarColaborador(colaboradorEquipe);
        });
        await equipeRepository.save(equipe);
        $q.notify({
          type: "positive",
          message: isEdit.value ? t("messages.updateSuccess") : t("messages.saveSuccess"),
          timeout: 3e3,
          position: "top-right"
        });
        setTimeout(() => {
          router.push("/equipes");
        }, 1500);
      } catch (error) {
        console.error("Erro ao salvar equipe:", error);
        $q.notify({
          type: "negative",
          message: t("messages.saveError"),
          timeout: 5e3,
          position: "top-right"
        });
      }
    };
    onMounted(async () => {
      await loadColaboradores();
      if (isEdit.value) {
        await loadEquipe(route.params.id);
      } else {
        adicionarMembro();
      }
    });
    return {
      form,
      colaboradores,
      colaboradoresJaSelecionados,
      adicionarMembro,
      removerMembro,
      onSubmit,
      isEdit
    };
  }
});
const _hoisted_1 = { class: "row items-center q-mb-xl" };
const _hoisted_2 = { class: "col" };
const _hoisted_3 = { class: "row items-center q-mb-sm" };
const _hoisted_4 = { class: "text-h5 q-ma-none text-secondary" };
const _hoisted_5 = { class: "row justify-end" };
const _hoisted_6 = { class: "text-subtitle1 text-grey-7 q-ma-none" };
const _hoisted_7 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_8 = { class: "row q-col-gutter-md" };
const _hoisted_9 = { class: "col-12" };
const _hoisted_10 = { class: "row items-center q-mb-md" };
const _hoisted_11 = { class: "text-h6 text-primary" };
const _hoisted_12 = {
  key: 0,
  class: "text-center text-grey-6 q-py-lg"
};
const _hoisted_13 = { class: "text-body1" };
const _hoisted_14 = { class: "text-caption" };
const _hoisted_15 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_16 = { class: "row q-gutter-md justify-end" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ColaboradorEquipeCard = resolveComponent("ColaboradorEquipeCard");
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
              name: "groups",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.isEdit ? _ctx.$t("pages.equipeForm.titleEdit") : _ctx.$t("pages.equipeForm.titleNew")), 1)
          ]),
          _cache[4] || (_cache[4] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.isEdit ? _ctx.$t("pages.equipeForm.editSubtitle") : _ctx.$t("pages.equipeForm.createSubtitle")), 1)
          ])
        ])
      ]),
      createVNode(QForm, {
        onSubmit: _ctx.onSubmit,
        class: "q-gutter-md"
      }, {
        default: withCtx(() => [
          createVNode(QCard, {
            flat: "",
            bordered: ""
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_7, [
                    createVNode(QIcon, {
                      name: "info",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("pages.equipeForm.sections.basicInfo")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_8, [
                    createBaseVNode("div", _hoisted_9, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.descricao,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.form.descricao = $event),
                        label: _ctx.$t("pages.equipeForm.fields.descricao"),
                        "lazy-rules": "",
                        rules: [(val) => !!val || _ctx.$t("validations.required")],
                        filled: ""
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
            bordered: ""
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_10, [
                    createBaseVNode("div", _hoisted_11, [
                      createVNode(QIcon, {
                        name: "group",
                        class: "q-mr-sm"
                      }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("pages.equipeForm.sections.membros")), 1)
                    ]),
                    createVNode(QSpace),
                    createVNode(QBtn, {
                      color: "primary",
                      icon: "add",
                      label: _ctx.$t("pages.equipeForm.buttons.addMembro"),
                      onClick: _ctx.adicionarMembro,
                      size: "sm"
                    }, null, 8, ["label", "onClick"])
                  ]),
                  _ctx.form.colaboradoresEquipe.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_12, [
                    createVNode(QIcon, {
                      name: "group",
                      size: "48px",
                      class: "q-mb-md"
                    }),
                    createBaseVNode("div", _hoisted_13, toDisplayString(_ctx.$t("pages.equipeForm.messages.noMembers")), 1),
                    createBaseVNode("div", _hoisted_14, toDisplayString(_ctx.$t("pages.equipeForm.messages.addFirstMember")), 1)
                  ])) : createCommentVNode("", true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.form.colaboradoresEquipe, (colaboradorEquipe, index) => {
                    return openBlock(), createElementBlock("div", {
                      key: `colaborador-${index}`,
                      class: "q-mb-md"
                    }, [
                      createVNode(_component_ColaboradorEquipeCard, {
                        modelValue: _ctx.form.colaboradoresEquipe[index],
                        "onUpdate:modelValue": ($event) => _ctx.form.colaboradoresEquipe[index] = $event,
                        index,
                        colaboradores: _ctx.colaboradores,
                        "colaboradores-ja-selecionados": _ctx.colaboradoresJaSelecionados,
                        onRemove: ($event) => _ctx.removerMembro(index)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "index", "colaboradores", "colaboradores-ja-selecionados", "onRemove"])
                    ]);
                  }), 128))
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(QCard, {
            flat: "",
            bordered: ""
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_15, [
                    createVNode(QIcon, {
                      name: "notes",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("pages.equipeForm.sections.observacoes")), 1)
                  ]),
                  createVNode(QEditor, {
                    modelValue: _ctx.form.observacoes,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.form.observacoes = $event),
                    toolbar: [
                      ["left", "center", "right", "justify"],
                      ["bold", "italic", "underline", "strike"],
                      ["undo", "redo"],
                      [
                        {
                          label: "Formato",
                          icon: "format_size",
                          list: "no-icons",
                          options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "code"]
                        }
                      ],
                      ["quote", "unordered", "ordered", "outdent", "indent"],
                      ["link", "removeFormat"],
                      ["fullscreen"]
                    ],
                    fonts: {
                      montserrat: "Montserrat",
                      open_sans: "Open Sans",
                      roboto: "Roboto",
                      source_code_pro: "Source Code Pro",
                      playfair_display: "Playfair Display"
                    },
                    "min-height": "200px",
                    placeholder: _ctx.$t("pages.equipeForm.placeholders.observacoes")
                  }, null, 8, ["modelValue", "placeholder"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createBaseVNode("div", _hoisted_16, [
            createVNode(QBtn, {
              flat: "",
              label: _ctx.$t("pages.equipeForm.buttons.cancel"),
              onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$router.push("/equipes"))
            }, null, 8, ["label"]),
            createVNode(QBtn, {
              color: "primary",
              label: _ctx.isEdit ? _ctx.$t("buttons.update") : _ctx.$t("pages.equipeForm.buttons.save"),
              type: "submit"
            }, null, 8, ["label"])
          ])
        ]),
        _: 1
      }, 8, ["onSubmit"])
    ]),
    _: 1
  });
}
const EquipeCadastroPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  EquipeCadastroPage as default
};
//# sourceMappingURL=EquipeCadastroPage-CYM60c-5.js.map
