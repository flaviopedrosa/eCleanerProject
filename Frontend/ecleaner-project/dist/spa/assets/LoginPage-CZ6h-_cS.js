import { Q as QInput } from "./QInput-DXQxwL8P.js";
import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, u as useAuthStore, r as ref, b as useRouter, e as createVNode, f as createBaseVNode, t as toDisplayString, g as createElementBlock, h as createCommentVNode, Q as QIcon, i as QBtn, j as createTextVNode } from "./index-DcwkHxen.js";
import { Q as QForm } from "./QForm-EnGPGASW.js";
import { Q as QPage, a as QCard, b as QCardSection } from "./QPage-BYlIwfOX.js";
import { Q as QLayout, a as QPageContainer, _ as _imports_0 } from "./ecleaner-logo-BRLc_mdR.js";
import { u as useI18n } from "./vue-i18n.runtime-CPX_irvo.js";
import "./focus-manager-DpCIkUL-.js";
import "./use-dark-XRAlznJ5.js";
import "./scroll-DsZj_zve.js";
const _sfc_main = defineComponent({
  name: "LoginPage",
  setup() {
    const router = useRouter();
    const { t } = useI18n();
    const authStore = useAuthStore();
    const form = ref({
      usuario: "",
      senha: ""
    });
    const showPassword = ref(false);
    const loading = ref(false);
    const errorMessage = ref("");
    const CREDENTIALS = {
      usuario: "admin",
      senha: "@cnNer124,trdsar#fG"
    };
    const onSubmit = async () => {
      loading.value = true;
      errorMessage.value = "";
      try {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        if (form.value.usuario === CREDENTIALS.usuario && form.value.senha === CREDENTIALS.senha) {
          authStore.login({
            usuario: form.value.usuario,
            nome: "Administrador"
          });
          console.log("Login realizado com sucesso!");
          const redirect = router.currentRoute.value.query.redirect || "/";
          router.push(redirect);
        } else {
          errorMessage.value = t("forms.login.messages.invalidCredentials");
        }
      } catch (error) {
        console.error("Erro no login:", error);
        errorMessage.value = t("forms.login.messages.loginError");
      } finally {
        loading.value = false;
      }
    };
    return {
      form,
      showPassword,
      loading,
      errorMessage,
      onSubmit
    };
  }
});
const _hoisted_1 = { class: "login-container" };
const _hoisted_2 = { class: "text-center q-mb-lg" };
const _hoisted_3 = { class: "text-h4 text-primary text-weight-bold" };
const _hoisted_4 = { class: "text-subtitle1 text-grey-7" };
const _hoisted_5 = { class: "text-h6 text-center q-mb-md" };
const _hoisted_6 = {
  key: 0,
  class: "text-negative text-center q-mt-sm"
};
const _hoisted_7 = { class: "text-center q-mt-md" };
const _hoisted_8 = { class: "text-caption text-grey-6" };
const _hoisted_9 = { class: "text-caption text-grey-7" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QLayout, {
    view: "lHh Lpr lFf",
    class: "bg-grey-1"
  }, {
    default: withCtx(() => [
      createVNode(QPageContainer, null, {
        default: withCtx(() => [
          createVNode(QPage, { class: "flex flex-center" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createBaseVNode("div", _hoisted_2, [
                  _cache[3] || (_cache[3] = createBaseVNode("img", {
                    src: _imports_0,
                    alt: "eCleaner",
                    class: "login-logo q-mb-md"
                  }, null, -1)),
                  createBaseVNode("div", _hoisted_3, toDisplayString(_ctx.$t("forms.login.title")), 1),
                  createBaseVNode("div", _hoisted_4, toDisplayString(_ctx.$t("forms.login.subtitle")), 1)
                ]),
                createVNode(QCard, { class: "login-card" }, {
                  default: withCtx(() => [
                    createVNode(QCardSection, null, {
                      default: withCtx(() => [
                        createVNode(QForm, {
                          onSubmit: _ctx.onSubmit,
                          class: "q-gutter-md"
                        }, {
                          default: withCtx(() => [
                            createBaseVNode("div", _hoisted_5, toDisplayString(_ctx.$t("forms.login.formTitle")), 1),
                            createVNode(QInput, {
                              modelValue: _ctx.form.usuario,
                              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.form.usuario = $event),
                              label: _ctx.$t("forms.login.fields.usuario"),
                              type: "text",
                              filled: "",
                              rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                              "prepend-icon": "person"
                            }, null, 8, ["modelValue", "label", "rules"]),
                            createVNode(QInput, {
                              modelValue: _ctx.form.senha,
                              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.form.senha = $event),
                              label: _ctx.$t("forms.login.fields.senha"),
                              type: _ctx.showPassword ? "text" : "password",
                              filled: "",
                              rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                              "prepend-icon": "lock"
                            }, {
                              append: withCtx(() => [
                                createVNode(QIcon, {
                                  name: _ctx.showPassword ? "visibility" : "visibility_off",
                                  class: "cursor-pointer",
                                  onClick: _cache[1] || (_cache[1] = ($event) => _ctx.showPassword = !_ctx.showPassword)
                                }, null, 8, ["name"])
                              ]),
                              _: 1
                            }, 8, ["modelValue", "label", "type", "rules"]),
                            _ctx.errorMessage ? (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString(_ctx.errorMessage), 1)) : createCommentVNode("", true),
                            createVNode(QBtn, {
                              label: _ctx.$t("forms.login.buttons.login"),
                              type: "submit",
                              color: "primary",
                              size: "lg",
                              class: "full-width",
                              loading: _ctx.loading
                            }, null, 8, ["label", "loading"])
                          ]),
                          _: 1
                        }, 8, ["onSubmit"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createBaseVNode("div", _hoisted_7, [
                  createBaseVNode("div", _hoisted_8, toDisplayString(_ctx.$t("forms.login.testInfo")), 1),
                  createBaseVNode("div", _hoisted_9, [
                    createBaseVNode("strong", null, toDisplayString(_ctx.$t("forms.login.testCredentials.user")) + ":", 1),
                    _cache[4] || (_cache[4] = createTextVNode(" admin ", -1))
                  ])
                ])
              ])
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
const LoginPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7d20a2f1"]]);
export {
  LoginPage as default
};
//# sourceMappingURL=LoginPage-CZ6h-_cS.js.map
