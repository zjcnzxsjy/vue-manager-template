<template>
  <i :class='iconCls'
    :style='styles'
    @click='handleClick'>
  </i>
</template>
<script>
export default {
  name: 'hs-icon',
  props: {
    name: String,
    size: [Number, String],
    color: String
  },
  computed: {
    iconCls() {
      return `el-icon-${this.name} third-icon-${this.name}`;
    },
    styles() {
      const styles = {};
      styles.color = this.color || null;
      if (this.size) {
        styles['font-size'] = `${this.size}px`;
      }
      return styles;
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event);
    }
  }
}
</script>
