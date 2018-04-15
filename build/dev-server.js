require('./check-versions')()
//var routes = require('../src/server/routers')
var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// serve vonic static assets
var vonicPath = path.posix.join(config.dev.assetsPublicPath, 'vonic')
app.use(vonicPath, express.static('./node_modules/vonic/dist'))


//推荐列表api
// var recommandList = require('../src/server/routers/recommandrouter')
// app.use('/sss',function(req, res, next) {
//   console.log("sss")
// })

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

// //推荐列表api
// var recommandList = require('../src/server/routers/recommandrouter')
// app.use('/sss',function(req, res, next) {
//   console.log("sss")
//   next()
// })
// 配置后端代理路由
//
var apiServer = express()    //名称apiServer根据项目自定义，避免冲突为原则  
var bodyParser = require('body-parser')  //express必须要进行的配置  
apiServer.use(bodyParser.urlencoded({ extended: true }))  //  
apiServer.use(bodyParser.json())  
//var apiRouter = express.Router()  //配置路由，名称同样可以自拟  
// var fs = require('fs')  
var apiRouter = require('../src/server/routers/api/apiRouter')
apiServer.use('/api', apiRouter);   //   配置 '/api'是因为做了服务器代理，所有要指明代理地址  
apiServer.listen(4000, function (err) {  //配置接口端口号，为了方便查看，一般取前端口号+1  
  if (err) {  
    console.log(err)  
    return  
  }  
  console.log('Listening at http://localhost:' + (4000) + '\n')  
})  

//
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  // if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
  //   opn(uri)
  // }
})
