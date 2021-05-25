
// 用户管理的路由数据
const userManageRouter = {
    path: '/usermanage',
    component: 'Layout',
    redirect: 'noredirect',
    name: 'usermanage',
    meta: { activeName: 7, title: ' 用户管理',icon: 'menu'},
    children: [
      {
        path: 'peddingapproval',
        name: 'peddingapproval',
        // 组件要写成字符串
        component: "usermanage/peddingapproval/index",
        // component: (resolve) => require(['@/views/usermanage/peddingapproval/index'], resolve),
        meta: { activeName: 7, icon: 'menu', title: '待办审批' }
      },
      {
        path: 'all',
        name: 'all',
        component: "usermanage/all/index",
        meta: { activeName: 7, icon: 'menu', title: 'ALL' }
      },
      {
        //省份地区
        path: 'provincearea',
        // component: () => import('@/views/usermanage/provincearea/index'), // Parent router-view
        component: "usermanage/provincearea/index",
        name: 'provincearea',
        meta: { activeName: 7, icon: 'menu', title: '广东' },
        redirect: 'noredirect',
        children: [
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
        ]
      },
      {
        //省份地区
        path: 'provincearea1',
        component: "usermanage/provincearea/index",
        name: 'provincearea1-provincearea',
        meta: { activeName: 7, icon: 'menu', title: '四川' },
        redirect: 'noredirect',
        children: [
          {
            path: 'institutionalinformation',
            component: "usermanage/provincearea/institutionalinformation",
            name: 'provincearea1-institutionalinformation',
            meta: { activeName: 7, icon: 'menu', title: '机构信息' }
          },
          {
            path: 'intersogueinformation',
            component: "usermanage/provincearea/intersogueinformation",
            name: 'provincearea1-intersogueinformation',
            meta: { activeName: 7, icon: 'menu', title: '居间人信息' }
          },
          {
            path: 'marketruleinformation',
            component: "usermanage/provincearea/marketruleinformation",
            name: 'provincearea1-marketruleinformation',
            meta: { activeName: 7, icon: 'menu', title: '市场规则信息' }
          },
          {
            path: 'contractinformation',
            component: "usermanage/provincearea/contractinformation",
            name: 'provincearea1-contractinformation',
            redirect: 'noredirect',
            meta: { activeName: 7, icon: 'menu', title: '合同信息' },
            children: [
              {
                path: 'salecontract',
                component: "usermanage/provincearea/contractinformation/salecontract",
                name: 'provincearea1-salecontract',
                meta: { activeName: 7, icon: 'menu', title: '售电合同' }
              },
              {
                path: 'buycontract',
                component: "usermanage/provincearea/contractinformation/buycontract",
                name: 'provincearea1-buycontract',
                meta: { activeName: 7, icon: 'menu', title: '购电合同' }
              }
            ]
          },
        ]
      },
    ]
  }
  
