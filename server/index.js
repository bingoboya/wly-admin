const express = require("express");
const app = new express();
// const Mock = require('mockjs')
// console.log('mock', +Mock.Random.date('T'));
const merge = require("./merge");

const bodyParser = require("body-parser");

var http = require("http").createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const {
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
  apiDict,apiJobs,
  apiLocalStorage
} = merge;
// 获取用户信息接口
app.get("/auth/code", (req, res) => {
  res.json(authCode);
});

app.get("/auth/info", (req, res) => {
  console.log('auth/info');
  res.json(authInfo);
});

// 登陆接口
app.post("/auth/login", (req, res) => {
  console.log('auth/login');
  res.json(authLogin);
});
// 登出接口
app.delete("/auth/logout", (req, res) => {
  console.log('logout');
  res.json(authLogout);
});

app.get("/api/menus/build", (req, res) => {
  console.log('build');
  res.json(menusBuild);
});

app.get("/api/dictDetail", (req, res) => {
  res.json(dictDetail);
});
app.get("/api/users", (req, res) => {
  res.json(users);
});
app.get("/api/dept", (req, res) => {
  res.json(dept);
});

app.get("/api/roles/level", (req, res) => {
  res.json( rolesLevel);
});
app.get("/api/roles", (req, res) => {
  res.json(apiRoles);
});
app.get("/api/menus/lazy", (req, res) => {
  res.json(menusLazy);
});
app.get("/api/menus", (req, res) => {
  res.json(apiMenus);
});
app.get("/api/job", (req, res) => {
  res.json(apiJob);
});
app.get("/api/dict", (req, res) => {
  res.json(apiDict);
});
app.get("/api/jobs", (req, res) => {
  res.json(apiJobs);
});
//系统工具-存储管理-本地存储
app.get("/api/localStorage", (req, res) => {
  console.log(req.query, apiLocalStorage[`content${req.query.page}`]);
  const result = {
    content: apiLocalStorage[`content${req.query.page}`],
    totalElements: 35
  }
  res.json(result);
});
//系统工具-存储管理-七牛云存储
app.get("/api/qiNiuContent", (req, res) => {
  const result = {
    content: apiLocalStorage[`content${req.query.page}`],
    totalElements: 35
  }
  res.json(result);
});

http.listen(3007, { origins: "*:*" });
