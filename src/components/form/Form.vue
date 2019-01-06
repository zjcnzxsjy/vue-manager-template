<template>
  <el-form
    ref='form'
    :model='formData'
    v-bind='formOptions'>
    <el-form-item
      v-for='(item, index) in formItemOptions'
      :key='index'
      :label='item.label || ""'
      :prop='item.prop || null'>
      <el-col
        v-for='(subItem, index) in item.children'
        :key='index'
        :span='subItem.span || 24'
        :offset='subItem.offset || 0'>
        <el-form-item
          :label='subItem.label || null'
          :prop='subItem.prop || null'>
          <render-custom-component
            v-if='subItem.component && subItem.component.name'
            :component-name='subItem.component.name'
            v-bind='subItem.component'
            v-model='formData[subItem.prop]'>
          </render-custom-component>
        </el-form-item>
      </el-col>
    </el-form-item>
  </el-form>
</template>
<script>
import renderCustomComponent from '@/components/renderComponent/RenderCustomComponent'
export default {
  name: 'hsForm',
  props: {
    formOptions: {
      type: Object,
      default: null
    },
    formItemOptions: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  components: {
    renderCustomComponent
  }
}
</script>
