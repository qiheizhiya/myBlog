const sequelize = require('./db')
const { DataTypes } = require("sequelize")
const moment = require("moment")
const User = sequelize.define('user', {
  userName: {
    type: DataTypes.STRING
  },
  account: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  aboutMe: {
    type: DataTypes.TEXT
  },
  birthday: {
    type: DataTypes.DATE,
    get(){
      if (this.getDataValue('birthday')) { return moment(this.getDataValue('birthday')).format('YYYY-MM-DD HH:mm:ss') } else return ''
    }
  },
  avatar: {
    type: DataTypes.STRING
  },
  motto: {
    type: DataTypes.STRING
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
  paranoid: true, // 从此以后，该表的数据不会真正的删除，而是增加一列deleteAt，记录删除时间
  updatedAt: false // 不要修改时间
})
module.exports = User