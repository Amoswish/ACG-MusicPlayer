import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import config from '../../build/webpack.dev.conf' //这里指向 vue-cli 拷贝过来的配置文件
const recommand = require('./api/recommandList')
const app = express()

// view engine setup 模板文件，根据具体情况添加
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/sss1', function(err, req, res, next) {
    console.log("sss")
    res.send("sssss")
})
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}))

app.use(webpackHotMiddleware(compiler))
// 引用最后的静态文件
app.use(express.static(path.join(__dirname, 'views')))
app.get('/', function (req, res) {
  res.sendFile('../../index.html')
})

app.listen(4000)

export default app