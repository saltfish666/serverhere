const http = require('http')
const path = require('path')
const fs = require('fs')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const argv = require('yargs').argv

const port = argv['p'] || argv['P'] || 3004

const server2 = http.createServer(async (req, res) => {
  let filePath = path.join(process.env.PWD, req.url)
  let stats
  try {
    stats = await stat(filePath)
  } catch (e) {
    res.statusCode = 404
    res.end(`${filePath} is not directory or path`)
  }
  if (stats.isFile()) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain;charset=UTF-8')
    fs.createReadStream(filePath).pipe(res)
  } else if (stats.isDirectory()) {
    let files
    try {
      files = await readdir(filePath)
    } catch (e) {
      res.statusCode = 404
      res.end(e.message)
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain;charset=UTF-8')
    res.end(files.join(','))
  }
})

server2.listen(port, () => {
  console.log(`listen at localhost:${port}`)
})

/*
虽然浏览器敲不出来这个
http://localhost:3003/nc666/package.json
但是还有泄露文件的危险，path.join(process.env.PWD,req.url) 可能导致文件泄露
*/
