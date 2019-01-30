import { deepClone } from '@/utils/Base'
export default {
  methods: {
    /**
     * @description 新增行数据
     */
    handleAdd() {
      this.mode = 'add';
      this.formField.$refs.form.clearValidate();
      this.$on('dialog-open', {
        mode: 'add'
      });
      this.dialogField.dialogOpen();
      if (this.addFormItemOptions && this.addFormItemOptions.length > 0) {
        this.addTemplate = deepClone(this.addFormItemOptions);
        this.addTemplate.forEach((option) => {
          this.$set(this.formField.formData, option.prop, '');
        })
      }
    }
  }
}