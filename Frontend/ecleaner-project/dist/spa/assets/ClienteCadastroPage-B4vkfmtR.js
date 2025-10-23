import { _ as _export_sfc, c as createBlock, o as openBlock, w as withCtx, l as computed, r as ref, M as onMounted, T as useRoute, b as useRouter, f as createBaseVNode, e as createVNode, i as QBtn, Q as QIcon, t as toDisplayString, j as createTextVNode, g as createElementBlock, h as createCommentVNode, a1 as Fragment, a2 as renderList, a3 as Transition, a4 as withModifiers } from "./index-DcwkHxen.js";
import { Q as QInput } from "./QInput-DXQxwL8P.js";
import { Q as QPage, a as QCard, b as QCardSection } from "./QPage-BYlIwfOX.js";
import { a as QItemLabel } from "./QItemLabel-DaKJP7vT.js";
import { Q as QItemSection } from "./use-model-toggle-CaGhxNcT.js";
import { Q as QSpace } from "./QSpace-1am2MY4J.js";
import { Q as QExpansionItem } from "./QExpansionItem-TKYSg8sB.js";
import { Q as QCheckbox } from "./QCheckbox-B567b7Cu.js";
import { Q as QForm } from "./QForm-EnGPGASW.js";
import { u as useQuasar } from "./use-quasar--iu-ZanD.js";
import { C as Cliente, I as Imovel } from "./imovel-DGbBNfIP.js";
import { E as Endereco } from "./pessoa-CnZ4y1f1.js";
import { C as ClienteRepository, I as ImovelRepository } from "./clienteRepository-DQv2uKxa.js";
import { u as useI18n } from "./vue-i18n.runtime-CPX_irvo.js";
import "./focus-manager-DpCIkUL-.js";
import "./use-dark-XRAlznJ5.js";
import "./QSeparator-Bf3c0dV9.js";
import "./use-checkbox-CitpLRtO.js";
import "./guid-BHuXRmln.js";
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
        id: Date.now() + Math.random(),
        // ID único para reatividade
        totalComodos: "",
        numeroQuartos: "",
        numeroBanheiros: "",
        areaTotal: "",
        observacao: "",
        mesmoEnderecoCliente: false,
        endereco: enderecoVazio()
      };
    }
    const form = ref({
      nome: "",
      sobrenome: "",
      email: "",
      telefone: "",
      celular: "",
      observacoes: "",
      enderecos: [],
      imoveis: []
    });
    const enderecosExpanded = ref(true);
    const imoveisExpanded = ref(true);
    function adicionarNovoEndereco() {
      form.value.enderecos.push(enderecoVazio());
    }
    function removerEndereco(index) {
      form.value.enderecos.splice(index, 1);
    }
    function adicionarNovoImovel() {
      form.value.imoveis.unshift(imovelVazio());
    }
    function removerImovel(index) {
      form.value.imoveis.splice(index, 1);
    }
    function copiarEnderecoCliente(imovelIndex, usarEnderecoCliente) {
      if (usarEnderecoCliente && form.value.enderecos.length > 0) {
        const enderecoCliente = form.value.enderecos[0];
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
        if (tipo === "cliente" && indice !== null) {
          form.value.enderecos[indice].rua = data.logradouro || "";
          form.value.enderecos[indice].bairro = data.bairro || "";
          form.value.enderecos[indice].cidade = data.localidade || "";
          form.value.enderecos[indice].estado = data.uf || "";
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
        if (clienteData.Enderecos && clienteData.Enderecos.length > 0) {
          form.value.enderecos = clienteData.Enderecos.map((endereco) => ({
            cep: endereco.Cep,
            rua: endereco.Logradouro,
            numero: endereco.Numero,
            complemento: endereco.Complemento || "",
            bairro: endereco.Bairro,
            cidade: endereco.Cidade,
            estado: endereco.Estado
          }));
        } else {
          form.value.enderecos = [enderecoVazio()];
        }
        if (clienteData.Imoveis && clienteData.Imoveis.length > 0) {
          form.value.imoveis = clienteData.Imoveis.map((imovel) => ({
            id: Date.now() + Math.random(),
            // ID único para reatividade
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
            }
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
        form.value.enderecos.forEach((enderecoForm) => {
          if (enderecoForm.cep.trim()) {
            const endereco = new Endereco(
              "Principal",
              // descricao
              enderecoForm.rua,
              // logradouro
              enderecoForm.numero,
              enderecoForm.cep,
              enderecoForm.bairro,
              enderecoForm.cidade,
              enderecoForm.estado,
              "Brasil"
              // pais
            );
            clienteInstance.adicionarEndereco(endereco);
          }
        });
        clienteInstance.Observacoes = form.value.observacoes;
        console.log("Salvando cliente primeiro...", clienteInstance);
        const clienteSalvo = await clienteRepository.save(clienteInstance);
        console.log("Cliente salvo com ID:", clienteSalvo.Id);
        const imoveisCriados = [];
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
            const imovel = new Imovel(
              parseInt(imovelForm.totalComodos),
              parseInt(imovelForm.numeroQuartos) || 0,
              parseInt(imovelForm.numeroBanheiros),
              parseFloat(imovelForm.areaTotal) || 0,
              enderecoImovel,
              clienteSalvo,
              // Usa o cliente salvo com ID
              imovelForm.observacao
            );
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
    return {
      form,
      enderecosExpanded,
      imoveisExpanded,
      isEditMode,
      loading,
      cliente,
      onSubmit,
      adicionarNovoEndereco,
      removerEndereco,
      adicionarNovoImovel,
      removerImovel,
      copiarEnderecoCliente,
      buscarEnderecoPorCep,
      voltarParaListagem
    };
  }
};
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
const _hoisted_14 = {
  key: 0,
  class: "text-center text-grey-6 q-py-lg"
};
const _hoisted_15 = { class: "text-body1" };
const _hoisted_16 = { class: "text-caption" };
const _hoisted_17 = { class: "row items-center q-mb-sm" };
const _hoisted_18 = { class: "text-subtitle2" };
const _hoisted_19 = { class: "row q-col-gutter-md" };
const _hoisted_20 = { class: "col-12 col-md-2" };
const _hoisted_21 = { class: "col-12 col-md-8" };
const _hoisted_22 = { class: "col-12 col-md-2" };
const _hoisted_23 = { class: "col-12 col-md-4" };
const _hoisted_24 = { class: "col-12 col-md-4" };
const _hoisted_25 = { class: "col-12 col-md-4" };
const _hoisted_26 = { class: "col-12 col-md-4" };
const _hoisted_27 = {
  key: 0,
  class: "text-center text-grey-6 q-py-lg"
};
const _hoisted_28 = { class: "text-body1" };
const _hoisted_29 = { class: "text-caption" };
const _hoisted_30 = { class: "row items-center q-mb-sm" };
const _hoisted_31 = { class: "text-subtitle2" };
const _hoisted_32 = { class: "row q-col-gutter-md" };
const _hoisted_33 = { class: "col-12 col-md-3" };
const _hoisted_34 = { class: "col-12 col-md-3" };
const _hoisted_35 = { class: "col-12 col-md-3" };
const _hoisted_36 = { class: "col-12 col-md-3" };
const _hoisted_37 = { class: "col-12" };
const _hoisted_38 = { class: "col-12" };
const _hoisted_39 = { class: "text-subtitle2 text-primary q-mb-sm q-mt-md" };
const _hoisted_40 = { class: "col-12 q-mb-md" };
const _hoisted_41 = { class: "col-12 col-md-2" };
const _hoisted_42 = { class: "col-12 col-md-6" };
const _hoisted_43 = { class: "col-12 col-md-2" };
const _hoisted_44 = { class: "col-12 col-md-2" };
const _hoisted_45 = { class: "col-12 col-md-4" };
const _hoisted_46 = { class: "col-12 col-md-4" };
const _hoisted_47 = { class: "col-12 col-md-4" };
const _hoisted_48 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_49 = { class: "row q-col-gutter-md" };
const _hoisted_50 = { class: "col-12" };
const _hoisted_51 = { class: "row q-gutter-md justify-end" };
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
          _cache[9] || (_cache[9] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
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
                    createTextVNode(" " + toDisplayString(_ctx.$t("forms.cliente.sections.personalData")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_8, [
                    createBaseVNode("div", _hoisted_9, [
                      createVNode(QInput, {
                        modelValue: $setup.form.nome,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.form.nome = $event),
                        label: _ctx.$t("forms.cliente.fields.nome") + " *",
                        filled: "",
                        "lazy-rules": "",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_10, [
                      createVNode(QInput, {
                        modelValue: $setup.form.sobrenome,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.form.sobrenome = $event),
                        label: _ctx.$t("forms.cliente.fields.sobrenome") + " *",
                        filled: "",
                        "lazy-rules": "",
                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                      }, null, 8, ["modelValue", "label", "rules"])
                    ]),
                    createBaseVNode("div", _hoisted_11, [
                      createVNode(QInput, {
                        modelValue: $setup.form.email,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $setup.form.email = $event),
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
                    createBaseVNode("div", _hoisted_12, [
                      createVNode(QInput, {
                        modelValue: $setup.form.telefone,
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $setup.form.telefone = $event),
                        label: _ctx.$t("forms.cliente.fields.telefone"),
                        filled: "",
                        mask: "(##) ####-####"
                      }, null, 8, ["modelValue", "label"])
                    ]),
                    createBaseVNode("div", _hoisted_13, [
                      createVNode(QInput, {
                        modelValue: $setup.form.celular,
                        "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $setup.form.celular = $event),
                        label: _ctx.$t("forms.cliente.fields.celular") + " *",
                        filled: "",
                        mask: "(##) #####-####",
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
              createVNode(QExpansionItem, {
                modelValue: $setup.enderecosExpanded,
                "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $setup.enderecosExpanded = $event),
                "expand-separator": ""
              }, {
                header: withCtx(() => [
                  createVNode(QItemSection, null, {
                    default: withCtx(() => [
                      createVNode(QItemLabel, { class: "text-h6 text-primary" }, {
                        default: withCtx(() => [
                          createVNode(QIcon, {
                            name: "location_on",
                            class: "q-mr-sm"
                          }),
                          createTextVNode(" " + toDisplayString(_ctx.$t("forms.cliente.sections.addresses")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(Transition, {
                        "enter-active-class": "animated fadeIn",
                        "leave-active-class": "animated fadeOut"
                      }, {
                        default: withCtx(() => [
                          !$setup.enderecosExpanded ? (openBlock(), createBlock(QItemLabel, {
                            key: 0,
                            caption: ""
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString($setup.form.enderecos.length) + " endereço(s) ", 1)
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
                        icon: "add",
                        label: _ctx.$t("forms.cliente.address.addButton"),
                        flat: "",
                        size: "sm",
                        onClick: withModifiers($setup.adicionarNovoEndereco, ["stop"])
                      }, null, 8, ["label", "onClick"])
                    ]),
                    _: 1
                  })
                ]),
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      $setup.form.enderecos.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_14, [
                        createVNode(QIcon, {
                          name: "location_off",
                          size: "48px",
                          class: "q-mb-md"
                        }),
                        createBaseVNode("div", _hoisted_15, toDisplayString(_ctx.$t("forms.cliente.address.noAddresses")), 1),
                        createBaseVNode("div", _hoisted_16, toDisplayString(_ctx.$t("forms.cliente.address.clickToAdd")), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList($setup.form.enderecos, (endereco, index) => {
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
                                  createBaseVNode("div", _hoisted_17, [
                                    createBaseVNode("div", _hoisted_18, toDisplayString(_ctx.$t("forms.cliente.address.title", [index + 1])), 1),
                                    createVNode(QSpace),
                                    createVNode(QBtn, {
                                      flat: "",
                                      round: "",
                                      color: "negative",
                                      icon: "delete",
                                      size: "sm",
                                      onClick: ($event) => $setup.removerEndereco(index)
                                    }, null, 8, ["onClick"])
                                  ])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(QCardSection, { class: "q-pt-none" }, {
                                default: withCtx(() => [
                                  createBaseVNode("div", _hoisted_19, [
                                    createBaseVNode("div", _hoisted_20, [
                                      createVNode(QInput, {
                                        modelValue: endereco.cep,
                                        "onUpdate:modelValue": ($event) => endereco.cep = $event,
                                        label: _ctx.$t("forms.cliente.address.fields.cep") + " *",
                                        filled: "",
                                        mask: "#####-###",
                                        "lazy-rules": "",
                                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                                        onBlur: ($event) => $setup.buscarEnderecoPorCep(endereco.cep, "cliente", index)
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules", "onBlur"])
                                    ]),
                                    createBaseVNode("div", _hoisted_21, [
                                      createVNode(QInput, {
                                        modelValue: endereco.rua,
                                        "onUpdate:modelValue": ($event) => endereco.rua = $event,
                                        label: _ctx.$t("forms.cliente.address.fields.rua") + " *",
                                        filled: "",
                                        "lazy-rules": "",
                                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                    ]),
                                    createBaseVNode("div", _hoisted_22, [
                                      createVNode(QInput, {
                                        modelValue: endereco.numero,
                                        "onUpdate:modelValue": ($event) => endereco.numero = $event,
                                        label: _ctx.$t("forms.cliente.address.fields.numero") + " *",
                                        filled: "",
                                        "lazy-rules": "",
                                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                    ]),
                                    createBaseVNode("div", _hoisted_23, [
                                      createVNode(QInput, {
                                        modelValue: endereco.complemento,
                                        "onUpdate:modelValue": ($event) => endereco.complemento = $event,
                                        label: _ctx.$t("forms.cliente.address.fields.complemento"),
                                        filled: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                    ]),
                                    createBaseVNode("div", _hoisted_24, [
                                      createVNode(QInput, {
                                        modelValue: endereco.bairro,
                                        "onUpdate:modelValue": ($event) => endereco.bairro = $event,
                                        label: _ctx.$t("forms.cliente.address.fields.bairro") + " *",
                                        filled: "",
                                        "lazy-rules": "",
                                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                    ]),
                                    createBaseVNode("div", _hoisted_25, [
                                      createVNode(QInput, {
                                        modelValue: endereco.cidade,
                                        "onUpdate:modelValue": ($event) => endereco.cidade = $event,
                                        label: _ctx.$t("forms.cliente.address.fields.cidade") + " *",
                                        filled: "",
                                        "lazy-rules": "",
                                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                    ]),
                                    createBaseVNode("div", _hoisted_26, [
                                      createVNode(QInput, {
                                        modelValue: endereco.estado,
                                        "onUpdate:modelValue": ($event) => endereco.estado = $event,
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
            bordered: ""
          }, {
            default: withCtx(() => [
              createVNode(QExpansionItem, {
                modelValue: $setup.imoveisExpanded,
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $setup.imoveisExpanded = $event),
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
                      $setup.form.imoveis.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_27, [
                        createVNode(QIcon, {
                          name: "home_work",
                          size: "48px",
                          class: "q-mb-md"
                        }),
                        createBaseVNode("div", _hoisted_28, toDisplayString(_ctx.$t("forms.cliente.property.noProperties")), 1),
                        createBaseVNode("div", _hoisted_29, toDisplayString(_ctx.$t("forms.cliente.property.clickToAdd")), 1)
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
                                  createBaseVNode("div", _hoisted_30, [
                                    createBaseVNode("div", _hoisted_31, toDisplayString(_ctx.$t("forms.cliente.property.title", [index + 1])), 1),
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
                                  createBaseVNode("div", _hoisted_32, [
                                    createBaseVNode("div", _hoisted_33, [
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
                                    createBaseVNode("div", _hoisted_34, [
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
                                    createBaseVNode("div", _hoisted_35, [
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
                                    createBaseVNode("div", _hoisted_36, [
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
                                    createBaseVNode("div", _hoisted_37, [
                                      createVNode(QInput, {
                                        modelValue: imovel.observacao,
                                        "onUpdate:modelValue": ($event) => imovel.observacao = $event,
                                        label: _ctx.$t("forms.cliente.property.fields.observacao"),
                                        filled: "",
                                        type: "textarea",
                                        rows: "2"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                    ]),
                                    createBaseVNode("div", _hoisted_38, [
                                      createBaseVNode("div", _hoisted_39, [
                                        createVNode(QIcon, {
                                          name: "location_on",
                                          class: "q-mr-xs"
                                        }),
                                        createTextVNode(" " + toDisplayString(_ctx.$t("forms.cliente.property.address.title")), 1)
                                      ])
                                    ]),
                                    createBaseVNode("div", _hoisted_40, [
                                      createVNode(QCheckbox, {
                                        modelValue: imovel.mesmoEnderecoCliente,
                                        "onUpdate:modelValue": [($event) => imovel.mesmoEnderecoCliente = $event, (value) => $setup.copiarEnderecoCliente(index, value)],
                                        label: _ctx.$t("forms.cliente.property.address.sameAsClient"),
                                        color: "primary"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                    ]),
                                    createBaseVNode("div", _hoisted_41, [
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
                                    createBaseVNode("div", _hoisted_42, [
                                      createVNode(QInput, {
                                        modelValue: imovel.endereco.rua,
                                        "onUpdate:modelValue": ($event) => imovel.endereco.rua = $event,
                                        label: _ctx.$t("forms.cliente.address.fields.rua") + " *",
                                        filled: "",
                                        "lazy-rules": "",
                                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                    ]),
                                    createBaseVNode("div", _hoisted_43, [
                                      createVNode(QInput, {
                                        modelValue: imovel.endereco.numero,
                                        "onUpdate:modelValue": ($event) => imovel.endereco.numero = $event,
                                        label: _ctx.$t("forms.cliente.address.fields.numero") + " *",
                                        filled: "",
                                        "lazy-rules": "",
                                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                    ]),
                                    createBaseVNode("div", _hoisted_44, [
                                      createVNode(QInput, {
                                        modelValue: imovel.endereco.complemento,
                                        "onUpdate:modelValue": ($event) => imovel.endereco.complemento = $event,
                                        label: _ctx.$t("forms.cliente.address.fields.complemento"),
                                        filled: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                                    ]),
                                    createBaseVNode("div", _hoisted_45, [
                                      createVNode(QInput, {
                                        modelValue: imovel.endereco.bairro,
                                        "onUpdate:modelValue": ($event) => imovel.endereco.bairro = $event,
                                        label: _ctx.$t("forms.cliente.address.fields.bairro") + " *",
                                        filled: "",
                                        "lazy-rules": "",
                                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                    ]),
                                    createBaseVNode("div", _hoisted_46, [
                                      createVNode(QInput, {
                                        modelValue: imovel.endereco.cidade,
                                        "onUpdate:modelValue": ($event) => imovel.endereco.cidade = $event,
                                        label: _ctx.$t("forms.cliente.address.fields.cidade") + " *",
                                        filled: "",
                                        "lazy-rules": "",
                                        rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules"])
                                    ]),
                                    createBaseVNode("div", _hoisted_47, [
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
            bordered: ""
          }, {
            default: withCtx(() => [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_48, [
                    createVNode(QIcon, {
                      name: "notes",
                      class: "q-mr-sm"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("forms.cliente.sections.observacoes")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_49, [
                    createBaseVNode("div", _hoisted_50, [
                      createVNode(QInput, {
                        modelValue: $setup.form.observacoes,
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $setup.form.observacoes = $event),
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
          }),
          createBaseVNode("div", _hoisted_51, [
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
const ClienteCadastroPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  ClienteCadastroPage as default
};
//# sourceMappingURL=ClienteCadastroPage-B4vkfmtR.js.map
