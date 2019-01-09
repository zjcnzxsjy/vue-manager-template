export default {
  methods: {
    handleCheck(index) {
      this.$set(this.tableColumns[index], 'hiddenColumn', !this.tableColumns[index].hiddenColumn)
    }
  }
}