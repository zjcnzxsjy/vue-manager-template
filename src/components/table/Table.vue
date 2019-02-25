<template>
  <div
    class='table-wraper'
    v-loading='loading'
    :element-loading-text="loadingOptions? handleAttribute(loadingOptions.text,null) : null"
    :element-loading-spinner="loadingOptions? handleAttribute(loadingOptions.spinner,null) : null"
    :element-loading-background="loadingOptions? handleAttribute(loadingOptions.background, null) : null">
      <div
        class='table-header' v-if="filterForm || buttons">
        <div
          v-if='filterForm'
          class='table-header-form'>
          <hs-form
            ref='queryForm'
            :formOptions='formOptions'
            :formItemOptions='formItemOptions'>
          </hs-form>
        </div>
        <div
          v-if='buttons'
          class='table-header-toolbar'>
          <el-button-group>
            <el-button v-if='buttonComponents.search' type="primary" icon="el-icon-search" @click='handleSearch'>查询</el-button>
            <el-button v-if='filterForm' type="primary" icon="third-icon-Reset" @click='handleReset'>重置</el-button>
            <el-button v-if='buttonComponents.add' type="primary" icon="el-icon-plus" @click='handleAdd'>添加</el-button>
            <el-button v-if='buttonComponents.edit' type="primary" icon="el-icon-edit" @click='handleEdit'>编辑</el-button>
            <el-button v-if='buttonComponents.remove' type="primary" icon="el-icon-delete" @click='handleRemove'>删除</el-button>
            <slot name='custom-button'></slot>
          </el-button-group>
        </div>
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
              v-if='item.hiddenColumn !== true && (item.type !== "selection" && item.type !== "index")'
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
      <!-- <slot name='dialog'></slot> -->
      <hs-form-dialog
        :title='mode === "add"? addTitle : editTitle'
        @dialog-save='handleDialogSave'
        :dialogOptions='dialogOptions'>
        <hs-form
          slot='formDialog'
          :formOptions='mode === "add"? addFormOptions : editFormOptions'
          :formItemOptions='mode === "add"? addTemplate : editTemplate'>
        </hs-form>
      </hs-form-dialog>
  </div>
</template>
<script>
import base from './mixin/Base'
import emitter from '../src/emitter'
import data from './mixin/Data'
import events from './mixin/Events'
import pagination from './mixin/Pagination'
import utils from './mixin/Utils'
import dialog from './mixin/Dialog'
import setTableColumn from './mixin/SetTableColumn'
import search from './mixin/Search'
import reset from './mixin/Reset'
import add from './mixin/Add'
import edit from './mixin/Edit'
import remove from './mixin/Remove'
// 

import renderCustomComponent from './components/RenderCustomComponent.vue'
import hsForm from './Form'
import hsFormDialog from './FormDialog'

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
    search,
    reset,
    add,
    edit,
    remove
  ],
  data() {
    return {
      formField: {},
      dialogField: {}
    }
  },
  components: {
    renderCustomComponent,
    hsForm,
    hsFormDialog
  },
  created() {
    this.$on('hs.addForm', (form) => {
      if (form) {
        this.formField = form;
      }
    })
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
    .table-header-form {
      padding: 10px 5px;
      background-color: #fff;
    }
    .table-header-toolbar {
      padding: 10px 0;
    }
  }
  .table-body {
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
