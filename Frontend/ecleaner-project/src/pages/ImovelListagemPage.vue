<template>
    <q-page class="q-pa-lg">
        <!-- Cabeçalho da Página -->
        <div class="row items-center q-mb-xl">
            <div class="col">
                <div class="row items-center q-mb-sm">
                    <q-icon name="home" size="2rem" class="text-secondary q-mr-md" />
                    <h4 class="text-h5 q-ma-none text-secondary">
                        {{ $t('pages.imovelList.title') }}
                    </h4>
                </div>
                <div class="accent-divider q-mb-md"></div>
                <div class="row justify-between items-center">
                    <p class="text-subtitle1 text-grey-7 q-ma-none">
                        {{ $t('pages.imovelList.subtitle') }}
                    </p>
                    <div class="row q-gutter-sm">
                        <q-btn color="secondary" :label="$t('pages.imovelList.buttons.loadTestData')" icon="dataset"
                            @click="loadTestData" />
                        <q-btn color="primary" :label="$t('pages.imovelList.buttons.newProperty')" icon="add"
                            to="/imoveis/novo" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Filtros -->
        <q-card class="q-mb-md">
            <q-card-section>
                <div class="row q-col-gutter-md">
                    <!-- Busca -->
                    <div class="col-12 col-md-4">
                        <q-input v-model="filters.search" :label="$t('pages.imovelList.filters.search')" dense outlined
                            clearable debounce="300">
                            <template v-slot:append>
                                <q-icon name="search" />
                            </template>
                        </q-input>
                    </div>

                    <!-- Cidade -->
                    <div class="col-12 col-md-3">
                        <q-select v-model="filters.cidade" :options="cidadeOptions"
                            :label="$t('pages.imovelList.filters.cidade')" dense outlined clearable emit-value
                            map-options />
                    </div>

                    <!-- Faixa de Área -->
                    <div class="col-12 col-md-2">
                        <q-select v-model="filters.areaRange" :options="areaRangeOptions"
                            :label="$t('pages.imovelList.filters.areaRange')" dense outlined clearable emit-value
                            map-options />
                    </div>

                    <!-- Ordenação -->
                    <div class="col-12 col-md-3">
                        <q-select v-model="filters.sort" :options="sortOptions"
                            :label="$t('pages.imovelList.filters.sort')" dense outlined clearable emit-value map-options
                            :loading="loading" />
                    </div>
                </div>
            </q-card-section>
        </q-card>

        <!-- Feedback de carregamento de dados de teste -->
        <q-dialog v-model="testDataDialog">
            <q-card style="min-width: 350px">
                <q-card-section>
                    <div class="text-h6">{{ $t('pages.imovelList.messages.loadingTestData') }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    {{ $t('pages.imovelList.messages.loadingTestDataDesc') }}
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat :label="$t('pages.imovelList.buttons.cancel')" color="primary" v-close-popup />
                    <q-btn :label="$t('pages.imovelList.buttons.confirm')" color="primary" @click="confirmLoadTestData"
                        v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- Tabela para Desktop -->
        <div class="gt-sm">
            <q-table :rows="filteredImoveis" :columns="columns" row-key="Id" :loading="loading" :pagination="pagination"
                @request="onRequest" :rows-per-page-options="[10, 20, 50]" binary-state-sort>

                <!-- Slot para endereço -->
                <template v-slot:body-cell-endereco="props">
                    <q-td :props="props">
                        <div class="address-cell">
                            {{ formatEndereco(props.row.Endereco) }}
                        </div>
                    </q-td>
                </template>

                <!-- Slot para proprietário -->
                <template v-slot:body-cell-dono="props">
                    <q-td :props="props">
                        <div class="row items-center">
                            <q-avatar size="32px" color="primary" text-color="white">
                                {{ getInitials(props.row.Dono?.Nome, props.row.Dono?.Sobrenome) }}
                            </q-avatar>
                            <div class="q-ml-sm">
                                {{ props.row.Dono?.Nome }} {{ props.row.Dono?.Sobrenome }}
                            </div>
                        </div>
                    </q-td>
                </template>

                <!-- Slot para área -->
                <template v-slot:body-cell-areaTotal="props">
                    <q-td :props="props">
                        {{ props.row.AreaTotal }}m²
                    </q-td>
                </template>

                <!-- Slot para cômodos -->
                <template v-slot:body-cell-comodos="props">
                    <q-td :props="props">
                        <div class="row q-gutter-xs">
                            <q-chip dense size="sm" color="primary" text-color="white">
                                {{ props.row.TotalComodos }} total
                            </q-chip>
                            <q-chip dense size="sm" color="secondary" text-color="white">
                                {{ props.row.NumeroQuartos }} quartos
                            </q-chip>
                            <q-chip dense size="sm" color="accent" text-color="white">
                                {{ props.row.NumeroBanheiros }} banheiros
                            </q-chip>
                        </div>
                    </q-td>
                </template>

                <!-- Slot para observações -->
                <template v-slot:body-cell-observacao="props">
                    <q-td :props="props">
                        <div v-if="props.row.Observacao" class="observation-cell">
                            {{ props.row.Observacao }}
                        </div>
                        <div v-else class="text-grey-5">
                            -
                        </div>
                    </q-td>
                </template>

                <!-- Slot para ações -->
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn flat round color="primary" icon="edit" @click="editarImovel(props.row)">
                            <q-tooltip>{{ $t('pages.imovelList.buttons.edit') }}</q-tooltip>
                        </q-btn>
                        <q-btn flat round color="negative" icon="delete" @click="confirmarExclusao(props.row)">
                            <q-tooltip>{{ $t('pages.imovelList.buttons.delete') }}</q-tooltip>
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>

        <!-- Cards para mobile -->
        <div class="lt-md">
            <div class="row q-col-gutter-md">
                <div v-for="imovel in filteredImoveis" :key="imovel.Id" class="col-12">
                    <q-card flat bordered>
                        <q-card-section>
                            <div class="row items-center q-mb-md">
                                <q-icon name="home" size="32px" color="primary" class="q-mr-md" />
                                <div>
                                    <div class="text-weight-medium">
                                        {{ formatEndereco(imovel.Endereco) }}
                                    </div>
                                    <div class="text-caption text-grey-7">
                                        {{ imovel.AreaTotal }}m² - {{ imovel.TotalComodos }} cômodos
                                    </div>
                                </div>
                            </div>

                            <div class="q-gutter-y-sm">
                                <!-- Proprietário -->
                                <div class="row items-center">
                                    <q-icon name="person" size="sm" color="grey-7" class="q-mr-sm" />
                                    <q-avatar size="24px" color="primary" text-color="white" class="q-mr-sm">
                                        {{ getInitials(imovel.Dono?.Nome, imovel.Dono?.Sobrenome) }}
                                    </q-avatar>
                                    {{ imovel.Dono?.Nome }} {{ imovel.Dono?.Sobrenome }}
                                </div>

                                <!-- Detalhes dos cômodos -->
                                <div class="row items-center">
                                    <q-icon name="meeting_room" size="sm" color="grey-7" class="q-mr-sm" />
                                    <div class="row q-gutter-xs">
                                        <q-chip dense size="sm" color="primary" text-color="white">
                                            {{ imovel.NumeroQuartos }} quartos
                                        </q-chip>
                                        <q-chip dense size="sm" color="secondary" text-color="white">
                                            {{ imovel.NumeroBanheiros }} banheiros
                                        </q-chip>
                                        <q-chip dense size="sm" color="accent" text-color="white">
                                            {{ imovel.NumeroOutrosComodos }} outros
                                        </q-chip>
                                    </div>
                                </div>

                                <!-- Observações -->
                                <div v-if="imovel.Observacao" class="row items-start">
                                    <q-icon name="notes" size="sm" color="grey-7" class="q-mr-sm q-mt-xs" />
                                    <div class="text-caption">
                                        {{ imovel.Observacao }}
                                    </div>
                                </div>
                            </div>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions align="right">
                            <q-btn flat color="primary" icon="edit" :label="$t('pages.imovelList.buttons.edit')"
                                @click="editarImovel(imovel)" />
                            <q-btn flat color="negative" icon="delete" :label="$t('pages.imovelList.buttons.delete')"
                                @click="confirmarExclusao(imovel)" />
                        </q-card-actions>
                    </q-card>
                </div>
            </div>

            <!-- Paginação para mobile -->
            <div class="row justify-center q-mt-md">
                <q-pagination v-model="pagination.page"
                    :max="Math.ceil(filteredImoveis.length / pagination.rowsPerPage)" :max-pages="6"
                    :boundary-links="true" :direction-links="true" :input="true" />
            </div>
        </div>

        <!-- Diálogo de confirmação de exclusão -->
        <q-dialog v-model="dialogExclusao.show" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="warning" color="warning" text-color="white" />
                    <span class="q-ml-sm">{{ $t('pages.imovelList.deleteDialog.title') }}</span>
                </q-card-section>

                <q-card-section>
                    {{ $t('pages.imovelList.deleteDialog.message', {
                        endereco: dialogExclusao.imovel ? formatEndereco(dialogExclusao.imovel.Endereco) : ''
                    }) }}
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat :label="$t('pages.imovelList.buttons.cancel')" color="primary" v-close-popup />
                    <q-btn flat :label="$t('pages.imovelList.buttons.confirm')" color="negative" @click="excluirImovel"
                        v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
import { ref, computed, defineComponent, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { Imovel } from '../core/domain/entities/imovel'
import { Endereco } from '../core/domain/entities/endereco'
import { Cliente } from '../core/domain/entities/cliente'

export default defineComponent({
    name: 'ImovelListagemPage',
    setup() {
        const $q = useQuasar()
        const { t } = useI18n()

        const loading = ref(false)
        const testDataDialog = ref(false)
        const imoveis = ref([])

        const filters = ref({
            search: '',
            cidade: null,
            areaRange: null,
            sort: 'endereco'
        })

        const pagination = ref({
            page: 1,
            rowsPerPage: 20,
            rowsNumber: 0
        })

        const dialogExclusao = ref({
            show: false,
            imovel: null
        })

        // Opções para filtros
        const cidadeOptions = ref([])
        const areaRangeOptions = computed(() => [
            { label: t('pages.imovelList.areaRanges.small'), value: 'small' },
            { label: t('pages.imovelList.areaRanges.medium'), value: 'medium' },
            { label: t('pages.imovelList.areaRanges.large'), value: 'large' },
            { label: t('pages.imovelList.areaRanges.extraLarge'), value: 'extraLarge' }
        ])

        const sortOptions = computed(() => [
            { label: t('pages.imovelList.sortOptions.endereco'), value: 'endereco' },
            { label: t('pages.imovelList.sortOptions.area'), value: 'area' },
            { label: t('pages.imovelList.sortOptions.comodos'), value: 'comodos' },
            { label: t('pages.imovelList.sortOptions.proprietario'), value: 'proprietario' }
        ])

        // Colunas da tabela
        const columns = computed(() => [
            {
                name: 'endereco',
                required: true,
                label: t('pages.imovelList.table.endereco'),
                align: 'left',
                field: row => formatEndereco(row.Endereco),
                sortable: true
            },
            {
                name: 'areaTotal',
                align: 'center',
                label: t('pages.imovelList.table.area'),
                field: 'AreaTotal',
                sortable: true
            },
            {
                name: 'comodos',
                align: 'center',
                label: t('pages.imovelList.table.comodos'),
                field: 'TotalComodos',
                sortable: true
            },
            {
                name: 'dono',
                align: 'left',
                label: t('pages.imovelList.table.proprietario'),
                field: row => `${row.Dono?.Nome} ${row.Dono?.Sobrenome}`,
                sortable: true
            },
            {
                name: 'observacao',
                align: 'left',
                label: t('pages.imovelList.table.observacao'),
                field: 'Observacao',
                sortable: true
            },
            {
                name: 'actions',
                align: 'center',
                label: t('pages.imovelList.table.actions'),
                sortable: false
            }
        ])

        // Imóveis filtrados
        const filteredImoveis = computed(() => {
            let result = [...imoveis.value]

            // Filtro de busca
            if (filters.value.search) {
                const searchLower = filters.value.search.toLowerCase()
                result = result.filter(imovel => {
                    const endereco = formatEndereco(imovel.Endereco).toLowerCase()
                    const proprietario = `${imovel.Dono?.Nome} ${imovel.Dono?.Sobrenome}`.toLowerCase()
                    const observacao = (imovel.Observacao || '').toLowerCase()

                    return endereco.includes(searchLower) ||
                        proprietario.includes(searchLower) ||
                        observacao.includes(searchLower)
                })
            }

            // Filtro de cidade
            if (filters.value.cidade) {
                result = result.filter(imovel =>
                    imovel.Endereco.Cidade.toLowerCase() === filters.value.cidade.toLowerCase()
                )
            }

            // Filtro de faixa de área
            if (filters.value.areaRange) {
                result = result.filter(imovel => {
                    const area = imovel.AreaTotal
                    switch (filters.value.areaRange) {
                        case 'small': return area <= 50
                        case 'medium': return area > 50 && area <= 100
                        case 'large': return area > 100 && area <= 200
                        case 'extraLarge': return area > 200
                        default: return true
                    }
                })
            }

            // Ordenação
            if (filters.value.sort) {
                result.sort((a, b) => {
                    switch (filters.value.sort) {
                        case 'endereco':
                            return formatEndereco(a.Endereco).localeCompare(formatEndereco(b.Endereco))
                        case 'area':
                            return b.AreaTotal - a.AreaTotal
                        case 'comodos':
                            return b.TotalComodos - a.TotalComodos
                        case 'proprietario': {
                            const nomeA = `${a.Dono?.Nome} ${a.Dono?.Sobrenome}`
                            const nomeB = `${b.Dono?.Nome} ${b.Dono?.Sobrenome}`
                            return nomeA.localeCompare(nomeB)
                        }
                        default:
                            return 0
                    }
                })
            }

            return result
        })

        // Métodos
        const formatEndereco = (endereco) => {
            if (!endereco) return '-'
            return `${endereco.Logradouro}, ${endereco.Numero} - ${endereco.Bairro}, ${endereco.Cidade}/${endereco.Estado}`
        }

        const getInitials = (nome, sobrenome) => {
            const nomeInitial = nome ? nome.charAt(0).toUpperCase() : ''
            const sobrenomeInitial = sobrenome ? sobrenome.charAt(0).toUpperCase() : ''
            return nomeInitial + sobrenomeInitial
        }

        const editarImovel = (imovel) => {
            // Implementar navegação para edição
            console.log('Editar imóvel:', imovel)
            $q.notify({
                type: 'info',
                message: t('pages.imovelList.messages.editNotImplemented'),
                position: 'top'
            })
        }

        const confirmarExclusao = (imovel) => {
            dialogExclusao.value.imovel = imovel
            dialogExclusao.value.show = true
        }

        const excluirImovel = () => {
            const index = imoveis.value.findIndex(i => i.Id === dialogExclusao.value.imovel.Id)
            if (index !== -1) {
                imoveis.value.splice(index, 1)
                $q.notify({
                    type: 'positive',
                    message: t('pages.imovelList.messages.deleteSuccess'),
                    position: 'top'
                })
            }
            dialogExclusao.value.imovel = null
        }

        const loadTestData = () => {
            testDataDialog.value = true
        }

        const confirmLoadTestData = () => {
            loading.value = true

            // Criar dados de teste
            const clientesMock = [
                new Cliente('João', 'Silva', 'joao@email.com', '(11) 99999-9999', '(11) 99999-9999'),
                new Cliente('Maria', 'Santos', 'maria@email.com', '(11) 88888-8888', '(11) 88888-8888'),
                new Cliente('Pedro', 'Oliveira', 'pedro@email.com', '(11) 77777-7777', '(11) 77777-7777'),
                new Cliente('Ana', 'Costa', 'ana@email.com', '(11) 66666-6666', '(11) 66666-6666')
            ]

            const enderecosMock = [
                new Endereco('Rua das Flores', '123', 'Apto 45', 'Jardim das Rosas', 'São Paulo', 'SP', '01234-567', 'Brasil'),
                new Endereco('Avenida Principal', '456', '', 'Centro', 'Rio de Janeiro', 'RJ', '20000-123', 'Brasil'),
                new Endereco('Rua da Paz', '789', 'Casa 2', 'Vila Esperança', 'Belo Horizonte', 'MG', '30000-456', 'Brasil'),
                new Endereco('Alameda dos Ipês', '321', 'Cobertura', 'Alto da Boa Vista', 'Curitiba', 'PR', '80000-789', 'Brasil'),
                new Endereco('Rua do Comércio', '654', '', 'Comercial', 'Porto Alegre', 'RS', '90000-012', 'Brasil')
            ]

            const imoveisMock = [
                new Imovel(8, 3, 2, 120, enderecosMock[0], clientesMock[0], 'Casa ampla com quintal'),
                new Imovel(5, 2, 1, 75, enderecosMock[1], clientesMock[1], 'Apartamento bem localizado'),
                new Imovel(10, 4, 3, 180, enderecosMock[2], clientesMock[2], 'Casa de alto padrão'),
                new Imovel(3, 1, 1, 45, enderecosMock[3], clientesMock[3], 'Studio moderno'),
                new Imovel(6, 2, 2, 90, enderecosMock[4], clientesMock[0], 'Apartamento familiar')
            ]

            setTimeout(() => {
                imoveis.value = imoveisMock

                // Extrair cidades únicas para o filtro
                const cidades = [...new Set(imoveisMock.map(i => i.Endereco.Cidade))]
                cidadeOptions.value = cidades.map(cidade => ({
                    label: cidade,
                    value: cidade
                }))

                loading.value = false
                $q.notify({
                    type: 'positive',
                    message: t('pages.imovelList.messages.testDataLoaded'),
                    position: 'top'
                })
            }, 1000)
        }

        const onRequest = (props) => {
            pagination.value = props.pagination
        }

        // Watchers
        watch(() => filters.value, () => {
            pagination.value.page = 1
        }, { deep: true })

        onMounted(() => {
            // Carregar dados iniciais se necessário
        })

        return {
            loading,
            testDataDialog,
            imoveis,
            filters,
            pagination,
            dialogExclusao,
            cidadeOptions,
            areaRangeOptions,
            sortOptions,
            columns,
            filteredImoveis,
            formatEndereco,
            getInitials,
            editarImovel,
            confirmarExclusao,
            excluirImovel,
            loadTestData,
            confirmLoadTestData,
            onRequest
        }
    }
})
</script>

<style lang="sass" scoped>
.address-cell
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  max-width: 250px

.observation-cell
  max-width: 200px
  word-wrap: break-word
  white-space: normal
  line-height: 1.3
</style>
