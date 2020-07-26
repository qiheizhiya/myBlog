import axios from '../utils/request.js'

export async function login (account, password) {
  return await axios.post('/api/user/login',{account, password})
}

export async function whoami () {
  return await axios.get('/api/user/whoami')
}