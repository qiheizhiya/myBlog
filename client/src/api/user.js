import axios from '../utils/request'

// 登陆
export const login = (account, password) => axios.post('/api/user/login',{account, password})

// 增加用户
export const addUser = (data) => axios.post('/api/user/addUser', data)

// 注册 按我的博客逻辑是需要验证码的修改用户信息。。。
export const registry = (data) => axios.post('/api/user/registry', data)

// 修改用户信息
export const updateUserInfo = data => axios.post('/api/user/updateUserInfo', data)

// 获取个人信息
export const whoami = () => axios.get('/api/user/whoami')

// 获取管理员的个人信息，必须在数据库里面id为 **1**
export const getAboutMe = () => axios.get('/api/user/getAboutMe')