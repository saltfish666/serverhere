const http = require('http')
const path = require('path')
const fs = require('fs')

const argv = require('yargs').argv

if (!argv['p'] && !argv['P']) {
  throw new Error('you should point a port for server!')
}
const port = argv['p'] || argv['P']

const server2 = http.createServer((req, res) => {
  console.log(req)
  let filePath = path.join(process.env.PWD, req.url)
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      res.end('file not exit')
    }
    res.end(data)
  })
  console.log(res)
})

server2.listen(port, () => {
  console.log(`listen at localhost:${port}`)
})

/*
虽然浏览器敲不出来这个
http://localhost:3003/nc666/package.json
但是还有泄露文件的危险，path.join(process.env.PWD,req.url) 可能导致文件泄露
*/
