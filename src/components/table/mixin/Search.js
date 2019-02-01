import { deepClone } from '@/utils/Base'

export default {
  methods: {
    /**
     * @description 表单重置
     */
    handleSearch() {
      let queryCondition = null;
      if (this.filterForm) {
        queryCondition = deepClone(this.$refs.queryForm.formData);
      }
      this.$emit('on-search', queryCondition)
    }
  }
}