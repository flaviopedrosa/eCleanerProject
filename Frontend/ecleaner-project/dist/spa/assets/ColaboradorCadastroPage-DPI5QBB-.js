import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, p as computed, a4 as useRoute, b as useRouter, f as createBaseVNode, e as createVNode, l as QBtn, k as QIcon, t as toDisplayString, Q as QCard, g as QCardSection, m as createTextVNode, j as QInput, h as createElementBlock, i as createCommentVNode, aj as Fragment, ak as renderList, a7 as QSeparator, au as QCardActions } from "./index-C_9ZqZx5.js";
import { Q as QFile } from "./QFile-DirlnN7h.js";
import { Q as QSelect } from "./QSelect-B7UkQpY4.js";
import { Q as QSpace } from "./QSpace-CN10jCLy.js";
import { Q as QForm } from "./QForm-BkJeMJ2y.js";
import { Q as QPage } from "./QPage-BjohE0wt.js";
import { u as useQuasar } from "./use-quasar-RhPDzzvJ.js";
import { C as Colaborador, E as ExperienciaProfissional, R as Referencia } from "./colaborador-OpPhEqDl.js";
import { E as Endereco } from "./pessoa-C98XhDqr.js";
import "./QChip-CQHm52sc.js";
import "./format-X8mfcfls.js";
import "./QMenu-0ExrfRXY.js";
import "./position-engine-D6xtJVbJ.js";
import "./selection-q6_tzKdx.js";
import "./guid-BHuXRmln.js";
const _sfc_main = defineComponent({
  name: "ColaboradorCadastroPage",
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const loading = ref(false);
    const form = ref({
      nome: "",
      sobrenome: "",
      email: "",
      telefone: "",
      celular: "",
      documentoIdentidade: "",
      dataNascimento: "",
      nacionalidade: "",
      fotoPerfil: null,
      curriculo: null,
      salarioEsperado: null,
      disponibilidade: "",
      regioesAtuacao: [],
      experiencias: [],
      referencias: [],
      endereco: {
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: ""
      },
      observacoes: ""
    });
    const isEdit = computed(() => !!route.params.id);
    const editTitle = computed(() => `Editar Colaborador: ${form.value.nome} ${form.value.sobrenome}`);
    const isValidEmail = (email) => {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
    };
    const addExperience = () => {
      form.value.experiencias.push({
        empresa: "",
        cargo: "",
        dataInicio: "",
        dataFim: "",
        atividades: ""
      });
    };
    const removeExperience = (index) => {
      form.value.experiencias.splice(index, 1);
    };
    const addReference = () => {
      form.value.referencias.push({
        nome: "",
        empresa: "",
        cargo: "",
        telefone: "",
        email: ""
      });
    };
    const removeReference = (index) => {
      form.value.referencias.splice(index, 1);
    };
    const buscarCep = async () => {
      if (!form.value.endereco.cep) return;
      const cep = form.value.endereco.cep.replace(/\D/g, "");
      if (cep.length !== 8) return;
      try {
        loading.value = true;
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          form.value.endereco.rua = data.logradouro;
          form.value.endereco.bairro = data.bairro;
          form.value.endereco.cidade = data.localidade;
          form.value.endereco.estado = data.uf;
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        $q.notify({
          type: "negative",
          message: `Erro ao buscar CEP: ${error.message}`
        });
      } finally {
        loading.value = false;
      }
    };
    const loadColaborador = async (id) => {
      try {
        loading.value = true;
        console.log("Carregando colaborador:", id);
      } catch (error) {
        console.error("Erro ao carregar colaborador:", error);
        $q.notify({
          type: "negative",
          message: `Erro ao carregar dados do colaborador: ${error.message}`
        });
      } finally {
        loading.value = false;
      }
    };
    const onSubmit = async () => {
      try {
        loading.value = true;
        const endereco = new Endereco(
          "Residencial",
          form.value.endereco.rua,
          form.value.endereco.numero,
          form.value.endereco.bairro,
          form.value.endereco.cidade,
          form.value.endereco.estado,
          form.value.endereco.cep,
          form.value.endereco.complemento
        );
        const colaborador = new Colaborador(
          form.value.nome,
          form.value.sobrenome,
          form.value.email,
          form.value.telefone,
          form.value.celular,
          form.value.documentoIdentidade,
          new Date(form.value.dataNascimento),
          form.value.nacionalidade,
          Number(form.value.salarioEsperado),
          form.value.disponibilidade,
          form.value.regioesAtuacao,
          form.value.observacoes
        );
        colaborador.definirEnderecoResidencial(endereco);
        form.value.experiencias.forEach((exp) => {
          const experiencia = new ExperienciaProfissional(
            exp.empresa,
            exp.cargo,
            new Date(exp.dataInicio),
            exp.dataFim ? new Date(exp.dataFim) : null,
            exp.atividades
          );
          colaborador.adicionarExperienciaProfissional(experiencia);
        });
        form.value.referencias.forEach((ref2) => {
          const referencia = new Referencia(
            ref2.nome,
            ref2.empresa,
            ref2.cargo,
            ref2.telefone,
            ref2.email
          );
          colaborador.adicionarReferencia(referencia);
        });
        $q.notify({
          type: "positive",
          message: isEdit.value ? "Colaborador atualizado com sucesso" : "Colaborador cadastrado com sucesso"
        });
        router.push("/colaboradores");
      } catch (error) {
        console.error("Erro ao salvar colaborador:", error);
        $q.notify({
          type: "negative",
          message: `Erro ao salvar colaborador: ${error.message}`
        });
      } finally {
        loading.value = false;
      }
    };
    if (isEdit.value) {
      loadColaborador(route.params.id);
    }
    return {
      form,
      loading,
      isEdit,
      editTitle,
      isValidEmail,
      addExperience,
      removeExperience,
      addReference,
      removeReference,
      buscarCep,
      onSubmit
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
const _hoisted_12 = { class: "col-12 col-md-3" };
const _hoisted_13 = { class: "col-12 col-md-3" };
const _hoisted_14 = { class: "col-12 col-md-4" };
const _hoisted_15 = { class: "col-12 col-md-4" };
const _hoisted_16 = { class: "col-12 col-md-4" };
const _hoisted_17 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_18 = { class: "row q-col-gutter-md" };
const _hoisted_19 = { class: "col-12 col-md-6" };
const _hoisted_20 = { class: "col-12 col-md-6" };
const _hoisted_21 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_22 = { class: "row q-col-gutter-md" };
const _hoisted_23 = { class: "col-12 col-md-6" };
const _hoisted_24 = { class: "col-12 col-md-6" };
const _hoisted_25 = { class: "col-12" };
const _hoisted_26 = { class: "row items-center q-mb-md" };
const _hoisted_27 = { class: "text-h6 text-primary" };
const _hoisted_28 = {
  key: 0,
  class: "text-center text-grey-6 q-py-lg"
};
const _hoisted_29 = { class: "text-body1" };
const _hoisted_30 = { class: "text-caption" };
const _hoisted_31 = { class: "row items-center q-mb-sm" };
const _hoisted_32 = { class: "text-subtitle2" };
const _hoisted_33 = { class: "row q-col-gutter-md" };
const _hoisted_34 = { class: "col-12 col-md-6" };
const _hoisted_35 = { class: "col-12 col-md-6" };
const _hoisted_36 = { class: "col-12 col-md-6" };
const _hoisted_37 = { class: "col-12 col-md-6" };
const _hoisted_38 = { class: "col-12" };
const _hoisted_39 = { class: "row items-center q-mb-md" };
const _hoisted_40 = { class: "text-h6 text-primary" };
const _hoisted_41 = {
  key: 0,
  class: "text-center text-grey-6 q-py-lg"
};
const _hoisted_42 = { class: "text-body1" };
const _hoisted_43 = { class: "text-caption" };
const _hoisted_44 = { class: "row items-center q-mb-sm" };
const _hoisted_45 = { class: "text-subtitle2" };
const _hoisted_46 = { class: "row q-col-gutter-md" };
const _hoisted_47 = { class: "col-12 col-md-6" };
const _hoisted_48 = { class: "col-12 col-md-6" };
const _hoisted_49 = { class: "col-12 col-md-4" };
const _hoisted_50 = { class: "col-12 col-md-4" };
const _hoisted_51 = { class: "col-12 col-md-4" };
const _hoisted_52 = { class: "text-subtitle1 q-mb-md" };
const _hoisted_53 = { class: "row q-col-gutter-md" };
const _hoisted_54 = { class: "col-12 col-md-4" };
const _hoisted_55 = { class: "col-12 col-md-6" };
const _hoisted_56 = { class: "col-12 col-md-2" };
const _hoisted_57 = { class: "col-12 col-md-4" };
const _hoisted_58 = { class: "col-12 col-md-4" };
const _hoisted_59 = { class: "col-12 col-md-3" };
const _hoisted_60 = { class: "col-12 col-md-1" };
const _hoisted_61 = { class: "text-subtitle1 q-mb-md" };
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
              name: "person_add",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.isEdit ? _ctx.editTitle : _ctx.$t("forms.colaborador.title")), 1)
          ]),
          _cache[22] || (_cache[22] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.isEdit ? _ctx.$t("forms.colaborador.editSubtitle") : _ctx.$t("forms.colaborador.subtitle")), 1)
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
                      name: "person",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("forms.colaborador.sections.personalData")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_8, [
                    createBaseVNode("div", _hoisted_9, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.nome,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.form.nome = $event),
                        label: _ctx.$t("forms.colaborador.fields.nome") + " *",
                        filled: "",
                        "lazy-rules": "",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_10, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.sobrenome,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.form.sobrenome = $event),
                        label: _ctx.$t("forms.colaborador.fields.sobrenome") + " *",
                        filled: "",
                        "lazy-rules": "",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_11, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.email,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.form.email = $event),
                        type: "email",
                        label: _ctx.$t("forms.colaborador.fields.email") + " *",
                        filled: "",
                        "lazy-rules": "",
                        rules: [
                          (val) => !!val || _ctx.$t("forms.validation.required"),
                          (val) => _ctx.isValidEmail(val) || _ctx.$t("forms.validation.email")
                        ]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_12, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.telefone,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.form.telefone = $event),
                        label: _ctx.$t("forms.colaborador.fields.telefone"),
                        mask: "(##) ####-####",
                        filled: ""
                      }, null, 8, ["modelValue", "label"])
                    ]),
                    createBaseVNode("div", _hoisted_13, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.celular,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.form.celular = $event),
                        label: _ctx.$t("forms.colaborador.fields.celular") + " *",
                        mask: "(##) #####-####",
                        filled: "",
                        "lazy-rules": "",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_14, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.documentoIdentidade,
                        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.form.documentoIdentidade = $event),
                        label: _ctx.$t("forms.colaborador.fields.documentoIdentidade") + " *",
                        filled: "",
                        "lazy-rules": "",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_15, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.dataNascimento,
                        "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.form.dataNascimento = $event),
                        type: "date",
                        label: _ctx.$t("forms.colaborador.fields.dataNascimento") + " *",
                        filled: "",
                        "lazy-rules": "",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_16, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.nacionalidade,
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => _ctx.form.nacionalidade = $event),
                        label: _ctx.$t("forms.colaborador.fields.nacionalidade") + " *",
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
                  createBaseVNode("div", _hoisted_17, [
                    createVNode(QIcon, {
                      name: "description",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("forms.colaborador.sections.documents")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_18, [
                    createBaseVNode("div", _hoisted_19, [
                      createVNode(QFile, {
                        modelValue: _ctx.form.fotoPerfil,
                        "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.form.fotoPerfil = $event),
                        label: _ctx.$t("forms.colaborador.fields.fotoPerfil"),
                        accept: "image/*",
                        filled: ""
                      }, {
                        prepend: withCtx(() => [
                          createVNode(QIcon, { name: "photo" })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "label"])
                    ]),
                    createBaseVNode("div", _hoisted_20, [
                      createVNode(QFile, {
                        modelValue: _ctx.form.curriculo,
                        "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => _ctx.form.curriculo = $event),
                        label: _ctx.$t("forms.colaborador.fields.curriculo"),
                        accept: ".pdf,.doc,.docx",
                        filled: ""
                      }, {
                        prepend: withCtx(() => [
                          createVNode(QIcon, { name: "description" })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "label"])
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
                  createBaseVNode("div", _hoisted_21, [
                    createVNode(QIcon, {
                      name: "work",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("forms.colaborador.sections.professionalInfo")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_22, [
                    createBaseVNode("div", _hoisted_23, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.salarioEsperado,
                        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => _ctx.form.salarioEsperado = $event),
                        type: "number",
                        label: _ctx.$t("forms.colaborador.fields.salarioEsperado") + " *",
                        prefix: "R$",
                        filled: "",
                        "lazy-rules": "",
                        rules: [
                          (val) => !!val || _ctx.$t("forms.validation.required"),
                          (val) => val > 0 || "Valor deve ser maior que zero"
                        ]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_24, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.disponibilidade,
                        "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => _ctx.form.disponibilidade = $event),
                        label: _ctx.$t("forms.colaborador.fields.disponibilidade") + " *",
                        filled: "",
                        "lazy-rules": "",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_25, [
                      createVNode(QSelect, {
                        modelValue: _ctx.form.regioesAtuacao,
                        "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => _ctx.form.regioesAtuacao = $event),
                        label: _ctx.$t("forms.colaborador.fields.regioesAtuacao") + " *",
                        multiple: "",
                        "use-chips": "",
                        filled: "",
                        "lazy-rules": "",
                        rules: [(val) => val.length > 0 || _ctx.$t("forms.validation.required")]
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
                    createBaseVNode("div", _hoisted_27, [
                      createVNode(QIcon, {
                        name: "work_history",
                        class: "q-mr-sm"
                      }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("forms.colaborador.sections.experience")), 1)
                    ]),
                    createVNode(QSpace),
                    createVNode(QBtn, {
                      color: "primary",
                      label: _ctx.$t("forms.colaborador.experience.addButton"),
                      icon: "add",
                      size: "sm",
                      onClick: _ctx.addExperience
                    }, null, 8, ["label", "onClick"])
                  ]),
                  _ctx.form.experiencias.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_28, [
                    createVNode(QIcon, {
                      name: "work_history",
                      size: "48px",
                      class: "q-mb-md"
                    }),
                    createBaseVNode("div", _hoisted_29, toDisplayString(_ctx.$t("forms.colaborador.experience.noExperience")), 1),
                    createBaseVNode("div", _hoisted_30, toDisplayString(_ctx.$t("forms.colaborador.experience.addFirstExperience")), 1)
                  ])) : createCommentVNode("", true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.form.experiencias, (exp, index) => {
                    return openBlock(), createElementBlock("div", {
                      key: index,
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
                              createBaseVNode("div", _hoisted_31, [
                                createBaseVNode("div", _hoisted_32, toDisplayString(_ctx.$t("forms.colaborador.experience.title", [index + 1])), 1),
                                createVNode(QSpace),
                                createVNode(QBtn, {
                                  flat: "",
                                  round: "",
                                  color: "negative",
                                  icon: "delete",
                                  size: "sm",
                                  onClick: ($event) => _ctx.removeExperience(index)
                                }, null, 8, ["onClick"])
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(QCardSection, { class: "q-pt-none" }, {
                            default: withCtx(() => [
                              createBaseVNode("div", _hoisted_33, [
                                createBaseVNode("div", _hoisted_34, [
                                  createVNode(QInput, {
                                    modelValue: exp.empresa,
                                    "onUpdate:modelValue": ($event) => exp.empresa = $event,
                                    label: _ctx.$t("forms.colaborador.experience.fields.empresa") + " *",
                                    filled: "",
                                    "lazy-rules": "",
                                    rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                ]),
                                createBaseVNode("div", _hoisted_35, [
                                  createVNode(QInput, {
                                    modelValue: exp.cargo,
                                    "onUpdate:modelValue": ($event) => exp.cargo = $event,
                                    label: _ctx.$t("forms.colaborador.experience.fields.cargo") + " *",
                                    filled: "",
                                    "lazy-rules": "",
                                    rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                ]),
                                createBaseVNode("div", _hoisted_36, [
                                  createVNode(QInput, {
                                    modelValue: exp.dataInicio,
                                    "onUpdate:modelValue": ($event) => exp.dataInicio = $event,
                                    type: "date",
                                    label: _ctx.$t("forms.colaborador.experience.fields.dataInicio") + " *",
                                    filled: "",
                                    "lazy-rules": "",
                                    rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                ]),
                                createBaseVNode("div", _hoisted_37, [
                                  createVNode(QInput, {
                                    modelValue: exp.dataFim,
                                    "onUpdate:modelValue": ($event) => exp.dataFim = $event,
                                    type: "date",
                                    label: _ctx.$t("forms.colaborador.experience.fields.dataFim"),
                                    filled: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                ]),
                                createBaseVNode("div", _hoisted_38, [
                                  createVNode(QInput, {
                                    modelValue: exp.atividades,
                                    "onUpdate:modelValue": ($event) => exp.atividades = $event,
                                    type: "textarea",
                                    label: _ctx.$t("forms.colaborador.experience.fields.atividades") + " *",
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
          }),
          createVNode(QCard, {
            flat: "",
            bordered: ""
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_39, [
                    createBaseVNode("div", _hoisted_40, [
                      createVNode(QIcon, {
                        name: "contacts",
                        class: "q-mr-sm"
                      }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("forms.colaborador.sections.references")), 1)
                    ]),
                    createVNode(QSpace),
                    createVNode(QBtn, {
                      color: "primary",
                      label: _ctx.$t("forms.colaborador.reference.addButton"),
                      icon: "add",
                      size: "sm",
                      onClick: _ctx.addReference
                    }, null, 8, ["label", "onClick"])
                  ]),
                  _ctx.form.referencias.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_41, [
                    createVNode(QIcon, {
                      name: "contacts",
                      size: "48px",
                      class: "q-mb-md"
                    }),
                    createBaseVNode("div", _hoisted_42, toDisplayString(_ctx.$t("forms.colaborador.reference.noReferences")), 1),
                    createBaseVNode("div", _hoisted_43, toDisplayString(_ctx.$t("forms.colaborador.reference.addFirstReference")), 1)
                  ])) : createCommentVNode("", true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.form.referencias, (ref2, index) => {
                    return openBlock(), createElementBlock("div", {
                      key: index,
                      class: "q-mb-lg"
                    }, [
                      createBaseVNode("div", _hoisted_44, [
                        createBaseVNode("div", _hoisted_45, toDisplayString(_ctx.$t("forms.colaborador.reference.title", [index + 1])), 1),
                        createVNode(QSpace),
                        createVNode(QBtn, {
                          icon: "delete",
                          color: "negative",
                          flat: "",
                          round: "",
                          dense: "",
                          onClick: ($event) => _ctx.removeReference(index)
                        }, null, 8, ["onClick"])
                      ]),
                      createBaseVNode("div", _hoisted_46, [
                        createBaseVNode("div", _hoisted_47, [
                          createVNode(QInput, {
                            modelValue: ref2.nome,
                            "onUpdate:modelValue": ($event) => ref2.nome = $event,
                            label: _ctx.$t("forms.colaborador.reference.fields.nome") + " *",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_48, [
                          createVNode(QInput, {
                            modelValue: ref2.empresa,
                            "onUpdate:modelValue": ($event) => ref2.empresa = $event,
                            label: _ctx.$t("forms.colaborador.reference.fields.empresa") + " *",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_49, [
                          createVNode(QInput, {
                            modelValue: ref2.cargo,
                            "onUpdate:modelValue": ($event) => ref2.cargo = $event,
                            label: _ctx.$t("forms.colaborador.reference.fields.cargo") + " *",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_50, [
                          createVNode(QInput, {
                            modelValue: ref2.telefone,
                            "onUpdate:modelValue": ($event) => ref2.telefone = $event,
                            label: _ctx.$t("forms.colaborador.reference.fields.telefone") + " *",
                            mask: "(##) #####-####",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_51, [
                          createVNode(QInput, {
                            modelValue: ref2.email,
                            "onUpdate:modelValue": ($event) => ref2.email = $event,
                            type: "email",
                            label: _ctx.$t("forms.colaborador.reference.fields.email") + " *",
                            rules: [
                              (val) => !!val || _ctx.$t("forms.validation.required"),
                              (val) => _ctx.isValidEmail(val) || _ctx.$t("forms.validation.email")
                            ],
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                        ])
                      ])
                    ]);
                  }), 128))
                ]),
                _: 1
              }),
              createVNode(QSeparator),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_52, toDisplayString(_ctx.$t("forms.colaborador.sections.address")), 1),
                  createBaseVNode("div", _hoisted_53, [
                    createBaseVNode("div", _hoisted_54, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.endereco.cep,
                        "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => _ctx.form.endereco.cep = $event),
                        label: _ctx.$t("forms.cliente.address.fields.cep") + " *",
                        mask: "#####-###",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                        onBlur: _ctx.buscarCep,
                        outlined: ""
                      }, null, 8, ["modelValue", "label", "rules", "onBlur"])
                    ]),
                    createBaseVNode("div", _hoisted_55, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.endereco.rua,
                        "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => _ctx.form.endereco.rua = $event),
                        label: _ctx.$t("forms.cliente.address.fields.rua") + " *",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                        outlined: ""
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_56, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.endereco.numero,
                        "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => _ctx.form.endereco.numero = $event),
                        label: _ctx.$t("forms.cliente.address.fields.numero") + " *",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                        outlined: ""
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_57, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.endereco.complemento,
                        "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => _ctx.form.endereco.complemento = $event),
                        label: _ctx.$t("forms.cliente.address.fields.complemento"),
                        outlined: ""
                      }, null, 8, ["modelValue", "label"])
                    ]),
                    createBaseVNode("div", _hoisted_58, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.endereco.bairro,
                        "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => _ctx.form.endereco.bairro = $event),
                        label: _ctx.$t("forms.cliente.address.fields.bairro") + " *",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                        outlined: ""
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_59, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.endereco.cidade,
                        "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => _ctx.form.endereco.cidade = $event),
                        label: _ctx.$t("forms.cliente.address.fields.cidade") + " *",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                        outlined: ""
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_60, [
                      createVNode(QInput, {
                        modelValue: _ctx.form.endereco.estado,
                        "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => _ctx.form.endereco.estado = $event),
                        label: _ctx.$t("forms.cliente.address.fields.estado") + " *",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                        maxlength: "2",
                        outlined: ""
                      }, null, 8, ["modelValue", "label", "rules"])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(QSeparator),
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_61, toDisplayString(_ctx.$t("forms.colaborador.sections.observations")), 1),
                  createVNode(QInput, {
                    modelValue: _ctx.form.observacoes,
                    "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => _ctx.form.observacoes = $event),
                    type: "textarea",
                    label: _ctx.$t("forms.colaborador.fields.observacoes"),
                    outlined: ""
                  }, null, 8, ["modelValue", "label"])
                ]),
                _: 1
              }),
              createVNode(QCardActions, {
                align: "right",
                class: "q-pa-md"
              }, {
                default: withCtx(() => [
                  createVNode(QBtn, {
                    label: _ctx.$t("forms.buttons.cancel"),
                    color: "negative",
                    flat: "",
                    class: "q-mr-sm",
                    to: "/colaboradores"
                  }, null, 8, ["label"]),
                  createVNode(QBtn, {
                    label: _ctx.$t("forms.buttons.save"),
                    color: "primary",
                    type: "submit"
                  }, null, 8, ["label"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["onSubmit"])
    ]),
    _: 1
  });
}
const ColaboradorCadastroPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ColaboradorCadastroPage as default
};
//# sourceMappingURL=ColaboradorCadastroPage-DPI5QBB-.js.map
