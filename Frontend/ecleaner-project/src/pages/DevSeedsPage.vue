<template>
    <q-page padding>
        <div class="q-pa-md">
            <div class="text-h4 q-mb-lg">
                <q-icon name="developer_mode" class="q-mr-sm" />
                Ferramentas de Desenvolvimento
            </div>

            <q-card class="q-mb-md">
                <q-card-section>
                    <div class="text-h6 q-mb-md">
                        <q-icon name="data_object" class="q-mr-sm" />
                        Seeds de Dados
                    </div>
                    <div class="text-body2 text-grey-7 q-mb-md">
                        Use estas ferramentas para carregar dados iniciais no sistema.
                    </div>

                    <div class="row q-gutter-md">
                        <q-btn color="primary" icon="cleaning_services" label="Carregar Materiais de Limpeza"
                            @click="runMaterialSeed" :loading="loading.materials" :disable="loading.all" />

                        <q-btn color="secondary" icon="people" label="Carregar Clientes" @click="runClientSeed"
                            :loading="loading.clients" :disable="loading.all" />

                        <q-btn color="accent" icon="engineering" label="Carregar Colaboradores"
                            @click="runCollaboratorSeed" :loading="loading.collaborators" :disable="loading.all" />

                        <q-btn color="positive" icon="rocket_launch" label="Carregar Todos os Dados"
                            @click="runAllSeeds" :loading="loading.all" :disable="hasAnyLoading" />
                    </div>
                </q-card-section>
            </q-card>

            <q-card>
                <q-card-section>
                    <div class="text-h6 q-mb-md">
                        <q-icon name="delete_sweep" class="q-mr-sm" />
                        Limpeza de Dados
                    </div>
                    <div class="text-body2 text-grey-7 q-mb-md">
                        <q-icon name="warning" color="orange" class="q-mr-xs" />
                        <strong>Cuidado:</strong> Estas ações irão remover todos os dados do sistema.
                    </div>

                    <div class="row q-gutter-md">
                        <q-btn color="negative" outline icon="delete" label="Limpar Materiais" @click="clearMaterials"
                            :loading="loading.clearMaterials" />

                        <q-btn color="negative" outline icon="delete_forever" label="Limpar Todos os Dados"
                            @click="confirmClearAll" :loading="loading.clearAll" />
                    </div>
                </q-card-section>
            </q-card>

            <!-- Log de Atividades -->
            <q-card class="q-mt-md" v-if="logs.length > 0">
                <q-card-section>
                    <div class="text-h6 q-mb-md">
                        <q-icon name="terminal" class="q-mr-sm" />
                        Log de Atividades
                    </div>

                    <div class="log-container">
                        <div v-for="(log, index) in logs" :key="index" :class="getLogClass(log.type)"
                            class="log-entry q-pa-sm q-mb-xs">
                            <q-icon :name="getLogIcon(log.type)" :color="getLogColor(log.type)" class="q-mr-sm" />
                            <span class="text-caption">{{ log.timestamp }}</span>
                            <span class="q-ml-md">{{ log.message }}</span>
                        </div>
                    </div>

                    <div class="q-mt-md">
                        <q-btn flat color="grey" icon="clear" label="Limpar Log" @click="clearLogs" size="sm" />
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { runAllSeeds as runAllSeedsFunction, runMaterialSeed as runMaterialSeedFunction } from '@/core/infrastructure/repositories/seeds'
import { seedClientes } from '@/core/infrastructure/repositories/seeds/clienteSeed'
import { seedColaboradores } from '@/core/infrastructure/repositories/seeds/colaboradorSeed'
import { clearMateriais } from '@/core/infrastructure/repositories/seeds/materialSeed'

