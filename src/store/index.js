import Vue from 'vue';
import Vuex from 'vuex';
import {registerStoreModules} from '@/utils/Register';


//get Vuex modules
let modules = {};
const baseModules = require.context('./modules', false, /\.js$/);

modules = Object.assign(modules, registerStoreModules(baseModules));

const subModules = require.context('@/views', true, /Store.js/);
subModules.keys().forEach(fileName => {
  modules = Object.assign(modules, {...subModules[fileName]});
})
console.log(modules);
Vue.use(Vuex);

const store = new Vuex.Store({
  modules
});

export default store;