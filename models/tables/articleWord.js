const sequelize = require('./db')
const { DataTypes } = require("sequelize")
const moment = require("moment")
const ArticleWord = sequelize.define('ArticleWord', {
  floorId: {
    type: DataTypes.INTEGER
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
  updatedAt: {
    type: DataTypes.DATE,
    get(){
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  }
},
{
  freezeTableName: true // 固定表名字
})
module.exports = ArticleWord