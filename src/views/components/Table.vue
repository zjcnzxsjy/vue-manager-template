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
      filterForm
      :formOptions='formOptions'
      :formItemOptions='formItemOptions'
      :dialogOptions='dialogOptions'
      :addFormOptions='dialogFormOptions'
      :addFormItemOptions='dialogFormItemOptions'
      :editFormOptions='dialogFormOptions'
      :editFormItemOptions='dialogFormItemOptions'
      buttons='search,add,edit,remove,exportExcel'
      @on-search='handleSearch'
      @row-remove='handleRemove'
      @row-add='handleAdd'
      @row-edit='handleEdit'
      @pagination-size-change='handlePaginationSizeChange'
      @pagination-current-change='handlePaginationCurrentChange'>
      <template slot='custom-button'>
        <el-button 
          type="primary" 
          :icon="!downloadLoading? 'el-icon-download' : 'el-icon-loading'" 
          @click='hanldeDownload'>
          下载
        </el-button>
      </template>
      <!-- <div
        class='form-class'
        slot='form'>
        <hs-form
          :formOptions='formOptions'
          :formItemOptions='formItemOptions'>
        </hs-form>
      </div> -->
      <!-- <div slot='toolbar'>
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" @click='add'>重置</el-button>
          <el-button type="primary" icon="el-icon-plus" @click='add'>查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click='add'>添加</el-button>
          <el-button type="primary" icon="el-icon-edit" @click='edit'>编辑</el-button>
          <el-button type="primary" icon="el-icon-delete" @click='remove'>删除</el-button>
        </el-button-group>
      </div> -->
      <!-- <hs-form-dialog
        slot='dialog'
        :dialogOptions='dialogOptions'
        @dialog-save='handleDialogSave'>
        <hs-form
          slot='formDialog'
          :formOptions='dialogFormOptions'
          :formItemOptions='dialogFormItemOptions'>
        </hs-form>
      </hs-form-dialog> -->
    </hs-table>
    
  </div>
</template>
<script>
import hsTable from '@/components/table/Table'
import {deepClone} from '@/utils/Base'
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
          label: '姓名',
          prop: 'name',
        },
        {
          label: '生日',
          prop: 'birthday',
        },
        {
          label: '年龄',
          prop: 'age',
        },
        {
          label: '学历',
          prop: 'education'
        },
        {
          label: '城市',
          prop: 'city',
        }
      ],
      data: [],
      formOptions: {
        inline: false,
        gutter: 20,
        labelWidth: '90px'
      },
      formItemOptions: [
        {
          label: '姓名' ,
          prop: 'name',
          span: 6,
          // rules: [
          //   { required: true, message: '输入不能为空'}
          // ],
          children: [
            {
              component: {
                name: 'el-input',
              }
            }
          ]
        },
        {
          label: '年龄' ,
          prop: 'age',
          span: 6,
          children: [
            {
              component: {
                name: 'el-input-number',
                value: 2,
                props: {
                  controlsPosition: 'right'
                }
              }
            }
          ]
        },
        {
          label: '学历' ,
          prop: 'education',
          span: 6,
          children: [
            {
              component: {
                name: 'el-select',
                children: [{
                  name: 'el-option',
                  value: 'doctor',
                  props: {
                    label: '博士'
                  }
                }, {
                  name: 'el-option',
                  value: 'master',
                  props: {
                    label: '硕士'
                  }
                }, {
                  name: 'el-option',
                  value: 'undergraduate',
                  props: {
                    label: '大学本科'
                  }
                }]
              }
            }
          ]
        }
      ],
      pagination: {
        start: 0,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100],
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0
      },
      dialogOptions: {
        width: '450px'
      },
      dialogFormOptions: {
        labelWidth: '90px'
      },
      dialogFormItemOptions: [
        {
          label: '姓名' ,
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
        },
        {
          label: '生日' ,
          prop: 'birthday',
          rules: [
            { required: true, message: '输入不能为空', trigger: 'change'}
          ],
          children: [
            {
              component: {
                name: 'el-date-picker',
                props: {
                  type: 'date',
                  placeholder: "选择日期时间",
                  valueFormat: 'yyyy-MM-dd'
                }
              }
            }
          ]
        },
        {
          label: '年龄',
          prop: 'age',
          rules: [
            { required: true, message: '输入不能为空', trigger: 'change'}
          ],
          children: [
            {
              component: {
                name: 'el-input-number',
                props: {
                  controlsPosition: 'right',
                  style: 'width: 100%'
                }
              }
            }
          ]
        },
        {
          label: '学历',
          prop: 'education',
          rules: [
            { required: true, message: '输入不能为空', trigger: 'change'}
          ],
          children: [
            {
              component: {
                name: 'el-select',
                props: {
                  style: 'width: 100%'
                },
                children: [
                  {
                    name: 'el-option',
                    value: 'doctor',
                    props: {
                      label: '博士'
                    }
                  },
                  {
                    name: 'el-option',
                    value: 'master',
                    props: {
                      label: '硕士'
                    }
                  },
                  {
                    name: 'el-option',
                    value: 'undergraduate',
                    props: {
                      label: '大学本科'
                    }
                  }
                ]
              }
            }
          ]
        },
        {
          label: '城市',
          prop: 'city',
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
      downloadLoading: false,
      queryCondition: null
    }
  },
  components: {
    hsTable
  },
  created() {
    this.getData();
  },
  methods: {
    getData(query) {
      let params = deepClone(query) || {};
      params = Object.assign(params, {start: this.pagination.start, limit: this.pagination.pageSize});
      this.$request.get('/api/table', {
        params: params
      })
      .then(res => {
        this.data = res.data.datas;
        this.pagination.total = res.data.counts;
      })
    },
    handleSearch(queryCondition) {
      this.queryCondition = queryCondition;
      this.getData(this.queryCondition);
    },
    handleRemove(selection) {
      console.log(selection)
      const ids = selection.map(item => {
        return item._id;
      })
      this.$request.delete('/api/table', {
        params: {
          ids: JSON.stringify(ids)
        }
      })
      .then(res => {
        this.getData(this.queryCondition);
      })
    },
    handleAdd({data}) {
      this.$request.post('/api/table', data)
      .then(res => {
        this.getData(this.queryCondition);
      })
    },
    handleEdit({index, data}) {
      this.$request.put(`/api/table/${this.$refs.hsTable.selection[0]._id}`, data)
      .then(res => {
        this.getData(this.queryCondition);
      })
    },
    async hanldeDownload() {
      this.downloadLoading = true;
      const tHeader = this.columns.map(column => column.label);
      let selection = this.$refs.hsTable.selection;
      let data = [];
      if (selection && selection.length > 0) {
        data = this.filterData(selection);
      } else {
        data = this.filterData((await this.$request.get('/api/usersTable')).data.data.user);
      }

      import('@/utils/Export2Excel').then(excel => {
          excel.export_json_to_excel({
              header: tHeader, //表头 必填
              data, //具体数据 必填
              filename: '新建excel', //非必填
              autoWidth: true, //非必填
              bookType: 'xlsx' //非必填
          })
      })
      this.downloadLoading = false;
    },
    filterData(datas, prop) {
      const result = []
      for (let i = 0, l = datas.length; i < l; i++) {
        if (typeof datas[i] === 'object') {
          result.push(this.columns.map(column => {
             return datas[i][column.prop];
          }))
        }
      }
      return result;
    },
    handlePaginationSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.getData(this.queryCondition);
    },
    handlePaginationCurrentChange(currentPage) {
      this.pagination.start = (currentPage - 1) * this.pagination.pageSize;
      this.getData(this.queryCondition);
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
