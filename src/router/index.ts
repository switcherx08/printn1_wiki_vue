import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import modules from "@//assets/api/modules.json"
// @ts-ignore
import auth from '@/middleware/auth/auth'
// @ts-ignore
import wiki from '@/middleware/wiki/wiki'
// @ts-ignore
import middlewarePipeline from '@/middleware/middlewarePipeline'

const layouts = {
  sidebar: 'sidebar-layout',
  error: 'error-layout',
  auth: 'auth-layout'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      meta: {
        middleware: [auth, wiki],
        layout: layouts.sidebar,
        module: modules[0].dashboard,
        page: {title: 'dashboard'}
      },
      component: () => import('@/views/dashboard_view/DashboardView.vue')
    },
    {
      path: '/projects',
      meta: {
        middleware: [auth, wiki],
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
            middleware: [auth, wiki],
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
        middleware: [auth, wiki],
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
            middleware: [auth, wiki],
            layout: layouts.sidebar,
            module: modules[0].dashboard,
            page: {title: 'page'}
          },
          component: () => import('@/views/page_view/list/PageList.vue'),
        },
        {
          path: '/page/:id',
          name: 'page-view',
          meta: {
            middleware: [auth, wiki],
            layout: layouts.sidebar,
            module: modules[0].dashboard,
            page: {title: 'page'}
          },
          component: () => import('@/views/page_view/view/PageView.vue'),
        },
        {
          path: '/page/edit/:id',
          name: 'page-edit',
          meta: {
            middleware: [auth, wiki],
            layout: layouts.sidebar,
            module: modules[0].dashboard,
            page: {title: 'page'}
          },
          component: () => import('@/views/page_view/edit/PageEdit.vue'),
        },
        {
          path: '/page/create',
          name: 'page-create',
          meta: {
            middleware: [auth, wiki],
            layout: layouts.sidebar,
            module: modules[0].dashboard,
            page: {title: 'projects-create'}
          },
          component: () => import('@/views/page_view/create/PageCreate.vue'),
        }
      ]
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      meta: {
        layout: layouts.auth,
        module: modules[0].dashboard,
        page: {title: 'auth'}
      },
      component: () => import('@/views/auth_view/SignInView.vue')
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

// Start middleware
router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next
  }
  // @ts-ignore
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
