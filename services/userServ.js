const User = require('../models/tables/user')
const Article = require('../models/tables/article')
const MyWord = require('../models/tables/myWord')
const moment = require('moment')
const { getRandom } = require('./utils')

// 增加一个用户
exports.addUser = async function (adminObj) {
  const [result, created] = await User.findOrCreate({
    where: { account: adminObj.account },
    attributes: {
      exclude: ['password']
    },
    defaults: { ...adminObj }
  })
  // 如果已经被创建了
  if (!created) return
  const avatarSrc = `https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar${getRandom(1, 9)}.jpg`
  result.avatar = avatarSrc
  result.save()
  return result.toJSON()
}
// 用户登陆
exports.login = async function (account, password) {
  const result = await User.findOne({
    where: {
      account,
      password
    },
    attributes: {
      exclude: ['deletedAt']
    }
  })
  if (result && result.account === account && result.password === password) {
    const val = result.toJSON()
    delete val.password
    return val
  }
  return null
}
// 注册用户(按我的博客逻辑是 修改用户信息)
exports.registry = async function (data) {
  const result = await User.findByPk(data.id)
  if (!result) return // 没有这个ID
  if (result.account === data.account) return  // 账号已存在
  for (let key in data) {
    if (data[key]) {
      result[key] = data[key]
    }
  }
  await result.save()
  delete result.password
  delete result.deletedAt
  return result
}

exports.updateUserInfo = async function (data) {
  const result = await User.findByPk(data.id)
  if (!result) return // 没有这个ID
  for (let key in data) {
    if (data[key]) {
      result[key] = data[key]
    }
  }
  await result.save()
  delete result.password
  delete result.deletedAt
  return result
}

// 获取自己
exports.getSelf = async function (id) {
  const result = await User.findByPk(id)
  if (!result) return
  let val = result.toJSON()
  delete val.password
  delete val.deletedAt
  return val
}

exports.getHomeInfo = async function() {
  const result = await Article.findAndCountAll({
    attributes: ['createdAt'],
    order: [
      ['createdAt', 'DESC']
    ]
  })
  const { count, rows } = result
  if (rows.length === 0) return {articleCount: 0, articleDiff: 0}
  const x = new moment()
  const y = new moment(rows[0].createdAt)
  const articleDiff = x.diff(y, 'd')

  const wordCount = await MyWord.count()
  
  return {
    articleCount: count,
    articleDiff,
    wordCount
  }
}

// 获取指定的用户信息
exports.getAboutMe = async function (id) {
  const result = await User.findOne({
    where: { id: 1 },
    attributes: ['aboutMe']
  })
  return result.toJSON()
}
