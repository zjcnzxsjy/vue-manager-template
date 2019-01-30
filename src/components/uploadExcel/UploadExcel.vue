<template>
  <div>
    <el-button
      :loading="loading"
      size="mini" 
      type="primary"
      @click='handleUpload'>
      {{text}}
    </el-button>
    <!-- <slot v-if='drop'></slot> -->
    <input ref='upload-excel-input'
     type='file' 
     class='upload-excel-input'
     @change='handleChange'>
  </div>
</template>
<script>
import XLSX from 'xlsx'

export default {
  name: 'hs-upload-excel',
  props: {
    text: {
      type: String,
      default: 'Browse'
    },
    accepts: {
      type: String,
      default: '.xlsx, .xls'
    },
    beforeUpload: Function,
    uploadSuccess: Function
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    }
  },
  methods: {
    handleUpload() {
      this.$refs['upload-excel-input'].click();
    },
    handleChange(e) {
      const files = e.target.files;
      const rawFile = files[0];  // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['upload-excel-input'].value = null;

      if (!this.beforeUpload) {
        this.readData(rawFile);
        return;
      }

      const before = this.beforeUpload(rawFile);
      if (before && before.then) {
        before.then(processedFile => {
          this.readData(processedFile);
        })
        .catch((err) => {
          console.log(err);
          return
        }) 
      } else if (before === false) {
        return;
      } else {
        this.readData(rawFile);
      }
    },
    readData(file) {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
          const data = e.target.result;
          const fixData = this.fixData(data);
          const workbook = XLSX.read(btoa(fixData), { type: 'base64' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const header = this.getHeaderRow(worksheet);
          const results = XLSX.utils.sheet_to_json(worksheet);
          this.loading = false;
          this.generateData({ header, results });
        };
        reader.readAsArrayBuffer(file);
      })
    },
    fixData(data) {
      let o = '';
      let l = 0;
      const w = 10240;
      for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    getHeaderRow(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet['!ref']);
      let C;
      const R = range.s.r;
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers
    },
    generateData({ header, results }) {
      this.excelData.header = header;
      this.excelData.results = results;
      this.uploadSuccess && this.uploadSuccess(this.excelData);
    },
    isExcel() {
      return /\.(xlsx|xls|csv)$/.test(file.name);
    },
    clearAllData () {
      this.$refs['upload-excel-input'].value = null
      this.excelData = {
        header: null,
        results: null
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-excel-input{
  display: none;
  z-index: -9999;
}
</style>
