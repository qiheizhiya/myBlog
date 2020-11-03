const Router = require('koa-router')
const multer = require('koa-multer');
const path = require("path")
const { getResult } = require('../getSendMessage')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,  path.resolve(__dirname, '../../public', "upload"))
  },
  filename: (req, file, cb) => {
    // 时间戳-6位随机字符.文件后缀
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(-6)}${path.extname(file.originalname)}` )
  }
})
const upload = multer({ storage });
let fileHandle = new Router()

fileHandle.post("/upload", upload.single('file'), async ctx => {
  const url = `/upload/${ctx.req.file.filename}`
  ctx.body = getResult(url)
})

module.exports = fileHandle