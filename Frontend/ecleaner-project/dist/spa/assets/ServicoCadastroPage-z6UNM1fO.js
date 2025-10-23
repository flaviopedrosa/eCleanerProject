import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, l as computed, M as onMounted, T as useRoute, b as useRouter, f as createBaseVNode, e as createVNode, i as QBtn, Q as QIcon, t as toDisplayString, a4 as withModifiers, j as createTextVNode } from "./index-DcwkHxen.js";
import { Q as QInput } from "./QInput-DXQxwL8P.js";
import { Q as QSelect } from "./QSelect-DUStfZDN.js";
import { Q as QToggle } from "./QToggle-CQSjXwVo.js";
import { Q as QPage, a as QCard, b as QCardSection } from "./QPage-BYlIwfOX.js";
import { Q as QForm } from "./QForm-EnGPGASW.js";
import { u as useServicoStore } from "./servico-store-D0uFN8Hc.js";
import { f as formatCurrency, c as currencyMask, p as parseCurrency, g as getCurrencyConfig } from "./currencyUtils-CDJCkeA4.js";
import { u as useI18n } from "./vue-i18n.runtime-CPX_irvo.js";
import "./focus-manager-DpCIkUL-.js";
import "./use-dark-XRAlznJ5.js";
import "./QChip-DJNlQhAb.js";
import "./QItemLabel-DaKJP7vT.js";
import "./use-model-toggle-CaGhxNcT.js";
import "./format-BMI8Gb4Z.js";
import "./use-timeout-CtV8kKCk.js";
import "./scroll-DsZj_zve.js";
import "./use-checkbox-CitpLRtO.js";
import "./servico-Bx3u9W9d.js";
import "./guid-BHuXRmln.js";
const _sfc_main = defineComponent({
  name: "ServicoCadastroPage",
  setup() {
    const store = useServicoStore();
    const router = useRouter();
    const route = useRoute();
    const { locale } = useI18n();
    const servico = ref({
      Id: null,
      Nome: "",
      Valor: 0,
      Descricao: "",
      Unidade: "Unidade",
      Observacao: "",
      Ativo: true
    });
    const valorFormatado = ref("");
    const isEditMode = computed(() => !!route.params.id);
    const currencyConfig = computed(() => getCurrencyConfig(locale.value));
    const unidadeOptions = [
      { label: "Unidade", value: "Unidade" },
      { label: "Hora", value: "Hora" },
      { label: "Metro Quadrado (m²)", value: "Metro Quadrado" },
      { label: "Metro Linear (m)", value: "Metro Linear" },
      { label: "Dia", value: "Dia" },
      { label: "Projeto", value: "Projeto" },
      { label: "Pacote", value: "Pacote" },
      { label: "Cômodo", value: "Cômodo" },
      { label: "Casa", value: "Casa" },
      { label: "Apartamento", value: "Apartamento" }
    ];
    const rules = {
      required: (val) => !!val || "Campo obrigatório"
    };
    function onValorInput(value) {
      const masked = currencyMask(value, locale.value, currencyConfig.value.currency);
      valorFormatado.value = masked;
      servico.value.Valor = parseCurrency(masked);
    }
    onMounted(() => {
      if (route.params.id) {
        const s = store.servicos.find((s2) => s2.Id === route.params.id);
        if (s) {
          servico.value = { ...s };
          valorFormatado.value = formatCurrency(s.Valor, locale.value, currencyConfig.value.currency);
        }
      }
    });
    async function salvarServico() {
      if (servico.value.Id) {
        await store.updateServico(servico.value);
      } else {
        await store.addServico(servico.value);
      }
      router.push("/servicos");
    }
    function cancelar() {
      router.push("/servicos");
    }
    return {
      store,
      servico,
      valorFormatado,
      isEditMode,
      currencyConfig,
      unidadeOptions,
      rules,
      salvarServico,
      cancelar,
      onValorInput
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
const _hoisted_9 = { class: "col-12 col-md-6" };
const _hoisted_10 = { class: "col-12 col-md-6" };
const _hoisted_11 = { class: "col-12 col-md-6" };
const _hoisted_12 = { class: "col-12 col-md-6 flex items-center" };
const _hoisted_13 = { class: "col-12" };
const _hoisted_14 = { class: "col-12" };
const _hoisted_15 = { class: "row q-gutter-md justify-end" };
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
              name: _ctx.isEditMode ? "edit" : "build",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }, null, 8, ["name"]),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.isEditMode ? _ctx.$t("pages.servico.editTitle") : _ctx.$t("pages.servico.cadastroTitle")), 1)
          ]),
          _cache[7] || (_cache[7] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("pages.servico.cadastroSubtitle")), 1)
          ])
        ])
      ]),
      createVNode(QForm, {
        onSubmit: withModifiers(_ctx.salvarServico, ["prevent"]),
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
                      name: "build",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("forms.servico.sections.serviceData")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_8, [
                    createBaseVNode("div", _hoisted_9, [
                      createVNode(QInput, {
                        modelValue: _ctx.servico.Nome,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.servico.Nome = $event),
                        label: _ctx.$t("pages.servico.fields.nome") + " *",
                        filled: "",
                        "lazy-rules": "",
                        rules: [_ctx.rules.required]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_10, [
                      createVNode(QInput, {
                        modelValue: _ctx.valorFormatado,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.valorFormatado = $event),
                        label: _ctx.$t("pages.servico.fields.valor") + " *",
                        filled: "",
                        "lazy-rules": "",
                        rules: [_ctx.rules.required],
                        onInput: _ctx.onValorInput,
                        placeholder: _ctx.currencyConfig.placeholder
                      }, {
                        prepend: withCtx(() => [
                          createVNode(QIcon, { name: "attach_money" })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "label", "rules", "onInput", "placeholder"])
                    ]),
                    createBaseVNode("div", _hoisted_11, [
                      createVNode(QSelect, {
                        modelValue: _ctx.servico.Unidade,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.servico.Unidade = $event),
                        options: _ctx.unidadeOptions,
                        label: _ctx.$t("pages.servico.fields.unidade") + " *",
                        filled: "",
                        "lazy-rules": "",
                        rules: [_ctx.rules.required],
                        "emit-value": "",
                        "map-options": ""
                      }, {
                        prepend: withCtx(() => [
                          createVNode(QIcon, { name: "straighten" })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "options", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_12, [
                      createVNode(QToggle, {
                        modelValue: _ctx.servico.Ativo,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.servico.Ativo = $event),
                        label: _ctx.$t("pages.servico.fields.ativo"),
                        color: "primary",
                        class: "q-mt-md"
                      }, null, 8, ["modelValue", "label"])
                    ]),
                    createBaseVNode("div", _hoisted_13, [
                      createVNode(QInput, {
                        modelValue: _ctx.servico.Descricao,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.servico.Descricao = $event),
                        type: "textarea",
                        label: _ctx.$t("pages.servico.fields.descricao") + " *",
                        filled: "",
                        "lazy-rules": "",
                        rules: [_ctx.rules.required],
                        rows: "3"
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_14, [
                      createVNode(QInput, {
                        modelValue: _ctx.servico.Observacao,
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.servico.Observacao = $event),
                        type: "textarea",
                        label: _ctx.$t("pages.servico.fields.observacao"),
                        filled: "",
                        rows: "2"
                      }, null, 8, ["modelValue", "label"])
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createBaseVNode("div", _hoisted_15, [
            createVNode(QBtn, {
              flat: "",
              label: _ctx.$t("forms.buttons.cancel"),
              onClick: _ctx.cancelar
            }, null, 8, ["label", "onClick"]),
            createVNode(QBtn, {
              color: "primary",
              label: _ctx.isEditMode ? _ctx.$t("buttons.update") : _ctx.$t("forms.buttons.save"),
              type: "submit",
              loading: _ctx.store.loading
            }, null, 8, ["label", "loading"])
          ])
        ]),
        _: 1
      }, 8, ["onSubmit"])
    ]),
    _: 1
  });
}
const ServicoCadastroPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ServicoCadastroPage as default
};
//# sourceMappingURL=ServicoCadastroPage-z6UNM1fO.js.map
