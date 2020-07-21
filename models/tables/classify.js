const sequelize = require('./db')
const { DataTypes } = require("sequelize")
const moment = require("moment")
const Classify = sequelize.define('Classify', {
  name: { // 留言用户ID
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    get(){
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  }
},
{
  freezeTableName: true, // 固定表名字
  updatedAt: false
})
module.exports = Classify