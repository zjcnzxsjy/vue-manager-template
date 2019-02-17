# 基于Vue开发的中后台管理系统
目前正在基于vue开发一个管理系统，不拘泥于后台管理系统的形式，纯粹就是为了使用一些好的vue组件或者自己想实现某些功能。记录开发中的心得和踩过的坑。
目录结构(不定期更新)
```
|——public                        //静态资源
|——src                           //源代码
|  |——assets                     //静态资源
|  |——components                 //共用组件
|  |——layout                     //页面布局
|  |——mock                       //mock数据
|  |——store                      //全局状态管理
|  |——style                      //全局样式
|  |——utils                      //公共方法
|  |——views                      //具体页面
|  |——App.vue                    //入口页面
|  |——defaultSettings.js         //默认配置()
|  |——main.js                    //入口 加载组件 初始化等
|  └──router.js                  //路由
|——.browserslistrc               //浏览器版本要求
|——.bable-config.js              //Babel配置
|——package-lock.json             //锁定安装时的包的版本号
|——package.json                  //package.json
|——postcss.config.js             //css插件配置
└──vue.config.js                 //cli全局配置
```

## 整体风格
页面整体风格参考了ant design，比较喜欢这种简约清新型(个人感觉)。布局有两种侧边菜单布局和顶部菜单布局。风格也是暗色菜单风格与亮色菜单风格。在开发模式下，可以配置自己需要的风格。

```
<template>
  <div style='height: 100%;'>
    <div :is='layout' :key='layout'></div>
    <div 
      v-if='"development" === env'
      class='components-setting' 
      @click='visible = true'>
        <i class='el-icon-setting'></i>
    </div>
    <drawer-layout :visible='visible' @on-close='handleClose'></drawer-layout>
  </div>
</template>
```

### 侧边菜单布局
侧边菜单布局是左右布局，左边宽度固定，右边宽度自适应。左边区域的顶部是logo以及系统名称，主体部分是菜单。右边区域包括 header，nav和content上中下三部分。header区域放置按钮组，包括左边区域折叠等。nav是已打开页面的导航栏；content是具体页面展示区域。

### 顶部菜单布局
顶部菜单布局是上下布局，上边内容包括logo、菜单栏以及按钮组。下边是具体页面展示区域。上边内容元素较多，菜单栏内菜单选项不宜过多。
## router view
本项目采用微前端的方式搭建类单页应用。如果你的项目页面不多，可以不用采用这种方式；用微前端的方式搭建类单页，可以支持将多个小型前端应用聚合为一，这种方式的前提是每个小型前端的页面布局比较相似(比较适合于中后台管理系统)。
### 路由注册机制
在实践中，有个主项目(Portal)或者是入口项目，具体的每个小型前端可以类比为子项目(module)；主项目就是一个容器，提供子项目的路由注册，全局状态注册等功能外，也包含一些基础的路由信息，包括用户登录、注销已经错误页面等，还可以提供一些系统级公共支持；子项目提供具体的路由、页面业务资源。子项目的路由应该由自己控制，而整个系统的导航是主项目提供的。

