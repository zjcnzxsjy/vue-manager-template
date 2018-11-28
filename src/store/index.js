import Vue from 'vue';
import Vuex from 'vuex';
// import app from './modules/App';
// import user from './modules/User';
// import permission from './modules/Permission';
// import tabsView from './modules/TabsView';
import getters from './getters.js';

//get Vuex modules
const requireModule = require.context('./modules', false, /\.js$/);
const modules = {};
requireModule.keys().forEach(fileName => {
  const moduleName = fileName.replace(/(\.\/|\.js)/g, '');
  modules[moduleName] = {
    ...requireModule(fileName).default
  }
})
Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  getters
});

export default store;