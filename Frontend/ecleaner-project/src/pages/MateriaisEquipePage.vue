<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row items-center q-mb-md">
        <div class="col">
          <h4 class="q-my-none">Materiais Atribuídos às Equipes</h4>
          <p class="text-grey-7">Visualize e gerencie os materiais distribuídos</p>
        </div>
      </div>

      <!-- Filtros -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-select v-model="filtroEquipe" :options="equipes" option-label="Descricao" option-value="Id"
                label="Filtrar por Equipe" outlined dense clearable
                :display-value="filtroEquipe ? equipes.find(e => e.Id === filtroEquipe)?.Descricao : ''"
                @update:model-value="(val) => filtroEquipe = val?.Id || val">
                <template #prepend>
                  <q-icon name="groups" />
                </template>
              </q-select>
            </div>
            <div class="col-12 col-md-4">
              <q-select v-model="filtroMaterial" :options="materiais" option-label="Descricao" option-value="Id"
                label="Filtrar por Material" outlined dense clearable
                :display-value="filtroMaterial ? materiais.find(m => m.Id === filtroMaterial)?.Descricao : ''"
                @update:model-value="(val) => filtroMaterial = val?.Id || val">
                <template #prepend>
                  <q-icon name="inventory_2" />
                </template>
              </q-select>
            </div>
            <div class="col-12 col-md-4">
              <q-select v-model="filtroStatus" :options="opcoesStatus" label="Status" outlined dense emit-value
                map-options />
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Cards por Equipe -->
      <div v-if="!filtroEquipe" class="row q-col-gutter-md">
        <div v-for="equipe in equipesComMateriais" :key="equipe.Id" class="col-12 col-md-6 col-lg-4">
          <q-card flat bordered>
            <q-card-section class="bg-primary text-white">
              <div class="row items-center">
                <q-avatar :style="{ backgroundColor: equipe.Cor || '#1976D2' }" text-color="white" size="40px"
                  class="q-mr-md">
                  <q-icon name="groups" />
                </q-avatar>
                <div class="col">
                  <div class="text-h6">{{ equipe.Descricao }}</div>
                  <div class="text-caption">{{ equipe.atribuicoes.length }} materiais atribuídos</div>
                </div>
              </div>
            </q-card-section>

            <q-list separator>
              <q-item v-for="atrib in equipe.atribuicoes" :key="atrib.Id">
                <q-item-section avatar>
                  <q-avatar size="40px" square>
                    <img v-if="atrib.material?.Imagem" :src="atrib.material.Imagem" alt="Material" />
                    <q-icon v-else name="inventory_2" size="24px" color="grey-5" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ atrib.material?.Descricao }}</q-item-label>
                  <q-item-label caption>
                    {{ atrib.getQuantidadeAtual() }} {{ atrib.material?.Unidade }} •
                    {{ formatarData(atrib.DataAtribuicao) }}
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-chip :color="getCorStatus(atrib)" text-color="white" dense size="sm">
                    {{ getStatusLabel(atrib) }}
                  </q-chip>
                </q-item-section>

                <q-item-section side>
                  <q-btn v-if="atrib.estaAtiva()" flat dense round icon="keyboard_return" color="orange" size="sm"
                    @click="abrirDialogDevolucao(atrib)">
                    <q-tooltip>Devolver</q-tooltip>
                  </q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </div>

      <!-- Tabela Detalhada -->
      <q-card v-else flat bordered>
        <q-table :rows="atribuicoesFiltradas" :columns="colunas" row-key="Id" :pagination="{ rowsPerPage: 10 }" flat>
          <template #body-cell-material="props">
            <q-td :props="props">
              <div class="row items-center">
                <q-avatar size="40px" square class="q-mr-sm">
                  <img v-if="props.row.material?.Imagem" :src="props.row.material.Imagem" alt="Material" />
                  <q-icon v-else name="inventory_2" size="24px" color="grey-5" />
                </q-avatar>
                <div>
                  <div class="text-weight-medium">{{ props.row.material?.Descricao }}</div>
                  <div class="text-caption text-grey-7">{{ props.row.material?.Unidade }}</div>
                </div>
              </div>
            </q-td>
          </template>

          <template #body-cell-equipe="props">
            <q-td :props="props">
              <q-chip :style="{ backgroundColor: props.row.equipe?.Cor || '#1976D2' }" text-color="white" icon="groups">
                {{ props.row.equipe?.Descricao }}
              </q-chip>
            </q-td>
          </template>

          <template #body-cell-quantidade="props">
            <q-td :props="props">
              <div class="text-weight-medium">{{ props.row.getQuantidadeAtual() }} / {{
                props.row.Quantidade }}</div>
              <div v-if="props.row.QuantidadeDevolvida > 0" class="text-caption text-grey-7">
                {{ props.row.QuantidadeDevolvida }} devolvido(s)
              </div>
            </q-td>
          </template>

          <template #body-cell-status="props">
            <q-td :props="props">
              <q-chip :color="getCorStatus(props.row)" text-color="white" dense>
                {{ getStatusLabel(props.row) }}
              </q-chip>
            </q-td>
          </template>

          <template #body-cell-data="props">
            <q-td :props="props">
              <div>{{ formatarData(props.row.DataAtribuicao) }}</div>
              <div v-if="props.row.DataDevolucao" class="text-caption text-grey-7">
                Devolvido: {{ formatarData(props.row.DataDevolucao) }}
              </div>
            </q-td>
          </template>

          <template #body-cell-acoes="props">
            <q-td :props="props">
              <q-btn v-if="props.row.estaAtiva()" flat dense round icon="keyboard_return" color="orange" size="sm"
                @click="abrirDialogDevolucao(props.row)">
                <q-tooltip>Devolver</q-tooltip>
              </q-btn>
              <q-btn flat dense round icon="info" color="grey-7" size="sm" @click="mostrarDetalhes(props.row)">
                <q-tooltip>Detalhes</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card>
    </div>

    <!-- Dialog Devolução -->
    <q-dialog v-model="dialogDevolucao.aberto" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="bg-orange text-white">
          <div class="text-h6">Devolução de Material</div>
          <div class="text-subtitle2">{{ dialogDevolucao.atribuicao?.material?.Descricao }}</div>
        </q-card-section>

        <q-card-section>
          <div class="q-mb-md">
            <div class="text-caption text-grey-7">Equipe</div>
            <div class="text-weight-medium">{{ dialogDevolucao.atribuicao?.equipe?.Descricao }}</div>
          </div>

          <div class="q-mb-md">
            <div class="text-caption text-grey-7">Quantidade com a Equipe</div>
            <div class="text-h6">
              {{ dialogDevolucao.atribuicao?.getQuantidadeAtual() }}
              {{ dialogDevolucao.atribuicao?.material?.Unidade }}
            </div>
          </div>

          <q-input v-model.number="dialogDevolucao.quantidade" type="number" label="Quantidade a Devolver" outlined
            min="1" :max="dialogDevolucao.atribuicao?.getQuantidadeAtual()" autofocus :rules="[
              val => val > 0 || 'Quantidade deve ser maior que zero',
              val => val <= (dialogDevolucao.atribuicao?.getQuantidadeAtual() || 0) || 'Quantidade maior que a disponível com a equipe'
            ]" />

          <q-input v-model="dialogDevolucao.observacao" type="textarea" label="Observação (opcional)" outlined rows="3"
            class="q-mt-md" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="grey-7" v-close-popup />
          <q-btn label="Confirmar Devolução" color="orange" @click="confirmarDevolucao"
            :disable="!dialogDevolucao.quantidade || dialogDevolucao.quantidade <= 0 || dialogDevolucao.quantidade > (dialogDevolucao.atribuicao?.getQuantidadeAtual() || 0)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { AtribuicaoMaterialRepository } from '../core/infrastructure/repositories/atribuicaoMaterialRepository'
