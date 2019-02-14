const MODULE = 'dashbord';
export const routers = [
  {
    id: 'dashbord',
    pid: 'root',
    path: '/',
    name: 'DashBord',
    redirect: '/mainIndex',
    meta: {
      title: 'dashbord',
      icon: 'third-icon-dashbord',
    },
    children: [
      {
        id: "mainIndex",
        pid: 'dashbord',
        path: "mainIndex",
        name: 'MainIndex',
        componentUrl: ""+ MODULE +"/MainIndex.vue",
        meta: {
          title: "首页"
        }
      },
      // {
      //   id: "mainIndex1",
      //   pid: 'dashbord',
      //   path: "mainIndex1",
      //   name: "首页",
      //   componentUrl: ""+ MODULE +"/MainIndex.vue"
      // },{
      //   id: "mainIndex2",
      //   pid: 'dashbord',
      //   path: "mainIndex2",
      //   name: "首页",
      //   componentUrl: ""+ MODULE +"/MainIndex.vue"
      // }
    ]
  }
]
