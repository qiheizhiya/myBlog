const Koa = require('koa')
const path = require("path")

const staticMid = require('koa-static') // 静态资源中间件
const staticPath = path.resolve(__dirname, '../public') 

const bodyParserMid = require('koa-bodyparser') // 解析body中间件

const router = require('./api/sync') // 引入总路由

const app = new Koa()
const port = 5008

app.use(require('./errorMiddleware')) // 错误处理中间件
app.use(staticMid(staticPath)) // 引入静态资源中间件
app.use(bodyParserMid()) // 引入解析body的中间件
app.use(require("./tokenMiddleware")); // 应用token中间件

app.use(router.routes()).use(router.allowedMethods())

app.listen(port, () => {
  console.log(`开始监听${port}端口`)
})