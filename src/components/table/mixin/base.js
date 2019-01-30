export default {
  methods: {
    /**
     * @description 组件属性默认值
     */
    handleAttribute (attribute, defaultValue) {
      if (attribute === false || attribute === 0 || attribute === '') {
        return attribute
      }
      return attribute || defaultValue
    },
    howMuchCanSelect(isJustOne) {
      switch(this.selection.length) {
        case 0:
          this.$notify.warning({
            message: '没有选中记录，请选中记录',
            duration: 2000
          })
          return false;
        case 1:
          return true;
        default: 
          if(!!isJustOne) {
            this.$notify.warning({
              message: `选中了${this.selection.length}条记录，只能选中一条`,
            duration: 2000
            });
            return false;
          }
          return true;
      }
    }
  }
}