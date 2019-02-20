import Vue from 'vue';
import './icon/iconfont/iconfont.css';


Vue.component('hs-drawer', () => import('./drawer/Drawer'));
Vue.component('hs-icon', () => import('./icon/Icon'));
Vue.component('hs-skeleton', () => import('./skeleton/Skeleton'));
Vue.component('hs-table', () => import('./table/Table'));