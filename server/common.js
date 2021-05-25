const {
  userManageRouter,
  configManageRouter,
  roleManageRouter,
  systemManageRouter,
  componentsManageRouter,
  sysToolsManageRouter,
  mntManageRouter,
  monitor,
  permissionManageRouter
} = require("./userManageRouter.js");

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
  userManageRouter,
  //配置管理
  configManageRouter,
  //角色管理
  roleManageRouter,
  // 系统管理
  systemManageRouter,
  //权限管理
  permissionManageRouter,
  // 系统监控
  monitor,
  //运维管理
  mntManageRouter,
  // 系统工具
  sysToolsManageRouter,
  // 组件管理
  componentsManageRouter
];

module.exports = {
  authCode,
  authInfo,
  authLogin,
  authLogout,
  menusBuild
};
