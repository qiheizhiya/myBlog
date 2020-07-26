
const KoaSession = require('koa-session')
const seessionKey = ['longjie']
const sessionConfig =  {
  key: 'Koa:sess', // key值 默认是Koa:sess
  maxAge: 1000 * 60 * 5, // 已毫秒为计算
  autoCommit: true, //是否自动提交到响应头 默认是true
  overwrite: true, //是否允许重写。默认是true
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (默认为 true) 可以防止XSS攻击
  signed: true,   //签名默认true
  rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false, //是否在session快过期时刷新session有效期
}
exports.KoaSession = KoaSession
exports.sessionConfig = sessionConfig
exports.sessionKey = seessionKey