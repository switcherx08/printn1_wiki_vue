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
      path: '/projects',
      meta: {
        layout: layouts.sidebar,
        module: modules[0].dashboard,
        page: {title: 'projects'}
      },
      component: () => import('@/views/project_view/ProjectIndex.vue'),
      children: [
        {
          path: '',
          name: 'projects-list',
          meta: {
            layout: layouts.sidebar,
            module: modules[0].dashboard,
            page: {title: 'projects-list'}
          },
          component: () => import('@/views/project_view/list/ProjectList.vue'),
        },
        {
          path: '/projects/:alias',
          name: 'projects-view',
          meta: {
            layout: layouts.sidebar,
            module: modules[0].dashboard,
            page: {title: 'projects'}
          },
          component: () => import('@/views/project_view/view/ProjectView.vue'),
        },
        {
          path: '/create',
          name: 'projects-create',
          meta: {
            layout: layouts.sidebar,
            module: modules[0].dashboard,
            page: {title: 'projects-create'}
          },
          component: () => import('@/views/project_view/create/ProjectCreate.vue'),
        }
      ]
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
        {
          path: '/page/create',
          name: 'page-create',
          meta: {
            layout: layouts.sidebar,
            module: modules[0].dashboard,
            page: {title: 'projects-create'}
          },
          component: () => import('@/views/page_view/create/PageCreate.vue'),
        }
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
