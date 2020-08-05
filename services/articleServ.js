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
  if (rows.length === 0 && !rows) return { total: 0, datas: [] } // 如果没有文章
  const groupArr = listGroup(rows)
  return {
    total: count,
    datas: groupArr
  }
}

// 把文章数据进行时间分组 
function listGroup (rows) {
  const yearMap = new Map()
  const yearArr = [] // 记录文章出现的年份
  const yearGroupArr = [] // 把文章按照年份分组
  rows.forEach(item => {
    const year = item.createdAt.split("-")[0]
    !yearMap.has(year) ? yearMap.set(year, year) : '' // 如果年份没出现过，记录起来
  })
  yearMap.forEach(item => yearArr.push(item)) // 把年份处理成数组

  yearArr.forEach(year => { // 把文章按年份分组
    const resultArr = rows.filter(item => {
      const [ rowYear, rowMonth ] = item.createdAt.split("-")
      if (rowYear === year) { 
        item.dataValues.year = year
      }
      item.dataValues.month = rowMonth
      return rowYear === year
    })
    if (resultArr.length === 0) return
    yearGroupArr.push(resultArr)
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
  addVisits(ctx, result) 
  result = result.toJSON()
  handlerData(result)
  return result
}

/**
 * 5分钟内不会增加浏览数
 * @param {*} ctx 
 */
function addVisits (ctx, result) {
  if (!ctx.session.isVisits) { // 如果5分钟内浏览过了，不在增加浏览数
    result.increment('visitsNum', {by: 1})
    ctx.session.isVisits = true
  }
}
function handlerData (result) {
  result.Users.length === 0 ? result.isLike = false : result.isLike = true // 如果等于0就是不喜欢该文章
  const len = result.content.replace(/<\/?.+?>/g, "").replace(/(\r\n|\n|\r)/gm, "").length
  result.textLen = len // 统计字数
  delete result.Users
}
