import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import modules from "@//assets/api/modules.json";

const layouts = {
  sidebar: 'sidebar-layout',
  error: 'error-layout'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      meta: {
        layout: layouts.sidebar,
        module: modules[0].dashboard,
        page: {title: 'dashboard'}
      },
      component: () => import('@/views/dashboard_view/DashboardView.vue')
    },
    {
      path: '/page',
      meta: {
        layout: layouts.sidebar,
        module: modules[0].dashboard,
        page: {title: 'page'}
      },
      component: () => import('@/views/page_view/PageIndex.vue'),
      children: [
        {
          path: '',
          name: 'page-list',
          meta: {
            layout: layouts.sidebar,
            module: modules[0].dashboard,
            page: {title: 'page'}
          },
          component: () => import('@/views/page_view/list/PageList.vue'),
        },
        {
          path: '/page/:alias',
          name: 'page-view',
          meta: {
            layout: layouts.sidebar,
            module: modules[0].dashboard,
            page: {title: 'page'}
          },
          component: () => import('@/views/page_view/view/PageView.vue'),
        },
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      meta: {
        layout: layouts.error,
        module: modules[0].none,
        page: {title: 'page_not_found'}
      },
      component: () => import('@//views/error_view/not_found_view/NotFoundView.vue')
    },
  ]
})

export default router
