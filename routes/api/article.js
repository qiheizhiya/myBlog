const Router = require('koa-router')

let article = new Router()

article.get('/getArtList', async ctx => {
  ctx.body = '获取文章列表'
})

module.exports = article
