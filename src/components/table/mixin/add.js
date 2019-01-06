export default {
  methods: {
    /**
     * @description 新增行数据
     */
    handleAdd() {
      this.formMode = 'add';
      this.$emit('dialog-open', {
        mode: 'add'
      });
      this.isDialogShow = true;
    }
  }
}