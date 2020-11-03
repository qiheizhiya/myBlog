const Article = require('../models/tables/article')
const ArticleWord = require('../models/tables/articleWord')
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
exports.getArtList = async function (page = 1, limit = 10, isHome = false) {
  const result = await Article.findAndCountAll({
    offset: ( page - 1 ) * limit,
    limit: +limit,
    order: [
      ['createdAt', 'DESC']
    ],
    include: [
      {
        model: ArticleWord
      }
    ]
  })
  let { rows, count } = result
  let len = rows.length
  if (rows.length === 0 && !rows) return { total: 0, datas: [], len } // 如果没有文章
  rows.forEach(item => item.dataValues.index = page - 1)
  if (!isHome) { rows = listGroup(rows) }
  count = await Article.count()
  return {
    total: count,
    datas: rows,
    len
  }
}

// 把文章数据进行时间分组 
function listGroup (rows) {
  const yearMap = new Map()
  const yearArr = [] // 记录文章出现的年份
  const monthArr = ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
  const yearGroupArr = [] // 把文章按照年份分组
  rows.forEach(item => {
    const year = item.createdAt.split("-")[0]
    !yearMap.has(year) ? yearMap.set(year, year) : '' // 如果年份没出现过，记录起来
  })
  yearMap.forEach(item => yearArr.push(item)) // 把年份处理成数组

  yearArr.forEach(year => { // 把文章按年份分组 然后在按月份分组....其实就是按年份和月份降序排序
    const resultArr = rows.filter(item => {
      const [ rowYear, rowMonth, surplus ] = item.createdAt.split("-")
      let rowDay = surplus.split(" ")[0]
      rowDay[0] === '0' ? rowDay = rowDay.substr(1, 1) : ''
      if (rowYear === year) { 
        item.dataValues.year = year
      }
      item.dataValues.month = rowMonth
      item.dataValues.day = rowDay
      return rowYear === year
    })
    if (resultArr.length === 0) return
    monthArr.forEach(m => {
      const resultMonth = resultArr.filter(d => d.dataValues.month === m)
      resultMonth.length !== 0 && yearGroupArr.push(resultMonth)
    })
  })

  return yearGroupArr
}

/**
 * 获取文章详情
 * @param {*} id 文章Id
 * @param {*} userId 用户Id
 */
exports.getArtDetail = async function (id, userId, ctx) { 
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
  result.increment('visitsNum', {by: 1})
  result = result.toJSON()
  handlerData(result)
  return result
}
// 给数据增加字段
function handlerData (result) {
  result.users.length === 0 ? result.isLike = false : result.isLike = true // 如果等于0就是不喜欢该文章
  const len = result.content.replace(/<\/?.+?>/g, "").replace(/(\r\n|\n|\r)/gm, "").length
  result.textLen = len // 统计字数
  delete result.users
}

exports.likeArt = async function ({ articleId, userId }) {
  try {
    const artIns = await Article.findByPk(articleId)
    const userIns = await User.findByPk(userId)
    await artIns.addUser(userIns)
    await artIns.increment('likeNum')
    return true
  } catch (e) {
    return false
  }
}