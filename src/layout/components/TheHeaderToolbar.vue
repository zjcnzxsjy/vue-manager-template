<template>
    <div>
      <el-dropdown class='header-toolbar-item'
      :style="style">
        <span>
          <i class="third-icon-user"></i>
          <b>ssss</b>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native='logout'>
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
      ...mapGetters('App', {
        menuTheme: 'menuTheme',
        layout: 'layout'
      }),
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
    },
    methods: {
      logout() {
        this.$confirm('确认退出系统？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() =>{
          this.$store.dispatch('User/logout').then(() => {
            this.$router.push('/login');
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        })
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

