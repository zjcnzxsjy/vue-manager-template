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
       * @description 编辑暂存数据，用于储存不在editTemplate中的数据
       */
      editDataStorage: {},
      /**
       * @description 新增表单模板暂存
       */
      addTemplateStorage: {},
      /**
       * @description 修改表单模板暂存
       */
      editTemplateStorage: {}
    }
  },
  methods: {
    handleDialogSave({formData}) {
      console.log(formData)
    },
  }
}