// 这是用来处理关系的
const Article = require('./tables/article')
const User = require('./tables/user')
const Classify = require('./tables/classify')

Article.belongsToMany(User, { through: 'like', foreignKey:'articleId' })
User.belongsToMany(Article, { through: 'like', foreignKey:'userId' })

Classify.hasMany(Article)
Article.belongsTo(Classify)