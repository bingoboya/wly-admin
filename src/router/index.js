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

/**
 *当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
  hidden: true // (默认 false)

  //当设置 noredirect 的时候该路由在面包屑导航中不可被点击
  redirect: 'noredirect'

  //当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
  //只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
  //若你想不管路由下面的 children 声明的个数都显示你的根路由
  //你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
  alwaysShow: true

  name: 'router-name' //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
  meta: {
    title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name' //设置该路由的图标
    noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false // 如果设置为false，则不会在breadcrumb面包屑中显示,
    affix: true // 设置成true表示，tag-view不可删除
  }
 *
*/

router.beforeEach((to, from, next) => {
  // console.log('router.beforeEach:----', to);
  // alert(to.path)
  if (to.meta.title) {
    document.title = to.meta.title
    // document.title = to.meta.title + ' - ' + Config.title
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
      meta: { activeName: 7, title: '数据管理', icon: 'menu' },
      children: [
        {
          path: 'peddingapproval',
          name: 'peddingapproval',
          // 组件要写成字符串
          component: 'usermanage/peddingapproval/index',
          // component: (resolve) => require(['@/views/usermanage/peddingapproval/index'], resolve),
          meta: { activeName: 7, icon: 'menu', title: '待办审批' }
        },
        // 合同信息
        {
          path: 'contractinformation',
          component: 'usermanage/provincearea/contractinformation',
          name: 'provincearea-contractinformation',
          redirect: 'noredirect',
          meta: { activeName: 7, icon: 'menu', title: '合同信息' },
          children: [
            {
              path: 'salecontract',
              component: 'usermanage/provincearea/contractinformation/salecontract',
              name: 'contractinformation-salecontract',
              meta: { activeName: 7, icon: 'menu', title: '售电合同' }
            },
            {
              path: 'buycontract',
              component: 'usermanage/provincearea/contractinformation/buycontract',
              name: 'buycontract',
              meta: { activeName: 7, icon: 'menu', title: '购电合同' }
            },
            {
              // 购电-合同详情
              path: 'contractindetail',
              hidden: true,
              component: 'usermanage/provincearea/contractinformation/buycontract/contractindetail',
              name: 'contractinformation-contractindetail',
              meta: { activeName: 7, icon: 'menu', title: '合同详情' }
            },
            {
              // 售电-合同详情
              path: 'salecontractindetail',
              hidden: true,
              component: 'usermanage/provincearea/contractinformation/salecontract/contractindetail',
              name: 'contractinformation-salecontractindetail',
              meta: { activeName: 7, icon: 'menu', title: '合同详情' }
            }
          ]
        },
        {
          path: 'institutioninfo',
          hidden: false,
          component: 'usermanage/provincearea/institutionalinformation',
          name: 'institution-info',
          meta: { activeName: 7, icon: 'menu', title: '机构信息' }
        },
        {// 机构基本信息页面
          path: 'institutbaseinfo',
          hidden: true,
          component: 'usermanage/provincearea/institutionalinformation/institutbaseinfo.vue',
          name: 'institut-baseinfo',
          meta: { activeName: 7, noCache: true, icon: 'menu', title: '机构基本信息' }
        },
        {// 户表基本信息页面
          path: 'userlistbaseinfo',
          hidden: true,
          component: 'usermanage/provincearea/institutionalinformation/userlistbaseinfo.vue',
          name: 'userlist-baseinfo',
          meta: { activeName: 7, noCache: true, icon: 'menu', title: '户表基本信息' }
        },
        {
          path: 'marketruleinfo',
          hidden: false,
          component: 'usermanage/provincearea/marketruleinformation',
          name: 'marketrule-info',
          meta: { activeName: 7, icon: 'menu', title: '市场规则信息' }
        },
        {
          path: 'marketruledetail',
          hidden: false,
          component: 'usermanage/provincearea/marketruleinformation/marketruledetail.vue',
          name: 'marketrule-detail',
          meta: { activeName: 7, icon: 'menu', title: '市场规则信息详情' }
        },
        {
          path: 'intersogueinfo',
          hidden: false,
          component: 'usermanage/provincearea/intersogueinformation',
          name: 'intersogue-info',
          meta: { activeName: 7, icon: 'menu', title: '居间人' }
        },
        {// 居间人基本信息
          path: 'interbaseinfo',
          hidden: true,
          component: 'usermanage/provincearea/intersogueinformation/interbaseinfo.vue',
          name: 'inter-baseinfo',
          meta: { activeName: 7, noCache: true, icon: 'menu', title: '居间人基本信息' }
        },
        {
          path: 'curvemanagement',
          hidden: true,
          component: 'usermanage/curvemanagement',
          name: 'provincearea-commoncurvemanagement',
          redirect: 'noredirect',
          meta: { activeName: 7, icon: 'menu', title: '常用曲线管理' },
          children: [
            {
              path: 'curvemanagementsearch',
              component: 'usermanage/curvemanagement/curvemanagementsearch',
              name: 'curvemanagement-curvemanagementsearch',
              meta: { activeName: 7, icon: 'menu', title: '常用曲线查询' }
            },
            {
              path: 'mycurvemanagement',
              component: 'usermanage/curvemanagement/mycurvemanagement',
              name: 'curvemanagement-mycurvemanagement',
              meta: { activeName: 7, icon: 'menu', title: '我的常用曲线' }
            }
          ]
        }
      ]
    }
  ]
  buildMenus().then(res => {
    // TODO 临时写死路由
    res = menusBuild1
    const sdata = JSON.parse(JSON.stringify(res))
    const rdata = JSON.parse(JSON.stringify(res))
    const rewriteRoutes = filterAsyncRouter(rdata, true)
    const sidebarRoutes = filterAsyncRouter(sdata)
    rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })

    console.log('动态添加可访问路由表:', rewriteRoutes)
    console.log('侧边蓝路由表:-', sidebarRoutes)

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
