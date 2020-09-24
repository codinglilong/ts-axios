
// 多次使用toString 这里用来缓存一下遍历。为了提升一些查找的性能优化。
const toString = Object.prototype.toString;

/**
 * 判断是否为日期类型
 * @param val 
 */
export function isDate(val:any):val is Date{
  return toString.call(val) === '[object Date]';
}

/**
 * 判断是否为对象类型
 * @param val 
 */
export function isObject(val:any):val is object{
  return val !== null && typeof val === 'object';
}

/**
 * 判断是否为真正的对象类型
 * @param val 
 */
export function isPlainObject(val:any):val is object{
  return toString.call(val) === '[object Object]'
}