export default defineComponent({
    name: 'DevSeedsPage',

    setup() {
        const $q = useQuasar()

        const loading = ref({
            materials: false,
            clients: false,
            collaborators: false,
            all: false,
            clearMaterials: false,
            clearAll: false
        })

        const logs = ref([])

        const hasAnyLoading = computed(() => {
            return Object.values(loading.value).some(Boolean)
        })

        function addLog(message, type = 'info') {
            const timestamp = new Date().toLocaleTimeString()
            logs.value.unshift({ message, type, timestamp })

            // Manter apenas os últimos 50 logs
            if (logs.value.length > 50) {
                logs.value = logs.value.slice(0, 50)
            }
        }

        function getLogClass(type) {
            switch (type) {
                case 'success': return 'bg-green-1 text-green-8'
                case 'error': return 'bg-red-1 text-red-8'
                case 'warning': return 'bg-orange-1 text-orange-8'
                default: return 'bg-blue-1 text-blue-8'
            }
        }

        function getLogIcon(type) {
            switch (type) {
                case 'success': return 'check_circle'
                case 'error': return 'error'
                case 'warning': return 'warning'
                default: return 'info'
            }
        }

        function getLogColor(type) {
            switch (type) {
                case 'success': return 'green'
                case 'error': return 'red'
                case 'warning': return 'orange'
                default: return 'blue'
            }
        }

        async function runMaterialSeed() {
            loading.value.materials = true
            try {
                addLog('Iniciando carregamento de materiais...', 'info')
                await runMaterialSeedFunction()
                addLog('✅ Materiais carregados com sucesso!', 'success')

                $q.notify({
                    type: 'positive',
                    message: '15 materiais de limpeza foram carregados com sucesso!',
                    timeout: 3000,
                    position: 'top-right'
                })
            } catch (error) {
                addLog(`❌ Erro ao carregar materiais: ${error.message}`, 'error')
                $q.notify({
                    type: 'negative',
                    message: 'Erro ao carregar materiais',
                    timeout: 5000,
                    position: 'top-right'
                })
            } finally {
                loading.value.materials = false
            }
        }

        async function runClientSeed() {
            loading.value.clients = true
            try {
                addLog('Iniciando carregamento de clientes...', 'info')
                await seedClientes()
                addLog('✅ Clientes carregados com sucesso!', 'success')

                $q.notify({
                    type: 'positive',
                    message: 'Clientes carregados com sucesso!',
                    timeout: 3000,
                    position: 'top-right'
                })
            } catch (error) {
                addLog(`❌ Erro ao carregar clientes: ${error.message}`, 'error')
                $q.notify({
                    type: 'negative',
                    message: 'Erro ao carregar clientes',
                    timeout: 5000,
                    position: 'top-right'
                })
            } finally {
                loading.value.clients = false
            }
        }

        async function runCollaboratorSeed() {
            loading.value.collaborators = true
            try {
                addLog('Iniciando carregamento de colaboradores...', 'info')
                await seedColaboradores()
                addLog('✅ Colaboradores carregados com sucesso!', 'success')

                $q.notify({
                    type: 'positive',
                    message: 'Colaboradores carregados com sucesso!',
                    timeout: 3000,
                    position: 'top-right'
                })
            } catch (error) {
                addLog(`❌ Erro ao carregar colaboradores: ${error.message}`, 'error')
                $q.notify({
                    type: 'negative',
                    message: 'Erro ao carregar colaboradores',
                    timeout: 5000,
                    position: 'top-right'
                })
            } finally {
                loading.value.collaborators = false
            }
        }

        async function runAllSeeds() {
            loading.value.all = true
            try {
                addLog('Iniciando carregamento de todos os dados...', 'info')
                await runAllSeedsFunction()
                addLog('✅ Todos os dados foram carregados com sucesso!', 'success')

                $q.notify({
                    type: 'positive',
                    message: 'Todos os dados foram carregados com sucesso!',
                    timeout: 3000,
                    position: 'top-right'
                })
            } catch (error) {
                addLog(`❌ Erro ao carregar dados: ${error.message}`, 'error')
                $q.notify({
                    type: 'negative',
                    message: 'Erro ao carregar dados',
                    timeout: 5000,
                    position: 'top-right'
                })
            } finally {
                loading.value.all = false
            }
        }

        async function clearMaterials() {
            loading.value.clearMaterials = true
            try {
                addLog('Limpando materiais...', 'warning')
                await clearMateriais()
                addLog('🗑️ Materiais removidos com sucesso!', 'success')

                $q.notify({
                    type: 'info',
                    message: 'Todos os materiais foram removidos',
                    timeout: 3000,
                    position: 'top-right'
                })
            } catch (error) {
                addLog(`❌ Erro ao limpar materiais: ${error.message}`, 'error')
                $q.notify({
                    type: 'negative',
                    message: 'Erro ao limpar materiais',
                    timeout: 5000,
                    position: 'top-right'
                })
            } finally {
                loading.value.clearMaterials = false
            }
        }

        function confirmClearAll() {
            $q.dialog({
                title: 'Confirmar Limpeza',
                message: 'Tem certeza que deseja remover TODOS os dados do sistema? Esta ação não pode ser desfeita.',
                cancel: true,
                persistent: true,
                color: 'negative'
            }).onOk(() => {
                clearAllData()
            })
        }

        async function clearAllData() {
            loading.value.clearAll = true
            try {
                addLog('Limpando todos os dados...', 'warning')

                // Limpar localStorage
                const keys = Object.keys(localStorage)
                keys.forEach(key => {
                    if (key.includes('materiais') || key.includes('clientes') || key.includes('colaboradores')) {
                        localStorage.removeItem(key)
                    }
                })

                addLog('🗑️ Todos os dados foram removidos!', 'success')

                $q.notify({
                    type: 'info',
                    message: 'Todos os dados foram removidos',
                    timeout: 3000,
                    position: 'top-right'
                })
            } catch (error) {
                addLog(`❌ Erro ao limpar dados: ${error.message}`, 'error')
                $q.notify({
                    type: 'negative',
                    message: 'Erro ao limpar dados',
                    timeout: 5000,
                    position: 'top-right'
                })
            } finally {
                loading.value.clearAll = false
            }
        }

        function clearLogs() {
            logs.value = []
        }

        return {
            loading,
            logs,
            hasAnyLoading,
            runMaterialSeed,
            runClientSeed,
            runCollaboratorSeed,
            runAllSeeds,
            clearMaterials,
            confirmClearAll,
            clearLogs,
            getLogClass,
            getLogIcon,
            getLogColor
        }
    }
})
</script>

<style lang="sass" scoped>
.log-container
  max-height: 300px
  overflow-y: auto
  border: 1px solid #e0e0e0
  border-radius: 4px

.log-entry
  font-family: 'Courier New', monospace
  font-size: 12px
  border-radius: 4px
  display: flex
  align-items: center
</style>
