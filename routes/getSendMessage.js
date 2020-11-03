exports.getErr = function (err = '服务器出错', errCode = 500) {
  return {
    code: errCode,
    msg: err
  }
}
exports.getResult = function (data) {
  return {
    code: 200,
    msg: '成功',
    data
  }
}
/**
 * 
 * @param {*} ctx koa返回的对象
 * @param {*} result 返回的结果
 * @param {*} err 错误消息
 * @param {*} cb 回调
 */
exports.apiHandle = function (ctx, result, err, cb) {
  if (!result) {
    ctx.body = exports.getErr(err, 401)
  } else {
    ctx.body = exports.getResult(result)
    cb && cb(result)
  }
}