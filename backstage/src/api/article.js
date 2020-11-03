import axios from '../utils/request.js'

// 新增一篇文章
export const add = data => axios.post('/api/article/addArticle', data)
