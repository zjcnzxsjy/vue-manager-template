/** 
 * @description 深度拷贝
 */
export function deepClone(obj) {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
          newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
      }
  }
  return newObj;
}
/** 
 * @description 数组中查找指定元素
 * @param {Array} array
 * @param {Function} predicate
 * @param {Object} context
 */
export function findIndex(array, predicate, context) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (predicate.call(context, array[i], i, array)) return i;
  }
  return -1;
}