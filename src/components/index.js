import Vue from 'vue';
import hsTable from './table/Table'
import './icon/icon/iconfont.css';


Vue.component('hs-drawer', () => import('./drawer/Drawer'));
Vue.component('hs-icon', () => import('./icon/Icon'));
Vue.component('hs-skeleton', () => import('./skeleton/Skeleton'));
Vue.component('hs-table', () => import('./table/Table'));