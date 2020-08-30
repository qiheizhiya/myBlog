// 发送请求的时候，如果有token，需要附带在请求头中
// 响应的时候，如果响应的消息码是403( 没有token，token失效),在本地删除token
import axios from 'axios'
import { Message } from "element-ui"

let baseURL = ''
process.env.NODE_ENV === 'production' ? baseURL = 'http://www.llongjie.top:5008' : baseURL = 'http://localhost:5008'

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
    Message.error(data.msg)
    return Promise.reject(data)
  }
  return resp
}, err => {
  if (err.response.status === 403) {
    localStorage.removeItem("token")
    Message.error('登陆已过期,请重新登陆')
  }
  return Promise.reject(err)
})

export default ins