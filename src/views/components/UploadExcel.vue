<template>
  <div>
    <hs-upload-excel :upload-success="handleSuccess" :before-upload="beforeUpload"></hs-upload-excel>
    <span>第二行第二列数据：{{value}}</span>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>
    </el-table>
  </div>
</template>
<script>
import hsUploadExcel from "@/components/uploadExcel/UploadExcel";

export default {
  name: "excel-upload",
  components: {
    hsUploadExcel
  },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      value: ""
    };
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 2;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning"
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      console.log(results)
      this.tableHeader = header;
      this.value = this.tableData[1][this.tableHeader[1]];
    }
  }
};
</script>
