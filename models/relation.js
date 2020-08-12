// 这是用来处理关系的
const Article = require('./tables/article')
const User = require('./tables/user')
const ArticleWord = require('./tables/articleWord')
const Classify = require('./tables/classify')

Article.belongsToMany(User, { through: 'like', foreignKey:'articleId' })
User.belongsToMany(Article, { through: 'like', foreignKey:'userId' })

Classify.hasMany(Article)
Article.belongsTo(Classify)

// 一篇文章可以有多个评论
Article.hasMany(ArticleWord, {
    foreignKey: 'articleId'
}) 
ArticleWord.belongsTo(Article, {
    foreignKey: 'articleId'
})

// 一个用户可以评论多篇文章
User.hasMany(ArticleWord, {
    foreignKey: 'userId'
})
ArticleWord.belongsTo(User, {
    foreignKey: 'userId'
})