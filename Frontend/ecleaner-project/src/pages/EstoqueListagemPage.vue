<template>
    <q-page padding>
        <div class="q-pa-md">
            <div class="row items-center q-mb-md">
                <div class="col">
                    <h4 class="q-my-none">Controle de Estoque</h4>
                    <p class="text-grey-7">Gerencie o estoque de materiais de limpeza</p>
                </div>
            </div>

            <!-- Filtros e Busca -->
            <q-card flat bordered class="q-mb-md">
                <q-card-section>
                    <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-6">
                            <q-input v-model="filtro.busca" outlined dense placeholder="Buscar por descrição..."
                                clearable>
                                <template #prepend>
                                    <q-icon name="search" />
                                </template>
                            </q-input>
                        </div>
                        <div class="col-12 col-md-3">
                            <q-select v-model="filtro.status" :options="opcoesStatus" outlined dense
                                label="Status do Estoque" emit-value map-options />
                        </div>
                        <div class="col-12 col-md-3">
                            <q-select v-model="filtro.unidade" :options="opcoesUnidades" outlined dense label="Unidade"
                                clearable />
                        </div>
                    </div>
                </q-card-section>
            </q-card>

            <!-- Estatísticas -->
            <div class="row q-col-gutter-md q-mb-md">
                <div class="col-12 col-sm-6 col-md-3">
                    <q-card flat bordered>
                        <q-card-section>
                            <div class="text-h6">{{ estatisticas.total }}</div>
                            <div class="text-grey-7">Total de Itens</div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                    <q-card flat bordered>
                        <q-card-section>
                            <div class="text-h6 text-green">{{ estatisticas.normal }}</div>
                            <div class="text-grey-7">Estoque Normal</div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                    <q-card flat bordered>
                        <q-card-section>
                            <div class="text-h6 text-orange">{{ estatisticas.baixo }}</div>
                            <div class="text-grey-7">Estoque Baixo</div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                    <q-card flat bordered>
                        <q-card-section>
                            <div class="text-h6 text-red">{{ estatisticas.zerado }}</div>
                            <div class="text-grey-7">Estoque Zerado</div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>

            <!-- Tabela de Estoque -->
            <q-card flat bordered>
                <q-table :rows="materiaisFiltrados" :columns="colunas" row-key="Id" :pagination="{ rowsPerPage: 10 }"
                    :loading="carregando" flat>
                    <template #body-cell-imagem="props">
                        <q-td :props="props">
                            <q-avatar size="50px" square>
                                <img v-if="props.row.Imagem" :src="props.row.Imagem" alt="Produto" />
                                <q-icon v-else name="inventory_2" size="30px" color="grey-5" />
                            </q-avatar>
                        </q-td>
                    </template>

                    <template #body-cell-descricao="props">
                        <q-td :props="props">
                            <div class="text-weight-medium">{{ props.row.Descricao }}</div>
                            <div class="text-caption text-grey-7">{{ props.row.Unidade }}</div>
                        </q-td>
                    </template>

                    <template #body-cell-precoUnitario="props">
                        <q-td :props="props">
                            {{ formatarMoeda(props.row.PrecoUnitario) }}
                        </q-td>
                    </template>

                    <template #body-cell-quantidadeEstoque="props">
                        <q-td :props="props">
                            <q-badge :color="getCorEstoque(props.row)" :label="props.row.QuantidadeEstoque"
                                class="q-px-sm" />
                        </q-td>
                    </template>

                    <template #body-cell-status="props">
                        <q-td :props="props">
                            <q-chip :color="getCorStatusEstoque(props.row)" text-color="white" dense size="sm">
                                {{ getStatusEstoque(props.row) }}
                            </q-chip>
                        </q-td>
                    </template>

                    <template #body-cell-valorTotal="props">
                        <q-td :props="props">
                            <div class="text-weight-medium">
                                {{ formatarMoeda(props.row.QuantidadeEstoque * props.row.PrecoUnitario) }}
                            </div>
                        </q-td>
                    </template>

                    <template #body-cell-acoes="props">
                        <q-td :props="props">
                            <q-btn flat dense round icon="add_circle" color="green" size="sm"
                                @click="abrirDialogEntrada(props.row)">
                                <q-tooltip>Entrada</q-tooltip>
                            </q-btn>
                            <q-btn flat dense round icon="remove_circle" color="red" size="sm"
                                @click="abrirDialogSaida(props.row)">
                                <q-tooltip>Saída</q-tooltip>
                            </q-btn>
                            <q-btn flat dense round icon="groups" color="blue" size="sm"
                                @click="abrirDialogAtribuicao(props.row)">
                                <q-tooltip>Atribuir para Equipe</q-tooltip>
                            </q-btn>
                            <q-btn flat dense round icon="edit" color="primary" size="sm"
                                @click="abrirDialogEdicao(props.row)">
                                <q-tooltip>Editar</q-tooltip>
                            </q-btn>
                        </q-td>
                    </template>
                </q-table>
            </q-card>
        </div>

        <!-- Dialog Entrada de Estoque -->
        <q-dialog v-model="dialogEntrada.aberto" persistent>
            <q-card style="min-width: 400px">
                <q-card-section class="bg-green text-white">
                    <div class="text-h6">Entrada de Estoque</div>
                    <div class="text-subtitle2">{{ dialogEntrada.material?.Descricao }}</div>
                </q-card-section>

                <q-card-section>
                    <div class="q-mb-md">
                        <div class="text-caption text-grey-7">Estoque Atual</div>
                        <div class="text-h6">{{ dialogEntrada.material?.QuantidadeEstoque }} {{
                            dialogEntrada.material?.Unidade
                        }}</div>
                    </div>

                    <q-input v-model.number="dialogEntrada.quantidade" type="number" label="Quantidade a Adicionar"
                        outlined min="1" autofocus :rules="[val => val > 0 || 'Quantidade deve ser maior que zero']" />

                    <q-input v-model="dialogEntrada.observacao" type="textarea" label="Observação (opcional)" outlined
                        rows="3" class="q-mt-md" />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancelar" color="grey-7" v-close-popup />
                    <q-btn label="Confirmar Entrada" color="green" @click="confirmarEntrada"
                        :disable="!dialogEntrada.quantidade || dialogEntrada.quantidade <= 0" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- Dialog Saída de Estoque -->
        <q-dialog v-model="dialogSaida.aberto" persistent>
            <q-card style="min-width: 400px">
                <q-card-section class="bg-red text-white">
                    <div class="text-h6">Saída de Estoque</div>
                    <div class="text-subtitle2">{{ dialogSaida.material?.Descricao }}</div>
                </q-card-section>

                <q-card-section>
                    <div class="q-mb-md">
                        <div class="text-caption text-grey-7">Estoque Atual</div>
                        <div class="text-h6">{{ dialogSaida.material?.QuantidadeEstoque }} {{
                            dialogSaida.material?.Unidade }}
                        </div>
                    </div>

                    <q-input v-model.number="dialogSaida.quantidade" type="number" label="Quantidade a Remover" outlined
                        min="1" :max="dialogSaida.material?.QuantidadeEstoque" autofocus :rules="[
                            val => val > 0 || 'Quantidade deve ser maior que zero',
                            val => val <= (dialogSaida.material?.QuantidadeEstoque || 0) || 'Quantidade maior que o estoque disponível'
                        ]" />

                    <q-input v-model="dialogSaida.observacao" type="textarea" label="Observação (opcional)" outlined
                        rows="3" class="q-mt-md" />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancelar" color="grey-7" v-close-popup />
                    <q-btn label="Confirmar Saída" color="red" @click="confirmarSaida"
                        :disable="!dialogSaida.quantidade || dialogSaida.quantidade <= 0 || dialogSaida.quantidade > (dialogSaida.material?.QuantidadeEstoque || 0)" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- Dialog Edição de Estoque -->
        <q-dialog v-model="dialogEdicao.aberto" persistent>
            <q-card style="min-width: 500px">
                <q-card-section class="bg-primary text-white">
                    <div class="text-h6">Editar Material</div>
                </q-card-section>

                <q-card-section>
                    <q-input v-model="dialogEdicao.material.Descricao" label="Descrição" outlined readonly
                        class="q-mb-md" />

                    <div class="row q-col-gutter-md">
                        <div class="col-6">
                            <q-input v-model.number="dialogEdicao.material.QuantidadeEstoque" type="number"
                                label="Quantidade em Estoque" outlined min="0" />
                        </div>
                        <div class="col-6">
                            <q-input v-model.number="dialogEdicao.material.EstoqueMinimo" type="number"
                                label="Estoque Mínimo" outlined min="0" />
                        </div>
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancelar" color="grey-7" v-close-popup />
                    <q-btn label="Salvar" color="primary" @click="confirmarEdicao" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- Dialog Atribuição para Equipe -->
        <q-dialog v-model="dialogAtribuicao.aberto" persistent>
            <q-card style="min-width: 500px">
                <q-card-section class="bg-blue text-white">
                    <div class="text-h6">Atribuir Material para Equipe</div>
                    <div class="text-subtitle2">{{ dialogAtribuicao.material?.Descricao }}</div>
                </q-card-section>

                <q-card-section>
                    <div class="q-mb-md">
                        <div class="text-caption text-grey-7">Estoque Disponível</div>
                        <div class="text-h6">{{ dialogAtribuicao.material?.QuantidadeEstoque }} {{
                            dialogAtribuicao.material?.Unidade }}
                        </div>
                    </div>

                    <q-select v-model="dialogAtribuicao.equipe" :options="equipes" option-label="Descricao"
                        option-value="Id" label="Selecione a Equipe" outlined map-options emit-value
                        :rules="[val => !!val || 'Selecione uma equipe']" class="q-mb-md">
                        <template #option="scope">
                            <q-item v-bind="scope.itemProps">
                                <q-item-section avatar>
                                    <q-avatar :style="{ backgroundColor: scope.opt.Cor || '#1976D2' }"
                                        text-color="white" size="32px">
                                        <q-icon name="groups" />
                                    </q-avatar>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{ scope.opt.Descricao }}</q-item-label>
                                    <q-item-label caption>{{ scope.opt.Colaboradores?.length || 0 }} colaboradores
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </template>
                    </q-select>

                    <q-input v-model.number="dialogAtribuicao.quantidade" type="number" label="Quantidade a Atribuir"
                        outlined min="1" :max="dialogAtribuicao.material?.QuantidadeEstoque" autofocus :rules="[
                            val => val > 0 || 'Quantidade deve ser maior que zero',
                            val => val <= (dialogAtribuicao.material?.QuantidadeEstoque || 0) || 'Quantidade maior que o estoque disponível'
                        ]" class="q-mb-md" />

                    <q-input v-model="dialogAtribuicao.observacao" type="textarea" label="Observação (opcional)"
                        outlined rows="3" />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancelar" color="grey-7" v-close-popup />
                    <q-btn label="Confirmar Atribuição" color="blue" @click="confirmarAtribuicao"
                        :disable="!dialogAtribuicao.equipe || !dialogAtribuicao.quantidade || dialogAtribuicao.quantidade <= 0 || dialogAtribuicao.quantidade > (dialogAtribuicao.material?.QuantidadeEstoque || 0)" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { MaterialRepository } from '../core/infrastructure/repositories/materialRepository'
