<template>
  <q-page class="q-pa-lg">
    <!-- Cabeçalho Moderno da Página -->
    <div class="modern-header q-mb-xl">
      <div class="header-content">
        <div class="row items-center justify-between">
          <div class="col-12 col-md-8">
            <div class="header-main">
              <div class="icon-wrapper">
                <div class="icon-background">
                  <q-icon name="dashboard" size="2.5rem" class="header-icon" />
                </div>
                <div class="icon-glow"></div>
              </div>
              <div class="header-text">
                <h3 class="header-title">
                  {{ $t('indexPage.title') || 'Dashboard' }}
                  <span class="title-accent">eCleannear</span>
                </h3>
                <p class="header-subtitle">
                  {{ $t('indexPage.overview') || 'Visão geral do sistema' }}
                </p>
                <div class="header-divider"></div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="stats-cards">
              <div class="stat-card primary">
                <div class="stat-icon">
                  <q-icon name="people" size="1.5rem" />
                </div>
                <div class="stat-content">
                  <div class="stat-number">{{ clientesCount }}</div>
                  <div class="stat-label">Clientes</div>
                </div>
              </div>
              <div class="stat-card secondary">
                <div class="stat-icon">
                  <q-icon name="badge" size="1.5rem" />
                </div>
                <div class="stat-content">
                  <div class="stat-number">{{ colaboradoresCount }}</div>
                  <div class="stat-label">Colaboradores</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid de Módulos Modernizado -->
    <div class="modules-section">
      <div class="section-header q-mb-lg">
        <h5 class="section-title">
          <q-icon name="apps" class="q-mr-sm" />
          {{ $t('indexPage.modules') || 'Módulos' }}
        </h5>
        <div class="section-divider"></div>
      </div>

      <div class="modules-grid">
        <div v-for="(card, index) in cardsModulos" :key="card.id" class="module-card-wrapper"
          :style="{ animationDelay: `${index * 0.1}s` }">
          <div class="module-card" @click="navegarPara(card.url)">
            <div class="module-icon-wrapper">
              <q-icon :name="card.icon" size="2rem" class="module-icon" />
            </div>
            <div class="module-label">{{ card.label }}</div>
            <div class="module-arrow">
              <q-icon name="arrow_forward" size="1rem" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de Ações Rápidas Modernizada -->
    <div class="actions-section">
      <div class="section-header q-mb-lg">
        <h5 class="section-title">
          <q-icon name="flash_on" class="q-mr-sm" />
          {{ $t('indexPage.quickActions') || 'Ações Rápidas' }}
        </h5>
        <div class="section-divider"></div>
      </div>

      <div class="actions-grid">
        <div v-for="(acao, index) in acoesRapidas" :key="acao.id" class="action-card-wrapper"
          :style="{ animationDelay: `${index * 0.05}s` }">
          <div class="action-card" @click="navegarPara(acao.route)">
            <div class="action-icon-wrapper">
              <q-icon :name="acao.icon" size="1.5rem" class="action-icon" />
            </div>
            <div class="action-label">{{ acao.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Action Button -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" class="floating-btn" @click="showQuickMenu = !showQuickMenu">
        <q-tooltip>Adicionar novo</q-tooltip>
      </q-btn>
    </q-page-sticky>

    <!-- Menu rápido flutuante -->
    <q-dialog v-model="showQuickMenu" position="bottom">
      <q-card class="quick-menu-card">
        <q-card-section>
          <div class="text-h6 q-mb-md">
            <q-icon name="add_circle_outline" class="q-mr-sm" />
            Criar Novo
          </div>
          <div class="row q-gutter-sm">
            <q-btn v-for="acao in acoesRapidas.slice(0, 4)" :key="acao.id" :icon="acao.icon" :label="acao.label"
              color="primary" outline size="sm" class="col" @click="navegarPara(acao.route); showQuickMenu = false" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { ClienteRepository } from '../core/infrastructure/repositories/clienteRepository'
import { ColaboradorRepository } from '../core/infrastructure/repositories/colaboradorRepository'
import { EquipeRepository } from '../core/infrastructure/repositories/equipeRepository'
import { ScheduleRepository } from '../core/infrastructure/repositories/scheduleRepository'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const router = useRouter()
    const { t } = useI18n()
    const showQuickMenu = ref(false)

    // Lista de cards principais
    const cardsModulos = ref([
      { id: 1, icon: 'person', label: t('indexPage.cards.clientes'), url: '/clientes' },
      { id: 2, icon: 'home', label: t('indexPage.cards.imoveis'), url: '/imoveis' },
      { id: 3, icon: 'badge', label: t('indexPage.cards.colaboradores'), url: '/colaboradores' },
      { id: 4, icon: 'groups', label: t('indexPage.cards.equipes'), url: '/equipes' },
      { id: 5, icon: 'cleaning_services', label: t('indexPage.cards.servicos'), url: '/servicos' },
      { id: 6, icon: 'inventory_2', label: t('indexPage.cards.materiais'), url: '/materiais' },
      { id: 7, icon: 'construction', label: t('indexPage.cards.equipamentos'), url: '/equipamentos' },
      { id: 8, icon: 'workspaces', label: t('indexPage.cards.pacotes'), url: '/pacotes-servicos' },
      { id: 9, icon: 'request_quote', label: t('indexPage.cards.orcamentos'), url: '/orcamentos' },
      { id: 10, icon: 'assignment', label: t('indexPage.cards.ordensServico'), url: '/ordens-servico' }
    ])

    // Lista de ações rápidas
    const acoesRapidas = ref([
      {
        id: 1,
        icon: 'person_add',
        label: t('indexPage.actions.novoCliente'),
        color: 'primary',
        route: '/clientes/novo'
      },
      {
        id: 2,
        icon: 'home_work',
        label: t('indexPage.actions.novoImovel'),
        color: 'primary',
        route: '/imoveis/novo'
      },
      {
        id: 3,
        icon: 'badge',
        label: t('indexPage.actions.novoColaborador'),
        color: 'primary',
        route: '/colaboradores/novo'
      },
      {
        id: 4,
        icon: 'group_add',
        label: t('indexPage.actions.novaEquipe'),
        color: 'primary',
        route: '/equipes/novo'
      },
      {
        id: 5,
        icon: 'request_quote',
        label: t('indexPage.actions.novoOrcamento'),
        color: 'primary',
        route: '/orcamentos/novo'
      },
      {
        id: 6,
        icon: 'cleaning_services',
        label: t('indexPage.actions.novoServico'),
        color: 'primary',
        route: '/servicos/novo'
      },
      {
        id: 7,
        icon: 'inventory_2',
        label: t('indexPage.actions.novoMaterial'),
        color: 'primary',
        route: '/materiais/novo'
      },
      {
        id: 8,
        icon: 'construction',
        label: t('indexPage.actions.novoEquipamento'),
        color: 'primary',
        route: '/equipamentos/novo'
      },
      {
        id: 9,
        icon: 'workspaces',
        label: t('indexPage.actions.novoPacote'),
        color: 'primary',
        route: '/pacotes-servicos/novo'
      },
      {
        id: 10,
        icon: 'assignment',
        label: t('indexPage.actions.novaOrdemServico'),
        color: 'primary',
        route: '/ordens-servico/novo'
      }
    ])

    // Função para navegar para uma rota
    const navegarPara = (route) => {
      router.push(route)
    }
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
      t,
      cardsModulos,
      acoesRapidas,
      navegarPara,
      clientesCount,
      colaboradoresCount,
      schedulesCount,
      equipesCount,
      servicosHojeCount,
      mediaAvaliacoes,
      novoServico,
      showQuickMenu,
    }
  },
})
</script>

