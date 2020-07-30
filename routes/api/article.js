const Router = require('koa-router')

const artServ = require('../../services/articleServ')
const { apiHandle } = require('../getSendMessage')

let article = new Router()

article.get('/getArtList', async ctx => {
  ctx.body = '获取文章列表'
})
article.post('/addArticle', async ctx => {
  try {
    const bodyData = ctx.request.body
    bodyData.userId = ctx.request.userId
    console.log(bodyData)
    const result = await artServ.addArticle(bodyData)
    apiHandle(ctx, result, '增加文章失败, 请重试')
  } catch (e) {
    console.log(e)
  }
  
})

module.exports = article
