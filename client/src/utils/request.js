// 发送请求的时候，如果有token，需要附带在请求头中
// 响应的时候，如果有token，保存到本地
// 响应的时候，如果响应的消息码是403( 没有token，token失效),在本地删除token
import axios from 'axios'
import { Message } from "element-ui"

const baseURL = process.env.VUE_APP_URL

const ins = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true
})

ins.interceptors.request.use(req => {
  const token = localStorage.getItem("token")
  if (token) {
    req.headers['authorization'] = "bearer " + token
  }
  return req
},err => {
  return Promise.reject(err)
})

ins.interceptors.response.use(resp => {
  // if (resp.headers.authorization) {
  //   localStorage.setItem("token", resp.headers.authorization)
  // }
  const data = resp.data
  if (data.code !== 200 ) {
    Message({
      type: 'error',
      message: data.msg,
      offset: 60
    })
    return Promise.reject(data)
  }
  return resp
}, err => {
  if (err.response.status === 403) {
    localStorage.removeItem("token")
    localStorage.removeItem('userInfo')
    Message({
      type: 'error',
      message: '登陆已过期,请重新登陆',
      offset: 60
    })
  }
  return Promise.reject(err)
})

export default ins