<style lang="sass" scoped>
@use 'sass:color'

.q-page
  min-height: 100vh
  background: linear-gradient(135deg, $background-light 0%, color.scale($secondary, $lightness: 100%) 100%)

// Modern Header
.modern-header
  background: white
  border-radius: 20px
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06)
  overflow: hidden
  position: relative

  &::before
    content: ''
    position: absolute
    top: 0
    left: 0
    right: 0
    height: 4px
    background: linear-gradient(90deg, $primary, $secondary)

.header-content
  padding: 32px

.header-main
  display: flex
  align-items: center
  gap: 24px

.icon-wrapper
  position: relative
  display: flex
  align-items: center
  justify-content: center

.icon-background
  width: 80px
  height: 80px
  border-radius: 20px
  background: linear-gradient(135deg, $primary, color.scale($primary, $lightness: 19.2452830189%))
  display: flex
  align-items: center
  justify-content: center
  position: relative
  z-index: 2
  box-shadow: 0 8px 24px rgba($primary, 0.3)

.icon-glow
  position: absolute
  top: -4px
  left: -4px
  right: -4px
  bottom: -4px
  background: linear-gradient(135deg, $primary, $secondary)
  border-radius: 24px
  z-index: 1
  opacity: 0.2
  filter: blur(8px)

.header-icon
  color: white

.header-text
  flex: 1

.header-title
  font-size: 2.5rem
  font-weight: 700
  color: $secondary
  margin: 0 0 8px 0
  line-height: 1.2

.title-accent
  color: $primary
  font-weight: 300

.header-subtitle
  font-size: 1.1rem
  color: color.scale($secondary, $lightness: 30.0884955752%)
  margin: 0 0 16px 0
  font-weight: 400

.header-divider
  width: 80px
  height: 3px
  background: linear-gradient(90deg, $primary, $secondary)
  border-radius: 2px

// Stats Cards
.stats-cards
  display: flex
  flex-direction: column
  gap: 16px

.stat-card
  background: white
  border-radius: 16px
  padding: 20px
  display: flex
  align-items: center
  gap: 16px
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08)
  border: 2px solid transparent
  transition: all 0.3s ease
  position: relative
  overflow: hidden

  &::before
    content: ''
    position: absolute
    top: 0
    left: 0
    width: 4px
    height: 100%
    transition: all 0.3s ease

  &.primary
    &::before
      background: $primary

    &:hover
      border-color: rgba($primary, 0.2)
      transform: translateY(-2px)

    .stat-icon
      background: rgba($primary, 0.1)
      color: $primary

  &.secondary
    &::before
      background: $secondary

    &:hover
      border-color: rgba($secondary, 0.2)
      transform: translateY(-2px)

    .stat-icon
      background: rgba($secondary, 0.1)
      color: $secondary

