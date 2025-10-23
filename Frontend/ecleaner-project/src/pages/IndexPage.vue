<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho da Dashboard -->
    <div class="row items-center q-mb-xl">
      <div class="col">
        <div class="row items-center justify-between q-mb-sm">
          <div class="row items-center">
            <q-icon name="home" size="2rem" class="text-secondary q-mr-md" />
            <h4 class="text-h5 q-ma-none text-secondary">
              Home
            </h4>
          </div>
          <p class="text-subtitle1 text-grey-7 q-ma-none">
            {{ $t('indexPage.overview') }}
          </p>
        </div>
        <div class="accent-divider q-mb-md"></div>
      </div>
    </div>

    <!-- Grid de Panels -->

    <div id="ecleaner-home-panels" class="q-pa-md">
      <div class="row justify-center q-gutter-y-lg">
        <!-- Primeira linha - 3 cards -->
        <div class="col-6 col-sm-3 col-md-3 flex justify-center">
          <EcleanerCard icon="person" label="Clientes" url="/clientes" />
        </div>
        <div class="col-6 col-sm-3 col-md-3 flex justify-center">
          <EcleanerCard icon="home" label="Imóveis" url="/imoveis" />
        </div>
        <div class="col-6 col-sm-3 col-md-3 flex justify-center">
          <EcleanerCard icon="badge" label="Colaboradores" url="/colaboradores" />
        </div>

        <!-- Segunda linha - 3 cards -->
        <div class="col-6 col-sm-3 col-md-3 flex justify-center">
          <EcleanerCard icon="groups" label="Equipes" url="/equipes" />
        </div>
        <div class="col-6 col-sm-3 col-md-3 flex justify-center">
          <EcleanerCard icon="cleaning_services" label="Serviços" url="/servicos" />
        </div>
        <div class="col-6 col-sm-3 col-md-3 flex justify-center">
          <EcleanerCard icon="inventory_2" label="Materiais" url="/materiais" />
        </div>

        <!-- Terceira linha - 2 cards -->
        <div class="col-6 col-sm-3 col-md-3 flex justify-center">
          <EcleanerCard icon="workspaces" label="Pacotes" url="/pacotes-servicos" />
        </div>
        <div class="col-6 col-sm-3 col-md-3 flex justify-center">
          <EcleanerCard icon="request_quote" label="Orçamentos" url="/orcamentos" />
        </div>
      </div>
    </div>


    <!-- Seção de Ações Rápidas -->
    <div class="row q-mt-xl q-gutter-md">
      <div class="col-12">
        <h5 class="text-h5 text-weight-bold q-mb-lg text-grey-8">
          Ações Rápidas
        </h5>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-btn unelevated color="primary" size="lg" class="full-width q-pa-md" @click="$router.push('/clientes/novo')">
          <div class="column items-center">
            <q-icon name="person_add" size="2rem" class="q-mb-sm" />
            <div class="text-weight-medium">Novo Cliente</div>
          </div>
        </q-btn>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-btn unelevated color="orange" size="lg" class="full-width q-pa-md" @click="$router.push('/imoveis/novo')">
          <div class="column items-center">
            <q-icon name="home_work" size="2rem" class="q-mb-sm" />
            <div class="text-weight-medium">Novo Imóvel</div>
          </div>
        </q-btn>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-btn unelevated color="secondary" size="lg" class="full-width q-pa-md"
          @click="$router.push('/colaboradores/novo')">
          <div class="column items-center">
            <q-icon name="badge" size="2rem" class="q-mb-sm" />
            <div class="text-weight-medium">Novo Colaborador</div>
          </div>
        </q-btn>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-btn unelevated color="positive" size="lg" class="full-width q-pa-md" @click="$router.push('/equipes/novo')">
          <div class="column items-center">
            <q-icon name="group_add" size="2rem" class="q-mb-sm" />
            <div class="text-weight-medium">Nova Equipe</div>
          </div>
        </q-btn>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-btn unelevated color="teal" size="lg" class="full-width q-pa-md" @click="$router.push('/orcamentos/novo')">
          <div class="column items-center">
            <q-icon name="request_quote" size="2rem" class="q-mb-sm" />
            <div class="text-weight-medium">Novo Orçamento</div>
          </div>
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import EcleanerCard from '../components/EcleanerCard.vue'
import { ClienteRepository } from '../core/infrastructure/repositories/clienteRepository'
import { ColaboradorRepository } from '../core/infrastructure/repositories/colaboradorRepository'
import { EquipeRepository } from '../core/infrastructure/repositories/equipeRepository'
import { ScheduleRepository } from '../core/infrastructure/repositories/scheduleRepository'

export default defineComponent({
  name: 'IndexPage',
  components: {
    EcleanerCard
  },
  setup() {
    // Estados reativos para as contagens
    const clientesCount = ref(0)
    const colaboradoresCount = ref(0)
    const schedulesCount = ref(0)
    const equipesCount = ref(0)

    // Estados reativos para resumo do dia
    const servicosHojeCount = ref(3) // Valor fictício para layout
    const mediaAvaliacoes = ref(4.2) // Valor fictício para layout

    // Repositórios
    const clienteRepository = new ClienteRepository()
    const colaboradorRepository = new ColaboradorRepository()
    const equipeRepository = new EquipeRepository()
    const scheduleRepository = new ScheduleRepository()

    // Função para novo serviço
    const novoServico = () => {
      // TODO: Implementar navegação para novo serviço
      console.log('Navegando para novo serviço')
    }    // Função para carregar as contagens
    const loadCounts = async () => {
      try {
        // Carregar quantidade de clientes
        const clientes = await clienteRepository.getAll()
        clientesCount.value = clientes.length

        // Carregar quantidade de colaboradores
        const colaboradores = await colaboradorRepository.getAll()
        colaboradoresCount.value = colaboradores.length

        // Carregar quantidade de schedules
        const schedules = await scheduleRepository.getAll()
        schedulesCount.value = schedules.length

        // Carregar quantidade de equipes
        const equipes = await equipeRepository.getAll()
        equipesCount.value = equipes.length
      } catch (error) {
        console.error('Erro ao carregar contagens:', error)
        // Definir valores padrão em caso de erro
        clientesCount.value = 0
        colaboradoresCount.value = 0
        schedulesCount.value = 0
        equipesCount.value = 0
      }
    }

    // Carregar dados quando o componente for montado
    onMounted(() => {
      loadCounts()
    })

    return {
      clientesCount,
      colaboradoresCount,
      schedulesCount,
      equipesCount,
      servicosHojeCount,
      mediaAvaliacoes,
      novoServico,
    }
  },
})
</script>

<style lang="sass" scoped>
.resumo-dia-card
  border-radius: 12px
  border: 2px solid #e0e0e0
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)

  .q-card
    border-radius: 8px
    background: rgba(255, 255, 255, 0.8)
    backdrop-filter: blur(10px)
    transition: all 0.2s ease

    &:hover
      background: rgba(255, 255, 255, 0.95)
      transform: translateY(-2px)

.opacity-60
  opacity: 0.6
</style>
