import { constantRouterMap } from '@/router/routers'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    sidebarRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
      console.log('addRouters:',  state.routers);
    },
    SET_SIDEBAR_ROUTERS: (state, routers) => {
      state.sidebarRouters = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, asyncRouter) {
      commit('SET_ROUTERS', asyncRouter)
    },
    SetSidebarRouters({ commit }, sidebarRouter) {
      commit('SET_SIDEBAR_ROUTERS', sidebarRouter)
    }
  }
}

export const filterAsyncRouter = (routers, isRewrite = false) => { // 遍历后台传来的路由字符串，转换为组件对象
  return routers.filter(router => {
    //! if (isRewrite && router.children) {
    //! 这个打开会导致动态添加的路由表递归不够深，第四级菜单会递归不对
    //!   router.children = filterChildren(router.children)
    //! }
    if (router.component) {
      if (router.component === 'Layout') { // Layout组件特殊处理
        router.component = Layout
      } else if (router.component === 'ParentView') {
        router.component = ParentView
      } else {
        const component = router.component
        router.component = loadView(component)
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children, isRewrite)
      // router.children = filterAsyncRouter(router.children, router, isRewrite)
    }
    return true
  })
}

function filterChildren(childrenMap, children = []) {
  // var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView') {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          // console.log(1, c.path);
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, children))
            // children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    children = children.concat(el)
    // console.log('children:', children);
  })
  return children
}

export const loadView = (view) => {
  //!加载对应的组件 菜单组件都写在 @/views/ 文件下
  return (resolve) => require([`@/views/${view}`], resolve)
}

export default permission
