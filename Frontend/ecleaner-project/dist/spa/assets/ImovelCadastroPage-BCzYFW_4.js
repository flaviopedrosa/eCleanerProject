import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, $ as onMounted, b as useRouter, f as createBaseVNode, e as createVNode, l as QBtn, k as QIcon, t as toDisplayString, Q as QCard, g as QCardSection, m as createTextVNode, j as QInput } from "./index-C_9ZqZx5.js";
import { Q as QSelect } from "./QSelect-B7UkQpY4.js";
import { Q as QForm } from "./QForm-BkJeMJ2y.js";
import { Q as QPage } from "./QPage-BjohE0wt.js";
import { u as useQuasar } from "./use-quasar-RhPDzzvJ.js";
import { C as Cliente, I as Imovel } from "./imovel-DC67hqHE.js";
import { E as Endereco } from "./pessoa-C98XhDqr.js";
import { u as useI18n } from "./vue-i18n.runtime-BcAS3Jju.js";
import "./QChip-CQHm52sc.js";
import "./format-X8mfcfls.js";
import "./QMenu-0ExrfRXY.js";
import "./position-engine-D6xtJVbJ.js";
import "./selection-q6_tzKdx.js";
import "./guid-BHuXRmln.js";
const _sfc_main = defineComponent({
  name: "ImovelCadastroPage",
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const { t } = useI18n();
    const loading = ref(false);
    const clientes = ref([]);
    const clientesOptions = ref([]);
    const form = ref({
      totalComodos: null,
      numeroQuartos: null,
      numeroBanheiros: null,
      areaTotal: null,
      dono: null,
      observacao: "",
      endereco: {
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
        pais: "Brasil"
      }
    });
    const carregarClientes = () => {
      const clientesMock = [
        new Cliente("João", "Silva", "joao@email.com", "(11) 99999-9999", "(11) 99999-9999"),
        new Cliente("Maria", "Santos", "maria@email.com", "(11) 88888-8888", "(11) 88888-8888"),
        new Cliente("Pedro", "Oliveira", "pedro@email.com", "(11) 77777-7777", "(11) 77777-7777")
      ];
      clientes.value = clientesMock;
      clientesOptions.value = clientesMock.map((cliente) => ({
        label: `${cliente.Nome} ${cliente.Sobrenome}`,
        value: cliente
      }));
    };
    const onSubmit = async () => {
      try {
        loading.value = true;
        const totalCalculado = form.value.numeroQuartos + form.value.numeroBanheiros;
        if (form.value.totalComodos < totalCalculado) {
          $q.notify({
            type: "negative",
            message: t("forms.imovel.validation.totalComodosInvalid"),
            position: "top"
          });
          return;
        }
        const endereco = new Endereco(
          form.value.endereco.logradouro,
          form.value.endereco.numero,
          form.value.endereco.complemento,
          form.value.endereco.bairro,
          form.value.endereco.cidade,
          form.value.endereco.estado,
          form.value.endereco.cep,
          form.value.endereco.pais
        );
        const novoImovel = new Imovel(
          form.value.totalComodos,
          form.value.numeroQuartos,
          form.value.numeroBanheiros,
          form.value.areaTotal,
          endereco,
          form.value.dono,
          form.value.observacao
        );
        console.log("Novo imóvel criado:", novoImovel);
        $q.notify({
          type: "positive",
          message: t("messages.saveSuccess"),
          timeout: 3e3,
          position: "top-right"
        });
        setTimeout(() => {
          router.push("/imoveis");
        }, 1500);
      } catch (error) {
        console.error("Erro ao criar imóvel:", error);
        $q.notify({
          type: "negative",
          message: t("messages.saveError"),
          timeout: 5e3,
          position: "top-right"
        });
      } finally {
        loading.value = false;
      }
    };
    const onCancel = () => {
      router.back();
    };
    onMounted(() => {
      carregarClientes();
    });
    return {
      form,
      loading,
      clientesOptions,
      onSubmit,
      onCancel
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
const _hoisted_9 = { class: "col-12 col-md-3" };
const _hoisted_10 = { class: "col-12 col-md-3" };
const _hoisted_11 = { class: "col-12 col-md-3" };
const _hoisted_12 = { class: "col-12 col-md-3" };
const _hoisted_13 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_14 = { class: "row q-col-gutter-md" };
const _hoisted_15 = { class: "col-12 col-md-6" };
const _hoisted_16 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_17 = { class: "row q-col-gutter-md" };
const _hoisted_18 = { class: "col-12 col-md-8" };
const _hoisted_19 = { class: "col-12 col-md-4" };
const _hoisted_20 = { class: "col-12 col-md-4" };
const _hoisted_21 = { class: "col-12 col-md-4" };
const _hoisted_22 = { class: "col-12 col-md-4" };
const _hoisted_23 = { class: "col-12 col-md-3" };
const _hoisted_24 = { class: "col-12 col-md-3" };
const _hoisted_25 = { class: "col-12 col-md-6" };
const _hoisted_26 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_27 = { class: "row q-col-gutter-md" };
const _hoisted_28 = { class: "col-12" };
const _hoisted_29 = { class: "row q-gutter-md justify-end" };
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
              name: "home",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.$t("forms.imovel.title")), 1)
          ]),
          _cache[16] || (_cache[16] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("forms.imovel.subtitle")), 1)
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
                      name: "home",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("forms.imovel.sections.propertyData")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_8, [
                    createBaseVNode("div", _hoisted_9, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.totalComodos,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.form.totalComodos = $event),
                        modelModifiers: { number: true },
                        label: _ctx.$t("forms.imovel.fields.totalComodos") + " *",
                        filled: "",
                        type: "number",
                        min: "1",
                        "lazy-rules": "",
                        rules: [
                          (val) => !!val || _ctx.$t("forms.validation.required"),
                          (val) => val > 0 || _ctx.$t("forms.validation.positiveNumber")
                        ]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_10, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.numeroQuartos,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.form.numeroQuartos = $event),
                        modelModifiers: { number: true },
                        label: _ctx.$t("forms.imovel.fields.numeroQuartos") + " *",
                        filled: "",
                        type: "number",
                        min: "0",
                        "lazy-rules": "",
                        rules: [
                          (val) => val >= 0 || _ctx.$t("forms.validation.nonNegativeNumber")
                        ]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_11, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.numeroBanheiros,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.form.numeroBanheiros = $event),
                        modelModifiers: { number: true },
                        label: _ctx.$t("forms.imovel.fields.numeroBanheiros") + " *",
                        filled: "",
                        type: "number",
                        min: "0",
                        "lazy-rules": "",
                        rules: [
                          (val) => val >= 0 || _ctx.$t("forms.validation.nonNegativeNumber")
                        ]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_12, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.areaTotal,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.form.areaTotal = $event),
                        modelModifiers: { number: true },
                        label: _ctx.$t("forms.imovel.fields.areaTotal") + " *",
                        filled: "",
                        type: "number",
                        min: "1",
                        step: "0.01",
                        suffix: "m²",
                        "lazy-rules": "",
                        rules: [
                          (val) => !!val || _ctx.$t("forms.validation.required"),
                          (val) => val > 0 || _ctx.$t("forms.validation.positiveNumber")
                        ]
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
                  createBaseVNode("div", _hoisted_13, [
                    createVNode(QIcon, {
                      name: "person",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("forms.imovel.sections.owner")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_14, [
                    createBaseVNode("div", _hoisted_15, [
                      createVNode(QSelect, {
                        modelValue: _ctx.form.dono,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.form.dono = $event),
                        options: _ctx.clientesOptions,
                        label: _ctx.$t("forms.imovel.fields.dono") + " *",
                        filled: "",
                        "emit-value": "",
                        "map-options": "",
                        "option-value": "value",
                        "option-label": "label",
                        "lazy-rules": "",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                      }, null, 8, ["modelValue", "options", "label", "rules"])
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
                  createBaseVNode("div", _hoisted_16, [
                    createVNode(QIcon, {
                      name: "location_on",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("forms.imovel.sections.address")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_17, [
                    createBaseVNode("div", _hoisted_18, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.endereco.logradouro,
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.form.endereco.logradouro = $event),
                        label: _ctx.$t("forms.endereco.fields.logradouro") + " *",
                        filled: "",
                        "lazy-rules": "",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_19, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.endereco.numero,
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.form.endereco.numero = $event),
                        label: _ctx.$t("forms.endereco.fields.numero") + " *",
                        filled: "",
                        "lazy-rules": "",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_20, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.endereco.complemento,
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.form.endereco.complemento = $event),
                        label: _ctx.$t("forms.endereco.fields.complemento"),
                        filled: ""
                      }, null, 8, ["modelValue", "label"])
                    ]),
                    createBaseVNode("div", _hoisted_21, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.endereco.bairro,
                        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.form.endereco.bairro = $event),
                        label: _ctx.$t("forms.endereco.fields.bairro") + " *",
                        filled: "",
                        "lazy-rules": "",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_22, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.endereco.cidade,
                        "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.form.endereco.cidade = $event),
                        label: _ctx.$t("forms.endereco.fields.cidade") + " *",
                        filled: "",
                        "lazy-rules": "",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_23, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.endereco.estado,
                        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => _ctx.form.endereco.estado = $event),
                        label: _ctx.$t("forms.endereco.fields.estado") + " *",
                        filled: "",
                        "lazy-rules": "",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_24, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.endereco.cep,
                        "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => _ctx.form.endereco.cep = $event),
                        label: _ctx.$t("forms.endereco.fields.cep") + " *",
                        filled: "",
                        mask: "#####-###",
                        "lazy-rules": "",
                        rules: [
                          (val) => !!val || _ctx.$t("forms.validation.required"),
                          (val) => val.length === 9 || _ctx.$t("forms.validation.cep")
                        ]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_25, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.endereco.pais,
                        "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => _ctx.form.endereco.pais = $event),
                        label: _ctx.$t("forms.endereco.fields.pais") + " *",
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
            bordered: ""
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_26, [
                    createVNode(QIcon, {
                      name: "notes",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("forms.imovel.sections.observations")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_27, [
                    createBaseVNode("div", _hoisted_28, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.observacao,
                        "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => _ctx.form.observacao = $event),
                        label: _ctx.$t("forms.imovel.fields.observacao"),
                        placeholder: _ctx.$t("forms.imovel.placeholders.observacao"),
                        filled: "",
                        type: "textarea",
                        rows: "4",
                        counter: "",
                        maxlength: "500"
                      }, null, 8, ["modelValue", "label", "placeholder"])
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createBaseVNode("div", _hoisted_29, [
            createVNode(QBtn, {
              flat: "",
              label: _ctx.$t("forms.buttons.cancel"),
              onClick: _cache[15] || (_cache[15] = ($event) => _ctx.$router.go(-1))
            }, null, 8, ["label"]),
            createVNode(QBtn, {
              color: "primary",
              label: _ctx.$t("forms.buttons.save"),
              type: "submit",
              loading: _ctx.loading
            }, null, 8, ["label", "loading"])
          ])
        ]),
        _: 1
      }, 8, ["onSubmit"])
    ]),
    _: 1
  });
}
const ImovelCadastroPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0cf32191"]]);
export {
  ImovelCadastroPage as default
};
//# sourceMappingURL=ImovelCadastroPage-BCzYFW_4.js.map
