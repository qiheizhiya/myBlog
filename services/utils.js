/**
 * 限制评论 
 * @param {*} num ${time}分钟内最多允许发多少条
 * @param {*} duration 分钟
 */
exports.limitComment = function (ctx, num, duration) {
    const session = ctx.session
    if (!session.commentLen) session.commentLen = []
    const now = Date.now()
    duration = duration * 1000 * 60
    session.commentLen.push(now)
    session.commentLen = session.commentLen.filter(time => now - time < duration)
    console.log(session.commentLen, num)
    return session.commentLen.length <= num
}

// 得到最大小跟最小值之间的随机数
exports.getRandom = (min, max) => Math.floor(Math.random() * max + min)