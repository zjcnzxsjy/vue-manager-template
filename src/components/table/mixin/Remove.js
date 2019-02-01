export default {
  methods: {
    handleRemove() {
      if(!this.howMuchCanSelect()) {
        return false;
      }
      this.$emit('on-remove', this.selection);
    }
  }
}