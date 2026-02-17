const routes = [
  // Rota de login (sem layout principal)
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/LoginPage.vue'),
    meta: { requiresGuest: true }, // Apenas para usuários não autenticados
  },

  // Rota pública de assinatura de contrato
  {
    path: '/contrato/assinar/:id/:token',
    name: 'contrato-assinatura-publica',
    component: () => import('../pages/ContratoAssinaturaPublicaPage.vue'),
    meta: { requiresAuth: false }, // Acesso público
  },

  // Rotas protegidas (requerem autenticação)
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('@/pages/IndexPage.vue') },
      { path: 'clientes/novo', component: () => import('@/pages/ClienteCadastroPage.vue') },
      { path: 'clientes/:id/editar', component: () => import('@/pages/ClienteCadastroPage.vue') },
      { path: 'clientes', component: () => import('@/pages/ClienteListagemPage.vue') },
      { path: 'imoveis/novo', component: () => import('@/pages/ImovelCadastroPage.vue') },
      { path: 'imoveis', component: () => import('@/pages/ImovelListagemPage.vue') },
      {
        path: 'colaboradores/novo',
        component: () => import('@/pages/ColaboradorCadastroPage.vue'),
      },
      { path: 'colaboradores/:id', component: () => import('@/pages/ColaboradorCadastroPage.vue') },
      { path: 'colaboradores', component: () => import('@/pages/ColaboradorListagemPage.vue') },
      { path: 'schedules/novo', component: () => import('@/pages/ScheduleCadastroPage.vue') },
      { path: 'schedules/:id', component: () => import('@/pages/ScheduleCadastroPage.vue') },
      { path: 'schedules', component: () => import('@/pages/ScheduleListagemPage.vue') },
      { path: 'equipes', component: () => import('@/pages/EquipeListagemPage.vue') },
      { path: 'equipes/novo', component: () => import('@/pages/EquipeCadastroPage.vue') },
      { path: 'equipes/:id', component: () => import('@/pages/EquipeCadastroPage.vue') },
      { path: 'servicos', component: () => import('@/pages/ServicoListagemPage.vue') },
      { path: 'servicos/novo', component: () => import('@/pages/ServicoCadastroPage.vue') },
      { path: 'servicos/:id', component: () => import('@/pages/ServicoCadastroPage.vue') },
      {
        path: 'pacotes-servicos',
        component: () => import('@/pages/PacoteServicoListagemPage.vue'),
      },
      {
        path: 'pacotes-servicos/novo',
        component: () => import('@/pages/PacoteServicoCadastroPage.vue'),
      },
      {
        path: 'pacotes-servicos/:id',
        component: () => import('@/pages/PacoteServicoCadastroPage.vue'),
      },
      { path: 'materiais', component: () => import('@/pages/MaterialListagemPage.vue') },
      { path: 'materiais/novo', component: () => import('@/pages/MaterialCadastroPage.vue') },
      { path: 'materiais/:id/editar', component: () => import('@/pages/MaterialCadastroPage.vue') },
      { path: 'estoque', component: () => import('@/pages/EstoqueListagemPage.vue') },
      { path: 'materiais-equipes', component: () => import('@/pages/MateriaisEquipePage.vue') },
      { path: 'equipamentos', component: () => import('@/pages/EquipamentoListagemPage.vue') },
      { path: 'equipamentos/novo', component: () => import('@/pages/EquipamentoCadastroPage.vue') },
      {
        path: 'equipamentos/:id/editar',
        component: () => import('@/pages/EquipamentoCadastroPage.vue'),
      },
      { path: 'orcamentos', component: () => import('@/pages/OrcamentoListagemPage.vue') },
      { path: 'orcamentos/novo', component: () => import('@/pages/OrcamentoCadastroPage.vue') },
      { path: 'orcamentos/:id', component: () => import('@/pages/OrcamentoCadastroPage.vue') },
      {
        path: 'orcamentos/:id/visualizar',
        component: () => import('@/pages/OrcamentoVisualizacaoPage.vue'),
      },
      { path: 'contratos', component: () => import('../pages/ContratoListagemPage.vue') },
      {
        path: 'contratos/visualizar/:id',
        component: () => import('../pages/ContratoVisualizacaoPage.vue'),
      },
      { path: 'ordens-servico', component: () => import('@/pages/OrdemServicoListagemPage.vue') },
      {
        path: 'ordens-servico/:id',
        component: () => import('@/pages/OrdemServicoCadastroPage.vue'),
      },
      {
        path: 'ordens-servico-programacao',
        component: () => import('@/pages/OrdemServicoProgramacaoPage.vue'),
      },
      {
        path: 'ordens-servico-gantt',
        component: () => import('@/pages/OrdemServicoGanttPage.vue'),
      },
      {
        path: 'relatorio-financeiro',
        component: () => import('@/pages/RelatorioFinanceiroPage.vue'),
      },
      { path: 'configuracoes', component: () => import('@/pages/ConfiguracoesPage.vue') },
      { path: 'dev/seeds', component: () => import('@/pages/DevSeedsPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
]

export default routes
