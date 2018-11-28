import Vue from "vue";
import Router from "vue-router";
import Layout from "./layout/Layout.vue";

Vue.use(Router);
export const routers = [
  {
    id: 'login',
    path: '/login',
    name: 'login',
    component: () => import("./views/login/Login.vue"),
    hidden: true
  },
  {
    id: 'index',
    path: '/',
    redirect: '/mainIndex',
    component: Layout,
    icon: 'third-icon-dashbord',
    children: [
      {
        id: "mainIndex",
        path: "mainIndex",
        name: "首页",
        component: () => import("./views/dashbord/MainIndex.vue")
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
    id: '401',
    path: '/404',
    name: '404错误页面',
    component: () => import("./views/errorPage/404.vue"),
    icon: 'third-icon-icon-test'
  },
  {
    id: '402',
    path: '/404',
    name: '404错误页面',
    component: () => import("./views/errorPage/404.vue"),
    icon: 'third-icon-icon-test'
  },
  {
    id: '403',
    path: '/404',
    name: '404错误页面',
    component: () => import("./views/errorPage/404.vue"),
    icon: 'third-icon-icon-test'
  },
  {
    id: '405',
    path: '/404',
    name: '404错误页面',
    component: () => import("./views/errorPage/404.vue"),
    icon: 'third-icon-icon-test'
  },
  {
    id: '406',
    path: '/404',
    name: '404错误页面',
    component: () => import("./views/errorPage/404.vue"),
    icon: 'third-icon-icon-test'
  },
  {
    id: '407',
    path: '/404',
    name: '404错误页面',
    component: () => import("./views/errorPage/404.vue"),
    icon: 'third-icon-icon-test'
  },
  {
    id: '408',
    path: '/404',
    name: '404错误页面',
    component: () => import("./views/errorPage/404.vue"),
    icon: 'third-icon-icon-test'
  },
  {
    id: '409',
    path: '/404',
    name: '404错误页面',
    component: () => import("./views/errorPage/404.vue"),
    icon: 'third-icon-icon-test'
  },
  {
    id: '410',
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
export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: routers
});
