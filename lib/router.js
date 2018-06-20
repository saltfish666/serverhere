const fs = require('fs')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

module.exports = async (req, res, filePath) => {
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
}
