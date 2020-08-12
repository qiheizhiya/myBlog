const sequelize = require('../models/tables/db')
const User = require('../models/tables/user')
const Article = require('../models/tables/article')
const ArticleWord = require('../models/tables/articleWord')

exports.addComment = async function (commentInfo) {
    const ins = await ArticleWord.create(commentInfo)
    return ins.toJSON()
}
exports.getCommentList = async function (page = 1, limit = 10) {
    const result = await ArticleWord.findAndCountAll({
        offset: (page - 1) * limit,
        limit: +limit,
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'avatar'],
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