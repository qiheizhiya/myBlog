const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('blog', 'root', '123321sss', {
  host: 'localhost',
  dialect: 'mysql'
});
module.exports = sequelize