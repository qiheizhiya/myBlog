const { getErr } = require("./getSendMessage");
const { pathToRegexp } = require("path-to-regexp");
const jwt = require('./jwt')
const needTokenApi = [
  { method: "POST", path: "/api/article/addArticle" },
  { method: "GET", path: "/api/user/whoami" },
  { method: "GET", path: "/api/user/getHomeInfo" },
  { method: "POST", path: "/ossUpload" },
  { method: "POST", path: "/upload" }
];
module.exports = async (ctx, next) => {
  const apis = needTokenApi.filter(api => {
    const reg = pathToRegexp(api.path)
    return api.method === ctx.method && reg.test(ctx.path)
  })
  if (apis.length === 0) {
    await next()
    return
  }
  const result = jwt.verify(ctx)
  const isPass = result && (result.id === 1 || ctx.path === '/api/user/whoami' || ctx.path === '/api/user/getHomeInfo')
  if (isPass) {
    ctx.request.userId = result.id
    await next()
  } else {
    handleNonToken(ctx)
  }
}
//处理没有认证的情况
function handleNonToken(ctx) {
  ctx.status = 403
  ctx.body = getErr('您还没有登陆', 403)
}