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
}