import { MaterialRepository } from '../core/infrastructure/repositories/materialRepository'
import { EquipeRepository } from '../core/infrastructure/repositories/equipeRepository'

const $q = useQuasar()
const atribuicaoRepository = new AtribuicaoMaterialRepository()
const materialRepository = new MaterialRepository()
const equipeRepository = new EquipeRepository()

const atribuicoes = ref([])
const materiais = ref([])
const equipes = ref([])
const filtroEquipe = ref(null)
const filtroMaterial = ref(null)
const filtroStatus = ref('ativo')

const dialogDevolucao = ref({
  aberto: false,
  atribuicao: null,
  quantidade: null,
  observacao: '',
})

const opcoesStatus = [
  { label: 'Todos', value: 'todos' },
  { label: 'Ativos', value: 'ativo' },
  { label: 'Devolvidos', value: 'devolvido' },
]

const colunas = [
  {
    name: 'material',
    label: 'Material',
    align: 'left',
    field: 'MaterialId',
  },
  {
    name: 'equipe',
    label: 'Equipe',
    align: 'left',
    field: 'EquipeId',
  },
  {
    name: 'quantidade',
    label: 'Quantidade',
    align: 'center',
  },
  {
    name: 'data',
    label: 'Data',
    align: 'left',
  },
  {
    name: 'status',
    label: 'Status',
    align: 'center',
  },
  {
    name: 'acoes',
    label: 'Ações',
    align: 'center',
  },
]

