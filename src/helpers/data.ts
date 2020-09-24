import { cat } from 'shelljs'
import { isPlainObject } from './util'

/**
 * 处理放在data中的参数
 * @param data 
 */
export function transformRequest(data: any): any {
  // 如果是我们定义的普通对象就用JSON.stringify转换为字符串
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

/**
 * 处理请求返回回来的data数据
 * @param data 
 */
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    // 因为data不一定是符合json转换为对象的规则，所以使用try catch来接收错误.从而不会导致转换失败把整个网站因为错误而无法进行下去
    try {
      data = JSON.parse(data)
    } catch (e) {
      // 不处理
    }
  }
  return data;
}