const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const app = express();
const compiler = webpack(webpackConfig);

// 把webpack运行的结果放到express中运行
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false,
  }
}));

// 热加载
app.use(webpackHotMiddleware(compiler));

// 设置静态文件目录
app.use(express.static(__dirname));

// 用来解析json格式的中间件
app.use(bodyParser.json());

// 用来解析body中urlencoded字符中间件，只支持utf-8的编码字符
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router();

// 注册路由
router.get('/simple/get', function (req, res) {
  res.json({ msg: "通过" })
});

router.get('/base/get', function (req, res) {
  res.json(req.query);// 返回请求参数
})

router.post('/base/post', function (req, res) {
  res.json(req.body);
})

router.post('/base/buffer', function (req, res) {
  let msg = [];
  req.on('data', chunk => {
    if (chunk) {
      msg.push(chunk)
    }
  });
  req.on('end', () => {
    let buf = Buffer.concat(msg);
    res.json(buf.toJSON());
  });
})

app.use(router);

const port = process.env.PORT || 8080;
module.exports = app.listen(port, () => {
  console.log(`服务已启动，地址 http://localhost:${port}`)
})