webpack提供动态导入项目的文件功能，使用require.context(directory, useSubdirectories = false, regExp = /^\.\//),这个方法传3个参数：要搜索的文件夹目录，是否还应该搜索它的子目录，以及一个匹配文件的正则表达式。
搜索的文件夹目录必须是个字符串(不能含有变量参数),所以在子项目的根目录下都有一个router.js文件。

```
//主项目监听子项目的注册事件
bus.$on('routersRegister', (module_routers) => {
  function gatherRouters(items) {
    Array.isArray(items) && items.forEach((item) => {
      if('root' === item.pid) {
        item.component = Layout;
      }
      if (item.children && item.children.length > 0) {
        gatherRouters(item.children)
      } else {
        item.component = () => import(`./views/${item.componentUrl}`);
      }
    })
    return items;
  }
  const temp = gatherRouters(module_routers);
  if (temp) {
    routers = routers.concat(temp);
  }
})

// 每个子项目将各自的路由信息注册到主项目的路由内
const requireRouter = require.context('./views', true, /router.js/);  //搜索所有子项目的router.js文件

requireRouter.keys().forEach(fileName => {
  bus.$emit('routersRegister', {...requireRouter(fileName)}.routers);
})
```
### 配置项

```
//当设置 true 的时候该路由不会在菜单栏出现 如404，login等页面
hidden: true // (默认 false)

name: 'router-name' //设定路由的名字，一定要填写并且与vue组件的name一致，不然使用<keep-alive>时会出现各种问题
meta: {
  roles: ['admin', 'editor'] //设置该路由进入的权限，支持多个权限叠加
  title: 'title' //设置该路由在侧边栏和面包屑中展示的名字
  icon: 'svg-name' //设置该路由的图标
  noCache: true //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
}
```

```
//子项目路由
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
```
### 导航栏
导航栏记录了打开过的菜单，当打开的菜单过多，可以通过滚动或者点击导航浪两侧的方向箭头观察剩余的菜单。方向向下的箭头可以批量关闭导航栏里的菜单。
## 组件
### CRUD表格
一般中后台管理系统内会有许多的报表类展示，会有增删改查等基础操作。为了方便开发，减少重复性代码，封装了一套基于vue和element-ui的表格组件。
#### 功能
- 继承了 Element 中表格所有功能
- 根据表单条件查询表格数据
- 新增表格数据
- 修改表格数据
- 删除表格数据
- 使用 Element 中的组件渲染表格内容和表单内容
- 自定义展示表格列
- 表单校验
- 支持扩展自定义按钮
#### API
##### 配置

```
data
---
- 说明：表格显示的数据
- 类型：Array(必填)
- 可选值: 无
- 默认值：无
columns
---
- 说明：表格表头数据,具体参考配置columns
- 类型：Array(必填)
- 可选值: 无
- 默认值：无
laoding
---
- 说明：表格加载状态
- 类型：Boolean
- 可选值: 无
- 默认值：false
laoding-options
---
- 说明：表格加载配置数据,具体参考配置loading-options
- 类型：Object
- 可选值: 无
- 默认值：null
options
---
- 说明：表格配置数据,具体参考配置options
- 类型：Object
- 可选值: 无
- 默认值：null
index-column
---
- 说明：索引列,具体参考配置index-column
- 类型：Object/Boolean
- 可选值: 无
- 默认值：null
select-column
---
- 说明：选择列,具体参考配置select-column
- 类型：Object/Boolean
- 可选值: 无
- 默认值：null
filter-form
---
- 说明：是否显示筛选条件表单
- 类型：Boolean
- 可选值: 无
- 默认值：false
formOptions
---
- 说明：筛选条件表单,具体参考配置Element-ui Form Attributes
- 类型：Object
- 可选值: 无
- 默认值：null
formItemOptions
---
- 说明：筛选条件表单,具体参考配置Element-ui Form-Item Attributes
- 类型：Array
- 可选值: 无
- 默认值：null
add-title
---
- 说明：新增表单标题
- 类型：String
- 可选值: 无
- 默认值：添加
edit-title
---
- 说明：修改表单标题
- 类型：String
- 可选值: 无
- 默认值：编辑
add-form-options
---
- 说明：新增表单模板，具体参考配置Element-ui Form Attributes
- 类型：Object
- 可选值: 无
- 默认值：null
add-form-item-options
---
- 说明：新增表单模板，具体参考配置Element-ui Form-Item Attributes
- 类型：Array
- 可选值: 无
- 默认值：null
edit-form-options
---
- 说明：修改表单模板，具体参考配置Element-ui Form Attributes
- 类型：Object
- 可选值: 无
- 默认值：null
edit-form-item-options
---
- 说明：修改表单模板，具体参考配置Element-ui Form-Item Attributes
- 类型：Array
- 可选值: 无
- 默认值：null
dialog-options
---
- 说明：添加/编辑对话框配置，具体参考配置Element-ui Dialog Attributes
- 类型：Object
- 可选值: 无
- 默认值：null
add-rules
---
- 说明：新增表单校验规则
- 类型：Object
- 可选值: 无
- 默认值：null
edit-rules
---
- 说明：编辑表单校验规则
- 类型：Object
- 可选值: 无
- 默认值：null
pagination
---
- 说明：分页配置数据
- 类型：Object
- 可选值: 无
- 默认值：null
buttons
---
- 说明：展示的按钮
- 类型：String
- 可选值: search/add/edit/remove
- 默认值：''
```
##### 事件

```
select
---
- 说明: 当用户手动勾选数据行的 Checkbox 时触发的事件
- 参数: selection, row
select-all
---
- 说明: 当用户手动勾选全选 Checkbox 时触发的事件
- 参数: selection
selection-change
---
- 说明: 当选择项发生变化时会触发该事件
- 参数: selection
cell-mouse-enter
---
- 说明: 当单元格 hover 进入时会触发该事件
- 参数: row, column, cell, event
cell-mouse-leave
---
- 说明: 当单元格 hover 退出时会触发该事件
- 参数: row, column, cell, event
cell-click
---
- 说明: 当某个单元格被点击时会触发该事件
- 参数: row, column, cell, event
cell-dblclick
---
- 说明: 当某个单元格被双击击时会触发该事件
- 参数: row, column, cell, event
row-click
---
- 说明: 当某一行被点击时会触发该事件
- 参数: row, event, column
row-contextmenu
---
- 说明: 当某一行被鼠标右键点击时会触发该事件
- 参数: row, event
row-dblclick
---
- 说明: 当某一行被双击时会触发该事件
- 参数: row, event
header-click
---
- 说明: 当某一列的表头被点击时会触发该事件
- 参数: row, event
header-click
---
- 说明: 当某一列的表头被鼠标右键点击时触发该事件
- 参数: row, event
sort-change
---
- 说明: 当表格的排序条件发生变化的时候会触发该事件
- 参数: { column, prop, order }
row-add
---
- 说明: 当表格新增数据的时候会触发该事件
- 参数: {row}
row-edit
---
- 说明: 当表格新增数据的时候会触发该事件
- 参数: {index, row}
dialog-open
---
- 说明: 当表格新增或编辑打开模态框时
- 参数: {mode, index, row},后面两个参数是编辑时有
row-remove
---
- 说明: 当表格删除数据的时候会触发该事件
- 参数: selection
pagination-size-change
---
- 说明: 当分页 pageSize 改变时会触发
- 参数: pageSize
pagination-current-change
---
- 说明: 当分页 currentPage 改变时会触发
- 参数: currentPage
pagination-prev-click
---
- 说明: 当分页上一页按钮被用户点击改变当前页后触发
- 参数: currentPage
pagination-next-click
---
- 说明: 当分页下一页按钮被用户点击改变当前页后触发
- 参数: currentPage
on-search
---
- 说明: 点击查询按钮时触发
- 参数: queryCondition
```
##### 插槽

```
custom-buttons
---
- 说明: 自定义按钮
footer
---
- 说明: 表格底部自定义区域
```
##### 配置columns

```
label
---
- 说明: 显示的标题
- 类型：String
- 可选值: 无
- 默认值：无
prop
---
- 说明: 对应列内容的字段名
- 类型：String
- 可选值: 无
- 默认值：无
width
---
- 说明: 对应列的宽度
- 类型：String
- 可选值: 无
- 默认值：无
min-width
---
- 说明: 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列
- 类型：String
- 可选值: 无
- 默认值：无
fixed
---
- 说明: 列是否固定在左侧或者右侧，true 表示固定在左侧
- 类型：string, boolean
- 可选值: true, left, right
- 默认值：无
render-header
---
- 说明: 列标题 Label 区域渲染使用的 Function
- 类型：Function(h, { column, $index })
- 可选值: 无
- 默认值：无
sortable
---
- 说明: 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
- 类型：boolean, string
- 可选值: true, false, 'custom'
- 默认值：false
sort-method
---
- 说明: 对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字，和 Array.sort 表现一致
- 类型：Function(a, b)
- 可选值: 无
- 默认值：无
sort-by
---
- 说明: 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推
- 类型：String/Array/Function(row, index)
- 可选值: 无
- 默认值：无
sort-orders
---
- 说明: 数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序
- 类型：array
- 可选值: 数组中的元素需为以下三者之一：ascending 表示升序，descending 表示降序，null 表示还原为原始顺序
- 默认值：['ascending', 'descending', null]
resizable
---
- 说明: 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）
- 类型：boolean
- 可选值: 无
- 默认值：true
formatter
---
- 说明: 用来格式化内容
- 类型：Function(row, column, cellValue, index)
- 可选值: 无
- 默认值：无
show-overflow-tooltip
---
- 说明: 当内容过长被隐藏时显示 tooltip
- 类型：Boolean
- 可选值: 无
- 默认值：false
align
---
- 说明: 对齐方式
- 类型：String
- 可选值: left/center/right
- 默认值：left
header-align
---
- 说明: 表头对齐方式，若不设置该项，则使用表格的对齐方式
- 类型：String
- 可选值: left/center/right
- 默认值：无
class-name
---
- 说明: 列的 className
- 类型：String
- 可选值: 无
- 默认值：无
label-class-name
---
- 说明: 当前列标题的自定义类名
- 类型：String
- 可选值: 无
- 默认值：无
filters
---
- 说明: 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。
- 类型：Array[{ text, value }]
- 可选值: 无
- 默认值：无
filter-placement
---
- 说明: 过滤弹出框的定位
- 类型：String
- 可选值: top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end
- 默认值：bottom
filter-multiple
---
- 说明: 数据过滤的选项是否多选
- 类型：Boolean
- 可选值: 无
- 默认值：无
filter-method
---
- 说明: 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。
- 类型：Function(value, row, column)
- 可选值: 无
- 默认值：无
filtered-value
---
- 说明: 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。
- 类型：Array
- 可选值: 无
- 默认值：无
component.name
---
- 说明: 表格渲染的组件名，组件请参考组件
- 类型：String
- 可选值: 无
- 默认值：无
```
##### 配置options

```
height
---
- 说明: Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
- 类型：string/number
- 可选值: 无
- 默认值：无
max-height
---
- 说明: Table 的最大高度
- 类型：string/number
- 可选值: 无
- 默认值：无
stripe
---
- 说明: 是否为斑马纹 table
- 类型：Boolean
- 可选值: 无
- 默认值：false
border
---
- 说明: 是否带有纵向边框
- 类型：Boolean
- 可选值: 无
- 默认值：false
size
---
- 说明: Table 的尺寸
- 类型：string
- 可选值: medium / small / mini
- 默认值：无
fit
---
- 说明: 列的宽度是否自撑开
- 类型：Boolean
- 可选值: 无
- 默认值：true
show-header
---
- 说明: 是否显示表头
- 类型：Boolean
- 可选值: 无
- 默认值：true
highlight-current-row
---
- 说明: 是否要高亮当前行
- 类型：Boolean
- 可选值: 无
- 默认值：false
current-row-key
---
- 说明: 当前行的 key，只写属性
- 类型：String,Number
- 可选值: 无
- 默认值：无
row-class-name
---
- 说明: 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
- 类型：Function({row, rowIndex})/String
- 可选值: 无
- 默认值：无
row-style
---
- 说明: 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
- 类型：Function({row, rowIndex})/Object
- 可选值: 无
- 默认值：无
cell-class-name
---
- 说明: 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
- 类型：Function({row, column, rowIndex, columnIndex})/String
- 可选值: 无
- 默认值：无
cell-style
---
- 说明: 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
- 类型：Function({row, column, rowIndex, columnIndex})/Object
- 可选值: 无
- 默认值：无
header-row-class-name
---
- 说明: 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className
- 类型：Function({row, rowIndex})/String
- 可选值: 无
- 默认值：无
header-row-style
---
- 说明: 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style
- 类型：Function({row, rowIndex})/Object
- 可选值: 无
- 默认值：无
header-cell-class-name
---
- 说明: 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
- 类型：Function({row, column, rowIndex, columnIndex})/String
- 可选值: 无
- 默认值：无
header-cell-style
---
- 说明: 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
- 类型：Function({row, column, rowIndex, columnIndex})/Object
- 可选值: 无
- 默认值：无
row-key
---
- 说明: 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能的情况下，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
- 类型：Function(row)/String
- 可选值: 无
- 默认值：无
empty-text
---
- 说明: 空数据时显示的文本内容，也可以通过 slot="empty" 设置
- 类型：String
- 可选值: 无
- 默认值：暂无数据
default-sort
---
- 说明: 默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序
- 类型：Object
- 可选值: order: ascending, descending
- 默认值：如果只指定了prop, 没有指定order, 则默认顺序是ascending
tooltip-effect
---
- 说明: tooltip effect 属性
- 类型：String
- 可选值: dark/light
- 默认值：无
show-summary
---
- 说明: 是否在表尾显示合计行
- 类型：Boolean
- 可选值: 无
- 默认值：false
sum-text
---
- 说明: 合计行第一列的文本
- 类型：String
- 可选值: 无
- 默认值：合计
summary-method
---
- 说明: 自定义的合计计算方法
- 类型：Function({ columns, data })
- 可选值: 无
- 默认值：无
span-method
---
- 说明: 合并行或列的计算方法
- 类型：Function({ row, column, rowIndex, columnIndex })
- 可选值: 无
- 默认值：无
select-on-indeterminate
---
- 说明: 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行
- 类型：Boolean
- 可选值: 无
- 默认值：true
```
##### 配置loading-options

```
text
---
- 说明: 显示在加载图标下方的加载文案
- 类型：String
- 可选值: 无
- 默认值：无
spinner
---
- 说明: 自定义加载图标类名
- 类型：String
- 可选值: 无
- 默认值：无
background
---
- 说明: 遮罩背景色
- 类型：String
- 可选值: 无
- 默认值：无
```
##### 配置index-column

```
label
---
- 说明: indexRow 列名
- 类型：String
- 可选值: 无
- 默认值：无
width
---
- 说明: indexRow宽度
- 类型：String
- 可选值: 无
- 默认值：无
min-width
---
- 说明: indexRow 最小宽度，与 width 的区别是 width 是固定的，minWidth 会把剩余宽度按比例分配给设置了 minWidth 的列
- 类型：String
- 可选值: 无
- 默认值：无
fixed
---
- 说明: indexRow 是否固定在左侧或者右侧，true 表示固定在左侧
- 类型：String/Boolean
- 可选值: true/left/right
- 默认值：无
renderHeader
---
- 说明: indexRow 标题 Label 区域渲染使用的 Function
- 类型：Function (h, { column, $index })
- 可选值: 无
- 默认值：无
resizable
---
- 说明: indexRow 是否可以通过拖动改变宽度（需要在 options 中设置 border 属性为 true
- 类型：Boolean
- 可选值: 无
- 默认值：true
align
---
- 说明: 对齐方式
- 类型：String
- 可选值: left/center/right
- 默认值：left
headerAlign
---
- 说明: 表头对齐方式，若不设置该项，则使用表格的对齐方式
- 类型：String
- 可选值: left/center/right
- 默认值：无
className
---
- 说明: indexRow 的 className
- 类型：Function (h, { column, $index })
- 可选值: 无
- 默认值：无
labelClassName
---
- 说明: indexRow 标题的自定义类名
- 类型：String
- 可选值: 无
- 默认值：无
```
##### selection-column

```
label
---
- 说明: indexRow 列名
- 类型：String
- 可选值: 无
- 默认值：无
width
---
- 说明: indexRow宽度
- 类型：String
- 可选值: 无
- 默认值：无
min-width
---
- 说明: indexRow 最小宽度，与 width 的区别是 width 是固定的，minWidth 会把剩余宽度按比例分配给设置了 minWidth 的列
- 类型：String
- 可选值: 无
- 默认值：无
fixed
---
- 说明: indexRow 是否固定在左侧或者右侧，true 表示固定在左侧
- 类型：String/Boolean
- 可选值: true/left/right
- 默认值：无
renderHeader
---
- 说明: indexRow 标题 Label 区域渲染使用的 Function
- 类型：Function (h, { column, $index })
- 可选值: 无
- 默认值：无
resizable
---
- 说明: indexRow 是否可以通过拖动改变宽度（需要在 options 中设置 border 属性为 true
- 类型：Boolean
- 可选值: 无
- 默认值：true
align
---
- 说明: 对齐方式
- 类型：String
- 可选值: left/center/right
- 默认值：left
headerAlign
---
- 说明: 表头对齐方式，若不设置该项，则使用表格的对齐方式
- 类型：String
- 可选值: left/center/right
- 默认值：无
className
---
- 说明: indexRow 的 className
- 类型：Function (h, { column, $index })
- 可选值: 无
- 默认值：无
labelClassName
---
- 说明: indexRow 标题的自定义类名
- 类型：String
- 可选值: 无
- 默认值：无
```
##### 配置formOptions/addFormOptions/editFormOptions

```
label-position
---
- 说明: 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
- 类型：String
- 可选值: right/left/top
- 默认值：right
label-width
---
- 说明: 表单域标签的宽度
- 类型：String
- 可选值: 无
- 默认值：无
```
##### 配置formItemOptions/addFormItemOptions/editFormItemOptions

```
span
---
- 说明: 栅格占据的列数
- 类型：Number
- 可选值: 无
- 默认值：24
offset
---
- 说明: 栅格左侧的间隔格数
- 类型：Number
- 可选值: 无
- 默认值：0
label
---
- 说明: 标签文本
- 类型：String
- 可选值: 无
- 默认值：无
prop
---
- 说明: 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
- 类型：String
- 可选值: 传入 Form 组件的 model 中的字段
- 默认值：无
rules
---
- 说明: 表单验证规则
- 类型：Object
- 可选值: 无
- 默认值：无
required
---
- 说明: 是否必填，如不设置，则会根据校验规则自动生成
- 类型：Boolean
- 可选值: 无
- 默认值：false
children
---
- 说明: 子formItemOptions,配置参考子formItemOptions
- 类型：Array
- 可选值: 无
- 默认值：无
```
### skeleton组件

```
loading
---
- 说明: 是否处于加载状态
- 类型：Boolean
- 可选值: 无
- 默认值：true
avatar
---
- 说明: 是否有头像
- 类型：Boolean
- 可选值: 无
- 默认值：false
avatar-size
---
- 说明: 头像大小
- 类型：String
- 可选值: large/medium/small
- 默认值：large
avatar-shape
---
- 说明: 头像形状
- 类型：String
- 可选值: square/circle
- 默认值：square
title
---
- 说明: 是否有标题
- 类型：Boolean
- 可选值: 无
- 默认值：false
title-width
---
- 说明: 标题宽度
- 类型：String
- 可选值: 无
- 默认值：无
paragraph
---
- 说明: 是否有段落
- 类型：Boolean
- 可选值: 无
- 默认值：true
paragraph-rows
---
- 说明: 段落行数
- 类型：Number
- 可选值: 无
- 默认值：2
paragraph-width
---
- 说明: 段落宽度，如果值是数组，可以设置每个段落的宽度，如果是字符串，设置最后一个段落的宽度
- 类型：Array/String
- 可选值: 无
- 默认值：无
```
### drawer组件

```
value
---
- 说明: 是否显示
- 类型：Boolean
- 可选值: 无
- 默认值：false
title
---
- 说明: 标题
- 类型：String
- 可选值: 无
- 默认值：无
width
---
- 说明: drawer宽度
- 类型：Number/String
- 可选值: 无
- 默认值：无
closeable
---
- 说明: 是否显示关闭按钮
- 类型：Boolean
- 可选值: 无
- 默认值：true
mask-closeable
---
- 说明: 遮罩是否可以关闭
- 类型：Boolean
- 可选值: 无
- 默认值：true
mask
---
- 说明: 是否有遮罩
- 类型：Boolean
- 可选值: 无
- 默认值：true
mask-style
---
- 说明: 遮罩样式
- 类型：Object
- 可选值: 无
- 默认值：无
styles
---
- 说明: drawer body的样式名称
- 类型：Object
- 可选值: 无
- 默认值：无
placement
---
- 说明: drawer显示的位置
- 类型：String
- 可选值: right/left
- 默认值：right
z-index
---
- 说明: drawer z-index值
- 类型：Number
- 可选值: 无
- 默认值：1000
class-name
---
- 说明: drawer样式名称
- 类型：String
- 可选值: 无
- 默认值：无
```
## 样式
所有全局样式都在 @/src/styles 目录下设置

```
├── styles
│   ├── Element-ui.scss          # 全局自定义 element-ui 样式
│   └── Global.scss              # 全局通用样式
```
## axios的二次封装
## Mock Data
Mock 数据是前端开发过程中必不可少的一环，是分离前后端开发的关键链路。通过预先跟服务器端约定好的接口，模拟请求数据甚至逻辑，能够让前端开发独立自主，不会被服务端的开发所阻塞。
### Mockjs
本项目所有的数据都是用 mockjs 本地生成模拟出来的，它的原理是:拦截了所有的请求并代理到本地模拟数据，所以 network 中没有发出任何的请求。所有的 mock 数据都在 @/src/mock 目录下，它只会拦截 @/src/mock/index.js 文件中拦截的 url。移除只需要在 @/src/main.js 中移除 import './mock' 并且删除 @/src/mock 文件夹即可。
### 本地Mock和线上切换
当我们本地使用 Mock.js 模拟本地数据，线上使用真实环境 api 方法。我们主要是判断：是线上环境的时候，不引入 mock 数据就可以了，只有在本地引入 Mock.js。

```
//main.js
if (process.env.NODE_ENV === 'development') {
  require('./mock') // simulation data
}
```
只有在本地环境之中才会引入 mock 数据。