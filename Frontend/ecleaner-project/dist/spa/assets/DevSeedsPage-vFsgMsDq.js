import { _ as _export_sfc, a as defineComponent, c as createBlock, o as openBlock, w as withCtx, r as ref, p as computed, f as createBaseVNode, e as createVNode, i as createCommentVNode, m as createTextVNode, k as QIcon, Q as QCard, g as QCardSection, l as QBtn, h as createElementBlock, aj as Fragment, ak as renderList, aR as normalizeClass, t as toDisplayString } from "./index-C_9ZqZx5.js";
import { Q as QPage } from "./QPage-BjohE0wt.js";
import { u as useQuasar } from "./use-quasar-RhPDzzvJ.js";
import { a as runMaterialSeed, s as seedClientes, b as seedColaboradores, r as runAllSeeds } from "./index-Cg_viC52.js";
import { clearMateriais } from "./materialSeed-DxCvsxFa.js";
import "./imovel-DC67hqHE.js";
import "./pessoa-C98XhDqr.js";
import "./guid-BHuXRmln.js";
import "./clienteRepository-DQ_hoKdA.js";
import "./colaborador-OpPhEqDl.js";
import "./colaboradorRepository-DatlZTxI.js";
import "./servicoSeed-DT2RWvuq.js";
import "./servico-Bx3u9W9d.js";
import "./equipamentoSeed-BsORFu6P.js";
import "./equipamento-DInCJpxH.js";
import "./equipamentoRepository-C36gseZz.js";
import "./material-D-n2u651.js";
import "./materialRepository-ClMwRjl3.js";
const _sfc_main = defineComponent({
  name: "DevSeedsPage",
  setup() {
    const $q = useQuasar();
    const loading = ref({
      materials: false,
      clients: false,
      collaborators: false,
      all: false,
      clearMaterials: false,
      clearAll: false
    });
    const logs = ref([]);
    const hasAnyLoading = computed(() => {
      return Object.values(loading.value).some(Boolean);
    });
    function addLog(message, type = "info") {
      const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
      logs.value.unshift({ message, type, timestamp });
      if (logs.value.length > 50) {
        logs.value = logs.value.slice(0, 50);
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
    async function runMaterialSeed$1() {
      loading.value.materials = true;
      try {
        addLog("Iniciando carregamento de materiais...", "info");
        await runMaterialSeed();
        addLog("✅ Materiais carregados com sucesso!", "success");
        $q.notify({
          type: "positive",
          message: "15 materiais de limpeza foram carregados com sucesso!",
          timeout: 3e3,
          position: "top-right"
        });
      } catch (error) {
        addLog(`❌ Erro ao carregar materiais: ${error.message}`, "error");
        $q.notify({
          type: "negative",
          message: "Erro ao carregar materiais",
          timeout: 5e3,
          position: "top-right"
        });
      } finally {
        loading.value.materials = false;
      }
    }
    async function runClientSeed() {
      loading.value.clients = true;
      try {
        addLog("Iniciando carregamento de clientes...", "info");
        await seedClientes();
        addLog("✅ Clientes carregados com sucesso!", "success");
        $q.notify({
          type: "positive",
          message: "Clientes carregados com sucesso!",
          timeout: 3e3,
          position: "top-right"
        });
      } catch (error) {
        addLog(`❌ Erro ao carregar clientes: ${error.message}`, "error");
        $q.notify({
          type: "negative",
          message: "Erro ao carregar clientes",
          timeout: 5e3,
          position: "top-right"
        });
      } finally {
        loading.value.clients = false;
      }
    }
    async function runCollaboratorSeed() {
      loading.value.collaborators = true;
      try {
        addLog("Iniciando carregamento de colaboradores...", "info");
        await seedColaboradores();
        addLog("✅ Colaboradores carregados com sucesso!", "success");
        $q.notify({
          type: "positive",
          message: "Colaboradores carregados com sucesso!",
          timeout: 3e3,
          position: "top-right"
        });
      } catch (error) {
        addLog(`❌ Erro ao carregar colaboradores: ${error.message}`, "error");
        $q.notify({
          type: "negative",
          message: "Erro ao carregar colaboradores",
          timeout: 5e3,
          position: "top-right"
        });
      } finally {
        loading.value.collaborators = false;
      }
    }
    async function runAllSeeds$1() {
      loading.value.all = true;
      try {
        addLog("Iniciando carregamento de todos os dados...", "info");
        await runAllSeeds();
        addLog("✅ Todos os dados foram carregados com sucesso!", "success");
        $q.notify({
          type: "positive",
          message: "Todos os dados foram carregados com sucesso!",
          timeout: 3e3,
          position: "top-right"
        });
      } catch (error) {
        addLog(`❌ Erro ao carregar dados: ${error.message}`, "error");
        $q.notify({
          type: "negative",
          message: "Erro ao carregar dados",
          timeout: 5e3,
          position: "top-right"
        });
      } finally {
        loading.value.all = false;
      }
    }
    async function clearMaterials() {
      loading.value.clearMaterials = true;
      try {
        addLog("Limpando materiais...", "warning");
        await clearMateriais();
        addLog("🗑️ Materiais removidos com sucesso!", "success");
        $q.notify({
          type: "info",
          message: "Todos os materiais foram removidos",
          timeout: 3e3,
          position: "top-right"
        });
      } catch (error) {
        addLog(`❌ Erro ao limpar materiais: ${error.message}`, "error");
        $q.notify({
          type: "negative",
          message: "Erro ao limpar materiais",
          timeout: 5e3,
          position: "top-right"
        });
      } finally {
        loading.value.clearMaterials = false;
      }
    }
    function confirmClearAll() {
      $q.dialog({
        title: "Confirmar Limpeza",
        message: "Tem certeza que deseja remover TODOS os dados do sistema? Esta ação não pode ser desfeita.",
        cancel: true,
        persistent: true,
        color: "negative"
      }).onOk(() => {
        clearAllData();
      });
    }
    async function clearAllData() {
      loading.value.clearAll = true;
      try {
        addLog("Limpando todos os dados...", "warning");
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (key.includes("materiais") || key.includes("clientes") || key.includes("colaboradores")) {
            localStorage.removeItem(key);
          }
        });
        addLog("🗑️ Todos os dados foram removidos!", "success");
        $q.notify({
          type: "info",
          message: "Todos os dados foram removidos",
          timeout: 3e3,
          position: "top-right"
        });
      } catch (error) {
        addLog(`❌ Erro ao limpar dados: ${error.message}`, "error");
        $q.notify({
          type: "negative",
          message: "Erro ao limpar dados",
          timeout: 5e3,
          position: "top-right"
        });
      } finally {
        loading.value.clearAll = false;
      }
    }
    function clearLogs() {
      logs.value = [];
    }
    return {
      loading,
      logs,
      hasAnyLoading,
      runMaterialSeed: runMaterialSeed$1,
      runClientSeed,
      runCollaboratorSeed,
      runAllSeeds: runAllSeeds$1,
      clearMaterials,
      confirmClearAll,
      clearLogs,
      getLogClass,
      getLogIcon,
      getLogColor
    };
  }
});
const _hoisted_1 = { class: "q-pa-md" };
const _hoisted_2 = { class: "text-h4 q-mb-lg" };
const _hoisted_3 = { class: "text-h6 q-mb-md" };
const _hoisted_4 = { class: "row q-gutter-md" };
const _hoisted_5 = { class: "text-h6 q-mb-md" };
const _hoisted_6 = { class: "text-body2 text-grey-7 q-mb-md" };
const _hoisted_7 = { class: "row q-gutter-md" };
const _hoisted_8 = { class: "text-h6 q-mb-md" };
const _hoisted_9 = { class: "log-container" };
const _hoisted_10 = { class: "text-caption" };
const _hoisted_11 = { class: "q-ml-md" };
const _hoisted_12 = { class: "q-mt-md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { padding: "" }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(QIcon, {
            name: "developer_mode",
            class: "q-mr-sm"
          }),
          _cache[0] || (_cache[0] = createTextVNode(" Ferramentas de Desenvolvimento ", -1))
        ]),
        createVNode(QCard, { class: "q-mb-md" }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_3, [
                  createVNode(QIcon, {
                    name: "data_object",
                    class: "q-mr-sm"
                  }),
                  _cache[1] || (_cache[1] = createTextVNode(" Seeds de Dados ", -1))
                ]),
                _cache[2] || (_cache[2] = createBaseVNode("div", { class: "text-body2 text-grey-7 q-mb-md" }, " Use estas ferramentas para carregar dados iniciais no sistema. ", -1)),
                createBaseVNode("div", _hoisted_4, [
                  createVNode(QBtn, {
                    color: "primary",
                    icon: "cleaning_services",
                    label: "Carregar Materiais de Limpeza",
                    onClick: _ctx.runMaterialSeed,
                    loading: _ctx.loading.materials,
                    disable: _ctx.loading.all
                  }, null, 8, ["onClick", "loading", "disable"]),
                  createVNode(QBtn, {
                    color: "secondary",
                    icon: "people",
                    label: "Carregar Clientes",
                    onClick: _ctx.runClientSeed,
                    loading: _ctx.loading.clients,
                    disable: _ctx.loading.all
                  }, null, 8, ["onClick", "loading", "disable"]),
                  createVNode(QBtn, {
                    color: "accent",
                    icon: "engineering",
                    label: "Carregar Colaboradores",
                    onClick: _ctx.runCollaboratorSeed,
                    loading: _ctx.loading.collaborators,
                    disable: _ctx.loading.all
                  }, null, 8, ["onClick", "loading", "disable"]),
                  createVNode(QBtn, {
                    color: "positive",
                    icon: "rocket_launch",
                    label: "Carregar Todos os Dados",
                    onClick: _ctx.runAllSeeds,
                    loading: _ctx.loading.all,
                    disable: _ctx.hasAnyLoading
                  }, null, 8, ["onClick", "loading", "disable"])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(QCard, null, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_5, [
                  createVNode(QIcon, {
                    name: "delete_sweep",
                    class: "q-mr-sm"
                  }),
                  _cache[3] || (_cache[3] = createTextVNode(" Limpeza de Dados ", -1))
                ]),
                createBaseVNode("div", _hoisted_6, [
                  createVNode(QIcon, {
                    name: "warning",
                    color: "orange",
                    class: "q-mr-xs"
                  }),
                  _cache[4] || (_cache[4] = createBaseVNode("strong", null, "Cuidado:", -1)),
                  _cache[5] || (_cache[5] = createTextVNode(" Estas ações irão remover todos os dados do sistema. ", -1))
                ]),
                createBaseVNode("div", _hoisted_7, [
                  createVNode(QBtn, {
                    color: "negative",
                    outline: "",
                    icon: "delete",
                    label: "Limpar Materiais",
                    onClick: _ctx.clearMaterials,
                    loading: _ctx.loading.clearMaterials
                  }, null, 8, ["onClick", "loading"]),
                  createVNode(QBtn, {
                    color: "negative",
                    outline: "",
                    icon: "delete_forever",
                    label: "Limpar Todos os Dados",
                    onClick: _ctx.confirmClearAll,
                    loading: _ctx.loading.clearAll
                  }, null, 8, ["onClick", "loading"])
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        _ctx.logs.length > 0 ? (openBlock(), createBlock(QCard, {
          key: 0,
          class: "q-mt-md"
        }, {
          default: withCtx(() => [
            createVNode(QCardSection, null, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_8, [
                  createVNode(QIcon, {
                    name: "terminal",
                    class: "q-mr-sm"
                  }),
                  _cache[6] || (_cache[6] = createTextVNode(" Log de Atividades ", -1))
                ]),
                createBaseVNode("div", _hoisted_9, [
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
                      createBaseVNode("span", _hoisted_10, toDisplayString(log.timestamp), 1),
                      createBaseVNode("span", _hoisted_11, toDisplayString(log.message), 1)
                    ], 2);
                  }), 128))
                ]),
                createBaseVNode("div", _hoisted_12, [
                  createVNode(QBtn, {
                    flat: "",
                    color: "grey",
                    icon: "clear",
                    label: "Limpar Log",
                    onClick: _ctx.clearLogs,
                    size: "sm"
                  }, null, 8, ["onClick"])
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
const DevSeedsPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ccfaf9ca"]]);
export {
  DevSeedsPage as default
};
//# sourceMappingURL=DevSeedsPage-vFsgMsDq.js.map