import { EquipeRepository } from '../core/infrastructure/repositories/equipeRepository'
import { AtribuicaoMaterialRepository } from '../core/infrastructure/repositories/atribuicaoMaterialRepository'
import { AtribuicaoMaterial } from '../core/domain/entities/atribuicaoMaterial'

const $q = useQuasar()
const materialRepository = new MaterialRepository()
const equipeRepository = new EquipeRepository()
const atribuicaoRepository = new AtribuicaoMaterialRepository()

const materiais = ref([])
const equipes = ref([])
const carregando = ref(false)

const filtro = ref({
    busca: '',
    status: 'todos',
    unidade: null,
})

const dialogEntrada = ref({
    aberto: false,
    material: null,
    quantidade: null,
    observacao: '',
})

const dialogSaida = ref({
    aberto: false,
    material: null,
    quantidade: null,
    observacao: '',
})

const dialogEdicao = ref({
    aberto: false,
    material: {
        Descricao: '',
        QuantidadeEstoque: 0,
        EstoqueMinimo: 0,
    },
})

const dialogAtribuicao = ref({
    aberto: false,
    material: null,
    equipe: null,
    quantidade: null,
    observacao: '',
})

const opcoesStatus = [
    { label: 'Todos', value: 'todos' },
    { label: 'Estoque Normal', value: 'normal' },
    { label: 'Estoque Baixo', value: 'baixo' },
    { label: 'Estoque Zerado', value: 'zerado' },
]

