import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types';
import { buildURL } from './helpers/url';
import { transformRequest, transformResponse } from './helpers/data';
import { processHeader } from './helpers/headers';
import xhr from './xhr';

/**
 * axios实例
 * @param config axios参数
 */
function axios(config: AxiosRequestConfig): AxiosPromise {
  // 在调用请求之前处理所有参数
  processConfig(config);
  return xhr(config).then(res => {
    return transformResponseData(res)
  });
}

/**
 * 处理config参数
 * @param config 
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  // 要先处理headers在去处理data
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}

/**
 * 拼接config中的url参数
 * @param config axios参数
 */
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params);
}

/**
 * 处理data中的参数
 * @param config 
 */
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data);
}

/**
 * 处理headers
 * @param config 
 */
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeader(headers, data)
}

/**
 * 转换请求返回出来的数据
 * @param res 返回值
 */
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data);
  return res;
}

export default axios;
