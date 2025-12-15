const routes = [
  {
    path: '/auth',
    component: () => import('pages/AuthPage.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: { requiresAuth: true } },
      { path: 'despesas', component: () => import('src/pages/DespesasPage.vue'), meta: { requiresAuth: true } },
      { path: 'categorias', component: () => import('src/pages/CategoriasPage.vue'), meta: { requiresAuth: true } },
      { path: 'perfil', component: () => import('src/pages/PerfilPage.vue'), meta: { requiresAuth: true } },
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
