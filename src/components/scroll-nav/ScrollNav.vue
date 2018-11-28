<template>
  <div class='scroll-nav-wrapper'>
    <div 
      class='scroll-nav-main'
      ref='navContainer'>
      <ul
        ref='scrollWrapper'
        class='scroll-nav-items'>
        <li
          v-for='(item, index) in data'
          :key='index'
          class='nav-view'
          @click.self='handleItemClick'>
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class='scroll-nav-left'>
      <button
        @click.stop='throttledArrowClick(-clickStep, $event)'>
        <i 
          class='el-icon-caret-left'>
        </i>
      </button>
    </div>
    <div class='scroll-nav-right'>
      <button
        @click.stop='throttledArrowClick(clickStep, $event)'>
        <i
          class='el-icon-caret-right'>
        </i>
      </button>
      <button>
        
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ScrollNav',
  props: {
    data: {
      type: Array,
      default: []
    },
    clickStep: {
      type: Number,
      default: 80
    },
    scrollStep: {
      type: Number,
      default: 120
    }
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@import './ScrollNav.scss'
</style>
