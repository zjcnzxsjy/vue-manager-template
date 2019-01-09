<template>
  <div
    class='table-wraper'
    :element-loading-text="loadingOptions? handleAttribute(loadingOptions.text,null) : null"
    :element-loading-spinner="loadingOptions? handleAttribute(loadingOptions.spinner,null) : null"
    :element-loading-background="loadingOptions? handleAttribute(loadingOptions.background, null) : null">
      <div
        class='table-header' v-if="$slots.header || $slots.form">
        <slot name='form'></slot>
        <slot name='toolbar'></slot>
      </div>
      <div
        class='table-body'>
        <el-table
          ref="elTable"
          :data="data"
          row-class-name='row-class-name'
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
            v-if='!!indexColumn || indexColumn === ""'
            type='index'
            key='index'
            :label='indexColumn.label || ""'
            v-bind='indexColumn'>
          </el-table-column>
          <el-table-column
            v-if='selectColumn || selectColumn === ""'
            type='selection'
            key='selection'
            v-bind='selectColumn'>
          </el-table-column>
            <template
              v-for="(item, index) in tableColumns">
              <el-table-column
              v-if='item.hiddenColumn !== true'
              :key='index'
              :prop='item.prop? item.prop : null'
              v-bind='item'>
              <template
                slot-scope="scope">
                <render-custom-component
                  v-if='item.component && item.component.name'
                  :component-name='item.component.name'
                  :title='scope.row[item.prop]'
                  v-bind='item.component'
                  :scope='scope'>
                </render-custom-component>
                <template v-else>{{item.formatter? item.formatter(scope.row, scope.column, scope.row[item.prop], scope.$index) : scope.row[item.prop]}}</template>
              </template>
            </el-table-column>
          </template>
          <!-- <el-table-column
            v-for="(item, index) in tableColumns"
            v-show='false'
            :key='index'
            :prop='item.prop? item.prop : null'
            v-bind='item'>
            <template
              slot-scope="scope">
              <render-custom-component
                v-if='item.component && item.component.name'
                :component-name='item.component.name'
                :title='scope.row[item.prop]'
                v-bind='item.component'
                :scope='scope'>
              </render-custom-component>
              <template v-else>{{item.formatter? item.formatter(scope.row, scope.column, scope.row[item.prop], scope.$index) : scope.row[item.prop]}}</template>
            </template>
          </el-table-column> -->
        </el-table>
        <div class='table-pagination-wrapper'>
          <el-pagination
            class='table-pagination'
            v-if='pagination'
            v-bind='pagination'
            @size-change="handlePaginationSizeChange"
            @current-change="handlePaginationCurrentChange"
            @prev-click="handlePaginationPrevClick"
            @next-click="handlePaginationNextClick">
          </el-pagination>
          <el-popover
            ref="popover"
            placement="top"
            trigger="click"
            class='set-table-column'>
            <ul>
              <li v-for='(option, index) in tableColumns'
              :key='index'>
                <el-checkbox
                  :key='index'
                  checked
                  @change='handleCheck(index)'>
                  {{option.label}}
                </el-checkbox>
              </li>
            </ul>
            <el-button slot="reference">显示列设置</el-button>
          </el-popover>
        </div>
      </div>
      <div
        class='table-footer'>
        <slot name='footer'></slot>
      </div>
      <slot name='dialog'></slot>
  </div>
</template>
<script>
import base from './mixin/base'
import emitter from '../src/emitter'
import data from './mixin/data'
import events from './mixin/events'
import pagination from './mixin/pagination'
import utils from './mixin/utils'
import dialog from './mixin/dialog'
import setTableColumn from './mixin/SetTableColumn'
import add from './mixin/add'
import edit from './mixin/edit'
// 

import renderCustomComponent from './components/RenderCustomComponent.vue'

export default {
  name: 'hsTable',
  mixins: [
    base,
    emitter,
    data,
    events,
    pagination,
    utils,
    dialog,
    setTableColumn,
    add,
    edit
  ],
  data() {
    return {
      formField: {},
      dialogField: {}
    }
  },
  components: {
    renderCustomComponent
  },
  created() {
    // this.$on('hs.addForm', (form) => {
      
    //   if (form) {
    //     this.formField = form;
    //   }
    // })
    this.$on('hs.addDialog', (dialog) => {
      if (dialog) {
        this.dialogField = dialog;
      }
    });
  }
}
</script>
<style lang="scss">
.table-wraper {
  .table-header {
    
  }
  .table-body {
    padding: 15px 0;
    overflow: hidden;
    .el-table--enable-row-hover .el-table__body tr:hover>td {
      background-color: #EAF5FF;
    }
    .el-table--border + .table-pagination-wrapper {
      border: 1px solid #f0f2f5;
      border-top: none;
    }
    .table-pagination-wrapper {
      background: #fff;
      overflow: hidden;
      display: flex;
      .table-pagination {
        flex: 1;
        padding: 15px 0 15px 5px;
      }
      .set-table-column {
        width: 100px;
        padding: 15px 0;
      }
    }
  } 
}
.el-popover {
  min-width: 100px;
} 
</style>
