require('./tables/user')
require('./tables/article')
require('./tables/articleWord')
require('./tables/classify')
require('./tables/myWord')
require('./relation') // 处理关闭
require('./sync') // 同步表
const sequelize = require('./tables/db');
(async () => {
  await sequelize.sync({force: true})
  console.log("同步完成")
})()