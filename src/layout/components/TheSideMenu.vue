<template>
    <div class='app-layout'> 
        <div class='app-layout-sider'
        :class="[menuTheme + '-box-shadow']"
        :style='siderStyle'>
            <div class='app-layout-sider-logo' 
            :class="['theme-' + menuTheme, { 'light-border': 'light' === menuTheme}]">
              <img src='../../assets/img/logo.svg' />
              <h1>Vue Manager</h1>
            </div>
            <div class='app-layout-sider-menu-wrapper' :class='"theme-" + menuTheme'>
              <app-menu
                :data='accessedRouters'
                :menuActived='menuActived'
                :background-color='theme[menuTheme].backgroundColor'
                :text-color='theme[menuTheme].textColor'
                :active-text-color='theme[menuTheme].activeTextColor'
                mode='vertical'
                :isMenuFold='isMenuFold'
                :isCollapse='isCollapse'></app-menu>
            </div>
        </div>
        <div class='app-layout-main'>
            <div class='app-layout-main-header'>
              <!-- <i 
              class='icon-menu-fold'
              :class='isMenuFold? "third-icon-menu-fold" : "third-icon-menu-unfold"'
              @click='menuFold'></i> -->
              <hs-icon
                class='icon-menu-fold'
                :name='isMenuFold? "menu-fold" : "menu-unfold"'
                @click='menuFold'>
              </hs-icon>
              <div class='header-toolbar-right'>
                <header-toolbar></header-toolbar>
              </div>
            </div>
            <div class='app-layout-main-nav'>
              <nav-bar></nav-bar>
            </div>
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
    name: 'SideMenu',
    components: {
      appMenu,
      headerToolbar,
      navBar
    },
    data() {
      return {
        theme: theme,
        isMenuFold: false,
        isCollapse: false
      }
    },
    computed: {
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
      // ...mapGetters([
      //   'Permission/accessedRouters',
      //   'App/menuTheme'
      // ]),
      menuActived() {
        return this.$route.path;
      },
      activeTextColor() {
        if ('/mainIndex' === this.$route.path) {
          return '#BFCBD9';
        }
        return '#FFD04B'
      },
      siderStyle() {
        if (this.isMenuFold) {
          return {
            flex: '0 0 80px',
            minWidth: '80px',
            maxWidth: '80px',
            width: '80px'
          }
        }
        return {
          flex: '0 0 256px',
          minWidth: '256px',
          maxWidth: '256px',
          width: '256px'
        }
      }
    },
    created() {
      console.log(process.env)
    },
    methods: {
      menuFold() {
        this.isCollapse = !this.isCollapse;
        this.isMenuFold = !this.isMenuFold;
      }
    }
}
</script>
<style lang="scss" scoped>
@mixin menu-tansition {
  transition: border-color .3s,background-color .3s,color .3s;
}
.app-layout {
  height: 100%;
  width: 100%;
  display: flex;
    .app-layout-sider {
      transition: all .2s;
      box-sizing: border-box;
      z-index: 10;
      .app-layout-sider-logo {
        height: 64px;
        //position: relative;
        line-height: 64px;
        padding-left: 24px;
        transition: all .3s;
        overflow: hidden;
        box-sizing: border-box;
        img {
          display: inline-block;
          vertical-align: middle;
          height: 32px;
        }
        h1 {
          display: inline-block;
          vertical-align: middle;
          font-size: 20px;
          margin: 0 0 0 12px;
          font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
          font-weight: 600;
        }
      }
      .app-layout-sider-menu-wrapper {
        height: calc(100% - 96px);
        padding: 16px 0;
        @include menu-tansition;
      }
    }
    .app-layout-main {
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      flex: auto;
      background-color: #f0f2f5;
      .app-layout-main-header {
        height: 64px;
        line-height: 64px;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
        position: relative;
        .icon-menu-fold {
          font-size: 20px;
          height: 64px;
          cursor: pointer;
          transition: all .3s,padding 0s;
          padding: 22px 24px;
          box-sizing: border-box;
        }
        .header-toolbar-right {
          float: right;
          height: 100%;
          overflow: hidden;
        }
      }
      .app-layout-main-nav {
        background-color: #fff;
        border-bottom: 1px solid #e8e8e8;
      }
      .app-layout-main-content {
        padding: 24px 24px 0;
        overflow: auto;
      }
    }
}
.light-border {
  box-shadow: 0 0 1px#e8e8e8;
}
.light-box-shadow {
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
}
.dark-box-shadow {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
</style>
