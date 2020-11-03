const myWord = require('../models/tables/myWord')
const User = require('../models/tables/user')
const { limitComment } = require('./utils')

exports.addMyComment = async function (commentInfo, ctx) {
    const isAllow = limitComment(ctx, 29, 2) // 2分钟内不能超过两条 
    if (isAllow) {
        const ins = await myWord.create(commentInfo)
        return ins.toJSON()
    } else {
        return 
    }
}

exports.getMyCommentList = async function (page = 1, limit = 10) {
    const result = await myWord.findAndCountAll({
        offset: (page - 1) * limit,
        limit: +limit,
        order: [
            ['createdAt', 'DESC']
        ],
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
    rows.forEach(item => item.dataValues.index = page - 1)
    return {
        total: count,
        datas: rows,
        len
    }
}

// 删除文章
exports.deleteWord = async function (id) {
    const result = await myWord.findByPk(id)
    if (result) { // 只有查到了
        await result.destroy()
        return true
    } else {
        return false
    }
}