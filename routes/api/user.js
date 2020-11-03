const Router = require('koa-router');
const User = require('../../services/userServ')
const { apiHandle } = require('../getSendMessage')
const jwt = require('../jwt');
let user = new Router()

// 增加一个用户
user.post('/addUser', async ctx => {
  const bodyData = ctx.request.body
  const result = await User.addUser(bodyData)
  apiHandle(ctx, result, '该账号已被使用,请换个账号')
})

// 登录
user.post('/login', async ctx => {
  const { account, password } = ctx.request.body
  const result = await User.login(account, password)
  apiHandle(ctx, result, '账号不存在, 请先注册账号', ( {id} ) => {
    jwt.publish(ctx, undefined, { id })
  })
})

// 按我博客逻辑来说这个注册是修改用户信息
user.post('/registry', async ctx => {
  const bodyData = ctx.request.body 
  if (bodyData.captcha !== ctx.session.captcha) {
    apiHandle(ctx, '', '验证码错误')
    return
  }
  const result = await User.registry(bodyData)
  apiHandle(ctx, result, '该账号已被使用,请换个账号')
})

// 不需要验证码的修改用户信息
user.post('/updateUserInfo', async ctx => {
  const bodyData = ctx.request.body
  const result = await User.updateUserInfo(bodyData)
  apiHandle(ctx, result, '失败了...请重试呜呜')
})

// 获取登录的用户个人信息
user.get("/whoami", async ctx => {
  const result = await User.getSelf(ctx.request.userId)
  apiHandle(ctx, result, '')
})

// 获取后台系统首页信息
user.get("/getHomeInfo", async ctx => {
  const result = await User.getHomeInfo(ctx.request.userId)
  apiHandle(ctx, result, '还没有文章呢，赶紧去发一篇文章吧..')
})

user.get("/getAboutMe", async ctx => {
  const result = await User.getAboutMe(1)
  apiHandle(ctx, result, '获取个人信息失败...请重试呜呜')
})

module.exports = user