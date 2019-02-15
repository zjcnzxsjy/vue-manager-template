import { deepClone, findIndex } from '@/utils/Base'
import isEqual from 'lodash.isequal'
export default {
  data () {
    return {
      /**
       * @description 被编辑行的索引
       */
      editIndex: 0
    }
  },
  methods: {
    /**
     * @description 编辑行数据
     */
    handleEdit () {
      if(!this.howMuchCanSelect(true)) {
        return false;
      }
      this.mode = 'edit';
      this.editDataStorage = {}; //清空编辑暂存数据
      this.formField.$refs.form.clearValidate();
      const editRow = this.selection[0];
      this.dialogField.dialogOpen();
      this.editIndex = findIndex(this.tableData, (value) => {
        return isEqual(value, editRow);
      });
      this.$on('dialog-open', {
        mode: 'edit',
        index: this.editIndex,
        row: editRow
      });
      if (this.editFormItemOptions && this.editFormItemOptions.length > 0) {
        this.editTemplate = deepClone(this.editFormItemOptions);
        this.$nextTick(() => {
          this.editTemplate.forEach((option) => {
            this.$set(this.dialogField.formField.formData, option.prop, editRow[option.prop]);
          })
        })
      }
    }
  }
}