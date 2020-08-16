const sequelize = require('../models/tables/db')
const User = require('../models/tables/user')
const Article = require('../models/tables/article')
const ArticleWord = require('../models/tables/articleWord')

exports.addComment = async function (commentInfo, ctx) {
    const isAllow = limitComment(ctx, 2, 2) // 2分钟内不能超过两条 
    if (isAllow) {
        const ins = await ArticleWord.create(commentInfo)
        return ins.toJSON()
    } else {
        return 
    }
}

/**
 * 限制评论 
 * @param {*} num ${time}分钟内最多允许发多少条
 * @param {*} duration 分钟
 */
function limitComment (ctx, num, duration) {
    const session = ctx.session
    if (!session.commentLen) session.commentLen = []
    const now = Date.now()
    duration = duration * 1000 * 60
    session.commentLen.push(now)
    session.commentLen = session.commentLen.filter(time => now - time < duration)
    console.log(session.commentLen)
    return session.commentLen > num
}

exports.getCommentList = async function (page = 1, limit = 10, articleId) {
    const result = await ArticleWord.findAndCountAll({
        offset: (page - 1) * limit,
        limit: +limit,
        order: [
            ['createdAt', 'DESC']
        ],
        where: {
            articleId
        },
        include: [
            {
                model: User,
                attributes: ['userName', 'avatar', 'id'],
                required: false
            }
        ]
    })
    const { rows, count } = result
    if (rows.length === 0 && !rows) return { total: 0, datas: [] } // 如果没有文章
    const datas = handleCommentList(rows)
    return {
        total: count,
        datas
    }
}


function handleCommentList (datas) {
    const listArr = datas.map(row => {
        row.dataValues.children = datas.filter(item => row.id === item.floorId)
        return row
    }) // 把楼层和子楼层分组
    return listArr.filter(item => !item.floorId)
}