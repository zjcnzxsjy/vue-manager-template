export default {
  methods: {
    handleRemove() {
      if(!this.howMuchCanSelect()) {
        return false;
      }
      this.$emit('row-remove', this.selection);
    }
  }
}