// 配置管理的路由数据
const configManageRouter = {
    component: "Layout",
    hidden: false,
    meta: {activeName: 8, icon: "menu", noCache: true, title: "配置管理" },
    name: "数据管理",
    path: "/configmanage",
    redirect: "noredirect",
    alwaysShow: true,
    children: [
      {
        component: "ParentView",
        hidden: false,
        meta: {activeName: 8, icon: "menu", noCache: true, title: "二级菜单1" },
        name: "二级菜单",
        path: "menu1",
        redirect: "noredirect",
        alwaysShow: true,
        children: [
          {
            component: "ParentView",
            hidden: false,
            meta: {activeName: 8, icon: "menu", noCache: false, title: "三级菜单1" },
            name: "data三级菜单1",
            redirect: "noredirect",
            path: "menu1-1",
            children: [
              {
                // component: "ParentView",//增加子组件时，component 要设置成 ParentView
                component: "configmanage/menu1/menu1-1",
                hidden: false,
                meta: {activeName: 8, icon: "menu", noCache: false, title: "四级菜单1" },
                name: "data四级菜单1",
                path: "menu4-1",
                // children: [
                //   {
                //     component: "configmanage/menu1/menu1-1",
                //     hidden: false,
                //     meta: {activeName: 8, icon: "menu", noCache: false, title: "五级菜单1" },
                //     name: "data五级菜单1",
                //     path: "menu5-1",
                //   },
                //   {
                //     component: "configmanage/menu1/menu1-2",
                //     hidden: false,
                //     meta: {activeName: 8, icon: "menu", noCache: true, title: "五级菜单2" },
                //     name: "data五级菜单2",
                //     path: "menu5-2"
                //   }
                // ],
              },
              {
                component: "configmanage/menu1/menu1-2",
                hidden: false,
                meta: {activeName: 8, icon: "menu", noCache: true, title: "四级菜单2" },
                name: "data四级菜单2",
                path: "menu4-2"
              }
            ],
          },
          {
            component: "configmanage/menu1/menu1-2",
            hidden: false,
            meta: {activeName: 8, icon: "menu", noCache: true, title: "三级菜单2" },
            name: "data三级菜单2",
            path: "menu1-2"
          }
        ],
      },
      {
        component: "configmanage/menu2/index",
        hidden: false,
        meta: {activeName: 8, icon: "menu", noCache: true, title: "二级菜单2" },
        name: "data二级菜单2",
        path: "menu2"
      },
      {
        component: "configmanage/menu2/index",
        hidden: false,
        meta: {activeName: 8, icon: "menu", noCache: true, title: "二级菜单3" },
        name: "data二级菜单3",
        path: "menu3"
      }]}


// 角色管理的路由数据
const roleManageRouter = {
  component: "Layout",
  hidden: false,
  meta: {activeName: 9, icon: "menu", noCache: true, title: "角色管理" },
  name: "角色管理",
  path: "/rolemanage",
  redirect: "noredirect",
  alwaysShow: true,
  children: [
    {
      alwaysShow: true,
      children: [
        {
          component: "rolemanage/menu1/menu1-1",
          hidden: false,
          meta: {activeName: 9, icon: "menu", noCache: false, title: "三级菜单1" },
          name: "Test",
          path: "menu1-1"
        },
        {
          component: "rolemanage/menu1/menu1-2",
          hidden: false,
          meta: {activeName: 9, icon: "menu", noCache: true, title: "三级菜单2" },
          name: "三级菜单2",
          path: "menu1-2"
        }
      ],
      component: "ParentView",
      hidden: false,
      meta: {activeName: 9, icon: "menu", noCache: true, title: "二级菜单1" },
      name: "二级菜单1",
      path: "menu1",
      redirect: "noredirect"
    },
    {
      component: "rolemanage/menu2/index",
      hidden: false,
      meta: {activeName: 9, icon: "menu", noCache: true, title: "二级菜单2" },
      name: "二级菜单2",
      path: "menu2"
    }
  ]
}

//系统管理
const systemManageRouter = {
  component: "Layout",
  hidden: false,
  meta: { activeName: 9, icon: "system", noCache: true, title: "系统管理" },
  name: "系统管理",
  path: "/systemmanage",
  redirect: "noredirect",
  alwaysShow: true,
  children: [
    {
      component: "system/user/index",
      hidden: false,
      meta: { activeName: 9, icon: "peoples", noCache: true, title: "用户管理" },
      name: "User",
      path: "user"
    },
    {
      component: "system/role/index",
      hidden: false,
      meta: { activeName: 9, icon: "role", noCache: true, title: "角色管理" },
      name: "Role",
      path: "role"
    },
    // {
    //   component: "system/menu/index",
    //   hidden: false,
    //   meta: { activeName: 9, icon: "menu", noCache: true, title: "菜单管理" },
    //   name: "Menu",
    //   path: "menu"
    // },
    // {
    //   component: "system/dept/index",
    //   hidden: false,
    //   meta: { activeName: 9, icon: "dept", noCache: true, title: "部门管理" },
    //   name: "Dept",
    //   path: "dept"
    // },
    // {
    //   component: "system/job/index",
    //   hidden: false,
    //   meta: { activeName: 9, icon: "Steve-Jobs", noCache: true, title: "岗位管理" },
    //   name: "Job",
    //   path: "job"
    // },
    // {
    //   component: "system/dict/index",
    //   hidden: false,
    //   meta: { activeName: 9, icon: "dictionary", noCache: true, title: "字典管理" },
    //   name: "Dict",
    //   path: "dict"
    // },
    // {
    //   component: "system/timing/index",
    //   hidden: false,
    //   meta: { activeName: 9, icon: "timing", noCache: true, title: "任务调度" },
    //   name: "Timing",
    //   path: "timing"
    // }
  ]
}

