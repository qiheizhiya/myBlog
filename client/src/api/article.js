import axios from '../utils/request.js'

// 新增一篇文章
export const add = data => axios.post('/api/article/addArticle', data)

// 获取文章列表
export const list = data => axios.post('/api/article/getArtList', data)

// 获取文章详情
export const detail = (id, userId) => axios.get('/api/article/getArtDetail', { params: { id, userId } })

// 喜欢这篇文章
export const setLike = data => axios.post('/api/article/likeArt', data)