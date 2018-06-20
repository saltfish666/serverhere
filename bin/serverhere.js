#!/usr/bin/env node
const http = require('http')
const path = require('path')

const argv = require('yargs').argv

const router = require('../lib/router')

const port = argv['p'] || argv['P'] || 3004

const server2 = http.createServer((req, res) => {
  let filePath = path.join(process.env.PWD, req.url)
  router(req, res, filePath)
})

server2.listen(port, () => {
  console.log(`listen at localhost:${port}`)
})