const Koa = require('koa')
const path = require("path")

const staticMid = require('koa-static') // 静态资源中间件
const staticPath = path.resolve(__dirname, '../public')  // 静态资源目录
const cors = require('@koa/cors')
const { KoaSession, sessionConfig, sessionKey } = require('./sessionConfig') // 引入session相关配置
const bodyParserMid = require('koa-bodyparser') // 解析body中间件

const router = require('./api/sync') // 引入总路由

const app = new Koa() // 创建一个koa实例
const port = 5008 // 端口

app.use(require('./errorMiddleware')) // 错误处理中间件

app.use(require('./apiLoggerMiddleware')) // API请求日志

app.use(cors({
  credentials: true // 服务端下发到客户端的 response 中头部字段，意义是允许客户端携带验证信息
}));

// 引入session
const session = KoaSession(sessionConfig, app)
app.keys = sessionKey
app.use(session)
// 引入session

app.use(require("./tokenMiddleware")); // 应用token中间件
app.use(staticMid(staticPath)) // 引入静态资源中间件
app.use(bodyParserMid()) // 引入解析body的中间件

// app.use(require("./captchaMiddleware").captchaHandler)
app.use(router.routes()).use(router.allowedMethods())

app.listen(port, () => {
  console.log(`开始监听${port}端口`)
})