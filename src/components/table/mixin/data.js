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
    formOptions: {
      type: Object,
      default: null
    },
    formItemOptions: {
      type: Array,
      default: []
    },
    /**
     * @description 是否显示过滤表单
     */
    toolbar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableColumns: this.columns,
      fields: [],
      selection: []
    }
  },
  computed: {
    tableData() {
      return deepClone(this.data);
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