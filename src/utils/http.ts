// 添加拦截器：
//     拦截request请求
//     拦截uploadfile文件上传

import { useMemberStore } from '@/stores'

// todo：
//     1、非http开头需要拼接地址
//     2、请求超时
//     3、添加小程序端请求头标识
//     4、添加token请求头标识

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net/'

//添加拦截器
const httpInterceptor = {
  //拦截前触发
  invoke(options: UniApp.RequestOptions) {
    //拼接URL地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    //请求超时
    options.timeout = 30000
    //添加小程序端请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    //添加token请求头标识
    const memberstore = useMemberStore()
    const token = memberstore.profile?.token
    // console.log(token, 'token')

    if (token) {
      options.header.Authorization = token
    }
    // console.log(options)
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadfile', httpInterceptor)

/**
 * 请求函数
 * @param UniApp.RequestOptions
 * @returns Promise
 * 1、返回promise对象
 * 2、请求成功：
 *    1、提取核心数据 res.data
 *    2、添加类型，支持泛型
 * 3、请求失败：
 *    1、网络错误--》提示用户换网络
 *    2、401错误--》清理用户信息，跳转到登录页
 *    3、其他错误--》根据后端错误信息轻提示
 */
interface Data<T> {
  code: string
  msg: string
  result: T
}
//添加类型，支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      //请求成功
      success(res) {
        //状态码为2xx
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401 || res.statusCode === 404) {
          //清除用户信息并跳转到登录页面
          const memberstore = useMemberStore()
          memberstore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          //其他错误，根据后端返回的数据轻提示
          uni.showToast({
            title: (res.data as Data<T>).msg || '请求错误',
            icon: 'none',
          })
        }
      },
      //响应失败
      fail(res) {
        uni.showToast({
          title: '网络错误，换个网络试试',
          icon: 'none',
        })
      },
    })
  })
}
