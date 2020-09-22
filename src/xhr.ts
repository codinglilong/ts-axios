import { AxiosRequestConfig } from './types';

/**
 * 主请求方法
 * @param config 请求参数AxiosRequestConfig
 */
export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get' } = config;
  // 实例个请求对象
  const request = new XMLHttpRequest();

  request.open(method.toLowerCase(), url, true);
  request.send(data);
  
}