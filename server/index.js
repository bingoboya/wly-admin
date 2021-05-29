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
  const menusBuild1 = [
    {
      path: '/usermanage',
      component: 'Layout',
      redirect: 'noredirect',
      name: 'usermanage',
      meta: { activeName: 7, title: '数据管理',icon: 'menu'},
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
  ]
  res.json(menusBuild1);
  // res.json(menusBuild);
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
//
app.get("/api/dictDetail", (req, res) => {
  res.json(dictDetail);
});
//系统工具-存储管理-本地存储
app.get("/api/buy", (req, res) => {
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
