import axios from '../utils/request.js'

export const list = data => axios.post('/api/myWord/getMyComList', data)

export const deleteWord = data => axios.post('/api/myWord/deleteCom', data)