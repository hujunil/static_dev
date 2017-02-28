/**
 * Created by hujun on 2017/2/27.
 */
let path = require("path");
let express = require("express");
let nunjucks = require("nunjucks");
let browserSync = require("browser-sync");

const app = express();

let tpl = nunjucks.configure(path.join(__dirname, "src"), {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
  noCache: true,
  watch:true
});

// 配置静态文件处理
app.use("/static",express.static('src/static'));

// 这里匹配所有的请求
app.get('/*', function (req, res, next) {
  if(req.params[0].indexOf("web") == 0) {
    tpl.render(req.params[0], {}, (err, result) => {
      if(err) {
        next(err);
      } else {
        res.send(result);
      }
    });
  } else {
    next();
  }
});


// error handler
app.use((err, req, res, next) => {
  res.send(`<h1>Error: ${err.status || 500} - ${err.message}</h1> <pre> ${err.stack} </pre>`)
});

app.listen(9999, function () {
  console.log('Example app listening on port 3000!')
});

// 配置浏览器自动刷新机制
browserSync.init({
  proxy: "127.0.0.1:9999",
  port: 9990,
  ui:false,
  files: "./src/**",
  open: true,
  notify: false,
  // 手机首页
  startPath: "/web/index.html",
  // 延迟1s钟再刷新页面
  reloadDebounce: 1000,
  // server: {
  //   baseDir: "./src"
  // }
});