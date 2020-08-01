const Router = require('koa-router');
const User = require('../../services/userServ')
const { apiHandle } = require('../getSendMessage')
const jwt = require('../jwt');
let user = new Router()

user.post('/addUser', async ctx => {
  const bodyData = ctx.request.body
  const result = await User.addUser(bodyData)
  apiHandle(ctx, result, '该账号已被使用,请换个账号')
})

user.post('/login', async ctx => {
  const { account, password } = ctx.request.body
  const result = await User.login(account, password)
  apiHandle(ctx, result, '账号不存在, 请先注册账号', ( {id} ) => {
    jwt.publish(ctx, undefined, { id })
  })
})

user.post('/registry', async ctx => {
  const bodyData = ctx.request.body
  if (bodyData.captcha !== ctx.session.captcha) {
    apiHandle(ctx, '', '验证码错误')
    return
  }
  const token = jwt.verify(ctx)
  if (token){
    const result = await User.registry(token.id, bodyData)
    apiHandle(ctx, result, '该账号已被使用,请换个账号')
  } 
})

user.get("/whoami", async ctx => {
  const result = await User.getSelf(ctx.request.userId)
  apiHandle(ctx, result, '')
})

user.get("/getHomeInfo", async ctx => {
  const result = await User.getHomeInfo(ctx.request.userId)
  apiHandle(ctx, result, '')
})

module.exports = user