import Mock from 'mockjs';


export function usersTable() {
  return Mock.mock({
    code: 0,
    data: {
      "user|10": [{
        'name': '@cname',
        'id|+1': 1,
        'age|10-60': 0,    //10-60以内的随机数，0用来确定类型
        'birthday': '@date("yyyy-MM-dd")',    //年月日
        'city': '@city(true)'    //中国城市
      }],
      total: 15
    }
  })
}