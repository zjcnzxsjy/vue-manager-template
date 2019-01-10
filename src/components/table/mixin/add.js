export default {
  methods: {
    /**
     * @description 新增行数据
     */
    handleAdd() {
      this.dialogField.title ='添加';
      this.mode = 'add';
      this.broadcast('hsFormDialog', 'dialog-open', {
        mode: 'add'
      });
    }
  }
}