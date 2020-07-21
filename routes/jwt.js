const secrect = "longjie"
const jwt = require("jsonwebtoken")

// 颁发jwt
exports.publish = function (ctx, maxAge = 3600 * 24 * 7, info = {}) {
  const token = jwt.sign(info, secrect, {
    expiresIn: maxAge
  })
  ctx.response.set('authorization', token)
}
// 验证
exports.verify = function (ctx) {
  let token = ctx.request.get('authorization')
  if (!token) return
  token = token.split(" ")
  token = token.length === 1 ? token[0] : token[1]
  try {
    const result = jwt.verify(token, secrect)
    return result
  } catch (e) {
    return
  }
}