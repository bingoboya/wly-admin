import router from './routers'
import store from '@/store'
import Config from '@/settings'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
import { buildMenus } from '@/api/system/menu'
import { filterAsyncRouter } from '@/store/modules/permission'

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login']// no redirect whitelist

router.beforeEach((to, from, next) => {
  // console.log('router.beforeEach:----', to);
  // alert(to.path)
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + Config.title
  }
  NProgress.start()
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(() => { // 拉取user_info
          // 动态路由，拉取菜单
          loadMenus(next, to)
        }).catch(() => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      // 登录时未拉取 菜单，在此处拉取
      } else if (store.getters.loadMenus) {
        // 修改成false，防止死循环
        store.dispatch('updateLoadMenus')
        loadMenus(next, to)
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

export const loadMenus = (next, to) => {
  const menusBuild1 = [
    {
      path: '/usermanage',
      component: 'Layout',
      redirect: 'noredirect',
      name: 'usermanage',
      meta: { activeName: 7, title: '数据是理',icon: 'menu'},
      children: [
        {
          path: 'peddingapproval',
          name: 'peddingapproval',
          // 组件要写成字符串
          component: "usermanage/peddingapproval/index",
          // component: (resolve) => require(['@/views/usermanage/peddingapproval/index'], resolve),
          meta: { activeName: 7, icon: 'menu', title: '待办审批' }
        },
        //合同信息
        {
          path: 'contractinformation',
          component: "usermanage/provincearea/contractinformation",
          name: 'provincearea-contractinformation',
          redirect: 'noredirect',
          meta: { activeName: 7, icon: 'menu', title: '合同信息' },
          children: [
            {
              path: 'salecontract',
              component: "usermanage/provincearea/contractinformation/salecontract",
              name: 'contractinformation-salecontract',
              meta: { activeName: 7, icon: 'menu', title: '售电合同' }
            },
            {
              path: 'buycontract',
              component: "usermanage/provincearea/contractinformation/buycontract",
              name: 'buycontract',
              meta: { activeName: 7, icon: 'menu', title: '购电合同' },
            },
            {
              path: 'contractindetail',
              // hidden: true,
              component: "usermanage/provincearea/contractinformation/buycontract/contractindetail",
              name: 'contractinformation-contractindetail',
              meta: { activeName: 7, icon: 'menu', title: '合同详情' }
            },
          ]
        },
        {
          path: 'curvemanagement',
          component: "usermanage/curvemanagement",
          name: 'provincearea-commoncurvemanagement',
          redirect: 'noredirect',
          meta: { activeName: 7, icon: 'menu', title: '常用曲线管理' },
          children: [
            {
              path: 'curvemanagementsearch',
              component: "usermanage/curvemanagement/curvemanagementsearch",
              name: 'curvemanagement-curvemanagementsearch',
              meta: { activeName: 7, icon: 'menu', title: '常用曲线查询' }
            },
            {
              path: 'mycurvemanagement',
              component: "usermanage/curvemanagement/mycurvemanagement",
              name: 'curvemanagement-mycurvemanagement',
              meta: { activeName: 7, icon: 'menu', title: '我的常用曲线' },
            },
          ]
        },
        {
          path: 'institutionalinformation',
          component: "usermanage/provincearea/institutionalinformation",
          name: 'provincearea-institutionalinformation',
          meta: { activeName: 7, icon: 'menu', title: '机构信息' }
        },
        {
          path: 'intersogueinformation',
          component: "usermanage/provincearea/intersogueinformation",
          name: 'provincearea-intersogueinformation',
          meta: { activeName: 7, icon: 'menu', title: '居间人信息' }
        },
        {
          path: 'marketruleinformation',
          component: "usermanage/provincearea/marketruleinformation",
          name: 'provincearea-marketruleinformation',
          meta: { activeName: 7, icon: 'menu', title: '市场规则信息' }
        },
        
      ]
    }
  ]
  buildMenus().then(res => {
    //TODO 临时写死路由
    res = menusBuild1
    const sdata = JSON.parse(JSON.stringify(res))
    const rdata = JSON.parse(JSON.stringify(res))
    const rewriteRoutes = filterAsyncRouter(rdata, true)
    const sidebarRoutes = filterAsyncRouter(sdata)
    rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })

    console.log('动态添加可访问路由表:-', rewriteRoutes);
    console.log('侧边蓝路由表:-', sidebarRoutes);

    store.dispatch('GenerateRoutes', rewriteRoutes).then(() => { // 存储路由
      router.addRoutes(rewriteRoutes) // 动态添加可访问路由表
      next({ ...to, replace: true })
    })
    store.dispatch('SetSidebarRouters', sidebarRoutes)
  })
}

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
