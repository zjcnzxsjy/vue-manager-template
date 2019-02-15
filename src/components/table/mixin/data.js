import { deepClone } from '@/utils/Base'
export default {
  props: {
    /**
     * @description 表格数据
     */
    data: {
      type: Array,
      required: true
    },
    /**
     * @description 表头数据
     */
    columns: {
      type: Array,
      required: true
    },
    /**
     * @description 表格加载
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * @description 表格加载配置
     */
    loadingOptions: {
      type: Object,
      default: null
    },
    /**
     * @description 表格配置
     */
    options: {
      type: Object,
      default: null
    },
    /**
     * @description 索引
     */
    indexColumn: {
      default: null
    },
    /**
     * @description 多选
     */
    selectColumn: {
      default: null
    },
    /**
     * @description 是否显示过滤表单
     */
    filterForm: {
      type: Boolean,
      default: false
    },
    /**
     * @description 筛选条件表单
     */
    formOptions: {
      type: Object,
      default: null
    },
    formItemOptions: {
      type: Array,
      default: []
    },
    /**
     * @description dialog新增标题
     */
    addTitle: {
      type: String,
      default: '添加'
    },
    /**
     * @description dialog修改标题
     */
    editTitle: {
      type: String,
      default: '编辑'
    },
    /**
     * @description 新增表单设置
     */
    addFormOptions: {
      type: Object,
      default: null
    },
    /**
     * @description 新增表单模板
     */
    addFormItemOptions: {
      type: Array,
      default: () => []
    },
    /**
     * @description 编辑表单设置
     */
    editFormOptions: {
      type: Object,
      default: null
    },
    /**
     * @description 修改表单模板
     */
    editFormItemOptions: {
      type: Array,
      default: () => []
    },
    dialogOptions: {
      type: Object,
      default: null
    },
    /**
     * @description 表格按钮
     */
    buttons: {
      default: ''
    }
  },
  data() {
    return {
      tableColumns: this.columns,
      fields: [],
      selection: [],
      mode: '',
      addTemplate: [],
      editTemplate: []
    }
  },
  computed: {
    tableData() {
      return deepClone(this.data);
    },
    buttonComponents() {
      const shows = {
        add: false,
        search: false,
        edit: false,
        remove: false,
        exportExcel: false
      };
      if (!this.buttons) {
        return shows;
      }
      const components = this.buttons.split(',').map((item) => item.trim());
      components.forEach(compo => {
        shows[compo] = true;
      })
      return shows;
    }
  },
  methods: {
    /**
     * @description 更新行数据
     * @param {Number} index 表格数据索引
     * @param {Object} row 更新的表格行数据
     */
    handleUpdateRow (index, row) {
      this.$set(this.tableData, index, row);
    },
  }
}