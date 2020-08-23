const Router = require('koa-router')

const artServ = require('../../services/articleServ')
const { apiHandle } = require('../getSendMessage')

let article = new Router()

article.post('/getArtList', async ctx => {
  const { pageSize = 10, pageNum = 1, isHome = false } = ctx.request.body
  const result = await artServ.getArtList(pageNum, pageSize, isHome)
  apiHandle(ctx, result, '获取文章列表失败, 刷新一下试试~~')
})

article.get('/getArtDetail', async ctx => {
  const { id, userId } = ctx.query
  const result = await artServ.getArtDetail(id, userId, ctx)
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

article.post('/likeArt', async ctx => {
  const data = ctx.request.body
  const result = await artServ.likeArt(data)
  apiHandle(ctx, result, '喜欢文章失败，刷新一下试试~~')
})

module.exports = article
