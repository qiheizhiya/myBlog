import axios from '../utils/request'

// 登陆
export const login = (account, password) => axios.post('/api/user/login',{account, password})

// 增加用户
export const addUser = (data) => axios.post('/api/user/addUser', data)

// 注册
export const registry = (data) => axios.post('/api/user/registry', data)

// 获取个人信息
export const whoami = () => axios.get('/api/user/whoami')

