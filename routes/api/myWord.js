const Router = require('koa-router')

const myCommServ = require('../../services/myCommServ')

const { apiHandle } = require('../getSendMessage')

let myWord = new Router()

myWord.post('/addmyCom', async ctx => {
    const data = ctx.request.body
    const result = await myCommServ.addMyComment(data, ctx)
    apiHandle(ctx, result, '不能刷屏哦，过几分钟在试试~')
})

myWord.post('/getMyComList', async ctx => {
    const { pageSize = 10, pageNum = 1 } = ctx.request.body
    const result = await myCommServ.getMyCommentList(pageNum, pageSize)
    apiHandle(ctx, result, '获取留言列表失败, 刷新一下试试~~')
})

module.exports = myWord