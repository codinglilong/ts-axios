import { isPlainObject } from './util';

/**
 * 合并headers,config.headers对content-type对于大小写不敏感，所以用这个函数规范化,把首字母转换为大写
 * @param headers 
 * @param normalizeName 
 */
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return;
  }
  Object.keys(headers).forEach(name => {
    // 如果headers中的属性name不等于传进来的normalizeName属性，但是handers的name属性大写等于传进来的属性normalizeName大写相等，就说明需要把首字母规范化，转换为首字母大写
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name];
      delete headers[name];
    }
  })
}

/**
 * 处理headers
 * @param headers 
 * @param data 
 */
export function processHeader(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type');

  if (isPlainObject(data)) {
    // 当data为对象的时候未设置content-type，会去设置个默认的Content-Type
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
    }
  }

  return headers
}

/**
 * 处理返回的请求头信息
 * @param headers 
 */
export function parseHeaders(headers: string): any {
  // Object.create(null)没有继承任何原型方法，也就是说它的原型链没有上一层。
  let parsed = Object.create(null);

  if (!headers) {
    return parsed;
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':');
    key = key.trim().toLowerCase();
    if (!key) {
      return
    }
    if (val) {
      val = val.trim();
    }
    parsed[key] = val;
  })
  return parsed;
}