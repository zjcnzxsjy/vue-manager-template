<template>
  <div
    class='table-wraper'
    :element-loading-text="loadingOptions.text? loadingOptions.text : null"
    :element-loading-spinner="loadingOptions.spinner? loadingOptions.spinner : null"
    :element-loading-background="loadingOptions.background? loadingOptions.background : null">
      <div
        class='table-header' v-if="$slots.header">
        <slot name='header'></slot>
        <slot name='form'></slot>
      </div>
      <div
        class='table-body'>
        <el-table
          ref="elTable"
          :data="data"
          v-bind="options"
          @current-change="handleCurrentChange"
          @select="handleSelect"
          @select-all="handleSelectAll"
          @selection-change="handleSelectionChange"
          @sort-change="handleSortChange"
          @cell-mouse-enter="handleCellMouseEnter"
          @cell-mouse-leave="handleCellMouseLeave"
          @cell-click="handleCellClick"
          @cell-dblclick="handleCellDblclick"
          @row-click="handleRowClick"
          @row-contextmenu="handleRowContextmenu"
          @row-dblclick="handleRowDblclick"
          @header-click="handleHeaderClick"
          @header-contextmenu="handleHeaderContextmenu">
          <el-table-column
            v-for="(item, index) in columns"
            :key='index'
            :type='item.type? item.type : null'
            :prop='item.prop? item.prop : null'
            v-bind='item'>
            <template 
              slot-scope="scope">
              <render-component
                v-if='item.render'
                :title='scope.row[item.prop]'
                v-bind='item.render'>
              </render-component>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if='pagination'
          v-bind='pagination'
          @size-change="handlePaginationSizeChange"
          @current-change="handlePaginationCurrentChange"
          @prev-click="handlePaginationPrevClick"
          @next-click="handlePaginationNextClick">
        </el-pagination>
      </div>
      <div
        class='table-footer'>
        <slot name='footer'></slot>
      </div>
      <el-dialog></el-dialog>
  </div>
</template>
<script>
import base from './mixin/base'
import data from './mixin/data'
// 

import renderComponent from './components/renderComponent.vue'
export default {
  name: 'hsTable',
  mixins: [
    base,
    data
  ],
  components: {
    renderComponent
  }
}
</script>
