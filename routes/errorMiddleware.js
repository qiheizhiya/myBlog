// 处理错误的中间件
module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.status = e.statusCode || e.status || 500
    ctx.body = e.message
  }
};