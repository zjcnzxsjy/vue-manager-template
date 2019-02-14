<template>
  <el-menu 
    router
    class='sidebar'
    :class="[
      isMenuFold? 'menu--collapse' : 'menu--unCollapse'
    ]"
    :background-color='backgroundColor'
    :text-color='textColor'
    :active-text-color="activeTextColor"
    :default-active='menuActived'
    :mode='mode'
    :collapse="isCollapse"
    :collapse-transition='false'>
    <template v-for="item in data">
      <template v-if="!item.hidden && !item.children">
        <el-menu-item 
          :index="item.path"
          :key="item.id">
          <i 
          :class="[item.meta.icon]"></i>
          <span slot='title'>{{item.meta.title}}</span>
        </el-menu-item>
      </template>
      <template v-if="!item.hidden && item.children && item.children.length > 0">
        <app-submenu
          :item='item'
          :base-path='item.path'
          :key='item.path'>
        </app-submenu>
      </template>
    </template>
  </el-menu>
</template>
<script>
import appSubmenu from './AppSubmenu';

export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    menuActived: String,
    backgroundColor: String,
    textColor: String,
    activeTextColor: String,
    mode: {
      type: String,
      default: "vertical"
    },
    isMenuFold: {
      type: Boolean,
      default: false
    },
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  components: {
    appSubmenu
  }
};
</script>
<style lang="scss" scoped>
.sidebar {
  overflow: auto;
  border-right: none;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
