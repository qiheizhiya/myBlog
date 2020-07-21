const Article = require('../models/tables/article')
const User = require('../models/tables/user')
// 增加文章
exports.addArticle = async function (artObj) {
  const ins = await Article.create(artObj)
  return ins.toJSON()
}
// 删除文章
exports.deleteArt = async function (id) {
  const result = await Article.findByPk(id)
  if (result) { // 只有查到了
    await result.destroy()
    return true
  } else {
    return false
  }
}
// 获取文章列表
exports.getArtList = async function (page = 1, limit = 10) {
  const result = await Article.findAndCountAll({
    limit: ( page - 1 ) * limit,
    offset: +limit
  })
  return {
    total: result.count,
    datas: JSON.parse(JSON.stringify(result.rows))
  }
}
/**
 * 获取文章详情
 * @param {*} id 文章Id
 * @param {*} userId 用户Id
 */
exports.getArtDetail = async function (id, userId) { 
  let result = await Article.findOne({
    where: {
      id
    },
    include: [{
      attributes: ['id'],
      model: User,
      required: false,
      through: {
        attributes: []
      },
      where: {
        id: userId
      }
    }]
  })
  if (!result) return result
  result = result.toJSON()
  result.Users.length === 0 ? result.isLike = false : result.isLike = true // 如果等于0就是不喜欢该文章
  return result
}

