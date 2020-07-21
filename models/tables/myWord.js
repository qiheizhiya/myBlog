const sequelize = require('./db')
const { DataTypes } = require("sequelize")
const moment = require("moment")
const MyWord = sequelize.define('MyWord', {
  userId: { // 留言用户ID
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    get(){
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  updateAt: {
    type: DataTypes.DATE,
    get(){
      return moment(this.getDataValue('updateAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  }
},
{
  freezeTableName: true // 固定表名字
})
module.exports = MyWord