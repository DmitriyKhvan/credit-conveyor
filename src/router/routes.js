
const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('pages/main/home/Home')
      },
      {
        path: '/work',
        name: 'Work',
        component: () => import('pages/main/work/Work'),
        children:[
            {
                path: '/work/assistant',
                name: 'Assistant',
                component: () => import('pages/main/work/modules/pages/assistant/Assistant.vue')
            },
            {
                path: '/work/kanselariya',
                name: 'kanselariya',
                component: () => import('pages/main/work/modules/pages/kanselariya/Index.vue'),
                children:[
                  {
                    path: '/work/kanselariya/registration',
                    name: 'kregistration',
                    component: () => import('pages/main/work/modules/pages/kanselariya/modules/pages/registration/index.vue')
                  }
                ]
            },
            {
              path: '/work/task',
              name: 'mytask',
              component: () => import('pages/main/work/modules/pages/task/index.vue'),
              children:[
                  {
                      path: '/work/task/list',
                      name: 'tasklist',
                      component: () => import('pages/main/work/modules/pages/task/modules/pages/tasklist/List')
                  }
                  // {
                  //  path: '/work/task/boards',
                  //  name: 'boards',
                  //  component: () => import('@/modules/main/work/mytask/modules/boards/boards')
                  // }
              ]
            },
            {
              path: '/work/credit',
              name: 'Credit',
              component: () => import('pages/main/work/modules/pages/credit/Credit'),
              children:[
                {
                  path: '/work/credit/registration',
                  name: 'registration',
                  component: () => import('pages/main/work/modules/pages/credit/pages/registration/Registration.vue'),
                }
              ]
          }
        ]
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('pages/main/admin/admin'),
        children:[
            {
                path: '/admin/users',
                name: 'users',
                component: () => import('pages/main/admin/modules/pages/users/Users'),
            },
            {
                path: '/admin/roles',
                name: 'roles',
                component: () => import('pages/main/admin/modules/pages/roles/roles'),
            },
            {
                path: '/admin/menus',
                name: 'menus',
                component: () => import('pages/main/admin/modules/pages/menus/menus'),
            }
        ]
      },
      {
        path: '/tools',
        name: 'Tools',
        component: () => import('pages/main/tools/Tools'),
        children:[
            {
                path: '/tools/phones',
                name: 'phones',
                component: () => import('pages/main/tools/modules/pages/phones/phones')
            }
        ]
    }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/main/auth/Login.vue'),
    meta: { requiresAuth: false }
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