// 权限管理
const permissionManageRouter = {
  component: "Layout",
  hidden: false,
  meta: { activeName: 9, icon: "system", noCache: true, title: "权限管理" },
  name: "权限管理",
  path: "/permissionmanage",
  redirect: "noredirect",
  alwaysShow: true,
  children: [
    {
      component: "permissionmanage/user/index",
      hidden: false,
      meta: { activeName: 9, icon: "peoples", noCache: true, title: "用户管理" },
      name: "permissionmanageUser",
      path: "user"
    },
    {
      component: "permissionmanage/role/index",
      hidden: false,
      meta: { activeName: 9, icon: "role", noCache: true, title: "角色管理" },
      name: "permissionmanageRole",
      path: "role"
    },
    {
      component: "permissionmanage/menu/index",
      hidden: false,
      meta: { activeName: 9, icon: "menu", noCache: true, title: "菜单管理" },
      name: "permissionmanageMenu",
      path: "menu"
    },
    {
      component: "permissionmanage/dept/index",
      hidden: false,
      meta: { activeName: 9, icon: "dept", noCache: true, title: "部门管理" },
      name: "permissionmanageDept",
      path: "dept"
    },
    {
      component: "permissionmanage/job/index",
      hidden: false,
      meta: { activeName: 9, icon: "Steve-Jobs", noCache: true, title: "岗位管理" },
      name: "permissionmanageJob",
      path: "job"
    },
    {
      component: "permissionmanage/dict/index",
      hidden: false,
      meta: { activeName: 9, icon: "dictionary", noCache: true, title: "字典管理" },
      name: "permissionmanageDict",
      path: "dict"
    },
    {
      component: "permissionmanage/timing/index",
      hidden: false,
      meta: { activeName: 9, icon: "timing", noCache: true, title: "任务调度" },
      name: "permissionmanageTiming",
      path: "timing"
    }
  ]
}

// 系统监控
const monitor = {
  component: "Layout",
  hidden: false,
  meta: { activeName: 7, icon: "monitor", noCache: true, title: "系统监控" },
  name: "系统监控",
  path: "/monitor",
  redirect: "noredirect",
  alwaysShow: true,
  children: [
    {
      component: "monitor/online/index",
      hidden: false,
      meta: { activeName: 7, icon: "Steve-Jobs", noCache: true, title: "在线用户" },
      name: "OnlineUser",
      path: "online"
    },
    {
      component: "monitor/log/index",
      hidden: false,
      meta: { activeName: 7, icon: "log", noCache: false, title: "操作日志" },
      name: "Log",
      path: "logs"
    },
    {
      component: "monitor/log/errorLog",
      hidden: false,
      meta: { activeName: 7, icon: "error", noCache: true, title: "异常日志" },
      name: "ErrorLog",
      path: "errorLog"
    },
    {
      component: "monitor/server/index",
      hidden: false,
      meta: { activeName: 7, icon: "codeConsole", noCache: true, title: "服务监控" },
      name: "ServerMonitor",
      path: "server"
    },
    {
      component: "monitor/sql/index",
      hidden: true,
      meta: { activeName: 7, icon: "sqlMonitor", noCache: true, title: "SQL监控" },
      name: "Sql",
      path: "druid"
    }
  ]
}
//运维管理
const mntManageRouter = {
  component: "Layout",
  hidden: false,
  meta: { activeName: 8, icon: "mnt", noCache: true, title: "运维管理" },
  name: "Mnt",
  path: "/mnt",
  redirect: "noredirect",
  alwaysShow: true,
  children: [
    {
      component: "mnt/server/index",
      hidden: false,
      meta: { activeName: 8, icon: "server", noCache: true, title: "服务器" },
      name: "ServerDeploy",
      path: "mnt/serverDeploy"
    },
    {
      component: "mnt/app/index",
      hidden: false,
      meta: { activeName: 8, icon: "app", noCache: true, title: "应用管理" },
      name: "App",
      path: "mnt/app"
    },
    {
      component: "mnt/deploy/index",
      hidden: false,
      meta: { activeName: 8, icon: "deploy", noCache: true, title: "部署管理" },
      name: "Deploy",
      path: "mnt/deploy"
    },
    {
      component: "mnt/deployHistory/index",
      hidden: false,
      meta: { activeName: 8, icon: "backup", noCache: true, title: "部署备份" },
      name: "DeployHistory",
      path: "mnt/deployHistory"
    },
    {
      component: "mnt/database/index",
      hidden: false,
      meta: { activeName: 8, icon: "database", noCache: true, title: "数据库管理" },
      name: "Database",
      path: "mnt/database"
    }
  ]
}