const opcoesUnidades = computed(() => {
    const unidades = [...new Set(materiais.value.map((m) => m.Unidade))]
    return unidades.sort()
})

const colunas = [
    {
        name: 'imagem',
        label: '',
        field: 'Imagem',
        align: 'center',
        style: 'width: 70px',
    },
    {
        name: 'descricao',
        label: 'Material',
        field: 'Descricao',
        align: 'left',
        sortable: true,
    },
    {
        name: 'precoUnitario',
        label: 'Preço Unit.',
        field: 'PrecoUnitario',
        align: 'right',
        sortable: true,
    },
    {
        name: 'quantidadeEstoque',
        label: 'Qtd. Estoque',
        field: 'QuantidadeEstoque',
        align: 'center',
        sortable: true,
    },
    {
        name: 'estoqueMinimo',
        label: 'Estoque Mín.',
        field: 'EstoqueMinimo',
        align: 'center',
        sortable: true,
    },
    {
        name: 'status',
        label: 'Status',
        align: 'center',
    },
    {
        name: 'valorTotal',
        label: 'Valor Total',
        align: 'right',
        sortable: true,
    },
    {
        name: 'acoes',
        label: 'Ações',
        align: 'center',
    },
]

const materiaisFiltrados = computed(() => {
    let resultado = materiais.value

    // Filtro por busca
    if (filtro.value.busca) {
        const busca = filtro.value.busca.toLowerCase()
        resultado = resultado.filter((m) => m.Descricao.toLowerCase().includes(busca))
    }

    // Filtro por unidade
    if (filtro.value.unidade) {
        resultado = resultado.filter((m) => m.Unidade === filtro.value.unidade)
    }

    // Filtro por status
    if (filtro.value.status !== 'todos') {
        resultado = resultado.filter((m) => {
            const status = getStatusEstoque(m).toLowerCase()
            return status.includes(filtro.value.status)
        })
    }

    return resultado
})

