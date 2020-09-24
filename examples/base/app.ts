import axios from '../../src';

// 条件2中的参数中包含数组,正确返回应该为 /base/get?foo[]=bar&foo[]=baz
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// 条件3中的参数中嵌套对象,正确返回应该为 /base/get?foo=%7B%22bar%22:%22baz%22%7D
// axios({
//   method:'get',
//   url: '/base/get',
//   params:{
//     foo:{
//       bar:'baz'
//     }
//   }
// })

// const date = new Date()
// // 条件4中的参数中有日期类型,正确返回应该为 /base/get?date=2019-04-01T05:55:39.030Z
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// // 条件5中的参数中有特殊字符,正确返回应该为 /base/get?foo=@:$,+
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })

// // 条件6中的参数中有空值,正确返回应该为 /base/get?foo=bar 
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// 条件7中的参数中有hash值需要丢弃hash,正确返回应该为 /base/get?foo=bar
// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// // 条件8中保留url中已存在的参数,正确返回应该为 /base/get?foo=bar&bar=baz
// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })

// 验证data为对象,返回一个空的对象，这是因为请求的时候header的Content-Type是text/plain;charset=UTF-8
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// // 验证数据为ArrayBuffer
// const arr = new Int32Array([21, 31]);
// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'content-type': 'application/json',
//     'Accept': 'application/json, text/plain, */*'
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)
// console.log(searchParams)

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res)
})

// axios({
//   method: 'post',
//   url: '/base/post',
//   responseType: 'json',
//   data: {
//     a: 3,
//     b: 4
//   }
// }).then((res) => {
//   console.log(res)
// })