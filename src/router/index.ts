import { type RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory } from "vue-router"

const Layout = () => import("@/layout/index.vue")

/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          svgIcon: "dashboard",
          affix: true
        }
      },
    ],
  },
  {
    path: "/audit",
    component: Layout,
    redirect: "/audit",
    meta: {
      title: "审核中心",
      svgIcon:"audit"
    },
    children: [
      {
        path: 'auth',
        component: () => import("@/views/audit-center/Shop/index.vue"),
        name: "auth",
        meta: {
          title: "商铺审核",
          svgIcon: "Store",
          affix:false,
        },
      },
      {
        path: '/detail/:id/:authstatus/:phone?/:name?/:status?/:state?/:modules?',
        component: () => import("@/views/audit-center/Shop/detail/index.vue"),
        name: "detail",
        props:true,
      },
      {
        path: "commodity",
        component: () => import("@/views/audit-center/commodity/index.vue"),
        name: "commodity",
        meta: {
          title: "商品审核",
          svgIcon: "commodity",
          affix:false
        }
      }
    ]
  },
  {
    path: "/finance",
    component: Layout,
    redirect: "/finance",
    meta: {
      title: "财务管理",
      svgIcon: "finance",
      affix:false,
    },
    children: [
      {
        path: "appWithdrawal",
        component: () => import("@/views/financialManagement/appWithdrawal/index.vue"),
        name:"appWithdrawal",
        meta: {
          title: "提现审批",
          svgIcon: "audit",
          affix:false
        }
      },
      {
        path: "withdrawalRecord",
        component: () => import("@/views/financialManagement/withdrawalRecord/index.vue"),
        name:"withdrawalRecord",
        meta: {
          title: "提现记录",
          svgIcon: "withdrawalRecord",
          affix:false
        }
      }
    ]
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/page",
    name: "Permission",
    meta: {
      title: "权限管理",
      svgIcon: "lock",
      roles: ["admin", "editor"], // 可以在根路由中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/page.vue"),
        name: "PagePermission",
        meta: {
          title: "页面权限",
          roles: ["admin"] // 或者在子导航中设置角色
        }
      },
      {
        path: "directive",
        component: () => import("@/views/permission/directive.vue"),
        name: "DirectivePermission",
        meta: {
          title: "指令权限" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
        }
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      hidden: true
    }
  },
  
]

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === "hash"
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if ( name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
