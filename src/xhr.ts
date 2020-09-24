import {
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse,
} from './types';
import { parseHeaders } from './helpers/headers';

/**
 * 主请求方法
 * @param config 请求参数AxiosRequestConfig
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
    } = config;
    // 实例个请求对象
    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    request.open(method.toLowerCase(), url, true);

    // 请求发起时，当readyState属性发生变化时会进入函数
    request.onreadystatechange = function handLoad() {
      // 状态为4说明资源下载操作已经成功,可以拿到响应结果
      if (request.readyState !== 4) {
        return;
      }
      // 以字符串的形式返回所有用 CRLF 分隔的响应头，如果没有收到响应，则返回 null。
      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      // responseType类型如果是text的话,就拿返回responseText，否则直接拿request.response
      const responseData = responseType !== 'text' ? request.response : request.responseText;

      // 构造AxiosResponse对象
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      resolve(response)
    }

    Object.keys(headers).forEach(name => {
      // 当data为空的时候，并且设置了content-type的时候删除这个无意义的属性
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        // 设置请求头
        request.setRequestHeader(name, headers[name]);
      }
    })

    request.send(data);
  })
}