//系统工具
const sysToolsManageRouter = {
  component: "Layout",
  hidden: false,
  meta: { activeName: 9, icon: "sys-tools", noCache: true, title: "系统工具" },
  name: "系统工具",
  path: "/sys-tools",
  redirect: "noredirect",
  alwaysShow: true,
  children: [
    {
      component: "generator/index",
      hidden: false,
      meta: { activeName: 9, icon: "dev", noCache: false, title: "代码生成" },
      name: "GeneratorIndex",
      path: "generator"
    },
    {
      component: "generator/config",
      hidden: true,
      meta: { activeName: 9, icon: "dev", noCache: false, title: "生成配置" },
      name: "GeneratorConfig",
      path: "generator/config/:tableName"
    },
    {
      component: "tools/storage/index",
      hidden: false,
      meta: { activeName: 9, icon: "qiniu", noCache: true, title: "存储管理" },
      name: "Storage",
      path: "storage"
    },
    {
      component: "tools/email/index",
      hidden: false,
      meta: { activeName: 9, icon: "email", noCache: true, title: "邮件工具" },
      name: "Email",
      path: "email"
    },
    {
      component: "tools/swagger/index",
      hidden: true,
      meta: { activeName: 9, icon: "swagger", noCache: true, title: "接口文档" },
      name: "Swagger",
      path: "swagger2"
    },
    {
      component: "tools/aliPay/index",
      hidden: false,
      meta: { activeName: 9, icon: "alipay", noCache: true, title: "支付宝工具" },
      name: "AliPay",
      path: "aliPay"
    },
    {
      component: "generator/preview",
      hidden: true,
      meta: { activeName: 9, icon: "java", noCache: false, title: "生成预览" },
      name: "Preview",
      path: "generator/preview/:tableName"
    }
  ]
}

//组件管理
const componentsManageRouter = {
  component: "Layout",
  hidden: false,
  meta: { activeName: 9, icon: "zujian", noCache: true, title: "组件管理" },
  name: "组件管理",
  path: "/components",
  redirect: "noredirect",
  alwaysShow: true,
  children: [
    {
      component: "components/Echarts",
      hidden: false,
      meta: { activeName: 9, icon: "chart", noCache: false, title: "图表库" },
      name: "Echarts",
      path: "echarts"
    },
    {
      component: "components/icons/index",
      hidden: false,
      meta: { activeName: 9, icon: "icon", noCache: true, title: "图标库" },
      name: "Icons",
      path: "icon"
    },
    {
      component: "components/Editor",
      hidden: false,
      meta: { activeName: 9, icon: "fwb", noCache: true, title: "富文本" },
      name: "Editor",
      path: "tinymce"
    },
    {
      component: "components/MarkDown",
      hidden: false,
      meta: { activeName: 9, icon: "markdown", noCache: true, title: "Markdown" },
      name: "Markdown",
      path: "markdown"
    },
    {
      component: "components/YamlEdit",
      hidden: false,
      meta: { activeName: 9, icon: "dev", noCache: true, title: "Yaml编辑器" },
      name: "YamlEdit",
      path: "yaml"
    }
  ]
}

module.exports = {
  sysToolsManageRouter,
  componentsManageRouter,
  mntManageRouter,
  monitor,
  permissionManageRouter,
  userManageRouter,
  configManageRouter,
  roleManageRouter,
  systemManageRouter
}