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
     * @param {Number} index 行所在索引
     * @param {Object} row 行数据
     */
    handleEdit (row) {
      this.mode = 'edit';
      this.isDialogShow = true;
      this.broadcast('hsFormDialog', 'dialog-open', {
        mode: 'edit',
        row
      });
      this.editIndex = findIndex(this.tableData, (value, index) => {
        return isEqual(this.tableData[index], value);
      });
      this.formData = deepClone(row);
    }
  }
}