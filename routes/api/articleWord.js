const Router = require('koa-router')

const artWordServ = require('../../services/commentServ')

const { apiHandle } = require('../getSendMessage')

let articleWord = new Router()

articleWord.post('/addComment', async ctx => {
    const data = ctx.request.body
    const result = await artWordServ.addComment(data)
    apiHandle(ctx, result, '评论失败，刷新一下试试~~')
})

articleWord.post('/getArtComList', async ctx => {
    const { pageSize = 10, pageNum = 1 } = ctx.request.body
    const result = await artWordServ.getCommentList(pageNum, pageSize)
    apiHandle(ctx, result, '获取评论列表失败, 刷新一下试试~~')
})



module.exports = articleWord