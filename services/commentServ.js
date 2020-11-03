const User = require('../models/tables/user')
const Article = require('../models/tables/article')
const ArticleWord = require('../models/tables/articleWord')
const { limitComment } = require('./utils')

exports.addComment = async function (commentInfo, ctx) {
    console.log(commentInfo)
    const isAllow = limitComment(ctx, 2, 2) // 2分钟内不能超过两条 
    if (isAllow) {
        const ins = await ArticleWord.create(commentInfo)
        return ins.toJSON()
    } else {
        return 
    }
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
    let len = rows.length
    if (rows.length === 0 && !rows) return { total: 0, datas: [], len } // 如果没有文章
    const datas = handleCommentList(rows)
    return {
        total: count,
        datas,
        len
    }
}


function handleCommentList (datas) {
    const listArr = datas.map(row => {
        row.dataValues.children = datas.filter(item => row.id === item.floorId)
        return row
    }) // 把楼层和子楼层分组
    return listArr.filter(item => !item.floorId)
}