import axios from '../utils/request.js'

export async function add (data) {
  return await axios.post('/api/article/addArticle', data)
}