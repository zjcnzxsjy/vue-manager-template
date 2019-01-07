<template>
  <el-dialog
    :title='dialogOptions.title'
    :visible.sync='isDialogShow'>
    <slot 
      name='form'>
    <hs-form
     :formOptions='formOptions'
     :formItemOptions='formItemOptions'>
    </hs-form>
    </slot>
    <div slot="footer">
      <el-button
        :size="dialogOptions ? dialogOptions.saveButtonSize : null"
        :type="dialogOptions ? dialogOptions.saveButtonType : null"
        :icon="dialogOptions ? dialogOptions.saveButtonIcon : null"
        :loading="dialogOptions ? dialogOptions.saveButtonIcon : false"
        @click="handleDialogSave">
      {{dialogOptions ? dialogOptions.saveButtonText : '确定'}}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'hsFormDialog',
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
      formfield: {}
    }
  },
  created() {
    this.$on('hs.dialog.addForm', (form) => {
      if (form) {
        this.formfield = form;
      }
    })
  },
  methods: {
    handledialogSave() {
      this.formfield.validate(valid => {
        if (valid) {
          return false;
        }
        let rowData = {};
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
