import { isDate, isPlainObject } from './util'

/**
 *  处理特殊字符
 * @param val 
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 定义buildURL函数，params为any类型并且有可能没有参数，所以不传。
 * 整个方法返回一个新的url
 * @param url 请求的url
 * @param params 请求的get参数
 */
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const parts: string[] = [];
  Object.keys(params).forEach(key => {
    const val = params[key];
    // 忽略空值
    if (val === null || typeof val === 'undefined') {
      return;
    }

    // 把参数统一放进数组中，以便后面处理
    let values = [];
    if (Array.isArray(val)) {
      // 处理当参数中有数组解构的参数
      values = val;
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach(val=>{
      if(isDate(val)){
        // 处理当参数为日期类型
        val = val.toISOString();
      }else if(isPlainObject(val)){
        // 处理嵌套对象,利用JSON.stringify把对象转换为字符串
        val = JSON.stringify(val);
      }
      // 利用encode处理特殊字符
      parts.push(`${encode(key)}=${encode(val)}`);
    })
  })
  // 使用&符号连接起来，变为key=val&&key1=value1
  let serializedParams = parts.join('&');
  if(serializedParams){
    // 除去hash
    const markIndex = url.indexOf('#');
    if(markIndex !== -1){
      url = url.slice(0,markIndex)
    }
    // 拼接url添加?标志
    url +=(url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  return url;
}