const atribuicoesFiltradas = computed(() => {
  let resultado = atribuicoes.value.map((atrib) => {
    // Adiciona material e equipe sem perder os métodos da classe
    atrib.material = materiais.value.find((m) => m.Id === atrib.MaterialId)
    atrib.equipe = equipes.value.find((e) => e.Id === atrib.EquipeId)
    return atrib
  })

  if (filtroEquipe.value) {
    resultado = resultado.filter((a) => a.EquipeId === filtroEquipe.value)
  }

  if (filtroMaterial.value) {
    resultado = resultado.filter((a) => a.MaterialId === filtroMaterial.value)
  }

  if (filtroStatus.value === 'ativo') {
    resultado = resultado.filter((a) => a.estaAtiva())
  } else if (filtroStatus.value === 'devolvido') {
    resultado = resultado.filter((a) => a.Status === 'DEVOLVIDO_TOTAL')
  }

  return resultado
})

const equipesComMateriais = computed(() => {
  return equipes.value
    .map((equipe) => {
      const atribuicoesEquipe = atribuicoesFiltradas.value.filter(
        (a) => a.EquipeId === equipe.Id && a.estaAtiva()
      )
      return {
        ...equipe,
        atribuicoes: atribuicoesEquipe,
      }
    })
    .filter((e) => e.atribuicoes.length > 0)
})

function formatarData(data) {
  if (!data) return '-'
  return new Date(data).toLocaleDateString('pt-BR')
}

function getCorStatus(atribuicao) {
  if (atribuicao.Status === 'DEVOLVIDO_TOTAL') return 'grey'
  if (atribuicao.Status === 'DEVOLVIDO_PARCIAL') return 'orange'
  return 'green'
}

function getStatusLabel(atribuicao) {
  if (atribuicao.Status === 'DEVOLVIDO_TOTAL') return 'Devolvido'
  if (atribuicao.Status === 'DEVOLVIDO_PARCIAL') return 'Parcial'
  return 'Ativo'
}

function abrirDialogDevolucao(atribuicao) {
  const material = materiais.value.find((m) => m.Id === atribuicao.MaterialId)
  const equipe = equipes.value.find((e) => e.Id === atribuicao.EquipeId)

  dialogDevolucao.value = {
    aberto: true,
    atribuicao: { ...atribuicao, material, equipe },
    quantidade: null,
    observacao: '',
  }
}

async function confirmarDevolucao() {
  try {
    const atribuicao = atribuicoes.value.find(
      (a) => a.Id === dialogDevolucao.value.atribuicao.Id
    )
    if (!atribuicao) return

    const material = materiais.value.find((m) => m.Id === atribuicao.MaterialId)
    if (!material) return

    // Registra devolução
    atribuicao.registrarDevolucao(dialogDevolucao.value.quantidade)
    await atribuicaoRepository.save(atribuicao)

    // Devolve ao estoque
    material.adicionarEstoque(dialogDevolucao.value.quantidade)
    await materialRepository.save(material)

    $q.notify({
      type: 'positive',
      message: `Devolução de ${dialogDevolucao.value.quantidade} ${material.Unidade} registrada com sucesso!`,
      position: 'top',
    })

    dialogDevolucao.value.aberto = false
    await carregarDados()
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Erro ao registrar devolução',
      position: 'top',
    })
  }
}

function mostrarDetalhes(atribuicao) {
  const material = materiais.value.find((m) => m.Id === atribuicao.MaterialId)
  const equipe = equipes.value.find((e) => e.Id === atribuicao.EquipeId)

  $q.dialog({
    title: 'Detalhes da Atribuição',
    message: `
      <strong>Material:</strong> ${material?.Descricao}<br>
      <strong>Equipe:</strong> ${equipe?.Descricao}<br>
      <strong>Quantidade Atribuída:</strong> ${atribuicao.Quantidade} ${material?.Unidade}<br>
      <strong>Quantidade Atual:</strong> ${atribuicao.getQuantidadeAtual()} ${material?.Unidade}<br>
      <strong>Data Atribuição:</strong> ${formatarData(atribuicao.DataAtribuicao)}<br>
      ${atribuicao.Observacao ? `<strong>Observação:</strong> ${atribuicao.Observacao}` : ''}
    `,
    html: true,
  })
}

async function carregarDados() {
  try {
    atribuicoes.value = await atribuicaoRepository.getAll()
    materiais.value = await materialRepository.getAll()
    equipes.value = await equipeRepository.getAll()
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Erro ao carregar dados',
      position: 'top',
    })
  }
}

onMounted(() => {
  carregarDados()
})
</script>