const estatisticas = computed(() => {
    return {
        total: materiais.value.length,
        normal: materiais.value.filter((m) => m.QuantidadeEstoque >= m.EstoqueMinimo && m.QuantidadeEstoque > 0).length,
        baixo: materiais.value.filter((m) => m.QuantidadeEstoque > 0 && m.QuantidadeEstoque < m.EstoqueMinimo).length,
        zerado: materiais.value.filter((m) => m.QuantidadeEstoque === 0).length,
    }
})

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(valor)
}

function getStatusEstoque(material) {
    if (material.QuantidadeEstoque === 0) return 'Zerado'
    if (material.QuantidadeEstoque < material.EstoqueMinimo) return 'Baixo'
    return 'Normal'
}

function getCorStatusEstoque(material) {
    const status = getStatusEstoque(material)
    if (status === 'Zerado') return 'red'
    if (status === 'Baixo') return 'orange'
    return 'green'
}

function getCorEstoque(material) {
    const status = getStatusEstoque(material)
    if (status === 'Zerado') return 'red-2'
    if (status === 'Baixo') return 'orange-2'
    return 'green-2'
}

function abrirDialogEntrada(material) {
    dialogEntrada.value = {
        aberto: true,
        material: { ...material },
        quantidade: null,
        observacao: '',
    }
}

