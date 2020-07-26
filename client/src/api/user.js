import axios from '../utils/request'

export async function login (account, password) {
  return await axios.post('/api/user/login',{account, password})
}

export async function addUser (data) {
  return await axios.post('/api/user/addUser', data)
}
export async function registry (data) {
  return await axios.post('/api/user/registry', data)
}

export async function whoami () {
  return await axios.get('/api/user/whoami')
}