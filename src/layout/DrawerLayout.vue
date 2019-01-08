<template>
  <drawer 
  :value='visible'
  :showHead='false'
  @on-close='handleClose'>
      <div class='drawer-layout-body-theme'>
          <h3 class='drawer-layout-body-theme-title'>整体风格设置</h3>
          <div class='drawer-layout-body-theme-blockCheckbox' @click='checkboxClick("App/setMenuTheme", $event)'>
            <el-tooltip 
            content="暗色菜单风格" 
            placement="top">
              <div class='drawer-layout-body-theme-blockCheckbox-item'>
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg" alt="dark">
                  <i class='el-icon-check item-check' v-if='"dark" === menuTheme'></i>
              </div>
            </el-tooltip>
            <el-tooltip 
            content="亮色菜单风格" 
            placement="top">
              <div class='drawer-layout-body-theme-blockCheckbox-item'>
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg" alt="light">
                  <i class='el-icon-check item-check' v-if='"light" === menuTheme'></i>
              </div>
             </el-tooltip>
          </div>
      </div>
      <div class='drawer-layout-body-theme'>
          <h3 class='drawer-layout-body-theme-title'>导航模式</h3>
          <div class='drawer-layout-body-theme-blockCheckbox' @click='checkboxClick("App/setLayout", $event)'>
            <el-tooltip 
            content="侧边菜单布局" 
            placement="top">
              <div class='drawer-layout-body-theme-blockCheckbox-item'>
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg" alt="side-menu">
                  <i class='el-icon-check item-check' v-if='"side-menu" === layout'></i>
              </div>
            </el-tooltip>
            <el-tooltip 
            content="顶部菜单布局" 
            placement="top">
              <div class='drawer-layout-body-theme-blockCheckbox-item'>
                  <img src="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg" alt="top-menu">
                  <i class='el-icon-check item-check' v-if='"top-menu" === layout'></i>
              </div>
             </el-tooltip>
          </div>
      </div>
      <div class='drawer-layout-body-config'>
          <div class='drawer-layout-body-config-item'>
              <label>固定Header</label>
              <el-switch
              v-model="fixedHeader">
              </el-switch>
          </div>
          <div class='drawer-layout-body-config-item'>
              <label>下滑时隐藏Header</label>
              <el-switch
              v-model="autoHideHeader">
              </el-switch>
          </div>
      </div>
      <div class="divider-horizontal"></div>
      <el-button
      icon='el-icon-document'
      style='width:100%;'>
      拷贝设置
      </el-button>
      <div class='drawer-layout-body-productionHint'>
        <p>
          配置栏只在开发环境用于预览，生产环境不会展现，请拷贝后手动修改配置文件src/defaultSettings.js。
        </p>
      </div>
  </drawer>
</template>
<script>
import drawer from '@/components/drawer/Drawer';
import { mapGetters } from 'vuex'
export default {
  name: 'DrawerLayout',
  components: {
    drawer
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fixedHeader: false,
      autoHideHeader: false
    }
  },
  computed: {
    // ...mapGetters([
    //   "App/menuTheme",
    //   "App/layout"
    // ])
    ...mapGetters('App', {
      menuTheme: 'menuTheme',
      layout: 'layout'
    })
  },
  methods: {
    checkboxClick(dispatchType, event) {
      const target = event.target;
      if ('IMG' === target.tagName) {
        this.styleCheck = target.alt;
        this.$store.dispatch(dispatchType, target.alt);
      }
    },
    handleClose() {
      this.$emit('on-close');
    }
  }
}
</script>
<style lang="scss" scoped>
.drawer-layout-body-theme {
    margin-bottom: 24px;
    .drawer-layout-body-theme-title {
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 12px;
    }
    .drawer-layout-body-theme-blockCheckbox {
        display: flex;
        .drawer-layout-body-theme-blockCheckbox-item {
          position: relative;
          margin-right: 16px;
          cursor: pointer;
          .item-check {
            position: absolute;
            right: 5px;
            bottom: 10px;
            font-size: 14px;
            font-weight: 700;
          }
        }
    }
}
.drawer-layout-body-config {
  .drawer-layout-body-config-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    justify-content: space-between;
    label {
      font-size: 14px;
    }
  }
}
.divider-horizontal {
  display: block;
  height: 1px;
  width: 100%;
  min-width: 100%;
  margin: 24px 0;
  clear: both;
  color: rgba(0, 0, 0, 0.65);
  background: #e8e8e8;
}
.drawer-layout-body-productionHint {
  margin-top: 16px;
  padding: 8px 15px;
  border: 1px solid #ffe58f;
  background-color: #fffbe6;
  border-radius: 4px;
}
</style>
