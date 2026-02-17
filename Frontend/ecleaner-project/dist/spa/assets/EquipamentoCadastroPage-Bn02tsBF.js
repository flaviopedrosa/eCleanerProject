import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, p as computed, $ as onMounted, a4 as useRoute, b as useRouter, f as createBaseVNode, e as createVNode, l as QBtn, k as QIcon, t as toDisplayString, as as withModifiers, Q as QCard, g as QCardSection, m as createTextVNode, j as QInput, h as createElementBlock, aQ as QSpinner, au as QCardActions } from "./index-C_9ZqZx5.js";
import { Q as QImg } from "./QImg-DiYq_5sI.js";
import { Q as QForm } from "./QForm-BkJeMJ2y.js";
import { Q as QPage } from "./QPage-BjohE0wt.js";
import { u as useQuasar } from "./use-quasar-RhPDzzvJ.js";
import { u as useEquipamentoStore } from "./equipamento-store-CDIdSsiM.js";
import { f as formatCurrency, c as currencyMask, p as parseCurrency, g as getCurrencyConfig } from "./currencyUtils-CDJCkeA4.js";
import { u as useI18n } from "./vue-i18n.runtime-BcAS3Jju.js";
import "./equipamento-DInCJpxH.js";
import "./guid-BHuXRmln.js";
import "./equipamentoRepository-C36gseZz.js";
const _sfc_main = defineComponent({
  name: "EquipamentoCadastroPage",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { t, locale } = useI18n();
    const $q = useQuasar();
    const store = useEquipamentoStore();
    const form = ref({
      Id: null,
      Descricao: "",
      Unidade: "",
      PrecoUnitario: 0,
      ImagemFile: null,
      Imagem: ""
    });
    const loading = ref(false);
    const valorFormatado = ref("");
    const fileInput = ref(null);
    const isEditMode = computed(() => !!route.params.id);
    const currencyConfig = computed(() => getCurrencyConfig(locale.value));
    const imagemPreview = computed(() => {
      if (form.value.ImagemFile) {
        return URL.createObjectURL(form.value.ImagemFile);
      }
      return form.value.Imagem || null;
    });
    async function carregarEquipamento() {
      const equipamentoId = route.params.id;
      if (equipamentoId) {
        try {
          const equipamento = await store.getEquipamentoById(equipamentoId);
          if (equipamento) {
            form.value = { ...equipamento, ImagemFile: null };
            valorFormatado.value = formatCurrency(equipamento.PrecoUnitario, locale.value, currencyConfig.value.currency);
          }
        } catch (error) {
          console.error("Erro ao carregar equipamento:", error);
          $q.notify({
            type: "negative",
            message: t("forms.equipamento.messages.loadError")
          });
        }
      }
    }
    function onValorInput(value) {
      const masked = currencyMask(value, locale.value, currencyConfig.value.currency);
      valorFormatado.value = masked;
      form.value.PrecoUnitario = parseCurrency(masked);
    }
    function onImageRejected() {
      $q.notify({
        type: "negative",
        message: t("forms.equipamento.messages.imageTooBig")
      });
    }
    function removerImagem() {
      form.value.ImagemFile = null;
      form.value.Imagem = "";
    }
    function abrirSeletorImagem() {
      if (fileInput.value) {
        fileInput.value.click();
      }
    }
    function onFileSelected(event) {
      const file = event.target.files[0];
      if (file) {
        if (file.size > 5242880) {
          onImageRejected();
          return;
        }
        form.value.ImagemFile = file;
      }
    }
    async function processarImagem() {
      if (form.value.ImagemFile) {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            form.value.Imagem = e.target.result;
            resolve();
          };
          reader.readAsDataURL(form.value.ImagemFile);
        });
      }
    }
    async function salvarEquipamento() {
      loading.value = true;
      try {
        await processarImagem();
        const equipamentoData = {
          Id: form.value.Id,
          Descricao: form.value.Descricao,
          Unidade: form.value.Unidade,
          PrecoUnitario: form.value.PrecoUnitario,
          Imagem: form.value.Imagem
        };
        if (isEditMode.value) {
          await store.updateEquipamento(equipamentoData);
          $q.notify({
            type: "positive",
            message: t("forms.equipamento.messages.updateSuccess")
          });
        } else {
          await store.addEquipamento(equipamentoData);
          $q.notify({
            type: "positive",
            message: t("forms.equipamento.messages.saveSuccess")
          });
        }
        router.push("/equipamentos");
      } catch (error) {
        console.error("Erro ao salvar equipamento:", error);
        $q.notify({
          type: "negative",
          message: isEditMode.value ? t("forms.equipamento.messages.updateError") : t("forms.equipamento.messages.saveError")
        });
      } finally {
        loading.value = false;
      }
    }
    function cancelar() {
      router.push("/equipamentos");
    }
    onMounted(async () => {
      await carregarEquipamento();
    });
    return {
      // Estado
      form,
      loading,
      valorFormatado,
      // Computed
      isEditMode,
      currencyConfig,
      imagemPreview,
      // Métodos
      onValorInput,
      onImageRejected,
      onFileSelected,
      removerImagem,
      abrirSeletorImagem,
      salvarEquipamento,
      cancelar,
      // Refs
      fileInput
    };
  }
});
const _hoisted_1 = { class: "row items-center q-mb-xl" };
const _hoisted_2 = { class: "col" };
const _hoisted_3 = { class: "row items-center q-mb-sm" };
const _hoisted_4 = { class: "text-h5 q-ma-none text-secondary" };
const _hoisted_5 = { class: "row justify-end" };
const _hoisted_6 = { class: "text-subtitle1 text-grey-7 q-ma-none" };
const _hoisted_7 = { class: "row q-col-gutter-md" };
const _hoisted_8 = { class: "col-12 col-md-8" };
const _hoisted_9 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_10 = { class: "row q-col-gutter-md" };
const _hoisted_11 = { class: "col-12" };
const _hoisted_12 = { class: "col-12 col-md-6" };
const _hoisted_13 = { class: "col-12 col-md-6" };
const _hoisted_14 = { class: "col-12 col-md-4" };
const _hoisted_15 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_16 = { key: 0 };
const _hoisted_17 = { class: "absolute-full flex flex-center bg-negative text-white" };
const _hoisted_18 = { class: "absolute-full flex flex-center" };
const _hoisted_19 = {
  key: 1,
  class: "flex flex-center q-pa-lg",
  style: { "height": "340px", "background-color": "#f5f5f5" }
};
const _hoisted_20 = { class: "text-center" };
const _hoisted_21 = { class: "text-grey-6 q-mt-sm" };
const _hoisted_22 = { class: "row q-gutter-md justify-end" };
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
              name: _ctx.isEditMode ? "edit" : "construction",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }, null, 8, ["name"]),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.isEditMode ? _ctx.$t("forms.equipamento.editTitle") : _ctx.$t("forms.equipamento.newTitle")), 1)
          ]),
          _cache[5] || (_cache[5] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("forms.equipamento.formSubtitle")), 1)
          ])
        ])
      ]),
      createVNode(QForm, {
        onSubmit: withModifiers(_ctx.salvarEquipamento, ["prevent"]),
        class: "q-gutter-md"
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_7, [
            createBaseVNode("div", _hoisted_8, [
              createVNode(QCard, {
                flat: "",
                bordered: ""
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_9, [
                        createVNode(QIcon, {
                          name: "construction",
                          class: "q-mr-sm"
                        }),
                        createTextVNode(" " + toDisplayString(_ctx.$t("forms.equipamento.sections.equipmentData")), 1)
                      ]),
                      createBaseVNode("div", _hoisted_10, [
                        createBaseVNode("div", _hoisted_11, [
                          createVNode(QInput, {
                            modelValue: _ctx.form.Descricao,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.form.Descricao = $event),
                            label: _ctx.$t("forms.equipamento.fields.descricao") + " *",
                            filled: "",
                            "lazy-rules": "",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                          }, null, 8, ["modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_12, [
                          createVNode(QInput, {
                            modelValue: _ctx.valorFormatado,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.valorFormatado = $event),
                            label: _ctx.$t("forms.equipamento.fields.precoUnitario") + " *",
                            filled: "",
                            "lazy-rules": "",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            onInput: _ctx.onValorInput,
                            placeholder: _ctx.currencyConfig.placeholder
                          }, {
                            prepend: withCtx(() => [
                              createVNode(QIcon, { name: "attach_money" })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "label", "rules", "onInput", "placeholder"])
                        ]),
                        createBaseVNode("div", _hoisted_13, [
                          createVNode(QInput, {
                            modelValue: _ctx.form.Unidade,
                            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.form.Unidade = $event),
                            label: _ctx.$t("forms.equipamento.fields.unidade") + " *",
                            filled: "",
                            "lazy-rules": "",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            placeholder: "hora, dia, un..."
                          }, {
                            prepend: withCtx(() => [
                              createVNode(QIcon, { name: "straighten" })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "label", "rules"])
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            createBaseVNode("div", _hoisted_14, [
              createVNode(QCard, {
                flat: "",
                bordered: ""
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_15, [
                        createVNode(QIcon, {
                          name: "image",
                          class: "q-mr-sm"
                        }),
                        createTextVNode(" " + toDisplayString(_ctx.$t("forms.equipamento.sections.imagePreview")), 1)
                      ]),
                      createVNode(QCard, {
                        flat: "",
                        bordered: "",
                        class: "cursor-pointer",
                        onClick: _ctx.abrirSeletorImagem
                      }, {
                        default: withCtx(() => [
                          _ctx.imagemPreview ? (openBlock(), createElementBlock("div", _hoisted_16, [
                            createVNode(QImg, {
                              src: _ctx.imagemPreview,
                              fit: "contain",
                              style: { "height": "340px" },
                              class: "rounded-borders"
                            }, {
                              error: withCtx(() => [
                                createBaseVNode("div", _hoisted_17, [
                                  createVNode(QIcon, {
                                    name: "broken_image",
                                    size: "64px"
                                  })
                                ])
                              ]),
                              loading: withCtx(() => [
                                createBaseVNode("div", _hoisted_18, [
                                  createVNode(QSpinner, {
                                    color: "primary",
                                    size: "64px"
                                  })
                                ])
                              ]),
                              _: 1
                            }, 8, ["src"]),
                            createVNode(QCardActions, { align: "right" }, {
                              default: withCtx(() => [
                                createVNode(QBtn, {
                                  flat: "",
                                  color: "negative",
                                  icon: "delete",
                                  label: "Remover",
                                  onClick: withModifiers(_ctx.removerImagem, ["stop"])
                                }, null, 8, ["onClick"])
                              ]),
                              _: 1
                            })
                          ])) : (openBlock(), createElementBlock("div", _hoisted_19, [
                            createBaseVNode("div", _hoisted_20, [
                              createVNode(QIcon, {
                                name: "add_a_photo",
                                size: "64px",
                                color: "grey-5"
                              }),
                              createBaseVNode("div", _hoisted_21, toDisplayString(_ctx.$t("forms.equipamento.messages.clickToSelectImage")), 1)
                            ])
                          ]))
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ])
          ]),
          createBaseVNode("div", _hoisted_22, [
            createVNode(QBtn, {
              flat: "",
              label: _ctx.$t("forms.buttons.cancel"),
              onClick: _ctx.cancelar
            }, null, 8, ["label", "onClick"]),
            createVNode(QBtn, {
              color: "primary",
              label: _ctx.isEditMode ? _ctx.$t("buttons.update") : _ctx.$t("forms.buttons.save"),
              type: "submit",
              loading: _ctx.loading
            }, null, 8, ["label", "loading"])
          ]),
          createBaseVNode("input", {
            ref: "fileInput",
            type: "file",
            accept: "image/*",
            style: { "display": "none" },
            onChange: _cache[4] || (_cache[4] = (...args) => _ctx.onFileSelected && _ctx.onFileSelected(...args))
          }, null, 544)
        ]),
        _: 1
      }, 8, ["onSubmit"])
    ]),
    _: 1
  });
}
const EquipamentoCadastroPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  EquipamentoCadastroPage as default
};
//# sourceMappingURL=EquipamentoCadastroPage-Bn02tsBF.js.map
