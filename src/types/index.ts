// 请求方法都是固定的，所以定义请求方法的类型，约束请求方法的类型
export type Method = 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'post' | 'POST'
  | 'head' | 'HEAD'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'options' | 'OPTIONS'

// axios请求的参数类型
export interface AxiosRequestConfig {
  url: string; //
  method?: Method;
  data?: any;
  params?: any;
  headers?: any;
  responseType?: XMLHttpRequestResponseType;
}

// 定义axios返回类型
export interface AxiosResponse {
  data: any;
  status: number;                // HTTP状态码
  statusText: string;            // 状态消息
  headers: any;                  // 响应头配置信息
  config?: AxiosRequestConfig;   // 请求配置信息
  request: any;                  // XMLHttpRequest对象实例
}

// 定义axios函数的类型，返回一个AxiosResponse类型的promise对象
export interface AxiosPromise extends Promise<AxiosResponse> {

}