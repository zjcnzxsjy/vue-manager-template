<template>
  <div style='height: 100%;'>
    <div :is='layout' :key='layout'></div>
    <div class='components-setting' @click='visible = true'>
        <i class='el-icon-setting'></i>
    </div>
    <drawer-layout :visible='visible' @on-close='handleClose'></drawer-layout>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import sideMenu from './components/TheSideMenu';
import topMenu from './components/TheTopMenu';
import drawerLayout from './DrawerLayout.vue';
export default {
    name: 'AppLayout',
    components: {
      sideMenu,
      topMenu,
      drawerLayout
    },
    data() {
      return {
        visible: false
      }
    },
    computed: {
      ...mapGetters('App', {
        layout: 'layout'
      })
    },
    methods: {
      handleClose() {
        this.visible = false;
      }
    }
}
</script>
<style lang="scss" scoped>
.components-setting {
  position: absolute;
  bottom: 10px;
  background: #1890ff;
  width: 32px;
  height: 32px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  //z-index: 0;
  text-align: center;
  font-size: 16px;
  border-radius: 4px;
  i {
      color: #fff;
  }
}
</style>
