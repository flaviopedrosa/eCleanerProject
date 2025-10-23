import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, l as computed, M as onMounted, T as useRoute, b as useRouter, f as createBaseVNode, e as createVNode, i as QBtn, Q as QIcon, t as toDisplayString, a4 as withModifiers, j as createTextVNode, g as createElementBlock, al as QSpinner } from "./index-DcwkHxen.js";
import { Q as QInput } from "./QInput-DXQxwL8P.js";
import { Q as QPage, a as QCard, b as QCardSection } from "./QPage-BYlIwfOX.js";
import { Q as QImg } from "./QImg-BAxzT8RY.js";
import { Q as QCardActions } from "./QCardActions-kxyzVYOt.js";
import { Q as QForm } from "./QForm-EnGPGASW.js";
import { u as useQuasar } from "./use-quasar--iu-ZanD.js";
import { u as useMaterialStore } from "./material-store-CEub2Qqs.js";
import { f as formatCurrency, c as currencyMask, p as parseCurrency, g as getCurrencyConfig } from "./currencyUtils-CDJCkeA4.js";
import { u as useI18n } from "./vue-i18n.runtime-CPX_irvo.js";
import "./focus-manager-DpCIkUL-.js";
import "./use-dark-XRAlznJ5.js";
import "./use-timeout-CtV8kKCk.js";
import "./material-D-n2u651.js";
import "./guid-BHuXRmln.js";
import "./materialRepository-ClMwRjl3.js";
const _sfc_main = defineComponent({
  name: "MaterialCadastroPage",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { t, locale } = useI18n();
    const $q = useQuasar();
    const store = useMaterialStore();
    const form = ref({
      Id: null,
      Descricao: "",
      Unidade: "",
      PrecoUnitario: 0,
      Url: "",
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
    async function carregarMaterial() {
      const materialId = route.params.id;
      if (materialId) {
        try {
          const material = await store.getMaterialById(materialId);
          if (material) {
            form.value = { ...material, ImagemFile: null };
            valorFormatado.value = formatCurrency(material.PrecoUnitario, locale.value, currencyConfig.value.currency);
          }
        } catch (error) {
          console.error("Erro ao carregar material:", error);
          $q.notify({
            type: "negative",
            message: t("forms.material.messages.loadError")
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
        message: t("forms.material.messages.imageTooBig")
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
    async function salvarMaterial() {
      loading.value = true;
      try {
        await processarImagem();
        const materialData = {
          Id: form.value.Id,
          Descricao: form.value.Descricao,
          Unidade: form.value.Unidade,
          PrecoUnitario: form.value.PrecoUnitario,
          Url: form.value.Url,
          Imagem: form.value.Imagem
        };
        if (isEditMode.value) {
          await store.updateMaterial(materialData);
          $q.notify({
            type: "positive",
            message: t("forms.material.messages.updateSuccess")
          });
        } else {
          await store.addMaterial(materialData);
          $q.notify({
            type: "positive",
            message: t("forms.material.messages.saveSuccess")
          });
        }
        router.push("/materiais");
      } catch (error) {
        console.error("Erro ao salvar material:", error);
        $q.notify({
          type: "negative",
          message: isEditMode.value ? t("forms.material.messages.updateError") : t("forms.material.messages.saveError")
        });
      } finally {
        loading.value = false;
      }
    }
    function cancelar() {
      router.push("/materiais");
    }
    onMounted(async () => {
      await carregarMaterial();
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
      salvarMaterial,
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
const _hoisted_14 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_15 = { class: "row q-col-gutter-md" };
const _hoisted_16 = { class: "col-12" };
const _hoisted_17 = { class: "col-12 col-md-4" };
const _hoisted_18 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_19 = { key: 0 };
const _hoisted_20 = { class: "absolute-full flex flex-center bg-negative text-white" };
const _hoisted_21 = { class: "absolute-full flex flex-center" };
const _hoisted_22 = {
  key: 1,
  class: "flex flex-center q-pa-lg",
  style: { "height": "340px", "background-color": "#f5f5f5" }
};
const _hoisted_23 = { class: "text-center" };
const _hoisted_24 = { class: "text-grey-6 q-mt-sm" };
const _hoisted_25 = { class: "row q-gutter-md justify-end" };
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
              name: _ctx.isEditMode ? "edit" : "category",
              size: "2rem",
              class: "text-secondary q-mr-md"
            }, null, 8, ["name"]),
            createBaseVNode("h4", _hoisted_4, toDisplayString(_ctx.isEditMode ? _ctx.$t("forms.material.editTitle") : _ctx.$t("forms.material.newTitle")), 1)
          ]),
          _cache[6] || (_cache[6] = createBaseVNode("div", { class: "accent-divider q-mb-md" }, null, -1)),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("forms.material.formSubtitle")), 1)
          ])
        ])
      ]),
      createVNode(QForm, {
        onSubmit: withModifiers(_ctx.salvarMaterial, ["prevent"]),
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
                          name: "category",
                          class: "q-mr-sm"
                        }),
                        createTextVNode(" " + toDisplayString(_ctx.$t("forms.material.sections.materialData")), 1)
                      ]),
                      createBaseVNode("div", _hoisted_10, [
                        createBaseVNode("div", _hoisted_11, [
                          createVNode(QInput, {
                            modelValue: _ctx.form.Descricao,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.form.Descricao = $event),
                            label: _ctx.$t("forms.material.fields.descricao") + " *",
                            filled: "",
                            "lazy-rules": "",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")]
                          }, null, 8, ["modelValue", "label", "rules"])
                        ]),
                        createBaseVNode("div", _hoisted_12, [
                          createVNode(QInput, {
                            modelValue: _ctx.valorFormatado,
                            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.valorFormatado = $event),
                            label: _ctx.$t("forms.material.fields.precoUnitario") + " *",
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
                            label: _ctx.$t("forms.material.fields.unidade") + " *",
                            filled: "",
                            "lazy-rules": "",
                            rules: [(val) => !!val || _ctx.$t("forms.validation.required")],
                            placeholder: "kg, L, un, m²..."
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
              }),
              createVNode(QCard, {
                flat: "",
                bordered: "",
                class: "q-mt-md"
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_14, [
                        createVNode(QIcon, {
                          name: "info",
                          class: "q-mr-sm"
                        }),
                        createTextVNode(" " + toDisplayString(_ctx.$t("forms.material.sections.additionalInfo")), 1)
                      ]),
                      createBaseVNode("div", _hoisted_15, [
                        createBaseVNode("div", _hoisted_16, [
                          createVNode(QInput, {
                            modelValue: _ctx.form.Url,
                            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.form.Url = $event),
                            label: _ctx.$t("forms.material.fields.url"),
                            filled: "",
                            type: "url",
                            placeholder: "https://exemplo.com/produto"
                          }, {
                            prepend: withCtx(() => [
                              createVNode(QIcon, { name: "link" })
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
              })
            ]),
            createBaseVNode("div", _hoisted_17, [
              createVNode(QCard, {
                flat: "",
                bordered: ""
              }, {
                default: withCtx(() => [
                  createVNode(QCardSection, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_18, [
                        createVNode(QIcon, {
                          name: "image",
                          class: "q-mr-sm"
                        }),
                        createTextVNode(" " + toDisplayString(_ctx.$t("forms.material.sections.imagePreview")), 1)
                      ]),
                      createVNode(QCard, {
                        flat: "",
                        bordered: "",
                        class: "cursor-pointer",
                        onClick: _ctx.abrirSeletorImagem
                      }, {
                        default: withCtx(() => [
                          _ctx.imagemPreview ? (openBlock(), createElementBlock("div", _hoisted_19, [
                            createVNode(QImg, {
                              src: _ctx.imagemPreview,
                              fit: "contain",
                              style: { "height": "340px" },
                              class: "rounded-borders"
                            }, {
                              error: withCtx(() => [
                                createBaseVNode("div", _hoisted_20, [
                                  createVNode(QIcon, {
                                    name: "broken_image",
                                    size: "64px"
                                  })
                                ])
                              ]),
                              loading: withCtx(() => [
                                createBaseVNode("div", _hoisted_21, [
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
                          ])) : (openBlock(), createElementBlock("div", _hoisted_22, [
                            createBaseVNode("div", _hoisted_23, [
                              createVNode(QIcon, {
                                name: "add_a_photo",
                                size: "64px",
                                color: "grey-5"
                              }),
                              createBaseVNode("div", _hoisted_24, toDisplayString(_ctx.$t("forms.material.messages.clickToSelectImage")), 1)
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
          createBaseVNode("div", _hoisted_25, [
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
            onChange: _cache[5] || (_cache[5] = (...args) => _ctx.onFileSelected && _ctx.onFileSelected(...args))
          }, null, 544)
        ]),
        _: 1
      }, 8, ["onSubmit"])
    ]),
    _: 1
  });
}
const MaterialCadastroPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  MaterialCadastroPage as default
};
//# sourceMappingURL=MaterialCadastroPage-DvutHT66.js.map
