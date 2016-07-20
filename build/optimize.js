var path = require('path');
var fs = require('fs');
var uglifyJS = require('uglify-js');
var minify = require('html-minifier').minify;
var staticPath = path.resolve(__dirname, '../public/static');
var indexHtmlPath = path.resolve(__dirname, '../public/index.html');
var files = fs.readdirSync(staticPath);
var jsFiles = files.filter(function (e) {
  return e.substr(-3) === '.js';
});
var jsFilesPath = jsFiles.map(function (e) {
  return staticPath + '/' + e;
});
jsFilesPath.forEach(function (e) {
  // var path = e;
  var result = uglifyJS.minify(e, {
    compress: {
      dead_code: true,
      global_defs: {
        DEBUG: false
      }
    }
  });
  fs.writeFile(e, result.code, 'utf8', function (err) {
    if (err) throw err;
    // console.log('optimize ' + path);
  });
});

fs.readFile(indexHtmlPath, { encoding: 'utf8' }, function (e, data) {
  var result;
  if (e) throw e;
  result = minify(data, {
    removeComments: true,
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    minifyJS: true,
    minifyCSS: true
  });
  fs.writeFile(indexHtmlPath, result, 'utf8', function (err) {
    if (err) throw err;
    // console.log('optimize ' + indexHtmlPath);
  });
});