function abrirDialogSaida(material) {
    dialogSaida.value = {
        aberto: true,
        material: { ...material },
        quantidade: null,
        observacao: '',
    }
}

function abrirDialogEdicao(material) {
    dialogEdicao.value = {
        aberto: true,
        material: { ...material },
    }
}

function abrirDialogAtribuicao(material) {
    dialogAtribuicao.value = {
        aberto: true,
        material: { ...material },
        equipe: null,
        quantidade: null,
        observacao: '',
    }
}

async function confirmarEntrada() {
    try {
        const material = materiais.value.find((m) => m.Id === dialogEntrada.value.material.Id)
        if (!material) return

        material.adicionarEstoque(dialogEntrada.value.quantidade)
        await materialRepository.save(material)

        $q.notify({
            type: 'positive',
            message: `Entrada de ${dialogEntrada.value.quantidade} ${material.Unidade} registrada com sucesso!`,
            position: 'top',
        })

        dialogEntrada.value.aberto = false
    } catch (error) {
        $q.notify({
            type: 'negative',
            message: error.message || 'Erro ao registrar entrada',
            position: 'top',
        })
    }
}

async function confirmarSaida() {
    try {
        const material = materiais.value.find((m) => m.Id === dialogSaida.value.material.Id)
        if (!material) return

        material.removerEstoque(dialogSaida.value.quantidade)
        await materialRepository.save(material)

        $q.notify({
            type: 'positive',
            message: `Saída de ${dialogSaida.value.quantidade} ${material.Unidade} registrada com sucesso!`,
            position: 'top',
        })

        dialogSaida.value.aberto = false
    } catch (error) {
        $q.notify({
            type: 'negative',
            message: error.message || 'Erro ao registrar saída',
            position: 'top',
        })
    }
}

async function confirmarEdicao() {
    try {
        const material = materiais.value.find((m) => m.Id === dialogEdicao.value.material.Id)
        if (!material) return

        material.QuantidadeEstoque = dialogEdicao.value.material.QuantidadeEstoque
        material.EstoqueMinimo = dialogEdicao.value.material.EstoqueMinimo
        await materialRepository.save(material)

        $q.notify({
            type: 'positive',
            message: 'Material atualizado com sucesso!',
            position: 'top',
        })

        dialogEdicao.value.aberto = false
    } catch {
        $q.notify({
            type: 'negative',
            message: 'Erro ao atualizar material',
            position: 'top',
        })
    }
}

async function carregarMateriais() {
    carregando.value = true
    try {
        materiais.value = await materialRepository.getAll()
        equipes.value = await equipeRepository.getAll()
    } catch {
        $q.notify({
            type: 'negative',
            message: 'Erro ao carregar materiais',
            position: 'top',
        })
    } finally {
        carregando.value = false
    }
}

async function confirmarAtribuicao() {
    try {
        const material = materiais.value.find((m) => m.Id === dialogAtribuicao.value.material.Id)
        if (!material) return

        const equipe = equipes.value.find((e) => e.Id === dialogAtribuicao.value.equipe)
        if (!equipe) return

        // Remove do estoque
        material.removerEstoque(dialogAtribuicao.value.quantidade)
        await materialRepository.save(material)

        // Cria a atribuição
        const atribuicao = new AtribuicaoMaterial(
            material.Id,
            equipe.Id,
            dialogAtribuicao.value.quantidade,
            new Date(),
            dialogAtribuicao.value.observacao
        )
        await atribuicaoRepository.save(atribuicao)

        $q.notify({
            type: 'positive',
            message: `${dialogAtribuicao.value.quantidade} ${material.Unidade} de "${material.Descricao}" atribuído(s) para equipe "${equipe.Descricao}"`,
            position: 'top',
        })

        dialogAtribuicao.value.aberto = false
    } catch (error) {
        $q.notify({
            type: 'negative',
            message: error.message || 'Erro ao atribuir material',
            position: 'top',
        })
    }
}

onMounted(() => {
    carregarMateriais()
})
</script>
