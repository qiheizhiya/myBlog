## 后端相关
1. 数据库操作使用 [sequelize](https://github.com/demopark/sequelize-docs-Zh-CN)
2. 后端框架使用 [koa](https://www.w3cways.com/doc/koa/)


## 代码目录介绍及运行介绍
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
