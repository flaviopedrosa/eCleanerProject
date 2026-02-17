<template>
    <q-page class="q-pa-lg">
        <!-- Cabeçalho da Página -->
        <div class="row items-center q-mb-xl">
            <div class="col">
                <div class="row items-center q-mb-sm">
                    <q-icon name="construction" size="2rem" class="text-secondary q-mr-md" />
                    <h4 class="text-h5 q-ma-none text-secondary">
                        {{ $t('pages.equipamento.title') }}
                    </h4>
                </div>
                <div class="accent-divider q-mb-md"></div>
                <div class="row justify-end">
                    <p class="text-subtitle1 text-grey-7 q-ma-none">
                        {{ $t('pages.equipamento.subtitle') }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Campo de Busca e Botão Novo Equipamento -->
        <div class="row q-mb-lg items-center q-gutter-md">
            <div class="col-12 col-md-6">
                <q-input v-model="filtro" :placeholder="$t('pages.equipamento.searchPlaceholder')" filled clearable
                    dense>
                    <template v-slot:prepend>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </div>
            <q-space />
            <q-btn color="primary" icon="add" :label="$t('pages.equipamento.newButton')"
                @click="irParaNovoEquipamento" />
        </div>

        <!-- Versão Desktop -->
        <div class="gt-sm">
            <q-table :rows="equipamentosFiltrados" :columns="columns" row-key="Id" flat bordered :loading="loading"
                :no-data-label="$t('pages.equipamento.noData')">
                <template v-slot:body-cell-PrecoUnitario="props">
                    <q-td :props="props">
                        {{ formatarMoeda(props.row.PrecoUnitario) }}
                    </q-td>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <q-btn flat round icon="edit" color="primary" size="sm" @click="editarEquipamento(props.row)"
                            :title="$t('pages.equipamento.editButton')" />
                        <q-btn flat round icon="delete" color="negative" size="sm"
                            @click="excluirEquipamento(props.row.Id)" :title="$t('pages.equipamento.deleteButton')" />
                    </q-td>
                </template>
            </q-table>
        </div>

        <!-- Versão Mobile -->
        <div class="lt-md">
            <div class="row q-col-gutter-md">
                <div v-for="equipamento in equipamentosFiltrados" :key="equipamento.Id" class="col-12">
                    <q-card flat bordered>
                        <q-card-section>
                            <div class="row items-center">
                                <div class="col">
                                    <div class="text-h6">{{ equipamento.Descricao }}</div>
                                    <div class="text-caption text-grey-6">
                                        {{ equipamento.Unidade }} • {{ formatarMoeda(equipamento.PrecoUnitario) }}
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <q-btn flat round icon="edit" color="primary" size="sm"
                                        @click="editarEquipamento(equipamento)" />
                                    <q-btn flat round icon="delete" color="negative" size="sm"
                                        @click="excluirEquipamento(equipamento.Id)" />
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
                <div v-if="equipamentosFiltrados.length === 0" class="col-12">
                    <q-card flat bordered class="text-center q-pa-xl">
                        <q-icon name="construction" size="4rem" color="grey-5" />
                        <div class="text-h6 q-mt-md text-grey-6">
                            {{ $t('pages.equipamento.noData') }}
                        </div>
                    </q-card>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useEquipamentoStore } from '@/stores/equipamento-store.js'

export default defineComponent({
    name: 'EquipamentoListagemPage',

    setup() {
        const { t } = useI18n()
        const router = useRouter()
        const store = useEquipamentoStore()

        // Estado do filtro
        const filtro = ref('')

        // Configuração da tabela
        const columns = computed(() => [
            {
                name: 'Descricao',
                label: t('pages.equipamento.fields.descricao'),
                field: 'Descricao',
                align: 'left',
                sortable: true
            },
            {
                name: 'Unidade',
                label: t('pages.equipamento.fields.unidade'),
                field: 'Unidade',
                align: 'center',
                sortable: true
            },
            {
                name: 'PrecoUnitario',
                label: t('pages.equipamento.fields.precoUnitario'),
                field: 'PrecoUnitario',
                align: 'right',
                sortable: true,
                format: (val) => formatarMoeda(val)
            },
            {
                name: 'actions',
                label: '',
                field: 'actions',
                align: 'right'
            },
        ])

        // Computed properties
        const equipamentosSorted = computed(() => store.EquipamentosOrdenados)
        const loading = computed(() => store.IsLoading)

        // Computed para filtrar equipamentos
        const equipamentosFiltrados = computed(() => {
            if (!filtro.value) {
                return equipamentosSorted.value
            }

            const filtroLowerCase = filtro.value.toLowerCase()
            return equipamentosSorted.value.filter(equipamento =>
                equipamento.Descricao.toLowerCase().includes(filtroLowerCase) ||
                equipamento.Unidade.toLowerCase().includes(filtroLowerCase)
            )
        })

        // Métodos
        function formatarMoeda(valor) {
            // Conversão mais robusta
            let numeroValido = 0

            if (typeof valor === 'number' && !isNaN(valor)) {
                numeroValido = valor
            } else if (typeof valor === 'string') {
                const parsed = parseFloat(valor)
                numeroValido = isNaN(parsed) ? 0 : parsed
            }

            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(numeroValido)
        }

        // Navegação para novo equipamento
        function irParaNovoEquipamento() {
            router.push('/equipamentos/novo')
        }

        // Navegação para editar equipamento
        function editarEquipamento(equipamento) {
            router.push(`/equipamentos/${equipamento.Id}/editar`)
        }

        async function excluirEquipamento(id) {
            try {
                await store.deleteEquipamento(id)
            } catch (error) {
                console.error('Erro ao excluir equipamento:', error)
            }
        }

        // Lifecycle
        onMounted(async () => {
            await store.loadEquipamentos()
        })

        return {
            // Estado
            filtro,

            // Computed
            columns,
            equipamentosFiltrados,
            loading,

            // Métodos
            formatarMoeda,
            irParaNovoEquipamento,
            editarEquipamento,
            excluirEquipamento
        }
    }
})
</script>

<style lang="sass" scoped>
.accent-divider
  height: 2px
  background: $accent
  width: 100%
</style>
