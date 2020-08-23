import axios from '../utils/request.js'

// 新增评论
export const add = data => axios.post('/api/myWord/addmyCom', data)

// 获取评论列表
export const list = data => axios.post('/api/myWord/getMyComList', data)