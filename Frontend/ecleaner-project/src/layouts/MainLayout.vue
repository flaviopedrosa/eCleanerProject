<template>
  <q-layout view="hHh lpR fff">
    <q-header class="modern-header" elevated>
      <q-toolbar class="header-toolbar">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" class="menu-toggle-btn" />

        <q-toolbar-title class="header-brand">
          <div class="brand-container" @click="navigateToHome">
            <q-img src="~assets/ecleaner-negativo-icon.svg" alt="eCleannear Logo" class="brand-logo" contain />
            <div class="brand-text">
              <span class="brand-name">eCleannear</span>
              <span class="brand-tagline">Gestão Inteligente</span>
            </div>
          </div>
        </q-toolbar-title>

        <div class="header-actions">
          <q-btn flat round class="action-btn language-btn">
            <q-icon name="language" />
            <q-menu transition-show="jump-down" transition-hide="jump-up" class="modern-menu">
              <q-list class="language-menu">
                <q-item clickable v-close-popup @click="changeLanguage('pt-BR')" :active="currentLanguage === 'pt-BR'"
                  class="language-item">
                  <q-item-section avatar>
                    <q-icon name="flag" />
                  </q-item-section>
                  <q-item-section>Português</q-item-section>
                  <q-item-section side v-if="currentLanguage === 'pt-BR'">
                    <q-icon name="check" color="positive" />
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="changeLanguage('en-US')" :active="currentLanguage === 'en-US'"
                  class="language-item">
                  <q-item-section avatar>
                    <q-icon name="flag" />
                  </q-item-section>
                  <q-item-section>English</q-item-section>
                  <q-item-section side v-if="currentLanguage === 'en-US'">
                    <q-icon name="check" color="positive" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn flat round class="action-btn profile-btn">
            <q-avatar size="36px" class="profile-avatar">
              <img src="https://cdn.quasar.dev/img/avatar.png">
              <div class="avatar-border"></div>
            </q-avatar>

            <q-menu transition-show="jump-down" transition-hide="jump-up" class="modern-menu profile-menu">
              <q-list class="user-menu">
                <q-item clickable v-close-popup to="/perfil" class="menu-item">
                  <q-item-section avatar>
                    <q-icon name="account_circle" />
                  </q-item-section>
                  <q-item-section>{{ $t('menu.myAccount') }}</q-item-section>
                </q-item>

                <q-item clickable v-close-popup to="/configuracoes" class="menu-item">
                  <q-item-section avatar>
                    <q-icon name="settings" />
                  </q-item-section>
                  <q-item-section>{{ $t('menu.settings') }}</q-item-section>
                </q-item>

                <!-- Debug temporário -->
                <q-item clickable v-close-popup @click="debugAuth" class="menu-item debug-item">
                  <q-item-section avatar>
                    <q-icon name="bug_report" />
                  </q-item-section>
                  <q-item-section>Debug Auth</q-item-section>
                </q-item>

                <q-separator class="menu-separator" />

                <q-item clickable v-close-popup @click="logout" class="menu-item logout-item">
                  <q-item-section avatar>
                    <q-icon name="logout" />
                  </q-item-section>
                  <q-item-section>{{ $t('menu.logout') }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" class="modern-drawer" :width="280" bordered>
      <div class="drawer-header">
        <div class="drawer-brand">
          <q-icon name="dashboard" size="24px" class="drawer-icon" />
          <span class="drawer-title">Menu Principal</span>
        </div>
      </div>

      <q-list padding class="modern-nav-list">
        <q-item clickable v-ripple to="/" exact class="nav-item home-item">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>{{ $t('menu.home') }}</q-item-section>
        </q-item>

        <q-separator class="nav-separator" />

        <!-- Menu Pessoas -->
        <q-expansion-item icon="people" :label="$t('menu.pessoas.title')"
          :header-class="isInPessoasRoute ? 'text-primary nav-active' : 'nav-header'" class="nav-expansion">
          <!-- Submenu Clientes -->
          <q-list class="submenu modern-submenu">
            <q-expansion-item icon="groups" :label="$t('menu.pessoas.submenus.clients.title')"
              :header-class="isInClientsRoute ? 'text-primary submenu-active' : 'submenu-header'"
              class="submenu-expansion">
              <q-item clickable v-ripple to="/clientes/novo" class="submenu-item">
                <q-item-section avatar>
                  <q-icon name="add" />
                </q-item-section>
                <q-item-section>{{ $t('menu.pessoas.submenus.clients.new') }}</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/clientes" class="submenu-item">
                <q-item-section avatar>
                  <q-icon name="list" />
                </q-item-section>
                <q-item-section>{{ $t('menu.pessoas.submenus.clients.list') }}</q-item-section>
              </q-item>
            </q-expansion-item>

            <!-- Submenu Colaboradores -->
            <q-expansion-item icon="engineering" :label="$t('menu.pessoas.submenus.employees.title')"
              :header-class="isInEmployeesRoute ? 'text-primary submenu-active' : 'submenu-header'"
              class="submenu-expansion">
              <q-item clickable v-ripple to="/colaboradores/novo" class="submenu-item">
                <q-item-section avatar>
                  <q-icon name="add" />
                </q-item-section>
                <q-item-section>{{ $t('menu.pessoas.submenus.employees.new') }}</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/colaboradores" class="submenu-item">
                <q-item-section avatar>
                  <q-icon name="list" />
                </q-item-section>
                <q-item-section>{{ $t('menu.pessoas.submenus.employees.list') }}</q-item-section>
              </q-item>
            </q-expansion-item>

            <!-- Submenu Equipes -->
            <q-expansion-item icon="groups_2" :label="$t('menu.pessoas.submenus.teams.title')"
              :header-class="isInTeamsRoute ? 'text-primary submenu-active' : 'submenu-header'"
              class="submenu-expansion">
              <q-item clickable v-ripple to="/equipes/novo" class="submenu-item">
                <q-item-section avatar>
                  <q-icon name="add" />
                </q-item-section>
                <q-item-section>{{ $t('menu.pessoas.submenus.teams.new') }}</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/equipes" class="submenu-item">
                <q-item-section avatar>
                  <q-icon name="list" />
                </q-item-section>
                <q-item-section>{{ $t('menu.pessoas.submenus.teams.list') }}</q-item-section>
              </q-item>
            </q-expansion-item>

            <!-- Submenu Empresas -->
            <q-expansion-item icon="business" :label="$t('menu.pessoas.submenus.schedules.title')"
              :header-class="isInScheduleRoute ? 'text-primary submenu-active' : 'submenu-header'"
              class="submenu-expansion">
              <q-item clickable v-ripple to="/schedules/novo" class="submenu-item">
                <q-item-section avatar>
                  <q-icon name="add" />
                </q-item-section>
                <q-item-section>{{ $t('menu.pessoas.submenus.schedules.new') }}</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/schedules" class="submenu-item">
                <q-item-section avatar>
                  <q-icon name="list" />
                </q-item-section>
                <q-item-section>{{ $t('menu.pessoas.submenus.schedules.list') }}</q-item-section>
              </q-item>
            </q-expansion-item>
          </q-list>
        </q-expansion-item>

        <!-- Menu Serviços -->
        <q-expansion-item icon="build" :label="$t('menu.servicos.title')"
          :header-class="isInServicosRoute ? 'text-primary nav-active' : 'nav-header'" class="nav-expansion">
          <q-item clickable v-ripple to="/servicos/novo" class="nav-sub-item">
            <q-item-section avatar>
              <q-icon name="add" />
            </q-item-section>
            <q-item-section>{{ $t('menu.servicos.new') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/servicos" class="nav-sub-item">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>{{ $t('menu.servicos.list') }}</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Menu Pacotes de Serviços -->
        <q-expansion-item icon="inventory" :label="$t('menu.pacotesServicos.title')"
          :header-class="isInPacotesServicosRoute ? 'text-primary nav-active' : 'nav-header'" class="nav-expansion">
          <q-item clickable v-ripple to="/pacotes-servicos/novo" class="nav-sub-item">
            <q-item-section avatar>
              <q-icon name="add" />
            </q-item-section>
            <q-item-section>{{ $t('menu.pacotesServicos.new') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/pacotes-servicos" class="nav-sub-item">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>{{ $t('menu.pacotesServicos.list') }}</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Menu Materiais -->
        <q-expansion-item icon="category" :label="$t('menu.materiais.title')"
          :header-class="isInMateriaisRoute ? 'text-primary nav-active' : 'nav-header'" class="nav-expansion">
          <q-item clickable v-ripple to="/materiais/novo" class="nav-sub-item">
            <q-item-section avatar>
              <q-icon name="add" />
            </q-item-section>
            <q-item-section>{{ $t('menu.materiais.new') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/materiais" class="nav-sub-item">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>{{ $t('menu.materiais.list') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/estoque" class="nav-sub-item">
            <q-item-section avatar>
              <q-icon name="inventory" />
            </q-item-section>
            <q-item-section>Controle de Estoque</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/materiais-equipes" class="nav-sub-item">
            <q-item-section avatar>
              <q-icon name="how_to_reg" />
            </q-item-section>
            <q-item-section>Materiais das Equipes</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Menu Orçamentos -->
        <q-expansion-item icon="receipt_long" :label="$t('menu.orcamentos.title')"
          :header-class="isInOrcamentosRoute ? 'text-primary nav-active' : 'nav-header'" class="nav-expansion">
          <q-item clickable v-ripple to="/orcamentos/novo" class="nav-sub-item">
            <q-item-section avatar>
              <q-icon name="add" />
            </q-item-section>
            <q-item-section>{{ $t('menu.orcamentos.new') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/orcamentos" class="nav-sub-item">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>{{ $t('menu.orcamentos.list') }}</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Menu Contratos -->
        <q-item clickable v-ripple to="/contratos" class="nav-item">
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>
          <q-item-section>{{ $t('menu.contratos') }}</q-item-section>
        </q-item>

        <!-- Menu Ordens de Serviço -->
        <q-expansion-item icon="assignment_turned_in" :label="$t('menu.ordensServico.title')"
          :header-class="isInOrdensServicoRoute ? 'text-primary nav-active' : 'nav-header'" class="nav-expansion">
          <q-item clickable v-ripple to="/ordens-servico" class="nav-sub-item">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>{{ $t('menu.ordensServico.list') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/ordens-servico-programacao" class="nav-sub-item">
            <q-item-section avatar>
              <q-icon name="calendar_month" />
            </q-item-section>
            <q-item-section>Programação</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/ordens-servico-gantt" class="nav-sub-item">
            <q-item-section avatar>
              <q-icon name="view_timeline" />
            </q-item-section>
            <q-item-section>Gantt</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Menu Relatórios -->
        <q-expansion-item icon="analytics" label="Relatórios"
          :header-class="isInRelatoriosRoute ? 'text-primary nav-active' : 'nav-header'" class="nav-expansion">
          <q-item clickable v-ripple to="/relatorio-financeiro" class="nav-sub-item">
            <q-item-section avatar>
              <q-icon name="account_balance" />
            </q-item-section>
            <q-item-section>Relatório Financeiro</q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container class="modern-page-container">
      <router-view />
    </q-page-container>

    <q-footer class="modern-footer">
      <q-toolbar class="footer-toolbar">
        <q-toolbar-title class="footer-content">
          <div class="footer-brand">
            <q-avatar size="32px">
              <img src="~assets\ecleaner-negativo-icon.svg" alt="eCleannear Logo" style="width: 35px; height: auto;"
                contain>
            </q-avatar>
            <span class="footer-text">eCleannear © 2025 - Gestão Inteligente para Empresas de Limpeza</span>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<style lang="sass">
@use 'sass:color'

// === HEADER MODERNO ===
.modern-header
  position: relative
  background: linear-gradient(135deg, rgba($secondary, 0.95) 0%, rgba($primary, 0.98) 100%)
  border-bottom: 1px solid rgba(white, 0.1)
  box-shadow: 0 4px 20px rgba($secondary, 0.25)

.header-toolbar
  padding: 0 24px
  min-height: 70px

.menu-toggle-btn
  color: white
  margin-right: 16px
  border-radius: 12px
  transition: all 0.3s ease

  &:hover
    background: rgba(white, 0.2)
    color: white

.header-brand
  .brand-container
    display: flex
    align-items: center
    cursor: pointer
    transition: transform 0.3s ease

    &:hover
      transform: scale(1.02)

  .brand-logo
    width: 50px
    height: auto
    margin-right: 16px

  .brand-text
    display: flex
    flex-direction: column

  .brand-name
    font-size: 1.8rem
    font-weight: 700
    color: white
    line-height: 1.2
    letter-spacing: -0.02em
    text-shadow: 0 2px 4px rgba(black, 0.1)

  .brand-tagline
    font-size: 0.85rem
    color: rgba(white, 0.9)
    font-weight: 500
    opacity: 1

.header-actions
  display: flex
  align-items: center
  gap: 8px

.action-btn
  color: white
  border-radius: 12px
  transition: all 0.3s ease

  &:hover
    background: rgba(white, 0.2)
    color: white

.profile-avatar
  position: relative
  transition: transform 0.3s ease

  &:hover
    transform: scale(1.1)

  .avatar-border
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    border: 2px solid white
    border-radius: 50%
    opacity: 0
    transition: opacity 0.3s ease

  &:hover .avatar-border
    opacity: 1

// === MENUS MODERNOS ===
.modern-menu
  border-radius: 16px
  border: 1px solid rgba($secondary, 0.1)
  box-shadow: 0 8px 32px rgba($secondary, 0.15)
  overflow: hidden

.language-menu, .user-menu
  min-width: 180px
  background: white

.language-item, .menu-item
  padding: 12px 16px
  transition: all 0.3s ease
  border-radius: 8px
  margin: 4px

  &:hover
    background: rgba($primary, 0.08)
    color: $primary

.debug-item
  opacity: 0.6
  font-style: italic

.logout-item
  &:hover
    background: rgba($negative, 0.08)
    color: $negative

.menu-separator
  margin: 8px 0
  background: rgba($secondary, 0.1)

// === DRAWER MODERNO ===
.modern-drawer
  background: #fafafa
  border-right: 1px solid rgba($secondary, 0.1)

.drawer-header
  padding: 24px 20px
  background: white
  border-bottom: 1px solid rgba($secondary, 0.1)

.drawer-brand
  display: flex
  align-items: center
  gap: 12px

.drawer-icon
  color: $primary

.drawer-title
  font-size: 1.1rem
  font-weight: 600
  color: $secondary

.modern-nav-list
  padding-top: 16px

.nav-item
  margin: 4px 12px
  border-radius: 12px
  transition: all 0.3s ease
  color: $secondary

  &.router-link-active, &.home-item.router-link-exact-active
    background: linear-gradient(135deg, rgba($primary, 0.15) 0%, rgba($primary, 0.1) 100%)
    color: $primary

    .q-item__section--avatar .q-icon
      color: $primary

  &:hover:not(.router-link-active)
    background: rgba($primary, 0.05)
    transform: translateX(4px)

.nav-separator
  margin: 16px 20px
  background: rgba($secondary, 0.1)

.nav-expansion
  margin: 4px 12px
  border-radius: 12px

  .nav-header
    color: $secondary
    font-weight: 600
    padding: 12px 16px

  .nav-active
    background: rgba($primary, 0.1)
    color: $primary

.nav-sub-item
  margin: 4px 8px
  border-radius: 8px
  transition: all 0.3s ease

  &:hover
    background: rgba($primary, 0.08)
    color: $primary
    transform: translateX(4px)

  &.router-link-active
    background: rgba($primary, 0.15)
    color: $primary

// === SUBMENU MODERNO ===
.modern-submenu
  background: rgba(white, 0.6)
  border-left: 3px solid rgba($primary, 0.3)
  margin-left: 12px
  border-radius: 0 12px 12px 0

.submenu-expansion
  margin: 4px 8px
  border-radius: 8px

  .submenu-header
    color: $secondary
    font-size: 0.9rem
    font-weight: 500

  .submenu-active
    color: $primary
    font-weight: 600

.submenu-item
  margin: 2px 4px
  border-radius: 6px
  transition: all 0.3s ease
  font-size: 0.9rem
  min-height: 36px

  &:hover
    background: rgba($primary, 0.08)
    color: $primary
    transform: translateX(2px)

  &.router-link-active
    background: rgba($primary, 0.15)
    color: $primary

// === CONTAINER E FOOTER ===
.modern-page-container
  margin-top: 8px
  background: #fafafa
  padding-top: 20px !important

.modern-footer
  background: linear-gradient(135deg, $secondary 0%, color.scale($secondary, $lightness: -29.8245614035%) 100%)
  color: white
  border-top: 1px solid rgba(white, 0.1)

.footer-toolbar
  padding: 0 24px
  min-height: 60px

.footer-content
  .footer-brand
    display: flex
    align-items: center
    gap: 12px

  .footer-text
    font-size: 0.9rem
    font-weight: 500
    opacity: 0.9

// === RESPONSIVIDADE ===
@media (max-width: 768px)
  .header-toolbar
    padding: 0 16px
    min-height: 60px

  .brand-name
    font-size: 1.5rem

  .brand-tagline
    font-size: 0.75rem

  .footer-text
    font-size: 0.8rem

  .modern-drawer
    width: 260px !important

// === ANIMAÇÕES ===
@keyframes slideInFromLeft
  from
    transform: translateX(-100%)
    opacity: 0
  to
    transform: translateX(0)
    opacity: 1

.modern-drawer .q-list
  animation: slideInFromLeft 0.3s ease-out

// === SCROLLBAR PERSONALIZADA ===
.modern-drawer
  &::-webkit-scrollbar
    width: 6px

  &::-webkit-scrollbar-track
    background: rgba($secondary, 0.05)

  &::-webkit-scrollbar-thumb
    background: rgba($primary, 0.3)
    border-radius: 3px

    &:hover
      background: rgba($primary, 0.5)
</style>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from '@/stores/auth-store'

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false)
    const { locale, t } = useI18n()
    const currentLanguage = ref(locale.value)
    const route = useRoute()
    const router = useRouter()
    const $q = useQuasar()
    const authStore = useAuthStore()

    // Computed properties para controlar estados ativos do menu
    const isInTeamsRoute = computed(() => route.path.startsWith('/equipes'))
    const isInClientsRoute = computed(() => route.path.startsWith('/clientes'))
    const isInEmployeesRoute = computed(() => route.path.startsWith('/colaboradores'))
    const isInScheduleRoute = computed(() => route.path.startsWith('/schedules'))
    const isInServicosRoute = computed(() => route.path.startsWith('/servicos'))
    const isInPacotesServicosRoute = computed(() => route.path.startsWith('/pacotes-servicos'))
    const isInMateriaisRoute = computed(() => route.path.startsWith('/materiais'))
    const isInOrcamentosRoute = computed(() => route.path.startsWith('/orcamentos'))
    const isInOrdensServicoRoute = computed(() => route.path.startsWith('/ordens-servico'))
    const isInRelatoriosRoute = computed(() => route.path.startsWith('/relatorio'))

    const isInPessoasRoute = computed(() =>
      route.path.startsWith('/pessoas') ||
      isInClientsRoute.value ||
      isInEmployeesRoute.value ||
      isInScheduleRoute.value ||
      isInTeamsRoute.value
    )

    const changeLanguage = (lang) => {
      locale.value = lang
      currentLanguage.value = lang
      localStorage.setItem('language', lang)
    }

    // Carregar idioma salvo ao iniciar
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) {
      locale.value = savedLanguage
      currentLanguage.value = savedLanguage
    }

    const logout = async () => {
      try {
        // Confirmar logout
        $q.dialog({
          title: t('layout.logout.confirmTitle'),
          message: t('layout.logout.confirmMessage'),
          cancel: true,
          persistent: true
        }).onOk(async () => {
          try {
            // Fazer logout no store
            authStore.logout()

            // Mostrar notificação
            $q.notify({
              type: 'positive',
              message: t('layout.logout.success'),
              position: 'top'
            })

            // Redirecionar para login com replace para não manter histórico
            await router.replace('/login')
          } catch (error) {
            console.error('Erro no logout:', error)
            $q.notify({
              type: 'negative',
              message: 'Erro ao realizar logout',
              position: 'top'
            })
          }
        })
      } catch (error) {
        console.error('Erro ao abrir dialog de logout:', error)
        $q.notify({
          type: 'negative',
          message: 'Erro ao confirmar logout',
          position: 'top'
        })
      }
    }

    const navigateToHome = () => {
      router.push('/')
    }

    const debugAuth = () => {
      console.log('🔒 Debug Auth State:', {
        isAuthenticated: authStore.isAuthenticated,
        token: authStore.token,
        user: authStore.user,
        localStorage: {
          token: localStorage.getItem('auth-token'),
          user: localStorage.getItem('auth-user')
        }
      })

      $q.notify({
        type: 'info',
        message: `Auth: ${authStore.isAuthenticated ? 'Logado' : 'Não logado'}`,
        position: 'top'
      })
    }

    return {
      leftDrawerOpen,
      currentLanguage,
      changeLanguage,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      logout,
      navigateToHome,
      debugAuth,
      isInPessoasRoute,
      isInClientsRoute,
      isInEmployeesRoute,
      isInScheduleRoute,
      isInTeamsRoute,
      isInServicosRoute,
      isInPacotesServicosRoute,
      isInMateriaisRoute,
      isInOrcamentosRoute,
      isInOrdensServicoRoute,
      isInRelatoriosRoute
    }
  }
})
</script>
