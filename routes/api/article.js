const Router = require('koa-router')

const artServ = require('../../services/articleServ')
const { apiHandle } = require('../getSendMessage')

let article = new Router()

article.post('/getArtList', async ctx => {
  const { pageSize = 10, pageNum = 1 } = ctx.request.body
  const result = await artServ.getArtList(pageNum, pageSize)
  apiHandle(ctx, result, '获取文章列表失败, 刷新一下试试~~')
})

article.get('/getArtDetail', async ctx => {
  const { id } = ctx.query
  const userId = ctx.request.userId
  const result = await artServ.getArtDetail(id, userId)
  apiHandle(ctx, result, '获取文章详情, 刷新一下试试~~')
})

article.post('/addArticle', async ctx => {
  try {
    const bodyData = ctx.request.body
    bodyData.userId = ctx.request.userId
    const result = await artServ.addArticle(bodyData)
    apiHandle(ctx, result, '增加文章失败, 刷新一下试试~~')
  } catch (e) {
    console.log(e)
  }
})


module.exports = article
