<template>
  <div
    class='table-wraper'
    :element-loading-text="loadingOptions? handleAttribute(loadingOptions.text,null) : null"
    :element-loading-spinner="loadingOptions? handleAttribute(loadingOptions.spinner,null) : null"
    :element-loading-background="loadingOptions? handleAttribute(loadingOptions.background, null) : null">
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
            <!-- <template
              v-if='item.component' 
              slot-scope="scope">
              <render-custom-component
                v-if='item.component.name'
                :component-name='item.component.name'
                :title='scope.row[item.prop]'
                v-bind='item.component'
                :scope='scope'>
              </render-custom-component>
            </template> -->
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
import data from './mixin/data'
import events from './mixin/events'
import pagination from './mixin/pagination'
import utils from './mixin/utils'
// 

import renderCustomComponent from './components/RenderCustomComponent.vue'
export default {
  name: 'hsTable',
  mixins: [
    data,
    events,
    pagination,
    utils
  ],
  components: {
    renderCustomComponent
  }
}
</script>
