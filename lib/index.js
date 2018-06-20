const http = require('http')
const path = require('path')

const argv = require('yargs').argv

const router = require('./router')

const port = argv['p'] || argv['P'] || 3004

const server2 = http.createServer((req, res) => {
  let filePath = path.join(process.env.PWD, req.url)
  router(req, res, filePath)
})

server2.listen(port, () => {
  console.log(`listen at localhost:${port}`)
})

/*
虽然浏览器敲不出来这个
http://localhost:3003/../nc666/package.json
但是还有泄露文件的危险，path.join(process.env.PWD,req.url) 可能导致文件泄露
*/
