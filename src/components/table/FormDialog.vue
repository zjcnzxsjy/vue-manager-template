<template>
  <el-dialog
    :title='dialogOptions.title'
    :visible.sync='isDialogShow'
    v-bind='dialogOptions'>
    <slot name='formDialog'></slot>
    <div slot="footer">
      <el-button
        :size="dialogOptions ? handleAttribute(dialogOptions.saveButtonSize, null) : null"
        :type="dialogOptions ? handleAttribute(dialogOptions.saveButtonType, null) : null"
        :icon="dialogOptions ? handleAttribute(dialogOptions.saveButtonIcon, null) : null"
        :loading="dialogOptions ? handleAttribute(dialogOptions.saveButtonIcon, null) : false"
        @click="handleDialogSave">
      {{dialogOptions ? handleAttribute(dialogOptions.saveButtonText, '确定') : '确定'}}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import emitter from '../src/emitter'
import base from './mixin/base'
import { deepClone } from '@/utils/Base'
export default {
  name: 'hsFormDialog',
  mixins: [emitter, base],
  props: {
    dialogOptions: {
      default: null
    }
  },
  data() {
    return {
      /**
       * @description dialog显示与隐藏
       */
      isDialogShow: false,
      formField: null,
      mode: ''
    }
  },
  created() {
    this.$on('hs.addForm', (form) => {
      if (form) {
        this.formField = form;
      }
    });
    this.$on('dialog-open', ({ mode, row }) => {
      this.dialogOpen();
      this.mode = mode;
      if (this.formField) {
        this.formField.$refs.form.clearValidate();
        this.$nextTick(() => {
          if (row) {
            this.formField.formItemOptions.forEach((option) => {
              this.$set(this.formField.formData, option.prop, row[option.prop]);
            })
          } else {
            this.formField.formItemOptions.forEach((option) => {
              this.$set(this.formField.formData, option.prop, '');
            })
          }
        })
      }
    })
  },
  mounted() {
    this.dispatch('hsTable', 'hs.addDialog', this);
  },
  methods: {
    handleDialogSave() {
      this.formField.$refs.form.validate(valid => {
        if (!valid) {
          return false;
        }
        this.$emit('dialog-save', {
          formData: deepClone(this.formField.formData)
        })
      })
    },
    dialogOpen() {
      this.isDialogShow = true;
    },
    dialogClose() {
      this.isDialogShow = false;
    }
  }
}
</script>
