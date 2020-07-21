const User = require('../models/tables/user')
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
      exclude: ['deletedAt', ]
    }
  })
  if (result && result.account === account && result.password === password) {
    const val = result.toJSON()
    delete val.password
    return val
  }
  return null
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