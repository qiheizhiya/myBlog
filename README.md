# <center>个人博客系统</center>

## 前言
> 代码质量问题轻点喷(去年才学的前端),有啥建议欢迎联系我,联系方式见最下方,感谢！
>
> 页面有啥bug也可以反馈给我，感谢！
这是一套包含前后端代码的个人博客系统，欢迎各位提出建议，本来打算用nuxt来书写，但是想学了react之后用next来写，后面会用reactSSR来重构！

博客该有的功能都有，可以写文章，可以评论，可以留言，甚至可以玩游戏(虽然还没完善),等等让你来发现。

这是一个小型的全栈项目，主要是检验并记录一下自己的学习成果

运用的技术Vue、Vue-Cli、Element-Ui、后端NodeJs、数据库MySql等各种技术

不要白嫖，求个star

### 前台页面
- 页面设计 借鉴开源项目**白茶**
  
**支持PC端和移动端，响应式页面，更多页面戏节让你去发掘**

1. 主页

2. 文章列表

3. 听雨

4. Demo

5. 关于我

6. 留言板

页面详情看[这里](http://www.llongjie.top)
### 后台页面
1. 主页
2. 发布文章
3. 关于我
4. 评论列表
5. 设置
   
其他的例如文章列表等我后面会别补上，**主要是想让你们研究透代码，自己去写,因为真的很简单(手动狗头)**

页面详情看[这里](http://www.llongjie.top/pc
)
### 后端相关
1. 数据库操作使用 [sequelize](https://github.com/demopark/sequelize-docs-Zh-CN)
2. 后端框架使用 [koa](https://www.w3cways.com/doc/koa/)
   
> 数据库表结构
>
**这个博客里本来打算实现文章分类功能，后面感觉不需要，就没用到这个表了**
1. 用户表 ID 用户名 用户账号 用户密码 生日  头像  创建时间    
2. 文章表 ID 用户ID 文章标题 文章图片 文章music 文章内容 分类ID(外键) 文章摘要 发布时间  浏览人数 喜欢人数 评论数(通过文章留言板去查) 分类ID  
3. 文章留言表  ID 留言文章ID 留言用户ID  留言内容 留言时间
4. 分类表 ID 分类名称 
5. 留言表 ID 留言用户ID 留言内容
6. 用户是否喜欢文章表 ID 用户ID 文章ID (通过多对多关系生产)

> 表关系
1. 一个分类有多个文章(一对多)
2. 一篇文章可以有多个评论(一对多)
3. 一个用户可以评论多篇文章（一对多）
4. 一个用户可以留言多次(一对多)
5. 一篇文章可以被多个用户喜欢，一个用户可以喜欢多个文章(多对多)
   
### 代码目录介绍及运行介绍
后端代码采用三层架构模式
> models 是表现层
> 
> services 是业务逻辑层
> 
> routes 是数据访问层
>
1.  **backstage** 是后台管理系统
2.  **client** 是前端

**拉取代码后先在根目录和client文件夹里面和backstage都执行 npm install安装依赖**
**之后首先要在跟目录创建public和encrypt文件夹**
**public文件夹里面要创建upload文件夹，上传文件需要，打包前端代码也是打包到这个目录**
**encrypt里面要创建dbEncrypt.js和ossEncrypt.js** 
``` 
可随时在models/tables/db.js里面切换
本地开发就用localDbInfo里面的，注意要在db.js切换
dbEncrypt.js
    module.exports = {
    localDbInfo: {
        dbName: 'XXX', // 数据库名称
        userName: 'XXX', // 数据库用户名
        password: 'XXX', // 数据库密码
        host: {
            host: 'localhost',
            dialect: 'mysql'
        }
    },
    aliDbInfo: { // 服务器上的数据库信息,同上
        dbName: 'XXX',
        userName: 'XXX',
        password: 'XXX',
        host: {
            host: 'XXX',
            dialect: 'mysql'
        }
    }
}
```
```
如果没有服务器，本地开发的话就不需要这个了
我写了两个上传文件的接口，/upload和/ossUpload，没有服务器就切换成/upload就行了
ossEncrypt.js
    module.exports = {
        region: 'XXX', // OSS region
        accessKeyId: 'XXXXXX', OSS accessKeyId
        accessKeySecret: 'XXXXXX', OSS accessKeySecret
        bucket: 'XXXX', // OSS bucket名
    }
```

接下来就可以愉快的玩耍了

**确保数据库信息填写正确之后 在根目录输入在 npm sync 同步数据库，提示同步完成即可**
**然后输入npm start 开启服务，这样本地服务就跑起来了**
**接下来就跟平时开发一样跑前端就行了，进入client或者backstage 输入 npm run dev 进入开发模式**

### 部署
后面补上O(∩_∩)O

### 最后
分享自己的一个全栈简单项目给大家，有什么建议/bug/优化可以提一下，感谢！！。

如果看到这里，就请帮忙点个star吧！！

喜欢技术的也可以加我，一起进步。

邮箱: 953136447@qq.com

微信号：qwer880620

开源不易，需鼓励，可以的话请不要白嫖(手动狗头)

![1](https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/zhifubaoerweima.jpg)
