<template>
  <div>
    <hs-table
      ref='hsTable'
      :indexColumn='indexColumn'
      :selectColumn='selectColumn'
      :columns='columns'
      :data='data'>
      <div slot='header'>
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click='add'>添加</el-button>
          <el-button type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button type="primary" icon="el-icon-delete">删除</el-button>
        </el-button-group>
      </div>
      <div
        class='form-class'
        slot='form'>
        <hs-form
          :formDate='formData'
          :formOptions='formOptions'
          :formItemOptions='formItemOptions'>
        </hs-form>
      </div>
    </hs-table>
  </div>
</template>
<script>
import hsTable from '@/components/table/Table'
import hsForm from '@/components/form/Form'
export default {
  name: 'baseTable',
  data() {
    return {
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
      formData: {},
      formOptions: {
        inline: true
      },
      formItemOptions: [
        {
          label: '活动名称' ,
          prop: 'name',
          children: [
            {
              component: {
                name: 'el-input'
              }
            }
          ]
        },
        {
          label: '活动区域' ,
          prop: 'region',
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
          children: [
            {
              component: {
                name: 'el-input'
              }
            }
          ]
        }
      ]
    }
  },
  components: {
    hsTable,
    hsForm
  },
  methods: {
    add() {
      this.$refs.hsTable.handleAdd();
    }
  }
}
</script>
<style lang="scss" scoped>
.form-class {
  padding-top: 10px;
}
</style>