.stat-icon
  width: 48px
  height: 48px
  border-radius: 12px
  display: flex
  align-items: center
  justify-content: center

.stat-content
  flex: 1

.stat-number
  font-size: 1.8rem
  font-weight: 700
  line-height: 1
  margin-bottom: 4px

.stat-label
  font-size: 0.9rem
  font-weight: 500
  opacity: 0.8
  text-transform: uppercase
  letter-spacing: 0.5px

// Stats Summary (fallback)
.stats-summary
  display: flex
  gap: 8px
  align-items: center

  @media (max-width: 768px)
    flex-direction: column
    align-items: flex-end

// Section Headers
.section-header
  text-align: center

.section-title
  color: $secondary
  font-weight: 600
  font-size: 1.5rem
  margin: 0 0 16px 0
  display: flex
  align-items: center
  justify-content: center

.section-divider
  height: 4px
  width: 60px
  background: linear-gradient(90deg, $primary, $secondary)
  border-radius: 2px
  margin: 0 auto

// Modules Grid
.modules-section
  margin-bottom: 40px

.modules-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))
  gap: 20px
  max-width: 1200px
  margin: 0 auto

.module-card-wrapper
  animation: slideInUp 0.6s ease-out forwards
  opacity: 0
  transform: translateY(30px)

.module-card
  background: white
  border-radius: 20px
  padding: 24px
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1)
  transition: all 0.3s ease
  cursor: pointer
  position: relative
  overflow: hidden
  border: 1px solid rgba($primary, 0.1)

  &::before
    content: ''
    position: absolute
    top: 0
    left: -100%
    width: 100%
    height: 100%
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)
    transition: left 0.6s ease

  &:hover
    transform: translateY(-8px) scale(1.02)
    box-shadow: 0 20px 40px rgba($primary, 0.2)

    &::before
      left: 100%

    .module-icon
      transform: scale(1.1) rotate(5deg)
      color: $primary

    .module-arrow
      transform: translateX(8px)
      opacity: 1

.module-icon-wrapper
  background: linear-gradient(135deg, $primary, $secondary)
  border-radius: 16px
  padding: 16px
  display: inline-flex
  margin-bottom: 16px
  position: relative
  z-index: 1

.module-icon
  color: white
  transition: all 0.3s ease

.module-label
  font-weight: 600
  color: $secondary
  font-size: 1.1rem
  margin-bottom: 8px
  position: relative
  z-index: 1

.module-arrow
  position: absolute
  top: 24px
  right: 24px
  opacity: 0
  transition: all 0.3s ease
  color: $primary

// Actions Grid
.actions-section
  margin-bottom: 40px

.actions-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr))
  gap: 16px
  max-width: 1000px
  margin: 0 auto

.action-card-wrapper
  animation: fadeInUp 0.4s ease-out forwards
  opacity: 0
  transform: translateY(20px)

.action-card
  background: white
  border-radius: 16px
  padding: 20px
  text-align: center
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08)
  transition: all 0.3s ease
  cursor: pointer
  border: 2px solid transparent

  &:hover
    transform: translateY(-4px)
    box-shadow: 0 15px 35px rgba($primary, 0.15)
    border-color: $primary

    .action-icon
      transform: scale(1.15)
      color: $primary

.action-icon-wrapper
  background: linear-gradient(135deg, color.scale($background-light, $lightness: 51%), color.scale($accent, $lightness: 73.9130434783%))
  border-radius: 12px
  padding: 12px
  display: inline-flex
  margin-bottom: 12px
  border: 1px solid color.scale($accent, $lightness: 60%)

.action-icon
  color: $accent
  transition: all 0.3s ease

.action-label
  font-weight: 500
  color: $secondary
  font-size: 0.95rem
  line-height: 1.3

// Floating Button
.floating-btn
  box-shadow: 0 8px 25px rgba($primary, 0.4) !important

  &:hover
    transform: scale(1.1)

// Quick Menu
.quick-menu-card
  border-radius: 16px
  border: none
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15)

// Animations
@keyframes slideInUp
  to
    opacity: 1
    transform: translateY(0)

@keyframes fadeInUp
  to
    opacity: 1
    transform: translateY(0)

// Responsive
@media (max-width: 768px)
  .header-content
    padding: 24px

  .header-main
    flex-direction: column
    text-align: center
    gap: 20px

  .header-title
    font-size: 2rem

  .stats-cards
    flex-direction: row
    justify-content: center
    margin-top: 20px

  .stat-card
    flex: 1
    min-width: 140px

  .modules-grid
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))
    gap: 16px

  .actions-grid
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr))
    gap: 12px

@media (max-width: 480px)
  .stats-cards
    flex-direction: column

  .modules-grid
    grid-template-columns: repeat(2, 1fr)

  .actions-grid
    grid-template-columns: repeat(2, 1fr)
</style>
