
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: 'Login', component: () => import('pages/Login.vue') },
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
    ]
  },
  {
    path: '/usuarios',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Users.vue') },
    ]
  },
  {
    path: '/livros',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Books/Books.vue') },
      { path: 'genero', component: () => import('src/pages/Books/Gender.vue') },
      { path: 'editores', component: () => import('src/pages/Books/Editor.vue') },
      { path: 'autores', component: () => import('src/pages/Books/Author.vue') },
      { path: ':id', component: () => import('src/pages/Books/InfoBook.vue') },
    ]
  },
  {
    path: '/alugar',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Rent.vue') },
    ]
  },
  {
    path: '/alugados',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Rented.vue') },
    ]
  },
  {
    path: '/comentarios',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/BookAuditing.vue') },
    ]
  },
  {
    path: '/configuracoes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Settings.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
