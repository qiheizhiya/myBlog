const { Sequelize } = require('sequelize');

const { localDbInfo, aliDbInfo: { dbName, userName, password, host } } = require('../../encrypt/dbEncrypt') // 引入数据库数据

const sequelize = new Sequelize( dbName, userName, password, host ); // 定义数据库对象

module.exports = sequelize