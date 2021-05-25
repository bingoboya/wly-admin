const { authCode, authInfo, authLogin, authLogout, menusBuild,  } = require("./common"); // 登陆登出用户信息的等通用接口模块
const { dictDetail, users, dept, apiRoles,rolesLevel, menusLazy, apiMenus,apiJob,apiDict,apiJobs  } = require("./sysmanage"); // 系统管理模块
const { apiLocalStorage  } = require("./systool"); // 系统工具模块
module.exports = {
  dictDetail,
  users,
  dept,
  authCode,
  authInfo,
  authLogin,
  authLogout,
  menusBuild,
  apiRoles,
  rolesLevel,
  menusLazy,
  apiMenus,
  apiJob,
  apiDict,
  apiJobs,
  apiLocalStorage
};
