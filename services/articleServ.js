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
    offset: ( page - 1 ) * limit,
    limit: +limit,
    order: [
      ['createdAt', 'DESC']
    ]
  })
  const { rows, count } = result
  if (rows.length === 0 && !rows) return { total: 0, datas: [] }
  const dateArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].reverse()
  const monthArr = ['12月份', '11月份', '10月份', '9月份', '8月份', '7月份', '6月份', '5月份', '4月份', '3月份', '2月份' , '1月份']
  const groupArr = []
  dateArr.forEach((date, index) => {
    const resultArr = rows.filter(item => {
      if (item.createdAt.substr(5,2) === date) { 
        item.dataValues.month = monthArr[index]
      }
      return item.createdAt.substr(5,2) === date
    })
    if (resultArr.length === 0) return
    groupArr.push(resultArr)
  })
  return {
    total: count,
    datas: groupArr
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
  delete result.Users
  return result
}

