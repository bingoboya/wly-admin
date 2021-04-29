const {datamanageRouter} = require("./da.js");
const authCode = {
  uuid: "code-key-f77d046a89554c60929a59436543bed3",
  img:
    "data:image/png;base64,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"
};
const authInfo = {
  dataScopes: [],
  roles: ["admin"],
  user: {
    avatarName: "avatar.jpeg",
    avatarPath: "/home/eladmin/avatar/avatar.jpeg",
    createTime: "2018-08-23 09:11:56",
    dept: { id: 2, name: "研发部" },
    email: "admin@el-admin.vip",
    enabled: true,
    gender: "男",
    id: 1,
    jobs: [{ id: 11, name: "全栈开发" }],
    nickName: "管理员",
    phone: "18888888888",
    pwdResetTime: "2020-05-03 16:38:31",
    roles: [{ dataScope: "全部", id: 1, level: 1, name: "超级管理员" }],
    updateTime: "2020-09-05 10:43:31",
    username: "admin"
  }
};
const authLogin = {
  user: {
    dataScopes: [],
    roles: ["admin"],
    user: {
      avatarName: "avatar.jpeg",
      avatarPath: "/home/eladmin/avatar/avatar.jpeg",
      createTime: "2018-08-23 09:11:56",
      dept: { id: 2, name: "研发部" },
      email: "admin@el-admin.vip",
      enabled: true,
      gender: "男",
      id: 1,
      jobs: [{ id: 11, name: "全栈开发" }],
      nickName: "管理员",
      phone: "18888888888",
      pwdResetTime: "2020-05-03 16:38:31",
      roles: [{ dataScope: "全部", id: 1, level: 1, name: "超级管理员" }],
      updateTime: "2020-09-05 10:43:31",
      username: "admin"
    }
  },
  token:
    "Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxZjk1MWRlODVlNTY0MTlkYmYyYmFhMmQ1MDk4NzJkNyIsInVzZXIiOiJhZG1pbiIsInN1YiI6ImFkbWluIn0.Oau9Aka9PIcmlM0s751gDXWy0kEMdMw_3pr-x45o760Rr8iASzN7WCtQUiKyL5V03d9VbiCGAv1osE6qp-fYAg"
};
const authLogout = null; // 登出这个是delete接口,返回null
const menusBuild = [
  
  // datamanageRouter,
  //数据管理 -多级路由
  {
    component: "Layout",
    hidden: false,
    meta: {activeName: 8, icon: "menu", noCache: true, title: "动态数据管理" },
    name: "数据管理",
    path: "/datamanage",
    redirect: "noredirect",
    alwaysShow: true,
    children: [
      {
        component: "ParentView",
        hidden: false,
        meta: {activeName: 8, icon: "menu", noCache: true, title: "二级菜单1" },
        name: "data二级菜单1",
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
                component: "datamanage/menu1/menu1-1",
                hidden: false,
                meta: {activeName: 8, icon: "menu", noCache: false, title: "四级菜单1" },
                name: "data四级菜单1",
                path: "menu4-1",
                // children: [
                //   {
                //     component: "datamanage/menu1/menu1-1",
                //     hidden: false,
                //     meta: {activeName: 8, icon: "menu", noCache: false, title: "五级菜单1" },
                //     name: "data五级菜单1",
                //     path: "menu5-1",
                //   },
                //   {
                //     component: "datamanage/menu1/menu1-2",
                //     hidden: false,
                //     meta: {activeName: 8, icon: "menu", noCache: true, title: "五级菜单2" },
                //     name: "data五级菜单2",
                //     path: "menu5-2"
                //   }
                // ],
              },
              {
                component: "datamanage/menu1/menu1-2",
                hidden: false,
                meta: {activeName: 8, icon: "menu", noCache: true, title: "四级菜单2" },
                name: "data四级菜单2",
                path: "menu4-2"
              }
            ],
          },
          {
            component: "datamanage/menu1/menu1-2",
            hidden: false,
            meta: {activeName: 8, icon: "menu", noCache: true, title: "三级菜单2" },
            name: "data三级菜单2",
            path: "menu1-2"
          }
        ],
      },
      {
        component: "datamanage/menu2/index",
        hidden: false,
        meta: {activeName: 8, icon: "menu", noCache: true, title: "二级菜单2" },
        name: "data二级菜单2",
        path: "menu2"
      },
      {
        component: "datamanage/menu2/index",
        hidden: false,
        meta: {activeName: 8, icon: "menu", noCache: true, title: "二级菜单3" },
        name: "data二级菜单3",
        path: "menu3"
      }
    ]
  },

  //多级菜单
  {
    component: "Layout",
    hidden: false,
    meta: {activeName: 9, icon: "menu", noCache: true, title: "多级菜单" },
    name: "多级菜单",
    path: "/nested",
    redirect: "noredirect",
    alwaysShow: true,
    children: [
      {
        alwaysShow: true,
        children: [
          {
            component: "nested/menu1/menu1-1",
            hidden: false,
            meta: {activeName: 9, icon: "menu", noCache: false, title: "三级菜单1" },
            name: "Test",
            path: "menu1-1"
          },
          {
            component: "nested/menu1/menu1-2",
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
        component: "nested/menu2/index",
        hidden: false,
        meta: {activeName: 9, icon: "menu", noCache: true, title: "二级菜单2" },
        name: "二级菜单2",
        path: "menu2"
      }
    ]
  },

  


  // 系统管理
  {
    component: "Layout",
    hidden: false,
    meta: { icon: "system", noCache: true, title: "系统管理" },
    name: "系统管理",
    path: "/system",
    redirect: "noredirect",
    alwaysShow: true,
    children: [
      {
        component: "system/user/index",
        hidden: false,
        meta: { icon: "peoples", noCache: true, title: "用户管理" },
        name: "User",
        path: "user"
      },
  //     {
  //       component: "system/role/index",
  //       hidden: false,
  //       meta: { icon: "role", noCache: true, title: "角色管理" },
  //       name: "Role",
  //       path: "role"
  //     },
      // {
      //   component: "system/menu/index",
      //   hidden: false,
      //   meta: { icon: "menu", noCache: true, title: "菜单管理" },
      //   name: "Menu",
      //   path: "menu"
      // },
  //     {
  //       component: "system/dept/index",
  //       hidden: false,
  //       meta: { icon: "dept", noCache: true, title: "部门管理" },
  //       name: "Dept",
  //       path: "dept"
  //     },
  //     {
  //       component: "system/job/index",
  //       hidden: false,
  //       meta: { icon: "Steve-Jobs", noCache: true, title: "岗位管理" },
  //       name: "Job",
  //       path: "job"
  //     },
  //     {
  //       component: "system/dict/index",
  //       hidden: false,
  //       meta: { icon: "dictionary", noCache: true, title: "字典管理" },
  //       name: "Dict",
  //       path: "dict"
  //     },
  //     {
  //       component: "system/timing/index",
  //       hidden: false,
  //       meta: { icon: "timing", noCache: true, title: "任务调度" },
  //       name: "Timing",
  //       path: "timing"
  //     }
    ]
  },
  //TODO 权限管理
  // {
  //   component: "Layout",
  //   hidden: false,
  //   meta: { icon: "system", noCache: true, title: "权限管理" },
  //   name: "权限管理",
  //   path: "/permissionmanage",
  //   redirect: "noredirect",
  //   alwaysShow: true,
  //   children: [
  //     {
  //       component: "permissionmanage/user/index",
  //       hidden: false,
  //       meta: { icon: "peoples", noCache: true, title: "用户管理" },
  //       name: "permissionmanageUser",
  //       path: "user"
  //     },
  //     {
  //       component: "permissionmanage/role/index",
  //       hidden: false,
  //       meta: { icon: "role", noCache: true, title: "角色管理" },
  //       name: "permissionmanageRole",
  //       path: "role"
  //     },
  //     {
  //       component: "permissionmanage/menu/index",
  //       hidden: false,
  //       meta: { icon: "menu", noCache: true, title: "菜单管理" },
  //       name: "permissionmanageMenu",
  //       path: "menu"
  //     },
  //     {
  //       component: "permissionmanage/dept/index",
  //       hidden: false,
  //       meta: { icon: "dept", noCache: true, title: "部门管理" },
  //       name: "permissionmanageDept",
  //       path: "dept"
  //     },
  //     {
  //       component: "permissionmanage/job/index",
  //       hidden: false,
  //       meta: { icon: "Steve-Jobs", noCache: true, title: "岗位管理" },
  //       name: "permissionmanageJob",
  //       path: "job"
  //     },
  //     {
  //       component: "permissionmanage/dict/index",
  //       hidden: false,
  //       meta: { icon: "dictionary", noCache: true, title: "字典管理" },
  //       name: "permissionmanageDict",
  //       path: "dict"
  //     },
  //     {
  //       component: "permissionmanage/timing/index",
  //       hidden: false,
  //       meta: { icon: "timing", noCache: true, title: "任务调度" },
  //       name: "permissionmanageTiming",
  //       path: "timing"
  //     }
  //   ]
  // },
  // {
  //   component: "Layout",
  //   hidden: false,
  //   meta: { icon: "monitor", noCache: true, title: "系统监控" },
  //   name: "系统监控",
  //   path: "/monitor",
  //   redirect: "noredirect",
  //   alwaysShow: true,
  //   children: [
  //     {
  //       component: "monitor/online/index",
  //       hidden: false,
  //       meta: { icon: "Steve-Jobs", noCache: true, title: "在线用户" },
  //       name: "OnlineUser",
  //       path: "online"
  //     },
  //     {
  //       component: "monitor/log/index",
  //       hidden: false,
  //       meta: { icon: "log", noCache: false, title: "操作日志" },
  //       name: "Log",
  //       path: "logs"
  //     },
  //     {
  //       component: "monitor/log/errorLog",
  //       hidden: false,
  //       meta: { icon: "error", noCache: true, title: "异常日志" },
  //       name: "ErrorLog",
  //       path: "errorLog"
  //     },
  //     {
  //       component: "monitor/server/index",
  //       hidden: false,
  //       meta: { icon: "codeConsole", noCache: true, title: "服务监控" },
  //       name: "ServerMonitor",
  //       path: "server"
  //     },
  //     {
  //       component: "monitor/sql/index",
  //       hidden: true,
  //       meta: { icon: "sqlMonitor", noCache: true, title: "SQL监控" },
  //       name: "Sql",
  //       path: "druid"
  //     }
  //   ]
  // },
  // {
  //   component: "Layout",
  //   hidden: false,
  //   meta: { icon: "mnt", noCache: true, title: "运维管理" },
  //   name: "Mnt",
  //   path: "/mnt",
  //   redirect: "noredirect",
  //   alwaysShow: true,
  //   children: [
  //     {
  //       component: "mnt/server/index",
  //       hidden: false,
  //       meta: { icon: "server", noCache: true, title: "服务器" },
  //       name: "ServerDeploy",
  //       path: "mnt/serverDeploy"
  //     },
  //     {
  //       component: "mnt/app/index",
  //       hidden: false,
  //       meta: { icon: "app", noCache: true, title: "应用管理" },
  //       name: "App",
  //       path: "mnt/app"
  //     },
  //     {
  //       component: "mnt/deploy/index",
  //       hidden: false,
  //       meta: { icon: "deploy", noCache: true, title: "部署管理" },
  //       name: "Deploy",
  //       path: "mnt/deploy"
  //     },
  //     {
  //       component: "mnt/deployHistory/index",
  //       hidden: false,
  //       meta: { icon: "backup", noCache: true, title: "部署备份" },
  //       name: "DeployHistory",
  //       path: "mnt/deployHistory"
  //     },
  //     {
  //       component: "mnt/database/index",
  //       hidden: false,
  //       meta: { icon: "database", noCache: true, title: "数据库管理" },
  //       name: "Database",
  //       path: "mnt/database"
  //     }
  //   ]
  // },
  // {
  //   component: "Layout",
  //   hidden: false,
  //   meta: { icon: "sys-tools", noCache: true, title: "系统工具" },
  //   name: "系统工具",
  //   path: "/sys-tools",
  //   redirect: "noredirect",
  //   alwaysShow: true,
  //   children: [
  //     {
  //       component: "generator/index",
  //       hidden: false,
  //       meta: { icon: "dev", noCache: false, title: "代码生成" },
  //       name: "GeneratorIndex",
  //       path: "generator"
  //     },
  //     {
  //       component: "generator/config",
  //       hidden: true,
  //       meta: { icon: "dev", noCache: false, title: "生成配置" },
  //       name: "GeneratorConfig",
  //       path: "generator/config/:tableName"
  //     },
  //     {
  //       component: "tools/storage/index",
  //       hidden: false,
  //       meta: { icon: "qiniu", noCache: true, title: "存储管理" },
  //       name: "Storage",
  //       path: "storage"
  //     },
  //     {
  //       component: "tools/email/index",
  //       hidden: false,
  //       meta: { icon: "email", noCache: true, title: "邮件工具" },
  //       name: "Email",
  //       path: "email"
  //     },
  //     {
  //       component: "tools/swagger/index",
  //       hidden: true,
  //       meta: { icon: "swagger", noCache: true, title: "接口文档" },
  //       name: "Swagger",
  //       path: "swagger2"
  //     },
  //     {
  //       component: "tools/aliPay/index",
  //       hidden: false,
  //       meta: { icon: "alipay", noCache: true, title: "支付宝工具" },
  //       name: "AliPay",
  //       path: "aliPay"
  //     },
  //     {
  //       component: "generator/preview",
  //       hidden: true,
  //       meta: { icon: "java", noCache: false, title: "生成预览" },
  //       name: "Preview",
  //       path: "generator/preview/:tableName"
  //     }
  //   ]
  // },
  // {
  //   component: "Layout",
  //   hidden: false,
  //   meta: { icon: "zujian", noCache: true, title: "组件管理" },
  //   name: "组件管理",
  //   path: "/components",
  //   redirect: "noredirect",
  //   alwaysShow: true,
  //   children: [
  //     {
  //       component: "components/Echarts",
  //       hidden: false,
  //       meta: { icon: "chart", noCache: false, title: "图表库" },
  //       name: "Echarts",
  //       path: "echarts"
  //     },
  //     {
  //       component: "components/icons/index",
  //       hidden: false,
  //       meta: { icon: "icon", noCache: true, title: "图标库" },
  //       name: "Icons",
  //       path: "icon"
  //     },
  //     {
  //       component: "components/Editor",
  //       hidden: false,
  //       meta: { icon: "fwb", noCache: true, title: "富文本" },
  //       name: "Editor",
  //       path: "tinymce"
  //     },
  //     {
  //       component: "components/MarkDown",
  //       hidden: false,
  //       meta: { icon: "markdown", noCache: true, title: "Markdown" },
  //       name: "Markdown",
  //       path: "markdown"
  //     },
  //     {
  //       component: "components/YamlEdit",
  //       hidden: false,
  //       meta: { icon: "dev", noCache: true, title: "Yaml编辑器" },
  //       name: "YamlEdit",
  //       path: "yaml"
  //     }
  //   ]
  // },
  
];

module.exports = {
  authCode,
  authInfo,
  authLogin,
  authLogout,
  menusBuild
};
