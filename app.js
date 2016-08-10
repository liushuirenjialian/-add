var express = require('express');
var request = require('request');
var path = require('path');

var appConfig = require('./build/appConfig.js');

var app = express();


var port = '3000';

var backendURL = appConfig.apiPath;

// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')())

app.use('/v1', function (req, res) {
  var url = backendURL + req.url;
  req.pipe(request(url)).pipe(res);
});

// app.error(function (err, req, res, next) {
//   var ret = {};
//   ret.message = '接口返回错误';
//   ret.ret = -1;
//   res.render(ret);
// });

process.on('uncaughtException', function (err) {
  // 打印出错误
  console.log(err);
  // 打印出错误的调用栈方便调试
  console.log(err.stack);
});

app.use('/', express.static(path.resolve(__dirname, './public')));

if (process.env.NODE_ENV === 'dev') {
  app.use('/vendor', express.static(path.resolve(__dirname, './src/assets/vendor')));
}

app.listen(port, '0.0.0.0', function (err) {
  if (err) {
    // console.log(err);
    return;
  }
  // console.log('Listening at http://localhost:' + port);
});
