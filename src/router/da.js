import Layout from '../layout/index'

const datamanageRouter = {
  path: '/usermanage',
  component: Layout,
  redirect: '/datamanage1/peddingapproval',
  name: 'usermanage',
  meta: { activeName: 7, title: '数据2管理', icon: 'menu' },
  children: [
    {
      path: 'peddingapproval',
      name: 'peddingapproval',
      // 在前端路由创建路由表时，组件要写成require
      // component: "usermanage/peddingapproval/index",
      component: (resolve) => require(['@/views/usermanage/peddingapproval/index'], resolve),
      // component: () => import('@/views/usermanage/peddingapproval/index'),
      meta: { icon: 'menu', activeName: 7, title: '待办审批' }
    },
    {
      path: 'all',
      name: 'all',
      component: () => import('@/views/usermanage/all/index'),
      meta: { icon: 'menu', activeName: 7, title: 'ALL' }
    },
    {
      // 省份地区
      path: 'provincearea',
      component: () => import('@/views/usermanage/provincearea/index'), // Parent router-view
      name: 'provincearea',
      meta: { icon: 'menu', activeName: 7, title: '广东' },
      redirect: '/datamanage1/provincearea/contractinformation',
      children: [
        {
          // institutionalinformation
          path: 'institutionalinformation',
          component: () => import('@/views/usermanage/provincearea/institutionalinformation'),
          name: 'provincearea-institutionalinformation',
          meta: { icon: 'menu', activeName: 7, title: '机构信息' }
        },
        {
          // intersogueinformation
          path: 'intersogueinformation',
          component: () => import('@/views/usermanage/provincearea/intersogueinformation'),
          name: 'provincearea-intersogueinformation',
          meta: { icon: 'menu', activeName: 7, title: '居间人信息' }
        },
        {
          // marketruleinformation
          path: 'marketruleinformation',
          component: () => import('@/views/usermanage/provincearea/marketruleinformation'),
          name: 'provincearea-marketruleinformation',
          meta: { icon: 'menu', activeName: 7, title: '市场规则信息' }
        },
        {
          path: 'contractinformation',
          component: () => import('@/views/usermanage/provincearea/contractinformation'),
          name: 'provincearea-contractinformation',
          redirect: '/datamanage1/provincearea/contractinformation/salecontract',
          meta: { icon: 'menu', activeName: 7, title: '合同信息' },
          children: [
            {
              path: 'salecontract',
              component: () => import('@/views/usermanage/provincearea/contractinformation/salecontract'),
              name: 'contractinformation-salecontract',
              meta: { icon: 'menu', activeName: 7, title: '售电合同' }
            },
            {
              path: 'buycontract',
              component: () => import('@/views/usermanage/provincearea/contractinformation/buycontract'),
              name: 'buycontract',
              meta: { icon: 'menu', activeName: 7, title: '购电合同' }
            }
          ]
        }
      ]
    },
    {
      // 省份地区
      path: 'provincearea1',
      component: () => import('@/views/usermanage/provincearea/index'), // Parent router-view
      name: 'provincearea1-provincearea',
      meta: { icon: 'menu', activeName: 7, title: '四川' },
      redirect: '/datamanage1/provincearea1/contractinformation',
      children: [
        {
          // institutionalinformation
          path: 'institutionalinformation',
          component: () => import('@/views/usermanage/provincearea/institutionalinformation'),
          name: 'provincearea1-institutionalinformation',
          meta: { icon: 'menu', activeName: 7, title: '机构信息' }
        },
        {
          // intersogueinformation
          path: 'intersogueinformation',
          component: () => import('@/views/usermanage/provincearea/intersogueinformation'),
          name: 'provincearea1-intersogueinformation',
          meta: { icon: 'menu', activeName: 7, title: '居间人信息' }
        },
        {
          // marketruleinformation
          path: 'marketruleinformation',
          component: () => import('@/views/usermanage/provincearea/marketruleinformation'),
          name: 'provincearea1-marketruleinformation',
          meta: { icon: 'menu', activeName: 7, title: '市场规则信息' }
        },
        {
          path: 'contractinformation',
          component: () => import('@/views/usermanage/provincearea/contractinformation'),
          name: 'provincearea1-contractinformation',
          redirect: '/datamanage1/provincearea1/contractinformation/salecontract',
          meta: { icon: 'menu', activeName: 7, title: '合同信息' },
          children: [
            {
              path: 'salecontract',
              component: () => import('@/views/usermanage/provincearea/contractinformation/salecontract'),
              name: 'provincearea1-salecontract',
              meta: { icon: 'menu', activeName: 7, title: '售电合同' }
            },
            {
              path: 'buycontract',
              component: () => import('@/views/usermanage/provincearea/contractinformation/buycontract'),
              name: 'provincearea1-buycontract',
              meta: { icon: 'menu', activeName: 7, title: '购电合同' }
            }
          ]
        }
      ]
    }
  ]
}

export default datamanageRouter
