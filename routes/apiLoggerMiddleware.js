const { apiLogger } = require('../logger') 

// 处理错误的中间件
module.exports = async (ctx, next) => {
    try {
        await next();
    }
    finally {
        apiLogger.debug(`${ctx.method} ${ctx.path} ${JSON.stringify(ctx.body)}`)
    }

};