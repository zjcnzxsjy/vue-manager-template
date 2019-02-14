
export const routers = [
  {
    id: 'components',
    pid: 'root', //父节点id
    path: '/components',
    name: 'Components',
    meta: {
      title: '组件示例',
      icon: 'third-icon-component'
    },
    children: [
      {
        id: "table",
        path: "table",
        name: 'baseTable',
        componentUrl: "components/Table.vue",
        meta: {
          title: "基础表格"
        }
      },
      {
        id: "uploadExcel",
        path: "uploadExcel",
        name: 'excel-upload',
        componentUrl: "components/UploadExcel.vue",
        meta: {
          title: "上传Excel"
        }
      }
    ]
  }
]

