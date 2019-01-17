import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getUserInfo } from './utils/Authority' // getUserInfo from cookie
import request from './utils/Request';
import './mock';
import './components';

NProgress.configure({ showSpinner: false });

Vue.config.productionTip = false;
Vue.prototype.$request = request;
Vue.use(ElementUI, {
  size: 'mini'
});

const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
  NProgress.start();
  const userInfo = getUserInfo();
  if (userInfo.user_name) {
    if('/login' === to.path) {
      next('/');
      NProgress.done();
    } else {
      if(userInfo.roles) {
        if (store.getters['Permission/accessedRouters'] && 0 === store.getters['Permission/accessedRouters'].length) {
          store.dispatch('Permission/GenerateAccessedRoutes', userInfo.roles)
          .then(() => {
            router.addRoutes(store.getters['Permission/accessedRouters']);
            next();
          })
        } else {
          next();
        }
        
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login');
      NProgress.done();
    }
    
  }
})

router.afterEach(() => {
  NProgress.done();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


