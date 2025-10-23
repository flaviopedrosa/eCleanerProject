import { r as ref, c as createBlock, o as openBlock, w as withCtx, b as useRouter, f as createBaseVNode, e as createVNode, i as QBtn, Q as QIcon, t as toDisplayString, j as createTextVNode, a9 as unref, aa as createSlots, V as QAvatar } from "./index-DcwkHxen.js";
import { Q as QInput } from "./QInput-DXQxwL8P.js";
import { Q as QSelect } from "./QSelect-DUStfZDN.js";
import { Q as QFile } from "./QFile-D7NsKK9W.js";
import { Q as QPage, a as QCard, b as QCardSection } from "./QPage-BYlIwfOX.js";
import { Q as QForm } from "./QForm-EnGPGASW.js";
import { u as useQuasar } from "./use-quasar--iu-ZanD.js";
import { T as TipoEmpresa, S as ScheduleRepository, D as DadosBancarios, a as Schedule } from "./scheduleRepository-CGXfwnNh.js";
import { P as Pessoa, E as Endereco } from "./pessoa-CnZ4y1f1.js";
import { u as useI18n } from "./vue-i18n.runtime-CPX_irvo.js";
import "./focus-manager-DpCIkUL-.js";
import "./use-dark-XRAlznJ5.js";
import "./QChip-DJNlQhAb.js";
import "./QItemLabel-DaKJP7vT.js";
import "./use-model-toggle-CaGhxNcT.js";
import "./format-BMI8Gb4Z.js";
import "./use-timeout-CtV8kKCk.js";
import "./scroll-DsZj_zve.js";
import "./imovel-DGbBNfIP.js";
import "./guid-BHuXRmln.js";
import "./colaborador-BV0dUqnP.js";
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
const _hoisted_12 = { class: "col-12 col-md-3" };
const _hoisted_13 = { class: "col-12 col-md-3" };
const _hoisted_14 = { class: "col-12 col-md-6" };
const _hoisted_15 = ["src"];
const _hoisted_16 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_17 = { class: "row q-col-gutter-md" };
const _hoisted_18 = { class: "col-12 col-md-6" };
const _hoisted_19 = { class: "col-12 col-md-6" };
const _hoisted_20 = { class: "col-12 col-md-6" };
const _hoisted_21 = { class: "col-12 col-md-3" };
const _hoisted_22 = { class: "col-12 col-md-3" };
const _hoisted_23 = { class: "col-12" };
const _hoisted_24 = { class: "text-subtitle1 text-primary q-mb-sm q-mt-lg" };
const _hoisted_25 = { class: "col-12 col-md-3" };
const _hoisted_26 = { class: "col-12 col-md-7" };
const _hoisted_27 = { class: "col-12 col-md-2" };
const _hoisted_28 = { class: "col-12 col-md-4" };
const _hoisted_29 = { class: "col-12 col-md-4" };
const _hoisted_30 = { class: "col-12 col-md-3" };
const _hoisted_31 = { class: "col-12 col-md-1" };
const _hoisted_32 = { class: "col-12" };
const _hoisted_33 = { class: "text-subtitle1 text-primary q-mb-sm q-mt-lg" };
const _hoisted_34 = { class: "col-12 col-md-6" };
const _hoisted_35 = { class: "col-12 col-md-3" };
const _hoisted_36 = { class: "col-12 col-md-3" };
const _hoisted_37 = { class: "col-12 col-md-6" };
const _hoisted_38 = { class: "col-12 col-md-6" };
const _hoisted_39 = { class: "col-12" };
const _hoisted_40 = { class: "row justify-end q-mt-md" };
const _sfc_main = {
  __name: "ScheduleCadastroPage",
  setup(__props) {
    const router = useRouter();
    const $q = useQuasar();
    const { t } = useI18n();
    const form = ref({
      nomeEmpresa: "",
      documentoEmpresa: "",
      telefoneComercial: "",
      emailComercial: "",
      tipoEmpresa: null,
      logomarca: null,
      responsavel: {
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        celular: ""
      },
      enderecoComercial: {
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: ""
      },
      dadosBancarios: {
        banco: "",
        agencia: "",
        conta: "",
        tipoConta: "",
        pix: ""
      }
    });
    const previewUrl = ref(null);
    async function handleSubmit() {
      try {
        const scheduleRepository = new ScheduleRepository();
        const pessoa = new Pessoa(
          form.value.responsavel.nome,
          form.value.responsavel.sobrenome,
          form.value.responsavel.email,
          form.value.responsavel.telefone,
          form.value.responsavel.celular
        );
        const endereco = new Endereco(
          form.value.enderecoComercial.cep,
          form.value.enderecoComercial.logradouro,
          form.value.enderecoComercial.numero,
          form.value.enderecoComercial.complemento,
          form.value.enderecoComercial.bairro,
          form.value.enderecoComercial.cidade,
          form.value.enderecoComercial.estado
        );
        const dadosBancarios = new DadosBancarios(
          form.value.dadosBancarios.banco,
          form.value.dadosBancarios.agencia,
          form.value.dadosBancarios.conta,
          form.value.dadosBancarios.tipoConta,
          form.value.dadosBancarios.pix
        );
        const schedule = new Schedule(
          pessoa,
          form.value.nomeEmpresa,
          form.value.documentoEmpresa,
          form.value.telefoneComercial,
          form.value.emailComercial,
          endereco,
          form.value.tipoEmpresa,
          dadosBancarios,
          form.value.logomarca
        );
        await scheduleRepository.save(schedule);
        $q.notify({
          type: "positive",
          message: t("messages.saveSuccess"),
          timeout: 3e3,
          position: "top-right"
        });
        setTimeout(() => {
          router.push("/schedules");
        }, 1500);
      } catch (error) {
        console.error(error);
        $q.notify({
          type: "negative",
          message: t("messages.saveError"),
          timeout: 5e3,
          position: "top-right"
        });
      }
    }
    function handleReset() {
      form.value = {
        nomeEmpresa: "",
        documentoEmpresa: "",
        telefoneComercial: "",
        emailComercial: "",
        tipoEmpresa: null,
        logomarca: null,
        responsavel: {
          nome: "",
          sobrenome: "",
          email: "",
          telefone: "",
          celular: ""
        },
        enderecoComercial: {
          cep: "",
          logradouro: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          estado: ""
        },
        dadosBancarios: {
          banco: "",
          agencia: "",
          conta: "",
          tipoConta: "",
          pix: ""
        }
      };
      previewUrl.value = null;
    }
    function handleImageUpload(file) {
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewUrl.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
    return (_ctx, _cache) => {
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
                  name: "business",
                  size: "2rem",
                  class: "text-secondary q-mr-md"
                }),
                createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.$t("forms.schedule.title")), 1)
              ]),
              _cache[24] || (_cache[24] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("forms.schedule.subtitle")), 1)
              ])
            ])
          ]),
          createVNode(QForm, {
            onSubmit: handleSubmit,
            onReset: handleReset,
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
                          name: "business",
                          class: "q-mr-sm"
                        }),
                        createTextVNode(" " + toDisplayString(_ctx.$t("forms.schedule.sections.empresa")), 1)
                      ]),
                      createBaseVNode("div", _hoisted_8, [
                        createBaseVNode("div", _hoisted_9, [
                          createVNode(QInput, {
                            modelValue: form.value.nomeEmpresa,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.value.nomeEmpresa = $event),
                            label: _ctx.$t("forms.schedule.fields.nomeEmpresa") + " *",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            filled: "",
                            "lazy-rules": ""
                          }, null, 8, ["modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_10, [
                          createVNode(QInput, {
                            modelValue: form.value.documentoEmpresa,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.value.documentoEmpresa = $event),
                            label: _ctx.$t("forms.schedule.fields.documentoEmpresa") + " *",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            filled: "",
                            "lazy-rules": "",
                            mask: "#############"
                          }, null, 8, ["modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_11, [
                          createVNode(QInput, {
                            modelValue: form.value.emailComercial,
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => form.value.emailComercial = $event),
                            label: _ctx.$t("forms.schedule.fields.emailComercial") + " *",
                            rules: [
                              (val) => !!val || _ctx.$t("forms.validation.required"),
                              (val) => /^[^@]+@[^@]+\.[^@]+$/.test(val) || _ctx.$t("forms.validation.email")
                            ],
                            filled: "",
                            "lazy-rules": ""
                          }, null, 8, ["modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_12, [
                          createVNode(QInput, {
                            modelValue: form.value.telefoneComercial,
                            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => form.value.telefoneComercial = $event),
                            label: _ctx.$t("forms.schedule.fields.telefoneComercial") + " *",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            filled: "",
                            "lazy-rules": "",
                            mask: "(##) ####-####"
                          }, null, 8, ["modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_13, [
                          createVNode(QSelect, {
                            modelValue: form.value.tipoEmpresa,
                            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => form.value.tipoEmpresa = $event),
                            options: Object.values(unref(TipoEmpresa)),
                            label: _ctx.$t("forms.schedule.fields.tipoEmpresa") + " *",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            filled: "",
                            "lazy-rules": "",
                            "emit-value": "",
                            "map-options": ""
                          }, null, 8, ["modelValue", "options", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_14, [
                          createVNode(QFile, {
                            modelValue: form.value.logomarca,
                            "onUpdate:modelValue": [
                              _cache[6] || (_cache[6] = ($event) => form.value.logomarca = $event),
                              handleImageUpload
                            ],
                            label: _ctx.$t("forms.schedule.fields.logomarca"),
                            accept: ".jpg,.png,.jpeg",
                            filled: "",
                            "lazy-rules": "",
                            rules: [
                              (val) => !val || val.size <= 5242880 || _ctx.$t("forms.validation.maxFileSize", { size: "5MB" }),
                              (val) => !val || ["image/jpeg", "image/png"].includes(val.type) || _ctx.$t("forms.validation.invalidFileType")
                            ]
                          }, createSlots({
                            prepend: withCtx(() => [
                              createVNode(QIcon, { name: "attach_file" })
                            ]),
                            _: 2
                          }, [
                            previewUrl.value ? {
                              name: "after",
                              fn: withCtx(() => [
                                createVNode(QAvatar, null, {
                                  default: withCtx(() => [
                                    createBaseVNode("img", { src: previewUrl.value }, null, 8, _hoisted_15)
                                  ]),
                                  _: 1
                                })
                              ]),
                              key: "0"
                            } : void 0
                          ]), 1032, ["modelValue", "label", "rules"])
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
                          name: "person",
                          class: "q-mr-sm"
                        }),
                        createTextVNode(" " + toDisplayString(_ctx.$t("forms.schedule.sections.responsavel")), 1)
                      ]),
                      createBaseVNode("div", _hoisted_17, [
                        createBaseVNode("div", _hoisted_18, [
                          createVNode(QInput, {
                            modelValue: form.value.responsavel.nome,
                            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => form.value.responsavel.nome = $event),
                            label: _ctx.$t("forms.schedule.fields.responsavel.nome") + " *",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            filled: "",
                            "lazy-rules": ""
                          }, null, 8, ["modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_19, [
                          createVNode(QInput, {
                            modelValue: form.value.responsavel.sobrenome,
                            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => form.value.responsavel.sobrenome = $event),
                            label: _ctx.$t("forms.schedule.fields.responsavel.sobrenome") + " *",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            filled: "",
                            "lazy-rules": ""
                          }, null, 8, ["modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_20, [
                          createVNode(QInput, {
                            modelValue: form.value.responsavel.email,
                            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => form.value.responsavel.email = $event),
                            label: _ctx.$t("forms.schedule.fields.responsavel.email") + " *",
                            rules: [
                              (val) => !!val || _ctx.$t("forms.validation.required"),
                              (val) => /^[^@]+@[^@]+\.[^@]+$/.test(val) || _ctx.$t("forms.validation.email")
                            ],
                            filled: "",
                            "lazy-rules": ""
                          }, null, 8, ["modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_21, [
                          createVNode(QInput, {
                            modelValue: form.value.responsavel.telefone,
                            "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => form.value.responsavel.telefone = $event),
                            label: _ctx.$t("forms.schedule.fields.responsavel.telefone"),
                            filled: "",
                            "lazy-rules": "",
                            mask: "(##) ####-####"
                          }, null, 8, ["modelValue", "label"])
                        ]),
                        createBaseVNode("div", _hoisted_22, [
                          createVNode(QInput, {
                            modelValue: form.value.responsavel.celular,
                            "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => form.value.responsavel.celular = $event),
                            label: _ctx.$t("forms.schedule.fields.responsavel.celular") + " *",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            filled: "",
                            "lazy-rules": "",
                            mask: "(##) #####-####"
                          }, null, 8, ["modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_23, [
                          createBaseVNode("div", _hoisted_24, toDisplayString(_ctx.$t("forms.schedule.sections.enderecoComercial")), 1)
                        ]),
                        createBaseVNode("div", _hoisted_25, [
                          createVNode(QInput, {
                            modelValue: form.value.enderecoComercial.cep,
                            "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => form.value.enderecoComercial.cep = $event),
                            label: _ctx.$t("forms.schedule.fields.endereco.cep") + " *",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            filled: "",
                            "lazy-rules": "",
                            mask: "#####-###"
                          }, null, 8, ["modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_26, [
                          createVNode(QInput, {
                            modelValue: form.value.enderecoComercial.logradouro,
                            "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => form.value.enderecoComercial.logradouro = $event),
                            label: _ctx.$t("forms.schedule.fields.endereco.logradouro") + " *",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            filled: "",
                            "lazy-rules": ""
                          }, null, 8, ["modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_27, [
                          createVNode(QInput, {
                            modelValue: form.value.enderecoComercial.numero,
                            "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => form.value.enderecoComercial.numero = $event),
                            label: _ctx.$t("forms.schedule.fields.endereco.numero") + " *",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            filled: "",
                            "lazy-rules": ""
                          }, null, 8, ["modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_28, [
                          createVNode(QInput, {
                            modelValue: form.value.enderecoComercial.complemento,
                            "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => form.value.enderecoComercial.complemento = $event),
                            label: _ctx.$t("forms.schedule.fields.endereco.complemento"),
                            filled: "",
                            "lazy-rules": ""
                          }, null, 8, ["modelValue", "label"])
                        ]),
                        createBaseVNode("div", _hoisted_29, [
                          createVNode(QInput, {
                            modelValue: form.value.enderecoComercial.bairro,
                            "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => form.value.enderecoComercial.bairro = $event),
                            label: _ctx.$t("forms.schedule.fields.endereco.bairro") + " *",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            filled: "",
                            "lazy-rules": ""
                          }, null, 8, ["modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_30, [
                          createVNode(QInput, {
                            modelValue: form.value.enderecoComercial.cidade,
                            "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => form.value.enderecoComercial.cidade = $event),
                            label: _ctx.$t("forms.schedule.fields.endereco.cidade") + " *",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            filled: "",
                            "lazy-rules": ""
                          }, null, 8, ["modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_31, [
                          createVNode(QInput, {
                            modelValue: form.value.enderecoComercial.estado,
                            "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => form.value.enderecoComercial.estado = $event),
                            label: _ctx.$t("forms.schedule.fields.endereco.estado") + " *",
                            hint: _ctx.$t("forms.schedule.hints.endereco.estado"),
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            filled: "",
                            "lazy-rules": "",
                            mask: "AA"
                          }, null, 8, ["modelValue", "label", "hint", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_32, [
                          createBaseVNode("div", _hoisted_33, toDisplayString(_ctx.$t("forms.schedule.sections.dadosBancarios")), 1)
                        ]),
                        createBaseVNode("div", _hoisted_34, [
                          createVNode(QInput, {
                            modelValue: form.value.dadosBancarios.banco,
                            "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => form.value.dadosBancarios.banco = $event),
                            label: _ctx.$t("forms.schedule.fields.dadosBancarios.banco") + " *",
                            hint: _ctx.$t("forms.schedule.hints.dadosBancarios.banco"),
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            filled: "",
                            "lazy-rules": ""
                          }, null, 8, ["modelValue", "label", "hint", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_35, [
                          createVNode(QInput, {
                            modelValue: form.value.dadosBancarios.agencia,
                            "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => form.value.dadosBancarios.agencia = $event),
                            label: _ctx.$t("forms.schedule.fields.dadosBancarios.agencia") + " *",
                            hint: _ctx.$t("forms.schedule.hints.dadosBancarios.agencia"),
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            filled: "",
                            "lazy-rules": ""
                          }, null, 8, ["modelValue", "label", "hint", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_36, [
                          createVNode(QInput, {
                            modelValue: form.value.dadosBancarios.tipoConta,
                            "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => form.value.dadosBancarios.tipoConta = $event),
                            label: _ctx.$t("forms.schedule.fields.dadosBancarios.tipoConta") + " *",
                            hint: _ctx.$t("forms.schedule.hints.dadosBancarios.tipoConta"),
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            filled: "",
                            "lazy-rules": ""
                          }, null, 8, ["modelValue", "label", "hint", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_37, [
                          createVNode(QInput, {
                            modelValue: form.value.dadosBancarios.conta,
                            "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => form.value.dadosBancarios.conta = $event),
                            label: _ctx.$t("forms.schedule.fields.dadosBancarios.conta") + " *",
                            hint: _ctx.$t("forms.schedule.hints.dadosBancarios.conta"),
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            filled: "",
                            "lazy-rules": ""
                          }, null, 8, ["modelValue", "label", "hint", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_38, [
                          createVNode(QInput, {
                            modelValue: form.value.dadosBancarios.pix,
                            "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => form.value.dadosBancarios.pix = $event),
                            label: _ctx.$t("forms.schedule.fields.dadosBancarios.pix"),
                            hint: _ctx.$t("forms.schedule.hints.dadosBancarios.pix"),
                            filled: "",
                            "lazy-rules": ""
                          }, null, 8, ["modelValue", "label", "hint"])
                        ]),
                        createBaseVNode("div", _hoisted_39, [
                          createBaseVNode("div", _hoisted_40, [
                            createVNode(QBtn, {
                              label: _ctx.$t("forms.buttons.cancel"),
                              type: "reset",
                              color: "negative",
                              flat: "",
                              class: "q-ml-sm"
                            }, null, 8, ["label"]),
                            createVNode(QBtn, {
                              label: _ctx.$t("forms.buttons.save"),
                              type: "submit",
                              color: "primary",
                              class: "q-ml-sm"
                            }, null, 8, ["label"])
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
          })
        ]),
        _: 1
      });
    };
  }
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ScheduleCadastroPage-C7uwGo5T.js.map
