import Layout from '../layout/index'
export const filterAsyncRouter = (routers, isRewrite = false) => { // 遍历后台传来的路由字符串，转换为组件对象
    // console.log(2, isRewrite);
    return routers.filter(router => {
      if (isRewrite && router.children) {
        router.children = filterChildren(router.children)
      }
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
        router.children = filterAsyncRouter(router.children, router, isRewrite)
      }
      return true
    })
  }
  
  function filterChildren(childrenMap) {
    var children = []
    childrenMap.forEach((el, index) => {
      if (el.children && el.children.length) {
        if (el.component === 'ParentView') {
          el.children.forEach(c => {
            c.path = el.path + '/' + c.path
            // console.log(1, c.path);
            if (c.children && c.children.length) {
              children = children.concat(filterChildren(c.children, c))
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


const datamanageRouter = {
    path: '/datamanage1',
    component: Layout,
    redirect: '/datamanage1/peddingapproval',
    name: 'DataManage12',
    meta: {activeName: 7, title: '数据管理', icon: 'menu'},
    children: [
      {
        path: 'peddingapproval',
        name: 'peddingapproval',
        component: (resolve) => require(['@/views/datamanage12/peddingapproval/index'], resolve),
        // component: () => import('@/views/datamanage12/peddingapproval/index'),
        meta: { icon: 'menu',activeName: 7, title: '待办审批' }
      },
      {
        path: 'all',
        name: 'all',
        component: () => import('@/views/datamanage12/all/index'),
        meta: { icon: 'menu',activeName: 7, title: 'ALL' }
      },
      {
        //省份地区
        path: 'provincearea',
        component: () => import('@/views/datamanage12/provincearea/index'), // Parent router-view
        name: 'provincearea',
        meta: { icon: 'menu',activeName: 7, title: '广东' },
        redirect: '/datamanage1/provincearea/contractinformation',
        children: [
          {
            //institutionalinformation
            path: 'institutionalinformation',
            component: () => import('@/views/datamanage12/provincearea/institutionalinformation'),
            name: 'provincearea-institutionalinformation',
            meta: { icon: 'menu',activeName: 7, title: '机构信息' }
          },
          {
            //intersogueinformation
            path: 'intersogueinformation',
            component: () => import('@/views/datamanage12/provincearea/intersogueinformation'),
            name: 'provincearea-intersogueinformation',
            meta: { icon: 'menu',activeName: 7, title: '居间人信息' }
          },
          {
            //marketruleinformation
            path: 'marketruleinformation',
            component: () => import('@/views/datamanage12/provincearea/marketruleinformation'),
            name: 'provincearea-marketruleinformation',
            meta: { icon: 'menu',activeName: 7, title: '市场规则信息' }
          },
          {
            path: 'contractinformation',
            component: () => import('@/views/datamanage12/provincearea/contractinformation'),
            name: 'provincearea-contractinformation',
            redirect: '/datamanage1/provincearea/contractinformation/salecontract',
            meta: { icon: 'menu',activeName: 7, title: '合同信息' },
            children: [
              {
                path: 'salecontract',
                component: () => import('@/views/datamanage12/provincearea/contractinformation/salecontract'),
                name: 'contractinformation-salecontract',
                meta: { icon: 'menu',activeName: 7, title: '售电合同' }
              },
              {
                path: 'buycontract',
                component: () => import('@/views/datamanage12/provincearea/contractinformation/buycontract'),
                name: 'buycontract',
                meta: { icon: 'menu',activeName: 7, title: '购电合同' }
              }
            ]
          },
        ]
      },
      {
        //省份地区
        path: 'provincearea1',
        component: () => import('@/views/datamanage12/provincearea/index'), // Parent router-view
        name: 'provincearea1-provincearea',
        meta: { icon: 'menu',activeName: 7, title: '四川' },
        redirect: '/datamanage1/provincearea1/contractinformation',
        children: [
          {
            //institutionalinformation
            path: 'institutionalinformation',
            component: () => import('@/views/datamanage12/provincearea/institutionalinformation'),
            name: 'provincearea1-institutionalinformation',
            meta: { icon: 'menu',activeName: 7, title: '机构信息' }
          },
          {
            //intersogueinformation
            path: 'intersogueinformation',
            component: () => import('@/views/datamanage12/provincearea/intersogueinformation'),
            name: 'provincearea1-intersogueinformation',
            meta: { icon: 'menu',activeName: 7, title: '居间人信息' }
          },
          {
            //marketruleinformation
            path: 'marketruleinformation',
            component: () => import('@/views/datamanage12/provincearea/marketruleinformation'),
            name: 'provincearea1-marketruleinformation',
            meta: { icon: 'menu',activeName: 7, title: '市场规则信息' }
          },
          {
            path: 'contractinformation',
            component: () => import('@/views/datamanage12/provincearea/contractinformation'),
            name: 'provincearea1-contractinformation',
            redirect: '/datamanage1/provincearea1/contractinformation/salecontract',
            meta: { icon: 'menu',activeName: 7, title: '合同信息' },
            children: [
              {
                path: 'salecontract',
                component: () => import('@/views/datamanage12/provincearea/contractinformation/salecontract'),
                name: 'provincearea1-salecontract',
                meta: { icon: 'menu',activeName: 7, title: '售电合同' }
              },
              {
                path: 'buycontract',
                component: () => import('@/views/datamanage12/provincearea/contractinformation/buycontract'),
                name: 'provincearea1-buycontract',
                meta: { icon: 'menu',activeName: 7, title: '购电合同' }
              }
            ]
          },
        ]
      },
    ]
  }
  
  export default datamanageRouter
  