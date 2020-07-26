const svgCaptcha = require('svg-captcha');
const Router = require('koa-router')
const { getErr } = require('./getSendMessage')
let code = new Router()

code.get('/captcha', async ctx => {
  const captcha = svgCaptcha.createMathExpr({
    width: 100,
    height: 50,
    ignoreChars: '0oO1ilI', // 排除 0oO1ilI
    noise: 2, // 干扰线条数量
    color: true // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
  })
  ctx.session.captcha = captcha.text.toLocaleLowerCase()
  ctx.set('Content-Type', 'image/svg+xml')
  ctx.body = captcha.data
})

exports.captchaHandler = async (ctx, next) => {
  if (ctx.request.url !== '/captcha') {
    await next()
    return
  }
  if (!ctx.session.records) {
    ctx.session.records = []
  }
  const now = Date.now()
  ctx.session.records.push(now)

  // 如果在一小段时间中请求达到了一定的数量，就可能是机器
  const duration = 10000;
  const repeat = 3;
  ctx.session.records = ctx.session.records.filter(time => now - time < duration) // 如果10s内请求大于3次
  if (ctx.session.records.length >= repeat || 'captcha' in ctx.request.body) { // 就要出现验证码
    validateCaptcha(ctx, next)
  } else {
    await next()
  }
}

async function validateCaptcha (ctx, next) {
  const reqCaptcha = ctx.request.body.captcha ? ctx.request.body.captcha.toLocaleLowerCase() : '' // 如果用户传了验证码
  if (reqCaptcha !== ctx.session.captcha) { // 验证码不对
    ctx.status = 401
    // ctx.body = getErr('验证码有问题', 401)
    await next()
  } else {
    await next()
  }
}


exports.code = code