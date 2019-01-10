<template>
  <el-form
    ref='form'
    :model='formData'
    v-bind='formOptions'>
    <el-row
      v-bind='formOptions'>
      <el-col
        v-for='(item, index) in formItemOptions'
        :key='index'
        :span='item.span || 24'
        :offset='item.offset || 0'>
        <el-form-item
          :label='item.label'
          :prop='item.prop'
          :rules='item.rules'
          :required='item.required || false'>
          <el-row>
            <el-col
              v-for='(subItem, index) in item.children'
              :key='index'
              :span='subItem.component.span || 24'>
              <render-custom-component
                v-if='subItem.component && subItem.component.name'
                :component-name='subItem.component.name'
                v-bind='subItem.component'
                v-model='formData[subItem.component.prop || item.prop]'>
              </render-custom-component>
            </el-col>
          </el-row>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import emitter from '../src/emitter'
import renderCustomComponent from './components/RenderCustomComponent'
export default {
  name: 'hsForm',
  mixins: [emitter],
  props: {
    formOptions: {
      type: Object,
      default: null
    },
    formItemOptions: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  components: {
    renderCustomComponent
  },
  mounted() {
    this.dispatch('hsTable', 'hs.addForm', this)
    this.dispatch('hsFormDialog', 'hs.addForm', this)
  },
  methods: {
    // reset() {
    //   this.$refs.resetFields();
    // }
  }
}
</script>
