/**
 * Created by hujun on 2017/2/28.
 */

const path = require("path");
const nunjucks = require("nunjucks");
const fse = require('fs-extra');

let files = ['web/index.html'];

let tpl = nunjucks.configure(path.join(__dirname, "src"), {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true,
  noCache: false,
  watch:false
});

// 先清空目录
console.log("清空dist目录...");
fse.emptydirSync(path.join(__dirname, "dist"));

// 拷贝文件目录
console.log("拷贝static目录...");
fse.copySync(path.join(__dirname, "src/static"), path.join(__dirname, "dist/static"));


// 渲染模板，然后写入文件
files.forEach((item, index) => {
  console.log(item, index);
  tpl.render(item, {}, (err, result) => {
    console.log(result);
    let file = path.join(__dirname, "dist", item);

    fse.ensureFile(file, err => {
      if(err) {
        console.log("创建目录失败");
      } else {
        fse.writeFile(file, result, (e) => {
          console.log("写入文件成功");
        });
      }
    });

  });
});

