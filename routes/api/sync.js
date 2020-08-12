const user = require('./user')
const article = require('./article')
const articleWord = require('./articleWord')
const { code } = require('../captchaMiddleware')
const upload = require('./upload')
const Router = require('koa-router');
const router = new Router()

const routerArr = [
  { key: '/api/user', router: user },
  { key: '/api/article', router: article }, 
  { key: '/api/articleWord', router: articleWord},
  { key: '', router: code },
  { key: '', router: upload }
]

routerArr.forEach(r => {router.use(r.key, r.router.routes(), r.router.allowedMethods())})

module.exports = router
