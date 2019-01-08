<template>
  <div class='app-layout'> 
      <div class='app-layout-top'
      :class="['theme-' + menuTheme, {'light-border': 'light' === menuTheme}]">
        <div class='app-layout-top-header'>
          <div class='app-layout-top-logo'>
            <img src='../../assets/img/logo.svg' />
            <h1>Vue Manager</h1>
          </div>
          <div class='app-layout-top-menu'>
            <app-menu
              class='app-layout-top-menu-border'
              :data='accessedRouters'
              :menuActived='menuActived'
              :background-color='"dark" === menuTheme? theme[menuTheme].backgroundColor : ""'
              :text-color='"dark" === menuTheme? theme[menuTheme].textColor : ""'
              :active-text-color='theme[menuTheme].activeTextColor'
              mode='horizontal'></app-menu>
          </div>
          <div class='header-toolbar-right'>
            <header-toolbar></header-toolbar>
          </div>
        </div> 
      </div>
      <div class='app-layout-nav'>
        <nav-bar></nav-bar>
      </div>
      <div class='app-layout-main'>
        <div class='app-layout-main-content'>
          <router-view />
        </div>
      </div>
  </div>
</template>
<script>
import theme from '@/utils/Theme';
import { mapGetters } from 'vuex';
import appMenu from './AppMenu';
import headerToolbar from './TheHeaderToolbar';
import navBar from './TheNavbar'; 
export default {
  name: 'TopMenu',
  components: {
    appMenu,
    headerToolbar,
    navBar
  },
  data() {
      return {
        theme: theme
      }
    },
    computed: {
      // ...mapGetters([
      //   'App/menuTheme',
      //   'Permission/accessedRouters'
      // ]),
      ...mapGetters(
        'Permission', {
          accessedRouters: 'accessedRouters'
        }
      ),
      ...mapGetters(
        'App', {
          menuTheme: 'menuTheme'
        }
      ),
      menuActived() {
        return this.$route.path;
      },
      activeTextColor() {
        if ('/mainIndex' === this.$route.path) {
          return '#BFCBD9';
        }
        return '#FFD04B'
      }
    }
}
</script>
<style lang="scss" scoped>
.app-layout {
  height: 100%;
  width: 100%;
  .app-layout-top {
    padding: 0 75px;
    .app-layout-top-header {
      display: flex;
      height: 64px;
      .app-layout-top-logo {
        width: 165px;
        line-height: 64px;
        img {
          display: inline-block;
          vertical-align: middle;
          height: 32px;
        }
        h1 {
          display: inline-block;
          vertical-align: middle;
          font-size: 16px;
          margin: 0 0 0 12px;
          font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
          font-weight: 600;
        }
      }
      .app-layout-top-menu {
        padding-top: 4px;
        flex: 1;
        .app-layout-top-menu-border {
          border: none;
        }
      }
      .header-toolbar-right {
        float: right;
        height: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
      }
    }
  }
  .app-layout-nav{
    padding: 0 75px;
    background-color: #fff;
    border-bottom: 1px solid #e8e8e8;
  }
  .app-layout-main {
    height: calc(100% - 64px);
    width: 100%;
    background-color: #f0f2f5;
    padding: 24px 75px 0;
    box-sizing: border-box;
    .app-layout-main-content {
      flex: auto;
      min-height: 0;
      height: 100%;
    }
  }
}
.light-border {
  position: relative;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}
</style>
