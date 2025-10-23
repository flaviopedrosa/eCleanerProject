<template>
  <q-layout view="hHh lpR fff">
    <q-header reveal elevated class="bg-white text-secondary">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" class="text-secondary" />

        <q-toolbar-title>
          <q-img src="~assets/ecleaner-logo.png" alt="eCleaner Logo" style="width: 100px; height: auto; margin: 5px;"
            contain />
        </q-toolbar-title>

        <q-btn flat round class="q-mr-sm">
          <q-icon name="language" />
          <q-menu transition-show="jump-down" transition-hide="jump-up" class="bg-white text-secondary">
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup @click="changeLanguage('pt-BR')" :active="currentLanguage === 'pt-BR'">
                <q-item-section avatar>
                  <q-icon name="flag" />
                </q-item-section>
                <q-item-section>Português</q-item-section>
                <q-item-section side v-if="currentLanguage === 'pt-BR'">
                  <q-icon name="check" />
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="changeLanguage('en-US')" :active="currentLanguage === 'en-US'">
                <q-item-section avatar>
                  <q-icon name="flag" />
                </q-item-section>
                <q-item-section>English</q-item-section>
                <q-item-section side v-if="currentLanguage === 'en-US'">
                  <q-icon name="check" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn flat round>
          <q-avatar size="32px">
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>

          <q-menu transition-show="jump-down" transition-hide="jump-up" class="bg-white text-secondary">
            <q-list style="min-width: 200px">
              <q-item clickable v-close-popup to="/perfil">
                <q-item-section avatar>
                  <q-icon name="account_circle" />
                </q-item-section>
                <q-item-section>{{ $t('menu.myAccount') }}</q-item-section>
              </q-item>

              <q-item clickable v-close-popup to="/configuracoes">
                <q-item-section avatar>
                  <q-icon name="settings" />
                </q-item-section>
                <q-item-section>{{ $t('menu.settings') }}</q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable v-close-popup @click="logout">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>{{ $t('menu.logout') }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <q-list padding>
        <q-item-label header>Menu</q-item-label>

        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>{{ $t('menu.home') }}</q-item-section>
        </q-item>

        <!-- Menu Pessoas -->
        <q-expansion-item icon="people" :label="$t('menu.pessoas.title')"
          :header-class="isInPessoasRoute ? 'text-primary' : ''">
          <!-- Submenu Clientes -->
          <q-list class="submenu">
            <q-expansion-item icon="groups" :label="$t('menu.pessoas.submenus.clients.title')"
              :header-class="isInClientsRoute ? 'text-primary' : ''">
              <q-item clickable v-ripple to="/clientes/novo">
                <q-item-section avatar>
                  <q-icon name="add" />
                </q-item-section>
                <q-item-section>{{ $t('menu.pessoas.submenus.clients.new') }}</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/clientes">
                <q-item-section avatar>
                  <q-icon name="list" />
                </q-item-section>
                <q-item-section>{{ $t('menu.pessoas.submenus.clients.list') }}</q-item-section>
              </q-item>
            </q-expansion-item>

            <!-- Submenu Colaboradores -->
            <q-expansion-item icon="engineering" :label="$t('menu.pessoas.submenus.employees.title')"
              :header-class="isInEmployeesRoute ? 'text-primary' : ''">
              <q-item clickable v-ripple to="/colaboradores/novo">
                <q-item-section avatar>
                  <q-icon name="add" />
                </q-item-section>
                <q-item-section>{{ $t('menu.pessoas.submenus.employees.new') }}</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/colaboradores">
                <q-item-section avatar>
                  <q-icon name="list" />
                </q-item-section>
                <q-item-section>{{ $t('menu.pessoas.submenus.employees.list') }}</q-item-section>
              </q-item>
            </q-expansion-item>

            <!-- Submenu Equipes -->
            <q-expansion-item icon="groups_2" :label="$t('menu.pessoas.submenus.teams.title')"
              :header-class="isInTeamsRoute ? 'text-primary' : ''">
              <q-item clickable v-ripple to="/equipes/novo">
                <q-item-section avatar>
                  <q-icon name="add" />
                </q-item-section>
                <q-item-section>{{ $t('menu.pessoas.submenus.teams.new') }}</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/equipes">
                <q-item-section avatar>
                  <q-icon name="list" />
                </q-item-section>
                <q-item-section>{{ $t('menu.pessoas.submenus.teams.list') }}</q-item-section>
              </q-item>
            </q-expansion-item>

            <!-- Submenu Empresas -->
            <q-expansion-item icon="business" :label="$t('menu.pessoas.submenus.schedules.title')"
              :header-class="isInScheduleRoute ? 'text-primary' : ''">
              <q-item clickable v-ripple to="/schedules/novo">
                <q-item-section avatar>
                  <q-icon name="add" />
                </q-item-section>
                <q-item-section>{{ $t('menu.pessoas.submenus.schedules.new') }}</q-item-section>
              </q-item>

              <q-item clickable v-ripple to="/schedules">
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
          :header-class="isInServicosRoute ? 'text-primary' : ''">
          <q-item clickable v-ripple to="/servicos/novo">
            <q-item-section avatar>
              <q-icon name="add" />
            </q-item-section>
            <q-item-section>{{ $t('menu.servicos.new') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/servicos">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>{{ $t('menu.servicos.list') }}</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Menu Pacotes de Serviços -->
        <q-expansion-item icon="inventory" :label="$t('menu.pacotesServicos.title')"
          :header-class="isInPacotesServicosRoute ? 'text-primary' : ''">
          <q-item clickable v-ripple to="/pacotes-servicos/novo">
            <q-item-section avatar>
              <q-icon name="add" />
            </q-item-section>
            <q-item-section>{{ $t('menu.pacotesServicos.new') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/pacotes-servicos">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>{{ $t('menu.pacotesServicos.list') }}</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Menu Materiais -->
        <q-expansion-item icon="category" :label="$t('menu.materiais.title')"
          :header-class="isInMateriaisRoute ? 'text-primary' : ''">
          <q-item clickable v-ripple to="/materiais/novo">
            <q-item-section avatar>
              <q-icon name="add" />
            </q-item-section>
            <q-item-section>{{ $t('menu.materiais.new') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/materiais">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>{{ $t('menu.materiais.list') }}</q-item-section>
          </q-item>
        </q-expansion-item>

        <!-- Menu Orçamentos -->
        <q-expansion-item icon="receipt_long" :label="$t('menu.orcamentos.title')"
          :header-class="isInOrcamentosRoute ? 'text-primary' : ''">
          <q-item clickable v-ripple to="/orcamentos/novo">
            <q-item-section avatar>
              <q-icon name="add" />
            </q-item-section>
            <q-item-section>{{ $t('menu.orcamentos.new') }}</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/orcamentos">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>{{ $t('menu.orcamentos.list') }}</q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>

    <q-page-container class="q-pa-md">
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="~assets\ecleaner-negativo-icon.svg" alt="eCleaner Logo" style="width: 35px; height: auto;"
              contain>
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<style lang="sass">
.submenu
  padding-left: 8px !important
  background: rgba(0,0,0,0.02)

  .q-expansion-item
    border-left: 2px solid rgba(0,0,0,0.05)

  .q-item
    padding-left: 32px
    min-height: 40px

.q-drawer
  .q-expansion-item__content
    background: rgba(0,0,0,0.02)
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

    const logout = () => {
      // Confirmar logout
      $q.dialog({
        title: t('layout.logout.confirmTitle'),
        message: t('layout.logout.confirmMessage'),
        cancel: true,
        persistent: true
      }).onOk(() => {
        // Fazer logout
        authStore.logout()

        // Mostrar notificação
        $q.notify({
          type: 'positive',
          message: t('layout.logout.success'),
          position: 'top'
        })

        // Redirecionar para login
        router.push('/login')
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
      isInPessoasRoute,
      isInClientsRoute,
      isInEmployeesRoute,
      isInScheduleRoute,
      isInTeamsRoute,
      isInServicosRoute,
      isInPacotesServicosRoute,
      isInMateriaisRoute,
      isInOrcamentosRoute
    }
  }
})
</script>
