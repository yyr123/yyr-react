// axios 封装

import axios from 'axios'
import { message } from 'antd'

// 获取缓存中的token
const token = localStorage.getItem('token')

const http = axios.create({
    timeout: 5000, // 超时时间
})

// 设置post请求头
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 添加请求拦截器 就是在家口加入token校验
http.interceptors.request.user(
    config => {
        // 将token添加到请求头
        // 一般可以指定token的形式
        // config.headers["Authorization"] = 'bearer ' + window.localStorage.getItem("Authorization"); // 请求头带上token

        token && (config.headers.Authorization = token)
        return config
    },
    error => {
        // 抛出错误
        return Promise.reject(error)
    }
)

// 添加响应拦截器 就是把后端的异常报错抛出来
http.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.resolve(response)
        }
    },
    
    error => {
        // 相应的错误处理
        // 比如 token过期，无权访问， 路径不存在，服务器问题等
        switch (error.response.status) {
            case 401:
                message.error('这里是401')
                break
            case 403:
                break
            case 500:
                break
            default:
                console.log('其他错误的信息')
        }
        return Promise.reject(error)
    }
)

export default http