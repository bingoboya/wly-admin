


const datamanageRouter = {
    path: '/datamanage1',
    component: 'Layout',
    redirect: 'noredirect',
    name: 'DataManage12',
    meta: { activeName: 7, title: '固定数据管理',icon: 'menu'},
    children: [
      {
        path: 'peddingapproval',
        name: 'peddingapproval',
        component: (resolve) => require(['@/views/datamanage12/peddingapproval/index'], resolve),
        meta: { activeName: 7, icon: 'menu', title: '待1办审批' }
      },
      {
        path: 'all',
        name: 'all',
        component: () => import('@/views/datamanage12/all/index'),
        meta: { activeName: 7, icon: 'menu', title: 'ALL' }
      },
      {
        //省份地区
        path: 'provincearea',
        component: () => import('@/views/datamanage12/provincearea/index'), // Parent router-view
        name: 'provincearea',
        meta: { activeName: 7, icon: 'menu', title: '广东' },
        redirect: 'noredirect',
        children: [
          {
            //institutionalinformation
            path: 'institutionalinformation',
            component: () => import('@/views/datamanage12/provincearea/institutionalinformation'),
            name: 'provincearea-institutionalinformation',
            meta: { activeName: 7, icon: 'menu', title: '机构信息' }
          },
          {
            //intersogueinformation
            path: 'intersogueinformation',
            component: () => import('@/views/datamanage12/provincearea/intersogueinformation'),
            name: 'provincearea-intersogueinformation',
            meta: { activeName: 7, icon: 'menu', title: '居间人信息' }
          },
          {
            //marketruleinformation
            path: 'marketruleinformation',
            component: () => import('@/views/datamanage12/provincearea/marketruleinformation'),
            name: 'provincearea-marketruleinformation',
            meta: { activeName: 7, icon: 'menu', title: '市场规则信息' }
          },
          {
            path: 'contractinformation',
            component: () => import('@/views/datamanage12/provincearea/contractinformation'),
            name: 'provincearea-contractinformation',
            redirect: 'noredirect',
            meta: { activeName: 7, icon: 'menu', title: '合同信息' },
            children: [
              {
                path: 'salecontract',
                component: () => import('@/views/datamanage12/provincearea/contractinformation/salecontract'),
                name: 'contractinformation-salecontract',
                meta: { activeName: 7, icon: 'menu', title: '售电合同' }
              },
              {
                path: 'buycontract',
                component: () => import('@/views/datamanage12/provincearea/contractinformation/buycontract'),
                name: 'buycontract',
                meta: { activeName: 7, icon: 'menu', title: '购电合同' }
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
        meta: { activeName: 7, icon: 'menu', title: '四川' },
        redirect: 'noredirect',
        children: [
          {
            //institutionalinformation
            path: 'institutionalinformation',
            component: () => import('@/views/datamanage12/provincearea/institutionalinformation'),
            name: 'provincearea1-institutionalinformation',
            meta: { activeName: 7, icon: 'menu', title: '机构信息' }
          },
          {
            //intersogueinformation
            path: 'intersogueinformation',
            component: () => import('@/views/datamanage12/provincearea/intersogueinformation'),
            name: 'provincearea1-intersogueinformation',
            meta: { activeName: 7, icon: 'menu', title: '居间人信息' }
          },
          {
            //marketruleinformation
            path: 'marketruleinformation',
            component: () => import('@/views/datamanage12/provincearea/marketruleinformation'),
            name: 'provincearea1-marketruleinformation',
            meta: { activeName: 7, icon: 'menu', title: '市场规则信息' }
          },
          {
            path: 'contractinformation',
            component: () => import('@/views/datamanage12/provincearea/contractinformation'),
            name: 'provincearea1-contractinformation',
            redirect: 'noredirect',
            meta: { activeName: 7, icon: 'menu', title: '合同信息' },
            children: [
              {
                path: 'salecontract',
                component: () => import('@/views/datamanage12/provincearea/contractinformation/salecontract'),
                name: 'provincearea1-salecontract',
                meta: { activeName: 7, icon: 'menu', title: '售电合同' }
              },
              {
                path: 'buycontract',
                component: () => import('@/views/datamanage12/provincearea/contractinformation/buycontract'),
                name: 'provincearea1-buycontract',
                meta: { activeName: 7, icon: 'menu', title: '购电合同' }
              }
            ]
          },
        ]
      },
    ]
  }
  
  module.exports = {
    datamanageRouter
  }