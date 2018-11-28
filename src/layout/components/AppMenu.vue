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
      <template v-if="!item.hidden&&!item.children">
        <el-menu-item 
          :index="item.path"
          :key="item.id">
          <i 
          :class="[item.icon]"></i>
          <span slot='title'>{{item.name}}</span>
        </el-menu-item>
      </template>
      <template v-if="!item.hidden&&item.children&&item.children.length<=1">
        <el-menu-item 
          :index="item.path + item.children[0].path"
          :key="item.children[0].id">
          <i 
          :class="[item.icon]"></i>
          <span slot='title'>{{item.children[0].name}}</span>
        </el-menu-item>
      </template>
      <template v-if="!item.hidden&&item.children&&item.children.length>1">
        <el-submenu 
          :index="item.path"
          :key="item.id">
          <template slot="title">
            <i 
          :class="[item.icon]"></i>
            <span slot='title'>{{item.name}}</span>
          </template>
          <el-menu-item 
            v-for="(subItem,i) in item.children"
            :key="i"
            :index="item.path + subItem.path">
            <span slot='title'>{{subItem.name}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </template>
  </el-menu>
</template>
<script>
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
.menu--collapse {
  width: 80px;
  text-align: center;
}
// .el-menu-item i {
//   transition: font-size .15s cubic-bezier(.215,.61,.355,1),margin .3s cubic-bezier(.645,.045,.355,1);
// }
.menu--unCollapse .el-menu-item > i {
  margin-right: 10px;
  font-size: 20px;
}
.menu--collapse .el-menu-item  i {
  font-size: 24px;
}
</style>
