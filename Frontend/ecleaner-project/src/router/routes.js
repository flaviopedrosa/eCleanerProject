const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'clientes/novo', component: () => import('pages/ClienteCadastroPage.vue') },
      { path: 'clientes', component: () => import('pages/ClienteListagemPage.vue') },
      { path: 'colaboradores/novo', component: () => import('pages/ColaboradorCadastroPage.vue') },
      { path: 'colaboradores/:id', component: () => import('pages/ColaboradorCadastroPage.vue') },
      { path: 'colaboradores', component: () => import('pages/ColaboradorListagemPage.vue') },
      { path: 'schedules/novo', component: () => import('pages/ScheduleCadastroPage.vue') },
      { path: 'schedules/:id', component: () => import('pages/ScheduleCadastroPage.vue') },
      { path: 'schedules', component: () => import('pages/ScheduleListagemPage.vue') },
      { path: 'equipes', component: () => import('pages/EquipeListagemPage.vue') },
      { path: 'equipes/novo', component: () => import('pages/EquipeCadastroPage.vue') },
      { path: 'equipes/:id', component: () => import('pages/EquipeCadastroPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
