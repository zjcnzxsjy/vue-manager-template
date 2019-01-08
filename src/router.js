import Vue from "vue";
import Router from "vue-router";
import Layout from "./layout/Layout.vue";

Vue.use(Router);

let routers = [];
function gatherRouters(items) {
  Array.isArray(items) && items.forEach((item, index) => {
    if('root' === item.pid) {
      item.component = Layout;
    }
    if (item.children && item.children.length > 0) {
      gatherRouters(item.children)
    } else {
      item.component = () => import(`./views/${item.componentUrl}`);
    }
  })
  return items;
}

//子模块路由注册
const requireRouter = require.context('./views', true, /router.js/);
requireRouter.keys().forEach(fileName => {
  const temp = gatherRouters({...requireRouter(fileName)}.routers);
  if (temp) {
    routers = routers.concat(temp);
  }
})


const oriRouters = [
  {
    id: 'login',
    path: '/login',
    name: 'login',
    component: () => import("./views/login/Login.vue"),
    hidden: true
  },
  {
    id: 'components',
    path: '/components/',
    name: '组件示例',
    component: Layout,
    icon: 'third-icon-icon-test',
    children: [
      {
        id: "table",
        path: "table",
        name: "基础表格",
        component: () => import("./views/components/Table.vue")
      }
    ]
  },
  {
    id: '404',
    path: '/404',
    name: '404错误页面',
    component: () => import("./views/errorPage/404.vue"),
    icon: 'third-icon-icon-test'
  },
  {
    path: '*',
    redirect: '/404', 
    hidden: true
  }
];
routers = routers.concat(oriRouters)

export {routers};

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: routers
});
