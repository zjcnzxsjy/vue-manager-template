
export const routers = [
  {
    id: 'components',
    pid: 'root',
    path: '/components/',
    name: '组件示例',
    icon: 'third-icon-component',
    children: [
      {
        id: "table",
        path: "table",
        name: "基础表格",
        componentUrl: "components/Table.vue"
      },
      {
        id: "uploadExcel",
        path: "uploadExcel",
        name: "上传Excel",
        componentUrl: "components/UploadExcel.vue"
      }
    ]
  }
]

