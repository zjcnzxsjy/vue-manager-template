<template>
  <el-submenu 
    :index="resolvePath(item.path)"
    :key="item.id">
    <template slot="title">
      <i 
      :class="[item.meta.icon]"></i>
      <span slot='title'>{{item.meta.title}}</span>
    </template>
    <template v-for="subItem in item.children">
      <template v-if='!subItem.hidden'>
        <app-submenu
          v-if="subItem.children && subItem.children.length > 0"
          :item='subItem'
          :key="subItem.path"
          :base-path="resolvePath(subItem.path)">
        </app-submenu>
        <template v-else>
          <el-menu-item 
            :index="resolvePath(subItem.path)"
            :key='subItem.path'>
            <span slot='title'>{{subItem.meta.title}}</span>
          </el-menu-item>
        </template>
      </template>
    </template>
  </el-submenu>
</template>
<script>
import path from 'path'
export default {
  name: 'appSubmenu',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    }
  }
}
</script>
