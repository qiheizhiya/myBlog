// 这是用来处理关系的
const Article = require('./tables/article')
const User = require('./tables/user')
const ArticleWord = require('./tables/articleWord')
const MyWord = require('./tables/myWord')
const Classify = require('./tables/classify')

Article.belongsToMany(User, { through: 'like', foreignKey:'articleId' })
User.belongsToMany(Article, { through: 'like', foreignKey:'userId' })

Classify.hasMany(Article, {
    foreignKey: 'classifyId'
})
Article.belongsTo(Classify)

// 一篇文章可以有多个评论
Article.hasMany(ArticleWord, {
    foreignKey: 'articleId'
}) 
ArticleWord.belongsTo(Article)

// 一个用户可以评论多篇文章
User.hasMany(ArticleWord, {
    foreignKey: 'userId'
})
ArticleWord.belongsTo(User)

// 一个用户可以留言多次
User.hasMany(MyWord, {
    foreignKey: 'userId'
})
MyWord.belongsTo(User)