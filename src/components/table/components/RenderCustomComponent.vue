<script>
export default {
  name: 'render-custom-component',
  props: {
    /**
     * @description v-model双向绑定的值
     */
    value: {
      required: true
    },
    /**
     * @description 传入的组件名
     */
    componentName: {
      required: true
    },
    /**
     * @description 传入的自定义参数
     */
    props: {
      default: null
    },
    /**
     * @description 传入的行数据
     */
    scope: {
      default: null
    },
    children: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  render (h) {
    let self = this;
    let options = [];
    
    options = this.children.map(child => {
      return h(
        child.name,
        {
          props: {
            value: child.value,
            ...child.props
          }
        }
      )
    });
    return h(self.componentName, {
      props: {
        value: self.value,
        scope: self.scope,
        ...self.props
      },
      on: {
        input: function (event) {
          self.$emit('input', event)
        }
      }
    },
    [options])
  }
}
</script>