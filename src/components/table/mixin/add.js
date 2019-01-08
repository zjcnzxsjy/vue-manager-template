export default {
  methods: {
    /**
     * @description 新增行数据
     */
    handleAdd() {
      this.broadcast('hsFormDialog', 'dialog-open', {
        mode: 'add'
      });
    }
  }
}