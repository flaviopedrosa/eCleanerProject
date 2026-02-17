import { ah as reactive, A as watch, c as createBlock, o as openBlock, w as withCtx, e as createVNode, f as createBaseVNode, m as createTextVNode, k as QIcon, j as QInput, g as QCardSection, Q as QCard, _ as _export_sfc, a as defineComponent, r as ref, p as computed, $ as onMounted, a5 as resolveComponent, i as createCommentVNode, t as toDisplayString, a7 as QSeparator, l as QBtn, aA as createSlots, a6 as QAvatar, h as createElementBlock, aj as Fragment, ak as renderList, aR as normalizeClass } from "./index-C_9ZqZx5.js";
import { Q as QSelect } from "./QSelect-B7UkQpY4.js";
import { Q as QFile } from "./QFile-DirlnN7h.js";
import { Q as QPage } from "./QPage-BjohE0wt.js";
import { u as useQuasar } from "./use-quasar-RhPDzzvJ.js";
import { r as runAllSeeds, a as runMaterialSeed, s as seedClientes, b as seedColaboradores, c as runServiceSeed, d as runEquipamentoSeed } from "./index-Cg_viC52.js";
import { u as useI18n } from "./vue-i18n.runtime-BcAS3Jju.js";
import "./QChip-CQHm52sc.js";
import "./format-X8mfcfls.js";
import "./QMenu-0ExrfRXY.js";
import "./position-engine-D6xtJVbJ.js";
import "./selection-q6_tzKdx.js";
import "./imovel-DC67hqHE.js";
import "./pessoa-C98XhDqr.js";
import "./guid-BHuXRmln.js";
import "./clienteRepository-DQ_hoKdA.js";
import "./colaborador-OpPhEqDl.js";
import "./colaboradorRepository-DatlZTxI.js";
import "./materialSeed-DxCvsxFa.js";
import "./material-D-n2u651.js";
import "./materialRepository-ClMwRjl3.js";
import "./servicoSeed-DT2RWvuq.js";
import "./servico-Bx3u9W9d.js";
import "./equipamentoSeed-BsORFu6P.js";
import "./equipamento-DInCJpxH.js";
import "./equipamentoRepository-C36gseZz.js";
const _hoisted_1$1 = { class: "text-h6 text-primary q-mb-md" };
const _hoisted_2$1 = { class: "row q-col-gutter-md" };
const _hoisted_3$1 = { class: "col-12 col-md-8" };
const _hoisted_4$1 = { class: "col-12 col-md-4" };
const _hoisted_5$1 = { class: "col-12 col-md-6" };
const _hoisted_6$1 = { class: "col-12 col-md-6" };
const _hoisted_7$1 = { class: "col-12 col-md-6" };
const _hoisted_8$1 = { class: "col-12 col-md-3" };
const _hoisted_9$1 = { class: "col-12 col-md-3" };
const _sfc_main$1 = {
  __name: "EnderecoForm",
  props: {
    modelValue: { type: Object, required: true },
    readonly: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localValue = reactive({ ...props.modelValue });
    watch(() => props.modelValue, (val) => {
      Object.assign(localValue, val || {});
    }, { deep: true });
    watch(localValue, (val) => {
      emit("update:modelValue", { ...val });
    }, { deep: true });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, {
        flat: "",
        bordered: ""
      }, {
        default: withCtx(() => [
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$1, [
                createVNode(QIcon, {
                  name: "place",
                  class: "q-mr-sm"
                }),
                _cache[7] || (_cache[7] = createTextVNode(" Endereço da Empresa ", -1))
              ]),
              createBaseVNode("div", _hoisted_2$1, [
                createBaseVNode("div", _hoisted_3$1, [
                  createVNode(QInput, {
                    modelValue: localValue.logradouro,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => localValue.logradouro = $event),
                    label: "Logradouro",
                    filled: "",
                    readonly: __props.readonly
                  }, null, 8, ["modelValue", "readonly"])
                ]),
                createBaseVNode("div", _hoisted_4$1, [
                  createVNode(QInput, {
                    modelValue: localValue.numero,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => localValue.numero = $event),
                    label: "Número",
                    filled: "",
                    readonly: __props.readonly
                  }, null, 8, ["modelValue", "readonly"])
                ]),
                createBaseVNode("div", _hoisted_5$1, [
                  createVNode(QInput, {
                    modelValue: localValue.complemento,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => localValue.complemento = $event),
                    label: "Complemento",
                    filled: "",
                    readonly: __props.readonly
                  }, null, 8, ["modelValue", "readonly"])
                ]),
                createBaseVNode("div", _hoisted_6$1, [
                  createVNode(QInput, {
                    modelValue: localValue.bairro,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => localValue.bairro = $event),
                    label: "Bairro",
                    filled: "",
                    readonly: __props.readonly
                  }, null, 8, ["modelValue", "readonly"])
                ]),
                createBaseVNode("div", _hoisted_7$1, [
                  createVNode(QInput, {
                    modelValue: localValue.cidade,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => localValue.cidade = $event),
                    label: "Cidade",
                    filled: "",
                    readonly: __props.readonly
                  }, null, 8, ["modelValue", "readonly"])
                ]),
                createBaseVNode("div", _hoisted_8$1, [
                  createVNode(QInput, {
                    modelValue: localValue.estado,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => localValue.estado = $event),
                    label: "Estado",
                    filled: "",
                    readonly: __props.readonly
                  }, null, 8, ["modelValue", "readonly"])
                ]),
                createBaseVNode("div", _hoisted_9$1, [
                  createVNode(QInput, {
                    modelValue: localValue.cep,
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => localValue.cep = $event),
                    label: "CEP",
                    filled: "",
                    readonly: __props.readonly
                  }, null, 8, ["modelValue", "readonly"])
                ])
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
const CONFIG = {
  MAX_WIDTH: 500,
  MAX_HEIGHT: 200,
  MAX_FILE_SIZE: 5e5,
  // 500KB em bytes
  QUALITY: 0.8,
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp"]
};
function validateImage(file) {
  if (!file) return { valid: false, error: "Nenhum arquivo selecionado" };
  if (!CONFIG.ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Tipo de arquivo inválido. Aceitos: ${CONFIG.ALLOWED_TYPES.join(", ")}`
    };
  }
  if (file.size > CONFIG.MAX_FILE_SIZE) {
    const sizeMB = (CONFIG.MAX_FILE_SIZE / 1024 / 1024).toFixed(1);
    return {
      valid: false,
      error: `Arquivo muito grande. Máximo: ${sizeMB}MB`
    };
  }
  return { valid: true };
}
async function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > CONFIG.MAX_WIDTH) {
            height = Math.round(height * CONFIG.MAX_WIDTH / width);
            width = CONFIG.MAX_WIDTH;
          }
        } else {
          if (height > CONFIG.MAX_HEIGHT) {
            width = Math.round(width * CONFIG.MAX_HEIGHT / height);
            height = CONFIG.MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", CONFIG.QUALITY);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error("Erro ao carregar imagem"));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
    reader.readAsDataURL(file);
  });
}
async function processImage(file) {
  try {
    const validation = validateImage(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }
    const compressedData = await compressImage(file);
    return { success: true, data: compressedData };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
const _sfc_main = defineComponent({
  name: "ConfiguracoesPage",
  components: {
    EnderecoForm: _sfc_main$1
  },
  setup() {
    const $q = useQuasar();
    const { t } = useI18n();
    const loading = ref({
      cargaCompleta: false,
      materiais: false,
      clientes: false,
      colaboradores: false,
      servicos: false,
      equipamentos: false,
      limpeza: false,
      salvar: false,
      configuracao: false
    });
    const logs = ref([]);
    const editMode = ref(false);
    const config = ref({
      nomeEmpresa: "eCleaner",
      emailEmpresa: "contato@ecleaner.com.br",
      telefoneEmpresa: "(11) 99999-9999",
      moeda: "BRL",
      validadeOrcamentoDias: 30,
      emailJsKey: "",
      emailJsServiceId: "",
      emailJsTemplateIdOrcamento: "",
      logo: null,
      // Imagem da logomarca
      endereco: {
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: ""
      }
    });
    const configOriginal = ref({});
    const logoFile = ref(null);
    const previewUrl = ref(null);
    async function handleLogoAdded(file) {
      if (!file) {
        config.value.logo = null;
        previewUrl.value = null;
        return;
      }
      try {
        const result = await processImage(file);
        if (!result.success) {
          $q.notify({
            color: "negative",
            message: result.error,
            timeout: 4e3,
            position: "top-right"
          });
          logoFile.value = null;
          previewUrl.value = null;
          return;
        }
        config.value.logo = result.data;
        previewUrl.value = result.data;
        $q.notify({
          color: "positive",
          message: "Logomarca carregada e comprimida com sucesso!",
          timeout: 2e3,
          position: "top-right"
        });
      } catch (err) {
        console.error("Erro ao processar logomarca:", err);
        $q.notify({
          color: "negative",
          message: "Erro ao processar a imagem. Tente outro arquivo.",
          timeout: 4e3,
          position: "top-right"
        });
        logoFile.value = null;
        previewUrl.value = null;
      }
    }
    const moedaOptions = [
      { label: "Real (R$)", value: "BRL" },
      { label: "Dólar ($)", value: "USD" },
      { label: "Euro (€)", value: "EUR" }
    ];
    const hasAnyLoading = computed(() => {
      return loading.value.cargaCompleta || loading.value.materiais || loading.value.clientes || loading.value.colaboradores || loading.value.servicos || loading.value.equipamentos;
    });
    function addLog(message, type = "info") {
      const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
      logs.value.unshift({ message, type, timestamp });
      if (logs.value.length > 100) {
        logs.value = logs.value.slice(0, 100);
      }
    }
    function getLogClass(type) {
      switch (type) {
        case "success":
          return "bg-green-1 text-green-8";
        case "error":
          return "bg-red-1 text-red-8";
        case "warning":
          return "bg-orange-1 text-orange-8";
        default:
          return "bg-blue-1 text-blue-8";
      }
    }
    function getLogIcon(type) {
      switch (type) {
        case "success":
          return "check_circle";
        case "error":
          return "error";
        case "warning":
          return "warning";
        default:
          return "info";
      }
    }
    function getLogColor(type) {
      switch (type) {
        case "success":
          return "green";
        case "error":
          return "red";
        case "warning":
          return "orange";
        default:
          return "blue";
      }
    }
    async function executarCargaCompleta() {
      loading.value.cargaCompleta = true;
      try {
        addLog("🚀 Iniciando carga completa do sistema...", "info");
        await carregarConfiguracao();
        await runAllSeeds();
        addLog("✅ Carga completa executada com sucesso!", "success");
        $q.notify({
          color: "positive",
          message: t("forms.configuracoes.sections.dataManagement.completeLoad.success"),
          caption: "Todos os dados iniciais foram carregados",
          timeout: 5e3,
          position: "top-right",
          actions: [{ icon: "close", color: "white" }]
        });
      } catch (error) {
        addLog(`❌ Erro durante a carga completa: ${error.message}`, "error");
        $q.notify({
          color: "negative",
          message: t("forms.configuracoes.sections.dataManagement.completeLoad.error"),
          caption: error.message,
          timeout: 7e3,
          position: "top-right",
          actions: [{ icon: "close", color: "white" }]
        });
      } finally {
        loading.value.cargaCompleta = false;
      }
    }
    async function carregarMateriais() {
      loading.value.materiais = true;
      try {
        addLog("🧽 Carregando materiais de limpeza...", "info");
        await runMaterialSeed();
        addLog("✅ Materiais carregados com sucesso!", "success");
        $q.notify({
          color: "positive",
          message: t("forms.configuracoes.sections.dataManagement.individualLoad.materials.success"),
          timeout: 3e3,
          position: "top-right"
        });
      } catch (error) {
        addLog(`❌ Erro ao carregar materiais: ${error.message}`, "error");
        $q.notify({
          color: "negative",
          message: t("forms.configuracoes.sections.dataManagement.individualLoad.materials.error"),
          timeout: 5e3,
          position: "top-right"
        });
      } finally {
        loading.value.materiais = false;
      }
    }
    async function carregarClientes() {
      loading.value.clientes = true;
      try {
        addLog("👥 Carregando clientes...", "info");
        await seedClientes();
        addLog("✅ Clientes carregados com sucesso!", "success");
        $q.notify({
          color: "positive",
          message: t("forms.configuracoes.sections.dataManagement.individualLoad.clients.success"),
          timeout: 3e3,
          position: "top-right"
        });
      } catch (error) {
        addLog(`❌ Erro ao carregar clientes: ${error.message}`, "error");
        $q.notify({
          color: "negative",
          message: t("forms.configuracoes.sections.dataManagement.individualLoad.clients.error"),
          timeout: 5e3,
          position: "top-right"
        });
      } finally {
        loading.value.clientes = false;
      }
    }
    async function carregarColaboradores() {
      loading.value.colaboradores = true;
      try {
        addLog("👷 Carregando colaboradores...", "info");
        await seedColaboradores();
        addLog("✅ Colaboradores carregados com sucesso!", "success");
        $q.notify({
          color: "positive",
          message: t("forms.configuracoes.sections.dataManagement.individualLoad.collaborators.success"),
          timeout: 3e3,
          position: "top-right"
        });
      } catch (error) {
        addLog(`❌ Erro ao carregar colaboradores: ${error.message}`, "error");
        $q.notify({
          color: "negative",
          message: t("forms.configuracoes.sections.dataManagement.individualLoad.collaborators.error"),
          timeout: 5e3,
          position: "top-right"
        });
      } finally {
        loading.value.colaboradores = false;
      }
    }
    async function carregarServicos() {
      loading.value.servicos = true;
      try {
        addLog("🧹 Carregando serviços...", "info");
        await runServiceSeed();
        addLog("✅ Serviços carregados com sucesso!", "success");
        $q.notify({
          color: "positive",
          message: t("forms.configuracoes.sections.dataManagement.individualLoad.services.success"),
          timeout: 3e3,
          position: "top-right"
        });
      } catch (error) {
        addLog(`❌ Erro ao carregar serviços: ${error.message}`, "error");
        $q.notify({
          color: "negative",
          message: t("forms.configuracoes.sections.dataManagement.individualLoad.services.error"),
          timeout: 5e3,
          position: "top-right"
        });
      } finally {
        loading.value.servicos = false;
      }
    }
    async function carregarEquipamentos() {
      loading.value.equipamentos = true;
      try {
        addLog("🛠️ Carregando equipamentos...", "info");
        await runEquipamentoSeed();
        addLog("✅ Equipamentos carregados com sucesso!", "success");
        $q.notify({
          color: "positive",
          message: "Equipamentos carregados com sucesso!",
          timeout: 3e3,
          position: "top-right"
        });
      } catch (error) {
        addLog(`❌ Erro ao carregar equipamentos: ${error.message}`, "error");
        $q.notify({
          color: "negative",
          message: "Erro ao carregar equipamentos",
          timeout: 5e3,
          position: "top-right"
        });
      } finally {
        loading.value.equipamentos = false;
      }
    }
    async function carregarConfiguracao() {
      loading.value.configuracao = true;
      try {
        addLog("⚙️ Carregando configuração da Schedule America...", "info");
        const response = await fetch("/schedule_america.png");
        if (!response.ok) throw new Error("Não foi possível carregar a logo");
        const blob = await response.blob();
        const reader = new FileReader();
        const logoBase64 = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob);
        });
        const configScheduleAmerica = {
          nomeEmpresa: "Schedule America",
          emailEmpresa: "contato@scheduleamerica.com",
          telefoneEmpresa: "(305) 555-0123",
          moeda: "USD",
          validadeOrcamentoDias: 30,
          emailJsKey: "",
          emailJsServiceId: "",
          emailJsTemplateIdOrcamento: "",
          logo: logoBase64,
          endereco: {
            logradouro: "456 Cleaning Boulevard",
            numero: "789",
            complemento: "Suite 200",
            bairro: "Downtown",
            cidade: "Miami",
            estado: "FL",
            cep: "33101"
          }
        };
        localStorage.setItem("ecleaner_config", JSON.stringify(configScheduleAmerica));
        config.value = { ...configScheduleAmerica };
        configOriginal.value = { ...configScheduleAmerica };
        editMode.value = false;
        logoFile.value = null;
        previewUrl.value = configScheduleAmerica.logo;
        addLog("✅ Configuração da Schedule America carregada com sucesso!", "success");
        $q.notify({
          color: "positive",
          message: "Configuração Schedule America carregada",
          caption: "Empresa e dados de teste foram importados com sucesso",
          timeout: 3e3,
          position: "top-right"
        });
      } catch (error) {
        addLog(`❌ Erro ao carregar configuração: ${error.message}`, "error");
        $q.notify({
          color: "negative",
          message: "Erro ao carregar configuração",
          caption: error.message,
          timeout: 5e3,
          position: "top-right"
        });
      } finally {
        loading.value.configuracao = false;
      }
    }
    function confirmarLimpezaCompleta() {
      $q.dialog({
        title: t("forms.configuracoes.sections.danger.clearData.title"),
        message: t("forms.configuracoes.sections.danger.clearData.confirm"),
        cancel: true,
        persistent: true,
        color: "negative",
        html: true
      }).onOk(() => {
        executarLimpezaCompleta();
      });
    }
    async function executarLimpezaCompleta() {
      loading.value.limpeza = true;
      try {
        addLog("🗑️ Iniciando limpeza completa...", "warning");
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key.includes("materiais") || key.includes("clientes") || key.includes("colaboradores") || key.includes("equipes") || key.includes("servicos") || key.includes("pacotes")) {
            localStorage.removeItem(key);
          }
        });
        addLog("✅ Limpeza completa executada!", "success");
        $q.notify({
          color: "info",
          message: t("forms.configuracoes.sections.danger.clearData.success"),
          caption: "Todos os dados foram removidos",
          timeout: 3e3,
          position: "top-right"
        });
      } catch (error) {
        addLog(`❌ Erro durante a limpeza: ${error.message}`, "error");
        $q.notify({
          color: "negative",
          message: t("forms.configuracoes.sections.danger.clearData.error"),
          timeout: 5e3,
          position: "top-right"
        });
      } finally {
        loading.value.limpeza = false;
      }
    }
    async function salvarConfiguracoes() {
      loading.value.salvar = true;
      try {
        const configToSave = { ...config.value };
        if (config.value.logo && typeof config.value.logo !== "string") {
          try {
            configToSave.logo = await fileToBase64(config.value.logo);
          } catch (err) {
            console.error("Erro ao converter logomarca para base64:", err);
            configToSave.logo = null;
          }
        }
        const jsonString = JSON.stringify(configToSave);
        const sizeInBytes = new Blob([jsonString]).size;
        const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
        const MAX_SIZE_MB = 2;
        if (sizeInBytes > MAX_SIZE_MB * 1024 * 1024) {
          addLog(`❌ Arquivo de configuração muito grande (${sizeInMB}MB). Máximo permitido: ${MAX_SIZE_MB}MB`, "error");
          $q.notify({
            color: "negative",
            message: `Arquivo de configuração muito grande (${sizeInMB}MB). Máximo permitido: ${MAX_SIZE_MB}MB. Por favor, reduza o tamanho da logomarca.`,
            timeout: 5e3,
            position: "top-right"
          });
          loading.value.salvar = false;
          return;
        }
        localStorage.setItem("ecleaner_config", jsonString);
        configOriginal.value = { ...configToSave };
        config.value = { ...configToSave };
        logoFile.value = null;
        previewUrl.value = configToSave.logo;
        editMode.value = false;
        addLog("⚙️ Configurações salvas com sucesso!", "success");
        $q.notify({
          color: "positive",
          message: t("forms.configuracoes.sections.generalConfig.messages.success"),
          timeout: 2e3,
          position: "top-right"
        });
      } catch (error) {
        addLog(`❌ Erro ao salvar configurações: ${error.message}`, "error");
        $q.notify({
          color: "negative",
          message: t("forms.configuracoes.sections.generalConfig.messages.error"),
          timeout: 5e3,
          position: "top-right"
        });
      } finally {
        loading.value.salvar = false;
      }
    }
    function cancelarEdicao() {
      config.value = { ...configOriginal.value };
      editMode.value = false;
    }
    function limparLogs() {
      logs.value = [];
    }
    function carregarConfiguracoes() {
      try {
        const savedConfig = localStorage.getItem("ecleaner_config");
        if (savedConfig) {
          const parsed = JSON.parse(savedConfig);
          config.value = {
            ...config.value,
            ...parsed,
            endereco: {
              ...config.value.endereco,
              ...parsed.endereco || {}
            }
          };
          logoFile.value = null;
          previewUrl.value = parsed.logo || null;
        }
        configOriginal.value = { ...config.value };
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
      }
    }
    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });
    }
    function getLogoUrl(file) {
      if (!file) return "";
      if (typeof file === "string") return file;
      if (file.__img) return file.__img;
      return URL.createObjectURL(file);
    }
    onMounted(() => {
      carregarConfiguracoes();
      addLog("🔧 Página de configurações carregada", "info");
    });
    return {
      loading,
      logs,
      editMode,
      config,
      moedaOptions,
      hasAnyLoading,
      executarCargaCompleta,
      carregarMateriais,
      carregarClientes,
      carregarColaboradores,
      carregarServicos,
      carregarEquipamentos,
      confirmarLimpezaCompleta,
      salvarConfiguracoes,
      cancelarEdicao,
      limparLogs,
      getLogClass,
      getLogIcon,
      getLogColor,
      getLogoUrl,
      logoFile,
      previewUrl,
      handleLogoAdded
    };
  }
});
const _hoisted_1 = { class: "q-pa-md" };
const _hoisted_2 = { class: "text-h4 q-mb-lg" };
const _hoisted_3 = { class: "text-h6 q-mb-md" };
const _hoisted_4 = { class: "text-body2 text-grey-7 q-mb-md" };
const _hoisted_5 = { class: "row items-center q-mb-lg" };
const _hoisted_6 = { class: "col-12 col-md-8" };
const _hoisted_7 = { class: "text-subtitle1 q-mb-xs" };
const _hoisted_8 = { class: "text-body2 text-grey-7" };
const _hoisted_9 = { class: "col-12 col-md-4 text-right" };
const _hoisted_10 = { class: "text-subtitle1 q-mb-md" };
const _hoisted_11 = { class: "row q-col-gutter-md q-mb-md" };
const _hoisted_12 = { class: "col-12 col-sm-6 col-md-4" };
const _hoisted_13 = { class: "text-subtitle2 q-mb-xs" };
const _hoisted_14 = { class: "text-caption text-grey-7 q-mb-md" };
const _hoisted_15 = { class: "col-12 col-sm-6 col-md-4" };
const _hoisted_16 = { class: "text-subtitle2 q-mb-xs" };
const _hoisted_17 = { class: "text-caption text-grey-7 q-mb-md" };
const _hoisted_18 = { class: "col-12 col-sm-6 col-md-4" };
const _hoisted_19 = { class: "text-subtitle2 q-mb-xs" };
const _hoisted_20 = { class: "text-caption text-grey-7 q-mb-md" };
const _hoisted_21 = { class: "col-12 col-sm-6 col-md-4" };
const _hoisted_22 = { class: "text-subtitle2 q-mb-xs" };
const _hoisted_23 = { class: "text-caption text-grey-7 q-mb-md" };
const _hoisted_24 = { class: "col-12 col-sm-6 col-md-4" };
const _hoisted_25 = { class: "text-subtitle1 q-mb-md text-negative" };
const _hoisted_26 = { class: "row items-center" };
const _hoisted_27 = { class: "col-12 col-md-8" };
const _hoisted_28 = { class: "text-subtitle2 q-mb-xs" };
const _hoisted_29 = { class: "text-body2 text-grey-7" };
const _hoisted_30 = { class: "col-12 col-md-4 text-right" };
const _hoisted_31 = { class: "text-h6 q-mb-md" };
const _hoisted_32 = { class: "row q-col-gutter-md" };
const _hoisted_33 = { class: "col-12 col-md-6" };
const _hoisted_34 = { class: "col-12 col-md-6" };
const _hoisted_35 = { class: "col-12 col-md-6" };
const _hoisted_36 = { class: "col-12 col-md-6" };
const _hoisted_37 = { class: "col-12 col-md-6" };
const _hoisted_38 = { class: "col-12" };
const _hoisted_39 = { class: "text-subtitle2 q-mb-sm q-mt-md" };
const _hoisted_40 = { class: "col-12 col-md-6" };
const _hoisted_41 = { class: "col-12 col-md-6" };
const _hoisted_42 = { class: "col-12 col-md-6" };
const _hoisted_43 = { class: "col-12 col-md-6" };
const _hoisted_44 = ["src"];
const _hoisted_45 = { class: "col-12" };
const _hoisted_46 = { class: "q-mt-md" };
const _hoisted_47 = {
  key: 1,
  class: "row q-gutter-sm"
};
const _hoisted_48 = { class: "text-h6 q-mb-md" };
const _hoisted_49 = { class: "log-container" };
const _hoisted_50 = { class: "text-caption" };
const _hoisted_51 = { class: "q-ml-md" };
const _hoisted_52 = { class: "q-mt-md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_EnderecoForm = resolveComponent("EnderecoForm");
  return openBlock(), createBlock(QPage, { padding: "" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(QIcon, {
            name: "settings",
            class: "q-mr-sm"
          }),
          createTextVNode(" " + toDisplayString(_ctx.$t("forms.configuracoes.title")), 1)
        ]),
        createVNode(QCard, { class: "q-mb-md" }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_3, [
                  createVNode(QIcon, {
                    name: "database",
                    class: "q-mr-sm"
                  }),
                  createTextVNode(" " + toDisplayString(_ctx.$t("forms.configuracoes.sections.dataManagement.title")), 1)
                ]),
                createBaseVNode("div", _hoisted_4, toDisplayString(_ctx.$t("forms.configuracoes.sections.dataManagement.subtitle")), 1),
                createVNode(QSeparator, { class: "q-mb-md" }),
                createBaseVNode("div", _hoisted_5, [
                  createBaseVNode("div", _hoisted_6, [
                    createBaseVNode("div", _hoisted_7, [
                      createVNode(QIcon, {
                        name: "rocket_launch",
                        class: "q-mr-sm text-positive"
                      }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("forms.configuracoes.sections.dataManagement.completeLoad.title")), 1)
                    ]),
                    createBaseVNode("div", _hoisted_8, toDisplayString(_ctx.$t("forms.configuracoes.sections.dataManagement.completeLoad.description")), 1)
                  ]),
                  createBaseVNode("div", _hoisted_9, [
                    createVNode(QBtn, {
                      color: "positive",
                      icon: "download",
                      label: _ctx.$t("forms.configuracoes.sections.dataManagement.completeLoad.button"),
                      onClick: _ctx.executarCargaCompleta,
                      loading: _ctx.loading.cargaCompleta,
                      disable: _ctx.hasAnyLoading,
                      size: "md",
                      class: "q-px-lg"
                    }, null, 8, ["label", "onClick", "loading", "disable"])
                  ])
                ]),
                createVNode(QSeparator, { class: "q-mb-md" }),
                createBaseVNode("div", _hoisted_10, toDisplayString(_ctx.$t("forms.configuracoes.sections.dataManagement.individualLoad.title")), 1),
                createBaseVNode("div", _hoisted_11, [
                  createBaseVNode("div", _hoisted_12, [
                    createVNode(QCard, {
                      flat: "",
                      bordered: "",
                      class: "full-height"
                    }, {
                      default: withCtx(() => [
                        createVNode(QCardSection, { class: "text-center" }, {
                          default: withCtx(() => [
                            createVNode(QIcon, {
                              name: "cleaning_services",
                              size: "3em",
                              color: "primary",
                              class: "q-mb-sm"
                            }),
                            createBaseVNode("div", _hoisted_13, toDisplayString(_ctx.$t("forms.configuracoes.sections.dataManagement.individualLoad.materials.title")), 1),
                            createBaseVNode("div", _hoisted_14, toDisplayString(_ctx.$t("forms.configuracoes.sections.dataManagement.individualLoad.materials.description")), 1),
                            createVNode(QBtn, {
                              flat: "",
                              color: "primary",
                              label: _ctx.$t("forms.configuracoes.sections.dataManagement.individualLoad.materials.button"),
                              onClick: _ctx.carregarMateriais,
                              loading: _ctx.loading.materiais,
                              disable: _ctx.hasAnyLoading,
                              size: "sm"
                            }, null, 8, ["label", "onClick", "loading", "disable"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createBaseVNode("div", _hoisted_15, [
                    createVNode(QCard, {
                      flat: "",
                      bordered: "",
                      class: "full-height"
                    }, {
                      default: withCtx(() => [
                        createVNode(QCardSection, { class: "text-center" }, {
                          default: withCtx(() => [
                            createVNode(QIcon, {
                              name: "people",
                              size: "3em",
                              color: "secondary",
                              class: "q-mb-sm"
                            }),
                            createBaseVNode("div", _hoisted_16, toDisplayString(_ctx.$t("forms.configuracoes.sections.dataManagement.individualLoad.clients.title")), 1),
                            createBaseVNode("div", _hoisted_17, toDisplayString(_ctx.$t("forms.configuracoes.sections.dataManagement.individualLoad.clients.description")), 1),
                            createVNode(QBtn, {
                              flat: "",
                              color: "secondary",
                              label: _ctx.$t("forms.configuracoes.sections.dataManagement.individualLoad.clients.button"),
                              onClick: _ctx.carregarClientes,
                              loading: _ctx.loading.clientes,
                              disable: _ctx.hasAnyLoading,
                              size: "sm"
                            }, null, 8, ["label", "onClick", "loading", "disable"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createBaseVNode("div", _hoisted_18, [
                    createVNode(QCard, {
                      flat: "",
                      bordered: "",
                      class: "full-height"
                    }, {
                      default: withCtx(() => [
                        createVNode(QCardSection, { class: "text-center" }, {
                          default: withCtx(() => [
                            createVNode(QIcon, {
                              name: "engineering",
                              size: "3em",
                              color: "accent",
                              class: "q-mb-sm"
                            }),
                            createBaseVNode("div", _hoisted_19, toDisplayString(_ctx.$t("forms.configuracoes.sections.dataManagement.individualLoad.collaborators.title")), 1),
                            createBaseVNode("div", _hoisted_20, toDisplayString(_ctx.$t("forms.configuracoes.sections.dataManagement.individualLoad.collaborators.description")), 1),
                            createVNode(QBtn, {
                              flat: "",
                              color: "accent",
                              label: _ctx.$t("forms.configuracoes.sections.dataManagement.individualLoad.collaborators.button"),
                              onClick: _ctx.carregarColaboradores,
                              loading: _ctx.loading.colaboradores,
                              disable: _ctx.hasAnyLoading,
                              size: "sm"
                            }, null, 8, ["label", "onClick", "loading", "disable"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createBaseVNode("div", _hoisted_21, [
                    createVNode(QCard, {
                      flat: "",
                      bordered: "",
                      class: "full-height"
                    }, {
                      default: withCtx(() => [
                        createVNode(QCardSection, { class: "text-center" }, {
                          default: withCtx(() => [
                            createVNode(QIcon, {
                              name: "room_service",
                              size: "3em",
                              color: "deep-orange",
                              class: "q-mb-sm"
                            }),
                            createBaseVNode("div", _hoisted_22, toDisplayString(_ctx.$t("forms.configuracoes.sections.dataManagement.individualLoad.services.title")), 1),
                            createBaseVNode("div", _hoisted_23, toDisplayString(_ctx.$t("forms.configuracoes.sections.dataManagement.individualLoad.services.description")), 1),
                            createVNode(QBtn, {
                              flat: "",
                              color: "deep-orange",
                              label: _ctx.$t("forms.configuracoes.sections.dataManagement.individualLoad.services.button"),
                              onClick: _ctx.carregarServicos,
                              loading: _ctx.loading.servicos,
                              disable: _ctx.hasAnyLoading,
                              size: "sm"
                            }, null, 8, ["label", "onClick", "loading", "disable"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createBaseVNode("div", _hoisted_24, [
                    createVNode(QCard, {
                      flat: "",
                      bordered: "",
                      class: "full-height"
                    }, {
                      default: withCtx(() => [
                        createVNode(QCardSection, { class: "text-center" }, {
                          default: withCtx(() => [
                            createVNode(QIcon, {
                              name: "construction",
                              size: "3em",
                              color: "purple",
                              class: "q-mb-sm"
                            }),
                            _cache[11] || (_cache[11] = createBaseVNode("div", { class: "text-subtitle2 q-mb-xs" }, "Equipamentos", -1)),
                            _cache[12] || (_cache[12] = createBaseVNode("div", { class: "text-caption text-grey-7 q-mb-md" }, "Carrega dados de equipamentos para o sistema", -1)),
                            createVNode(QBtn, {
                              flat: "",
                              color: "purple",
                              label: "Carregar Equipamentos",
                              onClick: _ctx.carregarEquipamentos,
                              loading: _ctx.loading.equipamentos,
                              disable: _ctx.hasAnyLoading,
                              size: "sm"
                            }, null, 8, ["onClick", "loading", "disable"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode(QSeparator, { class: "q-mb-md" }),
                createBaseVNode("div", _hoisted_25, [
                  createVNode(QIcon, {
                    name: "warning",
                    class: "q-mr-sm"
                  }),
                  createTextVNode(" " + toDisplayString(_ctx.$t("forms.configuracoes.sections.danger.title")), 1)
                ]),
                createBaseVNode("div", _hoisted_26, [
                  createBaseVNode("div", _hoisted_27, [
                    createBaseVNode("div", _hoisted_28, toDisplayString(_ctx.$t("forms.configuracoes.sections.danger.clearData.title")), 1),
                    createBaseVNode("div", _hoisted_29, [
                      createVNode(QIcon, {
                        name: "warning",
                        color: "orange",
                        class: "q-mr-xs"
                      }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("forms.configuracoes.sections.danger.clearData.description")), 1)
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_30, [
                    createVNode(QBtn, {
                      color: "negative",
                      outline: "",
                      icon: "delete_forever",
                      label: _ctx.$t("forms.configuracoes.sections.danger.clearData.button"),
                      onClick: _ctx.confirmarLimpezaCompleta,
                      loading: _ctx.loading.limpeza,
                      size: "md"
                    }, null, 8, ["label", "onClick", "loading"])
                  ])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(QCard, { class: "q-mb-md" }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_31, [
                  createVNode(QIcon, {
                    name: "tune",
                    class: "q-mr-sm"
                  }),
                  createTextVNode(" " + toDisplayString(_ctx.$t("forms.configuracoes.sections.generalConfig.title")), 1)
                ]),
                createBaseVNode("div", _hoisted_32, [
                  createBaseVNode("div", _hoisted_33, [
                    createVNode(QInput, {
                      modelValue: _ctx.config.nomeEmpresa,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.config.nomeEmpresa = $event),
                      label: _ctx.$t("forms.configuracoes.sections.generalConfig.fields.companyName"),
                      filled: "",
                      readonly: !_ctx.editMode
                    }, null, 8, ["modelValue", "label", "readonly"])
                  ]),
                  createBaseVNode("div", _hoisted_34, [
                    createVNode(QInput, {
                      modelValue: _ctx.config.emailEmpresa,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.config.emailEmpresa = $event),
                      label: _ctx.$t("forms.configuracoes.sections.generalConfig.fields.companyEmail"),
                      type: "email",
                      filled: "",
                      readonly: !_ctx.editMode
                    }, null, 8, ["modelValue", "label", "readonly"])
                  ]),
                  createBaseVNode("div", _hoisted_35, [
                    createVNode(QInput, {
                      modelValue: _ctx.config.telefoneEmpresa,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.config.telefoneEmpresa = $event),
                      label: _ctx.$t("forms.configuracoes.sections.generalConfig.fields.companyPhone"),
                      filled: "",
                      readonly: !_ctx.editMode
                    }, null, 8, ["modelValue", "label", "readonly"])
                  ]),
                  createBaseVNode("div", _hoisted_36, [
                    createVNode(QSelect, {
                      modelValue: _ctx.config.moeda,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => _ctx.config.moeda = $event),
                      options: _ctx.moedaOptions,
                      label: _ctx.$t("forms.configuracoes.sections.generalConfig.fields.defaultCurrency"),
                      filled: "",
                      "emit-value": "",
                      "map-options": "",
                      readonly: !_ctx.editMode
                    }, null, 8, ["modelValue", "options", "label", "readonly"])
                  ]),
                  createBaseVNode("div", _hoisted_37, [
                    createVNode(QInput, {
                      modelValue: _ctx.config.validadeOrcamentoDias,
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => _ctx.config.validadeOrcamentoDias = $event),
                      modelModifiers: { number: true },
                      label: "Validade do Orçamento (dias)",
                      type: "number",
                      min: "1",
                      max: "365",
                      filled: "",
                      readonly: !_ctx.editMode,
                      hint: "Número de dias que um orçamento permanece válido",
                      suffix: "dias"
                    }, null, 8, ["modelValue", "readonly"])
                  ]),
                  createBaseVNode("div", _hoisted_38, [
                    createBaseVNode("div", _hoisted_39, [
                      createVNode(QIcon, {
                        name: "email",
                        class: "q-mr-sm"
                      }),
                      _cache[13] || (_cache[13] = createTextVNode(" Configuração de E-mail (EmailJS) ", -1))
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_40, [
                    createVNode(QInput, {
                      modelValue: _ctx.config.emailJsKey,
                      "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => _ctx.config.emailJsKey = $event),
                      label: "Chave Pública do EmailJS",
                      filled: "",
                      readonly: !_ctx.editMode,
                      hint: "Sua chave pública do EmailJS (Public Key)"
                    }, null, 8, ["modelValue", "readonly"])
                  ]),
                  createBaseVNode("div", _hoisted_41, [
                    createVNode(QInput, {
                      modelValue: _ctx.config.emailJsServiceId,
                      "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => _ctx.config.emailJsServiceId = $event),
                      label: "Service ID do EmailJS",
                      filled: "",
                      readonly: !_ctx.editMode,
                      hint: "ID do serviço de e-mail configurado no EmailJS"
                    }, null, 8, ["modelValue", "readonly"])
                  ]),
                  createBaseVNode("div", _hoisted_42, [
                    createVNode(QInput, {
                      modelValue: _ctx.config.emailJsTemplateIdOrcamento,
                      "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => _ctx.config.emailJsTemplateIdOrcamento = $event),
                      label: "Template ID - Orçamento",
                      filled: "",
                      readonly: !_ctx.editMode,
                      hint: "ID do template para envio de orçamentos"
                    }, null, 8, ["modelValue", "readonly"])
                  ]),
                  createBaseVNode("div", _hoisted_43, [
                    createVNode(QFile, {
                      modelValue: _ctx.logoFile,
                      "onUpdate:modelValue": [
                        _cache[8] || (_cache[8] = ($event) => _ctx.logoFile = $event),
                        _ctx.handleLogoAdded
                      ],
                      label: _ctx.$t("forms.configuracoes.sections.generalConfig.fields.logo"),
                      accept: ".jpg,.png,.jpeg",
                      filled: "",
                      "lazy-rules": "",
                      readonly: !_ctx.editMode,
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
                      _ctx.previewUrl ? {
                        name: "after",
                        fn: withCtx(() => [
                          createVNode(QAvatar, {
                            size: "120px",
                            square: ""
                          }, {
                            default: withCtx(() => [
                              createBaseVNode("img", {
                                src: _ctx.previewUrl,
                                style: { "object-fit": "contain" }
                              }, null, 8, _hoisted_44)
                            ]),
                            _: 1
                          })
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1032, ["modelValue", "label", "readonly", "onUpdate:modelValue", "rules"])
                  ]),
                  createBaseVNode("div", _hoisted_45, [
                    createVNode(_component_EnderecoForm, {
                      modelValue: _ctx.config.endereco,
                      "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => _ctx.config.endereco = $event),
                      readonly: !_ctx.editMode
                    }, null, 8, ["modelValue", "readonly"])
                  ])
                ]),
                createBaseVNode("div", _hoisted_46, [
                  !_ctx.editMode ? (openBlock(), createBlock(QBtn, {
                    key: 0,
                    color: "primary",
                    icon: "edit",
                    label: _ctx.$t("forms.configuracoes.sections.generalConfig.buttons.edit"),
                    onClick: _cache[10] || (_cache[10] = ($event) => _ctx.editMode = true)
                  }, null, 8, ["label"])) : (openBlock(), createElementBlock("div", _hoisted_47, [
                    createVNode(QBtn, {
                      color: "positive",
                      icon: "save",
                      label: _ctx.$t("forms.configuracoes.sections.generalConfig.buttons.save"),
                      onClick: _ctx.salvarConfiguracoes,
                      loading: _ctx.loading.salvar
                    }, null, 8, ["label", "onClick", "loading"]),
                    createVNode(QBtn, {
                      flat: "",
                      color: "grey",
                      label: _ctx.$t("forms.configuracoes.sections.generalConfig.buttons.cancel"),
                      onClick: _ctx.cancelarEdicao
                    }, null, 8, ["label", "onClick"])
                  ]))
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        _ctx.logs.length > 0 ? (openBlock(), createBlock(QCard, { key: 0 }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_48, [
                  createVNode(QIcon, {
                    name: "article",
                    class: "q-mr-sm"
                  }),
                  createTextVNode(" " + toDisplayString(_ctx.$t("forms.configuracoes.sections.activity.title")), 1)
                ]),
                createBaseVNode("div", _hoisted_49, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.logs, (log, index) => {
                    return openBlock(), createElementBlock("div", {
                      key: index,
                      class: normalizeClass([_ctx.getLogClass(log.type), "log-entry q-pa-sm q-mb-xs"])
                    }, [
                      createVNode(QIcon, {
                        name: _ctx.getLogIcon(log.type),
                        color: _ctx.getLogColor(log.type),
                        class: "q-mr-sm"
                      }, null, 8, ["name", "color"]),
                      createBaseVNode("span", _hoisted_50, toDisplayString(log.timestamp), 1),
                      createBaseVNode("span", _hoisted_51, toDisplayString(log.message), 1)
                    ], 2);
                  }), 128))
                ]),
                createBaseVNode("div", _hoisted_52, [
                  createVNode(QBtn, {
                    flat: "",
                    color: "grey",
                    icon: "clear",
                    label: _ctx.$t("forms.configuracoes.sections.activity.buttons.clear"),
                    onClick: _ctx.limparLogs,
                    size: "sm"
                  }, null, 8, ["label", "onClick"])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        })) : createCommentVNode("", true)
      ])
    ]),
    _: 1
  });
}
const ConfiguracoesPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8def8ea5"]]);
export {
  ConfiguracoesPage as default
};
//# sourceMappingURL=ConfiguracoesPage-CZKnnsx5.js.map
