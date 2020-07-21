const user = require('./user')
const article = require('./article')

const Router = require('koa-router');
const router = new Router()

const routerArr = [
  {
    key: '/api/user',
    router: user
  },
  {
    key: '/api/article',
    router: article
  }, 
]

routerArr.forEach(r => {router.use(r.key, r.router.routes(), r.router.allowedMethods())})

module.exports = router
