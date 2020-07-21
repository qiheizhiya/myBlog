// 处理错误的中间件
module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    if (e.errorCode) {
      return ctx.body = error.msg
    }
  }
};