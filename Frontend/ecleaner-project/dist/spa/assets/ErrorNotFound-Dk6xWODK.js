import { _ as _export_sfc, a as defineComponent, h as createElementBlock, o as openBlock, f as createBaseVNode, e as createVNode, l as QBtn } from "./index-C_9ZqZx5.js";
const _sfc_main = defineComponent({
  name: "ErrorNotFound"
});
const _hoisted_1 = { class: "fullscreen bg-blue text-white text-center q-pa-md flex flex-center" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createBaseVNode("div", null, [
      _cache[0] || (_cache[0] = createBaseVNode("div", { style: { "font-size": "30vh" } }, "404", -1)),
      _cache[1] || (_cache[1] = createBaseVNode("div", {
        class: "text-h2",
        style: { "opacity": "0.4" }
      }, "Oops. Nothing here...", -1)),
      createVNode(QBtn, {
        class: "q-mt-xl",
        color: "white",
        "text-color": "blue",
        unelevated: "",
        to: "/",
        label: "Go Home",
        "no-caps": ""
      })
    ])
  ]);
}
const ErrorNotFound = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ErrorNotFound as default
};
//# sourceMappingURL=ErrorNotFound-Dk6xWODK.js.map
