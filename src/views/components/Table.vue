<template>
  <div>
    <hs-table
      ref='hsTable'
      :indexColumn='indexColumn'
      :selectColumn='selectColumn'
      :columns='columns'
      :data='data'
      :pagination='pagination'
      :options='options'
      @select='handleSelect'
      filterForm
      :formOptions='formOptions'
      :formItemOptions='formItemOptions'>
      <!-- <div
        class='form-class'
        slot='form'>
        <hs-form
          :formOptions='formOptions'
          :formItemOptions='formItemOptions'>
        </hs-form>
      </div> -->
      <div slot='toolbar'>
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click='add'>重置</el-button>
          <el-button type="primary" icon="el-icon-plus" @click='add'>查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click='add'>添加</el-button>
          <el-button type="primary" icon="el-icon-edit" @click='edit'>编辑</el-button>
          <el-button type="primary" icon="el-icon-delete" @click='remove'>删除</el-button>
        </el-button-group>
      </div>
      <hs-form-dialog
        slot='dialog'
        :dialogOptions='dialogOptions'
        @dialog-save='handleDialogSave'>
        <hs-form
          slot='formDialog'
          :formOptions='dialogFormOptions'
          :formItemOptions='dialogFormItemOptions'>
        </hs-form>
      </hs-form-dialog>
    </hs-table>
    
  </div>
</template>
<script>
import hsTable from '@/components/table/Table'
import hsFormDialog from '@/components/table/FormDialog'
import hsForm from '@/components/table/Form'
import base from '@/utils/Base'
export default {
  name: 'baseTable',
  data() {
    return {
      options: {
        border: true
      },
      indexColumn: {
        label: '序号',
        width: '50'
      },
      selectColumn: {
        width: '50'
      },
      columns: [
        {
          label: '日期',
          prop: 'date',
          width: '180'
        },
        {
          label: '姓名',
          prop: 'name',
          width: '180'
        },
        {
          label: '地址',
          prop: 'address',
          formatter(row, column, cellValue, index) {
            return cellValue + '-1号';
          }
        }
      ],
      data: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      formOptions: {
        inline: false,
        gutter: 20,
        labelWidth: '90px'
      },
      formItemOptions: [
        {
          label: '活动名称' ,
          prop: 'name',
          span: 6,
          required: true,
          rules: [
            { required: true, message: '输入不能为空'}
          ],
          children: [
            {
              component: {
                name: 'el-input',
              }
            }
          ]
        },
        {
          label: '活动区域' ,
          prop: 'region',
          span: 6,
          children: [
            {
              component: {
                name: 'el-input'
              }
            }
          ]
        },
        {
          label: '活动形式' ,
          prop: 'type',
          span: 6,
          children: [
            {
              component: {
                name: 'el-input'
              }
            }
          ]
        },
        {
          label: '活动内容' ,
          prop: 'content',
          span: 6,
          children: [
            {
              component: {
                name: 'el-input'
              }
            }
          ]
        },
        {
          label: '活动时间' ,
          prop: 'time',
          span: 6,
          children: [
            {
              component: {
                name: 'el-input'
              }
            }
          ]
        }
      ],
      pagination: {
        pageSize: 50,
        pageSizes: [10, 50, 100, 200],
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 100
      },
      dialogOptions: {
        title: ''
      },
      dialogFormOptions: {
        labelWidth: '90px'
      },
      dialogFormItemOptions: [
        {
          label: '活动名称' ,
          prop: 'name',
          rules: [
            { required: true, message: '输入不能为空', trigger: 'blur'}
          ],
          children: [
            {
              component: {
                name: 'el-input'
              }
            }
          ]
        }
      ],
      mode: '',
      selection: [],
      row: []
    }
  },
  components: {
    hsTable,
    hsFormDialog,
    hsForm
  },
  methods: {
    add() {
      this.dialogOptions.title ='添加';
      this.mode = 'add';
      this.$refs.hsTable.handleAdd();
    },
    edit() {
      if(!this.howMuchCanSelect(true)) {
        return false;
      }
      this.dialogOptions.title ='编辑';
      this.mode = 'edit';
      this.$refs.hsTable.handleEdit(this.row);
    },
    remove() {
      if(!this.howMuchCanSelect(false)) {
        return false;
      }
    },
    handleDialogSave({formData}) {
      console.log(formData)
    },
    handleSelect(selection ,row) {
      this.selection = selection;
      this.row = row;
    },
    howMuchCanSelect(isJustOne) {
      switch(this.selection.length) {
        case 0:
          this.$notify.warning({
            message: '没有选中记录，请选中记录',
            duration: 2000
          })
          return false;
        case 1:
          return true;
        default: 
          if(!!isJustOne) {
            this.$notify.warning({
              message: `选中了${selection.length}条记录，只能选中一条`,
            duration: 2000
            });
            return false;
          }
          return true;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
