import Vue from "vue";
import Router from "vue-router";
import bus from './utils/Bus'
import Layout from "./layout/Layout.vue";

Vue.use(Router);

let routers = [];

//子模块路由注册
bus.$on('routersRegister', (module_routers) => {
  function gatherRouters(items) {
    Array.isArray(items) && items.forEach((item) => {
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
  const temp = gatherRouters(module_routers);
  if (temp) {
    routers = routers.concat(temp);
  }
})


const requireRouter = require.context('./views', true, /router.js/);
  
requireRouter.keys().forEach(fileName => {
  bus.$emit('routersRegister', {...requireRouter(fileName)}.routers);
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
    id: '404',
    path: '/404',
    name: 'error404',
    component: () => import("./views/errorPage/404.vue"),
    meta: {
      title: '404错误页面',
      icon: 'third-icon-icon-test'
    }
  },
  {
    path: '*',
    redirect: '/404', 
    hidden: true
  }
];

routers = routers.concat(oriRouters);

export {routers};

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: routers
});
