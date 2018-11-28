<template>
    <div>
      <el-dropdown class='header-toolbar-item'
      :style="style">
        <span>
          <i class="third-icon-user"></i>
          <b>ssss</b>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="third-icon-logout dropdown-icon"></i>退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>
<script>
import theme from '@/utils/Theme';
import { mapGetters } from 'vuex';
export default {
    name: 'HeaderToolbar',
    computed: {
      ...mapGetters([
        'menuTheme',
        'layout'
      ]),
      style() {
        const style = {};
        // if ('dark' === this.menuTheme) {
        //   if ('side-menu' === this.layout) {
        //     style.color = '#000';
        //   } else if ('top-menu' === this.layout) {
        //     style.color = '#FFF'
        //   }
        // } else if ('light' === this.menuTheme){
        //   style.color = '#000';
        // }
        if ('dark' === this.menuTheme && 'top-menu' === this.layout) {
          style.color = '#FFF';
        } else {
          style.color = '#000';
        }
        return style;
      }
    },
    data() {
      return {
        theme: theme
      }
    }
}
</script>
<style lang="scss" scoped>
.header-toolbar-item {
  cursor: pointer;
  padding: 0 12px;
}
.dropdown-icon{
    margin-right: 8px;
  }
</style>

