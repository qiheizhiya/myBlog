const Router = require('koa-router')
const path = require("path")
const multer = require('koa-multer');
const { getResult } = require('../getSendMessage')
const fs = require('fs')
let OSS = require('ali-oss')

let client = new OSS({
    region: 'oss-cn-shenzhen',
    secure: true,
    accessKeyId: 'LTAI4GDzcetJ7bnf2fafPUVg',
    accessKeySecret: 'DfDNr6PzyeEB8fy9k95wqw6f5Y5sjq',
    bucket: 'qiheizhiya',
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../public', "upload"))
    },
    filename: (req, file, cb) => {
        // 时间戳-6位随机字符.文件后缀
        cb(null, `${Date.now()}-${Math.random().toString(36).slice(-6)}${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage });
let ossUpload = new Router()

ossUpload.post("/ossUpload", upload.single('file'), async ctx => {
    const filename = ctx.req.file.filename
    const url = await put(filename)
    ctx.body = getResult(url)
})


async function put(filename) {
    const localPath = path.resolve(__dirname, '../../public', `upload/${filename}`)
    try {
        let result = await client.put(`image/${filename}`, localPath);
        fs.unlink(localPath, () => {})
        return result.url
    } catch (err) {
        console.log(err);
    }
}
module.exports = ossUpload