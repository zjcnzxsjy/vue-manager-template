import { deepClone } from '@/utils/Base'
export default {
  props: {
    /**
     * @description 新增表单校验规则
     */
    addRules: {
      type: Object,
      default: null
    },
    /**
     * @description 编辑表单校验规则
     */
    editRules: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      /**
       * @description dialog显示与隐藏
       */
      isDialogShow: false,
      /**
       * @description 表单模式
       */
      mode: 'edit',
      /**
       * @description 编辑暂存数据
       */
      editDataStorage: {},
      /**
       * @description 新增暂存数据
       */
      addDataStorage: {},
    }
  },
  methods: {
    handleDialogSave({formData}) {
      if (this.mode === 'edit') {
        this.editDataStorage = deepClone(formData);
        this.$emit('row-edit', {
          index: this.editIndex,
          row: this.editDataStorage
        })
      } else if (this.mode === 'add') {
        this.addDataStorage = formData;
        this.$emit('row-add', {
          row: this.addDataStorage
        })
      }
    },
  }
}