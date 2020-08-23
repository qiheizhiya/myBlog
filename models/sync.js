require('./tables/user')
require('./tables/article')
require('./tables/articleWord')
require('./tables/classify')
require('./tables/myWord')
require('./relation') // 关系
require('./sync') // 同步表
const sequelize = require('./tables/db');
(async () => {
  await sequelize.sync({force: true}) // 清空数据库同步
  // await sequelize.sync({alter: true}) // 只查看修改的地方并进行同步
  console.log("同步完成")
})()