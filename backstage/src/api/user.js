import axios from '../utils/request.js'

export async function login (account, password) {
  return await axios.post('/api/user/login',{account, password})
}

export async function whoami () {
  return await axios.get('/api/user/whoami')
}

export async function updateUserInfo (data) {
  return await axios.post('/api/user/updateUserInfo', data)
}

// 获取首页信息
export const getHomeInfo = () => axios.get('/api/user/getHomeInfo')