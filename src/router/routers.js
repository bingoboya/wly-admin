import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'
// import datamanageRouter from './da.js'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login',
    meta: { activeName: 7, title: '登录', noCache: true },
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/features/404'], resolve),
    hidden: true,
    meta: { activeName: 7 }
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/features/401'], resolve),
    hidden: true,
    meta: { activeName: 7 }
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    meta: { activeName: 7 },
    children: [
      {
        path: '/redirect/:path*',
        meta: { activeName: 7 },
        component: (resolve) => require(['@/views/features/redirect'], resolve)
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { activeName: 7 },
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: (resolve) => require(['@/views/home'], resolve),
        name: 'Dashboard',
        meta: { activeName: 7, title: '首页', icon: 'index', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    meta: { activeName: 7 },
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: (resolve) => require(['@/views/system/user/center'], resolve),
        name: '个人中心',
        meta: { activeName: 7, title: '个人中心' }
      }
    ]
  }
  // {
  //   //购电合同详情页
  //   path: '/usermanage/provincearea/contractinformation/buycontract/contractindetail',
  //   hidden: true,
  //   component: (resolve) => require(['@/views/usermanage/provincearea/contractinformation/buycontract/contractindetail'], resolve),
  //   name: '详情页面',
  //   meta: { activeName: 7 ,title: '详情页面' }
  // },
  // datamanageRouter
]

export default new Router({
  // mode: 'hash',
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
