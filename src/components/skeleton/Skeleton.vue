<template>
  <div>
    <div class='skeleton-wrapper'>
      <section 
        v-if='loading'
        class='skeleton-main'
        :class="[
          {'skeleton-active': active}
        ]">
        <div
          v-if='avatar' 
          class='skeleton-main-avatar-wrapper'>
          <span 
            class='skeleton-main-avatar'
            :class="[
              'skeleton-main-avatar-' + avatarSize,
              {'skeleton-main-avatar-circle': 'circle' === avatarShape}
            ]"
          ></span>
        </div>
        <div class='skeleton-main-content'>
          <h3
            v-if='title'
            class='skeleton-title'
            :style='titleStyle'>
          </h3>
          <ul
            v-if='paragraph'
            class='skeleton-paragraph'>
            <li
            v-for='row in paragraphStyle.rows'
            :key='row'
            :style='{width: Array.isArray(paragraphStyle.width)? paragraphStyle.width[row - 1] : (row === paragraphStyle.rows? paragraphStyle.width : null)}'></li>
          </ul>
        </div>
      </section>
    </div>
    <slot v-if='!loading'></slot>
  </div>
</template>
<script>
export default {
  name: 'Skeleton',
  props: {
    /**
     * @description 是否处于加载状态
     */
    loading: {
      type: Boolean,
      default: true
    },
    /**
     * @description 是否有头像
     */
    avatar: {
      type: Boolean,
      default: false
    },
    /**
     * @description 头像大小
     */
    avatarSize: {
      type: String,
      default: 'large'
    },
    /**
     * @description 头像形状
     */
    avatarShape: {
      type: String,
      default: 'square'
    },
    /**
     * @description 是否激活
     */
    active: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否有标题
     */
    title: {
      type: Boolean,
      default: true
    },
    /**
     * @description 标题宽度
     */
    titleWidth: String,
    /**
     * @description 是否有段落
     */
    paragraph: {
      type: Boolean,
      default: true
    },
    /**
     * @description 段落行数
     */
    paragraphRows: {
      type: Number,
      default: 2
    },
    /**
     * @description 段落宽度
     */
    paragraphWidth: [String, Array]
  },
  computed: {
    titleStyle() {
      const style = {};
      if (!this.titleWidth) {
        if (this.avatar) {
          style.width = '50%';
        } else {
          style.width = '38%';
        }
      } else {
        style.width = this.titleWidth;
      }
      return style;
    },
    paragraphStyle() {
      const style = {};
      style.rows = this.paragraphRows;
      style.width = this.paragraphWidth;
      return style;
    }
  }
}
</script>
<style lang="scss" scoped>
@import './Skeleton.scss'

</style>
